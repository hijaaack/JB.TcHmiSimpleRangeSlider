import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { designerModeManager } from './DesignerModeManager.js';
import { resourceInjectionManager } from './DesignerModeResourceInjectionManager.js';
if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
let rootControlManager;
if (TCHMI_DESIGNER) {
    import('./DesignerModeMasterRootControlMngr.js')
        .then((module) => {
        rootControlManager = module.rootControlManager;
    })
        .catch((ex) => {
        TcHmi.Log.error('Failed to load rootControlManager in Framework SyncCmdToFrameworkTcHmiConfigChanged: ' + ex);
    });
}
export class SyncCmdToFrameworkTcHmiConfigChanged extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    __refreshBaseConfig(config, configOld) {
        if (config.scaleMode !== configOld.scaleMode) {
            TcHmi.System.Services.viewManager.setScaleMode(config.scaleMode);
        }
        if (!TCHMI_DESIGNER) {
            if (config.startupView !== configOld.startupView) {
                TcHmi.System.Services.viewManager.loadView(config.startupView);
            }
        }
        else {
            // TCHMI_DESIGNER === true
            if (config.creatorSettings &&
                config.creatorSettings.viewport &&
                (config.creatorSettings.viewport.defaultHeight !== configOld.creatorSettings.viewport.defaultHeight ||
                    config.creatorSettings.viewport.defaultWidth !== configOld.creatorSettings.viewport.defaultWidth)) {
                rootControlManager?.setCreatorViewPortPosition(TcHmi.System.Services.viewManager.getView());
            }
        }
        if (config.activeTheme !== configOld.activeTheme) {
            TcHmi.System.Services.themeManager.setTheme(config.activeTheme, true);
        }
        else if (!tchmi_equal(config.themes, configOld.themes) ||
            !tchmi_equal(
            // compare Stylesheet part of dependency only
            config.dependencyFiles?.filter((value) => {
                return value.type === 'Stylesheet';
            }), configOld.dependencyFiles?.filter((value) => {
                return value.type === 'Stylesheet';
            }))) {
            TcHmi.System.Services.themeManager.processActiveTheme();
        }
        if (!tchmi_equal(config.trigger, configOld.trigger)) {
            if (TcHmi.System.destroyGlobalTrigger) {
                TcHmi.System.destroyGlobalTrigger();
                TcHmi.System.destroyGlobalTrigger = null;
            }
            TcHmi.System.destroyGlobalTrigger = TcHmi.System.Services.triggerManager.register(tchmi_clone_object(config.trigger));
        }
        if (TCHMI_ENGINEERING && TCHMI_LIVEVIEW && !tchmi_equal(config.tcHmiServer, configOld.tcHmiServer)) {
            TcHmi.System.Services.serverManager.refreshSubscriptions();
        }
    }
    __loadViewPartial(v, callback) {
        let vm = null;
        if (v.preload && !TCHMI_DESIGNER) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', tchmi_encode_uri_components(v.url) + '?preventcache=' + Math.random());
            xhr.addEventListener('load', (_event) => {
                if (xhr.status === 200 /* TcHmi.HttpStatusCode.Ok */) {
                    vm = xhr.responseText;
                }
                else {
                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                        v.url +
                        ' Details: HTTP error ' +
                        (xhr.status + ' ' + xhr.statusText));
                }
                TcHmi.Callback.callSafeEx(callback, null, v, vm);
            });
            xhr.addEventListener('error', (_event) => {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                    v.url +
                    ' Details: HTTP error ' +
                    (xhr.status + ' ' + xhr.statusText));
                TcHmi.Callback.callSafeEx(callback, null, v, vm);
            });
            xhr.send();
        }
    }
    __loadViewPartialCallback(v, vm) {
        if (vm === undefined || vm === null) {
            return;
        }
        let cleanUrl = tchmi_path(v.url);
        let cacheEntry;
        if (v.url !== undefined && v.url !== null && v.preload) {
            cacheEntry = { markup: vm };
            TcHmi.System.Data.Caches.partialMarkupCache.set(cleanUrl, cacheEntry);
        }
        if (v.preload && v.url !== undefined && v.url !== null && !TCHMI_DESIGNER) {
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = vm;
            if (tempDiv.firstElementChild) {
                const tco = TcHmi.System.Services.controlManager.compile(tempDiv.firstElementChild).control;
                if (tco !== undefined) {
                    if (cacheEntry) {
                        cacheEntry.partialId = tco.getId();
                    }
                    tco.__setKeepAlive(true);
                    tco.getElement().attr('data-tchmi-partial-url', v.url);
                }
            }
        }
        // Update System
        TcHmi.EventProvider.raise('System.onViewCreated', { url: cleanUrl });
    }
    __refreshViewPartials(views, viewsOld) {
        if (views === undefined || views === null || viewsOld === undefined || viewsOld === null) {
            return;
        }
        // Determine changes
        // Removed
        let viewsRemoved = [];
        for (let i = 0, ii = viewsOld.length; i < ii; i++) {
            let po = viewsOld[i];
            let bExists = false;
            for (let j = 0, jj = views.length; j < jj; j++) {
                let p = views[j];
                if (p.url === po.url) {
                    bExists = true;
                    break;
                }
            }
            if (!bExists) {
                viewsRemoved.push(po);
            }
        }
        // Created
        let viewsCreated = [];
        for (let i = 0, ii = views.length; i < ii; i++) {
            let p = views[i];
            let bExists = false;
            for (let j = 0, jj = viewsOld.length; j < jj; j++) {
                let po = viewsOld[j];
                if (p.url === po.url) {
                    bExists = true;
                    break;
                }
            }
            if (!bExists) {
                viewsCreated.push(p);
            }
        }
        // Process Changes
        // Removed...
        for (let i = 0, ii = viewsRemoved.length; i < ii; i++) {
            let v = viewsRemoved[i];
            if (v.url === undefined || v.url === null) {
                continue;
            }
            let cleanUrl = tchmi_path(v.url);
            // Remove from caches
            TcHmi.System.Data.Caches.partialMarkupCache.delete(cleanUrl);
            // Update System
            TcHmi.EventProvider.raise('System.onViewRemoved', { url: cleanUrl });
        }
        for (let i = 0, ii = viewsCreated.length; i < ii; i++) {
            let v = viewsCreated[i];
            this.__loadViewPartial(v, this.__loadViewPartialCallback);
        }
    }
    __refreshContentPartials(content, contentOld) {
        if (content === undefined || content === null || contentOld === undefined || contentOld === null) {
            return;
        }
        // Determine changes
        // Removed
        let contentRemoved = [];
        for (let i = 0, ii = contentOld.length; i < ii; i++) {
            let po = contentOld[i];
            let bExists = false;
            for (let j = 0, jj = content.length; j < jj; j++) {
                let p = content[j];
                if (p.url === po.url) {
                    bExists = true;
                    break;
                }
            }
            if (!bExists) {
                contentRemoved.push(po);
            }
        }
        // Created
        let contentCreated = [];
        for (const p of content) {
            TcHmi.System.Data.isLoadSyncContent.set(p.url, p.loadSync ?? false);
            let bExists = false;
            for (let j = 0, jj = contentOld.length; j < jj; j++) {
                let po = contentOld[j];
                if (p.url === po.url) {
                    bExists = true;
                    break;
                }
            }
            if (!bExists) {
                contentCreated.push(p);
            }
        }
        // Process Changes
        // Removed...
        for (let i = 0, ii = contentRemoved.length; i < ii; i++) {
            let c = contentRemoved[i];
            if (c.url === undefined || c.url === null) {
                continue;
            }
            let cleanUrl = tchmi_path(c.url);
            // Remove from caches
            TcHmi.System.Data.Caches.partialMarkupCache.delete(cleanUrl);
            // Update System
            TcHmi.EventProvider.raise('System.onContentRemoved', { url: cleanUrl });
        }
        for (let i = 0, ii = contentCreated.length; i < ii; i++) {
            let v = contentCreated[i];
            this.__loadViewPartial(v, this.__loadViewPartialCallback);
        }
    }
    __loadUserControlPartial(uc, callback) {
        let ucm = null;
        let ucc = null;
        let uccUrl = uc.url.replace('.usercontrol', '.usercontrol.json');
        let xhrDescr = new XMLHttpRequest();
        xhrDescr.open('GET', tchmi_encode_uri_components(uc.url) + '?preventcache=' + Math.random());
        xhrDescr.addEventListener('load', (_event) => {
            if (xhrDescr.status === 200 /* TcHmi.HttpStatusCode.Ok */) {
                ucm = xhrDescr.responseText;
                let xhr = new XMLHttpRequest();
                xhr.open('GET', tchmi_encode_uri_components(uccUrl) + '?preventcache=' + Math.random());
                xhr.addEventListener('load', (_event) => {
                    if (xhr.status === 200 /* TcHmi.HttpStatusCode.Ok */) {
                        ucc = TcHmi.ValueConverter.toObject(xhr.responseText);
                    }
                    else {
                        TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                            uccUrl +
                            ' Details: HTTP error ' +
                            (xhr.status + ' ' + xhr.statusText));
                    }
                    TcHmi.Callback.callSafeEx(callback, null, uc, ucm, ucc);
                });
                xhr.addEventListener('error', (_event) => {
                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                        uccUrl +
                        ' Details: HTTP error ' +
                        (xhr.status + ' ' + xhr.statusText));
                    TcHmi.Callback.callSafeEx(callback, null, uc, ucm, ucc);
                });
                xhr.send();
            }
            else {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                    uc.url +
                    ' Details: HTTP error ' +
                    (xhrDescr.status + ' ' + xhrDescr.statusText));
                TcHmi.Callback.callSafeEx(callback, null, uc, ucm, ucc);
            }
        });
        xhrDescr.addEventListener('error', (_event) => {
            TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                uc.url +
                ', status=' +
                xhrDescr.status);
            TcHmi.Callback.callSafeEx(callback, null, uc, ucm, ucc);
        });
        xhrDescr.send();
    }
    __loadUserControlPartialCallback(uc, ucm, ucc) {
        if (ucm === undefined || ucm === null) {
            return;
        }
        let cleanUcUrl = tchmi_path(uc.url);
        let cleanUcConfigUrl = tchmi_path(uc.url.replace('.usercontrol', '.usercontrol.json'));
        let cacheEntry;
        if (uc.url !== undefined && uc.url !== null) {
            cacheEntry = { markup: ucm };
            TcHmi.System.Data.Caches.partialMarkupCache.set(cleanUcUrl, cacheEntry);
        }
        if (ucc !== undefined && ucc !== null && uc.url !== undefined && uc.url !== null) {
            TcHmi.System.Data.Caches.partialCompositeConfigCache.set(cleanUcConfigUrl, ucc);
        }
        // Update System
        TcHmi.EventProvider.raise('System.onUserControlCreated', { url: cleanUcUrl });
        TcHmi.EventProvider.raise('System.onUserControlConfigCreated', { url: cleanUcConfigUrl });
    }
    __refreshUserControlPartials(userControls, userControlsOld) {
        if (userControls === undefined ||
            userControls === null ||
            userControlsOld === undefined ||
            userControlsOld === null) {
            return;
        }
        // Determine changes
        // Removed
        let userControlsRemoved = [];
        for (let i = 0, ii = userControlsOld.length; i < ii; i++) {
            let po = userControlsOld[i];
            let bExists = false;
            for (let j = 0, jj = userControls.length; j < jj; j++) {
                let p = userControls[j];
                if (p.url === po.url) {
                    bExists = true;
                }
            }
            if (!bExists) {
                userControlsRemoved.push(po);
            }
        }
        // Created
        let userControlsCreated = [];
        for (let i = 0, ii = userControls.length; i < ii; i++) {
            let p = userControls[i];
            let bExists = false;
            for (let j = 0, jj = userControlsOld.length; j < jj; j++) {
                let po = userControlsOld[j];
                if (p.url === po.url) {
                    bExists = true;
                }
            }
            if (!bExists) {
                userControlsCreated.push(p);
            }
        }
        // Process Changes
        // Removed...
        for (let i = 0, ii = userControlsRemoved.length; i < ii; i++) {
            let uc = userControlsRemoved[i];
            if (uc.url === undefined || uc.url === null) {
                continue;
            }
            let cleanUcUrl = tchmi_path(uc.url);
            let cleanUcConfigUrl = tchmi_path(uc.url.replace('.usercontrol', '.usercontrol.json'));
            // Remove from caches
            TcHmi.System.Data.Caches.partialMarkupCache.delete(cleanUcUrl);
            TcHmi.System.Data.Caches.partialCompositeConfigCache.delete(cleanUcConfigUrl);
            // Update System
            TcHmi.EventProvider.raise('System.onUserControlRemoved', { url: cleanUcUrl });
            TcHmi.EventProvider.raise('System.onUserControlConfigRemoved', { url: cleanUcConfigUrl });
        }
        // Created
        for (const uc of userControlsCreated) {
            this.__loadUserControlPartial(uc, this.__loadUserControlPartialCallback);
        }
    }
    __refreshSymbolsInternal(symbols, symbolsOld) {
        let i = 0, ii = 0, key = null, keyOld = null, bRemove = false, remove = [], bCreate = false, create = [], update = [];
        // Remove no longer existing.
        if (symbolsOld !== undefined && symbolsOld !== null && symbols !== undefined && symbols !== null) {
            for (keyOld in symbolsOld) {
                if (!symbolsOld.hasOwnProperty(keyOld)) {
                    continue;
                }
                bRemove = true;
                for (key in symbols) {
                    if (!symbols.hasOwnProperty(key)) {
                        continue;
                    }
                    if (keyOld === key) {
                        bRemove = false;
                        break;
                    }
                    key = null;
                }
                if (bRemove) {
                    remove.push(keyOld);
                }
                bRemove = false;
                keyOld = null;
            }
        }
        for (i = 0, ii = remove.length; i < ii; i++) {
            TcHmi.System.Services.internalSymbolManager.remove(remove[i]);
        }
        // Create not existing.
        if (symbolsOld !== undefined && symbolsOld !== null && symbols !== undefined && symbols !== null) {
            for (key in symbols) {
                if (!symbols.hasOwnProperty(key)) {
                    continue;
                }
                bCreate = true;
                for (keyOld in symbolsOld) {
                    if (!symbolsOld.hasOwnProperty(keyOld)) {
                        continue;
                    }
                    if (key === keyOld) {
                        bCreate = false;
                        if (!tchmi_equal(symbols[key].value, symbolsOld[keyOld].value) ||
                            symbols[key].persist !== symbolsOld[keyOld].persist ||
                            symbols[key].type !== symbolsOld[keyOld].type ||
                            symbols[key].readonly !== symbolsOld[keyOld].readonly) {
                            update.push({ key: key, item: symbols[key] });
                        }
                        break;
                    }
                }
                if (bCreate) {
                    create.push({
                        key: key,
                        item: symbols[key],
                    });
                }
            }
        }
        for (const entry of create) {
            TcHmi.System.Services.internalSymbolManager.add(entry.key, tchmi_clone_object(entry.item));
        }
        // Update existing.
        for (const entry of update) {
            TcHmi.System.Services.internalSymbolManager.update(entry.key, tchmi_clone_object(entry.item));
        }
    }
    __refreshSymbolsTimer(symbols, symbolsOld) {
        let i = 0, ii = 0, key = null, keyOld = null, bRemove = false, remove = [], bCreate = false, create = [], update = [];
        // Exit early when we have no changes.
        if (tchmi_equal(symbols, symbolsOld)) {
            return;
        }
        // Stop timer
        TcHmi.System.Services.timerSymbolManager.stop();
        // Remove no longer existing.
        if (symbolsOld !== undefined && symbolsOld !== null && symbols !== undefined && symbols !== null) {
            for (keyOld in symbolsOld) {
                if (!symbolsOld.hasOwnProperty(keyOld)) {
                    continue;
                }
                bRemove = true;
                for (key in symbols) {
                    if (!symbols.hasOwnProperty(key)) {
                        continue;
                    }
                    if (keyOld === key) {
                        bRemove = false;
                        break;
                    }
                    key = null;
                }
                if (bRemove) {
                    remove.push(keyOld);
                }
                bRemove = false;
                keyOld = null;
            }
        }
        for (i = 0, ii = remove.length; i < ii; i++) {
            TcHmi.System.Services.timerSymbolManager.remove(remove[i]);
        }
        // Compare current and known TimerSymbol dictionary.
        if (symbolsOld !== undefined && symbolsOld !== null && symbols !== undefined && symbols !== null) {
            for (key in symbols) {
                if (!symbols.hasOwnProperty(key)) {
                    continue;
                }
                bCreate = true;
                for (keyOld in symbolsOld) {
                    if (!symbolsOld.hasOwnProperty(keyOld)) {
                        continue;
                    }
                    if (key === keyOld) {
                        bCreate = false;
                        if (!tchmi_equal(symbols[key], symbolsOld[keyOld])) {
                            update.push({ key: key, item: symbols[key] });
                        }
                        break;
                    }
                }
                if (bCreate) {
                    create.push({
                        key: key,
                        item: symbols[key],
                    });
                }
            }
        }
        // Create not existing
        for (const entry of create) {
            TcHmi.System.Services.timerSymbolManager.add(entry.key, tchmi_clone_object(entry.item));
        }
        // Update existing
        for (const entry of update) {
            TcHmi.System.Services.timerSymbolManager.update(entry.key, tchmi_clone_object(entry.item));
        }
        // Start timer
        TcHmi.System.Services.timerSymbolManager.run();
    }
    __refreshSymbols(symbols, symbolsOld) {
        // Internal
        this.__refreshSymbolsInternal(symbols.internal, symbolsOld.internal);
        // Timer
        this.__refreshSymbolsTimer(symbols.timer, symbolsOld.timer);
        // ThemedResources
        if (!tchmi_equal(symbols.themedResources, symbolsOld.themedResources)) {
            TcHmi.System.Services.themeManager.processThemedResources();
        }
    }
    __refreshPackages(packages, packagesOld) {
        // Remove of no longer existing is not possible and requires a lock and reload.
        // Update of existing is not possible and requires a lock and reload.
        // Add new
        let i = 0, ii = 0, j = 0, jj = 0, bCreate = false, newPackages = [];
        if (packages !== undefined && packages !== null && packagesOld !== undefined && packagesOld !== null) {
            for (i = 0, ii = packages.length; i < ii; i++) {
                bCreate = true;
                for (j = 0, jj = packagesOld.length; j < jj; j++) {
                    if (packages[i].name === packagesOld[j].name) {
                        bCreate = false;
                        break;
                    }
                }
                if (bCreate) {
                    newPackages.push(packages[i]);
                }
            }
            resourceInjectionManager.injectPackageResources(tchmi_clone_object(newPackages));
        }
    }
    __refreshUserFunctions(userFunctions, userFunctionsOld) {
        // Create module definitions in 'TcHmi.System.Data.Modules.functions' for new functions in tchmiconfig.json.
        // - Directly, if registration for function is already available.
        // - Delayed, if registration is not available.
        // Registration will be available after include of related JavaScript file.
        // JavaScript files are included based on dependencyFiles content in function __refreshDependencyFiles.
        // Created
        let userFunctionsCreated = [];
        for (let i = 0, ii = userFunctions.length; i < ii; i++) {
            let userFunction = userFunctions[i];
            let bExists = false;
            if (userFunctionsOld) {
                for (let j = 0, jj = userFunctionsOld.length; j < jj; j++) {
                    let userFunctionOld = userFunctionsOld[j];
                    if (tchmi_path(userFunction.url) === tchmi_path(userFunctionOld.url)) {
                        bExists = true;
                        break;
                    }
                }
            }
            else {
                bExists = false;
            }
            if (!bExists) {
                userFunctionsCreated.push(userFunction);
            }
        }
        // Process Created
        for (const userFunction of userFunctionsCreated) {
            // Create module entries only! Files will be included in document while __refreshDependencyFiles
            let url = tchmi_path(userFunction.url.replace('.js', '.function.json').replace('.mjs', '.function.json'));
            let xhr = new XMLHttpRequest();
            xhr.open('GET', encodeURIComponent(url) + '?preventcache=' + Math.random());
            xhr.addEventListener('load', (_event) => {
                if (xhr.status === 200 /* TcHmi.HttpStatusCode.Ok */) {
                    let descr = TcHmi.ValueConverter.toObject(xhr.responseText);
                    if (!descr) {
                        TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while parsing object loaded from ' +
                            url);
                        return;
                    }
                    let name = descr.function.name;
                    let namespace = descr.function.namespace;
                    let qname = TcHmi.System.resolveQualifiedName(name, namespace);
                    let registration = TcHmi.System.Data.Registrations.functions.map.get(name);
                    let add = function () {
                        if (!registration?.name) {
                            return;
                        }
                        let name = registration.name, qname = TcHmi.System.resolveQualifiedName(registration.name, registration.namespace);
                        let module = {
                            error: TcHmi.Errors.NONE,
                            reg: registration,
                            description: descr,
                        };
                        // Name entry
                        if (!TcHmi.System.Data.Modules.functions.map.has(name)) {
                            TcHmi.System.Data.Modules.functions.map.set(name, module);
                        }
                        else {
                            TcHmi.System.Data.Modules.functions.map.set(name, {
                                error: TcHmi.Errors.E_NOT_UNIQUE,
                                errorDetails: {
                                    code: TcHmi.Errors.E_NOT_UNIQUE,
                                    message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                },
                            });
                        }
                        // Qualified name entry
                        if (qname !== name) {
                            if (!TcHmi.System.Data.Modules.functions.map.has(qname)) {
                                TcHmi.System.Data.Modules.functions.map.set(qname, module);
                            }
                            else {
                                TcHmi.System.Data.Modules.functions.map.set(qname, {
                                    error: TcHmi.Errors.E_NOT_UNIQUE,
                                    errorDetails: {
                                        code: TcHmi.Errors.E_NOT_UNIQUE,
                                        message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                    },
                                });
                            }
                        }
                    };
                    if (!registration || registration.error === TcHmi.Errors.E_NOT_UNIQUE) {
                        registration = TcHmi.System.Data.Registrations.functions.map.get(qname);
                        if (registration) {
                            // Add module
                            add();
                        }
                        else {
                            // Wait for registration and add module if registered !
                            TcHmi.EventProvider.register('System.onFunctionRegistered', (event, data) => {
                                event.destroy();
                                registration = data;
                                add();
                            });
                        }
                    }
                }
                else {
                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                        url +
                        ' Details: HTTP error ' +
                        (xhr.status + ' ' + xhr.statusText));
                }
            });
            xhr.addEventListener('error', (_event) => {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                    url +
                    ' Details: HTTP error ' +
                    (xhr.status + ' ' + xhr.statusText));
            });
            xhr.send();
        }
    }
    /**
     * Add new JavaScript files to the document.head based on dependencyFiles in tchmiconfig.json.
     **/
    __refreshDependencyFiles(dependencyFiles, dependencyFilesOld) {
        // We do not have to respect if a JavaScript file is related to a JavaScript function or if its anything else. Function modules are generated within function __refreshUserFunctions based on user-functions from tchmiconfig.json.
        // We do not have to respect css files. They will be handled within TcHmiConfigChanged commands of type ThemeConfig and can be ignored in this function.
        if (!dependencyFiles || !dependencyFilesOld) {
            return;
        }
        // Created
        let dependencyFilesCreated = [];
        for (const dependencyFile of dependencyFiles) {
            if (dependencyFile.type === 'Stylesheet') {
                continue;
            }
            const normalizedPath = tchmi_path(dependencyFile.name);
            let bExists = false;
            for (const scriptElem of document.scripts) {
                if (normalizedPath !== tchmi_path(scriptElem.getAttribute('src'))) {
                    // This script element is not the same.
                    continue;
                }
                if (dependencyFile.type === 'EsModule' && scriptElem.type === 'module') {
                    bExists = true;
                    break;
                }
                else if (dependencyFile.type === 'JavaScript' && !scriptElem.type) {
                    bExists = true;
                    break;
                }
                else {
                    designerModeManager.lock();
                    return;
                }
            }
            if (!bExists) {
                dependencyFilesCreated.push(dependencyFile);
            }
        }
        // Process Created
        if (dependencyFilesCreated.length > 0) {
            const fragment = document.createDocumentFragment();
            for (const dependencyFile of dependencyFilesCreated) {
                const script = document.createElement('script');
                script.src = tchmi_path(dependencyFile.name);
                if (dependencyFile.type === 'EsModule') {
                    script.type = 'module';
                }
                else {
                    script.async = false;
                }
                fragment.appendChild(script);
            }
            document.head.appendChild(fragment);
        }
    }
    __refreshLanguageFallback(languageFallback, languageFallbackOld) {
        if (languageFallback === languageFallbackOld) {
            return;
        }
        TcHmi.System.Services.localizationManager.setFallbackLocale(languageFallback);
        TcHmi.System.Services.localizationManager.resetFallbackLocale();
    }
    __refreshLanguage(languages, languagesOld) {
        if (tchmi_equal(languages, languagesOld)) {
            return;
        }
        for (const [key, languageEntry] of Object.entries(languagesOld)) {
            if (Array.isArray(languageEntry)) {
                const sanitizedLanguageArray = [];
                for (const subEntry of languageEntry) {
                    sanitizedLanguageArray.push(tchmi_path(subEntry));
                }
                TcHmi.System.Services.localizationManager.unregisterLocalizationFile('TcHmi.System.Localization.Application', key, sanitizedLanguageArray);
            }
            else if (languageEntry) {
                TcHmi.System.Services.localizationManager.unregisterLocalizationFile('TcHmi.System.Localization.Application', key, tchmi_path(languageEntry));
            }
        }
        for (const [key, languageEntry] of Object.entries(languages)) {
            if (Array.isArray(languageEntry)) {
                const sanitizedLanguageArray = [];
                for (const subEntry of languageEntry) {
                    sanitizedLanguageArray.push(tchmi_path(subEntry));
                }
                TcHmi.System.Services.localizationManager.registerLocalizationFile('TcHmi.System.Localization.Application', key, sanitizedLanguageArray);
            }
            else if (languageEntry) {
                TcHmi.System.Services.localizationManager.registerLocalizationFile('TcHmi.System.Localization.Application', key, tchmi_path(languageEntry));
            }
        }
    }
    __refreshSystemKeyboard(keyboardDefinition, keyboardDefinitionOld) {
        if (tchmi_equal(keyboardDefinition, keyboardDefinitionOld)) {
            return;
        }
        TcHmi.System.Services.keyboardManager?.refreshConfig();
    }
    __refreshIntervals(intervals, intervalsOld) {
        let i = 0, ii = 0, key = null, keyOld = null, bRemove = false, remove = [], bCreate = false, create = [], update = [];
        // Remove no longer existing.
        if (intervalsOld !== undefined && intervalsOld !== null && intervals !== undefined && intervals !== null) {
            for (keyOld in intervalsOld) {
                if (!intervalsOld.hasOwnProperty(keyOld)) {
                    continue;
                }
                bRemove = true;
                for (key in intervals) {
                    if (!intervals.hasOwnProperty(key)) {
                        continue;
                    }
                    if (keyOld === key) {
                        bRemove = false;
                        break;
                    }
                    key = null;
                }
                if (bRemove) {
                    remove.push(keyOld);
                }
                bRemove = false;
                keyOld = null;
            }
        }
        for (i = 0, ii = remove.length; i < ii; i++) {
            TcHmi.System.Services.intervalManager.remove(remove[i]);
        }
        // Create not existing.
        if (intervalsOld !== undefined && intervalsOld !== null && intervals !== undefined && intervals !== null) {
            for (key in intervals) {
                if (!intervals.hasOwnProperty(key)) {
                    continue;
                }
                bCreate = true;
                for (keyOld in intervalsOld) {
                    if (!intervalsOld.hasOwnProperty(keyOld)) {
                        continue;
                    }
                    if (key === keyOld) {
                        bCreate = false;
                        if (!tchmi_equal(intervals[key], intervalsOld[keyOld])) {
                            update.push({ key: key, item: intervals[key] });
                        }
                        break;
                    }
                }
                if (bCreate) {
                    create.push({
                        key: key,
                        item: intervals[key],
                    });
                }
            }
        }
        for (const entry of create) {
            TcHmi.System.Services.intervalManager.add(entry.key, tchmi_clone_object(entry.item));
        }
        // Update existing.
        for (const entry of update) {
            TcHmi.System.Services.intervalManager.update(entry.key, tchmi_clone_object(entry.item));
        }
    }
    __doReloadTcHmiConfig(url) {
        let config = null;
        let configOld = TcHmi.System.config;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'Properties/tchmiconfig.json' + '?preventcache=' + Math.random());
        xhr.addEventListener('load', (_event) => {
            if (xhr.status === 200 /* TcHmi.HttpStatusCode.Ok */) {
                config = TcHmi.ValueConverter.toObject(xhr.responseText);
                if (config === null) {
                    return;
                }
                this.__doRefreshTcHmiConfig(config, configOld);
            }
            else {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                    url +
                    ' Command will be ignored. Details: HTTP error ' +
                    (xhr.status + ' ' + xhr.statusText));
            }
        });
        xhr.addEventListener('error', (_event) => {
            TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                url +
                ' Command will be ignored. HTTP error ' +
                (xhr.status + ' ' + xhr.statusText));
        });
        xhr.send();
    }
    __doRefreshTcHmiConfig(config, configOld) {
        // Update Config Object
        TcHmi.System.config = config;
        // But keep basePath as this is environment specific
        TcHmi.System.config.basePath = configOld.basePath;
        if (!TcHmi.System.config.tcHmiServer) {
            TcHmi.System.config.tcHmiServer = configOld.tcHmiServer;
        }
        else if (!TcHmi.System.config.tcHmiServer.websocketIntervalTime) {
            TcHmi.System.config.tcHmiServer.websocketIntervalTime = configOld.tcHmiServer.websocketIntervalTime;
        }
        // Process Config
        this.__refreshBaseConfig(config, configOld);
        this.__refreshViewPartials(config.views, configOld.views);
        this.__refreshContentPartials(config.content, configOld.content);
        this.__refreshUserControlPartials(config.userControls, configOld.userControls);
        this.__refreshSymbols(config.symbols, configOld.symbols);
        this.__refreshPackages(config.packages, configOld.packages);
        this.__refreshUserFunctions(config.userFunctions, configOld.userFunctions);
        this.__refreshDependencyFiles(config.dependencyFiles, configOld.dependencyFiles);
        this.__refreshLanguage(config.languages, configOld.languages);
        this.__refreshLanguageFallback(config.languageFallback, configOld.languageFallback);
        this.__refreshSystemKeyboard(config.systemKeyboard, configOld.systemKeyboard);
        this.__refreshIntervals(config.intervals, configOld.intervals);
        if (!tchmi_equal(config, configOld)) {
            TcHmi.EventProvider.raise('onConfigChanged', {
                configNew: config,
                configOld: configOld,
            });
        }
    }
    __doReloadUserControlConfig(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', tchmi_encode_uri_components(url) + '?preventcache=' + Math.random());
        xhr.addEventListener('load', (_event) => {
            if (xhr.status === 200 /* TcHmi.HttpStatusCode.Ok */) {
                let data = TcHmi.ValueConverter.toObject(xhr.responseText);
                if (data) {
                    this.__doRefreshUserControlConfig(url, data);
                }
                else {
                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while parsing file loaded from ' +
                        url);
                }
            }
            else {
                TcHmi.EventProvider.raise('System.onUserControlConfigRemoved', { url: url }); // A TcHmiConfigChanged command targeting a UserControlConfig and UserControlConfig is missing should be handled as UserControlConfig was removed.
            }
        });
        xhr.addEventListener('error', (_event) => {
            TcHmi.EventProvider.raise('System.onUserControlConfigRemoved', { url: url }); // A TcHmiConfigChanged command targeting a UserControlConfig and UserControlConfig is missing should be handled as UserControlConfig was removed.
        });
        xhr.send();
    }
    __doRefreshUserControlConfig(url, data) {
        // Update usercontrol config cache.
        TcHmi.System.Data.Caches.partialCompositeConfigCache.set(url, data);
        TcHmi.EventProvider.raise('System.onUserControlConfigChanged', { url: url });
    }
    __doReloadLocalizationFile(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', tchmi_encode_uri_components(url) + '?preventcache=' + Math.random());
        xhr.addEventListener('load', (_event) => {
            if (xhr.status === 200 /* TcHmi.HttpStatusCode.Ok */) {
                let data = TcHmi.ValueConverter.toObject(xhr.responseText);
                if (data) {
                    this.__doRefreshLocalizationFile(url, data);
                }
                else {
                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while parsing file loaded from ' +
                        url);
                }
            }
            else {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                    url +
                    ' Details: HTTP error ' +
                    (xhr.status + ' ' + xhr.statusText));
            }
        });
        xhr.addEventListener('error', (_event) => {
            TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkTcHmiConfigChanged] Error while loading ' +
                url +
                '. Details: ' +
                xhr.statusText);
        });
        xhr.send();
    }
    __doRefreshLocalizationFile(url, data) {
        let locale = data.locale;
        if (locale === undefined || locale === null) {
            return;
        }
        // Clear file fetch cache to force clean file reload on next localization load
        TcHmi.System.Services.localizationManager.clearFileFetchCache();
        let currentLocaleData = TcHmi.System.Services.localizationManager.getLocaleData('TcHmi.System.Localization.Application');
        let currentLocaleFallbackData = TcHmi.System.Services.localizationManager.getLocaleFallbackData('TcHmi.System.Localization.Application');
        if (currentLocaleData && currentLocaleData.locale === locale) {
            TcHmi.System.Services.localizationManager.setLocaleData('TcHmi.System.Localization.Application', data, url);
            // reread to handle merged files
            currentLocaleData = TcHmi.System.Services.localizationManager.getLocaleData('TcHmi.System.Localization.Application');
            TcHmi.System.Services.localizationManager.processLocalizationData('TcHmi.System.Localization.Application', currentLocaleData, currentLocaleFallbackData);
        }
        if (currentLocaleFallbackData && currentLocaleFallbackData.locale === locale) {
            TcHmi.System.Services.localizationManager.setLocaleFallbackData('TcHmi.System.Localization.Application', data, url);
            // reread to handle merged files
            currentLocaleFallbackData = TcHmi.System.Services.localizationManager.getLocaleFallbackData('TcHmi.System.Localization.Application');
            TcHmi.System.Services.localizationManager.processLocalizationData('TcHmi.System.Localization.Application', currentLocaleData, currentLocaleFallbackData);
        }
        TcHmi.System.Services.localizationManager.processPendingEntryWatches();
        TcHmi.System.Services.localizationManager.processLocalizationWatches('TcHmi.System.Localization.Application');
    }
    __doRefreshThemeFile(url) {
        TcHmi.System.Services.themeManager.__clearProjectThemeUrl(url);
        TcHmi.System.Services.themeManager.processActiveTheme();
    }
    run() {
        let cmd = this.__cmd;
        let preparedConfigPath = tchmi_path(cmd.configPath);
        switch (cmd.type) {
            case 'TcHmiConfig':
                this.__doReloadTcHmiConfig(preparedConfigPath);
                break;
            case 'UserControlConfig':
                this.__doReloadUserControlConfig(preparedConfigPath);
                break;
            case 'Localization':
                this.__doReloadLocalizationFile(preparedConfigPath);
                break;
            case 'ThemeConfig':
                this.__doRefreshThemeFile(preparedConfigPath);
                break;
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkTcHmiConfigChanged.js.map