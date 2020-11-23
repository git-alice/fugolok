import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import { auth } from './firebase'

import Home from "@/views/home/Home";
import Login from "@/views/auth/Login";
import Land from "@/views/land/Land";
import Register from "@/views/auth/Register";

Vue.use(VueRouter)

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/main',
            component: Land,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
    ]
})

// Тут происходит проверка
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (store.getters.isLoggedIn) {
//             next()
//             return
//         }
//         next('/login')
//     } else {
//         next()
//     }
// })
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/login')
    } else {
        next()
    }
})

export default router;