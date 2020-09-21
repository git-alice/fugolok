export default {
    actions: {},
    mutations: {},
    state: {
        posts: [{
            id: 1, title: "Post's title"
        }]
    },
    getters: {
        allPosts(state) {
            return state.posts
        }
    },
}