export default {
    state: {
        windows: {}
    },
    actions: {
        setCookies(context, options) {
            console.log('From setCookie');

            let windowName = options.windowName
            let cookiesConfig = options.vm.$cookies.get('userConfig');

            if (cookiesConfig) {
                cookiesConfig = {'openedWindows': {
                    'Help': {
                        initHeight: 585,
                        initWidth: 375,
                        initX: 400,
                        initY: 400
                    },
                }}
            }

            let currentCookiesWindowOptions = cookiesConfig.openedWindows[windowName] || {}

            if (currentCookiesWindowOptions) {
                let x = options.x || currentCookiesWindowOptions.initX || 0,
                    y = options.y || currentCookiesWindowOptions.initY || 0,
                    w = options.w || currentCookiesWindowOptions.initWidth || 0,
                    h = options.h || currentCookiesWindowOptions.initHeight || 0;

                let newWindowConfig = Object.assign(currentCookiesWindowOptions, {initX: x, initY: y, initHeight: h, initWidth: w});
                let windows = Object.assign(cookiesConfig.openedWindows, { [windowName]: newWindowConfig })
                let updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows})

                options.vm.$cookies.set('userConfig', updatedUserConfig)
                context.commit('updateCookiesWindows', windows);
            }
        },
        loadCookieWindows(context, vm) {
            let windows =  vm.$cookies.get('userConfig').openedWindows;
            console.log('Windows Loaded')
            context.commit('updateCookiesWindows', windows);
        }
    },
    mutations: {
        updateCookiesWindows(state, windows) {
            console.log('Windows cookie updated');
            state.windows = windows;
        }
    },
    getters: {
        allWindows(state) {
            return state.windows
        }
    }
}