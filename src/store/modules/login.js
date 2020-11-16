import axios from 'axios'

export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : {}
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({commit}, user) {
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('password', user.password);

            return new Promise((resolve, reject) => {
                commit('auth_request')

                axios({url: 'http://192.168.0.98:8000/api/v1/login/access-token', data: formData, method: 'POST',
                    headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                })
                    .then(resp => {
                        const token = `${resp.data.token_type} ${resp.data.access_token}`
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user,
    }
}