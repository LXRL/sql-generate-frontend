import { defineStore } from 'pinia';
import { getLexPage } from '@/service/modules/lexicon'
const useFormList = defineStore("formList", {
    state: () => ({
        formPage: []
    }),
    actions: {
        async fetchGetLexPage() {
            const res = await getLexPage()
            this.formPage = res.data
        }
    }
})

export default useFormList

