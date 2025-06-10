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
import { designerModeManager } from './DesignerModeManager.js';
import { controlMoveManager } from './DesignerModeMasterControlMoveMngr.js';
import { controlResizeManager } from './DesignerModeMasterControlResizeMngr.js';
import { interactionManager } from './DesignerModeMasterInteractionMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
 * Handles drag rect select for easy multiselection in designer master.
 */
let DesignerModeMasterRectSelectManager = (() => {
    var _a, _b, _c;
    let _instanceExtraInitializers = [];
    let ___onDocumentRectSelectMouseDown_decorators;
    let ___onDocumentRectSelectMouseMove_decorators;
    let ___onDocumentRectSelectMouseUp_decorators;
    return class DesignerModeMasterRectSelectManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onDocumentRectSelectMouseDown_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            ___onDocumentRectSelectMouseMove_decorators = [(_b = TcHmi).CallbackMethod.bind(_b)];
            ___onDocumentRectSelectMouseUp_decorators = [(_c = TcHmi).CallbackMethod.bind(_c)];
            __esDecorate(this, null, ___onDocumentRectSelectMouseDown_decorators, { kind: "method", name: "__onDocumentRectSelectMouseDown", static: false, private: false, access: { has: obj => "__onDocumentRectSelectMouseDown" in obj, get: obj => obj.__onDocumentRectSelectMouseDown }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onDocumentRectSelectMouseMove_decorators, { kind: "method", name: "__onDocumentRectSelectMouseMove", static: false, private: false, access: { has: obj => "__onDocumentRectSelectMouseMove" in obj, get: obj => obj.__onDocumentRectSelectMouseMove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onDocumentRectSelectMouseUp_decorators, { kind: "method", name: "__onDocumentRectSelectMouseUp", static: false, private: false, access: { has: obj => "__onDocumentRectSelectMouseUp" in obj, get: obj => obj.__onDocumentRectSelectMouseUp }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Handles drag rect select for easy multiselection in designer master.
         */
        constructor() {
            this.__selectionDragHighlighter = document.createElement('div');
            this.__selectionDragHighlighter.classList.add('tchmi-creator-selection-drag-container');
            TcHmi.System.SharedResources.jqDocument.on(this.__documentRectSelectMouseDownNs, this.__onDocumentRectSelectMouseDown);
        }
        /**
         * Is being used to show a rectangle with drag selection and copy move
         */
        __selectionDragHighlighter = __runInitializers(this, _instanceExtraInitializers);
        /**
         * True while the select rect is active
         */
        __rectSelecting = false;
        /**
         * Disallow opening of select rectangle
         */
        __lockRectSelect = false;
        __documentRectSelectMouseMoveNs = 'mousemove.DesignerModeManager.DocumentRectSelectMouseMove';
        __documentRectSelectMouseUpNs = 'mouseup.DesignerModeManager.DocumentRectSelectMouseUp';
        __documentRectSelectMouseDownNs = 'mousedown.DesignerModeManager.DocumentRectSelectMouseDown';
        /* ***************************************************************************
                        getter and setter
                    *************************************************************************** */
        /** true while the select rect is active */
        getRectSelecting() {
            return this.__rectSelecting;
        }
        /** Disallow opening of select rectangle */
        lockRectSelect() {
            this.__lockRectSelect = true;
        }
        /** Set states to default and removes all events */
        resetState() {
            if (this.__selectionDragHighlighter.isConnected) {
                this.__selectionDragHighlighter.remove();
            }
            this.__rectSelecting = false;
            this.__lockRectSelect = false;
            TcHmi.System.SharedResources.jqDocument.off(this.__documentRectSelectMouseMoveNs);
            TcHmi.System.SharedResources.jqDocument.off(this.__documentRectSelectMouseUpNs);
        }
        /* ***************************************************************************
                        Mouse down/move/up handling on backgrounds aka rectselect
                    *************************************************************************** */
        /**
         * Starts drag rect and adds mousemove + mouseup handlers
         */
        __onDocumentRectSelectMouseDown(event) {
            //printDebugstate('__onDocumentRectSelectMouseDown');
            // Selection Drag Container - Init draw
            if (event.which !== 1) {
                // Leave callback if event is not related to left mouse
                return;
            }
            if (event.originalEvent?.target === document.documentElement) {
                // Interaction with the main scrollbar
                // Click aside from all controls for deselect-all would be document.body or
                // (if that is scrolled away with the Initial Containing Block)
                // the backgroundTarget from rootControlManager
                return;
            }
            interactionManager?.handleInteractionStart(event, null);
            this.__lockRectSelect = false;
            TcHmi.System.SharedResources.jqDocument.on(this.__documentRectSelectMouseMoveNs, this.__onDocumentRectSelectMouseMove);
            TcHmi.System.SharedResources.jqDocument.on(this.__documentRectSelectMouseUpNs, this.__onDocumentRectSelectMouseUp);
        }
        __onDocumentRectSelectMouseMove(event) {
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            //printDebugstate('__onDocumentRectSelectMouseMove');
            if (event.which !== 1) {
                // Leave callback if event is not related to left mouse
                return;
            }
            if (controlMoveManager.getControlMoveActive()) {
                return;
            }
            if (controlResizeManager.getControlResizing()) {
                return;
            }
            if (this.__lockRectSelect) {
                return;
            }
            const startMousePosition = interactionManager.getStartMousePos();
            let deltaStartLeft = event.pageX - startMousePosition.left;
            let deltaStartTop = event.pageY - startMousePosition.top;
            if (Math.abs(deltaStartLeft) <= 5 && Math.abs(deltaStartTop) <= 5) {
                return;
            }
            let w = 0;
            let l = 0;
            let h = 0;
            let t = 0;
            controlMoveManager.setMouseMoving(true);
            if (deltaStartLeft >= 0) {
                w = deltaStartLeft;
                l = startMousePosition.left;
            }
            else {
                w = -deltaStartLeft;
                l = startMousePosition.left + deltaStartLeft;
            }
            if (deltaStartTop >= 0) {
                h = deltaStartTop;
                t = startMousePosition.top;
            }
            else {
                h = -deltaStartTop;
                t = startMousePosition.top + deltaStartTop;
            }
            TcHmi.StyleProvider.setSimpleElementStyle(this.__selectionDragHighlighter, {
                'width': w + 'px',
                'left': l + 'px',
                'height': h + 'px',
                'top': t + 'px',
                'pointer-events': 'none',
            });
            if (!this.__selectionDragHighlighter.parentElement) {
                document.body.appendChild(this.__selectionDragHighlighter);
            }
            this.__rectSelecting = true;
            controlMoveManager.lockControlMove();
            controlResizeManager.lockControlResize();
        }
        __onDocumentRectSelectMouseUp(event) {
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            //printDebugstate('__onDocumentRectSelectMouseUp');
            let resetExistingSelections = false;
            if (event.which !== 1) {
                controlMoveManager.setMouseMoving(false);
            }
            else if (this.__lockRectSelect && // Rect disallowed
                !this.__rectSelecting // Rect not active
            ) {
                // Do nothing
            }
            else {
                // Selection Drag Container - Select
                resetExistingSelections = !this.__processRectSelect(this.__selectionDragHighlighter.getBoundingClientRect(), event.ctrlKey ?? false, event.altKey ?? false);
                this.__selectionDragHighlighter.remove();
                controlMoveManager.setMouseMoving(false);
            }
            // Reset exiting selection/s if no intersection was found while processing rectangle selection.
            // This handles a click on document body too because a click on the document body is a rectangle selection without intersection because the rectangle has a width and height of 0 pixel.
            if (resetExistingSelections) {
                designerModeManager.unselectEach(false);
            }
            // Whatever we are going to do. We do not want to react anymore on mouse moves
            this.resetState();
        }
        /**
         * @param rectDragSelection DOMRect without scroll correction
         * @param ctrlKeyPressed
         * @param altKeyPressed
         */
        __processRectSelect(rectDragSelection, ctrlKeyPressed, altKeyPressed) {
            let res = false;
            let selectionHasChanged = false;
            let isFirstSelect = true;
            const controlsToSelect = [];
            const controlsMetaData = metaDataManager.getControlMetaData();
            for (const ctrlMeta of Object.values(controlsMetaData)) {
                if (!ctrlMeta.domVisibility || ctrlMeta.controlCollapsed) {
                    continue;
                }
                let bParentalOverride = false;
                let ctrlParentMeta = ctrlMeta.parent;
                while (ctrlParentMeta !== null) {
                    if (!ctrlParentMeta.domVisibility || ctrlParentMeta.controlCollapsed) {
                        bParentalOverride = true;
                        break;
                    }
                    ctrlParentMeta = ctrlParentMeta.parent;
                }
                if (bParentalOverride) {
                    continue;
                }
                const tco = TcHmi.Controls.get(ctrlMeta.id);
                if (!tco) {
                    continue;
                }
                if (!tco.getElement()) {
                    continue;
                }
                const controlRect = ctrlMeta.jControlPosition[0].getBoundingClientRect();
                if (this.__hasClientRectIntersection(controlRect, rectDragSelection, altKeyPressed)) {
                    if (ctrlMeta.isPartialRoot) {
                        continue;
                    }
                    res = true; // Return true if at least one intersection exists while processing rectangle selection.
                    if (isFirstSelect && !ctrlKeyPressed) {
                        let unselectedControls = designerModeManager.unselectEach(true);
                        isFirstSelect = false;
                        if (unselectedControls) {
                            selectionHasChanged = true;
                        }
                    }
                    let activeControl = controlMoveManager.getActiveControl();
                    if (activeControl &&
                        activeControl.id === ctrlMeta.id &&
                        activeControl.isContainerControl &&
                        ctrlKeyPressed) {
                        continue; // If select rectangle was started on a container control while ctrl key was pressed do not select the container control itself.
                    }
                    let skip = false;
                    let temp = activeControl;
                    while (temp) {
                        if (temp.id === ctrlMeta.id) {
                            skip = true;
                            break;
                        }
                        temp = temp.parent;
                    }
                    if (skip) {
                        continue; // If select rectangle was started on a container control while ctrl key was pressed do not select any parent of the container.
                    }
                    // defer selection to prevent forced reflow in getBoundingClientRect above
                    controlsToSelect.push(ctrlMeta.id);
                    selectionHasChanged = true;
                }
            }
            controlsToSelect.forEach((ctrlName) => {
                designerModeManager.select(ctrlName, true);
            });
            if (selectionHasChanged) {
                // resync if we had changes
                designerModeManager.resyncSelectedControls();
            }
            return res;
        }
        /**
         * @param rc1
         * @param rc2
         * @param rc1enclosedMode
         */
        __hasClientRectIntersection(rc1, rc2, rc1enclosedMode) {
            let rc1l = rc1.left;
            let rc1r = rc1.right;
            let rc1t = rc1.top;
            let rc1b = rc1.bottom;
            let rc2l = rc2.left;
            let rc2r = rc2.right;
            let rc2t = rc2.top;
            let rc2b = rc2.bottom;
            if (!rc1enclosedMode) {
                // contact mode
                return !(rc1l > rc2r || rc1r < rc2l || rc1t > rc2b || rc1b < rc2t);
            }
            // enclose mode
            return rc1l > rc2l && rc1r < rc2r && rc1t > rc2t && rc1b < rc2b;
        }
    };
})();
export { DesignerModeMasterRectSelectManager };
/** Runtime Manager */
export const rectSelectManager = new DesignerModeMasterRectSelectManager();
//# sourceMappingURL=DesignerModeMasterRectSelectMngr.js.map