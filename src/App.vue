<script setup lang="ts">
import headerApp from '@/components/headerApp.vue';
</script>
<template>
  <div class="App">
    <headerApp class="headerApp" />
    <router-view></router-view>
  </div>

</template>


<style lang="less" scoped>
.headerApp {
  width: 100%;
}
</style>