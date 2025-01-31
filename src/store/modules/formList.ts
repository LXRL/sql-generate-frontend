import { defineStore } from 'pinia';
import { getDictPage } from '@/api/modules/dict'
import { getTabPage } from '@/api/modules/table';
import { getFiePage } from '@/api/modules/fields';

import { getMyDictPage } from '@/api/modules/dict';
import { getMyTabPage } from '@/api/modules/table';
import { getMyFiePage } from '@/api/modules/fields';

const useFormList = defineStore("formList", {
    state: () => ({
        // 公开
        formPage: [],
        tablePage: [],
        fieldsPage: [],

        // 个人
        MyFormPage: [],
        MyTablePage: [],
        MyFieldsPage: [],
    }),
    actions: {
        // 公开
        async fetchGetDictPage() {
            const res: any = await getDictPage()
            this.formPage = res.data
        },
        async fetchGetTabPage() {
            const res: any = await getTabPage()
            this.tablePage = res.data
        },
        async fetchGetFiePage() {
            const res: any = await getFiePage()
            this.fieldsPage = res.data
        },

        // 个人
        async fetchGetMyDictPage() {
            const res: any = await getMyDictPage()
            this.MyFormPage = res.data
        },
        async fetchGetMyTabPage() {
            const res: any = await getMyTabPage()
            this.MyTablePage = res.data
        },
        async fetchGetMyFiePage() {
            const res: any = await getMyFiePage()
            this.MyFieldsPage = res.data
        },
    }
})

export default useFormList

