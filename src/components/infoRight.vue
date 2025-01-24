<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useUserLoginStore from "../view/login/store";

const userLoginStore = useUserLoginStore();
const { isLoggedIn } = storeToRefs(userLoginStore);

const router = useRouter();
const loginTo = () => {
  router.push("/login");
};
</script>

<template>
  <div class="right">
    <div class="header">
      <slot name="heInfo"></slot>
    </div>
    <div class="info">
      <div class="search">
        <slot v-if="isLoggedIn" name="seInfo"></slot>
      </div>
      <div class="data">
        <template v-if="isLoggedIn">
          <slot name="daInfo"></slot>
        </template>
        <template v-else>
          <div class="loginTo">
            <img src="@/assets/images/null.png" alt="" />
            <button @click="loginTo">请先登录</button>
          </div>
        </template>
      </div>
    </div>
    <slot name="drInfo"></slot>
  </div>
</template>
<style lang="less" scoped>
.right {
  background-color: white;
  border: 1px solid var(--underline-border-color);

  .header {
    display: flex;
    width: 100%;
    padding: 16px 24px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid var(--underline-border-color);
  }

  .info {
    display: flex;
    flex-direction: column;
    padding: 24px;

    .search {
      display: flex;

      .el-input {
        width: 200px;
      }
    }

    .data {
      width: 100%;
      margin: 16px 0;

      .loginTo {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 100px;
        }

        button {
          padding: 5px 10px !important;
          border: 1px solid #1890ff;
          color: #1890ff;
        }
      }
    }
  }
}
</style>
