import { type ControlMetaData } from './DesignerModeControlMetaDataMngr.js';
/**
 * Handles all control highlighting in designer master.
 */
export declare class DesignerModeMasterControlHighlightManager {
    /**
     * Handles all control highlighting in designer master.
     */
    constructor();
    /**
     * Should the highlight containers be visible?
     */
    private __highlightContainerVisibility;
    private readonly __cloneSource;
    /**
     * Remove all highlight container from DOM
     * @param ctrlMeta
     */
    handleControlRemoved(ctrlMeta: ControlMetaData): void;
    private __asyncWorkData;
    /**
     * In the next Animation Frame adjust all needed highlighters and rebuild the snap control cache
     */
    requestAsyncHighlighterUpdate(): void;
    /**
     * Adjust Transformed and Untransformed Container on Control Resize
     */
    private __onControlsResized;
    /**
     * Adjust Transformed and Untransformed Container on Control Move
     */
    private __onControlsMoved;
    /**
     * Add the control to the list to adjust for the highlighting
     * @param ctrl
     */
    requestAsyncHighlighterUpdateForControl(ctrl: TcHmi.Controls.System.baseTcHmiControl): {
        /** Had we a resize? */
        resized: boolean;
        /** This control had a move */
        moved: boolean;
        /** This control had row/column changed */
        rowColumnChanged: boolean;
    };
    /**
     * Adjust Transformed and Untransformed Container on Control Move
     */
    private __onControlVisibilityChanged;
    /**
     * Moves control highlight to correct cell
     */
    private __onGridRowOrColumnIndexChanged;
    private __onGridRowOrColumnChanged;
    /**
     * Adjust Gridcells overlays
     */
    private __onGridCellResized;
    /**
     * Sets the Highlight Container to a specific state (visible or invisible)
     * @param valueNew
     */
    setHighlightContainerVisibility(valueNew: boolean): void;
    setCreatorVisibilityAttribute(targetControl: string, bVisibility: boolean): void;
    /**
     * Processes Control hiding from Creator Document Outline and show/hides control highlighting
     */
    processDomVisibility(processCtrlMeta?: ControlMetaData): void;
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
    private __handleOuterDimension;
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
    private __handleInnerDimension;
    /**
     * Sets (top|bottom), (left|right), height and width of transformed and untransformed container plus transform-origin, transform on the transformed container to match element, move container to correct gridcell.
     */
    setContainerPositions(ctrlList: Set<TcHmi.Controls.System.baseTcHmiControl> | null | undefined): void;
    private readonly __selectorGripsId;
    private readonly __selectorGrips;
    /**
     * @param element
     * @param angle
     */
    updateGripCursors(ctrlMeta: ControlMetaData): void;
    /**
     * Set all highlight container to match current highlight state
     * @param ctrlMeta Metadata of the control and its designer container
     */
    processHighlightType(ctrlMeta: ControlMetaData): void;
    updateEngineeringStyles(): void;
    /**
     * Creates the element which is is used to highlight current position, selection etc.
     */
    createControlPosition(relatedControl: TcHmi.Controls.System.baseTcHmiControl, zindex: number): JQuery;
    createHierarchyControlPosition(relatedControl: TcHmi.Controls.System.baseTcHmiControl, zindex: number): JQuery;
    /**
     * Creates the element which is is used to highlight original position
     */
    createOriginalPosition(relatedControl: TcHmi.Controls.System.baseTcHmiControl, zindex: number): JQuery;
    /**
     * Creates the element which holds the resize anchor
     */
    createAnchorContainer(relatedControl: TcHmi.Controls.System.baseTcHmiControl, zindex: number, locked: boolean): JQuery;
    /**
     * Creates a hierarchical stack  the element which holds the resize anchor
     */
    createHierarchyAnchorContainer(relatedControl: TcHmi.Controls.System.baseTcHmiControl, zindex: number, locked: boolean): JQuery;
    /**
     * Creates/rebuilds row+cell container for all grid rows and cells for proper positioning the other control container
     * and appends it to the HighlightHierarchicalStack container
     * @param gridControl
     * @param ctrlParent
     */
    createGridHighlighter(gridControl: TcHmi.Controls.System.baseTcHmiControl, ctrlMeta: ControlMetaData | null | undefined): void;
}
/** Runtime Manager */
export declare const highlightManager: DesignerModeMasterControlHighlightManager;
//# sourceMappingURL=DesignerModeMasterControlHighlightMngr.d.ts.map