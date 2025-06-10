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
let highlightManager;
let rootControlManager;
if (TCHMI_DESIGNER) {
    import('./DesignerModeMasterControlHighlightMngr.js').then((module) => {
        highlightManager = module.highlightManager;
    });
    import('./DesignerModeMasterRootControlMngr.js').then((module) => {
        rootControlManager = module.rootControlManager;
    });
}
/**
 * Handles all control meta data in designer master and slave.
 */
let DesignerModeControlMetaDataManager = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let ___onControlDetached_decorators;
    return class DesignerModeControlMetaDataManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onControlDetached_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            __esDecorate(this, null, ___onControlDetached_decorators, { kind: "method", name: "__onControlDetached", static: false, private: false, access: { has: obj => "__onControlDetached" in obj, get: obj => obj.__onControlDetached }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Handles all control meta data in designer master and slave.
         */
        constructor() {
            TcHmi.EventProvider.register('onControlDetached', this.__onControlDetached);
        }
        __controlsMetaData = (__runInitializers(this, _instanceExtraInitializers), {});
        __selectedControlsMetaData = {};
        __selectedControlsMetaDataHasChanged = false;
        __changedControlsMetaData = {};
        __changedControlsMetaDataHasChanged = false;
        /**
         * A list of all ids of selected Controls without the partial root
         */
        __selectedControlIdsWithChildren = [];
        /* ***********************************************************************************
                        ControlMetaData
                    *********************************************************************************** */
        /**
         * Register a control for the ControlMetaCache
         * @param ctrlMeta
         */
        register(ctrlMeta) {
            this.__controlsMetaData[ctrlMeta.id] = ctrlMeta;
        }
        /**
         * Unregister a control from ControlMetaCache and selectedControlsMetaData
         * @param tco
         */
        unregister(tcoId) {
            if (this.__controlsMetaData[tcoId] !== undefined) {
                if (TCHMI_DESIGNER && highlightManager && rootControlManager) {
                    highlightManager.handleControlRemoved(this.__controlsMetaData[tcoId]);
                    // The control position could have stretched the view
                    rootControlManager.setCreatorViewPortPosition(TcHmi.System.Services.viewManager.getView());
                    // request a control snap rebuild
                    highlightManager.requestAsyncHighlighterUpdate();
                }
                delete this.__controlsMetaData[tcoId];
            }
            if (this.__selectedControlsMetaData[tcoId] !== undefined) {
                delete this.__selectedControlsMetaData[tcoId];
                this.__rebuildSelectIdCache();
            }
        }
        __onControlDetached(_event, tco) {
            if (tco === undefined || tco === null) {
                return;
            }
            this.unregister(tco.getId());
        }
        getControlMetaData(id) {
            if (id === null || id === undefined) {
                return this.__controlsMetaData;
            }
            if (this.__controlsMetaData[id] !== undefined) {
                return this.__controlsMetaData[id];
            }
            return null;
        }
        refreshControlMetaData(idOrControl) {
            let ctrlMeta;
            let id;
            if (typeof idOrControl === 'string') {
                ctrlMeta = this.getControlMetaData(idOrControl);
                id = idOrControl;
            }
            else if (idOrControl) {
                ctrlMeta = idOrControl;
                id = ctrlMeta.id;
            }
            else {
                for (let id in this.__controlsMetaData) {
                    this.refreshControlMetaData(this.__controlsMetaData[id]);
                }
                return null;
            }
            if (ctrlMeta === undefined || ctrlMeta === null || !highlightManager) {
                // Not available right now. Perhaps we are in the creation of the control.
                return null;
            }
            const tco = TcHmi.Controls.get(id);
            if (!tco) {
                TcHmi.Log.error(`[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeControlMetaDataManager] Failed to refresh Control Meta Data of control "${id}": Not found in control cache.\n`);
                return null;
            }
            const element = tco.getElement();
            ctrlMeta.controlAttributeDimension = this.__getControlAttributeDimension(tco);
            ctrlMeta.relativeControlRotation = this.__getRelativeRotation(element[0]);
            ctrlMeta.absoluteParentRotation = this.__getAbsoluteRotation(element.offsetParent()[0]);
            ctrlMeta.controlCssPixelDimension = this.__getControlCssPixelDimension(tco);
            let ctrlAsyncData = highlightManager.requestAsyncHighlighterUpdateForControl(tco);
            ctrlAsyncData.moved = true;
            ctrlAsyncData.resized = true;
            return ctrlMeta;
        }
        /**
         * Returns ControlMetaData for all controls with changes.
         */
        getChangedControlsMetaData() {
            return this.__changedControlsMetaData;
        }
        resetChangedControlsMetaData() {
            this.__changedControlsMetaDataHasChanged = false;
            this.__changedControlsMetaData = {};
        }
        getChangedControlsMetaDataHasChanged() {
            return this.__changedControlsMetaDataHasChanged;
        }
        /**
         * Adds a ControlMetaData object to changed cache
         */
        addChangedControlsMetaData(ctrlMeta) {
            if (!this.__changedControlsMetaData[ctrlMeta.id]) {
                this.__changedControlsMetaDataHasChanged = true;
            }
            this.__changedControlsMetaData[ctrlMeta.id] = ctrlMeta;
        }
        /* ***********************************************************************************
                        selected ControlMetaData
                    *********************************************************************************** */
        /**
         * Returns all selected ControlMetaData objects
         */
        getSelectedControlsMetaData() {
            return this.__selectedControlsMetaData;
        }
        resetSelectedControlsMetaDataHasChanged() {
            this.__selectedControlsMetaDataHasChanged = false;
        }
        getSelectedControlsMetaDataHasChanged() {
            return this.__selectedControlsMetaDataHasChanged;
        }
        /**
         * Adds a ControlMetaData object to select cache
         */
        selectControl(ctrlMeta) {
            if (!this.__selectedControlsMetaData[ctrlMeta.id]) {
                this.__selectedControlsMetaDataHasChanged = true;
            }
            this.__selectedControlsMetaData[ctrlMeta.id] = ctrlMeta;
            const tco = TcHmi.Controls.get(ctrlMeta.id);
            if (!tco) {
                return;
            }
            const hierarchy = TcHmi.System.resolveControlHierarchy(tco, null);
            const getAllChildren = (h) => {
                const ctrl = h.ctrl;
                if (!this.__selectedControlIdsWithChildren.includes(ctrl.getId())) {
                    this.__selectedControlIdsWithChildren.push(ctrl.getId());
                }
                if (ctrl.getIsContainerControl() &&
                    !(ctrl.getElement()?.[0]?.hasAttribute('data-tchmi-designer-ignore') ?? true)) {
                    for (let i = 0, ii = h.children_hierarchy.length; i < ii; i++) {
                        getAllChildren(h.children_hierarchy[i]);
                    }
                }
            };
            getAllChildren(hierarchy);
            this.__rebuildSelectIdCache(ctrlMeta);
        }
        /**
         * Removes a ControlMetaData object from select cache
         */
        unselectControl(ctrlMeta) {
            if (this.__selectedControlsMetaData[ctrlMeta.id]) {
                this.__selectedControlsMetaDataHasChanged = true;
            }
            delete this.__selectedControlsMetaData[ctrlMeta.id];
            this.__rebuildSelectIdCache();
        }
        /** A list of all ids of selected Controls without the partial root */
        getSelectedControlIdsWithChildren() {
            return this.__selectedControlIdsWithChildren;
        }
        __rebuildSelectIdCache(ctrlMeta) {
            if (ctrlMeta === undefined) {
                this.__selectedControlIdsWithChildren = [];
                // Reset all classes. Will be set in specific __rebuildSelectIdCache call
                for (const ctrlMeta2 of Object.values(this.__controlsMetaData)) {
                    ctrlMeta2.jControlPosition[0].classList.remove('tchmi-creator-childcontrol-selected');
                }
                for (const selectedCtrlMeta of Object.values(this.__selectedControlsMetaData)) {
                    if (!selectedCtrlMeta.isPartialRoot) {
                        // Partial Root should be not included in this list
                        this.__rebuildSelectIdCache(selectedCtrlMeta);
                    }
                }
                return;
            }
            if (ctrlMeta.isPartialRoot) {
                // Partial Root should be not included in this list
                return;
            }
            if (ctrlMeta.isSelected && ctrlMeta.parent) {
                ctrlMeta.parent.jControlPosition[0].classList.add('tchmi-creator-childcontrol-selected');
            }
            const tco = TcHmi.Controls.get(ctrlMeta.id);
            if (!tco) {
                return;
            }
            const hierarchy = TcHmi.System.resolveControlHierarchy(tco, null);
            const getAllChildren = (h) => {
                const ctrl = h.ctrl;
                if (!this.__selectedControlIdsWithChildren.includes(ctrl.getId())) {
                    this.__selectedControlIdsWithChildren.push(ctrl.getId());
                }
                if (ctrl.getIsContainerControl() &&
                    !(ctrl.getElement()?.[0]?.hasAttribute('data-tchmi-designer-ignore') ?? true)) {
                    for (let i = 0, ii = h.children_hierarchy.length; i < ii; i++) {
                        getAllChildren(h.children_hierarchy[i]);
                    }
                }
            };
            getAllChildren(hierarchy);
        }
        /**
         * Returns the control dimension defined by its attributes
         * @param tco The control object
         */
        __getControlAttributeDimension(tco) {
            return {
                topValue: tco.getTop() ?? null,
                topUnit: tco.getTopUnit() ?? 'px',
                leftValue: tco.getLeft() ?? null,
                leftUnit: tco.getLeftUnit() ?? 'px',
                widthValue: tco.getWidth() ?? null,
                widthUnit: tco.getWidthUnit() ?? 'px',
                minWidthValue: tco.getMinWidth() ?? null,
                minWidthUnit: tco.getMinWidthUnit() ?? 'px',
                maxWidthValue: tco.getMaxWidth() ?? null,
                maxWidthUnit: tco.getMaxWidthUnit() ?? 'px',
                widthMode: tco.getWidthMode() ?? 'Value',
                rightValue: tco.getRight() ?? null,
                rightUnit: tco.getRightUnit() ?? 'px',
                heightValue: tco.getHeight() ?? null,
                heightUnit: tco.getHeightUnit() ?? 'px',
                heightMode: tco.getHeightMode() ?? 'Value',
                minHeightValue: tco.getMinHeight() ?? null,
                minHeightUnit: tco.getMinHeightUnit() ?? 'px',
                maxHeightValue: tco.getMaxHeight() ?? null,
                maxHeightUnit: tco.getMaxHeightUnit() ?? 'px',
                bottomValue: tco.getBottom() ?? null,
                bottomUnit: tco.getBottomUnit() ?? 'px',
            };
        }
        /**
         * Returns the control dimension defined by jquery.css
         * @param tco The control object
         */
        __getControlCssPixelDimension(tco) {
            let res = {
                width: null,
                height: null,
                left: null,
                top: null,
                right: null,
                bottom: null,
            };
            let element = tco.getElement();
            if (element) {
                let width = element.css('width');
                if (width) {
                    res['width'] = parseFloat(width);
                }
                let height = element.css('height');
                if (height) {
                    res['height'] = parseFloat(height);
                }
                let left = element.css('left');
                if (left) {
                    res['left'] = parseFloat(left);
                }
                let top = element.css('top');
                if (top) {
                    res['top'] = parseFloat(top);
                }
                let right = element.css('right');
                if (right) {
                    res['right'] = parseFloat(right);
                }
                let bottom = element.css('bottom');
                if (bottom) {
                    res['bottom'] = parseFloat(bottom);
                }
            }
            return res;
        }
        /**
         * Returns the angle in degrees
         * @param jElem
         */
        __getAbsoluteRotation(jElem) {
            if (!jElem) {
                return 0;
            }
            let angleParent = 0;
            // Get *real* offsetParent
            const offsetParent = jElem.parentElement;
            if (offsetParent && !(offsetParent.nodeName && offsetParent.tagName === 'HTML')) {
                angleParent = this.__getAbsoluteRotation(offsetParent);
            }
            const angle = this.__getRelativeRotation(jElem);
            return angleParent + angle;
        }
        /**
         * Returns the angle in degrees
         * @param elem
         */
        __getRelativeRotation(Elem) {
            if (!Elem) {
                return 0;
            }
            // Need to fetch real data, as this could be set via css, too.
            const tr = TcHmi.StyleProvider.getComputedElementStyle(Elem, 'transform')['transform'];
            /** This is rotation angle in degrees */
            let angle = 0;
            /*
                        let scaleX = 1; // ScaleX Factor
                        let scaleY = 1; // ScaleY Factor
                        let skewX  = 0; // skewX angle degrees
                        let skewY  = 0; // skewY angle degrees
                        */
            if (tr && tr !== 'none') {
                const matrixContent = tr.substring(tr.indexOf('(') + 1, tr.lastIndexOf(')'));
                const arrMatrixContent = matrixContent.split(',');
                if (arrMatrixContent.length === 6) {
                    // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
                    const a = parseFloat(arrMatrixContent[0]);
                    const b = parseFloat(arrMatrixContent[1]);
                    angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                    // More interesting values in the Matrix from http://stackoverflow.com/questions/5107134/find-the-rotation-and-skew-of-a-matrix-transformation
                    /*
                                const c = parseFloat(arrMatrixContent[2]);
                                const d = parseFloat(arrMatrixContent[3]);
                                const e = parseFloat(arrMatrixContent[4]);
                                const f = parseFloat(arrMatrixContent[5]);
                                const denom = Math.pow(a, 2) + Math.pow(b, 2);
                                scaleX = Math.sqrt(denom);
                                scaleY = (a * d - c * b) / scaleX;
                                skewX = Math.atan2(a * c + b * d, denom) * (180 / Math.PI));
                                skewY = 0;
                                */
                }
            }
            return angle;
        }
    };
})();
export { DesignerModeControlMetaDataManager };
/** Runtime Manager */
export const metaDataManager = new DesignerModeControlMetaDataManager();
//# sourceMappingURL=DesignerModeControlMetaDataMngr.js.map