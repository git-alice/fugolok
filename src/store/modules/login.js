import { auth, usersCollection } from "../../firebase";
import router from "../../router"

export default {
    state: {
        status: '',
        user : {'info': 'empty'},
        userProfile: {},
        temp: 'temp'
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        setUser(state, user){
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
        },
        setUserProfile(state, val) {
            state.userProfile = val
        }
    },
    actions: {
        async firebase_login({ dispatch, commit }, form) {
            // sign user in
            const { user } = await auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUser', user)
            commit('setUserProfile', userProfile.data())

            // change route to dashboard
            if (router.currentRoute.path === '/login') {
                await router.push('/home')
            }
        }
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user,
    }
}