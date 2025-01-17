<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    butName: {
        type: String,
        default: ''
    }
})

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
console.log(isLoggedIn)
</script>
<template>
    <div class="right">
        <div class="header">
            <p>{{ name }}</p>
            <button class="Button">{{ butName }}</button>
        </div>
        <div class="info">
            <template v-if="isLoggedIn">
                <h1>已经登录</h1>
            </template>
            <template v-else>
                <button>请先登录</button>
            </template>
        </div>
    </div>
</template>


<style lang="less" scoped>
.right {
    background-color: white;
    border: 1px solid var(--underline-border-color);

    .Button {
        padding: 5px 10px;
        color: white;
        background-color: #1890FF;
    }

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
        padding: 24px;
    }
}
</style>