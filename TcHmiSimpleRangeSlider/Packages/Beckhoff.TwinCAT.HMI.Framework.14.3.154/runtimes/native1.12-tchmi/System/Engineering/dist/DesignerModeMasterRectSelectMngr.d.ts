/**
 * Handles drag rect select for easy multiselection in designer master.
 */
export declare class DesignerModeMasterRectSelectManager {
    /**
     * Handles drag rect select for easy multiselection in designer master.
     */
    constructor();
    /**
     * Is being used to show a rectangle with drag selection and copy move
     */
    private readonly __selectionDragHighlighter;
    /**
     * True while the select rect is active
     */
    private __rectSelecting;
    /**
     * Disallow opening of select rectangle
     */
    private __lockRectSelect;
    private readonly __documentRectSelectMouseMoveNs;
    private readonly __documentRectSelectMouseUpNs;
    private readonly __documentRectSelectMouseDownNs;
    /** true while the select rect is active */
    getRectSelecting(): boolean;
    /** Disallow opening of select rectangle */
    lockRectSelect(): void;
    /** Set states to default and removes all events */
    resetState(): void;
    /**
     * Starts drag rect and adds mousemove + mouseup handlers
     */
    private __onDocumentRectSelectMouseDown;
    private __onDocumentRectSelectMouseMove;
    private __onDocumentRectSelectMouseUp;
    /**
     * @param rectDragSelection DOMRect without scroll correction
     * @param ctrlKeyPressed
     * @param altKeyPressed
     */
    private __processRectSelect;
    /**
     * @param rc1
     * @param rc2
     * @param rc1enclosedMode
     */
    private __hasClientRectIntersection;
}
/** Runtime Manager */
export declare const rectSelectManager: DesignerModeMasterRectSelectManager;
//# sourceMappingURL=DesignerModeMasterRectSelectMngr.d.ts.map