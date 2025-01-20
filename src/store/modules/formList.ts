import { defineStore } from 'pinia';
import { getLexPage } from '@/service/modules/lexicon'
import { getTabPage } from '@/service/modules/table';
import { getFiePage } from '@/service/modules/fields';

import { getMyLexPage } from '@/service/modules/lexicon';

const useFormList = defineStore("formList", {
    state: () => ({
        // 公开
        formPage: [],
        tablePage: [],
        fieldsPage: [],

        // 个人
        MyFormPage: []
    }),
    actions: {
        // 公开
        async fetchGetLexPage() {
            const res = await getLexPage()
            this.formPage = res.data
        },
        async fetchGetTabPage() {
            const res = await getTabPage()
            this.tablePage = res.data
        },
        async fetchGetFiePage() {
            const res = await getFiePage()
            this.fieldsPage = res.data
        },

        // 个人
        async fetchGetMyLexPage() {
            const res = await getMyLexPage()
            this.MyFormPage = res.data
        },
    }
})

export default useFormList

