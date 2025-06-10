var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
// Engineering Classes and Types
import { SyncCmdToFrameworkInjectResources } from './SyncCmdToFrameworkInjectResources.js';
import { SyncCmdToFrameworkCurrentPartialContent } from './SyncCmdToFrameworkCurrentPartialContent.js';
import { SyncCmdToFrameworkTcHmiConfigChanged } from './SyncCmdToFrameworkTcHmiConfigChanged.js';
import { SyncCmdToFrameworkPartialEditorLocked } from './SyncCmdToFrameworkPartialEditorLocked.js';
import { SyncCmdToFrameworkLogoutClient } from './SyncCmdToFrameworkLogoutClient.js';
import { SyncCmdToCreatorRegisterSyncView } from './SyncCmdToCreatorRegisterSyncView.js';
import { SyncCmdToFrameworkCurrentPartialEditorLockState } from './SyncCmdToFrameworkCurrentPartialEditorLockState.js';
import { SyncCmdToFrameworkPartialEditorUnlocked } from './SyncCmdToFrameworkPartialEditorUnlocked.js';
let SyncCmdToFrameworkRequestDropControlPosition;
let SyncCmdToFrameworkSelectedControls;
let SyncCmdToFrameworkScrollPositionChanged;
let SyncCmdToFrameworkSyncControls;
let SyncCmdToFrameworkKeyStates;
let SyncCmdToFrameworkDomVisibility;
let SyncCmdToFrameworkCurrentPartialHighlightContainerState;
let SyncCmdToFrameworkZoom;
let SyncCmdToFrameworkCreateControls;
let SyncCmdToFrameworkRemoveControls;
let SyncCmdToFrameworkServerAddress;
let SyncCmdToFrameworkDesignerSettings;
let SyncCmdToFrameworkControlLocked;
if (TCHMI_DESIGNER) {
    import('./SyncCmdToFrameworkRequestDropControlPosition.js').then((module) => {
        SyncCmdToFrameworkRequestDropControlPosition = module.SyncCmdToFrameworkRequestDropControlPosition;
    });
    import('./SyncCmdToFrameworkSelectedControls.js').then((module) => {
        SyncCmdToFrameworkSelectedControls = module.SyncCmdToFrameworkSelectedControls;
    });
    import('./SyncCmdToFrameworkScrollPositionChanged.js').then((module) => {
        SyncCmdToFrameworkScrollPositionChanged = module.SyncCmdToFrameworkScrollPositionChanged;
    });
    import('./SyncCmdToFrameworkSyncControls.js').then((module) => {
        SyncCmdToFrameworkSyncControls = module.SyncCmdToFrameworkSyncControls;
    });
    import('./SyncCmdToFrameworkKeyStates.js').then((module) => {
        SyncCmdToFrameworkKeyStates = module.SyncCmdToFrameworkKeyStates;
    });
    import('./SyncCmdToFrameworkDomVisibility.js').then((module) => {
        SyncCmdToFrameworkDomVisibility = module.SyncCmdToFrameworkDomVisibility;
    });
    import('./SyncCmdToFrameworkCurrentPartialHighlightContainerState.js').then((module) => {
        SyncCmdToFrameworkCurrentPartialHighlightContainerState =
            module.SyncCmdToFrameworkCurrentPartialHighlightContainerState;
    });
    import('./SyncCmdToFrameworkZoom.js').then((module) => {
        SyncCmdToFrameworkZoom = module.SyncCmdToFrameworkZoom;
    });
    import('./SyncCmdToFrameworkCreateControls.js').then((module) => {
        SyncCmdToFrameworkCreateControls = module.SyncCmdToFrameworkCreateControls;
    });
    import('./SyncCmdToFrameworkRemoveControls.js').then((module) => {
        SyncCmdToFrameworkRemoveControls = module.SyncCmdToFrameworkRemoveControls;
    });
    import('./SyncCmdToFrameworkServerAddress.js').then((module) => {
        SyncCmdToFrameworkServerAddress = module.SyncCmdToFrameworkServerAddress;
    });
    import('./SyncCmdToFrameworkDesignerSettings.js').then((module) => {
        SyncCmdToFrameworkDesignerSettings = module.SyncCmdToFrameworkDesignerSettings;
    });
    import('./SyncCmdToFrameworkControlLocked.js').then((module) => {
        SyncCmdToFrameworkControlLocked = module.SyncCmdToFrameworkControlLocked;
    });
}
// Engineering Instances
import { designerModeManager } from './DesignerModeManager.js';
let DesignerModeComManager = (() => {
    var _a, _b, _c, _d;
    let _instanceExtraInitializers = [];
    let ___onDisableCommunication_decorators;
    let ___connectionWatcherTick_decorators;
    let ___websocketOnClose_decorators;
    let ___websocketOnMessage_decorators;
    return class DesignerModeComManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onDisableCommunication_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            ___connectionWatcherTick_decorators = [(_b = TcHmi).CallbackMethod.bind(_b)];
            ___websocketOnClose_decorators = [(_c = TcHmi).CallbackMethod.bind(_c)];
            ___websocketOnMessage_decorators = [(_d = TcHmi).CallbackMethod.bind(_d)];
            __esDecorate(this, null, ___onDisableCommunication_decorators, { kind: "method", name: "__onDisableCommunication", static: false, private: false, access: { has: obj => "__onDisableCommunication" in obj, get: obj => obj.__onDisableCommunication }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___connectionWatcherTick_decorators, { kind: "method", name: "__connectionWatcherTick", static: false, private: false, access: { has: obj => "__connectionWatcherTick" in obj, get: obj => obj.__connectionWatcherTick }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___websocketOnClose_decorators, { kind: "method", name: "__websocketOnClose", static: false, private: false, access: { has: obj => "__websocketOnClose" in obj, get: obj => obj.__websocketOnClose }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___websocketOnMessage_decorators, { kind: "method", name: "__websocketOnMessage", static: false, private: false, access: { has: obj => "__websocketOnMessage" in obj, get: obj => obj.__websocketOnMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /** Throws on error */
        constructor() {
            TcHmi.EventProvider.register('System.disableCommunication', this.__onDisableCommunication);
            const lsReconCount = window.localStorage.getItem(TcHmi.System.hostPrefix + 'TcHmi.System.Engineering.DesignerModeComManager.reconnectCount') ?? '0';
            this.__globalReconnectCount = parseInt(lsReconCount, 10);
        }
        __websocket = (__runInitializers(this, _instanceExtraInitializers), undefined);
        __websocketWasClosedUnexpected = false;
        __connectionWatcherInterval = 0;
        __unloaded = false;
        /** */
        static RECONNECT_INTERVAL = 5000;
        /** Counting all reconnects (including reloads) till we have a valid answer */
        __globalReconnectCount = 0;
        __onDisableCommunication(_event) {
            this.__unloaded = true;
            if (this.__websocket) {
                this.__websocket.close();
                this.__websocket = undefined;
            }
        }
        __connectionWatcherTick() {
            if (this.__websocket === undefined) {
                this.open();
            }
        }
        __handleSyncCommandMessageResponse(messageObj) {
            if (!messageObj.command) {
                return;
            }
            let commandHandler;
            let checkDesignerLock = true;
            switch (messageObj.command.name) {
                case 'Messages':
                    break;
                case 'InjectResources':
                    commandHandler = new SyncCmdToFrameworkInjectResources(messageObj.command);
                    break;
                case 'Confirmation':
                case 'TransactionBegin':
                case 'TransactionCommit':
                    // Ignore deprecated commands from the other side
                    return;
                case 'ScrollPositionChanged':
                    checkDesignerLock = false;
                    if (!SyncCmdToFrameworkScrollPositionChanged) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkScrollPositionChanged not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkScrollPositionChanged(messageObj.command);
                    break;
                case 'RequestDropControlPosition':
                    if (!SyncCmdToFrameworkRequestDropControlPosition) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkRequestDropControlPosition not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkRequestDropControlPosition(messageObj.command);
                    break;
                case 'CreateControls':
                    if (!SyncCmdToFrameworkCreateControls) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkCreateControls not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkCreateControls(messageObj.command);
                    break;
                case 'SyncControls':
                    if (!SyncCmdToFrameworkSyncControls) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkSyncControls not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkSyncControls(messageObj.command);
                    break;
                case 'RemoveControls':
                    if (!SyncCmdToFrameworkRemoveControls) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkRemoveControls not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkRemoveControls(messageObj.command);
                    break;
                case 'SelectedControls':
                    if (!SyncCmdToFrameworkSelectedControls) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkSelectedControls not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkSelectedControls(messageObj.command);
                    break;
                case 'ServerAddress':
                    if (!SyncCmdToFrameworkServerAddress) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkServerAddress not loaded');
                        }
                        return;
                    }
                    checkDesignerLock = false;
                    commandHandler = new SyncCmdToFrameworkServerAddress(messageObj.command);
                    break;
                case 'DesignerSettings':
                    if (!SyncCmdToFrameworkDesignerSettings) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkDesignerSettings not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkDesignerSettings(messageObj.command);
                    break;
                case 'DomVisibility':
                    if (!SyncCmdToFrameworkDomVisibility) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkDomVisibility not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkDomVisibility(messageObj.command);
                    break;
                case 'ControlLocked':
                    if (!SyncCmdToFrameworkControlLocked) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkControlLocked not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkControlLocked(messageObj.command);
                    break;
                case 'KeyStates':
                    if (!SyncCmdToFrameworkKeyStates) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkKeyStates not loaded');
                        }
                        return;
                    }
                    checkDesignerLock = false;
                    commandHandler = new SyncCmdToFrameworkKeyStates(messageObj.command);
                    break;
                case 'CurrentPartialContent':
                    if (this.__globalReconnectCount) {
                        window.localStorage.removeItem(TcHmi.System.hostPrefix + 'TcHmi.System.Engineering.DesignerModeComManager.reconnectCount');
                        this.__globalReconnectCount = 0;
                    }
                    commandHandler = new SyncCmdToFrameworkCurrentPartialContent(messageObj.command);
                    break;
                case 'TcHmiConfigChanged':
                    commandHandler = new SyncCmdToFrameworkTcHmiConfigChanged(messageObj.command);
                    break;
                case 'Zoom':
                    if (!SyncCmdToFrameworkZoom) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkZoom not loaded');
                        }
                        return;
                    }
                    checkDesignerLock = false;
                    commandHandler = new SyncCmdToFrameworkZoom(messageObj.command);
                    break;
                case 'PartialEditorLocked':
                    checkDesignerLock = false;
                    commandHandler = new SyncCmdToFrameworkPartialEditorLocked(messageObj.command);
                    break;
                case 'PartialEditorUnlocked':
                    checkDesignerLock = false;
                    commandHandler = new SyncCmdToFrameworkPartialEditorUnlocked(messageObj.command);
                    break;
                case 'CurrentPartialEditorLockState':
                    commandHandler = new SyncCmdToFrameworkCurrentPartialEditorLockState(messageObj.command);
                    break;
                case 'CurrentPartialHighlightContainerState':
                    if (!SyncCmdToFrameworkCurrentPartialHighlightContainerState) {
                        if (TCHMI_DESIGNER) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToFrameworkCurrentPartialHighlightContainerState not loaded');
                        }
                        return;
                    }
                    commandHandler = new SyncCmdToFrameworkCurrentPartialHighlightContainerState(messageObj.command);
                    break;
                case 'LogoutClient':
                    commandHandler = new SyncCmdToFrameworkLogoutClient(messageObj.command);
                    break;
                default:
                    break;
            }
            if (checkDesignerLock) {
                if (designerModeManager.isLocked()) {
                    return;
                }
            }
            if (commandHandler === undefined) {
                TcHmi.Log.warn('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeComManager] Command "' +
                    messageObj.command.name +
                    '" not implemented.');
                return;
            }
            try {
                commandHandler.run();
            }
            catch (e) {
                TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeComManager] An uncaught exception occurred while performing "' +
                    messageObj.command.name +
                    '" command:\n', e);
            }
        }
        __createWebsocketOnOpenHandler(callback) {
            return (_openEvent) => {
                TcHmi.Log.debug('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeComManager] WebSocket with url=' +
                    this.__websocket.url +
                    ' opened.');
                if (!this.__websocket) {
                    TcHmi.Callback.callSafeEx(callback, null, {
                        error: TcHmi.Errors.E_WEBSOCKET_NOT_READY,
                        details: {
                            code: TcHmi.Errors.E_WEBSOCKET_NOT_READY,
                            message: TcHmi.Errors[TcHmi.Errors.E_WEBSOCKET_NOT_READY],
                            domain: 'TcHmi.System.Engineering.DesignerModeComManager',
                        },
                    });
                    return;
                }
                if (this.__websocketWasClosedUnexpected) {
                    if (TCHMI_DESIGNER) {
                        window.location.reload();
                        return;
                    }
                    else {
                        TcHmi.Callback.callSafeEx(callback, null, {
                            error: TcHmi.Errors.E_WEBSOCKET_NOT_READY,
                            details: {
                                code: TcHmi.Errors.E_WEBSOCKET_NOT_READY,
                                message: TcHmi.Errors[TcHmi.Errors.E_WEBSOCKET_NOT_READY],
                                domain: 'TcHmi.System.Engineering.DesignerModeComManager',
                            },
                        });
                        TcHmi.System.Services.dialogManager.showDialog('__DesignerModeComManager', false, TcHmi.DialogManager.DialogType.Overlay, { force: true });
                        if (this.__globalReconnectCount <= 2) {
                            TcHmi.System.Services.dialogManager.updateTextEx('__DesignerModeComManager', TcHmi.System.Services.localization.getText('Engineering_Websocket_Restored', {
                                level: TcHmi.Locale.Level.Engineering,
                            }) +
                                ' ' +
                                tchmi_format_string(TcHmi.System.Services.localization.getText('Reload_In_N_Seconds', {
                                    level: TcHmi.Locale.Level.Engineering,
                                }), 5), {
                                severity: TcHmi.DialogManager.DialogSeverity.Warning,
                                buttonReload: !TCHMI_DESIGNER,
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000);
                        }
                        else {
                            TcHmi.System.Services.dialogManager.updateTextEx('__DesignerModeComManager', TcHmi.System.Services.localization.getText('Engineering_Websocket_Rejected', {
                                level: TcHmi.Locale.Level.Engineering,
                            }) +
                                (document.cookie.length < 15000
                                    ? ''
                                    : '<br>' +
                                        TcHmi.System.Services.localization.getText('Engineering_Websocket_Large_Cookie', {
                                            level: TcHmi.Locale.Level.Engineering,
                                        })), {
                                severity: TcHmi.DialogManager.DialogSeverity.Error,
                                buttonReload: !TCHMI_DESIGNER,
                            });
                        }
                        TcHmi.System.Services.dialogManager.showDialog('__DesignerModeComManager', true, TcHmi.DialogManager.DialogType.Overlay);
                    }
                    return;
                }
                new SyncCmdToCreatorRegisterSyncView({
                    name: 'RegisterSyncView',
                    targetPartial: TCHMI_TARGET_PARTIAL,
                    targetInstance: TCHMI_DYNAMIC_INSTANCE_ID,
                    syncViewLevel: TCHMI_DESIGNER ? 'Master' : 'Slave',
                    sessionId: TcHmi.System.Services.accessManager.getCurrentUserConfig().session ?? '',
                    replyTo: null,
                }).send();
                if (TCHMI_CONSOLE_LOG_LEVEL === -1 /* TcHmi.LOG_LEVEL.Performance */) {
                    performance.mark('System.DesignerModeComManager: RegisterSyncView');
                }
                TcHmi.Callback.callSafeEx(callback, null, {
                    error: TcHmi.Errors.NONE,
                });
            };
        }
        /**
         * @param closeEvent The this.__websocket this.__close event object.
         */
        __websocketOnClose(closeEvent) {
            if (this.__unloaded || !this.__websocket) {
                return;
            }
            try {
                const lsReconCount = window.localStorage.getItem(TcHmi.System.hostPrefix + 'TcHmi.System.Engineering.DesignerModeComManager.reconnectCount') ?? '0';
                this.__globalReconnectCount = parseInt(lsReconCount, 10) + 1;
                window.localStorage.setItem(TcHmi.System.hostPrefix + 'TcHmi.System.Engineering.DesignerModeComManager.reconnectCount', this.__globalReconnectCount.toString());
            }
            catch (ex) { }
            this.__websocketWasClosedUnexpected = true;
            let message = `[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeComManager] WebSocket with url=${this.__websocket.url} was closed`;
            if (closeEvent.code) {
                message += ' with code=' + closeEvent.code;
            }
            if (closeEvent.reason) {
                message += ' and reason=' + closeEvent.reason;
            }
            message += '.';
            TcHmi.Log.error(message);
            this.__websocket = undefined;
            window.clearInterval(this.__connectionWatcherInterval);
            this.__connectionWatcherInterval = window.setInterval(this.__connectionWatcherTick, DesignerModeComManager.RECONNECT_INTERVAL);
            TcHmi.System.Services.dialogManager.showDialog('__DesignerModeComManager', false, TcHmi.DialogManager.DialogType.Overlay, { force: true });
            TcHmi.System.Services.dialogManager.updateTextEx('__DesignerModeComManager', TcHmi.System.Services.localization.getText('Engineering_Websocket_Lost', {
                level: TcHmi.Locale.Level.Engineering,
            }), {
                severity: TcHmi.DialogManager.DialogSeverity.Warning,
                buttonReload: !TCHMI_DESIGNER,
            });
            TcHmi.System.Services.dialogManager.showDialog('__DesignerModeComManager', true, TcHmi.DialogManager.DialogType.Overlay);
        }
        /**
         * @param messageEvent The this.__websocket message event object.
         */
        __websocketOnMessage(messageEvent) {
            if (this.__unloaded) {
                return;
            }
            if (messageEvent === undefined) {
                return;
            }
            if (messageEvent.data === undefined) {
                return;
            }
            const messageObj = TcHmi.ValueConverter.toObject(messageEvent.data);
            if (messageObj === null || !messageObj.command) {
                TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeComManager] Failed to parse JSON message from TwinCAT HMI Creator (Visual Studio Engineering)!', { messageObj: messageObj });
                return;
            }
            try {
                if (TCHMI_LOG_ENGINEERING_COM_MESSAGES && messageObj.command.name !== 'KeyStates') {
                    TcHmi.Log.debugEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeComManager] Response from TwinCAT HMI Creator (Visual Studio Engineering).', { messageObj: messageObj });
                }
            }
            catch (e) {
                /* ignore */
            }
            this.__handleSyncCommandMessageResponse(messageObj);
        }
        open(callback) {
            if (!TCHMI_ENGINEERING_WEBSOCKET) {
                // Routing of all messages via the server event system only.
                TcHmi.Server.Events.registerConsumer([
                    {
                        comparator: '==',
                        path: 'domain',
                        value: 'TcHmiSrv',
                    },
                    {
                        logic: 'AND',
                    },
                    {
                        comparator: '==',
                        path: 'name',
                        value: 'ENGINEERING_CREATOR_COMMAND',
                    },
                ], {
                    subscription: (data) => {
                        if (!data.event || !TcHmi.Server.Events.isPayload(data.event) || !data.event.payload) {
                            // Wrong here...
                            return;
                        }
                        this.__handleSyncCommandMessageResponse(data.event.payload);
                    },
                });
                new SyncCmdToCreatorRegisterSyncView({
                    name: 'RegisterSyncView',
                    targetPartial: TCHMI_TARGET_PARTIAL,
                    targetInstance: TCHMI_DYNAMIC_INSTANCE_ID,
                    syncViewLevel: TCHMI_DESIGNER ? 'Master' : 'Slave',
                    sessionId: TcHmi.System.Services.accessManager.getCurrentUserConfig().session ?? '',
                    replyTo: null,
                }).send();
                if (TCHMI_CONSOLE_LOG_LEVEL === -1 /* TcHmi.LOG_LEVEL.Performance */) {
                    performance.mark('System.DesignerModeComManager: RegisterSyncView');
                }
                TcHmi.Callback.callSafeEx(callback, null, {
                    error: TcHmi.Errors.NONE,
                });
                return;
            }
            if (this.__unloaded) {
                TcHmi.Callback.callSafeEx(callback, null, {
                    error: TcHmi.Errors.ERROR,
                    details: {
                        code: TcHmi.Errors.ERROR,
                        message: TcHmi.Errors[TcHmi.Errors.ERROR],
                        domain: 'TcHmi.System.Engineering.DesignerModeComManager',
                        reason: 'Website already unloaded.',
                    },
                });
                return;
            }
            if (!this.__websocket) {
                try {
                    // Repeat the url in the path for the Chrome Network Tab https://bugs.chromium.org/p/chromium/issues/detail?id=623900
                    this.__websocket = new WebSocket(TCHMI_ENGINEERING_WEBSOCKET + '/DesignerWebsocketname=' + TCHMI_ENGINEERING_WEBSOCKET);
                }
                catch (ex) {
                    let reason = 'Opening connection to TwinCAT HMI Creator (Visual Studio Engineering) failed';
                    if (ex instanceof DOMException) {
                        // Is probably e.code === DOMException.SECURITY_ERR
                        // Occurs when this live view is loaded via https
                        // or we hit a blocked port
                        reason += ': ' + ex.message;
                    }
                    if (callback) {
                        TcHmi.Callback.callSafeEx(callback, null, {
                            error: TcHmi.Errors.ERROR,
                            details: {
                                code: TcHmi.Errors.ERROR,
                                message: TcHmi.Errors[TcHmi.Errors.ERROR],
                                domain: 'TcHmi.System.Engineering.DesignerModeComManager',
                                reason: reason,
                            },
                        });
                        return;
                    }
                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeComManager] ' + reason);
                    throw new Error(reason);
                }
                this.__websocket.onopen = this.__createWebsocketOnOpenHandler(callback);
                this.__websocket.onclose = this.__websocketOnClose;
                this.__websocket.onmessage = this.__websocketOnMessage;
                // Wait for 30 seconds to connect to be conservative
                setTimeout(() => {
                    if (this.__websocket?.readyState !== WebSocket.OPEN) {
                        // Still not connected => report to main.ts (if callback is still valid)
                        TcHmi.Callback.callSafeEx(callback, null, {
                            error: TcHmi.Errors.E_TIMEOUT,
                            details: {
                                code: TcHmi.Errors.E_TIMEOUT,
                                message: TcHmi.Errors[TcHmi.Errors.E_TIMEOUT],
                                reason: 'TwinCAT HMI Creator (Visual Studio Engineering) Websocket did not respond within expected time.',
                                domain: 'TcHmi.System.Engineering.DesignerModeComManager',
                            },
                        });
                    }
                }, 30000);
            }
        }
        /**
         * Sends a command to the engineering.
         * @param cmd
         */
        sendCommand(cmd) {
            const messageObj = {
                command: cmd,
                id: tchmi_create_guid(),
                timestamp: Date.now(),
            };
            if (TCHMI_LOG_ENGINEERING_COM_MESSAGES) {
                TcHmi.Log.debugEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeComManager] Request to TwinCAT HMI Creator (Visual Studio Engineering).', { messageObj: messageObj });
            }
            if (!TCHMI_ENGINEERING_WEBSOCKET) {
                // Routing of all messages via the server event system only.
                TcHmi.Server.Events.createEvent({
                    domain: 'TcHmiSrv',
                    name: 'ENGINEERING_FRAMEWORK_COMMAND',
                    payload: messageObj,
                    type: TcHmi.Server.Events.Type.Payload,
                    timeReceived: new Date(),
                }, (data) => {
                    if (!data.error) {
                        return;
                    }
                    TcHmi.Log.errorEx('Sending Designer message via Server Event failed: ', TcHmi.Log.buildMessage(data.details));
                });
            }
            else if (this.__websocket !== undefined && this.__websocket.readyState === WebSocket.OPEN) {
                const message = JSON.stringify(messageObj);
                this.__websocket.send(message);
            }
        }
    };
})();
export { DesignerModeComManager };
/** Runtime Manager */
export const designerModeComManager = new DesignerModeComManager();
//# sourceMappingURL=DesignerModeComManager.js.map