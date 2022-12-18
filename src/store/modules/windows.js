import getRandomInt from "@/utils/random";
import { windowNamesThatWeSaved } from "@/business_logic/windows"

class WindowZindexManager {
    constructor(windows) {
        let i = 1;
        this.zIndexes = {};
        for (let windowName in windows) {
            this.zIndexes[windowName] = i;
            i++;
        }
    }

    getZindex(windowName) {
        if (!(windowName in this.zIndexes.hasOwnProperty)) {
            this.addWindow(windowName);
        }
        return this.zIndexes[windowName];
    }

    setActiveWindow(windowName) {
        if (!(windowName in this.zIndexes.hasOwnProperty)) {
            this.addWindow(windowName);
        }
        let maxZindex = Math.max(...Object.values(this.zIndexes));
        // Обнови zIndex, подняв его для windowName на 1, а для остальных на 1 вниз
        for (let windowName in this.zIndexes) {
            this.zIndexes[windowName] -= 1;
        }
        this.zIndexes[windowName] = maxZindex;
    }

    addWindow(windowName) {
        let maxZindex = Math.max(...Object.values(this.zIndexes), 0);
        this.zIndexes[windowName] = maxZindex + 1;
    }
}

export default {
    state: {
        windowNamesThatWeSaved: windowNamesThatWeSaved,
        openedWindows: {},
        activeWindow: '',
        zIndexManager: new WindowZindexManager({}),
        DEFAULT_WINDOW_Z_INDEX: 5,
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
                    initZ: 1,
                    isOpen: true
                },
            }
            context.commit('updateOpenedWindows', defaultWindows)
            context.commit('updateLocalStorage', defaultWindows)
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
            console.log('setCookies', options)
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
            context.dispatch('parseWindowsConfig')
            let windowsConfig = context.state.openedWindows

            if (options.windowName in windowsConfig) {
                delete windowsConfig[options.windowName];
            }

            localStorage.setItem('windowsConfig', JSON.stringify(windowsConfig))
            context.commit('updateOpenedWindows', windowsConfig);
        },
        /**
         * Delete all windows from windowsConfig and state
         */
        deleteAllWindows(context, vm) {
            vm.$cookies.set('windowsConfig', {})
            context.commit('updateOpenedWindows', {});

        },
        /**
         * Append window to localStorage and state
         */
        appendWindow(context, options) {
            if (context.state.windowNamesThatWeSaved.includes(options.windowName)) {
                let openedWindows = context.state.openedWindows;

                if (options.windowName in openedWindows) {
                    context.dispatch('setActiveWindow', options.windowName);
                    context.dispatch('updateWindow', options)
                } else {
                    let initHeight = options.heightWindow ? options.heightWindow : window.innerHeight / 2
                    let initWidth = options.widthWindow ? options.widthWindow : window.innerWidth / 2
                    let initY = options.yWindow ? options.yWindow : (window.innerHeight -  initHeight ) / 2 + getRandomInt(100)
                    let initX = options.xWindow ? options.xWindow : (window.innerWidth - initWidth) / 2 + getRandomInt(100)
                    let initZ = Object.keys(openedWindows).length > 0
                                ? Math.max(...Object.entries(openedWindows).map(([k, v], i) => v.initZ || context.state.DEFAULT_WINDOW_Z_INDEX)) + 1
                                : context.state.DEFAULT_WINDOW_Z_INDEX
                    
                    console.log('initZ', initZ, ...Object.entries(openedWindows).map(([k, v], i) => v.initZ || context.state.DEFAULT_WINDOW_Z_INDEX))
                    
                    let updatedWindow = {
                        initX: initX, initY: initY, initZ: initZ, initHeight: initHeight, initWidth: initWidth, isOpen: true, src: options.src
                    }
                    context.commit('appendWindow', {windowName: options.windowName, windowConfig: updatedWindow})
                    context.commit('updateLocalStorage', context.state.openedWindows)
                }
            } else {
                console.info(`Окно ${options.windowName} не поддерживается.`)
            }
        },
        // updateWindowZindex(context, options) {
        //     let windows = context.state.openedWindows;
        //     let updatedWindows = Object.assign(
        //         {},
        //         windows,
        //         {[options.windowName]: {zIndex: options.zIndex}},
        //     )
        //     localStorage.setItem('windowsConfig', JSON.stringify(updatedWindows))
        //     return updatedWindows
        // },
        updateWindow(context, options) {
            if (context.state.windowNamesThatWeSaved.includes(options.windowName) && options.windowName in context.state.openedWindows) {
                let windows = context.state.openedWindows;
                let updatedWindow = null;
                for (let key in windows) {
                    if (key === options.windowName) {
                        updatedWindow = Object.assign(
                            windows[key] || {},
                            {initX: options.x, initY: options.y, initHeight: options.h, initWidth: options.w, isOpen: true}
                        )
                    }
                }
                context.commit('updateWindow', {windowName: options.windowName, windowConfig: updatedWindow})
                context.commit('updateLocalStorage', context.state.openedWindows)
            } else {
                context.commit('appendWindow', options)
                context.commit('updateLocalStorage', context.state.openedWindows)
            }
        },
        /**
         * Make window is active by name
         */
        setActiveWindow(context, windowName) {
            // debugger;   // eslint-disable-line no-debugger
            let windows = JSON.parse(JSON.stringify(context.state.openedWindows));
            let lastInitZ = windows[windowName]['initZ'];
            let maxInitZ = Math.max(...Object.entries(windows).map(([k, v], i) => v.initZ || context.state.DEFAULT_WINDOW_Z_INDEX));

            for (let x of Object.keys(windows)) {
                let window = windows[x];
                if (window['initZ'] > lastInitZ) {
                    window['initZ'] -= 1;
                } else if (window['initZ'] === lastInitZ) {
                    window['initZ'] = maxInitZ;
                }
            }
            context.commit('updateActiveWindow', windowName);
            context.commit('updateOpenedWindows', windows);
        }
    },
    mutations: {
        /**
         * Mutations are used to update the state
         */
        updateLocalStorage(state, openedWindows) {
            localStorage.setItem('windowsConfig', JSON.stringify(openedWindows))
        },
        updateOpenedWindows(state, windows) {
            console.log('updateOpenedWindows', windows);
            state.openedWindows = windows;
            // state.zIndexManager = new WindowZindexManager(windows);
        },
        updateActiveWindow(state, activeWindow) {
            console.log('updateActiveWindow', activeWindow);
            state.activeWindow = activeWindow;
        },
        updateWindow(state, {windowName, windowConfig}) {
            state.openedWindows[windowName] = windowConfig;
            state.openedWindows = Object.assign({}, state.openedWindows)
        },
        appendWindow(state, {windowName, windowConfig}) {
            state.openedWindows[windowName] = windowConfig;
            state.openedWindows = Object.assign({}, state.openedWindows)
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