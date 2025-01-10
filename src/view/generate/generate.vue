<script setup lang="ts">
import { reactive, ref } from 'vue';
import infoAll from '@/components/infoAll.vue';
import generateForm from './components/generateForm.vue';
import type { FormFieldList, FormType } from '@/types';
import { getGenAuto } from '@/service';
// Form
const form: FormType = reactive({
    dbName: 'library',
    tableName: 'test_table',
    tableComment: '',
    mockNum: 10,
    fieldList: [] as FormFieldList[] // 初始化为一个空数组
})

// brainPower 智能导入
const content = ref<string>('')
const brainPowerShow = ref<boolean>(false)
const setBrain = () => content.value = 'id，用户名，创建时间，更新时间，is_deleted'
const onSubmit = async () => {
    try {
        const response = await getGenAuto(content.value)
        console.log(response)
    } catch (error) {
        console.error('获取用户时出错：', error);
    }
}
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
                            <el-select disabled style="width: 118px;" placeholder="MySQL">
                                <el-option key="MySQL" label="MySQL" value="MySQL" />
                            </el-select>
                        </div>
                    </div>
                    <!-- formInfo -->
                    <div class="formInfo">
                        <!-- into -->
                        <div class="into">
                            <button class="brainPower Button" style="border: 1px solid #1890FF;color: #1890FF;"
                                @click="brainPowerShow = true">智能导入</button>
                            <button class="table Button">导入表</button>
                            <button class="disposition Button">导入配置</button>
                            <button class="tableSQL Button">导入建表SQL</button>
                            <button class="Excel Button">导入Excel</button>
                        </div>
                        <!-- from -->
                        <generateForm :form="form" />
                    </div>
                    <!-- el-dialog 弹出框 -->
                    <el-dialog v-model="brainPowerShow" title="智能导入" width="520" style="padding: 24px;">
                        <div class="header">请输入表的列名，多个列以【英文或中文逗号】分隔：<button class="Button"
                                @click="setBrain">导入示例</button></div>
                        <el-form>
                            <el-form-item>
                                <el-input v-model="content" style="height: 361px;" autocomplete="off"
                                    placeholder="请输入表的列名，多个列以【英文或中文逗号】分隔：" />
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button type="primary" @click="onSubmit()">
                                    导入
                                </el-button>
                                <el-button @click="content = ''">重置</el-button>
                            </div>
                        </template>
                    </el-dialog>
                </div>
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
    }
}
</style>