<script setup lang="ts">
import { ref } from "vue";
import type { signType } from "../../types";
import { useRouter } from "vue-router";
import useUserLoginStore from "./store";

const userLoginStore = useUserLoginStore();
const router = useRouter();
const sign = ref<signType>({
  userAccount: "",
  userName: "",
  checkPassword: "",
  userPassword: "",
});
const loginTo = () => router.push("/login");

const onSubmit = async () => {
  await userLoginStore.fetchUserRegister(sign.value);
  loginTo();
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
        <el-form :model="sign" label-width="auto">
          <div class="userAccount">
            <el-input v-model="sign.userAccount" placeholder="请输入账号" clearable>
              <template #prefix>
                <img class="icon" src="@/assets/images/login_login.png" alt="" />
              </template>
            </el-input>
          </div>
          <div class="userAccount">
            <el-input v-model="sign.userName" placeholder="请输入用户名(至少四个字)" clearable>
              <template #prefix>
                <img class="icon" src="@/assets/images/login_login.png" alt="" />
              </template>
            </el-input>
          </div>
          <div class="userPassword">
            <el-input v-model="sign.userPassword" placeholder="请输入密码" type="password" show-password>
              <template #prefix>
                <img class="icon" src="@/assets/images/login_lock.png" alt="" />
              </template>
            </el-input>
          </div>
          <div class="userPassword">
            <el-input v-model="sign.checkPassword" placeholder="请输入确认密码" type="password" show-password>
              <template #prefix>
                <img class="icon" src="@/assets/images/login_lock.png" alt="" />
              </template>
            </el-input>
          </div>
          <div class="sign">
            <div @click="loginTo">老用户登录</div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="width: 100%">注册</el-button>
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
        margin-bottom: 16px;

        .icon {
          width: 16px;
          height: 16px;
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
