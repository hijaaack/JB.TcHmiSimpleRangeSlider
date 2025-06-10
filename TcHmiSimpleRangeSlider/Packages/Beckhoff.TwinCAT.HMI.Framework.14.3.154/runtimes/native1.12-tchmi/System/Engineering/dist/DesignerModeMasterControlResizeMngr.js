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
import { metaDataManager, } from './DesignerModeControlMetaDataMngr.js';
import { interactionManager } from './DesignerModeMasterInteractionMngr.js';
import { rectSelectManager } from './DesignerModeMasterRectSelectMngr.js';
import { designerModeManager } from './DesignerModeManager.js';
import { highlightManager } from './DesignerModeMasterControlHighlightMngr.js';
import { rootControlManager } from './DesignerModeMasterRootControlMngr.js';
import { syncManager } from './DesignerModeMasterSyncManager.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
 * Handles control resizing in designer master.
 */
let DesignerModeMasterControlResizeManager = (() => {
    var _a, _b, _c;
    let _instanceExtraInitializers = [];
    let ___onAnchorMouseDown_decorators;
    let ___onAnchorMouseMove_decorators;
    let ___onAnchorMouseUp_decorators;
    return class DesignerModeMasterControlResizeManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onAnchorMouseDown_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            ___onAnchorMouseMove_decorators = [(_b = TcHmi).CallbackMethod.bind(_b)];
            ___onAnchorMouseUp_decorators = [(_c = TcHmi).CallbackMethod.bind(_c)];
            __esDecorate(this, null, ___onAnchorMouseDown_decorators, { kind: "method", name: "__onAnchorMouseDown", static: false, private: false, access: { has: obj => "__onAnchorMouseDown" in obj, get: obj => obj.__onAnchorMouseDown }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onAnchorMouseMove_decorators, { kind: "method", name: "__onAnchorMouseMove", static: false, private: false, access: { has: obj => "__onAnchorMouseMove" in obj, get: obj => obj.__onAnchorMouseMove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onAnchorMouseUp_decorators, { kind: "method", name: "__onAnchorMouseUp", static: false, private: false, access: { has: obj => "__onAnchorMouseUp" in obj, get: obj => obj.__onAnchorMouseUp }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Handles control resizing in designer master.
         */
        constructor() { }
        __anchorMouseMoveNs = (__runInitializers(this, _instanceExtraInitializers), 'mousemove.DesignerModeManager.AnchorMouseMove');
        __anchorMouseUpNs = 'mouseup.DesignerModeManager.AnchorMouseUp';
        __anchorMouseDownNs = 'mousedown.DesignerModeManager.AnchorMouseDown';
        /**
         * Disallow resizing of a control
         */
        __lockControlResize = false;
        /**
         * True while control anchors are hanging on the mouse on resize
         */
        __controlResizing = false;
        /**
         * The active control is the direct target of the mouse interaction
         */
        __activeControl = null;
        /**
         * Register mouse interaction for control resizing
         * @param ctrlMeta
         */
        registerControl(ctrlMeta) {
            ctrlMeta.jAnchorContainer
                .children('.tchmi-creator-anchor-rect')
                .on(this.__anchorMouseDownNs, this.__onAnchorMouseDown);
        }
        /* ***************************************************************************
                        getter and setter
                    *************************************************************************** */
        /** true while control anchors are hanging on the mouse on resize */
        getControlResizing() {
            return this.__controlResizing;
        }
        /** Disallow resizing of a control */
        lockControlResize() {
            this.__lockControlResize = true;
        }
        /* ***************************************************************************
                        Mouse down/move/up handling on anchors aka resize
                    *************************************************************************** */
        /**
         * Finds current anchors and adds mousemove + mouseup handlers
         */
        __onAnchorMouseDown(event) {
            //printDebugstate('__onAnchorMouseDown');
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            if (event.which !== 1) {
                // Leave callback if event is not related to left mouse
                return;
            }
            let targetControl = $(event.target).parent().attr('data-tchmi-creator-target-control');
            if (!targetControl) {
                return;
            }
            this.__activeControl = metaDataManager.getControlMetaData(targetControl);
            if (this.__activeControl === null) {
                return;
            }
            const anchor = $(event.target).attr('data-tchmi-creator-anchor-name');
            interactionManager.setAnchorName(anchor);
            if (!anchor) {
                return;
            }
            interactionManager.handleInteractionStart(event, this.__activeControl);
            this.__lockControlResize = false;
            TcHmi.System.SharedResources.jqDocument.on(this.__anchorMouseMoveNs, this.__onAnchorMouseMove);
            TcHmi.System.SharedResources.jqDocument.on(this.__anchorMouseUpNs, this.__onAnchorMouseUp);
        }
        __onAnchorMouseMove(event) {
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            //printDebugstate('__onAnchorMouseMove');
            if (this.__activeControl === null) {
                return;
            }
            if (rectSelectManager.getRectSelecting()) {
                return;
            }
            if (this.__lockControlResize) {
                return;
            }
            const activeAnchor = interactionManager.getAnchorName();
            if (!activeAnchor) {
                return;
            }
            if (event.which !== 1) {
                // Error state: Prevent hanging controls with no mouse down
                TcHmi.System.SharedResources.jqDocument.off(this.__anchorMouseMoveNs);
                TcHmi.System.SharedResources.jqDocument.off(this.__anchorMouseUpNs);
                this.__controlResizing = false;
                rectSelectManager.resetState();
                return;
            }
            let iterateMeta = this.__activeControl;
            do {
                if (iterateMeta.locked) {
                    // Do not resize a locked control
                    // Probably not be possible because the anchors are hidden
                    return;
                }
                iterateMeta = iterateMeta.parent;
            } while (iterateMeta);
            this.__controlResizing = true;
            rectSelectManager.lockRectSelect();
            const startMousePosition = interactionManager.getStartMousePos();
            const positionInsideControl = interactionManager.getPositionInsideControl();
            const deltaLeft = event.pageX - startMousePosition.left;
            let deltaTop = event.pageY - startMousePosition.top;
            let snapControls = !event.altKey;
            if (event.shiftKey === true && positionInsideControl.width !== 0) {
                // Keep initialAspectRatio
                if (activeAnchor === 'TopLeft' || activeAnchor === 'BottomRight') {
                    deltaTop = deltaLeft * (positionInsideControl.height / positionInsideControl.width);
                    // Current snapping approach does not support keeping aspect ratio
                    snapControls = false;
                }
                else if (activeAnchor === 'TopRight' || activeAnchor === 'BottomLeft') {
                    deltaTop = -deltaLeft * (positionInsideControl.height / positionInsideControl.width);
                    // Current snapping approach does not support keeping aspect ratio
                    snapControls = false;
                }
            }
            const creatorZoomFactor = rootControlManager.getCreatorZoomFactor();
            const selectedControlsMeta = metaDataManager.getSelectedControlsMetaData();
            const snappedDelta = interactionManager.handleSnapping(this.__activeControl, { left: deltaLeft / creatorZoomFactor, top: deltaTop / creatorZoomFactor }, { left: event.pageX, top: event.pageY }, snapControls, 'none');
            for (let id in selectedControlsMeta) {
                const ctrlMeta = selectedControlsMeta[id];
                this.__processResize(ctrlMeta, snappedDelta, activeAnchor);
                if (ctrlMeta.isPartialRoot) {
                    rootControlManager.setCreatorViewPortPosition(TcHmi.Controls.get(ctrlMeta.id));
                }
            }
        }
        /**
         * Resizes all selected Controls by delta x/y
         * @param anchorType Name of the manipulated Anchor
         * @param delta Distance of xy mouse movement since start of drag in normalised/zoom corrected coordinates
         */
        __processResize(ctrlMeta, delta, anchor) {
            if (!ctrlMeta.controlAttributeDimension ||
                ctrlMeta.absoluteParentRotation === undefined ||
                ctrlMeta.relativeControlRotation === undefined) {
                return;
            }
            let iterateMeta = ctrlMeta;
            let breakLoop = false;
            do {
                if (iterateMeta.locked) {
                    breakLoop = true;
                    break;
                }
                iterateMeta = iterateMeta.parent;
            } while (iterateMeta);
            if (breakLoop) {
                // do not resize a locked control
                return;
            }
            const tco = TcHmi.Controls.get(ctrlMeta.id);
            if (!tco) {
                return;
            }
            let transDeltaTop = Math.sin((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * delta.left +
                Math.cos((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * delta.top;
            let transDeltaLeft = Math.cos((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * delta.left +
                Math.sin((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * delta.top;
            /** New dimension of rectangle. Could be negative width/height if user dragged too far. */
            const ctrlRect = this.__getResizedRect(ctrlMeta, anchor, transDeltaLeft, transDeltaTop);
            let newStyle = {};
            /** Prevents moving the control */
            if (ctrlRect.heightValue !== null && ctrlRect.heightMode === 'Value') {
                newStyle['height'] = ctrlRect.heightValue + ctrlRect.heightUnit;
            }
            if (ctrlRect.widthValue !== null && ctrlRect.widthMode === 'Value') {
                newStyle['width'] = ctrlRect.widthValue + ctrlRect.widthUnit;
            }
            if (ctrlRect.leftValue !== null) {
                newStyle['left'] = ctrlRect.leftValue + ctrlRect.leftUnit;
            }
            if (ctrlRect.topValue !== null) {
                newStyle['top'] = ctrlRect.topValue + ctrlRect.topUnit;
            }
            if (ctrlRect.rightValue !== null) {
                newStyle['right'] = ctrlRect.rightValue + ctrlRect.rightUnit;
            }
            if (ctrlRect.bottomValue !== null) {
                newStyle['bottom'] = ctrlRect.bottomValue + ctrlRect.bottomUnit;
            }
            if (ctrlRect.leftValue === null && ctrlRect.rightValue === null) {
                newStyle['left'] = '0';
            }
            if (ctrlRect.topValue === null && ctrlRect.bottomValue === null) {
                newStyle['top'] = '0';
            }
            TcHmi.StyleProvider.setSimpleElementStyle(tco.getElement(), newStyle);
            metaDataManager.addChangedControlsMetaData(ctrlMeta);
            /*
                        TcHmi.Log.debug('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterControlResizeMngr] Changed top ' + ctrlMeta.resizeStartRect.topValue + ' to ' + ctrlRect.topValue +
                            '; right ' + ctrlMeta.resizeStartRect.rightValue + ' to ' + ctrlRect.rightValue +
                            '; width ' + ctrlMeta.resizeStartRect.width + ' to ' + ctrlRect.width +
                            '; height ' + ctrlMeta.resizeStartRect.height + ' to ' + ctrlRect.heightValue +
                            '; left ' + ctrlMeta.resizeStartRect.leftValue + ' to ' + ctrlRect.leftValue +
                            '; bottom ' + ctrlMeta.resizeStartRect.bottomValue + ' to ' + ctrlRect.bottomValue
                        );
                        */
            // update gridcell container and control container when we are inside a grid
            const tcoParent = tco.getParent();
            if (tcoParent && ctrlMeta.parent && ctrlMeta.parent.isGridControl) {
                highlightManager.setContainerPositions(new Set([tcoParent]));
            }
            const ctrlList = [];
            ctrlList.push(tco);
            const activeControl = TcHmi.Controls.get(this.__activeControl?.id);
            if (this.__activeControl !== null && activeControl !== undefined) {
                // Move child controls selection container relative to current offset of the target control element.
                const hierarchyRecursion = function DesignerModeManager_processResize_hierarchyRecursion(h) {
                    if (!h.ctrl.getIsContainerControl()) {
                        return;
                    }
                    for (let j = 0, jj = h.children_hierarchy.length; j < jj; j++) {
                        const childHierarchy = h.children_hierarchy[j];
                        ctrlList.push(childHierarchy.ctrl);
                        hierarchyRecursion(childHierarchy);
                    }
                };
                if (activeControl) {
                    const hierarchy = TcHmi.System.resolveControlHierarchy(activeControl, null);
                    hierarchyRecursion(hierarchy);
                    highlightManager.setContainerPositions(new Set(ctrlList));
                }
            }
            metaDataManager.addChangedControlsMetaData(ctrlMeta);
        }
        /**
         * Calculate the resize rect offset with respect to rotation (in radians).
         * @param startWidth
         * @param startHeight
         * @param deltaWidth
         * @param deltaHeight
         * @param angle in radians
         */
        __getResizedRectRotationOffset(startWidth, startHeight, deltaWidth, deltaHeight, radians, sin, cos) {
            if (radians === 0) {
                return { left: 0, top: 0 };
            }
            if (sin === undefined || sin === null) {
                sin = Math.sin(radians);
            }
            if (cos === undefined || cos === null) {
                cos = Math.cos(radians);
            }
            const startWidthNum = startWidth ?? 0;
            const startHeightNum = startHeight ?? 0;
            // Position after rotation with original size
            let xOrig = -startWidthNum / 2;
            let yOrig = startHeightNum / 2;
            let xNewOrig = yOrig * sin + xOrig * cos;
            let yNewOrig = yOrig * cos - xOrig * sin;
            let leftOrig = xNewOrig - xOrig;
            let topOrig = yNewOrig - yOrig;
            // New size
            let width = startWidthNum + deltaWidth;
            let height = startHeightNum + deltaHeight;
            // Position after rotation with new size
            let xRot = -width / 2;
            let yRot = height / 2;
            let xNewRot = yRot * sin + xRot * cos;
            let yNewRot = yRot * cos - xRot * sin;
            let leftRot = xNewRot - xRot;
            let topRot = yNewRot - yRot;
            let left = leftRot - leftOrig;
            let top = topRot - topOrig;
            return { left: left, top: top };
        }
        /**
         * Resize a control based on a specific anchor.
         * Does add missing dimensions in some cases for example left and top is defined and nothing else
         * and you start resizing in bottom direction height will be created.
         * @param ctrlMeta Metadata of the control and its designer container
         * @param anchorType
         * @param deltaLeft Left delta moved with mouse
         * @param deltaTop Top delta moved with mouse
         */
        __getResizedRect(ctrlMeta, anchorType, deltaLeft, deltaTop) {
            if (!ctrlMeta.controlAttributeDimension ||
                !ctrlMeta.controlCssPixelDimension ||
                ctrlMeta.absoluteParentRotation === undefined ||
                ctrlMeta.relativeControlRotation === undefined) {
                return ctrlMeta.controlAttributeDimension /* We are called DESIGNER only so it is ok to fake */;
            }
            /** In degree */
            const angle = ctrlMeta.relativeControlRotation;
            let parentPixelHeight;
            let parentPixelWidth;
            /** Pixel distance from the mouse to the bounding box of the active control and its size in viewport pixels */
            let positionInsideControl;
            if (ctrlMeta.isPartialRoot) {
                const viewPortContainer = rootControlManager.getViewPortSimulator();
                parentPixelHeight = viewPortContainer.offsetHeight;
                parentPixelWidth = viewPortContainer.offsetWidth;
                positionInsideControl = interactionManager.getPositionInsideControl();
            }
            else {
                parentPixelHeight = ctrlMeta.jControlPosition.parent().outerHeight() ?? 1;
                parentPixelWidth = ctrlMeta.jControlPosition.parent().outerWidth() ?? 1;
                positionInsideControl = {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                };
            }
            let resizedRect = tchmi_clone_object(ctrlMeta.controlAttributeDimension);
            const radians = (angle * Math.PI) / 180;
            const sinAlpha = Math.sin(radians);
            const cosAlpha = Math.cos(radians);
            let deltaHeight = -sinAlpha * deltaLeft + cosAlpha * deltaTop;
            let deltaWidth = cosAlpha * deltaLeft + sinAlpha * deltaTop;
            let offset;
            //console.log('angle:' + angle + ', radians:' + radians + ', sin:' + sinAlpha, ', cos: ' + cosAlpha + ', deltaWidth: ' + deltaWidth + ', deltaHeight: ' + deltaHeight + ', zoom: ' + creatorZoomFactor + ', resizedRect: ' + JSON.stringify(resizedRect));
            // Important ! Keep in mind that all attributes (left,top,right,bottom) are affected on resize if a control is transformed
            switch (anchorType) {
                case 'TopLeft':
                    // ---------------------------------------------------
                    // Preliminary work
                    // Calculate offset for rotation transform
                    offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                    //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.widthValue !== null) {
                        // Prepare: minWidth / maxWith
                        // Fix width related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = resizedRect.maxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue > translatedMaxWidthValue) {
                                    resizedRect.widthValue = translatedMaxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = (resizedRect.maxWidthValue / parentPixelWidth) * 100; // Force width to maxWidth if its above maxWidth
                                }
                            }
                        }
                        // Fix width related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = resizedRect.minWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue < translatedMinWidthValue) {
                                    resizedRect.widthValue = translatedMinWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = (resizedRect.minWidthValue / parentPixelWidth) * 100; // Force width to minWidth if width is below minWidth
                                }
                            }
                        }
                        // Force deltaWith related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue - deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.widthValue - resizedRect.maxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue - deltaWidth >= translatedMaxWidthValue) {
                                    deltaWidth = resizedRect.widthValue - translatedMaxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue - deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = translatedWidthValue - resizedRect.maxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                        }
                        // Force deltaWith related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue - deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.widthValue - resizedRect.minWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue - deltaWidth <= translatedMinWidthValue) {
                                    deltaWidth = resizedRect.widthValue - translatedMinWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue - deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = translatedWidthValue - resizedRect.minWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                        }
                        if (resizedRect.widthUnit !== '%') {
                            if (resizedRect.widthValue - deltaWidth <= 0) {
                                deltaWidth = resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        else {
                            if (resizedRect.widthValue - (deltaWidth * 100) / parentPixelWidth <= 0) {
                                deltaWidth = resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.widthValue === null &&
                        resizedRect.leftValue !== null &&
                        resizedRect.rightValue !== null) {
                        let dummyLeft = resizedRect.leftValue;
                        if (resizedRect.leftUnit !== '%') {
                            dummyLeft += -(offset.left - deltaWidth);
                        }
                        else {
                            dummyLeft += (-(offset.left - deltaWidth) * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyLeft = parentPixelWidth * (dummyLeft / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyRight = resizedRect.rightValue;
                        if (resizedRect.rightUnit !== '%') {
                            dummyRight += offset.left;
                        }
                        else {
                            dummyRight += (offset.left * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyRight = parentPixelWidth * (dummyRight / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        if (dummyLeft + dummyRight >= parentPixelWidth) {
                            deltaWidth = ctrlMeta.controlCssPixelDimension.width ?? 0; // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.heightValue !== null) {
                        // Prepare: minHeight / maxHeight
                        // Fix height related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = resizedRect.maxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue > translatedMaxHeightValue) {
                                    resizedRect.heightValue = translatedMaxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = (resizedRect.maxHeightValue / parentPixelHeight) * 100; // Force height to maxHeight if its above maxHeight
                                }
                            }
                        }
                        // Fix height related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = resizedRect.minHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue < translatedMinHeightValue) {
                                    resizedRect.heightValue = translatedMinHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = (resizedRect.minHeightValue / parentPixelHeight) * 100; // Force height to minHeight if height is below minHeight
                                }
                            }
                        }
                        // Force deltaHeight related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue - deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = resizedRect.heightValue - resizedRect.maxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue - deltaHeight >= translatedMaxHeightValue) {
                                    deltaHeight = resizedRect.heightValue - translatedMaxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue - deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = translatedHeightValue - resizedRect.maxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                        }
                        // Force deltaHeight related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue - deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = resizedRect.heightValue - resizedRect.minHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue - deltaHeight <= translatedMinHeightValue) {
                                    deltaHeight = resizedRect.heightValue - translatedMinHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue - deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = translatedHeightValue - resizedRect.minHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                        }
                        if (resizedRect.heightUnit !== '%') {
                            if (resizedRect.heightValue - deltaHeight <= 0) {
                                deltaHeight = resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        else {
                            if ((-deltaHeight * 100) / parentPixelHeight <= 0) {
                                deltaHeight = resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.heightValue === null &&
                        resizedRect.topValue !== null &&
                        resizedRect.bottomValue !== null) {
                        let dummyTop = resizedRect.topValue;
                        if (resizedRect.topUnit !== '%') {
                            dummyTop += -(-offset.top - deltaHeight);
                        }
                        else {
                            dummyTop += (-(-offset.top - deltaHeight) * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyTop = parentPixelHeight * (dummyTop / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyBottom = resizedRect.bottomValue;
                        if (resizedRect.bottomUnit !== '%') {
                            dummyBottom += -offset.top;
                        }
                        else {
                            dummyBottom += (-offset.top * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyBottom = parentPixelHeight * (dummyBottom / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        // Check if height of element will be < 0 based on pixel values
                        if (dummyTop + dummyBottom >= parentPixelHeight) {
                            deltaHeight = ctrlMeta.controlCssPixelDimension.height ?? 0; // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // ---------------------------------------------------
                    // Process position attributes
                    if (resizedRect.widthValue !== null) {
                        if (resizedRect.widthUnit !== '%') {
                            resizedRect.widthValue += -deltaWidth;
                        }
                        else {
                            resizedRect.widthValue += (-deltaWidth * 100) / parentPixelWidth;
                        }
                    }
                    else {
                        if ((resizedRect.leftValue === null && resizedRect.rightValue !== null) ||
                            (resizedRect.leftValue !== null && resizedRect.rightValue === null)) {
                            if (resizedRect.widthUnit !== '%') {
                                resizedRect.widthValue = (ctrlMeta.controlCssPixelDimension.width ?? 0) - deltaWidth;
                            }
                            else {
                                resizedRect.widthValue =
                                    ((ctrlMeta.controlCssPixelDimension.width ?? 0) / parentPixelWidth) * 100 -
                                        (deltaWidth * 100) / parentPixelWidth;
                            }
                        }
                    }
                    if (resizedRect.heightValue !== null) {
                        if (resizedRect.heightUnit !== '%') {
                            resizedRect.heightValue += -deltaHeight;
                        }
                        else {
                            resizedRect.heightValue += (-deltaHeight * 100) / parentPixelHeight;
                        }
                    }
                    else {
                        if ((resizedRect.topValue === null && resizedRect.bottomValue !== null) ||
                            (resizedRect.topValue !== null && resizedRect.bottomValue === null)) {
                            if (resizedRect.heightUnit !== '%') {
                                resizedRect.heightValue = (ctrlMeta.controlCssPixelDimension.height ?? 0) - deltaHeight;
                            }
                            else {
                                resizedRect.heightValue =
                                    ((ctrlMeta.controlCssPixelDimension.height ?? 0) / parentPixelHeight) * 100 -
                                        (deltaHeight * 100) / parentPixelHeight;
                            }
                        }
                    }
                    if (resizedRect.leftValue !== null) {
                        if (resizedRect.leftUnit !== '%') {
                            resizedRect.leftValue += -(offset.left - deltaWidth);
                        }
                        else {
                            resizedRect.leftValue += (-(offset.left - deltaWidth) * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.topValue !== null) {
                        if (resizedRect.topUnit !== '%') {
                            resizedRect.topValue += -(-offset.top - deltaHeight);
                        }
                        else {
                            resizedRect.topValue += (-(-offset.top - deltaHeight) * 100) / parentPixelHeight;
                        }
                    }
                    if (resizedRect.rightValue !== null) {
                        if (resizedRect.rightUnit !== '%') {
                            resizedRect.rightValue += offset.left;
                        }
                        else {
                            resizedRect.rightValue += (offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.bottomValue !== null) {
                        if (resizedRect.bottomUnit !== '%') {
                            resizedRect.bottomValue += -offset.top;
                        }
                        else {
                            resizedRect.bottomValue += (-offset.top * 100) / parentPixelHeight;
                        }
                    }
                    break;
                case 'TopCenter':
                    // ---------------------------------------------------
                    // Preliminary work
                    // Calculate offset for rotation transform
                    offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, 0, deltaHeight, radians, sinAlpha, cosAlpha);
                    //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.heightValue !== null) {
                        // Prepare: minHeight / maxHeight
                        // Fix height related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = resizedRect.maxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue > translatedMaxHeightValue) {
                                    resizedRect.heightValue = translatedMaxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = (resizedRect.maxHeightValue / parentPixelHeight) * 100; // Force height to maxHeight if its above maxHeight
                                }
                            }
                        }
                        // Fix height related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = resizedRect.minHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue < translatedMinHeightValue) {
                                    resizedRect.heightValue = translatedMinHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = (resizedRect.minHeightValue / parentPixelHeight) * 100; // Force height to minHeight if height is below minHeight
                                }
                            }
                        }
                        // Force deltaHeight related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue - deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = resizedRect.heightValue - resizedRect.maxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue - deltaHeight >= translatedMaxHeightValue) {
                                    deltaHeight = resizedRect.heightValue - translatedMaxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue - deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = translatedHeightValue - resizedRect.maxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                        }
                        // Force deltaHeight related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue - deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = resizedRect.heightValue - resizedRect.minHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue - deltaHeight <= translatedMinHeightValue) {
                                    deltaHeight = resizedRect.heightValue - translatedMinHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue - deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = translatedHeightValue - resizedRect.minHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                        }
                        if (resizedRect.heightUnit !== '%') {
                            if (resizedRect.heightValue - deltaHeight <= 0) {
                                deltaHeight = resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        else {
                            if ((-deltaHeight * 100) / parentPixelHeight <= 0) {
                                deltaHeight = resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, 0, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.heightValue === null &&
                        resizedRect.topValue !== null &&
                        resizedRect.bottomValue !== null) {
                        let dummyTop = resizedRect.topValue;
                        if (resizedRect.topUnit !== '%') {
                            dummyTop += -offset.top + cosAlpha * deltaHeight;
                        }
                        else {
                            dummyTop += ((-offset.top + cosAlpha * deltaHeight) * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyTop = parentPixelHeight * (dummyTop / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyBottom = resizedRect.bottomValue;
                        if (resizedRect.bottomUnit !== '%') {
                            dummyBottom += -offset.top;
                        }
                        else {
                            dummyBottom += (-offset.top * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyBottom = parentPixelHeight * (dummyBottom / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        // Check if height of element will be < 0 based on pixel values
                        if (dummyTop + dummyBottom >= parentPixelHeight) {
                            deltaHeight = ctrlMeta.controlCssPixelDimension.height ?? 0; // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, 0, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // ---------------------------------------------------
                    // Process position attributes
                    if (resizedRect.heightValue !== null) {
                        if (resizedRect.heightUnit !== '%') {
                            resizedRect.heightValue += -deltaHeight;
                        }
                        else {
                            resizedRect.heightValue += (-deltaHeight * 100) / parentPixelHeight;
                        }
                    }
                    else {
                        if ((resizedRect.topValue === null && resizedRect.bottomValue !== null) ||
                            (resizedRect.topValue !== null && resizedRect.bottomValue === null)) {
                            if (resizedRect.heightUnit !== '%') {
                                resizedRect.heightValue = (ctrlMeta.controlCssPixelDimension.height ?? 0) - deltaHeight;
                            }
                            else {
                                resizedRect.heightValue =
                                    ((ctrlMeta.controlCssPixelDimension.height ?? 0) / parentPixelHeight) * 100 -
                                        (deltaHeight * 100) / parentPixelHeight;
                            }
                        }
                    }
                    if (resizedRect.leftValue !== null) {
                        if (resizedRect.leftUnit !== '%') {
                            resizedRect.leftValue += -(-offset.left + sinAlpha * deltaHeight);
                        }
                        else {
                            resizedRect.leftValue += (-(-offset.left + sinAlpha * deltaHeight) * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.topValue !== null) {
                        if (resizedRect.topUnit !== '%') {
                            resizedRect.topValue += -offset.top + cosAlpha * deltaHeight;
                        }
                        else {
                            resizedRect.topValue += ((-offset.top + cosAlpha * deltaHeight) * 100) / parentPixelHeight;
                        }
                    }
                    if (resizedRect.rightValue !== null) {
                        if (resizedRect.rightUnit !== '%') {
                            resizedRect.rightValue += offset.left;
                        }
                        else {
                            resizedRect.rightValue += (offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.bottomValue !== null) {
                        if (resizedRect.bottomUnit !== '%') {
                            resizedRect.bottomValue += -offset.top;
                        }
                        else {
                            resizedRect.bottomValue += (-offset.top * 100) / parentPixelHeight;
                        }
                    }
                    break;
                case 'TopRight':
                    // ---------------------------------------------------
                    // Preliminary work
                    // Calculate offset for rotation transform
                    offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                    //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.widthValue !== null) {
                        // Prepare: minWidth / maxWith
                        // Fix width related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = resizedRect.maxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue > translatedMaxWidthValue) {
                                    resizedRect.widthValue = translatedMaxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = (resizedRect.maxWidthValue / parentPixelWidth) * 100; // Force width to maxWidth if its above maxWidth
                                }
                            }
                        }
                        // Fix width related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = resizedRect.minWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue < translatedMinWidthValue) {
                                    resizedRect.widthValue = translatedMinWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = (resizedRect.minWidthValue / parentPixelWidth) * 100; // Force width to minWidth if width is below minWidth
                                }
                            }
                        }
                        // Force deltaWith related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue + deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.maxWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue + deltaWidth >= translatedMaxWidthValue) {
                                    deltaWidth = translatedMaxWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue + deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.maxWidthValue - translatedWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                        }
                        // Force deltaWith related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue + deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.minWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue + deltaWidth <= translatedMinWidthValue) {
                                    deltaWidth = translatedMinWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue + deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.minWidthValue - translatedWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                        }
                        if (resizedRect.widthUnit !== '%') {
                            if (resizedRect.widthValue + deltaWidth <= 0) {
                                deltaWidth = -resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        else {
                            if (resizedRect.widthValue + (deltaWidth * 100) / parentPixelWidth <= 0) {
                                deltaWidth = -resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.widthValue === null &&
                        resizedRect.leftValue !== null &&
                        resizedRect.rightValue !== null) {
                        let dummyLeft = resizedRect.leftValue;
                        if (resizedRect.leftUnit !== '%') {
                            dummyLeft += -offset.left;
                        }
                        else {
                            dummyLeft += (-offset.left * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyLeft = parentPixelWidth * (dummyLeft / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyRight = resizedRect.rightValue;
                        if (resizedRect.rightUnit !== '%') {
                            dummyRight += -(-offset.left + deltaWidth);
                        }
                        else {
                            dummyRight += (-(-offset.left + deltaWidth) * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyRight = parentPixelWidth * (dummyRight / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        if (dummyLeft + dummyRight >= parentPixelWidth) {
                            deltaWidth = -(ctrlMeta.controlCssPixelDimension.width ?? 0); // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.heightValue !== null) {
                        // Prepare: minHeight / maxHeight
                        // Fix height related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = resizedRect.maxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue > translatedMaxHeightValue) {
                                    resizedRect.heightValue = translatedMaxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = (resizedRect.maxHeightValue / parentPixelHeight) * 100; // Force height to maxHeight if its above maxHeight
                                }
                            }
                        }
                        // Fix height related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = resizedRect.minHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue < translatedMinHeightValue) {
                                    resizedRect.heightValue = translatedMinHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = (resizedRect.minHeightValue / parentPixelHeight) * 100; // Force height to minHeight if height is below minHeight
                                }
                            }
                        }
                        // Force deltaHeight related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue - deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = resizedRect.heightValue - resizedRect.maxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue - deltaHeight >= translatedMaxHeightValue) {
                                    deltaHeight = resizedRect.heightValue - translatedMaxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue - deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = translatedHeightValue - resizedRect.maxHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                        }
                        // Force deltaHeight related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue - deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = resizedRect.heightValue - resizedRect.minHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue - deltaHeight <= translatedMinHeightValue) {
                                    deltaHeight = resizedRect.heightValue - translatedMinHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue - deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = translatedHeightValue - resizedRect.minHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                        }
                        if (resizedRect.heightUnit !== '%') {
                            if (resizedRect.heightValue - deltaHeight <= 0) {
                                deltaHeight = resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        else {
                            if ((-deltaHeight * 100) / parentPixelHeight <= 0) {
                                deltaHeight = resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.heightValue === null &&
                        resizedRect.topValue !== null &&
                        resizedRect.bottomValue !== null) {
                        let dummyTop = resizedRect.topValue;
                        if (resizedRect.topUnit !== '%') {
                            dummyTop += -(-offset.top - deltaHeight);
                        }
                        else {
                            dummyTop += (-(-offset.top - deltaHeight) * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyTop = parentPixelHeight * (dummyTop / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyBottom = resizedRect.bottomValue;
                        if (resizedRect.bottomUnit !== '%') {
                            dummyBottom += -offset.top;
                        }
                        else {
                            dummyBottom += (-offset.top * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyBottom = parentPixelHeight * (dummyBottom / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        // Check if height of element will be < 0 based on pixel values
                        if (dummyTop + dummyBottom >= parentPixelHeight) {
                            deltaHeight = ctrlMeta.controlCssPixelDimension.height ?? 0; // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // ---------------------------------------------------
                    // Process position attributes
                    if (resizedRect.widthValue !== null) {
                        if (resizedRect.widthUnit !== '%') {
                            resizedRect.widthValue += deltaWidth;
                        }
                        else {
                            resizedRect.widthValue += (deltaWidth * 100) / parentPixelWidth;
                        }
                    }
                    else {
                        if ((resizedRect.leftValue === null && resizedRect.rightValue !== null) ||
                            (resizedRect.leftValue !== null && resizedRect.rightValue === null)) {
                            if (resizedRect.widthUnit !== '%') {
                                resizedRect.widthValue = (ctrlMeta.controlCssPixelDimension.width ?? 0) + deltaWidth;
                            }
                            else {
                                resizedRect.widthValue =
                                    ((ctrlMeta.controlCssPixelDimension.width ?? 0) / parentPixelWidth) * 100 +
                                        (deltaWidth * 100) / parentPixelWidth;
                            }
                        }
                    }
                    if (resizedRect.heightValue !== null) {
                        if (resizedRect.heightUnit !== '%') {
                            resizedRect.heightValue += -deltaHeight;
                        }
                        else {
                            resizedRect.heightValue += (-deltaHeight * 100) / parentPixelHeight;
                        }
                    }
                    else {
                        if ((resizedRect.topValue === null && resizedRect.bottomValue !== null) ||
                            (resizedRect.topValue !== null && resizedRect.bottomValue === null)) {
                            if (resizedRect.heightUnit !== '%') {
                                resizedRect.heightValue = (ctrlMeta.controlCssPixelDimension.height ?? 0) + deltaHeight;
                            }
                            else {
                                resizedRect.heightValue =
                                    ((ctrlMeta.controlCssPixelDimension.height ?? 0) / parentPixelHeight) * 100 +
                                        (deltaHeight * 100) / parentPixelHeight;
                            }
                        }
                    }
                    if (resizedRect.leftValue !== null) {
                        if (resizedRect.leftUnit !== '%') {
                            resizedRect.leftValue += -offset.left;
                        }
                        else {
                            resizedRect.leftValue += (-offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.topValue !== null) {
                        if (resizedRect.topUnit !== '%') {
                            resizedRect.topValue += -(-offset.top - deltaHeight);
                        }
                        else {
                            resizedRect.topValue += (-(-offset.top - deltaHeight) * 100) / parentPixelHeight;
                        }
                    }
                    if (resizedRect.rightValue !== null) {
                        if (resizedRect.rightUnit !== '%') {
                            resizedRect.rightValue += -(-offset.left + deltaWidth);
                        }
                        else {
                            resizedRect.rightValue += (-(-offset.left + deltaWidth) * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.bottomValue !== null) {
                        if (resizedRect.bottomUnit !== '%') {
                            resizedRect.bottomValue += -offset.top;
                        }
                        else {
                            resizedRect.bottomValue += (-offset.top * 100) / parentPixelHeight;
                        }
                    }
                    break;
                case 'CenterLeft':
                    // ---------------------------------------------------
                    // Preliminary work
                    // Calculate offset for rotation transform
                    offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, 0, radians, sinAlpha, cosAlpha);
                    //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.widthValue !== null) {
                        // Prepare: minWidth / maxWith
                        // Fix width related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = resizedRect.maxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue > translatedMaxWidthValue) {
                                    resizedRect.widthValue = translatedMaxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = (resizedRect.maxWidthValue / parentPixelWidth) * 100; // Force width to maxWidth if its above maxWidth
                                }
                            }
                        }
                        // Fix width related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = resizedRect.minWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue < translatedMinWidthValue) {
                                    resizedRect.widthValue = translatedMinWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = (resizedRect.minWidthValue / parentPixelWidth) * 100; // Force width to minWidth if width is below minWidth
                                }
                            }
                        }
                        // Force deltaWith related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue - deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.widthValue - resizedRect.maxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue - deltaWidth >= translatedMaxWidthValue) {
                                    deltaWidth = resizedRect.widthValue - translatedMaxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue - deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = translatedWidthValue - resizedRect.maxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                        }
                        // Force deltaWith related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue - deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.widthValue - resizedRect.minWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue - deltaWidth <= translatedMinWidthValue) {
                                    deltaWidth = resizedRect.widthValue - translatedMinWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue - deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = translatedWidthValue - resizedRect.minWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                        }
                        if (resizedRect.widthUnit !== '%') {
                            if (resizedRect.widthValue - deltaWidth <= 0) {
                                deltaWidth = resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 width
                            }
                        }
                        else {
                            if (resizedRect.widthValue - (deltaWidth * 100) / parentPixelWidth <= 0) {
                                deltaWidth = resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 width
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, 0, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.widthValue === null &&
                        resizedRect.leftValue !== null &&
                        resizedRect.rightValue !== null) {
                        let dummyLeft = resizedRect.leftValue;
                        if (resizedRect.leftUnit !== '%') {
                            dummyLeft += offset.left + cosAlpha * deltaWidth;
                        }
                        else {
                            dummyLeft += ((offset.left + cosAlpha * deltaWidth) * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyLeft = parentPixelWidth * (dummyLeft / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyRight = resizedRect.rightValue;
                        if (resizedRect.rightUnit !== '%') {
                            dummyRight += offset.left;
                        }
                        else {
                            dummyRight += (offset.left * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyRight = parentPixelWidth * (dummyRight / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        if (dummyLeft + dummyRight >= parentPixelWidth) {
                            deltaWidth = ctrlMeta.controlCssPixelDimension.width ?? 0; // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, 0, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // ---------------------------------------------------
                    // Process position attributes
                    if (resizedRect.widthValue !== null) {
                        if (resizedRect.widthUnit !== '%') {
                            resizedRect.widthValue += -deltaWidth;
                        }
                        else {
                            resizedRect.widthValue += (-deltaWidth * 100) / parentPixelWidth;
                        }
                    }
                    else {
                        if ((resizedRect.leftValue === null && resizedRect.rightValue !== null) ||
                            (resizedRect.leftValue !== null && resizedRect.rightValue === null)) {
                            if (resizedRect.widthUnit !== '%') {
                                resizedRect.widthValue = (ctrlMeta.controlCssPixelDimension.width ?? 0) - deltaWidth;
                            }
                            else {
                                resizedRect.widthValue =
                                    ((ctrlMeta.controlCssPixelDimension.width ?? 0) / parentPixelWidth) * 100 -
                                        (deltaWidth * 100) / parentPixelWidth;
                            }
                        }
                    }
                    if (resizedRect.leftValue !== null) {
                        if (resizedRect.leftUnit !== '%') {
                            resizedRect.leftValue += offset.left + cosAlpha * deltaWidth;
                        }
                        else {
                            resizedRect.leftValue += ((offset.left + cosAlpha * deltaWidth) * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.topValue !== null) {
                        if (resizedRect.topUnit !== '%') {
                            resizedRect.topValue += offset.top;
                        }
                        else {
                            resizedRect.topValue += (offset.top * 100) / parentPixelHeight;
                        }
                    }
                    if (resizedRect.rightValue !== null) {
                        if (resizedRect.rightUnit !== '%') {
                            resizedRect.rightValue += offset.left;
                        }
                        else {
                            resizedRect.rightValue += (offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.bottomValue !== null) {
                        if (resizedRect.bottomUnit !== '%') {
                            resizedRect.bottomValue += -offset.top;
                        }
                        else {
                            resizedRect.bottomValue += (-offset.top * 100) / parentPixelHeight;
                        }
                    }
                    break;
                case 'CenterRight':
                    // ---------------------------------------------------
                    // Preliminary work
                    // We want to switch to pixel size for the partial root. So we have to convert the current value and will do further work based on this converted value.
                    if (ctrlMeta.isPartialRoot) {
                        if (resizedRect.widthValue !== null && resizedRect.widthUnit === '%') {
                            resizedRect.widthUnit = 'px';
                            resizedRect.widthValue = (resizedRect.widthValue / 100) * positionInsideControl.width;
                        }
                        if (resizedRect.rightValue !== null && resizedRect.rightUnit === '%') {
                            resizedRect.rightUnit = 'px';
                            resizedRect.rightValue = (resizedRect.rightValue / 100) * parentPixelWidth;
                        }
                    }
                    // Calculate offset for rotation transform
                    offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, 0, radians, sinAlpha, cosAlpha);
                    //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.widthValue !== null) {
                        // Prepare: minWidth / maxWith
                        // Fix width related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = resizedRect.maxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue > translatedMaxWidthValue) {
                                    resizedRect.widthValue = translatedMaxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = (resizedRect.maxWidthValue / parentPixelWidth) * 100; // Force width to maxWidth if its above maxWidth
                                }
                            }
                        }
                        // Fix width related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = resizedRect.minWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue < translatedMinWidthValue) {
                                    resizedRect.widthValue = translatedMinWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = (resizedRect.minWidthValue / parentPixelWidth) * 100; // Force width to minWidth if width is below minWidth
                                }
                            }
                        }
                        // Force deltaWith related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue + deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.maxWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue + deltaWidth >= translatedMaxWidthValue) {
                                    deltaWidth = translatedMaxWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue + deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.maxWidthValue - translatedWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                        }
                        // Force deltaWith related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue + deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.minWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue + deltaWidth <= translatedMinWidthValue) {
                                    deltaWidth = translatedMinWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue + deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.minWidthValue - translatedWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                        }
                        if (resizedRect.widthUnit !== '%') {
                            if (resizedRect.widthValue + deltaWidth <= 0) {
                                deltaWidth = -resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        else {
                            if (resizedRect.widthValue + (deltaWidth * 100) / parentPixelWidth <= 0) {
                                deltaWidth = -resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, 0, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.widthValue === null &&
                        resizedRect.leftValue !== null &&
                        resizedRect.rightValue !== null) {
                        let dummyLeft = resizedRect.leftValue;
                        if (resizedRect.leftUnit !== '%') {
                            dummyLeft += -offset.left;
                        }
                        else {
                            dummyLeft += (-offset.left * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyLeft = parentPixelWidth * (dummyLeft / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyRight = resizedRect.rightValue;
                        if (resizedRect.rightUnit !== '%') {
                            dummyRight += -(-offset.left + deltaWidth);
                        }
                        else {
                            dummyRight += (-(-offset.left + deltaWidth) * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyRight = parentPixelWidth * (dummyRight / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        if (dummyLeft + dummyRight >= parentPixelWidth) {
                            deltaWidth = -(ctrlMeta.controlCssPixelDimension.width ?? 0); // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, 0, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // ---------------------------------------------------
                    // Process position attributes
                    if (resizedRect.widthValue !== null) {
                        if (resizedRect.widthUnit !== '%') {
                            resizedRect.widthValue += deltaWidth;
                        }
                        else {
                            resizedRect.widthValue += (deltaWidth * 100) / parentPixelWidth;
                        }
                    }
                    else {
                        if ((resizedRect.leftValue === null && resizedRect.rightValue !== null) ||
                            (resizedRect.leftValue !== null && resizedRect.rightValue === null)) {
                            if (resizedRect.widthUnit !== '%') {
                                resizedRect.widthValue = (ctrlMeta.controlCssPixelDimension.width ?? 0) + deltaWidth;
                            }
                            else {
                                resizedRect.widthValue =
                                    ((ctrlMeta.controlCssPixelDimension.width ?? 0) / parentPixelWidth) * 100 +
                                        (deltaWidth * 100) / parentPixelWidth;
                            }
                        }
                    }
                    if (resizedRect.leftValue !== null) {
                        if (resizedRect.leftUnit !== '%') {
                            resizedRect.leftValue += -offset.left;
                        }
                        else {
                            resizedRect.leftValue += (-offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.topValue !== null) {
                        if (resizedRect.topUnit !== '%') {
                            resizedRect.topValue += offset.top;
                        }
                        else {
                            resizedRect.topValue += (offset.top * 100) / parentPixelHeight;
                        }
                    }
                    if (resizedRect.rightValue !== null) {
                        if (resizedRect.rightUnit !== '%') {
                            resizedRect.rightValue += -(-offset.left + deltaWidth);
                        }
                        else {
                            resizedRect.rightValue += (-(-offset.left + deltaWidth) * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.bottomValue !== null) {
                        if (resizedRect.bottomUnit !== '%') {
                            resizedRect.bottomValue += -offset.top;
                        }
                        else {
                            resizedRect.bottomValue += (-offset.top * 100) / parentPixelHeight;
                        }
                    }
                    break;
                case 'BottomLeft':
                    // ---------------------------------------------------
                    // Preliminary work
                    // Calculate offset for rotation transform
                    offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                    //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.heightValue !== null) {
                        // Prepare: minHeight / maxHeight
                        // Fix height related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = resizedRect.maxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue > translatedMaxHeightValue) {
                                    resizedRect.heightValue = translatedMaxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = (resizedRect.maxHeightValue / parentPixelHeight) * 100; // Force height to maxHeight if its above maxHeight
                                }
                            }
                        }
                        // Fix height related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = resizedRect.minHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue < translatedMinHeightValue) {
                                    resizedRect.heightValue = translatedMinHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = (resizedRect.minHeightValue / parentPixelHeight) * 100; // Force height to minHeight if height is below minHeight
                                }
                            }
                        }
                        // Force deltaHeight related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue + deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = resizedRect.maxHeightValue - resizedRect.heightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue + deltaHeight >= translatedMaxHeightValue) {
                                    deltaHeight = translatedMaxHeightValue - resizedRect.heightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue + deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = resizedRect.maxHeightValue - translatedHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                        }
                        // Force deltaHeight related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue + deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = resizedRect.minHeightValue - resizedRect.heightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue + deltaHeight <= translatedMinHeightValue) {
                                    deltaHeight = translatedMinHeightValue - resizedRect.heightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue + deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = resizedRect.minHeightValue - translatedHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                        }
                        if (resizedRect.heightUnit !== '%') {
                            if (resizedRect.heightValue + deltaHeight <= 0) {
                                deltaHeight = -resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        else {
                            if (resizedRect.heightValue + (deltaHeight * 100) / parentPixelHeight <= 0) {
                                deltaHeight = -resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.heightValue === null &&
                        resizedRect.topValue !== null &&
                        resizedRect.bottomValue !== null) {
                        let dummyTop = resizedRect.topValue;
                        if (resizedRect.topUnit !== '%') {
                            dummyTop += offset.top;
                        }
                        else {
                            dummyTop += (offset.top * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyTop = parentPixelHeight * (dummyTop / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyBottom = resizedRect.bottomValue;
                        if (resizedRect.bottomUnit !== '%') {
                            dummyBottom += -(offset.top + deltaHeight);
                        }
                        else {
                            dummyBottom += (-(offset.top + deltaHeight) * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyBottom = parentPixelHeight * (dummyBottom / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        // Check if height of element will be < 0 based on pixel values
                        if (dummyTop + dummyBottom >= parentPixelHeight) {
                            deltaHeight = -(ctrlMeta.controlCssPixelDimension.height ?? 0); // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.widthValue !== null) {
                        // Prepare: minWidth / maxWith
                        // Fix width related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = resizedRect.maxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue > translatedMaxWidthValue) {
                                    resizedRect.widthValue = translatedMaxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = (resizedRect.maxWidthValue / parentPixelWidth) * 100; // Force width to maxWidth if its above maxWidth
                                }
                            }
                        }
                        // Fix width related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = resizedRect.minWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue < translatedMinWidthValue) {
                                    resizedRect.widthValue = translatedMinWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = (resizedRect.minWidthValue / parentPixelWidth) * 100; // Force width to minWidth if width is below minWidth
                                }
                            }
                        }
                        // Force deltaWith related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue - deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.widthValue - resizedRect.maxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue - deltaWidth >= translatedMaxWidthValue) {
                                    deltaWidth = resizedRect.widthValue - translatedMaxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue - deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = translatedWidthValue - resizedRect.maxWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                        }
                        // Force deltaWith related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue - deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.widthValue - resizedRect.minWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue - deltaWidth <= translatedMinWidthValue) {
                                    deltaWidth = resizedRect.widthValue - translatedMinWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue - deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = translatedWidthValue - resizedRect.minWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                        }
                        if (resizedRect.widthUnit !== '%') {
                            if (resizedRect.widthValue - deltaWidth <= 0) {
                                deltaWidth = resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        else {
                            if (resizedRect.widthValue - (deltaWidth * 100) / parentPixelWidth <= 0) {
                                deltaWidth = resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.widthValue === null &&
                        resizedRect.leftValue !== null &&
                        resizedRect.rightValue !== null) {
                        let dummyLeft = resizedRect.leftValue;
                        if (resizedRect.leftUnit !== '%') {
                            dummyLeft += -offset.left + deltaWidth;
                        }
                        else {
                            dummyLeft += ((-offset.left + deltaWidth) * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyLeft = parentPixelWidth * (dummyLeft / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyRight = resizedRect.rightValue;
                        if (resizedRect.rightUnit !== '%') {
                            dummyRight += offset.left;
                        }
                        else {
                            dummyRight += (offset.left * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyRight = parentPixelWidth * (dummyRight / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        if (dummyLeft + dummyRight >= parentPixelWidth) {
                            deltaWidth = ctrlMeta.controlCssPixelDimension.width ?? 0; // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // ---------------------------------------------------
                    // Process position attributes
                    if (resizedRect.widthValue !== null) {
                        if (resizedRect.widthUnit !== '%') {
                            resizedRect.widthValue += -deltaWidth;
                        }
                        else {
                            resizedRect.widthValue += (-deltaWidth * 100) / parentPixelWidth;
                        }
                    }
                    else {
                        if ((resizedRect.leftValue === null && resizedRect.rightValue !== null) ||
                            (resizedRect.leftValue !== null && resizedRect.rightValue === null)) {
                            if (resizedRect.widthUnit !== '%') {
                                resizedRect.widthValue = (ctrlMeta.controlCssPixelDimension.width ?? 0) - deltaWidth;
                            }
                            else {
                                resizedRect.widthValue =
                                    ((ctrlMeta.controlCssPixelDimension.width ?? 0) / parentPixelWidth) * 100 -
                                        (deltaWidth * 100) / parentPixelWidth;
                            }
                        }
                    }
                    if (resizedRect.heightValue !== null) {
                        if (resizedRect.heightUnit !== '%') {
                            resizedRect.heightValue += deltaHeight;
                        }
                        else {
                            resizedRect.heightValue += (deltaHeight * 100) / parentPixelHeight;
                        }
                    }
                    else {
                        if ((resizedRect.topValue === null && resizedRect.bottomValue !== null) ||
                            (resizedRect.topValue !== null && resizedRect.bottomValue === null)) {
                            if (resizedRect.heightUnit !== '%') {
                                resizedRect.heightValue = (ctrlMeta.controlCssPixelDimension.height ?? 0) + deltaHeight;
                            }
                            else {
                                resizedRect.heightValue =
                                    ((ctrlMeta.controlCssPixelDimension.height ?? 0) / parentPixelHeight) * 100 +
                                        (deltaHeight * 100) / parentPixelHeight;
                            }
                        }
                    }
                    if (resizedRect.leftValue !== null) {
                        if (resizedRect.leftUnit !== '%') {
                            resizedRect.leftValue += -offset.left + deltaWidth;
                        }
                        else {
                            resizedRect.leftValue += ((-offset.left + deltaWidth) * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.topValue !== null) {
                        if (resizedRect.topUnit !== '%') {
                            resizedRect.topValue += offset.top;
                        }
                        else {
                            resizedRect.topValue += (offset.top * 100) / parentPixelHeight;
                        }
                    }
                    if (resizedRect.rightValue !== null) {
                        if (resizedRect.rightUnit !== '%') {
                            resizedRect.rightValue += offset.left;
                        }
                        else {
                            resizedRect.rightValue += (offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.bottomValue !== null) {
                        if (resizedRect.bottomUnit !== '%') {
                            resizedRect.bottomValue += -(offset.top + deltaHeight);
                        }
                        else {
                            resizedRect.bottomValue += (-(offset.top + deltaHeight) * 100) / parentPixelHeight;
                        }
                    }
                    break;
                case 'BottomCenter':
                    // ---------------------------------------------------
                    // Preliminary work
                    // We want to switch to pixel size for the partial root. So we have to convert the current value and will do further work based on this converted value.
                    if (ctrlMeta.isPartialRoot) {
                        if (resizedRect.heightValue !== null && resizedRect.heightUnit === '%') {
                            resizedRect.heightUnit = 'px';
                            resizedRect.heightValue = (resizedRect.heightValue / 100) * positionInsideControl.height;
                        }
                        if (resizedRect.bottomValue !== null && resizedRect.bottomUnit === 'px') {
                            resizedRect.bottomUnit = 'px';
                            resizedRect.bottomValue = (resizedRect.bottomValue / 100) * parentPixelHeight;
                        }
                    }
                    // Calculate offset for rotation transform
                    offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, 0, deltaHeight, radians, sinAlpha, cosAlpha);
                    //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    // Prepare: minHeight / maxHeight
                    // Fix height related to maxHeight
                    if (resizedRect.maxHeightValue !== null) {
                        if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                            if ((resizedRect.heightValue ?? 0) > resizedRect.maxHeightValue) {
                                resizedRect.heightValue = resizedRect.maxHeightValue; // Force height to maxHeight if its above maxHeight
                            }
                        }
                        else if (resizedRect.heightUnit !== '%') {
                            let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                            if ((resizedRect.heightValue ?? 0) > translatedMaxHeightValue) {
                                resizedRect.heightValue = translatedMaxHeightValue; // Force height to maxHeight if its above maxHeight
                            }
                        }
                        else {
                            let translatedHeightValue = ((resizedRect.heightValue ?? 0) / 100) * parentPixelHeight;
                            if (translatedHeightValue > resizedRect.maxHeightValue) {
                                resizedRect.heightValue = (resizedRect.maxHeightValue / parentPixelHeight) * 100; // Force height to maxHeight if its above maxHeight
                            }
                        }
                    }
                    // Fix height related to minHeight
                    if (resizedRect.minHeightValue !== null) {
                        if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                            if ((resizedRect.heightValue ?? 0) < resizedRect.minHeightValue) {
                                resizedRect.heightValue = resizedRect.minHeightValue; // Force height to minHeight if height is below minHeight
                            }
                        }
                        else if (resizedRect.heightUnit !== '%') {
                            let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                            if ((resizedRect.heightValue ?? 0) < translatedMinHeightValue) {
                                resizedRect.heightValue = translatedMinHeightValue; // Force height to minHeight if height is below minHeight
                            }
                        }
                        else {
                            let translatedHeightValue = ((resizedRect.heightValue ?? 0) / 100) * parentPixelHeight;
                            if (translatedHeightValue < resizedRect.minHeightValue) {
                                resizedRect.heightValue = (resizedRect.minHeightValue / parentPixelHeight) * 100; // Force height to minHeight if height is below minHeight
                            }
                        }
                    }
                    // Force deltaHeight related to maxHeight
                    if (resizedRect.maxHeightValue !== null) {
                        if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                            if ((resizedRect.heightValue ?? 0) + deltaHeight >= resizedRect.maxHeightValue) {
                                deltaHeight = resizedRect.maxHeightValue - (resizedRect.heightValue ?? 0); // Force deltaHeight to a value which will result in maxHeight height
                            }
                        }
                        else if (resizedRect.heightUnit !== '%') {
                            let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                            if ((resizedRect.heightValue ?? 0) + deltaHeight >= translatedMaxHeightValue) {
                                deltaHeight = translatedMaxHeightValue - (resizedRect.heightValue ?? 0); // Force deltaHeight to a value which will result in maxHeight height
                            }
                        }
                        else {
                            let translatedHeightValue = ((resizedRect.heightValue ?? 0) / 100) * parentPixelHeight;
                            if (translatedHeightValue + deltaHeight >= resizedRect.maxHeightValue) {
                                deltaHeight = resizedRect.maxHeightValue - translatedHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                            }
                        }
                    }
                    // Force deltaHeight related to minHeight
                    if (resizedRect.minHeightValue !== null) {
                        if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                            if ((resizedRect.heightValue ?? 0) + deltaHeight <= resizedRect.minHeightValue) {
                                deltaHeight = resizedRect.minHeightValue - (resizedRect.heightValue ?? 0); // Force deltaHeight to a value which will result in minHeight height
                            }
                        }
                        else if (resizedRect.heightUnit !== '%') {
                            let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                            if ((resizedRect.heightValue ?? 0) + deltaHeight <= translatedMinHeightValue) {
                                deltaHeight = translatedMinHeightValue - (resizedRect.heightValue ?? 0); // Force deltaHeight to a value which will result in minHeight height
                            }
                        }
                        else {
                            let translatedHeightValue = ((resizedRect.heightValue ?? 0) / 100) * parentPixelHeight;
                            if (translatedHeightValue + deltaHeight <= resizedRect.minHeightValue) {
                                deltaHeight = resizedRect.minHeightValue - translatedHeightValue; // Force deltaHeight to a value which will result in minHeight height
                            }
                        }
                    }
                    if (resizedRect.heightValue !== null) {
                        if (resizedRect.heightUnit !== '%') {
                            if (resizedRect.heightValue + deltaHeight <= 0) {
                                deltaHeight = -resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        else {
                            if (resizedRect.heightValue + (deltaHeight * 100) / parentPixelHeight <= 0) {
                                deltaHeight = -resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, 0, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.heightValue === null &&
                        resizedRect.topValue !== null &&
                        resizedRect.bottomValue !== null) {
                        let dummyTop = resizedRect.topValue;
                        if (resizedRect.topUnit !== '%') {
                            dummyTop += offset.top;
                        }
                        else {
                            dummyTop += (offset.top * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyTop = parentPixelHeight * (dummyTop / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyBottom = resizedRect.bottomValue;
                        if (resizedRect.bottomUnit !== '%') {
                            dummyBottom += -(deltaHeight + offset.top);
                        }
                        else {
                            dummyBottom += (-(deltaHeight + offset.top) * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyBottom = parentPixelHeight * (dummyBottom / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        // Check if height of element will be < 0 based on pixel values
                        if (dummyTop + dummyBottom >= parentPixelHeight) {
                            deltaHeight = -(ctrlMeta.controlCssPixelDimension.height ?? 0); // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, 0, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // ---------------------------------------------------
                    // Process position attributes
                    if (resizedRect.heightValue !== null) {
                        if (resizedRect.heightUnit !== '%') {
                            resizedRect.heightValue += deltaHeight;
                        }
                        else {
                            resizedRect.heightValue += (deltaHeight * 100) / parentPixelHeight;
                        }
                    }
                    else {
                        if ((resizedRect.topValue === null && resizedRect.bottomValue !== null) ||
                            (resizedRect.topValue !== null && resizedRect.bottomValue === null)) {
                            if (resizedRect.heightUnit !== '%') {
                                resizedRect.heightValue = (ctrlMeta.controlCssPixelDimension.height ?? 0) + deltaHeight;
                            }
                            else {
                                resizedRect.heightValue =
                                    ((ctrlMeta.controlCssPixelDimension.height ?? 0) / parentPixelHeight) * 100 +
                                        (deltaHeight * 100) / parentPixelHeight;
                            }
                        }
                    }
                    if (resizedRect.leftValue !== null) {
                        if (resizedRect.leftUnit !== '%') {
                            resizedRect.leftValue += -offset.left;
                        }
                        else {
                            resizedRect.leftValue += (-offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.topValue !== null) {
                        if (resizedRect.topUnit !== '%') {
                            resizedRect.topValue += offset.top;
                        }
                        else {
                            resizedRect.topValue += (offset.top * 100) / parentPixelHeight;
                        }
                    }
                    if (resizedRect.rightValue !== null) {
                        if (resizedRect.rightUnit !== '%') {
                            resizedRect.rightValue += offset.left;
                        }
                        else {
                            resizedRect.rightValue += (offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.bottomValue !== null) {
                        if (resizedRect.bottomUnit !== '%') {
                            resizedRect.bottomValue += -(deltaHeight + offset.top);
                        }
                        else {
                            resizedRect.bottomValue += (-(deltaHeight + offset.top) * 100) / parentPixelHeight;
                        }
                    }
                    break;
                case 'BottomRight':
                    // ---------------------------------------------------
                    // Preliminary work
                    // We want to switch to pixel size for the partial root. So we have to convert the current value and will do further work based on this converted value.
                    if (ctrlMeta.isPartialRoot) {
                        if (resizedRect.heightValue !== null && resizedRect.heightUnit === '%') {
                            resizedRect.heightUnit = 'px';
                            resizedRect.heightValue = (resizedRect.heightValue / 100) * positionInsideControl.height;
                        }
                        if (resizedRect.widthValue !== null && resizedRect.widthUnit === '%') {
                            resizedRect.widthUnit = 'px';
                            resizedRect.widthValue = (resizedRect.widthValue / 100) * positionInsideControl.width;
                        }
                        if (resizedRect.bottomValue !== null && resizedRect.bottomUnit === '%') {
                            resizedRect.bottomUnit = 'px';
                            resizedRect.bottomValue = (resizedRect.bottomValue / 100) * parentPixelHeight;
                        }
                        if (resizedRect.rightValue !== null && resizedRect.rightUnit === '%') {
                            resizedRect.rightUnit = 'px';
                            resizedRect.rightValue = (resizedRect.rightValue / 100) * parentPixelWidth;
                        }
                    }
                    // Calculate offset for rotation transform
                    offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                    //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.heightValue !== null) {
                        // Prepare: minHeight / maxHeight
                        // Fix height related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = resizedRect.maxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue > translatedMaxHeightValue) {
                                    resizedRect.heightValue = translatedMaxHeightValue; // Force height to maxHeight if its above maxHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue > resizedRect.maxHeightValue) {
                                    resizedRect.heightValue = (resizedRect.maxHeightValue / parentPixelHeight) * 100; // Force height to maxHeight if its above maxHeight
                                }
                            }
                        }
                        // Fix height related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = resizedRect.minHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue < translatedMinHeightValue) {
                                    resizedRect.heightValue = translatedMinHeightValue; // Force height to minHeight if height is below minHeight
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue < resizedRect.minHeightValue) {
                                    resizedRect.heightValue = (resizedRect.minHeightValue / parentPixelHeight) * 100; // Force height to minHeight if height is below minHeight
                                }
                            }
                        }
                        // Force deltaHeight related to maxHeight
                        if (resizedRect.maxHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.maxHeightUnit) {
                                if (resizedRect.heightValue + deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = resizedRect.maxHeightValue - resizedRect.heightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMaxHeightValue = (resizedRect.maxHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue + deltaHeight >= translatedMaxHeightValue) {
                                    deltaHeight = translatedMaxHeightValue - resizedRect.heightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue + deltaHeight >= resizedRect.maxHeightValue) {
                                    deltaHeight = resizedRect.maxHeightValue - translatedHeightValue; // Force deltaHeight to a value which will result in maxHeight height
                                }
                            }
                        }
                        // Force deltaHeight related to minHeight
                        if (resizedRect.minHeightValue !== null) {
                            if (resizedRect.heightUnit === resizedRect.minHeightUnit) {
                                if (resizedRect.heightValue + deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = resizedRect.minHeightValue - resizedRect.heightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else if (resizedRect.heightUnit !== '%') {
                                let translatedMinHeightValue = (resizedRect.minHeightValue / 100) * parentPixelHeight;
                                if (resizedRect.heightValue + deltaHeight <= translatedMinHeightValue) {
                                    deltaHeight = translatedMinHeightValue - resizedRect.heightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                            else {
                                let translatedHeightValue = (resizedRect.heightValue / 100) * parentPixelHeight;
                                if (translatedHeightValue + deltaHeight <= resizedRect.minHeightValue) {
                                    deltaHeight = resizedRect.minHeightValue - translatedHeightValue; // Force deltaHeight to a value which will result in minHeight height
                                }
                            }
                        }
                        if (resizedRect.heightUnit !== '%') {
                            if (resizedRect.heightValue + deltaHeight <= 0) {
                                deltaHeight = -resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        else {
                            if (resizedRect.heightValue + (deltaHeight * 100) / parentPixelHeight <= 0) {
                                deltaHeight = -resizedRect.heightValue; // Force deltaHeight to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.heightValue === null &&
                        resizedRect.topValue !== null &&
                        resizedRect.bottomValue !== null) {
                        let dummyTop = resizedRect.topValue;
                        if (resizedRect.topUnit !== '%') {
                            dummyTop += offset.top;
                        }
                        else {
                            dummyTop += (offset.top * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyTop = parentPixelHeight * (dummyTop / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyBottom = resizedRect.bottomValue;
                        if (resizedRect.bottomUnit !== '%') {
                            dummyBottom += -(offset.top + deltaHeight);
                        }
                        else {
                            dummyBottom += (-(offset.top + deltaHeight) * 100) / parentPixelHeight; // Calculate new value in percent...
                            dummyBottom = parentPixelHeight * (dummyBottom / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        // Check if height of element will be < 0 based on pixel values
                        if (dummyTop + dummyBottom >= parentPixelHeight) {
                            deltaHeight = -(ctrlMeta.controlCssPixelDimension.height ?? 0); // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // Fix deltaHeight/deltaWidth to avoid move by resize
                    if (resizedRect.widthValue !== null) {
                        // Prepare: minWidth / maxWith
                        // Fix width related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = resizedRect.maxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue > translatedMaxWidthValue) {
                                    resizedRect.widthValue = translatedMaxWidthValue; // Force width to maxWidth if its above maxWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue > resizedRect.maxWidthValue) {
                                    resizedRect.widthValue = (resizedRect.maxWidthValue / parentPixelWidth) * 100; // Force width to maxWidth if its above maxWidth
                                }
                            }
                        }
                        // Fix width related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = resizedRect.minWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue < translatedMinWidthValue) {
                                    resizedRect.widthValue = translatedMinWidthValue; // Force width to minWidth if width is below minWidth
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue < resizedRect.minWidthValue) {
                                    resizedRect.widthValue = (resizedRect.minWidthValue / parentPixelWidth) * 100; // Force width to minWidth if width is below minWidth
                                }
                            }
                        }
                        // Force deltaWith related to maxWidth
                        if (resizedRect.maxWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.maxWidthUnit) {
                                if (resizedRect.widthValue + deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.maxWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMaxWidthValue = (resizedRect.maxWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue + deltaWidth >= translatedMaxWidthValue) {
                                    deltaWidth = translatedMaxWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue + deltaWidth >= resizedRect.maxWidthValue) {
                                    deltaWidth = resizedRect.maxWidthValue - translatedWidthValue; // Force deltaWidth to a value which will result in maxWidth width
                                }
                            }
                        }
                        // Force deltaWith related to minWidth
                        if (resizedRect.minWidthValue !== null) {
                            if (resizedRect.widthUnit === resizedRect.minWidthUnit) {
                                if (resizedRect.widthValue + deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.minWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else if (resizedRect.widthUnit !== '%') {
                                let translatedMinWidthValue = (resizedRect.minWidthValue / 100) * parentPixelWidth;
                                if (resizedRect.widthValue + deltaWidth <= translatedMinWidthValue) {
                                    deltaWidth = translatedMinWidthValue - resizedRect.widthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                            else {
                                let translatedWidthValue = (resizedRect.widthValue / 100) * parentPixelWidth;
                                if (translatedWidthValue + deltaWidth <= resizedRect.minWidthValue) {
                                    deltaWidth = resizedRect.minWidthValue - translatedWidthValue; // Force deltaWidth to a value which will result in minWidth width
                                }
                            }
                        }
                        if (resizedRect.widthUnit !== '%') {
                            if (resizedRect.widthValue + deltaWidth <= 0) {
                                deltaWidth = -resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        else {
                            if (resizedRect.widthValue + (deltaWidth * 100) / parentPixelWidth <= 0) {
                                deltaWidth = -resizedRect.widthValue; // Force deltaWidth to a value which will result in 0 height
                            }
                        }
                        // Recalculate offset ...
                        offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                        //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                    }
                    else if (resizedRect.widthValue === null &&
                        resizedRect.leftValue !== null &&
                        resizedRect.rightValue !== null) {
                        let dummyLeft = resizedRect.leftValue;
                        if (resizedRect.leftUnit !== '%') {
                            dummyLeft += -offset.left;
                        }
                        else {
                            dummyLeft += (-offset.left * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyLeft = parentPixelWidth * (dummyLeft / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        let dummyRight = resizedRect.rightValue;
                        if (resizedRect.rightUnit !== '%') {
                            dummyRight += -(-offset.left + deltaWidth);
                        }
                        else {
                            dummyRight += (-(-offset.left + deltaWidth) * 100) / parentPixelWidth; // Calculate new value in percent...
                            dummyRight = parentPixelWidth * (dummyRight / 100); // Convert to pixel for further calculation because top/bottom may not be from equal unit...
                        }
                        if (dummyLeft + dummyRight >= parentPixelWidth) {
                            deltaWidth = -(ctrlMeta.controlCssPixelDimension.width ?? 0); // Force deltaHeight to a value which will result in 0 height
                            // Recalculate offset ...
                            offset = this.__getResizedRectRotationOffset(resizedRect.widthValue, resizedRect.heightValue, deltaWidth, deltaHeight, radians, sinAlpha, cosAlpha);
                            //console.log(JSON.stringify('__getResizedRectRotationOffset: ' + JSON.stringify(offset)));
                        }
                    }
                    // ---------------------------------------------------
                    // Process position attributes
                    if (resizedRect.widthValue !== null) {
                        if (resizedRect.widthUnit !== '%') {
                            resizedRect.widthValue += deltaWidth;
                        }
                        else {
                            resizedRect.widthValue += (deltaWidth * 100) / parentPixelWidth;
                        }
                    }
                    else {
                        if ((resizedRect.leftValue === null && resizedRect.rightValue !== null) ||
                            (resizedRect.leftValue !== null && resizedRect.rightValue === null)) {
                            if (resizedRect.widthUnit !== '%') {
                                resizedRect.widthValue = (ctrlMeta.controlCssPixelDimension.width ?? 0) + deltaWidth;
                            }
                            else {
                                resizedRect.widthValue =
                                    ((ctrlMeta.controlCssPixelDimension.width ?? 0) / parentPixelWidth) * 100 +
                                        (deltaWidth * 100) / parentPixelWidth;
                            }
                        }
                    }
                    if (resizedRect.heightValue !== null) {
                        if (resizedRect.heightUnit !== '%') {
                            resizedRect.heightValue += deltaHeight;
                        }
                        else {
                            resizedRect.heightValue += (deltaHeight * 100) / parentPixelHeight;
                        }
                    }
                    else {
                        if ((resizedRect.topValue === null && resizedRect.bottomValue !== null) ||
                            (resizedRect.topValue !== null && resizedRect.bottomValue === null)) {
                            if (resizedRect.heightUnit !== '%') {
                                resizedRect.heightValue = (ctrlMeta.controlCssPixelDimension.height ?? 0) + deltaHeight;
                            }
                            else {
                                resizedRect.heightValue =
                                    ((ctrlMeta.controlCssPixelDimension.height ?? 0) / parentPixelHeight) * 100 +
                                        (deltaHeight * 100) / parentPixelHeight;
                            }
                        }
                    }
                    if (resizedRect.leftValue !== null) {
                        if (resizedRect.leftUnit !== '%') {
                            resizedRect.leftValue += -offset.left;
                        }
                        else {
                            resizedRect.leftValue += (-offset.left * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.topValue !== null) {
                        if (resizedRect.topUnit !== '%') {
                            resizedRect.topValue += offset.top;
                        }
                        else {
                            resizedRect.topValue += (offset.top * 100) / parentPixelHeight;
                        }
                    }
                    if (resizedRect.rightValue !== null) {
                        if (resizedRect.rightUnit !== '%') {
                            resizedRect.rightValue += -(-offset.left + deltaWidth);
                        }
                        else {
                            resizedRect.rightValue += (-(-offset.left + deltaWidth) * 100) / parentPixelWidth;
                        }
                    }
                    if (resizedRect.bottomValue !== null) {
                        if (resizedRect.bottomUnit !== '%') {
                            resizedRect.bottomValue += -(offset.top + deltaHeight);
                        }
                        else {
                            resizedRect.bottomValue += (-(offset.top + deltaHeight) * 100) / parentPixelHeight;
                        }
                    }
                    break;
            }
            return resizedRect;
        }
        __onAnchorMouseUp(event) {
            //printDebugstate('__onAnchorMouseUp');
            if (event.which !== 1) {
                // Leave callback if event is not related to left mouse
                // Perhaps an abort with the right click TODO
                return;
            }
            // It's important to disable events after left mouse cancel condition and before further cancel conditions are used!
            TcHmi.System.SharedResources.jqDocument.off(this.__anchorMouseMoveNs);
            TcHmi.System.SharedResources.jqDocument.off(this.__anchorMouseUpNs);
            if (this.__activeControl === null) {
                return;
            }
            // Restore visual feedback
            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snaptop');
            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapleft');
            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapbottom');
            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapright');
            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snaptop-remote');
            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapleft-remote');
            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapbottom-remote');
            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapright-remote');
            if (this.__lockControlResize) {
                return;
            }
            // Important! Make sure this is resetted before calling syncManager?.updatePcElementAndSync('System.onControlSizeParameterChanged');
            this.__controlResizing = false;
            rectSelectManager?.lockRectSelect(); // avoid a following rect select
            syncManager?.updatePcElementAndSync('System.onControlSizeParameterChanged');
            // Resync to visual studio
            designerModeManager.resyncControls();
            // Important ! No need to request current partial content for changes generated by designer !
            // The creator will send an update for the current partial content for each change which is handled by the creator !
            // Change by designer -> SyncControls -> Creator magic -> CurrentPartialConent
        }
    };
})();
export { DesignerModeMasterControlResizeManager };
/** Runtime Manager */
export const controlResizeManager = new DesignerModeMasterControlResizeManager();
//# sourceMappingURL=DesignerModeMasterControlResizeMngr.js.map