import { defineStore } from 'pinia';
import { getLexPage } from '@/service/modules/lexicon'
import { getTabPage } from '@/service/modules/table';
import { getFiePage } from '@/service/modules/fields';
const useFormList = defineStore("formList", {
    state: () => ({
        // 公开
        formPage: [],
        tablePage: [],
        fieldsPage: [],

        // 个人
        MyformPage:[]
    }),
    actions: {
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
        }
    }
})

export default useFormList

