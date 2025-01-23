import { defineStore } from 'pinia';

const userLogin = defineStore('login', {
    state: () => ({
        isLoggedIn: false,
        userData: {}
    }),
    persist: true
})

export default userLogin