import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { FormFieldList, FormType } from '@/types';

export const useFormStore = defineStore('form', () => {
    const form: FormType = reactive({
        dbName: 'library',
        tableName: 'test_table',
        tableComment: '',
        mockNum: 10,
        fieldList: [] as FormFieldList[]
    });

    return { form };
});