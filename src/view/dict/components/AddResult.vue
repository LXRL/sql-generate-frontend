<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter()
const lexTo = () => router.push('/dict/all')
const addTo = () => router.push('/dict/add')

</script>
<template>
    <div class="result">
        <img src="@/assets/images/result.png" alt="">
        <h2>词库创建成功</h2>
        <p>你可以立即使用该词库，审核通过后他人也可使用该词库</p>
        <div>
            <button class="go" @click="lexTo()">去使用</button>
            <button class="add" @click="addTo()">再创建一个</button>
        </div>
    </div>
</template>


<style lang="less" scoped>
.result {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    align-items: center;

    img {
        width: 72px;
        margin-bottom: 40px;
    }

    p {
        color: #888889;
        margin: 16px 0 !important;
    }

    .go {
        background-color: #1890FF;
        color: white;
        margin-right: 5px;
    }

    .add {
        border: 1px solid var(--underline-border-color);
    }
}
</style>