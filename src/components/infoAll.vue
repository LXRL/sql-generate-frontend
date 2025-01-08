<script setup lang="ts">
import { ref } from 'vue'
// 获取父组件值
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})

// 单选框值
const selectRadio = ref<string>('同屏')
</script>

<template>
    <div class="info">
        <!-- title -->
        <div class="title">
            <el-row :gutter="20">
                <!-- title -->
                <el-col :span="19">
                    <h2>{{ title }}</h2>
                </el-col>
                <!-- selectRadio -->
                <el-col class="select" :span="5">
                    <span>切换布局:</span>
                    <el-radio-group v-model="selectRadio">
                        <el-radio-button label="配置" value="配置" />
                        <el-radio-button label="同屏" value="同屏" />
                        <el-radio-button label="结果" value="结果" />
                    </el-radio-group>
                </el-col>
            </el-row>
        </div>

        <!-- feature -->
        <div class="feature">
            <div class="layout">
                <el-row v-if="selectRadio != '结果'">
                    <el-col :span="selectRadio === '配置' || selectRadio === '结果' ? 24 : 12">
                        <slot name="conditions"></slot>
                    </el-col>
                    <el-col :span="selectRadio === '配置' || selectRadio === '结果' ? 24 : 12">
                        <slot name="result"></slot>
                    </el-col>
                </el-row>

                <el-row v-else>
                    <el-col :span="24">
                        <slot name="result"></slot>
                    </el-col>
                    <el-col :span="24">
                        <slot name="conditions"></slot>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.info {
    width: 100%;
    padding: 16px 40px;
    box-sizing: border-box;

    .title {
        padding: 16px 0;
        margin-bottom: 12px;

        .select {
            display: flex;
            align-items: center;
            justify-content: end;

            span {
                margin-right: 10px;
            }
        }
    }

    .feature {
        .layout {
            .el-col {
                height: 200px;
            }
        }
    }
}
</style>