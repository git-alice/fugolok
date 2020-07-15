import Vue from 'vue'
import VueRouter from 'vue-router'

import Window_1 from "./components/Window_1";
import Window_2 from "./components/Window_2";
import Home from "./components/Home";
import Library from "./components/Library";
import Konva from './components/Konva'

Vue.use(VueRouter)

export default  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/home', component: Home },
        { path: '/window_1', component: Window_1},
        { path: '/window_2', component: Window_2},
        { path: '/library', component: Library},
        { path: '/Konva', component: Konva},
    ]
})