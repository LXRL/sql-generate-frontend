<script setup lang="ts">
import { logout } from '@/service';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import userLogin from '@/store/modules/login';
import { storeToRefs } from 'pinia';

// navigation 
const navList = ref<{ name: string; path: string }[]>([
    {
        name: '代码生成',
        path: '/generate'
    },
    {
        name: '词库大全',
        path: '/lexicon'
    },
    {
        name: '表大全',
        path: '/table'
    },
    {
        name: '字段大全',
        path: '/fields'
    },
])
// active 样式判断
const navCurrent = ref<number>(0)
// router.push 切换页面
const router = useRouter()
const navClick = (path: string) => {
    router.push(path)
}
// login 跳转登录页面
const loginTo = () => {
    router.push('/login')
}

// 登录状态
// 检查用户是否登录
const loginStore = userLogin()
const { isLoggedIn, userData } = storeToRefs(loginStore)
const userName = ref('');
const account = ref('');
if (isLoggedIn) {
    userName.value = userData?.value.data?.userAccount.charAt(0).toUpperCase()
    account.value = userData?.value.data?.userAccount;
}

// 登录
const clickOut = async () => {
    await logout()
    isLoggedIn.value = false;
}
</script>

<template>
    <div class="header">
        <div class="logo">
            <img src="assets/images/logo.png" alt="">
            <h4>SQL生成器</h4>
        </div>
        <div class="navigation">
            <template v-for="(item, index) in navList" :key="index">
                <div :class="{ active: navCurrent === index }" @click="(navCurrent = index, navClick(item.path))">
                    {{ item.name }}</div>
            </template>
        </div>
        <div class="login">
            <template v-if="isLoggedIn">
                <div class="name">
                    <el-popover trigger="hover" popper-class="pop">
                        <button class="account" style="color: #C7C7C7;">{{ account }}</button>
                        <div class="out">
                            <img src="@/assets/images/out.png" alt="">
                            <div @click="clickOut()">退出登录</div>
                        </div>
                        <template #reference>
                            <div class="box"> {{ userName }}</div>
                        </template>
                    </el-popover>
                </div>
            </template>
            <template v-else>
                <el-button class="Button" type="primary" plain @click="loginTo">登录</el-button>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 55px;
    display: flex;
    border-bottom: 1px solid var(--underline-border-color);
    align-items: center;
    padding: 0px 25px;
    box-sizing: border-box;
    background-color: #F8F9FA;

    .logo {
        display: flex;
        align-items: center;
        margin-right: 80px;

        img {
            width: 32px;
            height: 32px;
            margin-right: 5px;
        }
    }

    .navigation {
        display: flex;
        width: 370px;
        justify-content: space-around;
        color: #333;
        font-size: 14px;
        cursor: pointer;

        .active {
            font-weight: 700;
        }
    }

    .login {
        margin-left: auto;

        .Button {
            width: 60px;
            color: #1890FF;
            background-color: white;
            border: 1px solid #1890FF;
        }

        .name {
            .box {
                font-size: 14px;
                border-radius: 50%;
                padding: 3px 10px;
                background-color: #CCCCCC;
                color: white;
                cursor: pointer;
            }
        }
    }
}
</style>