if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class DesignerModeResourceInjectionManager {
    constructor() { }
    injectPackageResources(packages, callback) {
        let pending = 0;
        let destroyOnControlsRegistered;
        let destroyOnFunctionRegistered;
        let mPackages = new Map();
        let modControls = {
            map: new Map(),
            urlByName: new Map(),
            array: [],
        };
        let modFunctions = {
            map: new Map(),
            array: [],
        };
        let mapControlDescriptionByPath = new Map();
        let mapFunctionDescriptionByPath = new Map();
        // Finalize
        let asyncFinalizeStage4 = () => {
            if (pending > 0) {
                return;
            }
            pending = 0;
            if (destroyOnControlsRegistered) {
                destroyOnControlsRegistered();
                destroyOnControlsRegistered = null;
            }
            if (destroyOnFunctionRegistered) {
                destroyOnFunctionRegistered();
                destroyOnFunctionRegistered = null;
            }
            TcHmi.System.Services.typeManager.doForceSchemaDefinitions((data) => {
                // Important! Force possible new schema definitions from server before resolving description inheritation to avoid errors about missing type definitions because server may not yet have send information about new types.
                TcHmi.System.Services.controlManager.resolveDescriptionInheritation();
                TcHmi.System.Services.themeManager.processActiveTheme();
                // Force english locale for engineering level texts until we get information about current Visual Studio locale.
                TcHmi.System.Services.localizationManager.processLocale('en', {
                    level: TcHmi.Locale.Level.Engineering,
                });
                // Update application level, too
                TcHmi.System.Services.localizationManager.processLocale(TcHmi.System.Services.localizationManager.getLocale(), { level: TcHmi.Locale.Level.Application });
                TcHmi.Callback.callSafeEx(callback, this, { error: TcHmi.Errors.NONE });
            });
        };
        // Load additional files based on control description
        let asyncFinalizeStage3 = () => {
            if (pending > 0) {
                return;
            }
            pending = 0;
            for (const module of modControls.array) {
                if (!module.description || !module.package || !module.manifestData) {
                    return;
                }
                if (module.description.template) {
                    let url = tchmi_path(module.package.basePath +
                        '/' +
                        module.manifestData.basePath +
                        '/' +
                        module.description.template);
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', tchmi_encode_uri_components(url) + '?preventcache=' + Math.random());
                    xhr.addEventListener('load', (_event) => {
                        pending--;
                        if (xhr.status !== 200 /* TcHmi.HttpStatusCode.Ok */) {
                            asyncFinalizeStage4();
                            return;
                        }
                        TcHmi.System.Data.Caches.templateMarkupCache.set(url, xhr.responseText);
                        asyncFinalizeStage4();
                    });
                    xhr.addEventListener('error', (_event) => {
                        pending--;
                        asyncFinalizeStage4();
                    });
                    pending++;
                    xhr.send();
                }
                if (module.description.languages) {
                    const qname = TcHmi.System.resolveQualifiedName(module.description.name, module.description.namespace);
                    for (const [key, languageEntry] of Object.entries(module.description.languages)) {
                        if (Array.isArray(languageEntry)) {
                            const sanitizedLanguageArray = [];
                            for (const subEntry of languageEntry) {
                                sanitizedLanguageArray.push(tchmi_path(TcHmi.Environment.getControlBasePath(qname) + '/' + subEntry));
                            }
                            TcHmi.System.Services.localizationManager.registerLocalizationFile('TcHmi.System.Localization.Control<' + qname + '>', key, sanitizedLanguageArray);
                        }
                        else {
                            TcHmi.System.Services.localizationManager.registerLocalizationFile('TcHmi.System.Localization.Control<' + qname + '>', key, tchmi_path(TcHmi.Environment.getControlBasePath(qname) + '/' + languageEntry));
                        }
                    }
                }
            }
            asyncFinalizeStage4();
        };
        // Process description, template etc. files. and inject them into dom.
        let asyncFinalizeStage2 = () => {
            if (pending > 0) {
                return;
            }
            pending = 0;
            let jsincludes = [];
            let packagesSorted = [];
            mPackages.forEach((pkg, name) => {
                packagesSorted.push(pkg);
            });
            packagesSorted.sort((a, b) => {
                if (a && a.manifest && a.manifest.modules) {
                    for (let i = 0, ii = a.manifest.modules.length; i < ii; i++) {
                        let module = a.manifest.modules[i];
                        if (module && module.type !== 'Package') {
                            continue;
                        }
                        if (module.nugetId === b.name) {
                            return -1;
                        }
                    }
                }
                if (b && b.manifest && b.manifest.modules) {
                    for (let i = 0, ii = b.manifest.modules.length; i < ii; i++) {
                        let module = b.manifest.modules[i];
                        if (module && module.type !== 'Package') {
                            continue;
                        }
                        if (module.nugetId === a.name) {
                            return 1;
                        }
                    }
                }
                return 0;
            });
            for (let i = 0, ii = packagesSorted.length; i < ii; i++) {
                let pkg = packagesSorted[i];
                if (!pkg) {
                    continue;
                }
                let manifest = pkg.manifest;
                if (!manifest) {
                    continue;
                }
                let manifestModules = manifest.modules;
                if (manifestModules) {
                    // Gather types
                    for (let j = 0, jj = manifestModules.length; j < jj; j++) {
                        let manifestModule = manifestModules[j];
                        if (manifestModule.type === 'Control') {
                            let descrUrl = tchmi_path(pkg.basePath + '/' + manifestModule.basePath + '/' + manifestModule.descriptionFile);
                            let descr = mapControlDescriptionByPath.get(descrUrl);
                            if (!descr) {
                                continue;
                            }
                            let module = {
                                error: TcHmi.Errors.NONE,
                                manifestData: manifestModule,
                                package: pkg,
                                description: descr,
                                descriptionExpanded: {
                                    ...tchmi_clone_object(descr),
                                    ...{
                                        inheritationResolved: false,
                                        inheritedTypes: [],
                                        inheritedAttributes: [],
                                        inheritedAttributesNameMap: new Map(),
                                        inheritedAttributesPropertyNameMap: new Map(),
                                        inheritedAttributesPropertyGetterNameMap: new Map(),
                                        inheritedAttributesPropertySetterNameMap: new Map(),
                                        inheritedAccess: [],
                                        inheritedEvents: [],
                                        inheritedFunctions: [],
                                        inheritedLanguages: {},
                                    },
                                },
                            };
                            let name = descr.name;
                            modControls.array.push(module);
                            if (module.package?.manifest.apiVersion === 1) {
                                // V1.12
                                let qname = TcHmi.System.resolveQualifiedName(descr.name, descr.namespace);
                                // Name entry
                                if (!modControls.map.has(name)) {
                                    modControls.map.set(name, module);
                                    modControls.urlByName.set(name, descrUrl);
                                }
                                else {
                                    modControls.map.set(name, {
                                        error: TcHmi.Errors.E_NOT_UNIQUE,
                                        errorDetails: {
                                            code: TcHmi.Errors.E_NOT_UNIQUE,
                                            message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                        },
                                    });
                                    modControls.urlByName.delete(name);
                                }
                                // Qualified name entry
                                if (!modControls.map.has(qname)) {
                                    modControls.map.set(qname, module);
                                    modControls.urlByName.set(qname, descrUrl);
                                }
                                else {
                                    modControls.map.set(qname, {
                                        error: TcHmi.Errors.E_NOT_UNIQUE,
                                        errorDetails: {
                                            code: TcHmi.Errors.E_NOT_UNIQUE,
                                            message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                        },
                                    });
                                    modControls.urlByName.delete(qname);
                                }
                            }
                            else {
                                // V1.10
                                // Name entry
                                if (!modControls.map.has(name)) {
                                    modControls.map.set(name, module);
                                    modControls.urlByName.set(name, descrUrl);
                                }
                                else {
                                    modControls.map.set(name, {
                                        error: TcHmi.Errors.E_NOT_UNIQUE,
                                        errorDetails: {
                                            code: TcHmi.Errors.E_NOT_UNIQUE,
                                            message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                        },
                                    });
                                    modControls.urlByName.delete(name);
                                }
                            }
                            TcHmi.System.Services.themeManager.registerControlThemeFiles(descr);
                            for (let k = 0, kk = descr.dependencyFiles.length; k < kk; k++) {
                                let dependencyFile = descr.dependencyFiles[k];
                                if (!dependencyFile) {
                                    continue;
                                }
                                if (dependencyFile.type && dependencyFile.type.toUpperCase() === 'JAVASCRIPT') {
                                    let jsinclude = tchmi_path(pkg.basePath + '/' + manifestModule.basePath + '/' + dependencyFile.name);
                                    if (jsincludes.includes(jsinclude)) {
                                        continue;
                                    }
                                    jsincludes.push(jsinclude);
                                }
                            }
                        }
                        else if (manifestModule.type === 'Function') {
                            let descrUrl = tchmi_path(pkg.basePath + '/' + manifestModule.basePath + '/' + manifestModule.descriptionFile);
                            let descr = mapFunctionDescriptionByPath.get(descrUrl);
                            if (!descr) {
                                continue;
                            }
                            let module = {
                                error: TcHmi.Errors.NONE,
                                manifestData: manifestModule,
                                package: pkg,
                                description: descr,
                            };
                            modFunctions.array.push(module);
                            modFunctions.map.set(descr.function.name, module);
                            let name = descr.function.name;
                            if (pkg.manifest.apiVersion === 1) {
                                // V1.12
                                let qname = TcHmi.System.resolveQualifiedName(descr.function.name, 'Namespace');
                                // Name entry
                                if (!modFunctions.map.has(name)) {
                                    modFunctions.map.set(name, module);
                                }
                                else {
                                    modFunctions.map.set(name, {
                                        error: TcHmi.Errors.E_NOT_UNIQUE,
                                        errorDetails: {
                                            code: TcHmi.Errors.E_NOT_UNIQUE,
                                            message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                        },
                                    });
                                }
                                // Qualified name entry
                                if (!modFunctions.map.has(qname)) {
                                    modFunctions.map.set(qname, module);
                                }
                                else {
                                    modFunctions.map.set(qname, {
                                        error: TcHmi.Errors.E_NOT_UNIQUE,
                                        errorDetails: {
                                            code: TcHmi.Errors.E_NOT_UNIQUE,
                                            message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                        },
                                    });
                                }
                                if (descr.languages && module.package && module.manifestData) {
                                    for (const [key, languageEntry] of Object.entries(descr.languages)) {
                                        if (Array.isArray(languageEntry)) {
                                            for (const subEntry of languageEntry) {
                                                TcHmi.System.Services.localizationManager.registerLocalizationFile('TcHmi.System.Localization.Function<' + qname + '>', key, tchmi_path(module.package.basePath +
                                                    '/' +
                                                    module.manifestData.basePath +
                                                    '/' +
                                                    subEntry));
                                            }
                                        }
                                        else {
                                            TcHmi.System.Services.localizationManager.registerLocalizationFile('TcHmi.System.Localization.Function<' + qname + '>', key, tchmi_path(module.package.basePath +
                                                '/' +
                                                module.manifestData.basePath +
                                                '/' +
                                                languageEntry));
                                        }
                                    }
                                }
                            }
                            else {
                                // 1.10
                                // Name entry
                                if (!modFunctions.map.has(name)) {
                                    modFunctions.map.set(name, module);
                                }
                                else {
                                    modFunctions.map.set(name, {
                                        error: TcHmi.Errors.E_NOT_UNIQUE,
                                        errorDetails: {
                                            code: TcHmi.Errors.E_NOT_UNIQUE,
                                            message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                        },
                                    });
                                }
                            }
                            for (let k = 0, kk = descr.dependencyFiles.length; k < kk; k++) {
                                let dependencyFile = descr.dependencyFiles[k];
                                if (!dependencyFile) {
                                    continue;
                                }
                                if (dependencyFile.type && dependencyFile.type.toUpperCase() === 'JAVASCRIPT') {
                                    let include = tchmi_path(pkg.basePath + '/' + manifestModule.basePath + '/' + dependencyFile.name);
                                    if (jsincludes.includes(include)) {
                                        continue;
                                    }
                                    jsincludes.push(include);
                                }
                            }
                        }
                        else if (manifestModule.type === 'Resource') {
                            // JAVASCRIPT / *.js
                            if (manifestModule.path.toLowerCase().endsWith('.js') ||
                                manifestModule.path.toLowerCase().endsWith('.mjs')) {
                                let jsinclude = tchmi_path(pkg.basePath + '/' + manifestModule.path);
                                if (jsincludes.includes(jsinclude)) {
                                    continue;
                                }
                                jsincludes.push(jsinclude);
                            }
                        }
                    }
                }
            }
            // Add includes to dom.
            let fragment = document.createDocumentFragment();
            destroyOnControlsRegistered = TcHmi.EventProvider.register('System.onControlRegistered', (_event, data) => {
                if (data.error !== TcHmi.Errors.NONE || !data.name) {
                    return;
                }
                let name = data.name, qname = TcHmi.System.resolveQualifiedName(data.name, data.namespace);
                const modControlName = modControls.map.get(name);
                if (modControlName?.package?.manifest.apiVersion === 1) {
                    // V1.12
                    let modControlQualifiedName = modControls.map.get(qname);
                    // Flat array list
                    TcHmi.System.Data.Modules.controls.array.push(modControlName);
                    // Name entry
                    if (modControlName && modControlName.error === TcHmi.Errors.NONE) {
                        modControlName.reg = data;
                        if (!TcHmi.System.Data.Modules.controls.map.has(name)) {
                            TcHmi.System.Data.Modules.controls.map.set(name, modControlName);
                            let url = modControls.urlByName.get(name);
                            if (url) {
                                TcHmi.System.Data.Modules.controls.urlMap.set(url, modControlName);
                            }
                        }
                        else {
                            TcHmi.System.Data.Modules.controls.map.set(name, {
                                error: TcHmi.Errors.E_NOT_UNIQUE,
                                errorDetails: {
                                    code: TcHmi.Errors.E_NOT_UNIQUE,
                                    message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                },
                            });
                            let url = modControls.urlByName.get(name);
                            if (url) {
                                TcHmi.System.Data.Modules.controls.urlMap.delete(url);
                            }
                        }
                    }
                    else {
                        TcHmi.System.Data.Modules.controls.map.set(name, {
                            error: modControlName.error,
                        });
                    }
                    // Qualified name entry
                    if (!modControlQualifiedName) {
                        // Skip
                    }
                    else if (modControlQualifiedName.error === TcHmi.Errors.NONE) {
                        modControlQualifiedName.reg = data;
                        if (!TcHmi.System.Data.Modules.controls.map.has(qname)) {
                            TcHmi.System.Data.Modules.controls.map.set(qname, modControlQualifiedName);
                            let url = modControls.urlByName.get(qname);
                            if (url) {
                                TcHmi.System.Data.Modules.controls.urlMap.set(url, modControlQualifiedName);
                            }
                        }
                        else {
                            TcHmi.System.Data.Modules.controls.map.set(qname, {
                                error: TcHmi.Errors.E_NOT_UNIQUE,
                                errorDetails: {
                                    code: TcHmi.Errors.E_NOT_UNIQUE,
                                    message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                },
                            });
                            let url = modControls.urlByName.get(qname);
                            if (url) {
                                TcHmi.System.Data.Modules.controls.urlMap.delete(url);
                            }
                        }
                    }
                    else {
                        TcHmi.System.Data.Modules.controls.map.set(name, {
                            error: modControlQualifiedName.error,
                        });
                    }
                }
                else if (modControlName) {
                    // 1.10
                    // Name entry
                    if (modControlName.error === TcHmi.Errors.NONE) {
                        modControlName.reg = data;
                        if (modControlName.reg?.directory && modControlName.reg.template) {
                            let cleanTemplatePath = tchmi_path(modControlName.reg.template);
                            let cleanTemplateDirectory = tchmi_path(modControlName.reg.directory);
                            if (!cleanTemplatePath.includes(cleanTemplateDirectory) && // If directory is not part of the template path, template is inherited and we must not add it to description.
                                modControlName.description &&
                                modControlName.descriptionExpanded) {
                                let cleanRelativeTemplatePath = tchmi_path(cleanTemplatePath.replace(cleanTemplateDirectory, ''));
                                modControlName.description.template = cleanRelativeTemplatePath;
                                modControlName.descriptionExpanded.template = cleanRelativeTemplatePath;
                            }
                        }
                        if (!TcHmi.System.Data.Modules.controls.map.has(name)) {
                            TcHmi.System.Data.Modules.controls.map.set(name, modControlName);
                        }
                        else {
                            TcHmi.System.Data.Modules.controls.map.set(name, {
                                error: TcHmi.Errors.E_NOT_UNIQUE,
                                errorDetails: {
                                    code: TcHmi.Errors.E_NOT_UNIQUE,
                                    message: TcHmi.Errors[TcHmi.Errors.E_NOT_UNIQUE],
                                },
                            });
                        }
                    }
                    else {
                        TcHmi.System.Data.Modules.controls.map.set(name, {
                            error: modControlName.error,
                        });
                    }
                }
            });
            destroyOnFunctionRegistered = TcHmi.EventProvider.register('System.onFunctionRegistered', (_event, data) => {
                let name = data.name, qname = TcHmi.System.resolveQualifiedName(data.name, data.namespace);
                let modFunctionName = modFunctions.map.get(name);
                if (!modFunctionName || !modFunctionName.package) {
                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeResourceInjectionManager] Internal error. Did not find function module information.');
                    return;
                }
                if (modFunctionName.package.manifest.apiVersion === 1) {
                    // V1.12
                    let modFunctionQualifiedName = modFunctions.map.get(qname);
                    // Name entry
                    if (modFunctionName && modFunctionName.error === TcHmi.Errors.NONE) {
                        modFunctionName.reg = data;
                        if (!TcHmi.System.Data.Modules.functions.map.has(name)) {
                            TcHmi.System.Data.Modules.functions.map.set(name, modFunctionName);
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
                    }
                    else {
                        TcHmi.System.Data.Modules.functions.map.set(name, {
                            error: modFunctionName.error,
                        });
                    }
                    // Qualified name entry
                    if (!modFunctionQualifiedName) {
                        // Skip invalid entry
                    }
                    else if (modFunctionQualifiedName.error === TcHmi.Errors.NONE) {
                        if (!TcHmi.System.Data.Modules.functions.map.has(qname)) {
                            TcHmi.System.Data.Modules.functions.map.set(qname, modFunctionQualifiedName);
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
                    else {
                        TcHmi.System.Data.Modules.functions.map.set(name, {
                            error: modFunctionQualifiedName.error,
                        });
                    }
                }
                else {
                    // V1.10
                    // Name entry
                    if (modFunctionName && modFunctionName.error === TcHmi.Errors.NONE) {
                        modFunctionName.reg = data;
                        if (!TcHmi.System.Data.Modules.functions.map.has(name)) {
                            TcHmi.System.Data.Modules.functions.map.set(name, modFunctionName);
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
                    }
                    else {
                        TcHmi.System.Data.Modules.functions.map.set(name, {
                            error: modFunctionName.error,
                        });
                    }
                }
            });
            for (const include of jsincludes) {
                pending++;
                let script = document.createElement('script');
                script.src = include;
                script.async = false;
                script.onload = (_event) => {
                    pending--;
                    asyncFinalizeStage3();
                };
                script.onerror = (_event) => {
                    pending--;
                    asyncFinalizeStage3();
                };
                fragment.appendChild(script);
            }
            document.head.appendChild(fragment);
            asyncFinalizeStage3();
        };
        // Load module description files.
        let asyncFinalizeStage1 = () => {
            if (pending > 0) {
                return;
            }
            pending = 0;
            mPackages.forEach((pkg, name) => {
                let manifest = pkg.manifest;
                if (manifest) {
                    let manifestModules = manifest.modules;
                    if (manifestModules) {
                        for (const module of manifestModules) {
                            if (module?.type === 'Control') {
                                let url = tchmi_path(pkg.basePath + '/' + module.basePath + '/' + module.descriptionFile);
                                let xhr = new XMLHttpRequest();
                                xhr.open('GET', tchmi_encode_uri_components(url) + '?preventcache=' + Math.random());
                                xhr.addEventListener('load', (_event) => {
                                    pending--;
                                    if (xhr.status !== 200 /* TcHmi.HttpStatusCode.Ok */) {
                                        asyncFinalizeStage2();
                                        return;
                                    }
                                    try {
                                        mapControlDescriptionByPath.set(url, JSON.parse(xhr.responseText));
                                    }
                                    catch (e) {
                                        /* ignore */
                                    }
                                    asyncFinalizeStage2();
                                });
                                xhr.addEventListener('error', (_event) => {
                                    pending--;
                                    asyncFinalizeStage2();
                                });
                                pending++;
                                xhr.send();
                            }
                            else if (module?.type === 'Function') {
                                let url = tchmi_path(pkg.basePath + '/' + module.basePath + '/' + module.descriptionFile);
                                let xhr = new XMLHttpRequest();
                                xhr.open('GET', tchmi_encode_uri_components(url) + '?preventcache=' + Math.random());
                                xhr.addEventListener('load', (_event) => {
                                    pending--;
                                    if (xhr.status !== 200 /* TcHmi.HttpStatusCode.Ok */) {
                                        asyncFinalizeStage2();
                                        return;
                                    }
                                    try {
                                        mapFunctionDescriptionByPath.set(url, JSON.parse(xhr.responseText));
                                    }
                                    catch (e) {
                                        /* ignore */
                                    }
                                    asyncFinalizeStage2();
                                });
                                xhr.addEventListener('error', (_event) => {
                                    pending--;
                                    asyncFinalizeStage2();
                                });
                                pending++;
                                xhr.send();
                            }
                        }
                    }
                }
            });
            asyncFinalizeStage2();
        };
        // Load packages manifest.json
        for (const packageInfo of packages) {
            if (!TcHmi.System.Data.packages.has(packageInfo.name)) {
                let url = tchmi_path(packageInfo.basePath + '/Manifest.json');
                let xhr = new XMLHttpRequest();
                xhr.open('GET', tchmi_encode_uri_components(url) + '?preventcache=' + Math.random());
                xhr.addEventListener('load', (_event) => {
                    pending--;
                    if (xhr.status !== 200 /* TcHmi.HttpStatusCode.Ok */) {
                        asyncFinalizeStage1();
                        return;
                    }
                    let manifest;
                    try {
                        manifest = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        /* ignore */
                    }
                    if (!manifest) {
                        asyncFinalizeStage1();
                        return;
                    }
                    let pkg = {
                        name: packageInfo.name,
                        basePath: packageInfo.basePath,
                        manifest: manifest,
                    };
                    mPackages.set(pkg.name, pkg);
                    TcHmi.System.Data.packages.set(pkg.name, pkg);
                    asyncFinalizeStage1();
                });
                xhr.addEventListener('error', (_event) => {
                    pending--;
                    asyncFinalizeStage1();
                });
                pending++;
                xhr.send();
            }
            asyncFinalizeStage1();
        }
    }
    injectProjectResources() {
        // Prepared and reserved for further use...
    }
}
/** Runtime Manager */
export const resourceInjectionManager = new DesignerModeResourceInjectionManager();
//# sourceMappingURL=DesignerModeResourceInjectionManager.js.map