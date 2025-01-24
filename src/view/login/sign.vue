<script setup lang="ts">
import { ref } from 'vue'
import type { signType } from '@/types'
import { getUserSign } from '@/service/modules/user'
import { useRouter } from 'vue-router';


const sign: signType = ref({})
const onSubmit = async () => {
    try {
        const response = await getUserSign(sign.value)
        open2()
        loginTo()
    } catch (error) {
        open4(error)
    }
}

const router = useRouter()
const loginTo = () => router.push('/login')

// 消息提示
const open2 = () => {
    ElMessage({
        message: '注册成功',
        type: 'success',
    })
}
const open4 = (error:any) => {
    ElMessage.error(error)
}

</script>
<template>
    <div class="body">
        <div class="login">
            <div class="header">
                <img src="@/assets/images/logo.png" alt="">
                <p>SQL生成器</p>
            </div>
            <p class="text">快速生成代码和数据</p>
            <div class="info">
                <el-form :model="sign" label-width="auto">
                    <div class="userAccount">
                        <img class="icon" src="" alt="">
                        <input v-model="sign.userAccount" placeholder="请输入账号" />
                        <img class="icon" src="" alt="">
                    </div>
                    <div class="userAccount">
                        <img class="icon" src="" alt="">
                        <input v-model="sign.userName" placeholder="请输入用户名(至少4位)" />
                        <img class="icon" src="" alt="">
                    </div>
                    <div class="userPassword">
                        <img class="icon" src="" alt="">
                        <input v-model="sign.userPassword" placeholder="请输入密码(至少8位)" />
                        <img class="icon" src="" alt="">
                    </div>
                    <div class="userPassword">
                        <img class="icon" src="" alt="">
                        <input v-model="sign.checkPassword" />
                        <img class="icon" src="" alt="">
                    </div>
                    <div class="sign">
                        <div @click="loginTo">老用户登录</div>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" style="width: 100%;">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.body {
    width: 100%;
    height: 100vh;
    background-color: white;

    .login {
        width: 328px;
        margin: 32px auto;
        background-color: white;

        .header {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 44px;
                height: 44px;
                margin-right: 10px;
            }

            p {
                font-weight: 700;
                font-size: 33px;
            }
        }

        .text {
            color: #898989;
            margin: 16px 0 40px !important;
            text-align: center;
        }

        .info {

            .userAccount,
            .userPassword {
                display: flex;
                padding: 11px;
                border: 1px solid var(--underline-border-color);
                align-items: center;
                margin-bottom: 16px;

                input {
                    width: 268px;
                    height: 25px;
                    border: none;
                    outline: none;
                    background-color: #E8F0FE;
                    margin: 0 5px;
                }

                .icon {
                    width: 16px;
                    height: 16px;
                }
            }

            .sign {
                display: flex;
                justify-content: space-between;
                color: #409EFF;
                margin-bottom: 16px;
                font-size: 14px;

                div {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>