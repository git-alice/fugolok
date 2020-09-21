export default {
    state: {
        windows: {},
        activeWindow: 'Library'
    },
    actions: {
        setDefaultConfig(context, vm) {
            let windows = {'Help': {
                    initHeight: 585,
                    initWidth: 375,
                    initX: 0,
                    initY: 0,
                    isOpen: true
                },}
            let defaultConfig = {'openedWindows': windows}

            // context.commit('updateStateWindows', windows) // Под вопросом
            vm.$cookies.set('userConfig', defaultConfig)
        },
        updateWindowsConfig(context, options) {
            console.log('updateWindowsConfig')
            let windows = options.windows;
            console.log(windows)
            let cookiesConfig = options.vm.$cookies.get('userConfig');
            let updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows})
            console.log(updatedUserConfig)
            options.vm.$cookies.set('userConfig', updatedUserConfig)
        },
        setCookies(context, options) {
            console.log('From setCookie');

            let windowName = options.windowName
            let cookiesConfig = options.vm.$cookies.get('userConfig');
            if (!cookiesConfig) {
                context.dispatch('setDefaultConfig', options.vm);
                cookiesConfig = options.vm.$cookies.get('userConfig');
            }
            let currentCookiesWindowOptions = cookiesConfig.openedWindows[windowName] || {} // Логика не очень

            if (currentCookiesWindowOptions) {
                let x = options.x || currentCookiesWindowOptions.initX || 0,
                    y = options.y || currentCookiesWindowOptions.initY || 0,
                    w = options.w || currentCookiesWindowOptions.initWidth || 0,
                    h = options.h || currentCookiesWindowOptions.initHeight || 0,
                    isOpen = 'isOpen' in options ? options.isOpen : true;

                let newWindowConfig = Object.assign(currentCookiesWindowOptions, {initX: x, initY: y, initHeight: h, initWidth: w, isOpen: isOpen});
                let windows = Object.assign(cookiesConfig.openedWindows, { [windowName]: newWindowConfig })
                let updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows})

                options.vm.$cookies.set('userConfig', updatedUserConfig)
                context.commit('updateStateWindows', windows);
            }
        },
        loadCookieWindows(context, vm) {
            let config = vm.$cookies.get('userConfig')
            if (!config) {
                context.dispatch('setDefaultConfig', vm)
            }
            let windows = config.openedWindows;

            console.log('Windows Loaded')
            console.log(windows)
            context.commit('updateStateWindows', windows);
        },
        deleteWindow(context, options) {
            console.log('from deleteWindow')
            let windows = Object.assign({}, context.state.windows)
            delete windows[options.windowName]

            let cookiesConfig = options.vm.$cookies.get('userConfig')
            let updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows})

            options.vm.$cookies.set('userConfig', updatedUserConfig)
            context.commit('updateStateWindows', windows)
        },
        deleteAllWindows(context, vm) {
            console.log('from deleteAllWindow');

            let cookiesConfig = vm.$cookies.get('userConfig');
            cookiesConfig.openedWindows = {} // обнуление
            vm.$cookies.set('userConfig', cookiesConfig)
            context.commit('updateStateWindows', cookiesConfig.openedWindows);

        },
        appendWindow(context, options) {
            console.log('from appendWindow')
            if (options.windowName in context.state.windows) {
                context.dispatch(
                    'setCookies',
                    {windowName: options.windowName, isOpen: true, vm: options.vm})
            }
            else {
                let windows = context.state.windows;
                windows = Object.assign({
                        [options.windowName]: {initX: 0,initY: 0, initHeight: 300, initWidth: 300, isOpen: true}},
                    windows)

                context.dispatch('updateWindowsConfig', {windows: windows, vm: options.vm});
                context.commit('updateStateWindows', windows)

            }
        },
        setActiveWindow(context, windowName) {
            context.commit('updateStateWindowName', windowName)
        }
    },
    mutations: {
        // STATE!
        updateStateWindows(state, windows) {
            console.log('Windows cookie updated');
            console.log(state.windows)
            console.log(windows)
            state.windows = windows;
            console.log(state.windows)
        },
        updateStateWindowName(state, activeWindow) {
            state.activeWindow = activeWindow;
        }
    },
    getters: {
        allWindows(state) {
            return state.windows
        },
        activeWindow(state) {
            return state.activeWindow
        }
    },
}