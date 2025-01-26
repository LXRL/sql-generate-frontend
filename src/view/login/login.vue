<script setup lang="ts">
import { ref } from "vue";
import type { loginType } from "@/types";
import { useRouter } from "vue-router";
import useUserLoginStore from "./store";

// 登录
const login: loginType = ref({});
const userLoginStore = useUserLoginStore();

// 跳转
const router = useRouter();
const signTo = () => router.push("/sign");
const genTo = () => router.push("/");

const onSubmit = async () => {
  await userLoginStore.fetchUserLogin(login.value);
  genTo();
};


</script>

<template>
  <div class="body">
    <div class="login">
      <div class="header">
        <img src="@/assets/images/logo.png" alt="" />
        <p>SQL生成器</p>
      </div>
      <p class="text">快速生成代码和数据</p>
      <div class="info">
        <el-form :model="login" label-width="auto">
          <div class="userAccount">

            <el-input v-model="login.userAccount" placeholder="请输入账号" clearable>
              <template #prefix>
                <img class="icon" src="@/assets/images/login_login.png" alt="" />
              </template>
            </el-input>

          </div>
          <div class="userPassword">
            <el-input v-model="login.userPassword" placeholder="请输入密码" type="password" show-password>
              <template #prefix>
                <img class="icon" src="@/assets/images/login_lock.png" alt="" />
              </template>
            </el-input>
          </div>
          <div class="sign">
            <div @click="signTo">新用户注册</div>
            <div @click="genTo">返回主页</div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
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
    width: 300px;
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
        margin-bottom: 16px;

        .icon {
          width: 16px;
          height: 16px;
        }

        .cur {
          cursor: pointer;
        }
      }

      .sign {
        display: flex;
        justify-content: space-between;
        color: #409eff;
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
