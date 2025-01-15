import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useFormDataStore = defineStore('formData', () => {
    const formData = reactive({})
    return { formData }
})