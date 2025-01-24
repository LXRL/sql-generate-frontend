import { defineStore } from 'pinia';
import { getUserInfo, postUserLogin, postUserlogout, postUserRegister } from '../../../api';
import { ElMessage } from 'element-plus';
import { set } from 'lodash';

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
                this.failedMessage();
                return;
            }
            const res: any = await getUserInfo();
            this.isLoggedIn = true
            this.userData = res.data as any
            this.sucessMessage('登录成功');
        },
        async featchUserLogout() {
            await postUserlogout();
            this.isLoggedIn = false;
        },
        async fetchUserRegister(params: any) {
            const logoutResp: any = await postUserRegister(params)
            if (logoutResp.code !== 0) {
                this.failedMessage();
                return;
            }
            this.sucessMessage('注册成功');
        },
        sucessMessage(msg: string = 'ok') {
            ElMessage({
                message: msg,
                type: "success",
            });
        },
        failedMessage(msg: string = '请求失败') {
            ElMessage({
                message: msg,
                type: "error",
            });
        },
        updateState(payload: any = {}) {
            Object.keys(payload).forEach((key) => {
                set(this, key, payload[key]);
            });
        },
    }
})

export default useUserLoginStore