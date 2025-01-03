import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: () => import("@/view/generate/generate.vue")
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router