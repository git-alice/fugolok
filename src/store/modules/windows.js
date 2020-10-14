import getRandomInt from "@/utils/random";
import { windowNamesThatWeSaved } from "@/business_logic/windows"

console.log('windowNamesThatWeSaved', windowNamesThatWeSaved)

export default {
    state: {
        windowNamesThatWeSaved: windowNamesThatWeSaved,
        openedWindows: {},
        activeWindow: ''
    },
    actions: {
        /**
         * Set default config with help window and put in into local_storage.
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

            // context.commit('updateOpenedWindows', windows) // TODO: Под вопросом

            // Put in `userConfig`
            vm.$cookies.set('userConfig', defaultConfig)
        },
        /**
         * Update windows in the config and local_storage;
         * Where: options.window -> Object with windows properties;
         *        options.vm -> `this`, that is, Vue object.
         */
        updateWindowsConfig(context, options) {
            // options.windows -> object with window's properties
            let windows = options.windows;
            // Get `userConfig` from local_storage
            let cookiesConfig = options.vm.$cookies.get('userConfig');
            // Merge cookiesConfig={openedWindows: {...}, ...} and {openedWindows: windows}
            let updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows})

            // Put in `userConfig`
            options.vm.$cookies.set('userConfig', updatedUserConfig)
        },
        /**
         * Put windows options to local_storage and state;
         */
        setCookies(context, options) {
            if (context.state.windowNamesThatWeSaved.includes(options.windowName)) {
                let cookiesConfig = options.vm.$cookies.get('userConfig');
                // If cookiesConfig === undefined, that is, cookiesConfig doesn't exist
                // then set defaultConfig to local_storage `userConfig` vie `setDefaultConfig` action
                // and then get `userConfig` from local_storage
                if (!cookiesConfig) {
                    context.dispatch('setDefaultConfig', options.vm).then(() =>
                        { cookiesConfig = options.vm.$cookies.get('userConfig'); }
                    )
                }

                // TODO: Логика не очень
                let currentCookiesWindowOptions = cookiesConfig.openedWindows[options.windowName] || {};
                // If windowName exists in `openedWindows`
                if (currentCookiesWindowOptions) {
                    let x = options.x || currentCookiesWindowOptions.initX || 0,
                        y = options.y || currentCookiesWindowOptions.initY || 0,
                        w = options.w || currentCookiesWindowOptions.initWidth || 600,
                        h = options.h || currentCookiesWindowOptions.initHeight || 500,
                        isOpen = 'isOpen' in options ? options.isOpen : true,
                        // Merge `currentCookiesWindowOptions` and window parameter from `options` (x, y, h, w)
                        newWindowConfig = Object.assign(currentCookiesWindowOptions,
                            {initX: x, initY: y, initHeight: h, initWidth: w, isOpen: isOpen}),
                        // Merge `openedWindows` and updated window with name equal options.windowName
                        windows = Object.assign(cookiesConfig.openedWindows, { [options.windowName]: newWindowConfig }),
                        // Merge config from local_storage and updated windows
                        updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows})

                    // Put in `userConfig`
                    options.vm.$cookies.set('userConfig', updatedUserConfig)
                    // Commit windows to the state
                    context.commit('updateOpenedWindows', windows);
                }
            } else {
                console.log('Это окно не сохраняется')
            }
        },
        /**
         * Load windows from local_storage and put to state
         */
        loadCookieWindows(context, vm) {
            // userConfig = local_storage userConfig if exist or defaultConfig in other case
            let userConfig = vm.$cookies.get('userConfig');
            if (!userConfig) context.dispatch('setDefaultConfig', vm);
            let windows = userConfig.openedWindows;

            // Update state
            context.commit('updateOpenedWindows', windows);
        },
        /**
         * Delete window from local_storage and state
         */
        deleteWindow(context, options) {
            let windows = Object.assign({}, context.state.openedWindows) // copy state.openedWindows
            if (options.windowName in windows) delete windows[options.windowName];

            let cookiesConfig = options.vm.$cookies.get('userConfig');
            let updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows});

            options.vm.$cookies.set('userConfig', updatedUserConfig);
            context.commit('updateOpenedWindows', windows);
        },
        /**
         * Delete all window from local_storage and state
         */
        deleteAllWindows(context, vm) {
            // Zero
            let cookiesConfig = vm.$cookies.get('userConfig');
            cookiesConfig.openedWindows = {} // обнуление

            // Update local_storage and state
            vm.$cookies.set('userConfig', cookiesConfig)
            context.commit('updateOpenedWindows', cookiesConfig.openedWindows);

        },
        /**
         * Append window to local_storage and state
         */
        appendWindow(context, options) {
            if (context.state.windowNamesThatWeSaved.includes(options.windowName)) {
                let windows = context.state.openedWindows;
                let initHeight = options.heightWindow ? options.heightWindow : window.innerHeight / 2
                let initWidth = options.widthWindow ? options.widthWindow : window.innerWidth / 2
                let initY = options.yWindow ? options.yWindow : (window.innerHeight -  initHeight ) / 2 + getRandomInt(100)
                let initX = options.xWindow ? options.xWindow : (window.innerWidth - initWidth) / 2 + getRandomInt(100)

                // If window already exist
                if (options.windowName in windows) {
                    context.dispatch('setActiveWindow', options.windowName);
                    context.dispatch('setCookies', { windowName: options.windowName, isOpen: true, vm: options.vm })
                } else {
                    let updatedWindows = Object.assign(
                        {[options.windowName]: {initX: initX, initY: initY, initHeight: initHeight, initWidth: initWidth, isOpen: true, src: options.src}},
                        windows)

                    // Update local_storage and state
                    context.dispatch('updateWindowsConfig', {windows: updatedWindows, vm: options.vm});
                    context.commit('updateOpenedWindows', updatedWindows)
                }
            }
        },
        /**
         * Make window is active by name
         */
        setActiveWindow(context, windowName) {
            context.commit('updateActiveWindow', windowName)
        }
    },
    mutations: {
        /**
         * Mutations are used to update the state
         */
        updateOpenedWindows(state, windows) {
            state.openedWindows = windows;
        },
        updateActiveWindow(state, activeWindow) {
            state.activeWindow = activeWindow;
        }
    },
    getters: {
        /**
         * Getters are used to take data from the state
         */
        allWindows(state) {
            return state.openedWindows
        },
        activeWindow(state) {
            return state.activeWindow
        },
        windowByName(state) {
            return windowName => state.openedWindows[windowName]
        }
    },
}