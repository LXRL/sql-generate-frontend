<script setup lang="ts">
import { ref } from "vue";
import infoAll from "@/components/infoAll.vue";
import { useFormStore } from "@/store/modules/formStore";
import generateForm from "./components/generateForm.vue";
import { getGenAuto } from "@/api";
import { getUploadExcelFile } from "@/api";
import generateResult from "./components/generateResult.vue";
import genTable from "./components/genTable.vue";
import { useMessage } from "@/hook/useMessage";

// Form
const formStore = useFormStore();

// brainPower 智能导入
const content = ref<string>("");
const brainPowerShow = ref<boolean>(false);
const setBrain = () =>
  (content.value = "id,用户名,创建时间,更新时间,is_deleted");
const onSubmit = async () => {
  try {
    await getGenAuto(content.value);
    useMessage.success("导入成功");
  } catch (error) {
    useMessage.failed(error);
  }
};
// tableShow 导入表
const tableShow = ref<boolean>(false);

// disposition 导入配置
const disposition = ref();
const dispositionShow = ref<boolean>(false);
const setDisposition = () => {
  const exampleConfig = {
    dbName: "shut_db",
    tableName: "user",
    tableComment: "用户表",
    mockNum: 10,
    fieldList: [
      {
        fieldName: "id",
        fieldType: "bigint",
        defaultValue: null,
        notNull: true,
        comment: "id",
        primaryKey: true,
        autoIncrement: true,
        mockType: "递增",
        mockParams: 0,
        onUpdate: null,
      },
      {
        fieldName: "username",
        fieldType: "varchar(256)",
        defaultValue: null,
        notNull: true,
        comment: "用户名",
        primaryKey: false,
        autoIncrement: false,
        mockType: "随机",
        mockParams: "人名",
        onUpdate: null,
      },
      {
        fieldName: "create_time",
        fieldType: "datetime",
        defaultValue: "CURRENT_TIMESTAMP",
        notNull: true,
        comment: "创建时间",
        primaryKey: false,
        autoIncrement: false,
        mockType: "随机",
        mockParams: "日期",
        onUpdate: null,
      },
      {
        fieldName: "update_time",
        fieldType: "datetime",
        defaultValue: "CURRENT_TIMESTAMP",
        notNull: true,
        comment: "更新时间",
        primaryKey: false,
        autoIncrement: false,
        mockType: "随机",
        mockParams: "日期",
        onUpdate: "CURRENT_TIMESTAMP",
      },
      {
        fieldName: "is_deleted",
        fieldType: "tinyint",
        defaultValue: "0",
        notNull: true,
        comment: "是否删除(0-未删, 1-已删)",
        primaryKey: false,
        autoIncrement: false,
        mockType: "固定",
        mockParams: "0",
        onUpdate: null,
      },
    ],
  };
  disposition.value = JSON.stringify(exampleConfig, null, 2);
};

const getDisposition = () => {
  const parsedDisposition = JSON.parse(disposition.value);
  formStore.updateState({
    ...parsedDisposition,
  });
  dispositionShow.value = false;
  useMessage.success("导入成功")
};

// sqlShow 导入建表Sql
const tabSql = ref();
const sqlShow = ref<boolean>(false);
const setTabSql = () => {
  const exampleConfig =
    " -- 用户表 create table if not exists user(id bigint not null auto_increment comment '主键' primary key, username varchar(256) not null comment '用户名',create_time datetime default CURRENT_TIMESTAMP not null comment '创建时间',update_time datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',is_deleted tinyint default 0 not null comment '是否删除(0-未删, 1-已删)') comment '用户表'; ";
  tabSql.value = exampleConfig;
};
const getTabSql = () => {
  sqlShow.value = false;
  useMessage.success("导入成功");
};

// excel 导入Excel
const fileInput = ref<HTMLInputElement | null>(null);
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    getUploadExcelFile(target.files[0])
      .then((response: any) => {
        const data = response.data;
        formStore.updateState({
          ...data,
        });
        useMessage.success("导入成功");
      })
      .catch((error: any) => {
        useMessage.failed(error);
      });
  }
};
const uploadFile = () => {
  fileInput.value?.click(); // 触发文件选择对话框
};
</script>

<template>
  <div class="generate">
    <infoAll title="快速生成 SQL 和模拟数据，大幅提高开发测试效率！">
      <!-- conditions -->
      <template v-slot:conditions>
        <div class="infoCss">
          <!-- condHeader -->
          <div class="condHeader">
            <p>输入配置</p>
            <div class="select">
              <el-select disabled style="width: 118px" placeholder="MySQL">
                <el-option key="MySQL" label="MySQL" value="MySQL" />
              </el-select>
            </div>
          </div>
          <!-- formInfo -->
          <div class="formInfo">
            <!-- into -->
            <div class="into">
              <button class="brainPower Button" style="border: 1px solid #1890ff; color: #1890ff"
                @click="brainPowerShow = true">
                智能导入
              </button>
              <button class="table Button" @click="tableShow = true">
                导入表
              </button>
              <button class="disposition Button" @click="dispositionShow = true">
                导入配置
              </button>
              <button class="tableSQL Button" @click="sqlShow = true">
                导入建表SQL
              </button>
              <div>
                <input type="file" @change="onFileChange" ref="fileInput" style="display: none" />
                <button class="Excel Button" @click="uploadFile">
                  导入Excel
                </button>
              </div>
            </div>
            <!-- from -->
            <generateForm />
          </div>

          <!--智能导入 弹出框 -->
          <el-dialog v-model="brainPowerShow" title="智能导入" width="520" style="padding: 24px">
            <div class="header">
              请输入表的列名，多个列以【英文或中文逗号】分隔：<button class="Button" @click="setBrain">
                导入示例
              </button>
            </div>
            <el-form>
              <el-form-item>
                <el-input v-model="content" style="height: 361px" autocomplete="off"
                  placeholder="请输入表的列名，多个列以【英文或中文逗号】分隔：" />
              </el-form-item>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="onSubmit()">导入</el-button>
                <el-button @click="content = ''">重置</el-button>
              </div>
            </template>
          </el-dialog>

          <!-- 导入表 -->
          <el-drawer v-model="tableShow" title="导入表">
            <genTable></genTable>
          </el-drawer>

          <!-- 导入配置 -->
          <el-dialog v-model="dispositionShow" title="导入配置" width="520" style="padding: 24px">
            <div class="header">
              请输入表结构JSON：<button class="Button" @click="setDisposition">
                导入示例
              </button>
            </div>
            <el-form>
              <el-form-item>
                <el-input v-model="disposition" style="height: 361px" autocomplete="off"
                  placeholder="请输入配置JSON，可以从表单输入处复制" type="textarea" />
              </el-form-item>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="getDisposition()">导入</el-button>
                <el-button @click="disposition = ''">重置</el-button>
              </div>
            </template>
          </el-dialog>

          <!-- 导入建表SQL -->
          <el-dialog v-model="sqlShow" title="导入建表 SQL" width="520" style="padding: 24px">
            <div class="header">
              请输入建表 SQL 语句：<button class="Button" @click="setTabSql()">
                导入示例
              </button>
            </div>
            <el-form>
              <el-form-item>
                <el-input v-model="tabSql" style="height: 361px" autocomplete="off" placeholder="请输入配置JSON，可以从表单输入处复制"
                  type="textarea" />
              </el-form-item>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="getTabSql()">导入</el-button>
                <el-button @click="tabSql = ''">重置</el-button>
              </div>
            </template>
          </el-dialog>
        </div>
      </template>

      <template v-slot:result>
        <generateResult />
      </template>
    </infoAll>
  </div>
</template>

<style lang="less" scoped>
.generate {
  .infoCss {
    .condHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid var(--underline-border-color);
      background-color: white;
    }

    .formInfo {
      padding: 16px 24px;
      background-color: white;

      .into {
        display: flex;

        button {
          color: #333;
          background-color: white;
          border: 1px solid var(--underline-border-color);
          border-radius: 0;
          margin-right: 24px;
          padding: 5px 15px;
          font-size: 14px;
        }
      }
    }

    .el-dialog {
      .header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .Button {
          color: #333;
          padding: 7px 15px;
          border: 1px solid var(--underline-border-color);
        }
      }
    }

    .el-drawer {
      .header {
        display: flex;
        padding: 10px 24px;
        align-items: center;
        border-bottom: 1px solid var(--underline-border-color);

        button {
          margin-left: auto;
          background-color: #1890ff;
          color: white;
        }
      }

      .search {
        display: flex;
        padding: 10px 24px;
        align-items: center;

        button {
          background-color: #1890ff;
          color: white;
        }
      }
    }
  }
}
</style>
