<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

// navigation 
const navList = ref<{name:string;path:string}[]>([
    {
        name:'代码生成',
        path:'/generate'
    },
    {
        name:'词库大全',
        path:'/lexicon'
    },
    {
        name:'表大全',
        path:'/table'
    },
    {
        name:'字段大全',
        path:'/fields'
    },
])
// active 样式判断
const navCurrent=ref<number>(0)
// router.push
const router=useRouter()
const navClick=(path)=>{
    router.push(path)
}

</script>

<template>
    <div class="header">
        <div class="logo">
            <img src="assets/images/logo.png" alt="">
            <h3>SQL生成器</h3>
        </div>
        <div class="navigation">
            <template v-for="(item,index) in navList" :key="index">
                <div :class="{ active : navCurrent === index }" @click="(navCurrent = index, navClick(item.path))">
                {{ item.name }}</div>
            </template>
        </div>
        <div class="login">
            <el-button type="primary" plain>登录</el-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header {
    width: 100%;
    display: flex;
    border-bottom: 1px solid var(--underline-border-color);
    align-items: center;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #F8F9FA;

    .logo {
        display: flex;
        align-items: center;
        margin-right: 100px;

        img {
            width: 35px;
            height: 35px;
            margin-right: 7px;
        }
    }

    .navigation {
        display: flex;
        width: 500px;
        justify-content: space-around;
        color: #333;
        font-size: 16px;
        cursor: pointer;
        .active{
            font-weight: 700;
        }
    } 
    .login {
        margin-left: auto;
    }
}
</style>