<script setup lang="ts">
import { computed, ref } from 'vue';
import resultCode from './result.vue'
import { getLexSql } from '@/service';
const props = defineProps({
    moduleName: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    butName: {
        type: String,
        default: ''
    },
    data: {
        type: Array as () => { name: string; content: string; updateTime: string }[],
        default: () => []
    }
});

// 组件名
const moName = ref(props.moduleName)
// 将内容数组转换为字符串
const getContent = (content: string) => {
    try {
        const parsedContent = JSON.parse(content);
        return Array.isArray(parsedContent) ? parsedContent.join(', ') : parsedContent;
    } catch (error) {
        console.error("JSON parse error:", error);
        return content; // 如果解析失败，返回原始内容
    }
}
// 日期
const getTime = (time) => {
    return time.substring(0, 10);
}
// search
const search = ref('');

// 分页
const currentPage = ref(1);
const pageSize = ref(3);
const totalRecords = computed(() => props.data.length);
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return props.data.slice(start, end);
});

// 分页变化处理
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
};

// tableShow 生成表
const tableData = ref({})
const tableShow = ref<boolean>(false)
const activeName = ref('first')
const getSql = async (id) => {
    try {
        const res = await getLexSql(id)
        tableData.value = res
        console.log("getSql", tableData.value)
    } catch (error) {
        console.log("获取数据失败", error);
    }
}
</script>

<template>
    <div class="left">
        <div class="header">
            <p>{{ name }}</p>
            <button class="Button">{{ butName }}</button>
        </div>
        <div class="info">
            <div class="search">
                <el-input v-model="search" placeholder="请输入名称"></el-input>
                <button class="Button">搜索</button>
            </div>
            <div class="data">
                <template v-for="item in paginatedData" :key="item.name">
                    <div class="daInfo">
                        <div class="name">
                            <p>{{ item.name }}</p> <span class="">官方</span>
                        </div>
                        <div class="annotation">
                            <p>{{ getContent(item.content) }}</p>
                            <img src="@/assets/images/copy.png" alt="">
                        </div>
                        <div class="time">
                            <p>{{ getTime(item.updateTime) }}</p>
                            <template v-if="moName = 'lexicon'">
                                <button @click="tableShow = true, getSql(item.id)">生成表</button>
                            </template>
                            <button>举报</button>
                        </div>
                    </div>
                </template>
                <div class="pag">
                    <el-pagination layout=" prev, pager, next" :total="totalRecords" :page-size="pageSize"
                        :current-page="currentPage" @current-change="handlePageChange" />
                </div>
            </div>
        </div>
        <template v-if="moName = 'lexicon'">
            <el-drawer v-model="tableShow" title="生成字典表成功">
                <div class="result">
                    <div class="text">
                        <p>生成结果</p>
                    </div>
                    <el-tabs v-model="activeName" class="demo-tabs">
                        <el-tab-pane label="SQL 代码" name="first">
                            <result-code language="insertSql" name="插入语句" :tableData="tableData" />
                        </el-tab-pane>
                        <el-tab-pane label="模拟数据" name="second">
                            <result-code language="dataJson" name="模拟数据" :tableData="tableData" />
                        </el-tab-pane>
                        <el-tab-pane label="JSON 数据" name="third">
                            <result-code language="dataJson" name="JSON数据" :tableData="tableData" />
                        </el-tab-pane>
                        <el-tab-pane label="Go代码" name="fourth">
                            <result-code language="goStructCode" name="Go结构体" :tableData="tableData" />
                        </el-tab-pane>
                        <el-tab-pane label="java代码" name="five">
                            <result-code language="javaEntityCode" name="实体代码" :tableData="tableData" />
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-drawer>
        </template>
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

            .daInfo {
                width: 100%;
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid var(--underline-border-color);

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
                    margin: 10px 0;

                    p {
                        font-size: 14px;
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

            .pag {
                display: flex;
            }
        }

        .el-pagination {
            margin-left: auto;
        }
    }

    .result {
        padding-right: 10px;
        border: 1px solid var(--underline-border-color);
        background-color: white;

        .text {
            width: 100%;
            padding: 16px;
            border-bottom: 1px solid var(--underline-border-color);
            box-sizing: border-box;
        }

        .el-tabs {
            padding: 16px;
        }

        .show {
            width: 100%;
            height: 200px;
            text-align: center;
            line-height: 200px;
        }
    }
}
</style>