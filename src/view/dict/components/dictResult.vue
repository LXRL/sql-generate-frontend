<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { ElMessage } from "element-plus";

const props = defineProps({
  language: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  tableData: {
    type: Object,
    default: () => {},
  },
});

// 折叠面板
const activeNames = ref(["1", "2"]);

//  获取 formDataStore 数据
const codeText = ref("");
const codeTextSql = ref("");
const codeDataList = ref([]);
watch(
  () => props.tableData,
  (newFormData) => {
    codeText.value = newFormData?.[props.language] || "";
    codeTextSql.value = newFormData?.createSql || "";
    codeDataList.value = newFormData?.dataList || [];
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
    type: "success",
  });
};
const open4 = (error: any) => {
  ElMessage.error(error);
};

// 复制到剪贴板的函数
const copyToClipboard = async (data: any) => {
  try {
    await navigator.clipboard.writeText(data);

    open2("已复制到剪切板");
  } catch (err) {
    open4(error);
  }
};

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
    <button class="button">复制全部</button>
    <div class="demo-collapse">
      <template v-if="name != '模拟数据'">
        <el-collapse v-model="activeNames">
          <!-- 如果是SQL代码就要多一个折叠面板 -->
          <template v-if="language === 'insertSql'">
            <el-collapse-item name="2">
              <template #title>
                <div class="collText">
                  建表语句
                  <button
                    class="collButton"
                    @click="copyToClipboard(codeTextSql)"
                  >
                    复制
                  </button>
                </div>
              </template>
              <div class="collInfo">
                <codemirror
                  v-model="codeTextSql"
                  :options="editorOptions"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="extensions"
                  style="padding: 16px 16px 24px; height: 300px"
                />
              </div>
            </el-collapse-item>
          </template>

          <el-collapse-item name="1">
            <template #title>
              <div class="collText">
                {{ name }}
                <button class="collButton" @click="copyToClipboard(codeText)">
                  复制
                </button>
              </div>
            </template>
            <div class="collInfo">
              <codemirror
                v-model="codeText"
                :options="editorOptions"
                :autofocus="true"
                :indent-with-tab="true"
                :tab-size="2"
                :extensions="extensions"
                style="padding: 16px; height: 400px"
              />
            </div>
          </el-collapse-item>
        </el-collapse>
      </template>

      <!-- 模拟数据 -->
      <template v-else>
        <div class="example-pagination-block">
          <div class="example-demonstration">
            <el-table :data="paginatedData" border style="width: 100%">
              <template v-for="key in keys">
                <el-table-column :prop="key" :label="key" width="130" />
              </template>
            </el-table>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :total="totalRecords"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            @current-change="handlePageChange"
          />
        </div>
      </template>
    </div>
  </template>
</template>

<style lang="less" scoped>
.button {
  padding: 7px 10px;
  background-color: #1890ff;
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
