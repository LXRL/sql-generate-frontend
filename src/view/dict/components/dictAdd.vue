<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useFormList from '@/store/modules/formList';
import { AddMyDictPage } from '@/api'
import { useRouter } from 'vue-router';

const formListStore = useFormList();
const { MyFormPage } = storeToRefs(formListStore);
formListStore.fetchgetMyDictPage();

type formType = {
    name: string;
    content: string;
};

const form = reactive<formType>({
    name: '',
    content: ''
});
const Data = ref<string | null>(null);
const option = ref<any[]>([]);

watch(MyFormPage, (newValue) => {
    option.value = newValue?.records || [];
});

const updateContent = (selectedValue: string) => {
    const selectedItem = option.value.find(item => item.name === selectedValue);
    const result = selectedItem ? selectedItem.content.replace(/[\[\]"]/g, '').replace(/,/g, ', ') : '';
    form.content = result
};
// 消息提示
const open2 = (text:any) => {
    ElMessage({
        message: text,
        type: 'success',
    })
}
const open4 = (error:any) => {
    ElMessage.error(error)
}

const onSubmit = async () => {
    try {
        const res = await AddMyDictPage(form)
        open2("创建成功")
        resultTo()
    } catch (error) {
        console.log(error)
    }
}

const reset = () => {
    form.name = ''
    form.content = ''
    Data.value = ''
}
// 跳转
const router = useRouter()
const resultTo = () => {
    router.push("/dict/add_result")
}
</script>

<template>
    <div class="Add">
        <h3>创建词库</h3>
        <el-form :model="form" label-width="auto">
            <el-form-item>
                <p>词库名称</p>
                <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item>
                <p>基础词库（可不选）</p>
                <el-select v-model="Data" placeholder="基础词库中的所有单词会自动添加到新词库中" @change="updateContent">
                    <el-option v-for="item in option" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <p>单词列表</p>
                <el-input class="add" v-model="form.content" type="textarea" placeholder="多个单词间用【英文或中文逗号】分割" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="less" scoped>
.Add {
    width: 100%;
    padding: 16px 40px;
    box-sizing: border-box;
    background-color: white;

    h3 {
        margin-bottom: 40px !important;
    }
}
</style>