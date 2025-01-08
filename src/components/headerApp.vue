<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

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
// router.push
const router = useRouter()
const navClick = (path: string) => {
    router.push(path)
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
            <el-button class="Button" type="primary" plain>登录</el-button>
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

        .el-button {
            width: 60px;
            color: #1890FF;
            background-color: white;
            border: 1px solid #1890FF;
        }
    }
}
</style>