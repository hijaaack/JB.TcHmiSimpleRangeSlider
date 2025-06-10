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
import { rootControlManager } from './DesignerModeMasterRootControlMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
 * Handles all container highlighting while dragging controls in designer master.
 */
let DesignerModeMasterHierarchyManager = (() => {
    var _a, _b;
    let _instanceExtraInitializers = [];
    let ___onDragEnter_decorators;
    let ___onDragLeave_decorators;
    return class DesignerModeMasterHierarchyManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onDragEnter_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            ___onDragLeave_decorators = [(_b = TcHmi).CallbackMethod.bind(_b)];
            __esDecorate(this, null, ___onDragEnter_decorators, { kind: "method", name: "__onDragEnter", static: false, private: false, access: { has: obj => "__onDragEnter" in obj, get: obj => obj.__onDragEnter }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, ___onDragLeave_decorators, { kind: "method", name: "__onDragLeave", static: false, private: false, access: { has: obj => "__onDragLeave" in obj, get: obj => obj.__onDragLeave }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Handles all container highlighting while dragging controls in designer master.
         */
        constructor() {
            // Allow dragging into the chessboard area
            TcHmi.System.SharedResources.jqBody
                .on('dragover.DesignerModeMasterHierarchyManager.body', (event) => {
                // Mark this as a valid drag target (needed for trigger dragenter)
                event.preventDefault();
            })
                .on('dragenter.DesignerModeMasterHierarchyManager.body', this.__onDragEnter)
                .on('dragleave.DesignerModeMasterHierarchyManager.body', this.__onDragLeave);
        }
        /**
         * Collection of active highlighting objects.
         */
        __dragtargetContainerHighlighting = (__runInitializers(this, _instanceExtraInitializers), {}); // The potential drop target control object
        /**
                    Is this a control which should have designer support?
                    */
        isDesignerModeControl(id) {
            let res = false;
            // Function: hierarchyRecursion
            let hierarchyRecursion = function isDesignerModeControl_hierarchyRecursion(h) {
                const tco = h.ctrl;
                if (tco.getId() === id) {
                    res = true;
                    return;
                }
                if (!h.ctrl.getIsContainerControl()) {
                    return;
                }
                for (let i = 0, ii = h.children_hierarchy.length; i < ii; i++) {
                    let childHierarchy = h.children_hierarchy[i];
                    hierarchyRecursion(childHierarchy);
                    if (res) {
                        return;
                    }
                }
            };
            let tpco = undefined;
            let partial = document.querySelector(`div[data-tchmi-creator-partial-key="${TCHMI_TARGET_PARTIAL}"]`);
            if (partial) {
                tpco = TcHmi.Controls.get(partial.id);
            }
            if (tpco) {
                let designerIgnore = false;
                let tco = TcHmi.Controls.get(id);
                if (tco) {
                    let element = tco.getElement();
                    if (element && element.length > 0) {
                        designerIgnore = element[0].hasAttribute('data-tchmi-designer-ignore');
                    }
                }
                if (designerIgnore) {
                    res = false;
                }
                else {
                    let hierarchy = TcHmi.System.resolveControlHierarchy(tpco, null);
                    hierarchyRecursion(hierarchy);
                }
            }
            return res;
        }
        /* ******************************************************************************************
                        Container interaction for drag out of Visual Studio
                     *******************************************************************************************/
        /**
         * Register mouse interaction for container controls
         * @param ctrlMeta
         */
        registerContainerControl(ctrlMeta) {
            // Register drag events
            ctrlMeta.jControlPosition.on('dragover.DesignerModeMasterHierarchyManager.' + ctrlMeta.id, (event) => {
                // Mark this as a valid drag target (needed for trigger dragenter)
                event.preventDefault();
            });
            // Change class only on dragenter for performance
            ctrlMeta.jControlPosition.on('dragenter.DesignerModeMasterHierarchyManager.' + ctrlMeta.id, this.__onDragEnter);
            // Cleanup only the correct highlighting
            ctrlMeta.jControlPosition.on('dragleave.DesignerModeMasterHierarchyManager.' + ctrlMeta.id, this.__onDragLeave);
            // Windows OLE has no "dragend" so we will probably never get dragend events from VS event emulation
        }
        /**
         * Register mouse interaction for container elements
         * @param ctrlMeta
         */
        registerContainerElement(jElem) {
            jElem
                .on('dragenter.DesignerModeMasterHierarchyManager', this.__onDragEnter)
                .on('dragleave.DesignerModeMasterHierarchyManager', this.__onDragLeave);
        }
        /**
         * Highlighting for dragging a new control into the designer
         */
        __onDragEnter(event) {
            // We only want to highlight something, the real drop is handled by Visual Studio. So preventDefault is not really needed, but cleaner
            event.preventDefault();
            if (event.pageX === undefined || event.pageY === undefined) {
                // Invalid event
                return;
            }
            this.addHighlightDropTarget({ left: event.pageX, top: event.pageY }, event.target);
        }
        /**
         * Disable Highlighting for dragging a new control into the designer
         */
        __onDragLeave(event) {
            const strTargetControl = event.target.hasAttribute('data-tchmi-creator-target-control')
                ? event.target.getAttribute('data-tchmi-creator-target-control')
                : 'body';
            const rowIndex = event.target.hasAttribute('data-tchmi-creator-grid-rowindex')
                ? event.target.getAttribute('data-tchmi-creator-grid-rowindex')
                : null;
            const cellIndex = event.target.hasAttribute('data-tchmi-creator-grid-cellindex')
                ? event.target.getAttribute('data-tchmi-creator-grid-cellindex')
                : null;
            // Remove only matching highlighting container
            const targetKey = strTargetControl + '_r' + rowIndex + '_c' + cellIndex;
            if (this.__dragtargetContainerHighlighting[targetKey]) {
                this.__dragtargetContainerHighlighting[targetKey].classList.remove('tchmi-creator-possibledroptarget');
                delete this.__dragtargetContainerHighlighting[targetKey];
            }
        }
        /* ******************************************************************************************
                        Container highlighting
                     *******************************************************************************************/
        /**
         * Activate drop highlight from a point relative to the whole document
         * @param position coordinates relative to the whole document
         * @param targetElem
         */
        addHighlightDropTarget(position, targetElem) {
            const dropConfig = this.getContainerFromPoint(position);
            // Clean all old highlighting after getContainerFromPoint so elementfrompoint does no forced reflow
            this.removeHighlightDropTarget();
            if (!dropConfig || !dropConfig.jHighlighter) {
                return;
            }
            const strTargetControl = targetElem.hasAttribute('data-tchmi-creator-target-control')
                ? targetElem.getAttribute('data-tchmi-creator-target-control')
                : 'body';
            const targetKey = strTargetControl + '_r' + dropConfig.rowIndex + '_c' + dropConfig.columnIndex;
            dropConfig.jHighlighter[0].classList.add('tchmi-creator-possibledroptarget');
            this.__dragtargetContainerHighlighting[targetKey] = dropConfig.jHighlighter[0];
        }
        /**
         * Remove drop highlight
         */
        removeHighlightDropTarget() {
            for (let key in this.__dragtargetContainerHighlighting) {
                this.__dragtargetContainerHighlighting[key].classList.remove('tchmi-creator-possibledroptarget');
                delete this.__dragtargetContainerHighlighting[key];
            }
        }
        /* ******************************************************************************************
                        Container interaction for drag out of Visual Studio
                     *******************************************************************************************/
        /**
         * Gets the highest container from a point on the whole document
         * Unwanted targets have to be excluded with css pointer-events:none
         * @param position coordinates relative to the document
         */
        getContainerFromPoint(position) {
            // Get Target Partial Control
            const currentView = TcHmi.System.Services.viewManager.getView();
            if (currentView === null) {
                return null;
            }
            // Determine dom drop target
            const jClickTarget = $(document.elementFromPoint(position.left - window.scrollX, position.top - window.scrollY));
            let jHighlighter;
            // Get next parent of drop target which is a possible drop target
            let tco = undefined;
            if (jClickTarget.length === 0 || jClickTarget[0] === document.body) {
                // A drop outside of all partials should be inside the main partial
                tco = currentView;
                const ctrlMeta = metaDataManager.getControlMetaData(tco.getId());
                if (ctrlMeta) {
                    jHighlighter = ctrlMeta.jControlPosition;
                }
            }
            else {
                // Determine list of possible drop targets
                const resolvePossibleDropTargets = function (h) {
                    const ctrl = h.ctrl;
                    const ctrlType = ctrl.getType();
                    if ((ctrlType === 'TcHmi.Controls.System.TcHmiView' ||
                        ctrlType === 'TcHmi.Controls.System.TcHmiContent' ||
                        ctrlType === 'TcHmi.Controls.System.TcHmiUserControl') &&
                        ctrl.getId() !== currentView.getId()) {
                        return []; // Content of a partial and partial itself is no valid drop target if it's not the target partial.
                    }
                    let res = [];
                    if (ctrl.getIsContainerControl() &&
                        !(ctrl.getElement()?.[0]?.hasAttribute('data-tchmi-designer-ignore') ?? true)) {
                        res.push(ctrl);
                        for (let i = 0, ii = h.children_hierarchy.length; i < ii; i++) {
                            const pdts = resolvePossibleDropTargets(h.children_hierarchy[i]);
                            res = res.concat(pdts);
                        }
                    }
                    return res;
                };
                const hierarchy = TcHmi.System.resolveControlHierarchy(currentView, null);
                const pdts = resolvePossibleDropTargets(hierarchy);
                let tmpInteractioncont = jClickTarget;
                do {
                    const targetId = tmpInteractioncont.attr('data-tchmi-creator-target-control');
                    if (targetId !== undefined) {
                        let bDropTargetFound = false;
                        for (let i = 0, ii = pdts.length; i < ii; i++) {
                            const pdt = pdts[i];
                            if (pdt.getId() === targetId) {
                                tco = pdt;
                                jHighlighter = tmpInteractioncont;
                                bDropTargetFound = true;
                                break;
                            }
                        }
                        if (bDropTargetFound) {
                            break;
                        }
                    }
                    tmpInteractioncont = tmpInteractioncont.parent();
                } while (tmpInteractioncont.length > 0);
                tmpInteractioncont = null;
                if (tco === undefined || tco === null) {
                    // A drop outside of all partials should be inside the main partial
                    tco = currentView;
                }
            }
            // Get position in current parent context
            let x = position.left;
            let y = position.top;
            let rowIndex = null;
            let cellIndex = null;
            if (jHighlighter &&
                TcHmi.System.Services.controlManager
                    .getDescriptionTypes(tco.getType())
                    .includes('TcHmi.Controls.System.TcHmiGrid')) {
                if (jClickTarget[0].classList.contains('tchmi-creator-gridcell')) {
                    // We hit an empty cell
                    jHighlighter = jClickTarget;
                }
                else {
                    // We hit a future sibling
                    const jClickTargetParent = jClickTarget.parent();
                    if (jClickTargetParent.length &&
                        jClickTargetParent[0].classList.contains('tchmi-creator-hierarchy-gridcellposition')) {
                        jHighlighter = jClickTargetParent;
                    }
                }
                let parsedRowIndex = parseInt(jHighlighter.attr('data-tchmi-creator-grid-rowindex') ?? '0', 10);
                let parsedCellIndex = parseInt(jHighlighter.attr('data-tchmi-creator-grid-cellindex') ?? '0', 10);
                if (!isNaN(parsedCellIndex) && !isNaN(parsedRowIndex)) {
                    rowIndex = parsedRowIndex;
                    cellIndex = parsedCellIndex;
                    // Correct position due to cell shift
                    const cellPos = jHighlighter.position();
                    x = x - cellPos.left;
                    y = y - cellPos.top;
                }
            }
            let tmpElem2 = tco.getElement();
            if (tmpElem2.length > 0) {
                do {
                    const pos = tmpElem2.position();
                    x = x - pos.left;
                    y = y - pos.top;
                    // Get next parent
                    tmpElem2 = tmpElem2.offsetParent();
                    x = x - parseFloat(tmpElem2.css('border-left-width')); // gives clean 0px when border style is none
                    y = y - parseFloat(tmpElem2.css('border-top-width'));
                } while (tmpElem2.length > 0 && tmpElem2[0] !== document.body && tmpElem2[0] !== document.documentElement);
            }
            // Handle position!
            const creatorZoomFactor = rootControlManager?.getCreatorZoomFactor() ?? 1;
            let relativMousePosX = Math.round(x / creatorZoomFactor);
            let relativMousePosY = Math.round(y / creatorZoomFactor);
            return {
                /** tchmicontrol of the target container */
                tco: tco,
                /** jQuery element which makes the mouse interaction. Could be a div for the control or a grid cell */
                jHighlighter: jHighlighter,
                mousePosXinTarget: relativMousePosX,
                mousePosYinTarget: relativMousePosY,
                /** rowIndex if we are inside a Grid. null if we are not in a grid */
                rowIndex: rowIndex,
                /** columnIndex if we are inside a Grid. null if we are not in a grid */
                columnIndex: cellIndex,
            };
        }
    };
})();
export { DesignerModeMasterHierarchyManager };
/** Runtime Manager */
export const hierarchyManager = new DesignerModeMasterHierarchyManager();
//# sourceMappingURL=DesignerModeMasterHierarchyMngr.js.map