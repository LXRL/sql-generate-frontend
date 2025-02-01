<script setup lang="ts">
import { ref, computed } from 'vue';
import resultCode from './resultCode.vue'
import { useFormDataStore } from '@/store/modules/formData';
import { storeToRefs } from 'pinia';

const activeName = ref('first')
const formDataStore = useFormDataStore()
const { formData } = storeToRefs(formDataStore)
const hasData = computed(() => {
    return formData?.value && Object.keys(formData?.value).length > 0;
});
</script>
<template>
    <div class="result">
        <div class="text">
            <p>生成结果</p>
        </div>
        <template v-if="hasData">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="SQL 代码" name="first">
                    <result-code language="insertSql" name="插入语句" />
                </el-tab-pane>
                <el-tab-pane label="模拟数据" name="second">
                    <result-code language="dataJson" name="模拟数据" />
                </el-tab-pane>
                <el-tab-pane label="JSON 数据" name="third">
                    <result-code language="dataJson" name="JSON数据" />
                </el-tab-pane>
                <el-tab-pane label="Go代码" name="fourth">
                    <result-code language="goStructCode" name="Go结构体" />
                </el-tab-pane>
                <el-tab-pane label="java代码" name="five">
                    <result-code language="javaEntityCode" name="实体代码" />
                </el-tab-pane>
            </el-tabs>
        </template>
        <template v-else>
            <div class="null">
                <img src="@/assets/images/null.png" alt="">
                <p>请先输入配置并点击【一键生成】</p>
            </div>
        </template>
    </div>
</template>
<style lang="less" scoped>
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

    .null {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            width: 100px;
        }

        p {
            color: #333;
        }
    }
}
</style>