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
        setDefaultConfig(context) {
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
            // ! let defaultConfig = {'openedWindows': defaultWindows}

            // context.commit('updateOpenedWindows', windows) // TODO: Под вопросом

            // Put in `userConfig`
            localStorage.setItem('windowsConfig', JSON.stringify(defaultWindows))
            // ! vm.$cookies.set('userConfig', defaultConfig)
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
        async parseWindowsConfig(context) {
            let storageConfigString = localStorage.getItem('windowsConfig')
            if (!storageConfigString) {
                storageConfigString = await context.dispatch('setDefaultConfig').then(() => {
                    storageConfigString = localStorage.getItem('windowsConfig')
                })
            }
            let storageConfig = JSON.parse(storageConfigString)
            context.commit('updateOpenedWindows', storageConfig)
        },
        setCookies(context, options) {
            // TODO: Логика не очень

            if (context.state.windowNamesThatWeSaved.includes(options.windowName)) {
                context.dispatch('parseWindowsConfig')
                let windowsConfig = context.state.openedWindows

                let currentCookiesWindowOptions = windowsConfig[options.windowName] || {};
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
                        newStorageConfig = Object.assign(windowsConfig, { [options.windowName]: newWindowConfig })

                    localStorage.setItem('windowsConfig', JSON.stringify(newStorageConfig))
                    context.commit('updateOpenedWindows', newStorageConfig);
                }
            } else {
                console.debug('Это окно не сохраняется')
            }
        },
        /**
         * Load windows from localStorage and put to state
         */
        loadCookieWindows(context, vm) {
            context.dispatch('parseWindowsConfig')
        },
        /**
         * Delete window from localStorage and state
         */
        deleteWindow(context, options) {
            // let windows = Object.assign({}, context.state.openedWindows) // copy state.openedWindows
            context.dispatch('parseWindowsConfig')
            let windowsConfig = context.state.openedWindows

            if (options.windowName in windowsConfig) {
                delete windowsConfig[options.windowName];
            }

            // ! let cookiesConfig = options.vm.$cookies.get('userConfig');
            // ! let updatedUserConfig = Object.assign(cookiesConfig, {openedWindows: windows});
            // options.vm.$cookies.set('userConfig', updatedUserConfig);

            localStorage.setItem('windowsConfig', JSON.stringify(windowsConfig))
            context.commit('updateOpenedWindows', windowsConfig);
        },
        /**
         * Delete all windows from windowsConfig and state
         */
        deleteAllWindows(context, vm) {
            // Update local_storage and state
            vm.$cookies.set('windowsConfig', {})
            context.commit('updateOpenedWindows', {});

        },
        /**
         * Append window to localStorage and state
         */
        appendWindow(context, options) {
            if (context.state.windowNamesThatWeSaved.includes(options.windowName)) {
                let windows = context.state.openedWindows;
                let initHeight = options.heightWindow ? options.heightWindow : window.innerHeight / 2
                let initWidth = options.widthWindow ? options.widthWindow : window.innerWidth / 2
                let initY = options.yWindow ? options.yWindow : (window.innerHeight -  initHeight ) / 2 + getRandomInt(100)
                let initX = options.xWindow ? options.xWindow : (window.innerWidth - initWidth) / 2 + getRandomInt(100)

                if (options.windowName in windows) {
                    context.dispatch('setActiveWindow', options.windowName);
                    context.dispatch('setCookies', { windowName: options.windowName, isOpen: true, vm: options.vm })
                } else {
                    let updatedWindows = Object.assign(
                        {},
                        windows,
                        {[options.windowName]: {initX: initX, initY: initY, initHeight: initHeight, initWidth: initWidth, isOpen: true, src: options.src}},
                    )

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