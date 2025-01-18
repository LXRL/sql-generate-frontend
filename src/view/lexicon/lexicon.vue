<script setup lang="ts">
import infoAll from '@/components/infoAll.vue';
import infoLeft from '@/components/infoLeft.vue';
import infoRight from '../../components/infoRight.vue';
import useFormList from '@/store/modules/formList';
import { storeToRefs } from 'pinia';

const formListStore = useFormList()
const { formPage } = storeToRefs(formListStore)
formListStore.fetchGetLexPage()
console.log(formPage.value)

</script>
<template>
    <div class="lexicon">
        <infoAll title="使用现成的词库来生成特定数据，或用作研究数据集！">
            <template v-slot:conditions>
                <infoLeft name="公开词库" butName="创建词库" :data="formPage?.data?.records" moduleName="lexicon" />
            </template>
            <template v-slot:result>
                <infoRight name="个人词库" butName="创建词库" />
            </template>
        </infoAll>
    </div>
</template>


<style lang="less" scoped></style>