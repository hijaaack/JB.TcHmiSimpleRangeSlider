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
import { designerModeManager } from './DesignerModeManager.js';
import { rootControlManager } from './DesignerModeMasterRootControlMngr.js';
import { SyncCmdToCreatorZoom } from './SyncCmdToCreatorZoom.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
 * Handles common interaction properties and methods in designer master.
 */
let DesignerModeMasterInteractionManager = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let ___handleDesignerWheelEvents_decorators;
    return class DesignerModeMasterInteractionManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___handleDesignerWheelEvents_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            __esDecorate(this, null, ___handleDesignerWheelEvents_decorators, { kind: "method", name: "__handleDesignerWheelEvents", static: false, private: false, access: { has: obj => "__handleDesignerWheelEvents" in obj, get: obj => obj.__handleDesignerWheelEvents }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Handles common interaction properties and methods in designer master.
         */
        constructor() {
            this.__modifierKeyPressed = {
                ctrl: false,
                shift: false,
            };
            this.__startMousePosition = { left: 0, top: 0 };
            this.__startMousePositionCopyMoveOffsetPosition = { left: 0, top: 0 };
            this.__positionInsideControl = { top: 0, left: 0, height: 0, width: 0 };
            document.documentElement.addEventListener('wheel', this.__handleDesignerWheelEvents, { passive: false });
        }
        /**
         * Cache of control dimension in absolute pixels calculated from the document.
         */
        __verPositionCache = (__runInitializers(this, _instanceExtraInitializers), {});
        /**
         * Cache of control dimension in absolute pixels calculated from the document.
         */
        __horPositionCache = {};
        __modifierKeyPressed;
        /**
         * event.pageXY on interaction start for mouse handling
         */
        __startMousePosition;
        /**
         * event.pageXY on interaction start offset for mouse handling while copyMove was activated during move progress
         */
        __startMousePositionCopyMoveOffsetPosition;
        /**
         * Pixel distance from the mouse to the bounding box of the active control and its size in viewport pixels in the whole document
         */
        __positionInsideControl;
        /**
         * Name of the manipulated Anchor
         * One of these: 'TopLeft', 'TopCenter', 'TopRight', 'CenterRight', 'BottomRight', 'BottomCenter', 'BottomLeft', 'CenterLeft'
         */
        __anchorName = undefined;
        /* ***************************************************************************
                        getter and setter
                    *************************************************************************** */
        getAnchorName() {
            return this.__anchorName;
        }
        setAnchorName(newAnchorName) {
            this.__anchorName = newAnchorName;
        }
        /** event.pageXY on interaction start for mouse handling */
        getStartMousePos() {
            return this.__startMousePosition;
        }
        /** event.pageXY on interaction start offset for mouse handling on copy move while move was already in progress */
        getStartMousePosCopyMoveOffsetPosition() {
            return this.__startMousePositionCopyMoveOffsetPosition;
        }
        /** Pixel distance from the mouse to the bounding box of the active control and its size in viewport pixels in the whole document */
        getPositionInsideControl() {
            return this.__positionInsideControl;
        }
        setCtrlModifierKeyState(bState) {
            this.__modifierKeyPressed.ctrl = bState;
        }
        setShiftModifierKeyState(bState) {
            this.__modifierKeyPressed.shift = bState;
        }
        /**
         * Clear snap position cache
         */
        clearControlSnapPositionCache() {
            this.__horPositionCache = {};
            this.__verPositionCache = {};
        }
        /** Remember event.pageXY on interaction start and optional control dimension for mouse handling */
        handleInteractionStart(event, activeControl) {
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            this.__startMousePosition.left = event.pageX;
            this.__startMousePosition.top = event.pageY;
            this.__startMousePositionCopyMoveOffsetPosition.left = 0;
            this.__startMousePositionCopyMoveOffsetPosition.top = 0;
            if (activeControl?.jOriginalPosition) {
                const untransformedBBox = activeControl.jOriginalPosition[0].getBoundingClientRect();
                this.__positionInsideControl.top = event.pageY - untransformedBBox.top - window.scrollY;
                this.__positionInsideControl.left = event.pageX - untransformedBBox.left - window.scrollX;
                this.__positionInsideControl.height = untransformedBBox.height;
                this.__positionInsideControl.width = untransformedBBox.width;
            }
        }
        /** Remember event.pageXY on interaction start offset for copy move activated during move process. */
        handleInteractionStartCopyMoveOffsetPosition(event) {
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            this.__startMousePositionCopyMoveOffsetPosition.left = event.pageX;
            this.__startMousePositionCopyMoveOffsetPosition.top = event.pageY;
        }
        refreshControlSnapPositionCache(ctrlMeta) {
            let designerSettings = designerModeManager.getSettings();
            if (!designerSettings.enableSnapping) {
                return;
            }
            if (!ctrlMeta) {
                // Rebuild cache
                const controlsMetaData = metaDataManager.getControlMetaData();
                for (const ctrlMeta of Object.values(controlsMetaData)) {
                    this.refreshControlSnapPositionCache(ctrlMeta);
                }
                return;
            }
            else {
                // Add entry
                if (ctrlMeta.absoluteParentRotation !== 0) {
                    // Rotated elements are no good snap partners
                    return;
                }
                this.__addPositionCacheEntry(ctrlMeta.jOriginalPosition[0], ctrlMeta.id, ctrlMeta.isContainerControl);
                if (ctrlMeta.isGridControl) {
                    // Get all highlight objects
                    let allGridCells = ctrlMeta.jControlPosition.children('.tchmi-creator-gridcell');
                    for (let i = 0, ii = allGridCells.length; i < ii; i++) {
                        // Keep grid control name to keep the "self" detection in snapping easy
                        this.__addPositionCacheEntry(allGridCells[i], ctrlMeta.id, true);
                    }
                }
            }
        }
        /**
         * @param cache
         * @param newEntry
         * @param key
         */
        __addSnapPosition(cache, newEntry, key) {
            if (!cache[key]) {
                cache[key] = [newEntry];
            }
            else {
                cache[key].push(newEntry);
            }
        }
        /**
         * Remember the dimension for one HTML element
         * @param htmlElem Element which dimension should be added to the caches
         * @param name Name for "self" detection in snap
         */
        __addPositionCacheEntry(htmlElem, name, isContainer) {
            const creatorZoomFactor = rootControlManager?.getCreatorZoomFactor() ?? 1;
            const designerSettings = designerModeManager.getSettings();
            const controlDistance = designerSettings.snapDistanceToControls * creatorZoomFactor;
            const containerInnerDistance = controlDistance;
            const untransformedBBox = htmlElem.getBoundingClientRect();
            // getBoundingClientRect does not include scrolling
            // Normalize (remove floating point entries)
            const left = Math.round(untransformedBBox.left + window.scrollX); // We are Chrome only
            const top = Math.round(untransformedBBox.top + window.scrollY); // We are Chrome only
            const right = Math.round(untransformedBBox.right + window.scrollX); // We are Chrome only
            const bottom = Math.round(untransformedBBox.bottom + window.scrollY); // We are Chrome only
            // /////////////////////////
            if (designerSettings.snapToControls) {
                this.__addSnapPosition(this.__verPositionCache, { name: name, controlTopOrLeft: true, remoteMatch: false }, top);
                this.__addSnapPosition(this.__verPositionCache, { name: name, controlTopOrLeft: true, remoteMatch: true }, top - controlDistance);
            }
            if (isContainer && designerSettings.snapToInnerContainerSides) {
                this.__addSnapPosition(this.__verPositionCache, { name: name, controlTopOrLeft: false, remoteMatch: true }, top + containerInnerDistance);
            }
            // /////////////////////////
            if (designerSettings.snapToControls) {
                this.__addSnapPosition(this.__verPositionCache, { name: name, controlTopOrLeft: false, remoteMatch: false }, bottom);
                this.__addSnapPosition(this.__verPositionCache, { name: name, controlTopOrLeft: false, remoteMatch: true }, bottom + controlDistance);
            }
            if (isContainer && designerSettings.snapToInnerContainerSides) {
                this.__addSnapPosition(this.__verPositionCache, { name: name, controlTopOrLeft: true, remoteMatch: true }, bottom - containerInnerDistance);
            }
            // /////////////////////////
            if (designerSettings.snapToControls) {
                this.__addSnapPosition(this.__horPositionCache, { name: name, controlTopOrLeft: true, remoteMatch: false }, left);
                this.__addSnapPosition(this.__horPositionCache, { name: name, controlTopOrLeft: true, remoteMatch: true }, left - controlDistance);
            }
            if (isContainer && designerSettings.snapToInnerContainerSides) {
                this.__addSnapPosition(this.__horPositionCache, { name: name, controlTopOrLeft: false, remoteMatch: true }, left + containerInnerDistance);
            }
            // /////////////////////////
            if (designerSettings.snapToControls) {
                this.__addSnapPosition(this.__horPositionCache, { name: name, controlTopOrLeft: false, remoteMatch: false }, right);
                this.__addSnapPosition(this.__horPositionCache, { name: name, controlTopOrLeft: false, remoteMatch: true }, right + controlDistance);
            }
            if (isContainer && designerSettings.snapToInnerContainerSides) {
                this.__addSnapPosition(this.__horPositionCache, { name: name, controlTopOrLeft: true, remoteMatch: true }, right - containerInnerDistance);
            }
        }
        /**
         * Correct delta movement with snapping and handle highlighting.
         * Works on document based coordinates, not viewport
         * @param ctrlMeta Metadata of the control and its designer container
         * @param mouseDelta Distance of xy mouse movement since start of drag in controlDimension/normalised/zoom corrected coordinates
         * @param mousePos mouse coordinates in pageX/viewport/getBoundingRect coordinates
         * @param snapControls bool to skip search for a snapTo
         * @returns corrected distance of xy mouse movement since start of drag in controlDimension/normalised/zoom corrected coordinates
         */
        handleSnapping(ctrlMeta, mouseDelta, mousePos, snapControls, directionLock) {
            /** Correction in pageX/viewport/getBoundingRect coordinates */
            let deltaCorrectionLeft = 0;
            /** Correction in pageY/viewport/getBoundingRect coordinates */
            let deltaCorrectionTop = 0;
            const creatorZoomFactor = rootControlManager?.getCreatorZoomFactor() ?? 1;
            /************** Correct delta on snap **************/
            let controlSnappedTop = directionLock === 'topBottom';
            let controlSnappedBottom = directionLock === 'topBottom';
            let controlSnappedLeft = directionLock === 'leftRight';
            let controlSnappedRight = directionLock === 'leftRight';
            let controlSnappedTopRemoteMatch = false;
            let controlSnappedBottomRemoteMatch = false;
            let controlSnappedLeftRemoteMatch = false;
            let controlSnappedRightRemoteMatch = false;
            if (snapControls && ctrlMeta.absoluteParentRotation === 0) {
                const selectedControlIds = metaDataManager.getSelectedControlIdsWithChildren();
                let snapAtTop = directionLock !== 'topBottom';
                let snapAtBottom = directionLock !== 'topBottom';
                let snapAtLeft = directionLock !== 'leftRight';
                let snapAtRight = directionLock !== 'leftRight';
                switch (this.__anchorName) {
                    case 'TopLeft':
                        snapAtBottom = false;
                        snapAtRight = false;
                        break;
                    case 'TopCenter':
                        snapAtBottom = false;
                        snapAtLeft = false;
                        snapAtRight = false;
                        break;
                    case 'TopRight':
                        snapAtBottom = false;
                        snapAtLeft = false;
                        break;
                    case 'CenterRight':
                        snapAtTop = false;
                        snapAtBottom = false;
                        snapAtLeft = false;
                        break;
                    case 'CenterLeft':
                        snapAtTop = false;
                        snapAtBottom = false;
                        snapAtRight = false;
                        break;
                    case 'BottomLeft':
                        snapAtTop = false;
                        snapAtRight = false;
                        break;
                    case 'BottomCenter':
                        snapAtTop = false;
                        snapAtLeft = false;
                        snapAtRight = false;
                        break;
                    case 'BottomRight':
                        snapAtTop = false;
                        snapAtLeft = false;
                        break;
                }
                let controlSnappointInViewportPixelStr;
                let controlSnappointInViewportPixel;
                /********** vertical **********/
                if (snapAtTop || snapAtBottom) {
                    for (controlSnappointInViewportPixelStr in this.__verPositionCache) {
                        let snappedControlInfoArray = this.__verPositionCache[controlSnappointInViewportPixelStr];
                        controlSnappointInViewportPixel = parseInt(controlSnappointInViewportPixelStr, 10);
                        if (!isNaN(controlSnappointInViewportPixel)) {
                            if (snapAtTop &&
                                controlSnappointInViewportPixel - 5 < mousePos.top - this.__positionInsideControl.top &&
                                mousePos.top - this.__positionInsideControl.top < controlSnappointInViewportPixel + 5) {
                                // Snapped on our top
                                for (let snappedControlInfo of snappedControlInfoArray) {
                                    if (selectedControlIds.includes(snappedControlInfo.name)) {
                                        // ignore a selected control on the old position
                                        continue;
                                    }
                                    if (snappedControlInfo.remoteMatch && snappedControlInfo.controlTopOrLeft) {
                                        // ignore a remote snap side to the same direction
                                        continue;
                                    }
                                    if (!controlSnappedTop && !controlSnappedBottom) {
                                        // Calculate snapped deltaTop for new position
                                        deltaCorrectionTop =
                                            controlSnappointInViewportPixel -
                                                (mousePos.top - this.__positionInsideControl.top);
                                        controlSnappedTop = true;
                                        controlSnappedTopRemoteMatch = snappedControlInfo.remoteMatch;
                                        //console.log('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterInteractionMngr] First top snap of ' + ctrlMeta.id + ' with ' + snappedControlInfo.name + ' at ' + controlSnappointInViewportPixelStr + 'px');
                                    }
                                    else if (controlSnappointInViewportPixel - deltaCorrectionTop ===
                                        mousePos.top - this.__positionInsideControl.top) {
                                        // If we are already snapped we only mark ourself at an exact match
                                        controlSnappedTop = true;
                                        controlSnappedTopRemoteMatch = snappedControlInfo.remoteMatch;
                                        //console.log('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterInteractionMngr] Secondary top snap of ' + ctrlMeta.id + ' with ' + snappedControlInfo.name + ' at ' + controlSnappointInViewportPixelStr + 'px');
                                    }
                                    break;
                                }
                            }
                            else if (snapAtBottom &&
                                controlSnappointInViewportPixel - 5 <
                                    mousePos.top - this.__positionInsideControl.top + this.__positionInsideControl.height &&
                                mousePos.top - this.__positionInsideControl.top + this.__positionInsideControl.height <
                                    controlSnappointInViewportPixel + 5) {
                                // Snapped on our bottom
                                for (let snappedControlInfo of snappedControlInfoArray) {
                                    if (selectedControlIds.includes(snappedControlInfo.name)) {
                                        // ignore a selected control on the old position
                                        continue;
                                    }
                                    if (snappedControlInfo.remoteMatch && !snappedControlInfo.controlTopOrLeft) {
                                        // ignore a remote snap side to the same direction
                                        continue;
                                    }
                                    if (!controlSnappedTop && !controlSnappedBottom) {
                                        // Calculate snapped deltaTop for new position
                                        deltaCorrectionTop =
                                            controlSnappointInViewportPixel -
                                                (mousePos.top -
                                                    this.__positionInsideControl.top +
                                                    this.__positionInsideControl.height);
                                        controlSnappedBottom = true;
                                        controlSnappedBottomRemoteMatch = snappedControlInfo.remoteMatch;
                                        //console.log('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterInteractionMngr] First bottom snap of ' + ctrlMeta.id + ' with ' + snappedControlInfo.name + ' at ' + controlSnappointInViewportPixelStr + 'px');
                                    }
                                    else if (controlSnappointInViewportPixel - deltaCorrectionTop ===
                                        mousePos.top -
                                            this.__positionInsideControl.top +
                                            this.__positionInsideControl.height) {
                                        // If we are already snapped we only mark ourself at an exact match
                                        controlSnappedBottom = true;
                                        controlSnappedBottomRemoteMatch = snappedControlInfo.remoteMatch;
                                        //console.log('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterInteractionMngr] Secondary bottom snap of ' + ctrlMeta.id + ' with ' + snappedControlInfo.name + ' at ' + controlSnappointInViewportPixelStr + 'px');
                                    }
                                    break;
                                }
                            }
                        }
                        if (controlSnappedTop && controlSnappedBottom) {
                            // It will get not better than that :-)
                            break;
                        }
                    }
                }
                /********** horizontal **********/
                if (snapAtLeft || snapAtRight) {
                    for (controlSnappointInViewportPixelStr in this.__horPositionCache) {
                        let snappedControlInfoArray = this.__horPositionCache[controlSnappointInViewportPixelStr];
                        controlSnappointInViewportPixel = parseInt(controlSnappointInViewportPixelStr, 10);
                        if (!isNaN(controlSnappointInViewportPixel)) {
                            if (snapAtLeft &&
                                controlSnappointInViewportPixel - 5 < mousePos.left - this.__positionInsideControl.left &&
                                mousePos.left - this.__positionInsideControl.left < controlSnappointInViewportPixel + 5) {
                                // Snapped on our left
                                for (let snappedControlInfo of snappedControlInfoArray) {
                                    if (selectedControlIds.includes(snappedControlInfo.name)) {
                                        // ignore a selected control on the old position
                                        continue;
                                    }
                                    if (snappedControlInfo.remoteMatch && snappedControlInfo.controlTopOrLeft) {
                                        // ignore a remote snap side to the same direction
                                        continue;
                                    }
                                    if (!controlSnappedLeft && !controlSnappedRight) {
                                        // Calculate snapped deltaLeft for new position
                                        deltaCorrectionLeft =
                                            controlSnappointInViewportPixel -
                                                (mousePos.left - this.__positionInsideControl.left);
                                        controlSnappedLeft = true;
                                        controlSnappedLeftRemoteMatch = snappedControlInfo.remoteMatch;
                                        //console.log('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterInteractionMngr] First left snap of ' + ctrlMeta.id + ' with ' + snappedControlInfo.name + ' at ' + controlSnappointInViewportPixelStr + 'px');
                                    }
                                    else if (controlSnappointInViewportPixel - deltaCorrectionLeft ===
                                        mousePos.left - this.__positionInsideControl.left) {
                                        // If we are already snapped we only mark ourself at an exact match
                                        controlSnappedLeft = true;
                                        controlSnappedLeftRemoteMatch = snappedControlInfo.remoteMatch;
                                        //console.log('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterInteractionMngr] Secondary left snap of ' + ctrlMeta.id + ' with ' + snappedControlInfo.name + ' at ' + controlSnappointInViewportPixelStr + 'px');
                                    }
                                    break;
                                }
                            }
                            else if (snapAtRight &&
                                controlSnappointInViewportPixel - 5 <
                                    mousePos.left -
                                        this.__positionInsideControl.left +
                                        this.__positionInsideControl.width &&
                                mousePos.left - this.__positionInsideControl.left + this.__positionInsideControl.width <
                                    controlSnappointInViewportPixel + 5) {
                                // Snapped on our right
                                for (let snappedControlInfo of snappedControlInfoArray) {
                                    if (selectedControlIds.includes(snappedControlInfo.name)) {
                                        // ignore a selected control on the old position
                                        continue;
                                    }
                                    if (snappedControlInfo.remoteMatch && !snappedControlInfo.controlTopOrLeft) {
                                        // ignore a remote snap side to the same direction
                                        continue;
                                    }
                                    if (!controlSnappedLeft && !controlSnappedRight) {
                                        // Calculate snapped deltaLeft for new position
                                        deltaCorrectionLeft =
                                            controlSnappointInViewportPixel -
                                                (mousePos.left -
                                                    this.__positionInsideControl.left +
                                                    this.__positionInsideControl.width);
                                        controlSnappedRight = true;
                                        controlSnappedRightRemoteMatch = snappedControlInfo.remoteMatch;
                                        //console.log('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterInteractionMngr] First right snap of ' + ctrlMeta.id + ' with ' + snappedControlInfo.name + ' at ' + controlSnappointInViewportPixelStr + 'px');
                                    }
                                    else if (controlSnappointInViewportPixel - deltaCorrectionLeft ===
                                        mousePos.left -
                                            this.__positionInsideControl.left +
                                            this.__positionInsideControl.width) {
                                        // If we are already snapped we only mark ourself at an exact match
                                        controlSnappedRight = true;
                                        controlSnappedRightRemoteMatch = snappedControlInfo.remoteMatch;
                                        //console.log('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModeMasterInteractionMngr] Secondary right snap of ' + ctrlMeta.id + ' with ' + snappedControlInfo.name + ' at ' + controlSnappointInViewportPixelStr + 'px');
                                    }
                                    break;
                                }
                            }
                        }
                        if (controlSnappedLeft && controlSnappedRight) {
                            // It will get not better than that :-)
                            break;
                        }
                    }
                }
            }
            // We are chrome only so the force parameter is usable
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-snaptop', controlSnappedTop);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-snapbottom', controlSnappedBottom);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-snapleft', controlSnappedLeft);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-snapright', controlSnappedRight);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-snaptop-remote', controlSnappedTopRemoteMatch);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-snapbottom-remote', controlSnappedBottomRemoteMatch);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-snapleft-remote', controlSnappedLeftRemoteMatch);
            ctrlMeta.jOriginalPosition[0].classList.toggle('tchmi-creator-control-snapright-remote', controlSnappedRightRemoteMatch);
            return {
                left: mouseDelta.left + deltaCorrectionLeft / creatorZoomFactor,
                top: mouseDelta.top + deltaCorrectionTop / creatorZoomFactor,
            };
        }
        __handleDesignerWheelEvents(event) {
            if (event.ctrlKey && event.deltaY !== 0 && rootControlManager) {
                let oldZoom = rootControlManager.getCreatorZoomFactor();
                const zoomSteps = designerModeManager.getSettings().scaleFactors ?? [
                    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1,
                    2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0,
                ];
                let oldIndex = zoomSteps.indexOf(oldZoom);
                let newZoom;
                if (event.deltaY < 0) {
                    newZoom = zoomSteps[oldIndex + 1] ?? zoomSteps[zoomSteps.length - 1];
                }
                else {
                    newZoom = zoomSteps[oldIndex - 1] ?? zoomSteps[0];
                }
                rootControlManager.setCreatorZoom(newZoom);
                const cmd = {
                    name: 'Zoom',
                    targetPartial: TCHMI_TARGET_PARTIAL,
                    factor: newZoom,
                    frameworkType: 'Designer',
                    replyTo: null,
                };
                new SyncCmdToCreatorZoom(cmd).send();
                // Prevent browser scaling
                event.preventDefault();
            }
        }
    };
})();
export { DesignerModeMasterInteractionManager };
/** Runtime Manager */
export const interactionManager = new DesignerModeMasterInteractionManager();
//# sourceMappingURL=DesignerModeMasterInteractionMngr.js.map