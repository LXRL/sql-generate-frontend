<script setup lang="ts">
import { ref, reactive } from 'vue';
import { getGenSchema } from '@/service/index';
import { useFormStore } from '@/store/modules/formStore';
import { useFormDataStore } from '@/store/modules/formData';
import { AddMyTabPage } from '@/service';

// Form
const formStore = useFormStore();
const form = formStore.form

// formFielDList 表单列表内容
const activeNames = ref(['1'])
const fieldListOptions = ref(["随机", "递增", "规则", "词库", "不模拟"])
// 删除列表
const fieldListDelete = (index: number) => {
    form.fieldList.splice(index, 1)
}
// 根据选中的 mockType 返回对应的标签
const fieldTypeLabel = (mockType: string) => {
    switch (mockType) {
        case '随机':
            return '随机规则:';
        case '递增':
            return '起始值:';
        case '规则':
            return '规则:';
        case '词库':
            return '词库类型:';
        default:
            return '随机规则:';
    }
};
// random 下拉框选项
const random = ref(['字符串', '整数', '小数', '日期', '时间戳', '网址', 'IP', '邮箱', '手机号', '人名', '城市', '大学'])
// newClick 新增字段
const newClick = () => {
    form.fieldList.push({
        fieldName: 'username',
        fieldType: 'varchar(256)',
        defaultValue: '',
        notNull: true,
        comment: '用户名',
        primaryKey: false,
        autoIncrement: false,
        mockType: '随机',
        mockParams: '',
        onUpdate: ''
    });
}

// universalClick 新增通用字段
const universalClick = () => {
    form.fieldList.push(
        {
            fieldName: 'id',
            fieldType: 'bigint',
            defaultValue: '',
            notNull: true,
            comment: '主键',
            primaryKey: true,
            autoIncrement: true,
            mockType: '不模拟',
            mockParams: '',
            onUpdate: ''
        },
        {
            fieldName: 'create_time',
            fieldType: 'datetime',
            defaultValue: 'CURRENT_TIMESTAMP',
            notNull: true,
            comment: '创建时间',
            primaryKey: false,
            autoIncrement: false,
            mockType: '不模拟',
            mockParams: '',
            onUpdate: ''
        },
        {
            fieldName: 'update_time',
            fieldType: 'datetime',
            defaultValue: 'CURRENT_TIMESTAMP',
            notNull: true,
            comment: '更新时间',
            primaryKey: false,
            autoIncrement: false,
            mockType: '不模拟',
            mockParams: '',
            onUpdate: 'CURRENT_TIMESTAMP'
        },
        {
            fieldName: 'is_deleted',
            fieldType: 'tinyint',
            defaultValue: '0',
            notNull: true,
            comment: '是否删除(0-未删,1-已删)',
            primaryKey: false,
            autoIncrement: false,
            mockType: '不模拟',
            mockParams: '',
            onUpdate: ''
        },
    );
}
// submit 提交
const formDataStore = useFormDataStore()
const onSubmit = async () => {
    try {
        const response = await getGenSchema(form)
        console.log(response)
        formDataStore.formData = response.data
        console.log("formDataStore:", formDataStore.formData)
        console.log("javaEntityCode:", formDataStore.formData.data.javaEntityCode)
    } catch (error) {
        console.error('获取用户时出错:', error);
    }
}

//  重置 
const resetClick = () => {
    form.dbName = 'library';
    form.tableName = 'test_table';
    form.tableComment = '';
    form.mockNum = 10;
    form.fieldList = []; // 重置为一个空数组
}

// 保存表
const saveShow = ref(false)

type saveType = {
    name: string;
    content: string;
};

const saveForm = reactive<saveType>({
    name: '',
    content: ''
});

const saveContent = () => {
    saveShow.value = true
    saveForm.content = JSON.stringify(form)
}

const saveSubmit = async () => {
    try {
        const res = await AddMyTabPage(saveForm)
        saveShow.value = false
    } catch (error) {
        console.log("创建失败", error)
    }
}
</script>
<template>
    <div class="Form">
        <el-form :model="form" label-width="auto" label-position="left">
            <!-- dbName -->
            <el-form-item label="库名:">
                <el-input v-model="form.dbName" placeholder="多个单词间建议用下划线分割" />
            </el-form-item>

            <!-- tableName -->
            <el-form-item label="表名:">
                <el-input v-model="form.tableName" placeholder="test_table" />
            </el-form-item>

            <!-- tableComment -->
            <el-form-item label="表注释:">
                <el-input v-model="form.tableComment" placeholder="描述表的中文名称作用等" />
            </el-form-item>

            <!-- mockNum -->
            <el-form-item label="生成条数:">
                <el-input v-model="form.mockNum" type="number" style="width: 60px;" />
            </el-form-item>

            <!-- fieldList -->
            <el-form-item>
                <template v-for="(item, index) in form.fieldList">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item :name="index + 1">
                            <template #title>
                                <div class="fieldListTitle">
                                    <el-form-item label="字段名:">
                                        <el-input v-model="item.fieldName" placeholder="多个单词间建议用下划线分割" />
                                    </el-form-item>
                                    <div>
                                        <span>保存</span>
                                        <span @click="fieldListDelete(index)">删除</span>
                                    </div>
                                </div>
                            </template>
                            <!-- info -->
                            <div class="fieldListInfo">
                                <el-form-item label="字段类型:">
                                    <el-input v-model="item.fieldType" placeholder="varchar(256)"
                                        style="width: 120px;" />
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
                                        <el-option v-for="item in fieldListOptions" :key="item" :label="item"
                                            :value="item" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item v-if="item.mockType != '不模拟'" :label="fieldTypeLabel(item.mockType)">
                                    <template v-if="item.mockType === '随机'">
                                        <el-select v-model="item.mockParams" placeholder="" size="large"
                                            style="width: 120px">
                                            <el-option v-for="item in random" :key="item" :label="item" :value="item" />
                                        </el-select>
                                    </template>
                                    <template v-else-if="item.mockType === '递增'">
                                        <el-input v-model="item.mockParams" style="width: 88px;" />
                                    </template>
                                    <template v-else-if="item.mockType === '规则'">
                                        <el-input v-model="item.mockParams" style="width: 160px;"
                                            placeholder="请输入正则表达式" />
                                    </template>
                                    <template v-else-if="item.mockType === '词库'">
                                        <el-input v-model="item.mockParams" style="width: 130px;" />
                                    </template>
                                </el-form-item>

                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </template>
            </el-form-item>

            <!-- formP -->
            <el-form-item>
                <div class="formP" @click="newClick()">+ 新增字段</div>
                <div class="formP" style="margin: 10px 0;">+ 导入字段</div>
                <div class="formP" @click="universalClick()">+ 新增通用字段</div>
            </el-form-item>

            <!-- submit -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 200px;">一键生成</el-button>
                <el-button @click="saveContent()">保存表</el-button>
                <el-button>复制配置</el-button>
                <el-button @click="resetClick()">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 保存表 -->
        <el-dialog v-model="saveShow" title="保存表信息(后续可直接导入)" width="520" style="padding: 24px;">
            <div class="header" style="margin-bottom: 16px;">注意,你提交的内容可能会被公开</div>
            <el-form :model="saveForm">
                <el-form-item>
                    <p>名称</p>
                    <el-input v-model="saveForm.name" placeholder="请输入中文名称" />
                </el-form-item>
                <el-form-item>
                    <p>内容 (不建议在此处修改)</p>
                    <el-input class="add" v-model="saveForm.content" autocomplete="off"
                        placeholder="请输入配置JSON，可以从表单输入处复制" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="saveSubmit()">提交</el-button>
                    <el-button>重置</el-button>
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

            .el-collapse {
                width: 100%;
                margin-bottom: 2px;

                .el-collapse-item {
                    background-color: #FAFAFA;
                    border: 1px solid var(--underline-border-color);

                    .fieldListTitle {
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                        align-items: center;
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

            .formP {
                width: 100%;
                text-align: center;
                border: 1px dashed var(--underline-border-color);
                cursor: pointer;

                &:hover {
                    color: #4DAFFF;
                    border-color: #4DAFFF;
                }
            }
        }
    }


}
</style>