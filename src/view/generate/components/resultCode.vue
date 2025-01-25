<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useFormDataStore } from '@/store/modules/formData';
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const props = defineProps({
    language: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    }
});

// 折叠面板
const activeNames = ref(['1', '2'])

//  获取 formDataStore 数据
const formDataStore = useFormDataStore()
const codeText = ref('');
const codeTextSql = ref('')
const codeDataList = ref([])
watch(
    () => formDataStore.formData,
    (newFormData) => {
        codeText.value = newFormData?.data?.[props.language] || '';
        codeTextSql.value = newFormData?.data?.createSql || '';
        codeDataList.value = newFormData?.data?.dataList || [];
    },
    { immediate: true } // 立即执行以确保初始加载时也能获取数据
);

const extensions = [javascript(), oneDark];
const editorOptions = {
    mode: "javascript",
    theme: "one-dark",
    lineNumbers: true,
};

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


// 复制全部
const copyAll = async () => {
    try {
        const all = codeTextSql.value + codeText.value
        await navigator.clipboard.writeText(all);
        open2("已复制到剪切板")
    } catch (error) {
        open4(error)
    }
}

// 复制到剪贴板的函数
const copyToClipboard = async (data: any) => {
    try {
        await navigator.clipboard.writeText(data);
        open2("已复制到剪切板")
    } catch (error) {
        open4(error)
    }
};

// 下载数据
const download = () => {
    // 将JSON数据转换为工作表
    const workSheet = XLSX.utils.json_to_sheet(codeDataList.value)
    // 建一个新的工作簿
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, workSheet, 'sheet1')
    // 生成 Excel 文件并下载
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'data.xlsx')

}

// 分页
const keys = computed(() => Object.keys(codeDataList.value[0] || {}));
const currentPage = ref(1);
const pageSize = ref(9);
const totalRecords = computed(() => codeDataList.value.length);
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return codeDataList.value.slice(start, end);
});
// 分页变化处理
const handlePageChange = (newPage: any) => {
    currentPage.value = newPage;
};

</script>
<template>
    <template v-if="codeText">
        <button class="button" v-if="name === '插入语句'" @click="copyAll()">复制全部</button>
        <button class="button" v-else-if="name === '模拟数据'" @click="download()">下载数据</button>

        <div class="demo-collapse">
            <template v-if="name != '模拟数据'">
                <el-collapse v-model="activeNames">
                    <!-- 如果是SQL代码就要多一个折叠面板 -->
                    <template v-if="language === 'insertSql'">
                        <el-collapse-item name="2">
                            <template #title>
                                <div class="collText"> 建表语句 <button class="collButton"
                                        @click="copyToClipboard(codeTextSql)">复制</button>
                                </div>
                            </template>
                            <div class="collInfo">
                                <codemirror v-model="codeTextSql" :options="editorOptions" :autofocus="true"
                                    :indent-with-tab="true" :tab-size="2" :extensions="extensions"
                                    style="padding: 16px 16px 24px; height: 300px;" />
                            </div>
                        </el-collapse-item>
                    </template>

                    <el-collapse-item name="1">
                        <template #title>
                            <div class="collText"> {{ name }} <button class="collButton"
                                    @click="copyToClipboard(codeText)">复制</button>
                            </div>
                        </template>
                        <div class="collInfo">
                            <codemirror v-model="codeText" :options="editorOptions" :autofocus="true"
                                :indent-with-tab="true" :tab-size="2" :extensions="extensions"
                                style="padding: 16px; height: 400px;" />
                        </div>
                    </el-collapse-item>

                </el-collapse>
            </template>

            <!-- 模拟数据 -->
            <template v-else>
                <div class="example-pagination-block">
                    <div class="example-demonstration">
                        <el-table :data="paginatedData" style="width: 100%">
                            <template v-for="key in keys">
                                <el-table-column :prop="key" :label="key" width="130" />
                            </template>
                        </el-table>
                    </div>
                    <el-pagination layout="prev, pager, next" :total="totalRecords" :page-size="pageSize"
                        :current-page.sync="currentPage" @current-change="handlePageChange" />
                </div>
            </template>

        </div>
    </template>
</template>


<style lang="less" scoped>
.button {
    padding: 7px 10px;
    background-color: #1890FF;
    color: white;
    margin-bottom: 16px;
}

.el-collapse-item {
    margin-bottom: 16px;
    border: 1px solid var(--underline-border-color);
}

.demo-collapse {
    .collText {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 17px;

        .collButton {
            padding: 2px 9px;
            color: #333;
            margin-left: auto;
            border: 1px solid var(--underline-border-color);
            font-size: 15px;
        }
    }

    .el-collapse-item {
        .collInfo {
            padding: 5px;
        }

    }

}
</style>