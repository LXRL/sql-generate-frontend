import { defineStore } from 'pinia';
import type { FormFieldList, FormType } from '../../../types';
import { set } from 'lodash';

export const usGenerateStore = defineStore('generate', {
    state: (): FormType => ({
        dbName: 'library',
        tableName: 'test_table',
        tableComment: '',
        mockNum: 10,
        fieldList: [] as FormFieldList[]
    }),
    getters: {},
    actions: {
        updateState(payload: any = {}) {
            Object.keys(payload).forEach((key) => {
                set(this, key, payload[key]);
            });
        },
    },
})
