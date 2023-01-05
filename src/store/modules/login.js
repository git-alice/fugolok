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
        },
        setUserToken(state, val) {
            state.userToken = val
        }
    },
    actions: {
        async firebase_login({ dispatch, commit }, form) {
            // sign user in
            const { user } = await auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async firebase_logout({ dispatch, commit }, form) {
            await auth.signOut()
            router.push('/')
        },
        async fetchUserProfile({ commit }, user) {
            if (user) {
                // fetch user profile
                // const userProfile = await usersCollection.doc(user.uid).get()
                // set user profile in state
                // commit('setUserProfile', userProfile.data())

                // console.log('1', auth.currentUser)
                commit('setUserProfile', auth.currentUser)
                commit('setUserToken', auth.currentUser.getIdToken(true))

                // change route to dashboard
                if (router.currentRoute.path === '/login') {
                    router.push('/home')
                }
            } else {
                // change route to login
                router.push('/')
            }
        }
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user,
        getUserProfile: state => state.userProfile,
        getUserToken: state => state.userToken,
    }
}