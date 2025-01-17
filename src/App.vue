<script setup lang="ts">
import headerApp from '@/components/headerApp.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
</script>
<template>
  <div class="App">
    <headerApp class="headerApp" v-show="!route.meta.hideTabBar" />
    <router-view></router-view>
  </div>

</template>


<style lang="less" scoped>
.headerApp {
  width: 100%;
}
</style>