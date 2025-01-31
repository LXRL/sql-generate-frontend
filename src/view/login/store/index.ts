import { defineStore } from 'pinia';
import { getUserInfo, postUserLogin, postUserLogout, postUserRegister } from '../../../api';
import { set } from 'lodash';
import { useMessage } from '@/hook/useMessage';


const useUserLoginStore = defineStore('login', {
    state: () => ({
        isLoggedIn: false,
        userData: {}
    }),
    persist: true,
    actions: {
        async fetchUserLogin(params: any) {
            const loginResp: any = await postUserLogin(params)
            if (loginResp.code !== 0) {
                useMessage.failed();
                return;
            }
            const res: any = await getUserInfo();
            this.isLoggedIn = true
            this.userData = res.data as any
            useMessage.success('登录成功')
        },
        async fetchUserLogout() {
            await postUserLogout();
            this.isLoggedIn = false;
        },
        async fetchUserRegister(params: any) {
            const logoutResp: any = await postUserRegister(params)
            if (logoutResp.code !== 0) {
                useMessage.failed();
                return;
            }
            useMessage.success('登录成功')
        },
        updateState(payload: any = {}) {
            Object.keys(payload).forEach((key) => {
                set(this, key, payload[key]);
            });
        },
    }
})

export default useUserLoginStore