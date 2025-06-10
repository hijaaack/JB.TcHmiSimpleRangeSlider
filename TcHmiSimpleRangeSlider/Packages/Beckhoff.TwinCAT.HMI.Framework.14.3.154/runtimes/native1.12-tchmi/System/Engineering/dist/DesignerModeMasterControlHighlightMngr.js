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
// Engineering Types
import { designerModeManager } from './DesignerModeManager.js';
import { metaDataManager, } from './DesignerModeControlMetaDataMngr.js';
import { rootControlManager } from './DesignerModeMasterRootControlMngr.js';
import { interactionManager } from './DesignerModeMasterInteractionMngr.js';
import { hierarchyManager } from './DesignerModeMasterHierarchyMngr.js';
import { controlMoveManager } from './DesignerModeMasterControlMoveMngr.js';
import { controlResizeManager } from './DesignerModeMasterControlResizeMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
 * Handles all control highlighting in designer master.
 */
let DesignerModeMasterControlHighlightManager = (() => {
    var _a, _b, _c, _d, _e, _f, _g;
    let _instanceExtraInitializers = [];
    let ___onControlsResized_decorators;
    let ___onControlsMoved_decorators;
    let ___onControlVisibilityChanged_decorators;
    let ___onGridRowOrColumnIndexChanged_decorators;
    let ___onGridRowOrColumnChanged_decorators;
    let ___onGridCellResized_decorators;
    let _updateEngineeringStyles_decorators;
    return class DesignerModeMasterControlHighlightManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onControlsResized_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            ___onControlsMoved_decorators = [(_b = TcHmi).CallbackMethod.bind(_b)];
            ___onControlVisibilityChanged_decorators = [(_c = TcHmi).CallbackMethod.bind(_c)];
            ___onGridRowOrColumnIndexChanged_decorators = [(_d = TcHmi).CallbackMethod.bind(_d)];
            ___onGridRowOrColumnChanged_decorators = [(_e = TcHmi).CallbackMethod.bind(_e)];
            ___onGridCellResized_decorators = [(_f = TcHmi).CallbackMethod.bind(_f)];
            _updateEngineeringStyles_decorators = [(_g = TcHmi).CallbackMethod.bind(_g)];
            __esDecorate(this, null, ___onControlsResized_decorators, { kind: "method", name: "__onControlsResized", static: false, private: false, access: { has: obj => "__onControlsResized" in obj, get: obj => obj.__onControlsResized }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onControlsMoved_decorators, { kind: "method", name: "__onControlsMoved", static: false, private: false, access: { has: obj => "__onControlsMoved" in obj, get: obj => obj.__onControlsMoved }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onControlVisibilityChanged_decorators, { kind: "method", name: "__onControlVisibilityChanged", static: false, private: false, access: { has: obj => "__onControlVisibilityChanged" in obj, get: obj => obj.__onControlVisibilityChanged }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onGridRowOrColumnIndexChanged_decorators, { kind: "method", name: "__onGridRowOrColumnIndexChanged", static: false, private: false, access: { has: obj => "__onGridRowOrColumnIndexChanged" in obj, get: obj => obj.__onGridRowOrColumnIndexChanged }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onGridRowOrColumnChanged_decorators, { kind: "method", name: "__onGridRowOrColumnChanged", static: false, private: false, access: { has: obj => "__onGridRowOrColumnChanged" in obj, get: obj => obj.__onGridRowOrColumnChanged }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onGridCellResized_decorators, { kind: "method", name: "__onGridCellResized", static: false, private: false, access: { has: obj => "__onGridCellResized" in obj, get: obj => obj.__onGridCellResized }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateEngineeringStyles_decorators, { kind: "method", name: "updateEngineeringStyles", static: false, private: false, access: { has: obj => "updateEngineeringStyles" in obj, get: obj => obj.updateEngineeringStyles }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Handles all control highlighting in designer master.
         */
        constructor() {
            TcHmi.EventProvider.register('System.onControlsResized', this.__onControlsResized);
            TcHmi.EventProvider.register('System.onControlsMoved', this.__onControlsMoved);
            TcHmi.EventProvider.register('System.onControlVisibilityChanged', this.__onControlVisibilityChanged);
            // Handle grid change itself
            TcHmi.EventProvider.register('System.onControlGetRowCountChanged', this.__onGridRowOrColumnChanged);
            TcHmi.EventProvider.register('System.onControlGetColumnCountChanged', this.__onGridRowOrColumnChanged);
            TcHmi.EventProvider.register('System.onGridCellResized', this.__onGridCellResized);
            // Handle control in grid position change
            TcHmi.EventProvider.register('System.onControlGridRowIndexChanged', this.__onGridRowOrColumnIndexChanged);
            TcHmi.EventProvider.register('System.onControlGridColumnIndexChanged', this.__onGridRowOrColumnIndexChanged);
            TcHmi.EventProvider.register('onThemeDataChanged', this.updateEngineeringStyles);
            // Control names should always be handled as a unit. No "20_myControl" => "myControl_20" manipulation as would be the case with rtl.
            // So we write the names into a separate bdi element.
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = `<div data-tchmi-creator-target-control=""
                                class="tchmi-creator-controlposition tchmi-box"
                                style="z-index:0;">
                                <div data-tchmi-creator-target-control=""
                                    class="tchmi-creator-controlname tchmi-box"
                                    title=""><bdi></bdi></div>
                        </div>`;
            let controlPosition = tempDiv.firstElementChild;
            tempDiv.innerHTML = `<div data-tchmi-creator-target-control=""
                                class="tchmi-creator-hierarchy-controlposition tchmi-box"
                                style="z-index:0;">
                        </div>`;
            let hierarchyControlPosition = tempDiv.firstElementChild;
            tempDiv.innerHTML = `<div data-tchmi-creator-target-control=""
                                class="tchmi-creator-originalposition tchmi-box"
                                style="z-index:0;">

                                <div class="tchmi-creator-distance-top    tchmi-creator-distance-line tchmi-box"></div>
                                <div class="tchmi-creator-distance-left   tchmi-creator-distance-line tchmi-box"></div>
                                <div class="tchmi-creator-distance-width  tchmi-creator-distance-line tchmi-box"></div>
                                <div class="tchmi-creator-distance-right  tchmi-creator-distance-line tchmi-box"></div>
                                <div class="tchmi-creator-distance-height tchmi-creator-distance-line tchmi-box"></div>
                                <div class="tchmi-creator-distance-bottom tchmi-creator-distance-line tchmi-box"></div>

                                <div class="tchmi-creator-snapline-top tchmi-creator-snapline tchmi-box"></div>
                                <div class="tchmi-creator-snapline-left tchmi-creator-snapline tchmi-box"></div>
                                <div class="tchmi-creator-snapline-right tchmi-creator-snapline tchmi-box"></div>
                                <div class="tchmi-creator-snapline-bottom tchmi-creator-snapline tchmi-box"></div>

                        </div>`;
            let originalPosition = tempDiv.firstElementChild;
            tempDiv.innerHTML = `<div data-tchmi-creator-target-control=""
                                class="tchmi-creator-anchorcontainer tchmi-box"
                                style="border-width: 1px;z-index:0;">

                                <div data-tchmi-creator-anchor-name="TopLeft"      class="tchmi-creator-anchor-top-left      tchmi-creator-anchor-rect tchmi-box"></div>
                                <div data-tchmi-creator-anchor-name="TopCenter"    class="tchmi-creator-anchor-top-center    tchmi-creator-anchor-rect tchmi-box"></div>
                                <div data-tchmi-creator-anchor-name="TopRight"     class="tchmi-creator-anchor-top-right     tchmi-creator-anchor-rect tchmi-box"></div>
                                <div data-tchmi-creator-anchor-name="CenterLeft"   class="tchmi-creator-anchor-center-left   tchmi-creator-anchor-rect tchmi-box"></div>
                                <div data-tchmi-creator-anchor-name="CenterRight"  class="tchmi-creator-anchor-center-right  tchmi-creator-anchor-rect tchmi-box"></div>
                                <div data-tchmi-creator-anchor-name="BottomLeft"   class="tchmi-creator-anchor-bottom-left   tchmi-creator-anchor-rect tchmi-box"></div>
                                <div data-tchmi-creator-anchor-name="BottomCenter" class="tchmi-creator-anchor-bottom-center tchmi-creator-anchor-rect tchmi-box"></div>
                                <div data-tchmi-creator-anchor-name="BottomRight"  class="tchmi-creator-anchor-bottom-right  tchmi-creator-anchor-rect tchmi-box"></div>
                        </div>`;
            let anchorContainer = tempDiv.firstElementChild;
            tempDiv.innerHTML = `<div data-tchmi-creator-target-control=""
                                class="tchmi-creator-hierarchy-anchorcontainer tchmi-box"
                                style="z-index:0;">
                        </div>`;
            let hierarchyAnchorContainer = tempDiv.firstElementChild;
            this.__cloneSource = {
                controlPosition: controlPosition,
                hierarchyControlPosition: hierarchyControlPosition,
                originalPosition: originalPosition,
                anchorContainer: anchorContainer,
                hierarchyAnchorContainer: hierarchyAnchorContainer,
            };
        }
        /**
         * Should the highlight containers be visible?
         */
        __highlightContainerVisibility = (__runInitializers(this, _instanceExtraInitializers), true);
        __cloneSource;
        /**
         * Remove all highlight container from DOM
         * @param ctrlMeta
         */
        handleControlRemoved(ctrlMeta) {
            ctrlMeta.jOriginalPosition.remove();
            ctrlMeta.jControlPosition.remove();
            ctrlMeta.jHierarchyControlposition.remove();
            ctrlMeta.jAnchorContainer.remove();
            ctrlMeta.jHierarchyAnchorContainer.remove();
        }
        __asyncWorkData = {
            animationFrameId: 0,
            ctrlList: new Map(),
        };
        /**
         * In the next Animation Frame adjust all needed highlighters and rebuild the snap control cache
         */
        requestAsyncHighlighterUpdate() {
            if (this.__asyncWorkData.animationFrameId === 0) {
                this.__asyncWorkData.animationFrameId = window.requestAnimationFrame(() => {
                    const ctrlList = new Set();
                    for (const [tco, value] of this.__asyncWorkData.ctrlList) {
                        const ctrlMeta = metaDataManager.getControlMetaData(tco.getId());
                        if (ctrlMeta === null) {
                            continue;
                        }
                        ctrlList.add(tco);
                        const ctrlParent = tco.getParent();
                        if (ctrlParent && ctrlMeta.parent && ctrlMeta.parent.isGridControl) {
                            if (!ctrlList.has(ctrlParent)) {
                                ctrlList.add(ctrlParent);
                            }
                        }
                        if (value.rowColumnChanged) {
                            this.createGridHighlighter(tco, ctrlMeta);
                        }
                        if (value.resized) {
                            if (ctrlMeta.isPartialRoot) {
                                rootControlManager?.setCreatorViewPortPosition(tco);
                            }
                        }
                        this.updateGripCursors(ctrlMeta);
                    }
                    this.setContainerPositions(ctrlList);
                    // rebuild snap cache in any case
                    interactionManager?.clearControlSnapPositionCache();
                    interactionManager?.refreshControlSnapPositionCache();
                    // reset state
                    this.__asyncWorkData.ctrlList.clear();
                    this.__asyncWorkData.animationFrameId = 0;
                });
            }
        }
        /**
         * Adjust Transformed and Untransformed Container on Control Resize
         */
        __onControlsResized(_event, ctrls) {
            if (controlResizeManager.getControlResizing()) {
                // The MoveManager has resized the container by itself
                return;
            }
            for (let ctrl of ctrls) {
                let ctrlAsyncData = this.requestAsyncHighlighterUpdateForControl(ctrl);
                ctrlAsyncData.resized = true;
            }
        }
        /**
         * Adjust Transformed and Untransformed Container on Control Move
         */
        __onControlsMoved(_event, ctrls) {
            if (controlMoveManager.getControlMoveActive()) {
                // The MoveManager has moved the container by itself
                return;
            }
            for (let ctrl of ctrls) {
                let ctrlAsyncData = this.requestAsyncHighlighterUpdateForControl(ctrl);
                ctrlAsyncData.moved = true;
            }
        }
        /**
         * Add the control to the list to adjust for the highlighting
         * @param ctrl
         */
        requestAsyncHighlighterUpdateForControl(ctrl) {
            this.requestAsyncHighlighterUpdate();
            let resizeMoveInfo = this.__asyncWorkData.ctrlList.get(ctrl);
            if (!resizeMoveInfo) {
                resizeMoveInfo = {
                    resized: false,
                    moved: false,
                    rowColumnChanged: false,
                };
                this.__asyncWorkData.ctrlList.set(ctrl, resizeMoveInfo);
            }
            return resizeMoveInfo;
        }
        /**
         * Adjust Transformed and Untransformed Container on Control Move
         */
        __onControlVisibilityChanged(_event, tco) {
            const ctrlMeta = metaDataManager.getControlMetaData(tco.getId());
            if (ctrlMeta === null) {
                return;
            }
            if (tco.getVisibility() === 'Collapsed') {
                ctrlMeta.controlCollapsed = true;
            }
            else {
                ctrlMeta.controlCollapsed = false;
            }
            let ctrlAsyncData = this.requestAsyncHighlighterUpdateForControl(tco);
            ctrlAsyncData.moved = true;
            ctrlAsyncData.resized = true;
        }
        /**
         * Moves control highlight to correct cell
         */
        __onGridRowOrColumnIndexChanged(_event, tco) {
            let tcoPar = tco.getParent();
            if (!tcoPar ||
                !TcHmi.System.Services.controlManager
                    .getDescriptionTypes(tcoPar.getType())
                    .includes('TcHmi.Controls.System.TcHmiGrid')) {
                return;
            }
            const ctrlMeta = metaDataManager.getControlMetaData(tco.getId());
            if (ctrlMeta === null || ctrlMeta.parent === null) {
                return;
            }
            let targetRowIndex = tco.getGridRowIndex();
            // Property not known in base control
            if (!targetRowIndex ||
                targetRowIndex >= (tco.getParent()?.['__rowOptions']?.length ?? 0)) {
                targetRowIndex = 0;
            }
            let targetColumnIndex = tco.getGridColumnIndex();
            // Property not known in base control
            if (!targetColumnIndex ||
                targetColumnIndex >= (tco.getParent()?.['__columnOptions']?.length ?? 0)) {
                targetColumnIndex = 0;
            }
            const targetCell = ctrlMeta.parent.jHierarchyControlposition.children('[data-tchmi-creator-grid-rowindex=' +
                targetRowIndex +
                '][data-tchmi-creator-grid-cellindex=' +
                targetColumnIndex +
                ']');
            if (targetCell.length === 0) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterHighlightManager] Fatal internal error: Could not find target grid cell for ' +
                    tcoPar.getId() +
                    ' to attach highlight container.');
            }
            targetCell.append(ctrlMeta.jOriginalPosition);
            targetCell.append(ctrlMeta.jControlPosition);
            targetCell.append(ctrlMeta.jHierarchyControlposition);
            targetCell.append(ctrlMeta.jAnchorContainer);
            targetCell.append(ctrlMeta.jHierarchyAnchorContainer);
            // Container size cannot be updated, as the size of the Gridcell is not corrected now
        }
        __onGridRowOrColumnChanged(_event, tco) {
            let ctrlAsyncData = this.requestAsyncHighlighterUpdateForControl(tco);
            ctrlAsyncData.rowColumnChanged = true;
            // Correct container positions of cells and controls
            const gridChildren = tco.getChildren();
            for (const gridChild of gridChildren) {
                let childCtrlAsyncData = this.requestAsyncHighlighterUpdateForControl(gridChild);
                childCtrlAsyncData.resized = true;
            }
        }
        /**
         * Adjust Gridcells overlays
         */
        __onGridCellResized(_event, tco) {
            if (controlResizeManager.getControlResizing()) {
                return;
            }
            let ctrlAsyncData = this.requestAsyncHighlighterUpdateForControl(tco);
            ctrlAsyncData.resized = true;
        }
        /**
         * Sets the Highlight Container to a specific state (visible or invisible)
         * @param valueNew
         */
        setHighlightContainerVisibility(valueNew) {
            this.__highlightContainerVisibility = valueNew;
            const controlsMetaData = metaDataManager.getControlMetaData();
            for (const ctrlMeta of Object.values(controlsMetaData)) {
                this.processHighlightType(ctrlMeta);
            }
            this.processDomVisibility();
        }
        setCreatorVisibilityAttribute(targetControl, bVisibility) {
            let ctrlMeta = metaDataManager.getControlMetaData(targetControl);
            if (ctrlMeta !== null) {
                ctrlMeta.domVisibility = bVisibility;
                this.processDomVisibility(ctrlMeta);
            }
        }
        /**
         * Processes Control hiding from Creator Document Outline and show/hides control highlighting
         */
        processDomVisibility(processCtrlMeta) {
            if (!TCHMI_DESIGNER) {
                return;
            }
            let controlsMetaData;
            if (processCtrlMeta) {
                controlsMetaData = { singleCtrl: processCtrlMeta };
            }
            else {
                controlsMetaData = metaDataManager.getControlMetaData();
            }
            for (const ctrlMeta of Object.values(controlsMetaData)) {
                const tco = TcHmi.Controls.get(ctrlMeta.id);
                if (!tco) {
                    TcHmi.Log.error(`[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterHighlightManager] Failed to handle control "${ctrlMeta.id}": Not found in control cache.\n`);
                    continue;
                }
                tco.getElement()[0].classList.toggle('tchmi-creator-controlhidden', !ctrlMeta.domVisibility);
                // Important ! Do not reset display if designer dom visibility is true but control is collapsed.
                if (!ctrlMeta.domVisibility || ctrlMeta.controlCollapsed) {
                    // Hide
                    ctrlMeta.jOriginalPosition[0].style.display = 'none';
                    ctrlMeta.jControlPosition[0].style.display = 'none';
                    ctrlMeta.jHierarchyControlposition[0].style.display = 'none';
                    ctrlMeta.jAnchorContainer[0].style.display = 'none';
                    ctrlMeta.jHierarchyAnchorContainer[0].style.display = 'none';
                }
                else {
                    // Show
                    ctrlMeta.jOriginalPosition[0].style.display = '';
                    ctrlMeta.jControlPosition[0].style.display = '';
                    ctrlMeta.jHierarchyControlposition[0].style.display = '';
                    ctrlMeta.jAnchorContainer[0].style.display = '';
                    ctrlMeta.jHierarchyAnchorContainer[0].style.display = '';
                }
            }
        }
        /**
         * @param dimension
         * @param dimensionName
         * @param controlSizeValue
         * @param controlSizeUnit
         * @param defineCount
         * @param tco
         * @param ctrlMeta
         * @param creatorZoomFactor
         */
        __handleOuterDimension(dimension, renderedDimension, dimensionName, controlSizeValue, controlSizeUnit, defineCount, tco, ctrlMeta, creatorZoomFactor) {
            /** Element of the control */
            const element = tco.getElement();
            const distanceline = ctrlMeta.jOriginalPosition[0].querySelector('.tchmi-creator-distance-' + dimensionName);
            const controlPixelSize = renderedDimension[dimensionName];
            const normalizedControlPixelSize = controlPixelSize * creatorZoomFactor;
            if ((dimensionName !== 'top' && normalizedControlPixelSize >= 30) ||
                (dimensionName === 'top' && normalizedControlPixelSize >= 50)) {
                // Show value when the distance line is long enough (even with control name for "top")
                distanceline.style.fontSize = '';
            }
            else {
                // Hide value when the distance line is short
                distanceline.style.fontSize = '0px';
            }
            distanceline.style.width = normalizedControlPixelSize + 'px';
            distanceline.style.display = '';
            distanceline.style.backgroundColor = '';
            distanceline.style.borderColor = '';
            distanceline.style.opacity = '';
            if (normalizedControlPixelSize >= 10) {
                distanceline.classList.remove('no-triangle');
            }
            else {
                distanceline.classList.add('no-triangle');
            }
            /** Defines if the end triangle will be shown. */
            let dimensionActive = true;
            // Update container size and Distanceline text
            if (controlSizeValue !== null && controlSizeValue !== undefined) {
                // Update container size
                if (controlSizeUnit === 'px') {
                    dimension[dimensionName] = normalizedControlPixelSize + controlSizeUnit;
                    if (controlResizeManager.getControlResizing() ||
                        controlMoveManager.getControlMoveActive() ||
                        !controlSizeValue) {
                        // We want the current value but without zoom while resizing...
                        distanceline.textContent = controlPixelSize.toFixed(0) + controlSizeUnit;
                    }
                    else {
                        // ...but the set value on idle
                        distanceline.textContent = controlSizeValue.toFixed(0) + controlSizeUnit;
                    }
                }
                else if (controlSizeUnit === '%') {
                    let controlParentPixelSize;
                    if (dimensionName === 'top' || dimensionName === 'bottom') {
                        controlParentPixelSize = parseFloat(element.parent().css('height'));
                    }
                    else if (dimensionName === 'left' || dimensionName === 'right') {
                        controlParentPixelSize = parseFloat(element.parent().css('width'));
                    }
                    let realValue = (controlPixelSize / controlParentPixelSize) * 100;
                    dimension[dimensionName] = realValue + controlSizeUnit;
                    if (controlResizeManager.getControlResizing() ||
                        controlMoveManager.getControlMoveActive() ||
                        !controlSizeValue) {
                        // We want the current value while resizing...
                        distanceline.textContent = realValue.toFixed(1) + controlSizeUnit;
                    }
                    else {
                        // ...but the set value on idle
                        distanceline.textContent = controlSizeValue.toFixed(1) + controlSizeUnit;
                    }
                }
                defineCount++;
                if (defineCount === 3 && (dimensionName === 'right' || dimensionName === 'bottom')) {
                    // Mark that this dimension is only half active
                    // as it is only for padding.
                    distanceline.style.opacity = '0.5';
                }
            }
            else {
                dimensionActive = false;
                distanceline.style.display = 'none';
            }
            // Adjust class for correct visualization
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-definedfrom' + dimensionName, dimensionActive);
            return defineCount;
        }
        /**
         * @param dimension
         * @param dimensionName
         * @param controlSizeValue
         * @param controlSizeUnit
         * @param elementSizeMode
         * @param defineCount
         * @param tco
         * @param ctrlMeta
         * @param creatorZoomFactor
         */
        __handleInnerDimension(dimension, renderedDimension, dimensionName, controlSizeValue, controlSizeUnit, elementSizeMode, defineCount, tco, ctrlMeta, creatorZoomFactor) {
            /** Element of the control */
            const element = tco.getElement();
            const distanceline = ctrlMeta.jOriginalPosition[0].querySelector('.tchmi-creator-distance-' + dimensionName);
            const controlPixelSize = renderedDimension[dimensionName];
            if (ctrlMeta.controlCollapsed) {
                dimension[dimensionName] = '0';
                distanceline.style.display = 'none';
                defineCount++;
            }
            else {
                // Show Distanceline by default
                TcHmi.StyleProvider.setSimpleElementStyle(distanceline, {
                    width: controlPixelSize * creatorZoomFactor + 'px',
                    display: '',
                    opacity: '',
                });
                // Update container size
                if (controlSizeUnit === 'px') {
                    let realValue = controlPixelSize * creatorZoomFactor;
                    dimension[dimensionName] = realValue + controlSizeUnit;
                    if (controlResizeManager.getControlResizing() ||
                        controlMoveManager.getControlMoveActive() ||
                        !controlSizeValue) {
                        // We want the current value without zoom while resizing...
                        distanceline.textContent = controlPixelSize.toFixed(0) + controlSizeUnit;
                    }
                    else {
                        // ...but the set value on idle
                        distanceline.textContent = controlSizeValue.toFixed(0) + controlSizeUnit;
                    }
                    if (elementSizeMode !== 'Parent' && controlSizeValue !== null && controlSizeValue !== undefined) {
                        defineCount++;
                    }
                }
                else if (controlSizeUnit === '%') {
                    let controlParentPixelSize = parseFloat(element.parent().css(dimensionName));
                    let realValue = (controlPixelSize / controlParentPixelSize) * 100;
                    dimension[dimensionName] = realValue + controlSizeUnit;
                    if (controlResizeManager.getControlResizing() ||
                        controlMoveManager.getControlMoveActive() ||
                        !controlSizeValue) {
                        // We want the current value while resizing...
                        /** 'TopLeft' | 'TopCenter' | 'TopRight' | 'CenterRight' | 'BottomRight' | 'BottomCenter' | 'BottomLeft' | 'CenterLeft' */
                        const activeAnchor = interactionManager.getAnchorName();
                        if (
                        // We will switch to pixel size for the partial root (after drag).
                        // To avoid confusion show the current value without zoom while resizing...
                        ctrlMeta.isPartialRoot &&
                            activeAnchor &&
                            ((dimensionName === 'height' &&
                                (activeAnchor.includes('Top') || activeAnchor.includes('Bottom'))) ||
                                (dimensionName === 'width' &&
                                    (activeAnchor.includes('Left') || activeAnchor.includes('Right'))))) {
                            distanceline.textContent = (controlPixelSize * creatorZoomFactor).toFixed(0) + 'px';
                        }
                        else {
                            distanceline.textContent = realValue.toFixed(1) + controlSizeUnit;
                        }
                    }
                    else {
                        // ...but the set value on idle
                        distanceline.textContent = controlSizeValue.toFixed(1) + controlSizeUnit;
                    }
                    if (elementSizeMode !== 'Parent' && controlSizeValue !== null && controlSizeValue !== undefined) {
                        defineCount++;
                    }
                }
                // Distanceline Visibility
                if (elementSizeMode === 'Parent' || elementSizeMode === 'Content') {
                    if (controlSizeValue !== null && controlSizeValue !== undefined) {
                        // Show only distance line (will be without end triangle)
                        distanceline.style.opacity = '0.5';
                    }
                    else {
                        distanceline.style.display = 'none';
                    }
                }
                else if (elementSizeMode === 'Value') {
                    if (controlSizeValue !== null && controlSizeValue !== undefined) {
                        // Show distance line
                        distanceline.style.opacity = '1.0';
                    }
                    else {
                        distanceline.style.display = 'none';
                    }
                }
            }
            return defineCount;
        }
        /**
         * Sets (top|bottom), (left|right), height and width of transformed and untransformed container plus transform-origin, transform on the transformed container to match element, move container to correct gridcell.
         */
        setContainerPositions(ctrlList) {
            if (!ctrlList || ctrlList.size === 0) {
                return;
            }
            const creatorZoomFactor = rootControlManager.getCreatorZoomFactor();
            /* ************************* Read all dimensions (one forced reflow) ************************* */
            const dimensionCacheControl = new Map();
            const dimensionCacheGridCells = new Map();
            for (const tco of ctrlList) {
                if (!tco.getIsAttached() || tco.getIsDestroyed()) {
                    // We are async here, perhaps the control is not needed anymore
                    continue;
                }
                /** Element of the control */
                const element = tco.getElement();
                if (!element || element.length === 0) {
                    continue;
                }
                const ctrlMeta = metaDataManager.getControlMetaData(tco.getId());
                if (ctrlMeta === undefined || ctrlMeta === null) {
                    continue;
                }
                if (!ctrlMeta.domVisibility) {
                    continue; // no need to handle hidden container
                }
                let renderedDimension = {
                    'top': 0,
                    'height': 0,
                    'bottom': 0,
                    'left': 0,
                    'width': 0,
                    'right': 0,
                    'transform': '',
                    'transform-origin': '',
                    'border-width': '',
                    'border-style': '',
                    '--tchmi-designer-global-left': '',
                    '--tchmi-designer-global-top': '',
                };
                let elementBCR = { top: 0, left: 0, width: 0, height: 0 };
                if (!ctrlMeta.controlCollapsed) {
                    let currentStyle = TcHmi.StyleProvider.getComputedElementStyle(element, Object.keys(renderedDimension));
                    elementBCR = element[0].getBoundingClientRect();
                    renderedDimension['top'] = parseFloat(currentStyle['top']);
                    renderedDimension['height'] = parseFloat(currentStyle['height']);
                    renderedDimension['bottom'] = parseFloat(currentStyle['bottom']);
                    renderedDimension['left'] = parseFloat(currentStyle['left']);
                    renderedDimension['width'] = parseFloat(currentStyle['width']);
                    renderedDimension['right'] = parseFloat(currentStyle['right']);
                    renderedDimension['transform'] = currentStyle['transform'];
                    renderedDimension['transform-origin'] = currentStyle['transform-origin'];
                    renderedDimension['border-width'] = currentStyle['border-width'];
                    renderedDimension['border-style'] = currentStyle['border-style'];
                    renderedDimension['--tchmi-designer-global-left'] = elementBCR.left + 'px';
                    renderedDimension['--tchmi-designer-global-top'] = elementBCR.top + 'px';
                    if (ctrlMeta.isPartialRoot) {
                        renderedDimension['--tchmi-designer-root-width'] = elementBCR.width + 'px';
                        renderedDimension['--tchmi-designer-root-height'] = elementBCR.height + 'px';
                        renderedDimension['--tchmi-designer-root-scroll-left'] = document.documentElement.scrollLeft + 'px';
                        renderedDimension['--tchmi-designer-root-scroll-top'] = document.documentElement.scrollTop + 'px';
                    }
                }
                // Important ! Do not reset display if control is not collapsed but designer dom visibility is forced to false.
                if (ctrlMeta.controlCollapsed || !ctrlMeta.domVisibility) {
                    // Force display of all highlighter elements to none if control itself is collapsed.
                    // Do not use css visibility:collapse because it is not what we expect! CSS visibility: collapse is like visibiliity: hidden.There is only special handling in combination with table rows.
                    ctrlMeta.jAnchorContainer[0].style.display = 'none';
                    ctrlMeta.jControlPosition[0].style.display = 'none';
                    ctrlMeta.jHierarchyAnchorContainer[0].style.display = 'none';
                    ctrlMeta.jHierarchyControlposition[0].style.display = 'none';
                    ctrlMeta.jOriginalPosition[0].style.display = 'none';
                }
                else {
                    // Force display of all highlighter elements to default if control itself is not collapsed.
                    // Do not use css visibility:collapse because it is not what we expect! CSS visibility: collapse is like visibiliity: hidden.There is only special handling in combination with table rows.
                    ctrlMeta.jAnchorContainer[0].style.display = '';
                    ctrlMeta.jControlPosition[0].style.display = '';
                    ctrlMeta.jHierarchyAnchorContainer[0].style.display = '';
                    ctrlMeta.jHierarchyControlposition[0].style.display = '';
                    ctrlMeta.jOriginalPosition[0].style.display = '';
                }
                dimensionCacheControl.set(tco, renderedDimension);
                if (ctrlMeta.isGridControl) {
                    // Add children to Set. This item must be processed in this very foreach loop, too.
                    let childList = tco.getChildren();
                    childList.forEach((ctrl) => {
                        if (!ctrlList.has(ctrl)) {
                            // Not really needed, as this foreach loop would not reprocess it according to the spec
                            ctrlList.add(ctrl);
                        }
                    });
                    // Get all hierarchical objects
                    let allGridCells = ctrlMeta.jHierarchyControlposition.children('.tchmi-creator-hierarchy-gridcellposition');
                    // Add all highlight objects
                    allGridCells = allGridCells.add(ctrlMeta.jControlPosition.children('.tchmi-creator-gridcell'));
                    for (const creatorCell of allGridCells) {
                        const rowIndex = parseInt(creatorCell.getAttribute('data-tchmi-creator-grid-rowindex') ?? '0', 10);
                        const rowElement = element
                            .children()
                            .children('.TcHmi_Controls_System_TcHmiGrid-grid')
                            .children()
                            .eq(rowIndex);
                        const cellIndex = parseInt(creatorCell.getAttribute('data-tchmi-creator-grid-cellindex') ?? '0', 10);
                        const cellElement = rowElement.children()[cellIndex];
                        if (rowElement.length === 0 || !cellElement) {
                            // Not initialized
                            return;
                        }
                        const elmStyles = TcHmi.StyleProvider.getComputedElementStyle(element, [
                            'border-top-width',
                            'border-left-width',
                        ]);
                        const cellStyles = TcHmi.StyleProvider.getComputedElementStyle(cellElement, [
                            'border-top-width',
                            'border-left-width',
                            'padding-top',
                            'padding-left',
                        ]);
                        const gridTopBorderWidth = parseFloat(elmStyles['border-top-width']) * creatorZoomFactor;
                        const gridLeftBorderWidth = parseFloat(elmStyles['border-left-width']) * creatorZoomFactor;
                        const cellTopOffset = parseFloat(cellStyles['border-top-width']) * creatorZoomFactor +
                            parseFloat(cellStyles['padding-top']) * creatorZoomFactor;
                        const cellLeftOffset = parseFloat(cellStyles['border-left-width']) * creatorZoomFactor +
                            parseFloat(cellStyles['padding-left']) * creatorZoomFactor;
                        let offsetHeight;
                        let offsetWidth;
                        let offsetTop;
                        let offsetLeft;
                        if (ctrlMeta.absoluteParentRotation === 0 && ctrlMeta.relativeControlRotation === 0) {
                            const cellBCR = cellElement.getBoundingClientRect();
                            // BoundingClientRect has floats and but is correct only without rotation
                            offsetHeight = cellBCR.height;
                            offsetWidth = cellBCR.width;
                            // offsetTop returns the distance of the outer border of the current element relative to the inner border of the top of the parent. So substract grid border.
                            offsetTop = cellBCR.top - elementBCR.top - gridTopBorderWidth;
                            offsetLeft = cellBCR.left - elementBCR.left - gridLeftBorderWidth;
                        }
                        else {
                            // offset* has only integers but is correct even with rotation
                            offsetHeight = cellElement.offsetHeight * creatorZoomFactor;
                            offsetWidth = cellElement.offsetWidth * creatorZoomFactor;
                            offsetTop = cellElement.offsetTop * creatorZoomFactor;
                            offsetLeft = cellElement.offsetLeft * creatorZoomFactor;
                        }
                        let creatorCellStyle;
                        if (creatorCell.classList.contains('tchmi-creator-gridcell')) {
                            // we are inside tchmi-creator-controlposition which is around the gridcontrol borders
                            creatorCellStyle = {
                                height: offsetHeight + 'px',
                                width: offsetWidth + 'px',
                                top: gridTopBorderWidth + offsetTop + 'px',
                                left: gridLeftBorderWidth + offsetLeft + 'px',
                            };
                        }
                        else {
                            // we are inside tchmi-creator-hierarchy-controlposition which is *inside* the gridcell borders (so child control highlighters are correct positioned)
                            creatorCellStyle = {
                                height: offsetHeight - 2 * cellTopOffset + 'px',
                                width: offsetWidth - 2 * cellLeftOffset + 'px',
                                top: cellTopOffset + offsetTop + 'px',
                                left: cellLeftOffset + offsetLeft + 'px',
                            };
                        }
                        dimensionCacheGridCells.set(creatorCell, creatorCellStyle);
                    }
                }
            }
            /* ************************* Write all dimensions (no forced reflow) ************************* */
            for (const [tco, renderedDimension] of dimensionCacheControl) {
                const dimension = {
                    'top': '',
                    'height': '',
                    'bottom': '',
                    'left': '',
                    'width': '',
                    'right': '',
                    '--tchmi-designer-global-left': renderedDimension['--tchmi-designer-global-left'],
                    '--tchmi-designer-global-top': renderedDimension['--tchmi-designer-global-top'],
                };
                const ctrlMeta = metaDataManager.getControlMetaData(tco.getId());
                if (ctrlMeta.isPartialRoot) {
                    dimension['--tchmi-designer-root-width'] = renderedDimension['--tchmi-designer-root-width'];
                    dimension['--tchmi-designer-root-height'] = renderedDimension['--tchmi-designer-root-height'];
                    dimension['--tchmi-designer-root-scroll-left'] = renderedDimension['--tchmi-designer-root-scroll-left'];
                    dimension['--tchmi-designer-root-scroll-top'] = renderedDimension['--tchmi-designer-root-scroll-top'];
                }
                let defineCount = 0;
                /***************************** top *****************************/
                let controlSizeValue = tco.getTop();
                let controlSizeUnit = tco.getTopUnit();
                defineCount = this.__handleOuterDimension(dimension, renderedDimension, 'top', controlSizeValue, controlSizeUnit, defineCount, tco, ctrlMeta, creatorZoomFactor);
                /***************************** height *****************************/
                controlSizeValue = tco.getHeight();
                controlSizeUnit = tco.getHeightUnit();
                let elementSizeMode = tco.getHeightMode();
                defineCount = this.__handleInnerDimension(dimension, renderedDimension, 'height', controlSizeValue, controlSizeUnit, elementSizeMode, defineCount, tco, ctrlMeta, creatorZoomFactor);
                /***************************** bottom *****************************/
                controlSizeValue = tco.getBottom();
                controlSizeUnit = tco.getBottomUnit();
                defineCount = this.__handleOuterDimension(dimension, renderedDimension, 'bottom', controlSizeValue, controlSizeUnit, defineCount, tco, ctrlMeta, creatorZoomFactor);
                if (defineCount < 2) {
                    // The browser fails back to first dimension set to 0, so do all highlighting accordingly
                    this.__handleOuterDimension(dimension, renderedDimension, 'top', 0, 'px', defineCount, tco, ctrlMeta, creatorZoomFactor);
                }
                defineCount = 0;
                /***************************** left *****************************/
                controlSizeValue = tco.getLeft();
                controlSizeUnit = tco.getLeftUnit();
                defineCount = this.__handleOuterDimension(dimension, renderedDimension, 'left', controlSizeValue, controlSizeUnit, defineCount, tco, ctrlMeta, creatorZoomFactor);
                /***************************** width *****************************/
                controlSizeValue = tco.getWidth();
                controlSizeUnit = tco.getWidthUnit();
                elementSizeMode = tco.getWidthMode();
                defineCount = this.__handleInnerDimension(dimension, renderedDimension, 'width', controlSizeValue, controlSizeUnit, elementSizeMode, defineCount, tco, ctrlMeta, creatorZoomFactor);
                /***************************** right *****************************/
                controlSizeValue = tco.getRight();
                controlSizeUnit = tco.getRightUnit();
                defineCount = this.__handleOuterDimension(dimension, renderedDimension, 'right', controlSizeValue, controlSizeUnit, defineCount, tco, ctrlMeta, creatorZoomFactor);
                if (defineCount < 2) {
                    // The browser fails back to first dimension set to 0, so do all highlighting accordingly
                    this.__handleOuterDimension(dimension, renderedDimension, 'left', 0, 'px', defineCount, tco, ctrlMeta, creatorZoomFactor);
                }
                defineCount = 0;
                TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jOriginalPosition, dimension);
                // transform is probably "matrix(1, 0, 0, 1, 110, 0)" for translatex=110 or "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 20, 30, 40, 1)" for translatexyz 20,30,40
                // and has to be corrected on zoom, too.
                const orgTransform = renderedDimension.transform;
                if (creatorZoomFactor !== 1 && orgTransform.startsWith('matrix')) {
                    let transformtype = '';
                    let twoDimMatrixEnties = [];
                    // Make an Array out of the content between '(' to the last ')', split at ','
                    let orgTransformArray = orgTransform
                        .substring(orgTransform.lastIndexOf('(') + 1, orgTransform.lastIndexOf(')'))
                        .split(',');
                    if (orgTransformArray.length === 6) {
                        // We have a 3x2 transformation matrix (2D) with 6 items, some has to be corrected
                        transformtype = 'matrix';
                        twoDimMatrixEnties = [4, 5];
                    }
                    else if (orgTransformArray.length === 16) {
                        // We have a 4x4 transformation matrix (3D) with 16 items, some has to be corrected
                        transformtype = 'matrix3d';
                        twoDimMatrixEnties = [12, 13, 14];
                    }
                    for (let it of twoDimMatrixEnties) {
                        orgTransformArray[it] = (parseInt(orgTransformArray[it], 10) * creatorZoomFactor).toString();
                    }
                    dimension['transform'] = transformtype + '(' + orgTransformArray.join(',') + ')';
                }
                else if (orgTransform !== 'none') {
                    dimension['transform'] = orgTransform;
                }
                else {
                    dimension['transform'] = '';
                }
                if (dimension['transform'] !== '') {
                    // transform-origin could be '20px 30px' which has to be corrected on zoom
                    const orgTransformOrigin = renderedDimension['transform-origin'];
                    if (orgTransformOrigin) {
                        let orgTransformOriginArray = orgTransformOrigin.split(' ');
                        for (let it = 0, itl = orgTransformOriginArray.length; it < itl; it++) {
                            if (orgTransformOriginArray[it].includes('px')) {
                                orgTransformOriginArray[it] =
                                    parseInt(orgTransformOriginArray[it], 10) * creatorZoomFactor + 'px';
                            }
                        }
                        dimension['transform-origin'] = orgTransformOriginArray.join(' ');
                    }
                    else {
                        dimension['transform-origin'] = '';
                    }
                }
                else {
                    dimension['transform-origin'] = '';
                }
                TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jControlPosition, dimension);
                TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jHierarchyControlposition, dimension);
                TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jAnchorContainer, dimension);
                TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jHierarchyAnchorContainer, dimension);
                /* clone border to have all dimensions correct */
                let borderWidth = renderedDimension['border-width'];
                if (!borderWidth) {
                    borderWidth = '0px'; // Fallback for FireFox/IE to keep tests running; Chrome defaults to '0px' but FireFox/IE default to empty string;
                }
                let borderStyle = renderedDimension['border-style'];
                if (!borderStyle) {
                    borderStyle = 'none'; // Fallback for FireFox/IE to keep tests running; Chrome defaults to 'none' but FireFox/IE default to empty string;
                }
                const borderWidthArray = borderWidth.split('px');
                // Correct with zoom factor
                let normalizedBorderWidth = '';
                for (const strvalue of borderWidthArray) {
                    let valueNumber = parseFloat(strvalue);
                    if (isNaN(valueNumber)) {
                        continue;
                    }
                    normalizedBorderWidth += valueNumber * creatorZoomFactor + 'px ';
                }
                const borderClone = {
                    'border-width': normalizedBorderWidth,
                    'border-style': borderStyle,
                    'border-color': 'transparent',
                };
                TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jHierarchyControlposition, borderClone);
                TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jHierarchyAnchorContainer, borderClone);
                // Correct placement of container inside the grid
                if (tco.getParent() &&
                    ctrlMeta.parent &&
                    ctrlMeta.parent.isGridControl &&
                    ctrlMeta.jHierarchyControlposition.parent().length === 0) {
                    let targetRowIndex = tco.getGridRowIndex();
                    // Property not known in base control
                    if (!targetRowIndex ||
                        targetRowIndex >= (tco.getParent()?.['__rowOptions']?.length ?? 0)) {
                        targetRowIndex = 0;
                    }
                    let targetColumnIndex = tco.getGridColumnIndex();
                    // Property not known in base control
                    if (!targetColumnIndex ||
                        targetColumnIndex >= (tco.getParent()?.['__columnOptions']?.length ?? 0)) {
                        targetColumnIndex = 0;
                    }
                    const targetCell = ctrlMeta.parent.jHierarchyControlposition.children('[data-tchmi-creator-grid-rowindex=' +
                        targetRowIndex +
                        '][data-tchmi-creator-grid-cellindex=' +
                        targetColumnIndex +
                        ']');
                    if (targetCell.length === 0) {
                        TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterHighlightManager] Fatal internal error: Could not find target grid cell for ' +
                            tco.getParent()?.getId() +
                            ' to attach highlight container.');
                    }
                    if (!ctrlMeta.jHierarchyControlposition.parent().is(targetCell)) {
                        targetCell.append(ctrlMeta.jOriginalPosition);
                        targetCell.append(ctrlMeta.jControlPosition);
                        targetCell.append(ctrlMeta.jHierarchyControlposition);
                        targetCell.append(ctrlMeta.jAnchorContainer);
                        targetCell.append(ctrlMeta.jHierarchyAnchorContainer);
                    }
                }
            }
            for (const [creatorCell, creatorCellStyle] of dimensionCacheGridCells) {
                TcHmi.StyleProvider.setSimpleElementStyle(creatorCell, creatorCellStyle);
            }
        }
        __selectorGripsId = [
            'TopLeft',
            'TopCenter',
            'TopRight',
            'CenterRight',
            'BottomRight',
            'BottomCenter',
            'BottomLeft',
            'CenterLeft',
        ];
        __selectorGrips = ['nwse', 'ns', 'nesw', 'ew', 'nwse', 'ns', 'nesw', 'ew'];
        /**
         * @param element
         * @param angle
         */
        updateGripCursors(ctrlMeta) {
            let steps = Math.round(((ctrlMeta.relativeControlRotation ?? 0) + (ctrlMeta.absoluteParentRotation ?? 0)) * (8 / 360));
            let i;
            if (steps < 0) {
                steps += 8;
            }
            for (i = 0; i < 8; i++) {
                const index = (i + steps) % 8;
                TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jAnchorContainer[0].querySelectorAll(`[data-tchmi-creator-anchor-name="${this.__selectorGripsId[i]}"]`), 'cursor', this.__selectorGrips[index] + '-resize');
            }
        }
        /**
         * Set all highlight container to match current highlight state
         * @param ctrlMeta Metadata of the control and its designer container
         */
        processHighlightType(ctrlMeta) {
            if (ctrlMeta.isSelected) {
                ctrlMeta.jControlPosition[0].classList.remove('tchmi-creator-active-highlight');
            }
            else {
                ctrlMeta.jControlPosition[0].classList.toggle('tchmi-creator-active-highlight', this.__highlightContainerVisibility);
            }
            ctrlMeta.jControlPosition[0].classList.toggle('tchmi-creator-control-selected', ctrlMeta.isSelected);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-selected', ctrlMeta.isSelected);
            ctrlMeta.jAnchorContainer[0].classList.toggle('tchmi-creator-control-selected', ctrlMeta.isSelected);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-active-highlight', this.__highlightContainerVisibility);
        }
        updateEngineeringStyles() {
            const linkElem = document.querySelector('link[href*="StyleEngineering.css"]');
            if (!linkElem?.sheet) {
                // The engineering style is missing
                return;
            }
            const settings = designerModeManager.getSettings();
            const cssRules = linkElem.sheet.cssRules[0];
            if (cssRules.selectorText !== ':root') {
                throw new SyntaxError('StyleEngineering.css has invalid format: First selector has to be :root');
            }
            const cssStyle = cssRules.style;
            if (!cssStyle.getPropertyValue('--tchmi-designer-control-untransformed-color') ||
                !cssStyle.getPropertyValue('--tchmi-designer-control-unselected-color') ||
                !cssStyle.getPropertyValue('--tchmi-designer-control-selected-color') ||
                !cssStyle.getPropertyValue('--tchmi-designer-control-selected-secondary-color') ||
                !cssStyle.getPropertyValue('--tchmi-designer-control-snap-color')) {
                throw new SyntaxError('StyleEngineering.css has invalid format: CSS custom properties missing');
            }
            const systemColorToRgba = function (color) {
                return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a / 255 + ')';
            };
            if (settings.untransformedColor) {
                cssStyle.setProperty('--tchmi-designer-control-untransformed-color', systemColorToRgba(settings.untransformedColor));
            }
            if (settings.unSelectedHighlightColor) {
                cssStyle.setProperty('--tchmi-designer-control-unselected-color', systemColorToRgba(settings.unSelectedHighlightColor));
            }
            if (settings.selectionHighlightColor) {
                cssStyle.setProperty('--tchmi-designer-control-selected-color', systemColorToRgba(settings.selectionHighlightColor));
            }
            if (settings.selectedSecondaryColor) {
                cssStyle.setProperty('--tchmi-designer-control-selected-secondary-color', systemColorToRgba(settings.selectedSecondaryColor));
            }
            if (settings.snapHighlightColor) {
                cssStyle.setProperty('--tchmi-designer-control-snap-color', systemColorToRgba(settings.snapHighlightColor));
            }
            cssStyle.setProperty('--tchmi-designer-control-remote-snap-distance', settings.snapDistanceToControls * (rootControlManager?.getCreatorZoomFactor() ?? 1) + 'px');
            if (settings.theme?.ChessboardLight) {
                cssStyle.setProperty('--tchmi-designer-vs-theme-chessboard-light', systemColorToRgba(settings.theme.ChessboardLight));
            }
            if (settings.theme?.ChessboardDark) {
                cssStyle.setProperty('--tchmi-designer-vs-theme-chessboard-dark', systemColorToRgba(settings.theme.ChessboardDark));
            }
            let vsDarkTheme = false;
            if (settings.theme?.ThemeName) {
                vsDarkTheme = settings.theme.ThemeName === 'Dark';
            }
            else if (settings.theme?.ChessboardDark) {
                // Guess dark theme. Dark theme default has {"r": 26,"g": 26,"b": 26,"a": 255}
                vsDarkTheme =
                    (settings.theme.ChessboardDark.r ?? 246) < 100 &&
                        (settings.theme.ChessboardDark.g ?? 246) < 100 &&
                        (settings.theme.ChessboardDark.b ?? 246) < 100;
            }
            // StyleEngineering.css needs the current VS theme
            document.documentElement.classList.toggle('tchmi-visual-studio-dark', vsDarkTheme);
            if (!settings.theme?.ThemeName) {
                // We have an old creator with own scrollbars (before !32359, before 1.12.760.0)
                // No overflow in body to force disabled body scrollbars in designer! Designer browser window has to be big enough for handling the whole partial or we have two scrollbars
                document.body.style.overflow = 'hidden';
            }
        }
        /* ***************************************************************************
         *                       Adds Creator overlays
         *************************************************************************** */
        /**
         * Creates the element which is is used to highlight current position, selection etc.
         */
        createControlPosition(relatedControl, zindex) {
            let controlId = relatedControl.getId();
            let typeDisplayName = relatedControl.getType();
            let module = TcHmi.System.Data.Modules.controls.map.get(typeDisplayName);
            if (module && module.error === TcHmi.Errors.NONE && module.descriptionExpanded) {
                typeDisplayName = module.descriptionExpanded.displayName || '';
            }
            // All subelements needs data-tchmi-creator-target-control for __onHighlightMouseDown() if they should be useable for dragging
            let highlighterElement = this.__cloneSource.controlPosition.cloneNode(true);
            highlighterElement.setAttribute('data-tchmi-creator-target-control', controlId);
            highlighterElement.style.zIndex = zindex.toString();
            let child = highlighterElement.firstElementChild;
            /* Attention: we are in RTL mode! */
            child.title = controlId + ': ' + typeDisplayName;
            // Write the name inside the Bidirectional Isolate element
            child.firstElementChild.textContent = controlId;
            child.setAttribute('data-tchmi-creator-target-control', controlId); // Important ! As you can click on the name if a control is already selected to mark it as active control.
            return $(highlighterElement);
        }
        /*
         * Creates a hierarchical stack for the element which is is used to highlight current position, selection etc.
         */
        createHierarchyControlPosition(relatedControl, zindex) {
            let controlId = relatedControl.getId();
            let highlighterElement = this.__cloneSource.hierarchyControlPosition.cloneNode(true);
            highlighterElement.setAttribute('data-tchmi-creator-target-control', controlId);
            highlighterElement.style.zIndex = zindex.toString();
            return $(highlighterElement);
        }
        /**
         * Creates the element which is is used to highlight original position
         */
        createOriginalPosition(relatedControl, zindex) {
            let controlId = relatedControl.getId();
            let highlighterElement = this.__cloneSource.originalPosition.cloneNode(true);
            highlighterElement.setAttribute('data-tchmi-creator-target-control', controlId);
            highlighterElement.style.zIndex = zindex.toString();
            return $(highlighterElement);
        }
        /**
         * Creates the element which holds the resize anchor
         */
        createAnchorContainer(relatedControl, zindex, locked) {
            let controlId = relatedControl.getId();
            let highlighterElement = this.__cloneSource.anchorContainer.cloneNode(true);
            highlighterElement.setAttribute('data-tchmi-creator-target-control', controlId);
            highlighterElement.style.zIndex = zindex.toString();
            if (locked) {
                highlighterElement.classList.add('tchmi-creator-control-locked');
            }
            return $(highlighterElement);
        }
        /**
         * Creates a hierarchical stack  the element which holds the resize anchor
         */
        createHierarchyAnchorContainer(relatedControl, zindex, locked) {
            let controlId = relatedControl.getId();
            let highlighterElement = this.__cloneSource.hierarchyAnchorContainer.cloneNode(true);
            highlighterElement.setAttribute('data-tchmi-creator-target-control', controlId);
            highlighterElement.style.zIndex = zindex.toString();
            if (locked) {
                highlighterElement.classList.add('tchmi-creator-control-locked');
            }
            return $(highlighterElement);
        }
        /**
         * Creates/rebuilds row+cell container for all grid rows and cells for proper positioning the other control container
         * and appends it to the HighlightHierarchicalStack container
         * @param gridControl
         * @param ctrlParent
         */
        createGridHighlighter(gridControl, ctrlMeta) {
            if (!ctrlMeta) {
                // not initialized till now
                return;
            }
            // Property not known in base control
            if (!gridControl['__rowOptions']) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterHighlightManager] Grid control ' +
                    gridControl.getId() +
                    ' has invalid Row Options.');
                return;
            }
            // Property not known in base control
            if (!gridControl['__columnOptions']) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterHighlightManager] Grid control ' +
                    gridControl.getId() +
                    ' has invalid Column Options.');
                return;
            }
            const oldGridcells = ctrlMeta.jHierarchyControlposition.children('.tchmi-creator-hierarchy-gridcellposition');
            // Remove child control container which will be readded to DOM later from setContainerPositions or ctrlMeta creation
            oldGridcells.children().detach();
            // Remove current cell container
            oldGridcells.remove();
            ctrlMeta.jControlPosition.children('.tchmi-creator-gridcell').remove();
            let zIndexControlposition = TcHmi.StyleProvider.getSimpleElementStyle(ctrlMeta.jControlPosition, 'z-index');
            // Create new container
            let hierarchyGridcellpositionCollection = $();
            let gridcellCollection = $();
            let tempDiv = document.createElement('div');
            // Property not known in base control
            for (let i = 0; i < (gridControl['__rowOptions']?.length ?? 0); i++) {
                // Property not known in base control
                for (let j = 0; j < (gridControl['__columnOptions']?.length ?? 0); j++) {
                    tempDiv.innerHTML = `<div data-tchmi-creator-target-control="${gridControl.getId()}"
                                                class="tchmi-creator-hierarchy-gridcellposition tchmi-box"
                                                style="z-index:${zIndexControlposition['z-index']}"
                                                data-tchmi-creator-grid-rowindex="${i}" data-tchmi-creator-grid-cellindex="${j}">
                                                </div>`;
                    const hierarchyGridcell = $(tempDiv.firstElementChild);
                    hierarchyGridcellpositionCollection = hierarchyGridcellpositionCollection.add(hierarchyGridcell);
                    tempDiv.innerHTML = `<div data-tchmi-creator-target-control="${gridControl.getId()}"
                                                class="tchmi-creator-gridcell tchmi-box"
                                                style="z-index:${zIndexControlposition['z-index']}"
                                                data-tchmi-creator-grid-rowindex="${i}" data-tchmi-creator-grid-cellindex="${j}">
                                                </div>`;
                    const highlightGridcell = $(tempDiv.firstElementChild);
                    hierarchyManager.registerContainerElement(highlightGridcell);
                    gridcellCollection = gridcellCollection.add(highlightGridcell);
                }
            }
            // Add collections to the correct container
            ctrlMeta.jHierarchyControlposition.append(hierarchyGridcellpositionCollection);
            ctrlMeta.jControlPosition.append(gridcellCollection);
        }
    };
})();
export { DesignerModeMasterControlHighlightManager };
/** Runtime Manager */
export const highlightManager = new DesignerModeMasterControlHighlightManager();
//# sourceMappingURL=DesignerModeMasterControlHighlightMngr.js.map