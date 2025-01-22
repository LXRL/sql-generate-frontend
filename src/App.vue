<script setup lang="ts">
import headerApp from '@/components/headerApp.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
</script>
<template>
  <div class="App">
    <headerApp class="headerApp" v-show="!route.meta.hideTabBar" />
    <router-view></router-view>
    <footer>
      <div class="icon">
        <div>
          <img src="@/assets/images/foo_name.png" alt=""> <span>站长:lirenlong</span>
        </div>
        <div>
          <img src="@/assets/images/foo_github.png" alt=""> <span>代码已开源</span>
        </div>
        <div>
          <img src="@/assets/images/foo_problem.png" alt=""> <span>问题反馈</span>
        </div>
      </div>
      <div class="author">
        <div>
          <img src="@/assets/images/foo_C.png" alt=""> <span>2025 猫</span>
        </div>
      </div>
    </footer>
  </div>

</template>


<style lang="less" scoped>
.headerApp {
  width: 100%;
}

footer {
  display: flex;
  width: 100%;
  height: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F0F2F5;
  margin-top: 40px;

  .icon {
    display: flex;

    &>div {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #9E9FA1;
      margin-right: 10px;


      img {
        width: 17px;
        margin-right: 5px;
      }
    }
  }

  .author {
    display: flex;

    &>div {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 10px;

      img {
        width: 17px;
        margin-right: 5px;
      }
    }
  }
}
</style>