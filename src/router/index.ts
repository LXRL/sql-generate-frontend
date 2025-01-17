import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/generate"
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
        path: "/generate",
        component: () => import("@/view/generate/generate.vue")
    },
    {
        path: "/lexicon",
        component: () => import("@/view/lexicon/lexicon.vue")
    },
    {
        path: "/table",
        component: () => import("@/view/table/table.vue")
    },
    {
        path: "/fields",
        component: () => import("@/view/fields/fields.vue")
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router