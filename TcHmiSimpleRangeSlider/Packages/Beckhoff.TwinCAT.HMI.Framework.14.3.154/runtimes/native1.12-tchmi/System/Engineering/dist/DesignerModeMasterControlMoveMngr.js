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
// Engineering Classes
import { SyncCmdToCreatorControlDoubleClick } from './SyncCmdToCreatorControlDoubleClick.js';
import { SyncCmdToCreatorCopyMoveControls } from './SyncCmdToCreatorCopyMoveControls.js';
import { SyncCmdToCreatorHierarchyMoveControls } from './SyncCmdToCreatorHierarchyMoveControls.js';
import { metaDataManager, } from './DesignerModeControlMetaDataMngr.js';
import { rootControlManager } from './DesignerModeMasterRootControlMngr.js';
import { interactionManager } from './DesignerModeMasterInteractionMngr.js';
import { hierarchyManager } from './DesignerModeMasterHierarchyMngr.js';
import { controlResizeManager } from './DesignerModeMasterControlResizeMngr.js';
import { rectSelectManager } from './DesignerModeMasterRectSelectMngr.js';
import { syncManager } from './DesignerModeMasterSyncManager.js';
import { designerModeManager } from './DesignerModeManager.js';
import { highlightManager } from './DesignerModeMasterControlHighlightMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
 * Handles control moving in designer master.
 */
let DesignerModeMasterControlMoveManager = (() => {
    var _a, _b, _c;
    let _instanceExtraInitializers = [];
    let ___onHighlightMouseDown_decorators;
    let ___onHighlightMouseMove_decorators;
    let ___onHighlightMouseUp_decorators;
    return class DesignerModeMasterControlMoveManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onHighlightMouseDown_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            ___onHighlightMouseMove_decorators = [(_b = TcHmi).CallbackMethod.bind(_b)];
            ___onHighlightMouseUp_decorators = [(_c = TcHmi).CallbackMethod.bind(_c)];
            __esDecorate(this, null, ___onHighlightMouseDown_decorators, { kind: "method", name: "__onHighlightMouseDown", static: false, private: false, access: { has: obj => "__onHighlightMouseDown" in obj, get: obj => obj.__onHighlightMouseDown }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onHighlightMouseMove_decorators, { kind: "method", name: "__onHighlightMouseMove", static: false, private: false, access: { has: obj => "__onHighlightMouseMove" in obj, get: obj => obj.__onHighlightMouseMove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onHighlightMouseUp_decorators, { kind: "method", name: "__onHighlightMouseUp", static: false, private: false, access: { has: obj => "__onHighlightMouseUp" in obj, get: obj => obj.__onHighlightMouseUp }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Handles control moving in designer master.
         */
        constructor() {
            this.__copyMoveRectHighlighter = document.createElement('canvas');
            this.__copyMoveRectHighlighter.classList.add('tchmi-creator-copymove-container');
            this.__onHighlightMouseUpLastProc = Date.now();
        }
        /**
         * Is being used to show a rectangle with drag selection and copy move
         */
        __copyMoveRectHighlighter = __runInitializers(this, _instanceExtraInitializers);
        __copyMoveRectHighlightOffset = { left: 0, top: 0 };
        __highlightMouseDownNs = 'mousedown.DesignerModeManager.HighlightMouseDown';
        __highlightMouseUpNs = 'mouseup.DesignerModeManager.HighlightMouseUp';
        __highlightMouseMoveNs = 'mousemove.DesignerModeManager.HighlightMouseMove';
        /**
         * The active control is the direct target of the mouse interaction
         */
        __activeControl = null;
        /**
         * The previous active control object
         */
        __activeControlPrev = null;
        /**
         * True when the user has moved the mouse after a mousedown (for double click and select on move detection)
         */
        __mouseMoving = false;
        /**
         * Disallow moving a control
         */
        __lockControlMove = false;
        /**
         * True while controls are hanging on the mouse on drag
         */
        __controlMoveActive = false;
        /**
         * Time of last mouseUp for double click detection
         */
        __onHighlightMouseUpLastProc;
        /**
         * Register mouse interaction for control movement
         * @param ctrlMeta
         */
        registerControl(ctrlMeta) {
            ctrlMeta.jControlPosition.on(this.__highlightMouseDownNs, this.__onHighlightMouseDown);
        }
        /* ***************************************************************************
         *        getter and setter
         *************************************************************************** */
        /**
         * Returns the active control meta data.
         */
        getActiveControl() {
            return this.__activeControl;
        }
        /**
         * Returns the previously active control meta data.
         */
        getActiveControlPrev() {
            return this.__activeControlPrev;
        }
        /** true while controls are hanging on the mouse on drag */
        getControlMoveActive() {
            return this.__controlMoveActive;
        }
        /** Disallow moving a control */
        lockControlMove() {
            this.__lockControlMove = true;
        }
        /** true when the user has moved the mouse after a mousedown (for double click and select on move detection) */
        setMouseMoving(valueNew) {
            this.__mouseMoving = valueNew;
        }
        /** Set states to default and removes all events */
        resetState() {
            this.__lockControlMove = false;
            this.__controlMoveActive = false;
            TcHmi.System.SharedResources.jqDocument.off(this.__highlightMouseMoveNs);
            TcHmi.System.SharedResources.jqDocument.off(this.__highlightMouseUpNs);
            document.body.style.cursor = '';
            hierarchyManager.removeHighlightDropTarget();
            this.__copyMoveRectHighlighter.remove();
            if (this.__activeControl !== null) {
                this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snaptop');
                this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapleft');
                this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapbottom');
                this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapright');
                this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snaptop-remote');
                this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapleft-remote');
                this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapbottom-remote');
                this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapright-remote');
            }
        }
        /* ***************************************************************************
         *       Mouse down/move/up handling on selection div aka move
         *************************************************************************** */
        /**
         * Selects controls and adds mousemove + mouseup handlers
         */
        __onHighlightMouseDown(event) {
            //printDebugstate('__onHighlightMouseDown');
            if (event.which !== 1) {
                // Leave callback if event is not related to left mouse
                return;
            }
            let targetControl = $(event.target).attr('data-tchmi-creator-target-control');
            if (!targetControl) {
                return;
            }
            const acNew = metaDataManager.getControlMetaData(targetControl);
            if (acNew === null) {
                return;
            }
            this.__activeControlPrev = this.__activeControl;
            this.__activeControl = acNew;
            interactionManager.handleInteractionStart(event, acNew);
            interactionManager.handleInteractionStartCopyMoveOffsetPosition(event);
            interactionManager.setAnchorName(undefined);
            this.__lockControlMove = false;
            TcHmi.System.SharedResources.jqDocument.on(this.__highlightMouseMoveNs, this.__onHighlightMouseMove);
            TcHmi.System.SharedResources.jqDocument.on(this.__highlightMouseUpNs, this.__onHighlightMouseUp);
        }
        /**
         * Detects hierarchy and sets/unsets pointer events on selected controls
         * @param preventPointerEvents Prevent pointer events or do not touch
         */
        __selectedControlsSameParent(preventPointerEvents) {
            if (!this.__activeControl) {
                return null;
            }
            let selectedControls = [];
            if (this.__activeControl.parent === null) {
                // Skip, but keep going for pointer event changing
                selectedControls = null;
            }
            const newCssPointerEvent = preventPointerEvents ? 'none' : '';
            const selectedControlsMeta = metaDataManager.getSelectedControlsMetaData();
            for (const ctrlMeta of Object.values(selectedControlsMeta)) {
                if (preventPointerEvents !== null) {
                    // Disable / reenable pointer events for the whole subtree #107071
                    ctrlMeta.jControlPosition[0].style.pointerEvents = newCssPointerEvent;
                    TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jControlPosition[0].querySelectorAll('*'), 'pointer-events', newCssPointerEvent);
                    ctrlMeta.jHierarchyControlposition[0].style.pointerEvents = newCssPointerEvent;
                    TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jHierarchyControlposition[0].querySelectorAll('*'), 'pointer-events', newCssPointerEvent);
                }
                if (ctrlMeta.parent === null) {
                    // One control has no parent. Skip, but keep going for pointer event changing
                    selectedControls = null;
                    continue;
                }
                if (ctrlMeta.parent.id !== this.__activeControl.parent.id) {
                    // The controls have not the same parents. Skip, but keep going for pointer event changing
                    selectedControls = null;
                    continue;
                }
                if (selectedControls) {
                    selectedControls.push(ctrlMeta.id);
                }
            }
            return selectedControls;
        }
        /** Calculates the delta movement of the mouse and triggers {@link __processMove} if the activeControl is not the partial root
         */
        __onHighlightMouseMove(event) {
            if (this.__activeControl === null) {
                return;
            }
            if (controlResizeManager.getControlResizing()) {
                return;
            }
            if (this.__activeControl.isPartialRoot) {
                return;
            }
            if (rectSelectManager.getRectSelecting()) {
                // Not our business
                return;
            }
            if (this.__lockControlMove) {
                return;
            }
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            /** event.pageXY on interaction start for mouse handling */
            const startMousePosition = interactionManager.getStartMousePos();
            const startMousePositionCopyMoveOffsetPosition = interactionManager.getStartMousePosCopyMoveOffsetPosition();
            let deltaLeft = event.pageX - startMousePosition.left, deltaTop = event.pageY - startMousePosition.top;
            // Unselect active control and its parents if active control is container control and
            // ctrl key is pressed because we want to do a rect select within the container control.
            // But allow after a few pixel mousemove
            if (event.ctrlKey === true && this.__activeControl.isContainerControl && deltaLeft < 10 && deltaTop < 10) {
                let temp = this.__activeControl;
                while (temp) {
                    designerModeManager.unselect(temp.id, true);
                    temp = temp.parent;
                }
                return;
            }
            //printDebugstate('__onHighlightMouseMove on ' + this.__activeControl.id);
            let selectedControlsMeta;
            if (event.which !== 1) {
                // ignore not mouse down
                this.resetState();
                return;
            }
            let iterateMeta = this.__activeControl;
            do {
                if (iterateMeta.locked) {
                    // Do not move a locked control
                    return;
                }
                iterateMeta = iterateMeta.parent;
            } while (iterateMeta);
            if (!this.__mouseMoving) {
                if (event.ctrlKey === false && !this.__activeControl.isSelected) {
                    // unselect every control if
                    // ctrl key is not pressed and clicked control is not active
                    selectedControlsMeta = metaDataManager.getSelectedControlsMetaData();
                    for (let id in selectedControlsMeta) {
                        let ctrlMeta = selectedControlsMeta[id];
                        if (ctrlMeta !== null && this.__activeControl !== null && ctrlMeta.id !== this.__activeControl.id) {
                            designerModeManager.unselect(ctrlMeta.id, true);
                        }
                    }
                }
                designerModeManager.select(this.__activeControl.id, true);
            }
            let directionLock = 'none';
            if (deltaLeft !== 0 || deltaTop !== 0) {
                this.__mouseMoving = true;
                if (event.shiftKey === true) {
                    if (Math.abs(deltaLeft) > Math.abs(deltaTop)) {
                        deltaTop = 0;
                        directionLock = 'topBottom';
                    }
                    else {
                        deltaLeft = 0;
                        directionLock = 'leftRight';
                    }
                }
            }
            else {
                rectSelectManager.lockRectSelect(); // avoid a following rect select
                return;
            }
            this.__controlMoveActive = true;
            rectSelectManager.lockRectSelect(); // avoid a following rect select
            if (event.ctrlKey === false) {
                // move
                const creatorZoomFactor = rootControlManager.getCreatorZoomFactor();
                let snappedDelta = interactionManager.handleSnapping(this.__activeControl, { left: deltaLeft / creatorZoomFactor, top: deltaTop / creatorZoomFactor }, { left: event.pageX, top: event.pageY }, !event.altKey, directionLock);
                if (this.__copyMoveRectHighlighter.parentElement) {
                    // Restore default move feedback
                    document.body.style.cursor = '';
                    this.__copyMoveRectHighlighter.remove();
                }
                // Move controls (invalidates style)
                const ctrlList = [];
                selectedControlsMeta = metaDataManager.getSelectedControlsMetaData();
                for (let id in selectedControlsMeta) {
                    const ctrlMeta = selectedControlsMeta[id];
                    if (ctrlMeta.isPartialRoot) {
                        // do not move the partialRoot
                        continue;
                    }
                    this.__processMove(ctrlMeta, snappedDelta);
                    const tco = TcHmi.Controls.get(ctrlMeta.id);
                    if (tco) {
                        ctrlList.push(tco);
                    }
                }
                // Disable all current  (invalidates style)
                hierarchyManager.removeHighlightDropTarget();
                // Must not be a drop target (invalidates style)
                const allSameParent = this.__selectedControlsSameParent(true);
                if (allSameParent !== null) {
                    // needs real layout, so forces reflow
                    const currentDropTarget = hierarchyManager.getContainerFromPoint({
                        left: event.pageX,
                        top: event.pageY,
                    });
                    if (currentDropTarget) {
                        let tco = TcHmi.Controls.get(this.__activeControl.id);
                        const parentId = this.__activeControl.parent ? this.__activeControl.parent.id : '';
                        if (!tco) {
                            // Skip
                        }
                        else if (event.altKey !== true && // alt disables hierarch move
                            parentId !== currentDropTarget.tco.getId()) {
                            // we found a new potential parent
                            hierarchyManager.addHighlightDropTarget({ left: event.pageX, top: event.pageY }, event.target);
                            this.__activeControl.jControlPosition[0].classList.add('tchmi-creator-will-get-new-parent');
                            this.__activeControl.jOriginalPosition[0].classList.add('tchmi-creator-will-get-new-parent');
                        }
                        else if (event.altKey !== true && // alt disables hierarch move
                            this.__activeControl.parent?.isGridControl &&
                            (currentDropTarget.columnIndex !== tco.getGridColumnIndex() ||
                                currentDropTarget.rowIndex !== tco.getGridRowIndex())) {
                            // we found a new potential parent cell
                            hierarchyManager.addHighlightDropTarget({ left: event.pageX, top: event.pageY }, event.target);
                            this.__activeControl.jControlPosition[0].classList.add('tchmi-creator-will-get-new-parent');
                            this.__activeControl.jOriginalPosition[0].classList.add('tchmi-creator-will-get-new-parent');
                        }
                        else {
                            // normal move
                            this.__activeControl.jControlPosition[0].classList.remove('tchmi-creator-will-get-new-parent');
                            this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-will-get-new-parent');
                        }
                    }
                }
                else {
                    // restore something?
                }
                // dimension detection needs real layout (but we are not invalidated)
                // setting positions invalidates style
                highlightManager.setContainerPositions(new Set(ctrlList));
                // Restore drop target (invalidates style)
                this.__selectedControlsSameParent(false);
            }
            else {
                // Copy move
                // Copy only if delta to the left or top is equal or greater 5 pixel to avoid ctrl + click copy move
                if (Math.abs(deltaLeft) >= 5 && Math.abs(deltaTop) >= 5) {
                    if (this.__copyMoveRectHighlighter.parentElement) {
                        // move rectangle only
                        let startMouseOffsetTop = startMousePosition.top - startMousePositionCopyMoveOffsetPosition.top;
                        let startMouseOffsetLeft = startMousePosition.left - startMousePositionCopyMoveOffsetPosition.left;
                        this.__copyMoveRectHighlighter.style.top =
                            this.__copyMoveRectHighlightOffset.top + deltaTop + window.scrollY + startMouseOffsetTop + 'px';
                        this.__copyMoveRectHighlighter.style.left =
                            this.__copyMoveRectHighlightOffset.left +
                                deltaLeft +
                                window.scrollX +
                                startMouseOffsetLeft +
                                'px';
                        // Update visual drop target feedback
                        hierarchyManager.addHighlightDropTarget({ left: event.pageX, top: event.pageY }, event.target);
                    }
                    else {
                        this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snaptop');
                        this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapleft');
                        this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapbottom');
                        this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapright');
                        this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snaptop-remote');
                        this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapleft-remote');
                        this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapbottom-remote');
                        this.__activeControl.jOriginalPosition[0].classList.remove('tchmi-creator-control-snapright-remote');
                        /** Combined bounding box of all selected controls in view port (not document based) pixel */
                        let combinedBounding = {
                            top: Number.POSITIVE_INFINITY,
                            left: Number.POSITIVE_INFINITY,
                            rightside: Number.NEGATIVE_INFINITY,
                            bottomside: Number.NEGATIVE_INFINITY,
                        };
                        let validSelection = true;
                        if (this.__activeControl.parent === null) {
                            validSelection = false;
                        }
                        let controlOutlineList = [];
                        selectedControlsMeta = metaDataManager.getSelectedControlsMetaData();
                        const ctrlList = [];
                        for (const ctrlMeta of Object.values(selectedControlsMeta)) {
                            // Must not be a drop target
                            TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jControlPosition, 'pointer-events', 'none');
                            if (!validSelection) {
                                // keep moving controls, but no expensive calculation
                                continue;
                            }
                            if (ctrlMeta.parent === null) {
                                validSelection = false;
                                continue;
                            }
                            if (ctrlMeta.parent.id !== this.__activeControl.parent.id) {
                                validSelection = false;
                                continue;
                            }
                            let ctrlBB = ctrlMeta.jControlPosition[0].getBoundingClientRect();
                            if (combinedBounding.top > ctrlBB.top) {
                                combinedBounding.top = ctrlBB.top;
                            }
                            if (combinedBounding.left > ctrlBB.left) {
                                combinedBounding.left = ctrlBB.left;
                            }
                            if (combinedBounding.bottomside < ctrlBB.top + ctrlBB.height) {
                                combinedBounding.bottomside = ctrlBB.top + ctrlBB.height;
                            }
                            if (combinedBounding.rightside < ctrlBB.left + ctrlBB.width) {
                                combinedBounding.rightside = ctrlBB.left + ctrlBB.width;
                            }
                            controlOutlineList.push({
                                top: ctrlBB.top,
                                left: ctrlBB.left,
                                height: ctrlBB.height,
                                width: ctrlBB.width,
                            });
                            const tco = TcHmi.Controls.get(ctrlMeta.id);
                            if (tco) {
                                ctrlList.push(tco);
                            }
                            // Move all controls to its start coordinates.
                            // We have its "original" boundingClientRect
                            this.__processMove(ctrlMeta, { left: 0, top: 0 });
                        }
                        highlightManager.setContainerPositions(new Set(ctrlList)); // Important ! Reset highlight container too after controls were moved to its original posiiton.
                        // Store this position to fix copy move highlight container if copy move was activated while move was in progress.
                        interactionManager.handleInteractionStartCopyMoveOffsetPosition(event);
                        // Provide visual drop target feedback
                        hierarchyManager.addHighlightDropTarget({ left: event.pageX, top: event.pageY }, event.target);
                        // Provide global visual feedback
                        if (!validSelection) {
                            document.body.style.cursor = 'no-drop';
                        }
                        else {
                            document.body.style.cursor = 'copy';
                            // remember rect offset
                            this.__copyMoveRectHighlightOffset.top = combinedBounding.top;
                            this.__copyMoveRectHighlightOffset.left = combinedBounding.left;
                            // getBoundingClientRect does not include scrolling
                            let pageBoundingTop = combinedBounding.top + deltaTop + window.scrollY;
                            let pageBoundingLeft = combinedBounding.left + deltaLeft + window.scrollX;
                            let boundingHeight = combinedBounding.bottomside - combinedBounding.top;
                            let boundingWidth = combinedBounding.rightside - combinedBounding.left;
                            this.__copyMoveRectHighlighter.width = boundingWidth;
                            this.__copyMoveRectHighlighter.height = boundingHeight;
                            this.__copyMoveRectHighlighter.style.top = pageBoundingTop + 'px';
                            this.__copyMoveRectHighlighter.style.left = pageBoundingLeft + 'px';
                            this.__copyMoveRectHighlighter.style.height = boundingHeight + 'px';
                            this.__copyMoveRectHighlighter.style.width = boundingWidth + 'px';
                            const ctx = this.__copyMoveRectHighlighter.getContext('2d');
                            if (ctx) {
                                ctx.strokeStyle = 'gray';
                                for (let ctrlOutline of controlOutlineList) {
                                    if (ctrlOutline.left !== undefined &&
                                        ctrlOutline.top !== undefined &&
                                        ctrlOutline.width !== undefined &&
                                        ctrlOutline.height !== undefined) {
                                        ctx.strokeRect(ctrlOutline.left + window.scrollX + deltaLeft - pageBoundingLeft, ctrlOutline.top + window.scrollY + deltaTop - pageBoundingTop, ctrlOutline.width, ctrlOutline.height);
                                    }
                                }
                                document.body.appendChild(this.__copyMoveRectHighlighter);
                            }
                        }
                        for (let id in selectedControlsMeta) {
                            const ctrlMeta = selectedControlsMeta[id];
                            // Restore drop targeting
                            TcHmi.StyleProvider.setSimpleElementStyle(ctrlMeta.jControlPosition, 'pointer-events', '');
                        }
                    }
                }
            }
        }
        /** Correct position of all selected Controls by setting top|bottom and left|right (in CSS only)
         * @param ctrlMeta Metadata of the control and its designer container
         * @param delta Distance of xy mouse movement since start of drag in normalised/zoom corrected coordinates
         */
        __processMove(ctrlMeta, delta) {
            if (!ctrlMeta.controlAttributeDimension ||
                ctrlMeta.absoluteParentRotation === undefined ||
                ctrlMeta.relativeControlRotation === undefined) {
                return;
            }
            let deltaLeft = delta.left;
            let deltaTop = delta.top;
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
                // do not move a locked control
                return;
            }
            const tco = TcHmi.Controls.get(ctrlMeta.id);
            if (!tco) {
                TcHmi.Log.error(`Failed to move control "${ctrlMeta.id}": Not found in control cache.\n`);
                return;
            }
            /** True if the parent control should be moved, too. */
            let parental_lock = false;
            let jParentControls = tco.getElement().parents('[data-tchmi-type]');
            const selectedControlIdsWithChildren = metaDataManager.getSelectedControlIdsWithChildren();
            // Check if the parent should be moved, too
            for (let k = 0, kk = jParentControls.length; k < kk; k++) {
                if (selectedControlIdsWithChildren.includes(jParentControls[k].id)) {
                    parental_lock = true;
                    break;
                }
            }
            // Only move the selection container if parental lock is activated!
            if (parental_lock) {
                return;
            }
            let parentDimension = null;
            let potentialNewSize;
            /**************************** vertical axis ****************************/
            let newStyle = {};
            if (ctrlMeta.controlAttributeDimension.topValue !== null) {
                if (ctrlMeta.controlAttributeDimension.topUnit !== '%') {
                    potentialNewSize =
                        ctrlMeta.controlAttributeDimension.topValue +
                            Math.sin((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft +
                            Math.cos((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop;
                    newStyle['top'] = Math.round(potentialNewSize) + 'px';
                }
                else {
                    // % sized
                    if (parentDimension === null) {
                        parentDimension = tco.getElement().parent().outerHeight() ?? 1;
                    }
                    potentialNewSize =
                        ctrlMeta.controlAttributeDimension.topValue +
                            ((Math.sin((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft +
                                Math.cos((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop) *
                                100) /
                                parentDimension;
                    newStyle['top'] = potentialNewSize + '%';
                }
            }
            // ************************
            if (ctrlMeta.controlAttributeDimension.bottomValue !== null) {
                if (ctrlMeta.controlAttributeDimension.bottomUnit !== '%') {
                    potentialNewSize =
                        ctrlMeta.controlAttributeDimension.bottomValue -
                            Math.sin((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft -
                            Math.cos((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop;
                    newStyle['bottom'] = Math.round(potentialNewSize) + 'px';
                }
                else {
                    // % sized
                    if (parentDimension === null) {
                        parentDimension = tco.getElement().parent().outerHeight() ?? 1;
                    }
                    potentialNewSize =
                        ctrlMeta.controlAttributeDimension.bottomValue +
                            ((-Math.sin((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft -
                                Math.cos((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop) *
                                100) /
                                parentDimension;
                    newStyle['bottom'] = potentialNewSize + '%';
                }
            }
            // Fallback!
            if (ctrlMeta.controlAttributeDimension.topValue === null &&
                ctrlMeta.controlAttributeDimension.bottomValue === null) {
                newStyle['top'] =
                    Math.round(Math.sin((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft +
                        Math.cos((-ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop) + 'px';
            }
            /**************************** horizontal axis ****************************/
            parentDimension = null;
            if (ctrlMeta.controlAttributeDimension.leftValue !== null) {
                if (ctrlMeta.controlAttributeDimension.leftUnit !== '%') {
                    potentialNewSize =
                        ctrlMeta.controlAttributeDimension.leftValue +
                            Math.cos((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft +
                            Math.sin((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop;
                    newStyle['left'] = Math.round(potentialNewSize) + 'px';
                }
                else {
                    // % sized
                    if (parentDimension === null) {
                        parentDimension = tco.getElement().parent().outerWidth() ?? 1;
                    }
                    potentialNewSize =
                        ctrlMeta.controlAttributeDimension.leftValue +
                            ((Math.cos((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft +
                                Math.sin((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop) *
                                100) /
                                parentDimension;
                    newStyle['left'] = potentialNewSize + '%';
                }
            }
            // ************************
            if (ctrlMeta.controlAttributeDimension.rightValue !== null) {
                if (ctrlMeta.controlAttributeDimension.rightUnit !== '%') {
                    potentialNewSize =
                        ctrlMeta.controlAttributeDimension.rightValue -
                            Math.cos((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft -
                            Math.sin((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop;
                    newStyle['right'] = Math.round(potentialNewSize) + 'px';
                }
                else {
                    // % sized
                    if (parentDimension === null) {
                        parentDimension = tco.getElement().parent().outerWidth() ?? 1;
                    }
                    potentialNewSize =
                        ctrlMeta.controlAttributeDimension.rightValue +
                            ((-Math.cos((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft -
                                Math.sin((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop) *
                                100) /
                                parentDimension;
                    newStyle['right'] = potentialNewSize + '%';
                }
            }
            // Fallback!
            if (ctrlMeta.controlAttributeDimension.leftValue === null &&
                ctrlMeta.controlAttributeDimension.rightValue === null) {
                newStyle['left'] =
                    Math.round(Math.cos((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaLeft +
                        Math.sin((ctrlMeta.absoluteParentRotation * Math.PI) / 180) * deltaTop) + 'px';
            }
            TcHmi.StyleProvider.setSimpleElementStyle(tco.getElement(), newStyle);
            metaDataManager.addChangedControlsMetaData(ctrlMeta);
            // update gridcell container and control container when we are inside a grid
            const tcoParent = tco.getParent();
            if (tcoParent && ctrlMeta.parent && ctrlMeta.parent.isGridControl) {
                highlightManager.setContainerPositions(new Set([tcoParent]));
            }
        }
        /**
         * Unselects controls, removes mousemove + mouseup handlers, position controls and sync the position to visual studio
         */
        __onHighlightMouseUp(event) {
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            const ac = this.__activeControl, acPrev = this.__activeControlPrev;
            if (!ac ||
                !ac.controlAttributeDimension ||
                ac.absoluteParentRotation === undefined ||
                ac.relativeControlRotation === undefined) {
                return;
            }
            //printDebugstate('__onHighlightMouseUp');
            let selectedControlsMeta = {};
            if (event.which !== 1) {
                // Perhaps an abort with the right click
                if (event.which === 3 && this.__controlMoveActive) {
                    selectedControlsMeta = metaDataManager.getSelectedControlsMetaData();
                    const controlMap = TcHmi.System.Services.controlManager.getControlsCache();
                    for (let id in selectedControlsMeta) {
                        const ctrlMeta = selectedControlsMeta[id];
                        if (ctrlMeta.isPartialRoot) {
                            // do not move the partialRoot
                            continue;
                        }
                        this.__processMove(ctrlMeta, { left: 0, top: 0 });
                        const control = controlMap.get(id);
                        if (control) {
                            highlightManager.requestAsyncHighlighterUpdateForControl(control);
                        }
                    }
                }
                this.resetState();
                return;
            }
            if (this.__lockControlMove && // move disallowed
                rectSelectManager.getRectSelecting() // The other gesture is active
            ) {
                // Whatever we are going to do. We do not want to react anymore on mouse moves
                this.resetState();
                return;
            }
            if (this.__activeControl === null) {
                this.__mouseMoving = false;
                this.resetState();
                return;
            }
            if (!this.__mouseMoving) {
                if (event.ctrlKey === false && !ac.isSelected) {
                    // unselect every control if
                    // ctrl key is not pressed and clicked control is not active
                    designerModeManager.unselectEach(true);
                }
                designerModeManager.select(ac.id, true);
                // invalidate cache
                rectSelectManager.lockRectSelect(); // avoid a following rect select
            }
            const startMousePosition = interactionManager.getStartMousePos();
            const deltaLeft = event.pageX - startMousePosition.left;
            const deltaTop = event.pageY - startMousePosition.top;
            let interactionState = 0 /* mouseUpState.move */;
            //let doubleclickDebugmessage = '__onHighlightMouseUp called at ' + ac.id;
            // Double Click Time Wall (to avoid multiple selection action for same control)
            if (acPrev !== undefined &&
                acPrev !== null &&
                ac.id === acPrev.id &&
                Math.abs(deltaLeft) < 5 &&
                Math.abs(deltaTop) < 5) {
                if (Date.now() - this.__onHighlightMouseUpLastProc <= 500) {
                    //500ms Timewall
                    interactionState = 3 /* mouseUpState.doubleClick */;
                }
                //doubleclickDebugmessage += ' deltaT: ' + (currentProcTime - lastProcTime);
            }
            else if (acPrev !== undefined && acPrev !== null) {
                //doubleclickDebugmessage += ' acPrev: '+acPrev.id;
            }
            else {
                //doubleclickDebugmessage += ' acPrev: null';
            }
            this.__onHighlightMouseUpLastProc = Date.now();
            //doubleclickDebugmessage += ' deltaLeft: ' + Math.abs(ac.highlightContainerStartLeft - event.pageX) + ' DeltaTop: ' + Math.abs(ac.highlightContainerStartTop - event.pageY);
            //doubleclickDebugmessage += ' Double click detected: ' + bDoubleClick;
            // TcHmi.Log.debug(doubleclickDebugmessage);
            let activeTco = TcHmi.Controls.get(this.__activeControl.id);
            if (interactionState === 3 /* mouseUpState.doubleClick */ && event.ctrlKey) {
                if (activeTco) {
                    let module = TcHmi.System.Data.Modules.controls.map.get(activeTco.getType());
                    if (module &&
                        module.error === TcHmi.Errors.NONE &&
                        module.descriptionExpanded &&
                        !module.descriptionExpanded.defaultDesignerEvent) {
                        // Skip double click reaction when we have no defaultDesignerEvent configured #66478
                        interactionState = 0 /* mouseUpState.move */;
                    }
                }
            }
            if (interactionState === 3 /* mouseUpState.doubleClick */) {
                /***********************************************
                 *              Double Click
                 ***********************************************/
                if (activeTco) {
                    new SyncCmdToCreatorControlDoubleClick({
                        name: 'ControlDoubleClick',
                        frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
                        targetPartial: TCHMI_TARGET_PARTIAL,
                        targetControl: {
                            id: ac.id,
                            type: activeTco.getType(),
                        },
                        replyTo: null,
                    }).send();
                }
            }
            else {
                /***********************************************
                 *              Single Click
                 ***********************************************/
                if (event.ctrlKey === true && !this.__mouseMoving && ac.isSelectedPrev) {
                    if (ac.isSelected) {
                        designerModeManager.unselect(ac.id, true);
                    }
                }
                if (event.ctrlKey === true &&
                    (Math.abs(deltaLeft) > 5 || Math.abs(deltaTop) > 5) // Moved enough for copymove
                ) {
                    interactionState = 2 /* mouseUpState.copyMove */;
                }
                else if (event.altKey !== true &&
                    (Math.abs(deltaLeft) > 5 || Math.abs(deltaTop) > 5) // Moved enough for hierarchy move
                ) {
                    // try hierarchy move
                    interactionState = 1 /* mouseUpState.hierarchyMove */;
                }
                if (ac.parent === null) {
                    // Active control has no parent. Copy and hierarchy move not allowed
                    interactionState = 0 /* mouseUpState.move */;
                }
                let command;
                let controls = null;
                let dropConfig;
                if (interactionState !== 0 /* mouseUpState.move */) {
                    controls = this.__selectedControlsSameParent(true);
                    dropConfig = hierarchyManager.getContainerFromPoint({
                        left: event.pageX,
                        top: event.pageY,
                    });
                    this.__selectedControlsSameParent(false);
                    if (controls === null) {
                        // Hierarchy is not simple, fall back to move
                        interactionState = 0 /* mouseUpState.move */;
                    }
                }
                if (controls && dropConfig) {
                    if (interactionState === 2 /* mouseUpState.copyMove */) {
                        command = {
                            name: 'CopyMoveControls',
                            deltaPosition: {
                                left: null,
                                top: null,
                            },
                            controls: controls,
                            frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
                            targetPartial: TCHMI_TARGET_PARTIAL,
                            targetParentControl: dropConfig.tco.getId(),
                            replyTo: null,
                        };
                    }
                    else if (interactionState === 1 /* mouseUpState.hierarchyMove */) {
                        command = {
                            name: 'HierarchyMoveControls',
                            deltaPosition: {
                                left: null,
                                top: null,
                            },
                            controls: controls,
                            frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
                            targetPartial: TCHMI_TARGET_PARTIAL,
                            targetParentControl: dropConfig.tco.getId(),
                            replyTo: null,
                        };
                        if (controls.includes(dropConfig.tco.getId())) {
                            // Drop into itself deletes the tree
                            this.__mouseMoving = false;
                            this.resetState();
                            return;
                        }
                    }
                    if (interactionState !== 0 /* mouseUpState.move */ && activeTco) {
                        if (dropConfig.rowIndex === null) {
                            // Attributes are always numbers
                            dropConfig.rowIndex = 0;
                        }
                        if (dropConfig.columnIndex === null) {
                            // Attributes are always numbers
                            dropConfig.columnIndex = 0;
                        }
                        let oldRowIndex = activeTco.getGridRowIndex();
                        let oldColumnIndex = activeTco.getGridColumnIndex();
                        if (interactionState === 1 /* mouseUpState.hierarchyMove */ &&
                            dropConfig.rowIndex === oldRowIndex &&
                            dropConfig.columnIndex === oldColumnIndex &&
                            dropConfig.tco === activeTco.getParent()) {
                            // Same parent, same row, same column => move
                            interactionState = 0 /* mouseUpState.move */;
                        }
                        else if (command &&
                            (dropConfig.rowIndex !== oldRowIndex || dropConfig.columnIndex !== oldColumnIndex)) {
                            // Another cell than before
                            // This check prevents to serialize defaultValueInternal value into HTML
                            command.attributes = [
                                {
                                    name: 'data-tchmi-grid-row-index',
                                    value: dropConfig.rowIndex,
                                },
                                {
                                    name: 'data-tchmi-grid-column-index',
                                    value: dropConfig.columnIndex,
                                },
                            ];
                        }
                    }
                    if (interactionState !== 0 /* mouseUpState.move */ &&
                        ac.parent !== null &&
                        // Simple positioning
                        ac.controlAttributeDimension.topValue !== null &&
                        ac.controlAttributeDimension.topUnit === 'px' &&
                        ac.controlAttributeDimension.heightValue !== null &&
                        ac.controlAttributeDimension.heightUnit === 'px' &&
                        ac.controlAttributeDimension.heightMode === 'Value'
                    // Creator will perform the same checks while receiving the command, too
                    ) {
                        if (ac.absoluteParentRotation === 0 && dropConfig.jHighlighter && command) {
                            let acBCR = ac.jOriginalPosition.parent()[0].getBoundingClientRect();
                            let targetBCR = dropConfig.jHighlighter[0].getBoundingClientRect();
                            command.deltaPosition.top = Math.round(deltaTop + (acBCR.top - targetBCR.top));
                        }
                        else {
                            // If we are a child of a rotated container use the original position
                        }
                    }
                    if (interactionState !== 0 /* mouseUpState.move */ &&
                        ac.parent !== null &&
                        // Simple positioning
                        ac.controlAttributeDimension.leftValue !== null &&
                        ac.controlAttributeDimension.leftUnit === 'px' &&
                        ac.controlAttributeDimension.widthValue !== null &&
                        ac.controlAttributeDimension.widthUnit === 'px' &&
                        ac.controlAttributeDimension.widthMode === 'Value' &&
                        // Creator will perform the same checks while receiving the command, too
                        dropConfig.jHighlighter &&
                        command) {
                        if (ac.absoluteParentRotation === 0) {
                            let acBCR = ac.jOriginalPosition.parent()[0].getBoundingClientRect();
                            let targetBCR = dropConfig.jHighlighter[0].getBoundingClientRect();
                            command.deltaPosition.left = Math.round(deltaLeft + (acBCR.left - targetBCR.left));
                        }
                        else {
                            // If we are a child of a rotated container use the original position
                        }
                    }
                }
                if (interactionState === 2 /* mouseUpState.copyMove */ && command && command.name === 'CopyMoveControls') {
                    new SyncCmdToCreatorCopyMoveControls(command).send();
                    // No control should be kept in the changed state
                    metaDataManager.resetChangedControlsMetaData();
                }
                else if (interactionState === 1 /* mouseUpState.hierarchyMove */ &&
                    command &&
                    command.name === 'HierarchyMoveControls') {
                    new SyncCmdToCreatorHierarchyMoveControls(command).send();
                    // No control should be kept in the changed state
                    metaDataManager.resetChangedControlsMetaData();
                }
                else if (interactionState === 0 /* mouseUpState.move */ && activeTco) {
                    // Move child controls selection container relative to current offset of the target control element.
                    const ctrlList = [];
                    const hierarchy = TcHmi.System.resolveControlHierarchy(activeTco, null);
                    const hierarchyRecursion = function DesignerModeManager_HighlightMouseUp_hierarchyRecursion(h) {
                        if (!h.ctrl.getIsContainerControl()) {
                            return;
                        }
                        for (let i = 0, ii = h.children_hierarchy.length; i < ii; i++) {
                            let childHierarchy = h.children_hierarchy[i];
                            ctrlList.push(childHierarchy.ctrl);
                            hierarchyRecursion(childHierarchy);
                        }
                    };
                    hierarchyRecursion(hierarchy);
                    highlightManager.setContainerPositions(new Set(ctrlList));
                    // Important! Make sure this is resetted before calling syncManager?.updatePcElementAndSync('System.onControlPositionParameterChanged');
                    this.__controlMoveActive = false;
                    syncManager.updatePcElementAndSync('System.onControlPositionParameterChanged');
                    // Resync to visual studio
                    designerModeManager.resyncSelectedControls();
                    designerModeManager.resyncControls(); // In this case it is is important to do synchronous resync to guarantee that a double-click command is send after the select event.
                    // Important ! No need to request current partial content for changes generated by designer !
                    // The creator will send an update for the current partial content for each change which is handled by the creator !
                    // Change by designer -> SyncControls -> Creator magic -> CurrentPartialConent
                }
            }
            this.__mouseMoving = false;
            this.resetState();
        }
    };
})();
export { DesignerModeMasterControlMoveManager };
/** Runtime Manager */
export const controlMoveManager = new DesignerModeMasterControlMoveManager();
//# sourceMappingURL=DesignerModeMasterControlMoveMngr.js.map