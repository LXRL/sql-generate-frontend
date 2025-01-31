<script setup lang="ts">import { ref, computed } from "vue";
import infoAll from "@/components/infoAll.vue";
import infoLeft from "@/components/infoLeft.vue";
import useFormList from "@/store/modules/formList";
import resultCode from "./components/dictResult.vue";
import { storeToRefs } from "pinia";
import { getDictSql } from "@/api";
import dictRight from "./components/dictRight.vue";
import { useRouter } from 'vue-router';
import { useMessage } from "@/hook/useMessage";

const formListStore = useFormList()
const { formPage } = storeToRefs(formListStore)
formListStore.fetchGetDictPage()

const pageValue: any = computed(()=>formPage?.value)
// 分页
const currentPage = ref(1);
const pageSize = ref(3);
const totalRecords = computed(() => pageValue?.value.records?.length);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return pageValue?.value.records?.slice(start, end);
});

// 分页变化处理
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

// search
const search = ref("");

// 将内容数组转换为字符串
const getContent = (content: string) => {
  try {
    const parsedContent = JSON.parse(content);
    return Array.isArray(parsedContent)
      ? parsedContent.join(", ")
      : parsedContent;
  } catch (error: any) {
    console.error("JSON parse error:", error);
    return content; // 如果解析失败，返回原始内容
  }
};
// 日期
const getTime = (time: any) => {
  return time.substring(0, 10);
};

// tableShow 生成表
const tableData = ref({});
const tableShow = ref<boolean>(false);
const activeName = ref("first");
const getSql = async (id: any) => {
  try {
    const res: any= await getDictSql(id);
    tableData.value = res.data;
  } catch (error: any) {
    useMessage.failed(error);
  }
};

// 跳转
const router = useRouter()
const addTo = () => {
  router.push('/dict/add')
}

</script>
<template>
  <div class="lexicon">
    <infoAll title="使用现成的词库来生成特定数据，或用作研究数据集！">
      <template v-slot:conditions>
        <infoLeft>
          <template v-slot:heInfo>
            <p>公开词库</p>
            <button class="Button" @click="addTo()">创建词库</button>
          </template>
          <template v-slot:seInfo>
            <el-input v-model="search" placeholder="请输入名称" style="width: 200px"></el-input>
            <button class="Button">搜索</button>
          </template>
          <template v-slot:daInfo>
            <template v-for="item in paginatedData" :key="item.name">
              <div class="daInfo">
                <div class="name">
                  <p>{{ item.name }}</p>
                  <span class="">官方</span>
                </div>
                <div class="annotation">
                  <p>{{ getContent(item.content) }}</p>
                  <img src="@/assets/images/copy.png" alt="" />
                </div>
                <div class="time">
                  <p>{{ getTime(item.updateTime) }}</p>
                  <button @click="(tableShow = true), getSql(item.id)">
                    生成表
                  </button>
                  <button>举报</button>
                </div>
              </div>
            </template>
            <div class="pag">
              <el-pagination layout=" prev, pager, next" :total="totalRecords" :page-size="pageSize"
                :current-page="currentPage" @current-change="handlePageChange" />
            </div>
          </template>

          <template v-slot:drInfo>
            <el-drawer v-model="tableShow" title="生成字典表成功" style="width: 1200px">
              <div class="result">
                <div class="text">
                  <p>生成结果</p>
                </div>
                <el-tabs v-model="activeName" class="demo-tabs">
                  <el-tab-pane label="SQL代码" name="first">
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
        </infoLeft>
      </template>

      <template v-slot:result>
        <dictRight></dictRight>
      </template>
    </infoAll>
  </div>
</template>

<style lang="less" scoped>
.lexicon {
  .Button {
    padding: 5px 10px;
    color: white;
    background-color: #1890ff;
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
      p {
        font-size: 16px;
        margin-right: 7px !important;
      }

      span {
        font-size: 12px;
        padding: 1px 5px;
        color: #d99521;
        border: 1px solid #d99521;
        background-color: #fffbe6;
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
