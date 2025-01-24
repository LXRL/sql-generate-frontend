<script setup lang="ts">
import { ref, computed } from "vue";
import infoRight from "@/components/infoRight.vue";
import useFormList from "@/store/modules/formList";
import { storeToRefs } from "pinia";
import { getTabSql, deleteMyTabPage } from "@/api/modules/table";
import { useFormStore } from "@/store/modules/formStore";
import { useRouter } from "vue-router";

const formListStore = useFormList();
const { MyTablePage } = storeToRefs(formListStore);
formListStore.fetchGetMyTanPage();
const isNull = computed(() => MyTablePage?.value?.records?.length);

// 分页
const currentPage = ref(1);
const pageSize = ref(3);
const totalRecords = computed(() => MyTablePage?.value?.records?.length);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return MyTablePage?.value?.records?.slice(start, end);
});

// 分页变化处理
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};
// search
const search = ref("");

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

// 导入 form
const router = useRouter();
const formStore = useFormStore();
const setFormData = (content: any) => {
  const res = getContent(content);
  formStore.updateState({
    ...res,
  });
  router.push("/");
  open2("导入成功");
};

// key
const getContent = (content: any) => {
  const jsonObject = JSON.parse(content);
  return jsonObject;
};
const getName = (content: any) => {
  try {
    const jsonObject = JSON.parse(content);
    const fieldNames = jsonObject.fieldList
      .map((item: any) => item.fieldName)
      .join(", ");
    return fieldNames;
  } catch (error) {
    console.log("JSON parse error:", error);
    return content; // 如果解析失败，返回原始内容
  }
};
// 日期
const getTime = (time: any) => {
  return time.substring(0, 10);
};

// 复制语句
const getCopy = async (id: any) => {
  try {
    const res = await getTabSql(id);
    await navigator.clipboard.writeText(res.data);
    open2("复制建表SQL成功");
  } catch (error) {
    open4(error);
  }
};

// 删除
const deleteShow = ref(Array(MyTablePage?.value?.records?.length).fill(false));
const deletePage = async (id: any) => {
  try {
    await deleteMyTabPage(id);
    formListStore.fetchGetMyTabPage();
    open2("删除成功");
  } catch (error) {
    open4(error);
  }
};

const genTo = () => {
  router.push("/");
};
</script>
<template>
  <div class="Right">
    <infoRight>
      <template v-slot:heInfo>
        <p>个人表</p>
        <button class="Button" @click="genTo()">创建表</button>
      </template>
      <template v-slot:seInfo v-if="isNull">
        <el-input
          v-model="search"
          placeholder="请输入名称"
          style="width: 200px"
        ></el-input>
        <button class="Button">搜索</button>
      </template>
      <template v-slot:daInfo>
        <template
          v-if="isNull"
          v-for="(item, index) in paginatedData"
          :key="item.name"
        >
          <div class="daInfo">
            <div class="name">
              <h4>{{ item.name }}</h4>
              <span class="">官方</span>
              <button @click="setFormData(item.content)">导入</button>
            </div>
            <div class="dbName">
              <div>
                表名: <span>{{ getContent(item.content).tableName }}</span>
              </div>
              <div>
                表注释: <span>{{ getContent(item.content).tableComment }}</span>
              </div>
            </div>
            <div class="annotation">
              <p>
                字段列表: <span>{{ getName(item.content) }}</span>
              </p>
            </div>
            <div class="time">
              <p>{{ getTime(item.updateTime) }}</p>
              <button class="bu" @click="getCopy(item.id)">复制语句</button>
              <button>举报</button>
              <el-popover
                :visible="deleteShow[index]"
                placement="top"
                :width="160"
              >
                <p>你确定要删除？</p>
                <div style="text-align: right; margin: 10px 0 0 0">
                  <el-button
                    size="small"
                    text
                    @click="deleteShow[index] = false"
                    >取消</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    @click="(deleteShow[index] = false), deletePage(item.id)"
                  >
                    确定
                  </el-button>
                </div>
                <template #reference>
                  <el-button
                    @click="deleteShow[index] = true"
                    style="border: none; background-color: #f9f9f9"
                    >删除</el-button
                  >
                </template>
              </el-popover>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="null">
            <img src="@/assets/images/null.png" alt="" />
            <p>暂无数据</p>
          </div>
        </template>
        <div class="pag">
          <el-pagination
            layout=" prev, pager, next"
            :total="totalRecords"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
          />
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

    & > div {
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
