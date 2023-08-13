import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

import { baseApiUrl, userKey } from '@/global'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(async (to, from, next) => {
    const json = localStorage.getItem(userKey)
    const user = JSON.parse(json)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (user) {
            const admin = await axios.post(`${baseApiUrl}/validateAdmin`, user)
            if (admin.data) {
                next()
            } else {
                next({ path: '/' })
            }
        } else {
            next({ path: '/' })
        }
    } else {
        next()
    }
})

export default router