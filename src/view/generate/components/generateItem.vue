<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { useFormStore } from "../../../store/modules/formStore";
import { cloneDeep } from "lodash";
import { storeToRefs } from "pinia";
import useFormList from "@/store/modules/formList";
import { useRouter } from "vue-router";
import { useMessage } from "@/hook/useMessage";
import { AddMyFiePage } from "@/api";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
});


watch(
  () => props.item.mockType,
  (v) => {
    switch (v) {
      case "随机":
        props.item.mockParams = '字符串'
        break;
      case "递增":
        props.item.mockParams = 1
        break;
      default:
        props.item.mockParams = ''
        break;
    }
  }
)

const formStore = useFormStore();
const activeNames = ref(["1"]);
const fieldListOptions = ref(["随机", "递增", "规则", "词库", "不模拟"]);
const fieldTypeLabel = (mockType: string) => {
  switch (mockType) {
    case "随机":
      return "随机规则:";
    case "递增":
      return "起始值:";
    case "规则":
      return "规则:";
    case "词库":
      return "词库类型:";
    default:
      return "随机规则:";
  }
};
const random = ref([
  "字符串",
  "整数",
  "小数",
  "日期",
  "时间戳",
  "网址",
  "IP",
  "邮箱",
  "手机号",
  "人名",
  "城市",
  "大学",
]);

// 删除列表
const fieldListDelete = (index: number) => {
  const tempFieldList = cloneDeep(formStore.fieldList);
  tempFieldList.splice(index, 1);
  formStore.updateState({
    ...formStore.$state,
    fieldList: tempFieldList,
  });
};

// 保存
const fieldsSaveShow = ref<boolean>(false);

const fieldsForm = reactive({
  name: "",
  content: "",
});

const fieldsContent = (data: any) => {
  fieldsSaveShow.value = true;
  fieldsForm.content = JSON.stringify(data);
};

const fieldsSubmit = async () => {
  try {
    await AddMyFiePage(fieldsForm);
    fieldsSaveShow.value = false;
  } catch (error: any) {
    useMessage.failed(error.message);
  }
};

const fieldsReset = () => {
  fieldsForm.name = "";
};


// 词库
const recordsModel = ref('')
const formListStore = useFormList();
const { MyFormPage } = storeToRefs(formListStore);
formListStore.fetchGetMyDictPage();

const pageValue: any = computed(()=>MyFormPage?.value)

const records = computed(() => pageValue?.value.records)
const handleSelectChange = (value: string) => {
  const filteredRecords = records.value.filter((item: any) => item.name === value)
  props.item.mockParams = filteredRecords[0].id
};

const router = useRouter()
const dictAddTo = () => router.push("/dict/add")
const dictRefresh = () => {
  formListStore.fetchGetMyDictPage();
  useMessage.success("已刷新")
}
</script>

<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item :name="index + 1">
      <template #title>
        <div class="fieldListTitle">
          <el-form-item label="字段名:">
            <el-input v-model="item.fieldName" placeholder="多个单词间建议用下划线分割" />
          </el-form-item>
          <div class="buDiv">
            <span @click="fieldsContent(item)">保存</span>
            <span @click="fieldListDelete(index)">删除</span>
          </div>
        </div>
      </template>
      <!-- info -->
      <div class="fieldListInfo">
        <el-form-item label="字段类型:">
          <el-input v-model="item.fieldType" placeholder="varchar(256)" style="width: 120px" />
        </el-form-item>
        <el-form-item label="默认值:">
          <el-input v-model="item.defaultValue" placeholder="要和字段类型匹配" />
        </el-form-item>
        <el-form-item label="注释:">
          <el-input v-model="item.comment" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="onUpdate:">
          <el-input v-model="item.onUpdate" placeholder="字段更新动作" />
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="item.notNull" name="type" v-model="item.notNull">
            非空
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="item.primaryKey" name="type" v-model="item.primaryKey">
            主键
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="item.autoIncrement" name="type" v-model="item.autoIncrement">
            自增
          </el-checkbox>
        </el-form-item>
        <el-form-item label="字段类型:">
          <el-select v-model="item.mockType" placeholder="" size="large" style="width: 120px">
            <el-option v-for="item in fieldListOptions" :key="item" :label="item" :value="item"
              style="padding: 0 10px !important;" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.mockType != '不模拟'" :label="fieldTypeLabel(item.mockType)">
          <template v-if="item.mockType === '随机'">
            <el-select v-model="item.mockParams" placeholder="" size="large" style="width: 120px;">
              <el-option v-for="item in random" :key="item" :label="item" :value="item"
                style="padding: 0 10px !important;" />
            </el-select>
          </template>
          <template v-else-if="item.mockType === '递增'">
            <el-input v-model="item.mockParams" style="width: 88px" />
          </template>
          <template v-else-if="item.mockType === '规则'">
            <el-input v-model="item.mockParams" style="width: 160px" placeholder="请输入正则表达式" />
          </template>
          <template v-else-if="item.mockType === '词库'">
            <div class="dictSelect">
              <el-select v-model="recordsModel" @change="handleSelectChange" placeholder="" size="large"
                style="width: 120px;">
                <el-option v-for="item in records" :key="item.name" :label="item.name" :value="item.name"
                  style="padding: 0 10px !important;" />
                <div class="bo" style="padding: 5px; border-top: 1px solid var(--underline-border-color);">
                  <el-button @click="dictAddTo()">创建</el-button>
                  <el-button @click="dictRefresh()">刷新</el-button>
                </div>
              </el-select>
            </div>
          </template>
        </el-form-item>
      </div>
    </el-collapse-item>
  </el-collapse>

   <!-- 保存字段 -->
   <el-dialog v-model="fieldsSaveShow" title="保存字段信息(后续可直接导入)" width="520" style="padding: 24px">
      <div class="header" style="margin-bottom: 16px">
        注意,你提交的内容可能会被公开
      </div>
      <el-form :model="fieldsForm">
        <el-form-item>
          <p>名称</p>
          <el-input v-model="fieldsForm.name" placeholder="请输入中文名称" />
        </el-form-item>
        <el-form-item>
          <p>内容 (不建议在此处修改)</p>
          <el-input class="add" v-model="fieldsForm.content" autocomplete="off" placeholder="请输入配置JSON，可以从表单输入处复制"
            type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="fieldsSubmit()">提交</el-button>
          <el-button @click="fieldsReset()">重置</el-button>
        </div>
      </template>
    </el-dialog>
</template>

<style lang="less" scoped>
.el-collapse {
  width: 100%;
  margin-bottom: 2px;

  .el-collapse-item {
    background-color: #fafafa;
    border: 1px solid var(--underline-border-color);

    .fieldListTitle {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .buDiv {
        span {
          padding: 5px 10px;
          font-size: 14px;
          margin: 0 10px;
          color: #333;

          &:last-child {
            color: red;
          }

          &:hover {
            background-color: #f5f5f5;
          }
        }
      }
    }

    .el-collapse-item__content {
      padding-bottom: 0 !important;

      .fieldListInfo {
        display: flex;
        flex-wrap: wrap;
        padding: 16px !important;
        border-top: 1px solid var(--underline-border-color);

        .el-form-item {
          margin-right: 16px;
          margin-bottom: 16px;

          .el-input {
            width: 182px;
          }
        }


      }
    }
  }

}
</style>
