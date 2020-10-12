import Vue from 'vue';
import Vuex from 'vuex';
import posts from '@/store/modules/posts';
import windows from "@/store/modules/windows";
import login from "@/store/modules/login";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        posts,
        windows,
        login
    }
})