import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/components/Home";
import Login from "@/views/auth/Login";

Vue.use(VueRouter)

export default  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/home', component: Home },
        { path: '/login', component: Login },
    ]
})