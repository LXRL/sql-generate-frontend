import { defineStore } from 'pinia';

const userLogin = defineStore('login', {
    state: () => ({
        isLoggedIn: false,
        userData: {}
    })
})

export default userLogin