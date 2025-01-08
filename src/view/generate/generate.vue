<script setup lang="ts">
import infoAll from '@/components/infoAll.vue';
import generateForm from './components/generateForm.vue';
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
                            <button class="brainPower Button"
                                style="border: 1px solid #1890FF;color: #1890FF;">智能导入</button>
                            <button class="table Button">导入表</button>
                            <button class="disposition Button">导入配置</button>
                            <button class="tableSQL Button">导入建表SQL</button>
                            <button class="Excel Button">导入Excel</button>
                        </div>
                        <!-- from -->
                        <generateForm />
                    </div>
                </div>
            </template>

        </infoAll>
    </div>
</template>

<style lang="less" scoped>
.generate {
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
}
</style>