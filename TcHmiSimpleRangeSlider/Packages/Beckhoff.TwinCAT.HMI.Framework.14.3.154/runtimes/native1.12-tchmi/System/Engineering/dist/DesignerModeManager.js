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
import { metaDataManager } from './DesignerModeControlMetaDataMngr.js';
let controlMoveManager;
let controlResizeManager;
let hierarchyManager;
let highlightManager;
let interactionManager;
let rootControlManager;
let SyncCmdToCreatorSelectedControls;
let SyncCmdToCreatorSyncControls;
if (TCHMI_DESIGNER) {
    import('./DesignerModeMasterControlMoveMngr.js').then((module) => {
        controlMoveManager = module.controlMoveManager;
    });
    import('./DesignerModeMasterControlResizeMngr.js').then((module) => {
        controlResizeManager = module.controlResizeManager;
    });
    import('./DesignerModeMasterHierarchyMngr.js').then((module) => {
        hierarchyManager = module.hierarchyManager;
    });
    import('./DesignerModeMasterControlHighlightMngr.js').then((module) => {
        highlightManager = module.highlightManager;
    });
    import('./DesignerModeMasterInteractionMngr.js').then((module) => {
        interactionManager = module.interactionManager;
    });
    import('./DesignerModeMasterRootControlMngr.js').then((module) => {
        rootControlManager = module.rootControlManager;
    });
    import('./SyncCmdToCreatorSelectedControls.js').then((module) => {
        SyncCmdToCreatorSelectedControls = module.SyncCmdToCreatorSelectedControls;
    });
    import('./SyncCmdToCreatorSyncControls.js').then((module) => {
        SyncCmdToCreatorSyncControls = module.SyncCmdToCreatorSyncControls;
    });
}
let DesignerModeManager = (() => {
    var _a, _b;
    let _instanceExtraInitializers = [];
    let ___onControlAttached_decorators;
    let ___onThemeDataChanged_decorators;
    return class DesignerModeManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onControlAttached_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            ___onThemeDataChanged_decorators = [(_b = TcHmi).CallbackMethod.bind(_b)];
            __esDecorate(this, null, ___onControlAttached_decorators, { kind: "method", name: "__onControlAttached", static: false, private: false, access: { has: obj => "__onControlAttached" in obj, get: obj => obj.__onControlAttached }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onThemeDataChanged_decorators, { kind: "method", name: "__onThemeDataChanged", static: false, private: false, access: { has: obj => "__onThemeDataChanged" in obj, get: obj => obj.__onThemeDataChanged }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        constructor() {
            if (TCHMI_DESIGNER) {
                TcHmi.EventProvider.register('onThemeDataChanged', this.__onThemeDataChanged);
                TcHmi.EventProvider.register('onControlAttached', this.__onControlAttached);
            }
        }
        /**
         * Lock state of the whole designer view (for things which can not be changed after load)
         */
        __locked = (__runInitializers(this, _instanceExtraInitializers), false);
        __partialRequested = {};
        /**
         * Creates Transformed, Untransformed, Selection Highlight and Selection Anchor Container and attaches them to the DOM
         */
        __onControlAttached(event, tco) {
            if (!tco ||
                !TCHMI_DESIGNER ||
                !hierarchyManager ||
                !highlightManager ||
                !rootControlManager ||
                !controlMoveManager ||
                !controlResizeManager) {
                return;
            }
            const purl = tco.getElement()[0].getAttribute('data-tchmi-partial-url');
            let bIsDesignerModeControl = hierarchyManager.isDesignerModeControl(tco.getId());
            if (bIsDesignerModeControl) {
                let isPartialRoot = false;
                if (tchmi_path(purl) === TCHMI_TARGET_PARTIAL) {
                    isPartialRoot = true;
                }
                let creatorAttr;
                let bCreatorVisibility = true;
                creatorAttr = tco.getElement()[0].getAttribute('data-tchmi-creator-visibility');
                if (creatorAttr) {
                    creatorAttr = TcHmi.ValueConverter.toType(creatorAttr, 'tchmi:framework#/definitions/Visibility');
                }
                if (creatorAttr === 'Collapsed') {
                    bCreatorVisibility = false;
                }
                let bCreatorLocked = false;
                creatorAttr = tco.getElement()[0].getAttribute('data-tchmi-creator-locked');
                if (creatorAttr) {
                    bCreatorLocked = TcHmi.ValueConverter.toType(creatorAttr, 'tchmi:general#/definitions/Boolean');
                }
                let controlCollapsed = false;
                if (tco.getVisibility() === 'Collapsed') {
                    controlCollapsed = true;
                }
                let ctrlMeta = metaDataManager.getControlMetaData(tco.getId());
                if (ctrlMeta === null) {
                    let controlzindex = 0;
                    const aZindex = TcHmi.StyleProvider.getSimpleElementStyle(tco.getElement(), 'z-index');
                    if (aZindex['z-index'] !== undefined) {
                        controlzindex = parseInt(aZindex['z-index'], 10);
                        if (isNaN(controlzindex)) {
                            controlzindex = 0;
                        }
                    }
                    ctrlMeta = {
                        id: tco.getId(),
                        parent: null,
                        jControlPosition: highlightManager.createControlPosition(tco, 2000 + controlzindex),
                        jHierarchyControlposition: highlightManager.createHierarchyControlPosition(tco, 2000 + controlzindex),
                        jOriginalPosition: highlightManager.createOriginalPosition(tco, 1000 + controlzindex),
                        jAnchorContainer: highlightManager.createAnchorContainer(tco, 3000 + controlzindex, bCreatorLocked),
                        jHierarchyAnchorContainer: highlightManager.createHierarchyAnchorContainer(tco, 3000 + controlzindex, bCreatorLocked),
                        isSelected: false,
                        isSelectedPrev: false,
                        isPartialRoot: isPartialRoot,
                        controlCollapsed: controlCollapsed,
                        isContainerControl: tco.getIsContainerControl() &&
                            !(tco.getElement()?.[0]?.hasAttribute('data-tchmi-designer-ignore') ?? true),
                        isGridControl: TcHmi.System.Services.controlManager
                            .getDescriptionTypes(tco.getType())
                            .includes('TcHmi.Controls.System.TcHmiGrid'),
                        domVisibility: bCreatorVisibility,
                        locked: bCreatorLocked,
                        controlAttributeDimension: undefined,
                        controlCssPixelDimension: undefined,
                        relativeControlRotation: 0,
                        absoluteParentRotation: 0,
                    };
                    if (isPartialRoot) {
                        ctrlMeta.jControlPosition[0].classList.add('tchmi-creator-root-partial');
                        ctrlMeta.jHierarchyControlposition[0].classList.add('tchmi-creator-root-partial');
                        ctrlMeta.jOriginalPosition[0].classList.add('tchmi-creator-root-partial');
                        ctrlMeta.jAnchorContainer[0].classList.add('tchmi-creator-root-partial');
                        ctrlMeta.jHierarchyAnchorContainer[0].classList.add('tchmi-creator-root-partial');
                    }
                    // Native toggle with second parameter usable as we are chrome only
                    ctrlMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-locked', bCreatorLocked);
                    ctrlMeta.jHierarchyAnchorContainer[0].classList.toggle('tchmi-creator-control-locked', bCreatorLocked);
                    ctrlMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-height-inactive', tco.getHeightMode() === 'Content');
                    ctrlMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-width-inactive', tco.getWidthMode() === 'Content');
                    highlightManager.processHighlightType(ctrlMeta);
                    highlightManager.processDomVisibility(ctrlMeta);
                    if (ctrlMeta.isGridControl) {
                        highlightManager.createGridHighlighter(tco, ctrlMeta);
                    }
                    metaDataManager.register(ctrlMeta);
                }
                else {
                    ctrlMeta.isPartialRoot = isPartialRoot;
                    ctrlMeta.controlCollapsed = controlCollapsed;
                    ctrlMeta.domVisibility = bCreatorVisibility;
                }
                metaDataManager.refreshControlMetaData(ctrlMeta);
                // Register selection events
                controlMoveManager.registerControl(ctrlMeta);
                hierarchyManager.registerContainerControl(ctrlMeta);
                controlResizeManager.registerControl(ctrlMeta);
                // Rebuild hierarchial dom structure for designer mode selection and highlight container to achieve proper layer handling
                let ctco = tco;
                while (ctco !== null && ctco !== undefined) {
                    if (ctco.getIsContainerControl() &&
                        !(ctco.getElement()?.[0]?.hasAttribute('data-tchmi-designer-ignore') ?? true)) {
                        let tcoPar = tco.getParent();
                        if (tcoPar && tcoPar.getId() === ctco.getId()) {
                            let ctrlParentMeta = metaDataManager.getControlMetaData(ctco.getId());
                            if (ctrlParentMeta === null) {
                                let controlParentZindex = 0;
                                controlParentZindex = parseInt(ctco.getElement().css('zIndex'), 10);
                                if (isNaN(controlParentZindex)) {
                                    controlParentZindex = 0;
                                }
                                let creatorParentAttr;
                                let bCreatorParentVisibility = true;
                                creatorParentAttr = ctco.getElement()[0].getAttribute('data-tchmi-creator-visibility');
                                if (creatorParentAttr) {
                                    creatorParentAttr = TcHmi.ValueConverter.toType(creatorAttr, 'tchmi:framework#/definitions/Visibility');
                                }
                                if (creatorParentAttr === 'Collapsed') {
                                    bCreatorParentVisibility = false;
                                }
                                let bCreatorParentLocked = false;
                                creatorParentAttr = ctco.getElement()[0].getAttribute('data-tchmi-creator-locked');
                                if (creatorParentAttr) {
                                    bCreatorParentLocked = TcHmi.ValueConverter.toType(creatorAttr, 'tchmi:general#/definitions/Boolean');
                                }
                                let controlParentCollapsed = false;
                                if (ctco.getVisibility() === 'Collapsed') {
                                    controlParentCollapsed = true;
                                }
                                ctrlParentMeta = {
                                    id: ctco.getId(),
                                    parent: null,
                                    jControlPosition: highlightManager.createControlPosition(ctco, 2000 + controlParentZindex),
                                    jHierarchyControlposition: highlightManager.createHierarchyControlPosition(ctco, 2000 + controlParentZindex),
                                    jOriginalPosition: highlightManager.createOriginalPosition(ctco, 1000 + controlParentZindex),
                                    jAnchorContainer: highlightManager.createAnchorContainer(ctco, 3000 + controlParentZindex, bCreatorParentLocked),
                                    jHierarchyAnchorContainer: highlightManager.createHierarchyAnchorContainer(ctco, 3000 + controlParentZindex, bCreatorParentLocked),
                                    isSelected: false,
                                    isSelectedPrev: false,
                                    isPartialRoot: false,
                                    controlCollapsed: controlParentCollapsed,
                                    isContainerControl: ctco.getIsContainerControl() &&
                                        !(ctco.getElement()?.[0]?.hasAttribute('data-tchmi-designer-ignore') ?? true),
                                    isGridControl: TcHmi.System.Services.controlManager
                                        .getDescriptionTypes(ctco.getType())
                                        .includes('TcHmi.Controls.System.TcHmiGrid'),
                                    domVisibility: bCreatorParentVisibility,
                                    locked: bCreatorParentLocked,
                                    controlAttributeDimension: undefined,
                                    controlCssPixelDimension: undefined,
                                    relativeControlRotation: 0,
                                    absoluteParentRotation: 0,
                                };
                                // Native toggle with second parameter usable as we are chrome only
                                ctrlParentMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-locked', bCreatorParentLocked);
                                ctrlParentMeta.jHierarchyAnchorContainer[0].classList.toggle('tchmi-creator-control-locked', bCreatorParentLocked);
                                metaDataManager.refreshControlMetaData(ctrlParentMeta);
                                if (ctrlParentMeta.isGridControl) {
                                    highlightManager.createGridHighlighter(ctco, ctrlParentMeta);
                                }
                                metaDataManager.register(ctrlParentMeta);
                            }
                            // Set hierarchial parent in target meta control object.
                            ctrlMeta.parent = ctrlParentMeta;
                        }
                    }
                    ctco = ctco.getParent();
                }
                let tcoPar = tco.getParent();
                if (ctrlMeta.parent !== null && tcoPar !== null) {
                    // We have a parent, so add the container and hierarchicalStackContainer into the hierarchicalStackContainer of the parent
                    const nextCtrl = tco.getElement().next();
                    let nextCtrlMeta = null;
                    if (nextCtrl.length !== 0) {
                        nextCtrlMeta = metaDataManager.getControlMetaData(nextCtrl[0].id);
                    }
                    if (nextCtrlMeta) {
                        // There is a next sibling, so be lazy and clone the dom order from there
                        nextCtrlMeta.jOriginalPosition.before(ctrlMeta.jOriginalPosition);
                        nextCtrlMeta.jControlPosition.before(ctrlMeta.jControlPosition);
                        nextCtrlMeta.jControlPosition.before(ctrlMeta.jHierarchyControlposition);
                        nextCtrlMeta.jAnchorContainer.before(ctrlMeta.jAnchorContainer);
                        nextCtrlMeta.jAnchorContainer.before(ctrlMeta.jHierarchyAnchorContainer);
                    }
                    else if (!ctrlMeta.parent.isGridControl) {
                        ctrlMeta.parent.jHierarchyControlposition.append(ctrlMeta.jOriginalPosition);
                        ctrlMeta.parent.jHierarchyControlposition.append(ctrlMeta.jControlPosition);
                        ctrlMeta.parent.jHierarchyControlposition.append(ctrlMeta.jHierarchyControlposition);
                        ctrlMeta.parent.jHierarchyAnchorContainer.append(ctrlMeta.jAnchorContainer);
                        ctrlMeta.parent.jHierarchyAnchorContainer.append(ctrlMeta.jHierarchyAnchorContainer);
                    }
                    else {
                        let targetRowIndex = tco.getGridRowIndex();
                        if (!targetRowIndex || targetRowIndex >= tcoPar['__rowOptions'].length) {
                            targetRowIndex = 0;
                        }
                        let targetColumnIndex = tco.getGridColumnIndex();
                        if (!targetColumnIndex ||
                            targetColumnIndex >= tcoPar['__columnOptions'].length) {
                            targetColumnIndex = 0;
                        }
                        const targetCell = ctrlMeta.parent.jHierarchyControlposition.children('[data-tchmi-creator-grid-rowindex=' +
                            targetRowIndex +
                            '][data-tchmi-creator-grid-cellindex=' +
                            targetColumnIndex +
                            ']');
                        if (targetCell.length === 0) {
                            TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Fatal internal error: Could not find target grid cell for ' +
                                tco.getParent().getId() +
                                ' to attach highlight container.');
                        }
                        targetCell.append(ctrlMeta.jOriginalPosition);
                        targetCell.append(ctrlMeta.jControlPosition);
                        targetCell.append(ctrlMeta.jHierarchyControlposition);
                        targetCell.append(ctrlMeta.jAnchorContainer);
                        targetCell.append(ctrlMeta.jHierarchyAnchorContainer);
                    }
                }
                else {
                    // We have no parent, so add the container and hierarchicalStackContainer into the body
                    const HighlightingContainer = rootControlManager.getViewPortHighlightingContainer();
                    HighlightingContainer.append(ctrlMeta.jOriginalPosition[0], ctrlMeta.jControlPosition[0], ctrlMeta.jHierarchyControlposition[0], ctrlMeta.jAnchorContainer[0], ctrlMeta.jHierarchyAnchorContainer[0]);
                    const backgroundTarget = rootControlManager.getBackgroundTarget();
                    document.body.append(backgroundTarget, HighlightingContainer);
                }
                let ctrlAsyncData = highlightManager.requestAsyncHighlighterUpdateForControl(tco);
                ctrlAsyncData.moved = true;
                ctrlAsyncData.resized = true;
                if (ctrlMeta.isPartialRoot) {
                    rootControlManager.setRootControl(tco, ctrlMeta);
                }
            }
        }
        __onThemeDataChanged(_event) {
            metaDataManager.refreshControlMetaData();
        }
        /**
         * Synchronizes the list of selected controls with the creator.
         */
        resyncSelectedControls() {
            if (metaDataManager.getSelectedControlsMetaDataHasChanged()) {
                let metaData = metaDataManager.getSelectedControlsMetaData();
                const cmd = {
                    name: 'SelectedControls',
                    targetPartial: TCHMI_TARGET_PARTIAL,
                    controls: Object.keys(metaData),
                    replyTo: null,
                };
                if (!SyncCmdToCreatorSelectedControls) {
                    TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToCreatorSelectedControls not loaded');
                    return;
                }
                new SyncCmdToCreatorSelectedControls(cmd).send();
                metaDataManager.resetSelectedControlsMetaDataHasChanged();
            }
        }
        /**
         * Synchronizes the attributes of changed controls with the creator.
         */
        resyncControls() {
            if (metaDataManager.getChangedControlsMetaDataHasChanged()) {
                let metaData = metaDataManager.getChangedControlsMetaData();
                // Attention: Creator (as of 2024-10) only supports changes of unescaped html attributes (ref #211195).
                // So changing data-tchmi-top="30" or data-tchmi-top-unit="%" is not a problem
                // but not a change from
                // data-tchmi-text="Sag: &quot;Hallo Welt&quot;"
                // to
                // data-tchmi-text="Say: &quot;Hello World&quot;"
                // If such thing is useful, creator support will be needed.
                const cmd = {
                    name: 'SyncControls',
                    frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
                    targetPartial: TCHMI_TARGET_PARTIAL,
                    controls: [],
                    replyTo: null,
                };
                for (const id of Object.keys(metaData)) {
                    const tco = TcHmi.Controls.get(id);
                    if (!tco) {
                        continue;
                    }
                    let markup = tco.getPcElement()[0].outerHTML;
                    cmd.controls.push({
                        targetControl: id,
                        descriptionPath: TcHmi.System.Services.controlManager.getDescriptionPath(tco.getType()),
                        controlHtml: markup,
                    });
                }
                if (!SyncCmdToCreatorSyncControls) {
                    TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Internal error: SyncCmdToCreatorSyncControls not loaded');
                    return;
                }
                new SyncCmdToCreatorSyncControls(cmd).send();
                metaDataManager.resetChangedControlsMetaData();
            }
        }
        /**
         * Processes changes of one control inside the Framework
         * @returns true if changes have been processed and false if not!
         */
        syncControl(targetPartial, targetControl, controlHtml) {
            if (!targetControl) {
                TcHmi.Log.debug('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. Invalid target control.');
                return false; // Ignore sync with invalid targetControl. Mostly this is based on greedy creator behavior.
            }
            if (!controlHtml) {
                TcHmi.Log.debug('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. Invalid or missing html.');
                return false; // Ignore sync with invalid controlHtml. Mostly this is based on greedy creator behavior.
            }
            if (!controlHtml.endsWith('</div>')) {
                TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. Incomplete html.');
                return false; // Ignore sync with invalid controlHtml.
            }
            const tco = TcHmi.Controls.get(targetControl);
            if (!tco) {
                TcHmi.Log.debug('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. Control=' +
                    targetControl +
                    ' not found in control cache.');
                return false;
            }
            // Use fast html5 parser
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = controlHtml;
            /** jquery object based on new html */
            let jControlHtmlNew = $(tempDiv.firstElementChild);
            if (jControlHtmlNew.length === 0) {
                return false;
            }
            if (jControlHtmlNew.length !== 1) {
                // Could be comment or text nodes. Only use the first hmi control
                jControlHtmlNew = jControlHtmlNew.filter('div[data-tchmi-type]');
                if (jControlHtmlNew.length !== 1) {
                    TcHmi.Log.debug('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. Only one control is allowed but got ' +
                        jControlHtmlNew.length);
                    return false;
                }
            }
            const controlType = jControlHtmlNew[0].getAttribute('data-tchmi-type');
            if (!controlType) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed for control=' +
                    targetControl +
                    '. Missing attribute=data-tchmi-type.');
                return false;
            }
            const controlId = jControlHtmlNew[0].id;
            if (!controlId) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed for control=' +
                    targetControl +
                    '. Missing attribute=id.');
                return false;
            }
            /** jQuery object based clone on current html */
            let jControlHtmlCurrent = tco.getPcElement().clone();
            if (jControlHtmlCurrent.length === 0) {
                return false;
            }
            if (controlType !== tco.getType()) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed for incompatible control=' +
                    targetControl +
                    '. Incoming change is for control type=' +
                    controlType +
                    ' but local control has type=' +
                    tco.getType());
                return false;
            }
            // Changes?
            if (jControlHtmlNew[0].outerHTML === jControlHtmlCurrent[0].outerHTML) {
                return false; // HTML has not changed... No need to do anything
            }
            /** Existing html attributes meta data. */
            let attrsCurrent = tco.getAttrs();
            /** New html attributes meta data. */
            let attrsNewRes = TcHmi.System.resolveAttributesFromControlElement(jControlHtmlNew[0]);
            if (TCHMI_DESIGNER) {
                if (!attrsNewRes.error) {
                    TcHmi.Engineering.ErrorPane.remove(`${controlId}.attributeResolveError`);
                }
                else {
                    // Todo
                    // Find a nicer way to display this error.
                    // This error needs to be updated quick while editing HTML which seems not always the case with JSON.
                    //TcHmi.Engineering.ErrorPane.add(
                    //    `${controlId}.attributeResolveError`,
                    //    `Error parsing attributes from control id=${controlId} type=${controlType}. Got Error: ` +
                    //        TcHmi.Log.buildMessage(attrsNewRes.details),
                    //    TcHmi.Engineering.ErrorPane.MessageType.Error,
                    //);
                }
            }
            /** Control meta */
            const ctrlMeta = metaDataManager.getControlMetaData(targetControl);
            // Special Case -> Rename, Id has changed...
            let attrIdNew = attrsNewRes.value['id'];
            let newId = attrIdNew.value;
            let tcoPar = tco.getParent();
            if (targetControl !== newId && tcoPar) {
                // Clone pcElement of control.
                let jParentPcElementClone = tcoPar.getPcElement().clone();
                // Rename control in pcElement html of parent control.
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = controlHtml;
                jParentPcElementClone
                    .find('#' + tchmi_css_escape_selector(targetControl))
                    .replaceWith($(tempDiv.firstElementChild));
                // Sync parent control to destroy control with old id and create control with new id.
                this.syncControl(targetPartial, jParentPcElementClone[0].id, jParentPcElementClone[0].outerHTML);
                // Reselect control after rename to refresh selection.
                if (ctrlMeta && ctrlMeta.isSelected) {
                    TcHmi.EventProvider.register(newId + '.onAttached', (event, _data) => {
                        this.select(newId, true);
                        event.destroy();
                    });
                }
                return true;
            }
            // cleanup old messages
            TcHmi.Engineering.ErrorPane.remove(tco.getId() + 'requiredAttributeTouched');
            /** Dictionary of controls which must not be synchronized. */
            const creatorAttributesNotSynced = {
                'data-tchmi-creator-visibility': true,
                'data-tchmi-creator-locked': true,
                'data-tchmi-creator-viewport-width': true,
                'data-tchmi-creator-viewport-height': true,
                'data-tchmi-zindex': true,
            };
            /** list of attributes based on the new attribute values */
            let attrsToProcess = [];
            /** list of attributes which have been removed */
            let attrsToRemove = [];
            for (let keyNew in attrsNewRes.value) {
                const attrNew = attrsNewRes.value[keyNew];
                const attrCurrent = attrsCurrent[keyNew];
                if (attrCurrent === undefined || !tchmi_equal(attrNew.value, attrCurrent.value)) {
                    if (attrNew.descr && attrNew.descr.requiredOnCompile === true) {
                        TcHmi.Engineering.ErrorPane.add(tco.getId() + 'requiredAttributeTouched', 'Synchronization problem while changing attribute ' +
                            attrNew.descr.name +
                            ' of control=' +
                            tco.getId() +
                            '.' +
                            ' It is not possible to change this attribute in runtime. Please save and reload this window.', TcHmi.Engineering.ErrorPane.MessageType.Error);
                        continue;
                    }
                    attrsToProcess.push(attrNew);
                }
                if (creatorAttributesNotSynced[attrNew.name]) {
                    delete creatorAttributesNotSynced[attrNew.name];
                }
            }
            for (let keyCurrent in attrsCurrent) {
                let attrCurrent = attrsCurrent[keyCurrent];
                if (attrsNewRes.value[attrCurrent.name] === undefined) {
                    if (attrCurrent.descr && attrCurrent.descr.requiredOnCompile === true) {
                        TcHmi.Engineering.ErrorPane.add(tco.getId() + 'requiredAttributeTouched', 'Synchronization problem while removing attribute ' +
                            attrCurrent.descr.name +
                            ' of control=' +
                            tco.getId() +
                            '.' +
                            ' This attribute is not allowed to be deleted.', TcHmi.Engineering.ErrorPane.MessageType.Error);
                        continue;
                    }
                    attrsToRemove.push(attrCurrent);
                }
            }
            for (let missingCreatorAttribute in creatorAttributesNotSynced) {
                // Set missing attributes to default state
                switch (missingCreatorAttribute) {
                    case 'data-tchmi-creator-visibility':
                        if (ctrlMeta !== null) {
                            ctrlMeta.domVisibility = true;
                        }
                        break;
                    case 'data-tchmi-creator-locked':
                        if (ctrlMeta !== null) {
                            ctrlMeta.locked = false;
                        }
                        break;
                    case 'data-tchmi-zindex':
                        if (ctrlMeta !== null) {
                            const controlzindex = 0;
                            ctrlMeta.jOriginalPosition.css('z-index', 1000 + controlzindex);
                            ctrlMeta.jControlPosition.css('z-index', 2000 + controlzindex);
                            ctrlMeta.jHierarchyControlposition.css('z-index', 2000 + controlzindex);
                            ctrlMeta.jAnchorContainer.css('z-index', 3000 + controlzindex);
                            ctrlMeta.jHierarchyAnchorContainer.css('z-index', 3000 + controlzindex);
                        }
                        break;
                }
                tco.getElement()[0].removeAttribute(missingCreatorAttribute);
                tco.getPcElement()[0].removeAttribute(missingCreatorAttribute);
                delete tco.getAttrs()[missingCreatorAttribute];
            }
            // Handle special attributes
            if (attrsToProcess !== undefined && attrsToProcess !== null) {
                for (let i = 0, ii = attrsToProcess.length; i < ii; i++) {
                    const attr = attrsToProcess[i];
                    switch (attr.name.toLowerCase()) {
                        case 'data-tchmi-creator-visibility': // DomVisibility
                            if (TCHMI_DESIGNER) {
                                if (ctrlMeta !== null) {
                                    switch (TcHmi.ValueConverter.toType(attr.value, 'tchmi:framework#/definitions/Visibility')) {
                                        case 'Collapsed':
                                            ctrlMeta.domVisibility = false;
                                            break;
                                        default:
                                            ctrlMeta.domVisibility = true;
                                            break;
                                    }
                                }
                            }
                            tco.getElement()[0].setAttribute(attr.name, attr.value); // DOM LEVEL UPDATE
                            tco.getAttrs()[attr.name] = attr; // CONTROL OBJECT LEVEL UPDATE
                            break;
                        case 'data-tchmi-creator-locked':
                            if (TCHMI_DESIGNER) {
                                if (ctrlMeta !== null) {
                                    ctrlMeta.locked = TcHmi.ValueConverter.toType(attr.value, 'tchmi:general#/definitions/Boolean');
                                }
                            }
                            tco.getElement()[0].setAttribute(attr.name, attr.value); // DOM LEVEL UPDATE
                            tco.getAttrs()[attr.name] = attr; // CONTROL OBJECT LEVEL UPDATE
                            break;
                        case 'data-tchmi-creator-viewport-width':
                        case 'data-tchmi-creator-viewport-height':
                            tco.getElement()[0].setAttribute(attr.name, attr.value); // DOM LEVEL UPDATE
                            tco.getAttrs()[attr.name] = attr; // CONTROL OBJECT LEVEL UPDATE
                            break;
                        case 'data-tchmi-zindex': // Update zindex of related designer mode container objects
                            if (TCHMI_DESIGNER) {
                                if (ctrlMeta !== null) {
                                    let controlzindex = parseInt(attr.value, 10);
                                    if (isNaN(controlzindex)) {
                                        controlzindex = 0;
                                    }
                                    if (controlzindex >= 0) {
                                        ctrlMeta.jOriginalPosition.css('z-index', 1000 + controlzindex);
                                        ctrlMeta.jControlPosition.css('z-index', 2000 + controlzindex);
                                        ctrlMeta.jHierarchyControlposition.css('z-index', 2000 + controlzindex);
                                        ctrlMeta.jAnchorContainer.css('z-index', 3000 + controlzindex);
                                        ctrlMeta.jHierarchyAnchorContainer.css('z-index', 3000 + controlzindex);
                                    }
                                }
                            }
                            // tco.getElement() will be updated in normal attribute handling
                            break;
                        default:
                            break;
                    }
                }
            }
            // Update contentNew of TcHmi_Controls_System_TcHmiHtmlHost
            if (tco.getType() === 'TcHmi.Controls.System.TcHmiHtmlHost' &&
                'setContent' in tco &&
                typeof tco.setContent === 'function') {
                let contentNew = jControlHtmlNew[0].innerHTML;
                if (contentNew) {
                    // Setter not known in base control
                    tco['setContent'](contentNew);
                }
                contentNew = '';
            }
            // Check if the target control is part of a UserControl Designer instance
            let isTargetPartialUcRelated = false;
            if (TCHMI_DESIGNER) {
                let uc = null;
                let temp = tco;
                while (temp) {
                    if (temp.getType() === 'TcHmi.Controls.System.TcHmiUserControl') {
                        uc = temp;
                        break;
                    }
                    temp = temp.getParent();
                }
                if (uc) {
                    let purl = tchmi_path(uc.getElement()[0].getAttribute('data-tchmi-partial-url'));
                    if (purl && purl === tchmi_path(TCHMI_TARGET_PARTIAL)) {
                        isTargetPartialUcRelated = true;
                    }
                }
            }
            // Remove attributes.
            for (let i = 0, ii = attrsToRemove.length; i < ii; i++) {
                let attr = attrsToRemove[i];
                if (attr.descr === undefined || attr.descr === null) {
                    continue; // Unknown attribute ! Skip it...
                }
                if (attr.valueType === TcHmi.System.ControlAttributeValueType.Simple) {
                    tco.getElement()[0].removeAttribute(attr.name); // DOM OBJECT LEVEL REMOVE
                }
                delete tco.getAttrs()[attr.name]; // CONTROL OBJECT LEVEL REMOVE
                if (attr.descr.readOnly) {
                    continue;
                }
                let isSymbolExpression = TcHmi.Symbol.isSymbolExpression(attr.value);
                let isSymbolExpressionEscaped = TcHmi.Symbol.isSymbolExpressionEscaped(attr.value);
                if (isSymbolExpression && !isSymbolExpressionEscaped) {
                    try {
                        TcHmi.System.Services.bindingManager.removeBinding(attr.descr.propertyName, tco, true);
                    }
                    catch (e) {
                        TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. An uncaught exception occurred while removing binding for attribute=' +
                            attr.descr.propertyName +
                            ' of control=' +
                            tco.getId() +
                            ':\n', e);
                    }
                }
                else {
                    // Set null or default value
                    let error = TcHmi.System.Services.controlManager.setControlPropertyByAttribute(tco, attr.descr, null);
                    if (error && error.code !== TcHmi.Errors.NONE) {
                        TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] ' +
                            TcHmi.Log.buildMessage(error));
                    }
                }
            }
            // Create and process attributes.
            for (let i = 0, ii = attrsToProcess.length; i < ii; i++) {
                let attr = attrsToProcess[i];
                if (attr.descr === undefined || attr.descr === null) {
                    continue; // Unknown attribute ! Skip it...
                }
                // Update attribute
                if (attr.valueType === TcHmi.System.ControlAttributeValueType.Simple) {
                    tco.getElement()[0].setAttribute(attr.name, attr.value); // DOM OBJECT LEVEL UPDATE
                }
                tco.getAttrs()[attr.name] = attr; // CONTROL OBJECT LEVEL UPDATE
                if (attr.descr.readOnly) {
                    continue;
                }
                let isSymbolExpression = TcHmi.Symbol.isSymbolExpression(attr.value);
                let isSymbolExpressionEscaped = TcHmi.Symbol.isSymbolExpressionEscaped(attr.value);
                if (isSymbolExpression && !isSymbolExpressionEscaped) {
                    // If attr.value represents a partial parameter we have to prepare it for designer simulation and use the expression with the TCHMI_TARGET_DESIGNER_PARTIALPARAM prefix instead.
                    let designerPartialParamExpression = null;
                    if (isTargetPartialUcRelated) {
                        let expression = attr.value;
                        let expressionPrepared = expression.replace(/%pp%/g, '%pp%TCHMI_TARGET_DESIGNER_PARTIALPARAM::');
                        designerPartialParamExpression = new TcHmi.SymbolExpression(expressionPrepared);
                    }
                    let bResetBinding = true;
                    let existingBinding = TcHmi.System.Services.bindingManager.getBinding(attr.descr.propertyName, tco);
                    if (existingBinding !== undefined && existingBinding !== null) {
                        let existingBindingSymbol = existingBinding.getSymbol();
                        if (existingBindingSymbol !== undefined && existingBindingSymbol !== null) {
                            let existingBindingSymbolExpression = existingBindingSymbol.getExpression();
                            if (existingBindingSymbolExpression !== undefined && existingBindingSymbolExpression !== null) {
                                if (!designerPartialParamExpression) {
                                    if (attr.value === existingBindingSymbolExpression.toString()) {
                                        bResetBinding = false;
                                        break;
                                    }
                                }
                                else {
                                    if (designerPartialParamExpression.toString() ===
                                        existingBindingSymbolExpression.toString()) {
                                        bResetBinding = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (bResetBinding) {
                        try {
                            TcHmi.System.Services.bindingManager.removeBinding(attr.descr.propertyName, tco, false);
                            if (!designerPartialParamExpression) {
                                TcHmi.System.Services.bindingManager.createBinding(attr.value, attr.descr.propertyName, tco);
                            }
                            else {
                                const dPPExpression = designerPartialParamExpression.toString();
                                if (dPPExpression) {
                                    TcHmi.System.Services.bindingManager.createBinding(dPPExpression, attr.descr.propertyName, tco);
                                }
                                else {
                                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. designer partial param expression invalid while creating binding for attribute=' +
                                        attr.descr.propertyName +
                                        ' of control=' +
                                        tco.getId() +
                                        '.');
                                }
                            }
                        }
                        catch (e) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. An uncaught exception occurred while creating binding for attribute=' +
                                attr.descr.propertyName +
                                ' of control=' +
                                tco.getId() +
                                ':\n', e);
                        }
                    }
                }
                else {
                    let prepValue = attr.value;
                    if (isSymbolExpressionEscaped) {
                        prepValue = TcHmi.Symbol.escapeSymbolExpression(prepValue);
                    }
                    try {
                        TcHmi.System.Services.bindingManager.removeBinding(attr.descr.propertyName, tco, false);
                    }
                    catch (e) {
                        TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. An uncaught exception occurred while removing binding from attribute=' +
                            attr.descr.propertyName +
                            ' of control=' +
                            tco.getId() +
                            ':\n', e);
                    }
                    let error = TcHmi.System.Services.controlManager.setControlPropertyByAttribute(tco, attr.descr, prepValue);
                    if (error && error.code !== TcHmi.Errors.NONE) {
                        if (error.exception) {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] ' +
                                TcHmi.Log.buildMessage(error), '\nException:', error.exception);
                        }
                        else {
                            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] ' +
                                TcHmi.Log.buildMessage(error));
                        }
                    }
                }
            }
            // Handle children based on html.
            if (tco.getIsContainerControl() &&
                !(tco.getElement()?.[0]?.hasAttribute('data-tchmi-designer-ignore') ?? true)) {
                /** jQuery object of all childrens (including complex attributes) */
                let jContentChildren = jControlHtmlNew.children();
                /** jQuery object of all childrens (without complex attributes) */
                let jCurrentChildren = jControlHtmlCurrent.children('div[data-tchmi-type]');
                // Remove no longer existing children
                let removed = [];
                for (let i = 0, ii = jCurrentChildren.length; i < ii; i++) {
                    let jCurrentChild = jCurrentChildren.eq(i);
                    let bDelete = true;
                    for (let j = 0, jj = jContentChildren.length; j < jj; j++) {
                        if (jContentChildren[j].nodeName !== 'DIV' ||
                            !jContentChildren[j].hasAttribute('data-tchmi-type')) {
                            // probably complex attribute
                            continue;
                        }
                        if (jCurrentChild[0].id === jContentChildren[j].id) {
                            bDelete = false;
                            break;
                        }
                    }
                    if (bDelete) {
                        removed.push(jCurrentChild[0].id);
                        let removedControl = TcHmi.Controls.get(jCurrentChild[0].id);
                        if (removedControl) {
                            // Force __keepAlive to false to allow creator related control destruction
                            let keepAlive = removedControl.__getKeepAlive();
                            if (keepAlive) {
                                removedControl.__setKeepAlive(false);
                            }
                            removedControl.destroy();
                        }
                    }
                }
                let replaced = [];
                // Update existing children
                for (let i = 0, ii = jContentChildren.length; i < ii; i++) {
                    if (jContentChildren[i].nodeName !== 'DIV' || !jContentChildren[i].hasAttribute('data-tchmi-type')) {
                        // probably complex attribute
                        continue;
                    }
                    if (removed.includes(jContentChildren[i].id)) {
                        continue; // Ignore no longer existing controls!
                    }
                    const existingControl = TcHmi.Controls.get(jContentChildren[i].id);
                    if (existingControl &&
                        jContentChildren[i].getAttribute('data-tchmi-type') !== existingControl.getType()) {
                        replaced.push(jContentChildren[i].id);
                        // changed type. delete instance. Will be added later.
                        existingControl.__setKeepAlive(false);
                        existingControl.destroy();
                        continue;
                    }
                    try {
                        this.syncControl(targetPartial, jContentChildren[i].id, jContentChildren[i].outerHTML);
                    }
                    catch (e) {
                        TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. An uncaught exception occurred while syncing control=' +
                            jContentChildren[i].id +
                            ':\n', e);
                    }
                }
                // Create new children
                const ctrlMap = TcHmi.Controls.getMap();
                let controlIndex = -1;
                for (let i = 0, ii = jContentChildren.length; i < ii; i++) {
                    if (jContentChildren[i].nodeName !== 'DIV' || !jContentChildren[i].hasAttribute('data-tchmi-type')) {
                        // probably complex attribute
                        continue;
                    }
                    controlIndex++;
                    if (Array.from(jCurrentChildren).some(
                    // Skip creation when...
                    (currentElem) => 
                    // not just being replaced...
                    !replaced.includes(currentElem.id) &&
                        // exists in HTML...
                        currentElem.id === jContentChildren[i].id &&
                        // and is a existing control (to filter in the past failed controls)
                        ctrlMap.has(currentElem.id))) {
                        continue;
                    }
                    try {
                        const compileResult = this.createControl(targetControl, controlIndex, jContentChildren[i].outerHTML, null);
                        if (compileResult.error) {
                            TcHmi.Log.errorEx(`[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. Compile of ${jContentChildren[i].id} has failed:`, TcHmi.Log.buildMessage(compileResult.details));
                        }
                    }
                    catch (e) {
                        TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Synchronization failed. Unexpected An uncaught exception occurred while creating control=' +
                            jContentChildren[i].id +
                            ':\n', e);
                    }
                }
            }
            // Update control precompile element and all occurrences of it in its parent control objects ).
            const pcElementOld = tco.getPcElement();
            tco.__setPcElement(jControlHtmlNew.clone());
            if (tco.getParent() !== undefined && tco.getParent() !== null) {
                let temp = tco.getParent();
                while (temp !== null) {
                    temp.getPcElement()
                        .find('#' + tchmi_css_escape_selector(pcElementOld[0].id))
                        .replaceWith(tco.getPcElement().clone());
                    temp = temp.getParent();
                }
            }
            if (TCHMI_DESIGNER &&
                hierarchyManager &&
                hierarchyManager.isDesignerModeControl(targetControl) &&
                rootControlManager &&
                highlightManager) {
                // Refresh Meta Data
                const tCtrlMeta = metaDataManager.refreshControlMetaData(targetControl);
                if (tCtrlMeta !== undefined && tCtrlMeta !== null) {
                    // meta maybe null because control was created during sync and/or is just a sub control (button in recipebrowser, partial in region etc.) without designer meta logic
                    // Rebuild highlighter
                    let ctrlAsyncData = highlightManager.requestAsyncHighlighterUpdateForControl(tco);
                    ctrlAsyncData.moved = true;
                    ctrlAsyncData.resized = true;
                    if (tCtrlMeta.isPartialRoot) {
                        // Will be called in requestAsyncHighlighterUpdateForControl
                        // rootControlManager.setCreatorViewPortPosition(tco);
                    }
                    else if (tco.getParent()) {
                        let recursiveControl = tco.getParent();
                        do {
                            if (recursiveControl &&
                                (recursiveControl.getHeightMode() === 'Content' ||
                                    recursiveControl.getWidthMode() === 'Content')) {
                                const parentCtrlMeta = metaDataManager.getControlMetaData(recursiveControl.getId());
                                if (!parentCtrlMeta) {
                                    // Abort
                                    recursiveControl = null;
                                    break;
                                }
                                else if (parentCtrlMeta.isPartialRoot) {
                                    rootControlManager.setCreatorViewPortPosition(recursiveControl);
                                    break;
                                }
                                recursiveControl = recursiveControl.getParent();
                            }
                            else {
                                // Abort
                                recursiveControl = null;
                            }
                        } while (recursiveControl !== null);
                    }
                }
            }
            if (ctrlMeta !== null) {
                // Update lock state
                // Native toggle with second parameter usable as we are chrome only
                ctrlMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-locked', ctrlMeta.locked);
                ctrlMeta.jHierarchyAnchorContainer[0].classList.toggle('tchmi-creator-control-locked', ctrlMeta.locked);
                ctrlMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-height-inactive', tco.getHeightMode() === 'Content');
                ctrlMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-width-inactive', tco.getWidthMode() === 'Content');
            }
            return true;
        }
        /**
         * Creates new Control in Designer and attach it asynchronous
         * @param targetParentControl Id of the Parent
         * @param domPos
         * @param controlHtml HTML Code of the new control
         * @param callback
         */
        createControl(targetParentControl, domPos, controlHtml, callback = null) {
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = controlHtml;
            let jControlHTML = $(tempDiv.firstElementChild);
            if (jControlHTML.length === 0) {
                return {
                    error: TcHmi.Errors.E_PARAMETER_INVALID,
                    details: {
                        code: TcHmi.Errors.E_PARAMETER_INVALID,
                        message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                        domain: 'TcHmi.System.Engineering.DesignerModeManager',
                        reason: 'Invalid control html.',
                    },
                    control: undefined,
                };
            }
            // Drop tempDiv for GC
            jControlHTML[0].remove();
            let controlType = jControlHTML[0].getAttribute('data-tchmi-type');
            if (!controlType) {
                return {
                    error: TcHmi.Errors.E_PARAMETER_INVALID,
                    details: {
                        code: TcHmi.Errors.E_PARAMETER_INVALID,
                        message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                        domain: 'TcHmi.System.Engineering.DesignerModeManager',
                        reason: 'Invalid control html. Missing attribute=data-tchmi-type',
                    },
                    control: undefined,
                };
            }
            let controlId = jControlHTML[0].id;
            if (!controlId) {
                return {
                    error: TcHmi.Errors.E_PARAMETER_INVALID,
                    details: {
                        code: TcHmi.Errors.E_PARAMETER_INVALID,
                        message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                        domain: 'TcHmi.System.Engineering.DesignerModeManager',
                        reason: 'Invalid control html. Missing attribute=id',
                    },
                    control: undefined,
                };
            }
            if (TcHmi.Controls.get(controlId)) {
                return {
                    error: TcHmi.Errors.E_PARAMETER_INVALID,
                    details: {
                        code: TcHmi.Errors.E_PARAMETER_INVALID,
                        message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                        domain: 'TcHmi.System.Engineering.DesignerModeManager',
                        reason: 'Id "' + controlId + '" does already exist.',
                    },
                    control: undefined,
                };
            }
            // Fetch parent control object if target control has a parent control otherwise the target control is the root partial of the current designer instance
            let tpco = null;
            if (targetParentControl) {
                tpco = TcHmi.Controls.get(targetParentControl);
                if (!tpco) {
                    TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Failed to create control. Target parent control=' +
                        targetParentControl +
                        ' not found in control cache.');
                    return {
                        error: TcHmi.Errors.E_PARAMETER_INVALID,
                        details: {
                            code: TcHmi.Errors.E_PARAMETER_INVALID,
                            message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                            domain: 'TcHmi.System.Engineering.DesignerModeManager',
                            reason: 'Target parent control=' + targetParentControl + ' not found in control cache.',
                        },
                        control: undefined,
                    };
                }
            }
            else {
                // No parent control... It must be the root partial...
                if (controlType === 'TcHmi.Controls.System.TcHmiView' ||
                    controlType === 'TcHmi.Controls.System.TcHmiContent' ||
                    controlType === 'TcHmi.Controls.System.TcHmiUserControl') {
                    jControlHTML
                        .attr('data-tchmi-partial-url', tchmi_path(TCHMI_TARGET_PARTIAL))
                        .attr('data-tchmi-creator-partial-key', TCHMI_TARGET_PARTIAL);
                }
                else {
                    return {
                        error: TcHmi.Errors.E_PARAMETER_INVALID,
                        details: {
                            code: TcHmi.Errors.E_PARAMETER_INVALID,
                            message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                            domain: 'TcHmi.System.Engineering.DesignerModeManager',
                            reason: 'Only controls of type "TcHmi.Controls.System.TcHmiView", "TcHmi.Controls.System.TcHmiContent" or "TcHmi.Controls.System.TcHmiUserControl" are valid as a root element.',
                        },
                        control: undefined,
                    };
                }
            }
            // Add Control
            const compileResult = TcHmi.System.Services.controlManager.compile(jControlHTML[0], tpco, { pos: domPos });
            if (compileResult.error !== TcHmi.Errors.NONE || !compileResult.control) {
                return compileResult;
            }
            const tco = compileResult.control;
            if (tpco) {
                if (tpco.getIsContainerControl() &&
                    !(tco.getElement()?.[0]?.hasAttribute('data-tchmi-designer-ignore') ?? true) &&
                    typeof tpco['addChild'] === 'function') {
                    const updateParents = (ctrl) => {
                        const parentCtrl = ctrl.getParent();
                        if (!parentCtrl) {
                            return;
                        }
                        const controlId = ctrl.getId();
                        const pcElem = ctrl.getPcElement();
                        const parentPcElem = parentCtrl.getPcElement();
                        for (const childElem of parentPcElem[0].children) {
                            if (childElem.id === controlId) {
                                childElem.replaceWith(pcElem.clone()[0]);
                                break;
                            }
                        }
                        updateParents(parentCtrl);
                    };
                    // Adjust pcElement of parent for later sync consistency
                    if (domPos === 0) {
                        // Update parent manually for correct placement
                        tpco.getPcElement().prepend(tco.getPcElement().clone());
                    }
                    else {
                        const jContentChildren = tpco.getPcElement().children();
                        let intDomPos = -1;
                        for (let controlCounter = 0, i = 0, ii = jContentChildren.length; i < ii; i++) {
                            if (jContentChildren[i].nodeName !== 'DIV' ||
                                !jContentChildren[i].hasAttribute('data-tchmi-type')) {
                                // probably complex attribute
                                continue;
                            }
                            controlCounter++;
                            if (domPos === controlCounter) {
                                intDomPos = i;
                                break;
                            }
                            else if (domPos < controlCounter) {
                                // We are already
                                break;
                            }
                        }
                        // Update parent manually for correct placement
                        if (intDomPos === -1) {
                            // Calculation wrong?
                            tpco.getPcElement().append(tco.getPcElement().clone());
                        }
                        else {
                            jContentChildren.eq(intDomPos).after(tco.getPcElement().clone());
                        }
                    }
                    // Update grandparents, too.
                    updateParents(tpco);
                }
                else {
                    return {
                        error: TcHmi.Errors.E_PARAMETER_INVALID,
                        details: {
                            code: TcHmi.Errors.E_PARAMETER_INVALID,
                            message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                            domain: 'TcHmi.System.Engineering.DesignerModeManager',
                            reason: 'Can not add child to a not "TcHmiContainerControl" based control! Requested parent target control=' +
                                tpco.getId() +
                                ' has type=' +
                                tpco.getType(),
                        },
                        control: undefined,
                    };
                }
            }
            else {
                // No parent control exists.... Target control must be the root partial!
                const tcoType = tco.getType();
                if (tcoType === 'TcHmi.Controls.System.TcHmiView' ||
                    tcoType === 'TcHmi.Controls.System.TcHmiUserControl' ||
                    tcoType === 'TcHmi.Controls.System.TcHmiContent') {
                    TcHmi.System.Services.viewManager.loadViewObject(tco);
                }
                else {
                    return {
                        error: TcHmi.Errors.E_PARAMETER_INVALID,
                        details: {
                            code: TcHmi.Errors.E_PARAMETER_INVALID,
                            message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                            domain: 'TcHmi.System.Engineering.DesignerModeManager',
                            reason: 'Can not load root element because it is of type=' +
                                tcoType +
                                ' but only controls of type TcHmi.Controls.System.TcHmiView, TcHmi.Controls.System.TcHmiContent and TcHmi.Controls.System.TcHmiUserControl are allowed as root element.',
                        },
                        control: undefined,
                    };
                }
            }
            let tcoId = tco.getId();
            // cleanup old messages
            TcHmi.Engineering.ErrorPane.remove(tcoId + 'requiredAttributeTouched');
            TcHmi.EventProvider.register(tcoId + '.onAttached', (event, _data) => {
                event.destroy();
                if (typeof callback === 'function') {
                    callback.call(this, { error: TcHmi.Errors.NONE });
                }
            });
            return {
                error: TcHmi.Errors.NONE,
                control: tco,
            };
        }
        /**
         * Marks a control as selected and enable its highlighting
         * @param controlId The name of the control to select.
         * @param bIgnoreSync If this is true it will not sync to Visual Studio
         */
        select(controlId, bIgnoreSync = false) {
            if (!TCHMI_DESIGNER) {
                return;
            }
            const ctrlMeta = metaDataManager.getControlMetaData(controlId);
            if (ctrlMeta === null) {
                TcHmi.Log.debug('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeManager] Failed to select control: ' +
                    controlId);
                return;
            }
            let tco = TcHmi.Controls.get(ctrlMeta.id);
            if (!tco) {
                return;
            }
            ctrlMeta.isSelectedPrev = ctrlMeta.isSelected;
            ctrlMeta.isSelected = true;
            metaDataManager.selectControl(ctrlMeta);
            highlightManager?.processHighlightType(ctrlMeta);
            if (!bIgnoreSync) {
                this.resyncSelectedControls();
            }
        }
        /**
         * Marks a control as not selected and disable its highlighting
         * @param controlId The name of the control to unselect.
         * @param bIgnoreSync If this is true it will not sync to Visual Studio
         */
        unselect(controlId, bIgnoreSync = false) {
            if (!TCHMI_DESIGNER) {
                return;
            }
            const ctrlMeta = metaDataManager.getControlMetaData(controlId);
            if (ctrlMeta === null) {
                return;
            }
            let tco = TcHmi.Controls.get(ctrlMeta.id);
            if (!tco) {
                return;
            }
            ctrlMeta.isSelected = false;
            metaDataManager.unselectControl(ctrlMeta);
            ctrlMeta.isSelectedPrev = false;
            highlightManager?.processHighlightType(ctrlMeta);
            let tcoPar = tco.getParent();
            if (tcoPar && ctrlMeta.parent) {
                let childSelected = false;
                for (let childCtrl of tcoPar.getChildren()) {
                    const ctrlChildMeta = metaDataManager.getControlMetaData(childCtrl.getId());
                    if (!ctrlChildMeta) {
                        continue;
                    }
                    if (ctrlChildMeta.isSelected) {
                        childSelected = true;
                        break;
                    }
                }
                // Native toggle with second parameter usable as we are chrome only
                ctrlMeta.parent.jControlPosition[0].classList.toggle('tchmi-creator-childcontrol-selected', childSelected);
            }
            if (!bIgnoreSync) {
                this.resyncSelectedControls();
            }
        }
        selectEach(bIgnoreSync) {
            let selectionHasChanged = this.unselectEach(true);
            const controlsMetaData = metaDataManager.getControlMetaData();
            for (const [id, ctrlMeta] of Object.entries(controlsMetaData)) {
                if (!ctrlMeta.isPartialRoot) {
                    this.select(id, true);
                    selectionHasChanged = true;
                }
            }
            if (!bIgnoreSync && selectionHasChanged) {
                this.resyncSelectedControls();
            }
            return selectionHasChanged;
        }
        unselectEach(bIgnoreSync) {
            let selectionHasChanged = false;
            const controlsMetaData = metaDataManager.getControlMetaData();
            for (const [id, ctrlMeta] of Object.entries(controlsMetaData)) {
                if (ctrlMeta.isSelected) {
                    this.unselect(id, true);
                    selectionHasChanged = true;
                }
            }
            if (!bIgnoreSync && selectionHasChanged) {
                this.resyncSelectedControls();
            }
            return selectionHasChanged;
        }
        /**
         * Sets the Highlight Container to a specific state (visible or invisible) or toggle the state if called with null
         * @param newValue
         */
        setControlLocked(targetControl, bLocked) {
            let ctrlMeta = metaDataManager.getControlMetaData(targetControl);
            if (ctrlMeta !== null) {
                ctrlMeta.locked = bLocked;
                // Native toggle with second parameter usable as we are chrome only
                ctrlMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-locked', bLocked);
                ctrlMeta.jHierarchyAnchorContainer[0].classList.toggle('tchmi-creator-control-locked', bLocked);
            }
            let tco = TcHmi.Controls.get(targetControl);
            if (tco) {
                // Update HTML to match current state. Otherwise syncControl will not detect changes later
                if (bLocked) {
                    tco.getElement()[0].setAttribute('data-tchmi-creator-locked', 'True');
                    tco.getPcElement()[0].setAttribute('data-tchmi-creator-locked', 'True');
                }
                else {
                    tco.getElement()[0].removeAttribute('data-tchmi-creator-locked');
                    tco.getPcElement()[0].removeAttribute('data-tchmi-creator-locked');
                }
            }
        }
        /**
         * Locks the designer or live-view
         */
        lock() {
            this.__locked = true;
            if (TCHMI_LIVEVIEW) {
                TcHmi.System.Services.dialogManager.updateTextEx('__TcHmiDesignerLock', TcHmi.System.Services.localization.getText('Changes_To_Project_Require_Reload', {
                    level: TcHmi.Locale.Level.Engineering,
                }), { severity: TcHmi.DialogManager.DialogSeverity.Warning, buttonReload: true });
                TcHmi.System.Services.dialogManager.showDialog('__TcHmiDesignerLock', true, TcHmi.DialogManager.DialogType.Overlay);
            }
            else if (TCHMI_DESIGNER) {
                // Empty text as the visual studio info bar is shown. But darkening the hmi is needed
                TcHmi.System.Services.dialogManager.updateTextEx('__TcHmiDesignerLock', '', {
                    severity: TcHmi.DialogManager.DialogSeverity.Warning,
                });
                TcHmi.System.Services.dialogManager.showDialog('__TcHmiDesignerLock', true, TcHmi.DialogManager.DialogType.Overlay);
                this.unselectEach(true);
                const v = TcHmi.System.Services.viewManager.getView();
                if (v !== undefined && v !== null) {
                    TcHmi.StyleProvider.setSimpleElementStyle(v.getElement(), 'filter', 'blur(2px)');
                }
            }
            document.body.style.overflow = 'hidden';
        }
        /**
         * Reserved!
         * Currently no need for unlock... Reload required!
         */
        unlock() {
            throw new Error('Not implemented!');
        }
        isLocked() {
            return this.__locked;
        }
        /*
                    public printDebugstate(source: string) {
                        console.log(
                            '\nSource: '+source+'\n'
                            + 'MoveMan: '
                            + '__mouseMoving: ' + controlMoveManager.__mouseMoving
                            + '\t__lockControlMove: ' + controlMoveManager.__lockControlMove
                            + '\t__controlMoveActive: ' + controlMoveManager.__controlMoveActive
                            + '\nresizeMang: '
                            + '__controlResizing: ' + controlResizeManager.__controlResizing
                            + '\t__lockControlResize: ' + controlResizeManager.__lockControlResize
                            + '\nRectSelect: '
                            + '__rectSelecting: ' + this.rectSelectManager.__rectSelecting
                            + '\t__lockRectSelect: ' + this.rectSelectManager.__lockRectSelect
                        );
                    }
                    */
        __settings = {
            theme: {
                ChessboardLight: null,
                ChessboardDark: null,
            },
            enableSnapping: true,
            snapToControls: true,
            snapToInnerContainerSides: true,
            snapDistanceToControls: 10,
            untransformedColor: null,
            selectionHighlightColor: null,
            unSelectedHighlightColor: null,
            selectedSecondaryColor: null,
            snapHighlightColor: null,
            scaleFactors: [1],
        };
        getSettings() {
            return this.__settings;
        }
        updateSettings(valueNew) {
            if (!tchmi_equal(this.__settings, valueNew)) {
                this.__settings = valueNew;
                // adjust colors
                highlightManager?.updateEngineeringStyles();
                // adjust snap settings
                interactionManager?.clearControlSnapPositionCache();
                interactionManager?.refreshControlSnapPositionCache();
            }
        }
    };
})();
export { DesignerModeManager };
/** Runtime Manager */
export const designerModeManager = new DesignerModeManager();
//# sourceMappingURL=DesignerModeManager.js.map