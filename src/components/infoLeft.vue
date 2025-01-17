<script setup lang="ts">
import { ref } from 'vue';

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
// search
const search = ref('')
</script>
<template>
    <div class="left">
        <div class="header">
            <p>{{name}}</p>
            <button class="Button">{{butName}}</button>
        </div>
        <div class="info">
            <div class="search">
                <el-input v-model="search" placeholder="请输入名称"></el-input>
                <button class="Button">搜索</button>
            </div>
            <div class="data">
                <div class="daInfo">
                    <div class="name">
                        <p>薯条库</p> <span class="">官方</span>
                    </div>
                    <div class="annotation">
                        <p>shut,zha,hello,world,cd</p>
                        <img src="@/assets/images/copy.png" alt="">
                    </div>
                    <div class="time">
                        <p>2023-06-13</p>
                        <button>生成表</button>
                        <button>举报</button>
                    </div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" :total="50" />
        </div>
    </div>
</template>


<style lang="less" scoped>
.left {
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
            padding-bottom: 16px;
            border-bottom: 1px solid var(--underline-border-color);

            .daInfo {
                width: 100%;

                &>div {
                    width: 100%;
                    display: flex;
                    align-items: center;
                }

                .name {
                    p {
                        font-size: 17px;
                        margin-right: 7px !important;
                    }

                    span {
                        font-size: 12px;
                        padding: 1px 5px;
                        color: #D99521;
                        border: 1px solid #D99521;
                        background-color: #FFFBE6;
                    }
                }

                .annotation {
                    margin: 16px 0;

                    p {
                        color: #a6a6a6;
                        margin-right: 5px !important;
                    }

                    img {
                        cursor: pointer;
                        width: 20px;
                    }
                }

                .time {
                    p {
                        color: #a6a6a6;
                    }
                }
            }
        }

        .el-pagination {
            margin-left: auto;
        }
    }
}
</style>