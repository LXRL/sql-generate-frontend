<script setup lang="ts">
import { ref, computed } from 'vue';
import infoAll from '@/components/infoAll.vue';
import infoLeft from '@/components/infoLeft.vue';
import useFormList from '@/store/modules/formList';
import { storeToRefs } from 'pinia';
import { getTabSql } from '@/service/modules/table';
import { useFormStore } from '@/store/modules/formStore';
import { useRouter } from 'vue-router';
import tableRight from './tableRight.vue';

const formListStore = useFormList()
const { tablePage } = storeToRefs(formListStore)
formListStore.fetchGetTabPage()

// 分页
const currentPage = ref(1);
const pageSize = ref(3);
const totalRecords = computed(() => tablePage?.value.data?.records?.length);
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return tablePage?.value.data?.records.slice(start, end);
});

// 分页变化处理
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
};
// search
const search = ref('');

// 消息提示
const open2 = (text:any) => {
    ElMessage({
        message: text,
        type: 'success',
    })
}
const open4 = (error:any) => {
    ElMessage.error(error)
}

// 导入 form
const router = useRouter()
const formStore = useFormStore();
const form = formStore.form
const setFormData = (content) => {
    const res = getContent(content);
    console.log(res)
    form.dbName = res.dbName;
    form.tableName = res.tableName;
    form.tableComment = res.tableComment;
    form.mockNum = res.mockNum;
    form.fieldList = res.fieldList;
    router.push('/')
    open2('导入成功')
}

// key
const getContent = (content) => {
    const jsonObject = JSON.parse(content);
    return jsonObject
}
const getName = (content) => {
    try {
        const jsonObject = JSON.parse(content);
        const fieldNames = jsonObject.fieldList.map(item => item.fieldName).join(', ');
        return fieldNames;
    } catch (error) {
        console.log("JSON parse error:", error);
        return content; // 如果解析失败，返回原始内容
    }
}
// 日期
const getTime = (time) => {
    return time.substring(0, 10);
}

// 复制语句
const getCopy = async (id) => {
    try {
        const res = await getTabSql(id)
        await navigator.clipboard.writeText(res.data.data);
        open2('复制建表SQL成功')

    } catch (error) {
        open4(error)
    }

}
</script>
<template>
    <div class="table">
        <infoAll title="站在巨人的肩膀上，一键导入表并生成模拟数据！">
            <template v-slot:conditions>
                <infoLeft>
                    <template v-slot:heInfo>
                        <p>公开表信息</p>
                        <button class="Button">创建表</button>
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
                                    <button @click="setFormData(item.content)">导入</button>
                                </div>
                                <div class="dbName">
                                    <div>表名: <span>{{ getContent(item.content).tableName }}</span></div>
                                    <div>表注释: <span>{{ getContent(item.content).tableComment }}</span> </div>
                                </div>
                                <div class="annotation">
                                    <p>字段列表: <span>{{ getName(item.content) }}</span></p>
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
                <tableRight></tableRight>
            </template>
        </infoAll>
    </div>
</template>


<style lang="less" scoped>
.table {
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

        .dbName {
            width: 340px;
            display: flex;
            justify-content: space-between;
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