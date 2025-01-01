import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home"
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router