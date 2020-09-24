export default {
    state: {
        windows: {},
        activeWindow: ''
    },
    actions: {
        /**
         * Set default config with help window and put in into cookies.
         * Default config usually applied on the first login or something get wrong.
         */
        setDefaultConfig(context, vm) {
            // Let me show 'Help' if it's first start, or something shit happens.
            let defaultWindows = {
                'Help': {
                    initHeight: 585,
                    initWidth: 375,
                    initX: 0,
                    initY: 0,
                    isOpen: true
                },
            }

            // TODO: To move the interaction to a separate file ~config.js
            let defaultConfig = {'openedWindows': defaultWindows}

            // context.commit('updateStateWindows', windows) // TODO: Под вопросом

            // Put in `userConfig`
            vm.$cookies.set('userConfig', defaultConfig)
        },
        /**
         * Update windows in the config and cookies;
         * Where: options.window -> Object with windows properties;
         *        options.vm -> `this`, that is, Vue object.
         */
        updateWindowsConfig(context, options) {
            // options.windows -> object with window's properties
            let windows = options.windows;
            // Get `userConfig` from cookies
            let cookiesConfig = options.vm.$cookies.get('userConfig');
            // Merge cookiesConfig={openedWindows: {...}, ...} and {openedWindows: windows}
            let updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows})

            // Put in `userConfig`
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
        /**
         * Mutations are used to update the state
         */
        updateStateWindows(state, windows) {
            state.windows = windows;
        },
        updateStateWindowName(state, activeWindow) {
            state.activeWindow = activeWindow;
        }
    },
    getters: {
        /**
         * Getters are used to take data from the state
         */
        allWindows(state) {
            return state.windows
        },
        activeWindow(state) {
            return state.activeWindow
        }
    },
}