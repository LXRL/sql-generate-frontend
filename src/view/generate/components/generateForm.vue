<script setup lang="ts">
import { ref, reactive } from "vue";
import { getGenSchema } from "@/api/index";
import { useFormStore } from "@/store/modules/formStore";
import { useFormDataStore } from "@/store/modules/formData";
import { AddMyTabPage, AddMyFiePage } from "@/api";
import genFields from "./genFields.vue";
import generateItem from "./generateItem.vue";
import { cloneDeep } from "lodash";
import draggable from "vuedraggable";
import { useMessage } from "@/hook/useMessage";

// Form
const formStore = useFormStore();

const defaultItem = {
  fieldName: "username",
  fieldType: "varchar(256)",
  defaultValue: "",
  notNull: true,
  comment: "用户名",
  primaryKey: false,
  autoIncrement: false,
  mockType: "随机",
  mockParams: "",
  onUpdate: "",
};

const commonItems = [
  {
    fieldName: "id",
    fieldType: "bigint",
    defaultValue: "",
    notNull: true,
    comment: "主键",
    primaryKey: true,
    autoIncrement: true,
    mockType: "不模拟",
    mockParams: "",
    onUpdate: "",
  },
  {
    fieldName: "create_time",
    fieldType: "datetime",
    defaultValue: "CURRENT_TIMESTAMP",
    notNull: true,
    comment: "创建时间",
    primaryKey: false,
    autoIncrement: false,
    mockType: "不模拟",
    mockParams: "",
    onUpdate: "",
  },
  {
    fieldName: "update_time",
    fieldType: "datetime",
    defaultValue: "CURRENT_TIMESTAMP",
    notNull: true,
    comment: "更新时间",
    primaryKey: false,
    autoIncrement: false,
    mockType: "不模拟",
    mockParams: "",
    onUpdate: "CURRENT_TIMESTAMP",
  },
  {
    fieldName: "is_deleted",
    fieldType: "tinyint",
    defaultValue: "0",
    notNull: true,
    comment: "是否删除(0-未删,1-已删)",
    primaryKey: false,
    autoIncrement: false,
    mockType: "不模拟",
    mockParams: "",
    onUpdate: "",
  },
];

// newClick 新增字段
const newClick = () => {
  const tempFieldList = cloneDeep(formStore.fieldList);
  tempFieldList.push(defaultItem);
  formStore.updateState({
    ...formStore.$state,
    fieldList: tempFieldList,
  });
};

// universalClick 新增通用字段
const universalClick = () => {
  const tempFieldList = cloneDeep(formStore.fieldList);
  tempFieldList.push(commonItems);
  formStore.updateState({
    ...formStore.$state,
    fieldList: tempFieldList,
  });
};


// submit 提交
const formDataStore = useFormDataStore();
const onSubmit = async () => {
  try {
    const response = await getGenSchema(formStore);
    formDataStore.formData = response.data;
    useMessage.success("已生成");
  } catch (error) {
    useMessage.failed(error);
  }
};

//  重置
const resetClick = () => {
  formStore.$reset();
};

// 保存表
const saveShow = ref(false);

const saveForm = reactive({
  name: "",
  content: "",
});

const saveContent = () => {
  if (formStore.fieldList.length > 0) {
    saveShow.value = true;
    saveForm.content = JSON.stringify(formStore);
  } else {
    useMessage.failed("至少添加一个字段");
  }
};

const saveSubmit = async () => {
  try {
    await AddMyTabPage(saveForm);
    saveShow.value = false;
    useMessage.success("添加成功");
  } catch (error) {
    useMessage.failed(error);
  }
};
const reset = () => {
  saveForm.name = "";
};
// 复制配置
const disposition = async () => {
  const res = JSON.stringify(formStore);
  await navigator.clipboard.writeText(res);
  useMessage.success("已复制到剪切板");
};
//  导入字段
const fieldsShow = ref<boolean>(false);

// 保存字段
const fieldsSaveShow = ref<boolean>(false);
const fieldsForm = reactive({
  name: "",
  content: "",
});

const fieldsSubmit = async () => {
  try {
    await AddMyFiePage(fieldsForm);
    fieldsSaveShow.value = false;
  } catch (error) {
    useMessage.failed(error);
  }
};
const fieldsReset = () => {
  fieldsForm.name = "";
};
</script>

<template>
  <div class="Form">
    <el-form label-width="auto" label-position="left">
      <!-- dbName -->
      <el-form-item label="库名:">
        <el-input v-model="formStore.dbName" placeholder="多个单词间建议用下划线分割" />
      </el-form-item>

      <!-- tableName -->
      <el-form-item label="表名:">
        <el-input v-model="formStore.tableName" placeholder="test_table" />
      </el-form-item>

      <!-- tableComment -->
      <el-form-item label="表注释:">
        <el-input v-model="formStore.tableComment" placeholder="描述表的中文名称作用等" />
      </el-form-item>

      <!-- mockNum -->
      <el-form-item label="生成条数:">
        <el-input v-model="formStore.mockNum" type="number" style="width: 60px" />
      </el-form-item>

      <!-- fieldList -->
      <el-form-item>
        <draggable :list="formStore.fieldList" animation="300" class="dra">
          <template #item="{ element, index }">
            <generateItem :item="element" :index="index" />
          </template>
        </draggable>
      </el-form-item>

      <!-- formP -->
      <el-form-item>
        <div class="formP" @click="newClick()">+ 新增字段</div>
        <div class="formP" @click="fieldsShow = true" style="margin: 10px 0">
          + 导入字段
        </div>
        <div class="formP" @click="universalClick()">+ 新增通用字段</div>
      </el-form-item>

      <!-- submit -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width: 200px">一键生成</el-button>
        <el-button @click="saveContent()">保存表</el-button>
        <el-button @click="disposition()">复制配置</el-button>
        <el-button @click="resetClick()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 保存表 -->
    <el-dialog v-model="saveShow" title="保存表信息(后续可直接导入)" width="520" style="padding: 24px">
      <div class="header" style="margin-bottom: 16px">
        注意,你提交的内容可能会被公开
      </div>
      <el-form :model="saveForm">
        <el-form-item>
          <p>名称</p>
          <el-input v-model="saveForm.name" placeholder="请输入中文名称" />
        </el-form-item>
        <el-form-item>
          <p>内容 (不建议在此处修改)</p>
          <el-input class="add" v-model="saveForm.content" autocomplete="off" placeholder="请输入配置JSON，可以从表单输入处复制"
            type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveSubmit()">提交</el-button>
          <el-button @click="reset()">重置</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 导入字段 -->
    <el-drawer v-model="fieldsShow" title="导入字段">
      <genFields></genFields>
    </el-drawer>

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
  </div>
</template>

<style lang="less" scoped>
.Form {
  margin-top: 16px;

  .el-form {
    .el-form-item {
      .formP {
        width: 100%;
        text-align: center;
        border: 1px dashed var(--underline-border-color);
        cursor: pointer;

        &:hover {
          color: #4dafff;
          border-color: #4dafff;
        }
      }
    }
  }

  .dra {
    width: 100%;
  }
}
</style>
