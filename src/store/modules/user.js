import axios from 'axios'

export default {
    state: {
        me: {}
    },
    mutations: {
        addMe(state, me){
            state.me = me
        },
    },
    actions: {
        fetchMe({commit}) {
            return new Promise((resolve, reject) => {
                axios({url: 'http://192.168.0.98:8000/api/v1/users/me', method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    }
                })
                    .then(resp => {
                        commit('addMe', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log('rejqct')
                        reject(err)
                    })
            })
        },
    },
    getters : {
        me: state => state.me,
    }
}