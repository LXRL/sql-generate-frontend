<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import infoRight from "@/components/infoRight.vue";
import useFormList from "@/store/modules/formList";
import { getFieSql, deleteMyFiePage } from "@/api";
import { useRouter } from "vue-router";
import { useMessage } from '@/hook/useMessage';

const formListStore = useFormList();
const { MyFieldsPage } = storeToRefs(formListStore);
formListStore.fetchGetMyFiePage();

const pageValue: any = computed(()=>MyFieldsPage?.value)
const isNull = computed(() => pageValue?.value?.records?.length);

// 分页
const currentPage = ref(1);
const pageSize = ref(3);
const totalRecords = computed(() => pageValue?.value?.records?.length);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return pageValue?.value?.records?.slice(start, end);
});

// 分页变化处理
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

// search
const search = ref("");

// key
const getContent = (content: any) => {
  const jsonObject = JSON.parse(content);
  return jsonObject;
};

// 日期
const getTime = (time: any) => {
  return time.substring(0, 10);
};


// 复制语句
const getCopy = async (id: number) => {
  try {
    const res: any= await getFieSql(id);
    await navigator.clipboard.writeText(res.data);
    useMessage.success("复制创建字段SQL成功")
  } catch (error: any) {
    useMessage.failed(error);
  }
};

// 判断
const judgment = (value: boolean) => {
  if (value) return value;
  else return "无";
};
const judgmentZ = (value: boolean) => {
  if (value) return "是";
  else return "否";
};
const judgmentK = (value: boolean) => {
  if (value) return "是";
  else return "否";
};

// 删除
const deleteShow = ref(
  Array(pageValue?.value?.records?.length).fill(false)
);
const deletePage = async (id: number) => {
  try {
    await deleteMyFiePage(id);
    formListStore.fetchGetMyFiePage();
    useMessage.success("删除成功");
  } catch (error: any) {
    useMessage.failed(error);
  }
};

const router = useRouter();
const genTo = () => {
  router.push("/");
};
</script>
<template>
  <div class="Right">
    <infoRight>
      <template v-slot:heInfo>
        <p>个人字段</p>
        <button class="Button" @click="genTo()">去创建</button>
      </template>
      <template v-slot:seInfo v-if="isNull">
        <el-input v-model="search" placeholder="请输入名称" style="width: 200px"></el-input>
        <button class="Button">搜索</button>
      </template>
      <template v-slot:daInfo>
        <div v-if="isNull">
          <template v-for="(item, index) in paginatedData" :key="item.name">
          <div class="daInfo">
            <div class="name">
              <h4>{{ item.name }}</h4>
              <span class="">官方</span>
            </div>
            <div class="filedList">
              <div>
                表名: <span>{{ getContent(item.content).fieldName }}</span>
              </div>
              <div>
                类型: <span>{{ getContent(item.content).fieldType }}</span>
              </div>
              <div>
                注释: <span>{{ getContent(item.content).comment }}</span>
              </div>
              <div>
                默认值:
                <span>{{
                  judgment(getContent(item.content).defaultValue)
                }}</span>
              </div>
              <div>
                自增:
                <span>{{
                  judgmentZ(getContent(item.content).autoIncrement)
                }}</span>
              </div>
              <div>
                主键:
                <span>{{
                  judgmentZ(getContent(item.content).primaryKey)
                }}</span>
              </div>
              <div>
                非空:
                <span>{{ judgmentK(getContent(item.content).notNull) }}</span>
              </div>
              <div>
                onUpDate:
                <span>{{ judgment(getContent(item.content).onUpdate) }}</span>
              </div>
            </div>

            <div class="time">
              <p>{{ getTime(item.updateTime) }}</p>
              <button class="bu" @click="getCopy(item.id)">复制语句</button>
              <button>举报</button>
              <el-popover :visible="deleteShow[index]" placement="top" :width="160">
                <p>你确定要删除？</p>
                <div style="text-align: right; margin: 10px 0 0 0">
                  <el-button size="small" text @click="deleteShow[index] = false">取消</el-button>
                  <el-button size="small" type="primary" @click="(deleteShow[index] = false), deletePage(item.id)">
                    确定
                  </el-button>
                </div>
                <template #reference>
                  <el-button @click="deleteShow[index] = true"
                    style="border: none; background-color: #f9f9f9">删除</el-button>
                </template>
              </el-popover>
            </div>
          </div>
        </template>
        </div>
        <template v-else>
          <div class="null">
            <img src="@/assets/images/null.png" alt="" />
            <p>暂无数据</p>
          </div>
        </template>
        <div class="pag">
          <el-pagination layout=" prev, pager, next" :total="totalRecords" :page-size="pageSize"
            :current-page="currentPage" @current-change="handlePageChange" />
        </div>
      </template>
    </infoRight>
  </div>
</template>

<style lang="less" scoped>
.Right {
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
        color: #d99521;
        border: 1px solid #d99521;
        background-color: #fffbe6;
      }

      button {
        padding: 5px 15px;
        margin-left: auto;
        border: 1px solid var(--underline-border-color);

        &:hover {
          color: #1890ff;
          border: 1px solid #1890ff;
        }
      }
    }

    .filedList {
      width: 100%;
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

  .null {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100px;
    }

    p {
      color: #c7c7c7;
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
