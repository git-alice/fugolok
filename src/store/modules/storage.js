import { storage } from "../../firebase";

export default {
    state: {
        photoURL: '',
    },
    mutations: {
        setPhotoURL(state, url){
            state.photoURL = url
        },
    },
    actions: {
        getAllPhotos(context) {
            let user = context.rootState.login.user

            let storageRef = storage.ref();
            storageRef.child(`users/photo/${user.uid}/img0034.jpg`).getDownloadURL().then(function(url) {
                context.commit('setPhotoURL', url)
            });

        },
        loadPhoto({ dispatch }, user) {

        }
    },
    getters : {
        getPhotoURL: state => state.photoURL,
    }
}