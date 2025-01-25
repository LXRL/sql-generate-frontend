<script setup lang="ts">
import { ref, computed } from 'vue';
import infoAll from '@/components/infoAll.vue';
import infoLeft from '@/components/infoLeft.vue';
import useFormList from '@/store/modules/formList';
import { storeToRefs } from 'pinia';
import { getFieSql } from '@/api/modules/fields';
import fieldsRight from './fieldsRight.vue';
import { useRouter } from 'vue-router';

const formListStore = useFormList()
const { fieldsPage } = storeToRefs(formListStore)
formListStore.fetchGetFiePage()
console.log(fieldsPage?.value.records)

// 分页
const currentPage = ref(1);
const pageSize = ref(3);
const totalRecords = computed(() => fieldsPage?.value?.records?.length);
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return fieldsPage?.value?.records?.slice(start, end);
});

// 分页变化处理
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
};
// search
const search = ref('');


// key
const getContent = (content: any) => {
    const jsonObject = JSON.parse(content);
    return jsonObject
}

// 日期
const getTime = (time: any) => {
    return time.substring(0, 10);
}

// 消息提示
const open2 = (text: any) => {
    ElMessage({
        message: text,
        type: 'success',
    })
}
const open4 = (error: any) => {
    ElMessage.error(error)
}

// 复制语句
const getCopy = async (id: any) => {
    try {
        const res = await getFieSql(id)
        await navigator.clipboard.writeText(res.data);
        open2('复制创建字段SQL成功')

    } catch (error) {
        open4(error)
    }
}

// 判断
const judgment = (value: any) => {
    if (value)
        return value
    else return '无'
}
const judgmentZ = (value: any) => {
    if (value) return '是'
    else return '否'
}
const judgmentK = (value: any) => {
    if (value) return '是'
    else return '否'
}
const router = useRouter()
const generateTo = () => {
    router.push('/')
}
</script>
<template>
    <div class="fields">
        <infoAll title="参考或学习字段设计，高效完成建表！">
            <template v-slot:conditions>
                <infoLeft>
                    <template v-slot:heInfo>
                        <p>公开字段信息</p>
                        <button class="Button" @click="generateTo()">去创建</button>
                    </template>
                    <template v-slot:seInfo>
                        <el-input v-model="search" placeholder="请输入名称" style="width: 200px;"></el-input>
                        <button class="Button">搜索</button>
                    </template>
                    <template v-slot:daInfo>
                        <template v-for="item in paginatedData" :key="item.name">
                            <div class="daInfo">
                                <div class="name">
                                    <h4>{{ item.name }}</h4> <span class="">官方</span>
                                </div>
                                <div class="filedList">
                                    <div>表名: <span>{{ getContent(item.content).fieldName }}</span> </div>
                                    <div>类型: <span>{{ getContent(item.content).fieldType }}</span></div>
                                    <div>注释: <span>{{ getContent(item.content).comment }}</span></div>
                                    <div>默认值: <span>{{ judgment(getContent(item.content).defaultValue) }}</span> </div>
                                    <div>自增: <span>{{ judgmentZ(getContent(item.content).autoIncrement) }}</span></div>
                                    <div>主键: <span>{{ judgmentZ(getContent(item.content).primaryKey) }}</span></div>
                                    <div>非空: <span>{{ judgmentK(getContent(item.content).notNull) }}</span> </div>
                                    <div>onUpDate: <span>{{ judgment(getContent(item.content).onUpdate) }}</span></div>
                                </div>

                                <div class="time">
                                    <p>{{ getTime(item.updateTime) }}</p>
                                    <button class="bu" @click="getCopy(item.id)">复制语句</button>
                                    <button>举报</button>
                                </div>
                            </div>
                        </template>
                        <div class="pag">
                            <el-pagination layout=" prev, pager, next" :total="totalRecords" :page-size="pageSize"
                                :current-page="currentPage" @current-change="handlePageChange" />
                        </div>
                    </template>
                </infoLeft>
            </template>

            <template v-slot:result>
                <fieldsRight></fieldsRight>
            </template>
        </infoAll>
    </div>
</template>


<style lang="less" scoped>
.fields {
    .Button {
        padding: 5px 10px;
        color: white;
        background-color: #1890FF;
    }


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
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            h4 {
                font-size: 16px;
                margin-right: 7px !important;
            }

            span {
                font-size: 12px;
                padding: 1px 5px;
                color: #D99521;
                border: 1px solid #D99521;
                background-color: #FFFBE6;
            }

            button {
                padding: 5px 15px;
                margin-left: auto;
                border: 1px solid var(--underline-border-color);

                &:hover {
                    color: #1890FF;
                    border: 1px solid #1890FF;
                }
            }
        }

        .filedList {
            width: 700px;
            display: flex;
            flex-wrap: wrap;

            div {
                font-size: 14px;
                width: 150px;
                margin-right: 60px;
                margin-bottom: 15px;
            }
        }

        .annotation {
            margin: 10px 0;

            p {
                font-size: 14px;
                color: #a6a6a6;
                margin-right: 5px !important;
            }
        }

        .time {
            font-size: 14px;

            p {

                color: #a6a6a6;
            }

            button {
                padding: 5px 10px;
                margin: 0 20px;
            }
        }
    }

    .pag {
        display: flex;

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