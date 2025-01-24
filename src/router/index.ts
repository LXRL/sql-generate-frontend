import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("@/view/generate/index.vue")
    },
    {
        path: "/login",
        component: () => import("@/view/login/login.vue"),
        meta: {
            hideTabBar: true
        }
    },
    {
        path: "/sign",
        component: () => import("@/view/login/sign.vue"),
        meta: {
            hideTabBar: true
        }
    },
    {
        path: "/dict/all",
        component: () => import("@/view/dict/index.vue")
    },
    {
        path: "/dict/add",
        component: () => import("@/view/dict/components/dictAdd.vue")
    },
    {
        path: "/dict/add_result",
        component: () => import("@/view/dict/components/AddResult.vue")
    },
    {
        path: "/table/all",
        component: () => import("@/view/table/index.vue")
    },
    {
        path: "/fields/all",
        component: () => import("@/view/fields/index.vue")
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router