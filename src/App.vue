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
          <a href="https://github.com/LXRL"> 
            <img src="@/assets/images/foo_name.png" alt=""> 
            <span>站长:lirenlong</span>
          </a>
        </div>
        <div>
          <a href="https://github.com/LXRL/sql-generate-frontend">
            <img src="@/assets/images/foo_github.png" alt=""> 
            <span>代码已开源</span>
          </a>
        </div>
        <div>
          <a href="https://support.qq.com/product/596724">
            <img src="@/assets/images/foo_problem.png" alt=""> 
            <span>问题反馈</span>
          </a>
        </div>
        <div>
          <a style="color: #409EFF;" href="https://beian.miit.gov.cn/#/Integrated/index">
            粤ICP备2024356243号-1
          </a>
        </div>
      </div>

      <div class="author">
        <div>
         <a href="">
          <img src="@/assets/images/foo_C.png" alt=""> 
          <span>2025 樆猫</span>
         </a>
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

  a:hover{
    color: #575757 !important;
  }

  .icon {
    display: flex;

    &>div {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 10px;

      a{
        display: flex;
        align-items: center;
        color: #9E9FA1;
      }

      img {
        width: 17px;
        margin-right: 5px;
      }
    }
  }

  .author {
    display: flex;
    margin-top: 10px;

    &>div {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 10px;

      a{
        display: flex;
        align-items: center;
      }

      img {
        width: 17px;
        margin-right: 5px;
      }
    }
  }
}
</style>