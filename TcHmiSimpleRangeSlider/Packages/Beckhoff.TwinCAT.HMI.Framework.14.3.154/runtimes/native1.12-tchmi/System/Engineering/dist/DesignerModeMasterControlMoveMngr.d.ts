import { type ControlMetaData } from './DesignerModeControlMetaDataMngr.js';
import type { ControlMoveManagerShape } from '../../ServicesTypes/SystemEngineering.js';
/**
 * Handles control moving in designer master.
 */
export declare class DesignerModeMasterControlMoveManager implements ControlMoveManagerShape {
    /**
     * Handles control moving in designer master.
     */
    constructor();
    /**
     * Is being used to show a rectangle with drag selection and copy move
     */
    private readonly __copyMoveRectHighlighter;
    private readonly __copyMoveRectHighlightOffset;
    private readonly __highlightMouseDownNs;
    private readonly __highlightMouseUpNs;
    private readonly __highlightMouseMoveNs;
    /**
     * The active control is the direct target of the mouse interaction
     */
    private __activeControl;
    /**
     * The previous active control object
     */
    private __activeControlPrev;
    /**
     * True when the user has moved the mouse after a mousedown (for double click and select on move detection)
     */
    private __mouseMoving;
    /**
     * Disallow moving a control
     */
    private __lockControlMove;
    /**
     * True while controls are hanging on the mouse on drag
     */
    private __controlMoveActive;
    /**
     * Time of last mouseUp for double click detection
     */
    private __onHighlightMouseUpLastProc;
    /**
     * Register mouse interaction for control movement
     * @param ctrlMeta
     */
    registerControl(ctrlMeta: ControlMetaData): void;
    /**
     * Returns the active control meta data.
     */
    getActiveControl(): ControlMetaData | null;
    /**
     * Returns the previously active control meta data.
     */
    getActiveControlPrev(): ControlMetaData | null;
    /** true while controls are hanging on the mouse on drag */
    getControlMoveActive(): boolean;
    /** Disallow moving a control */
    lockControlMove(): void;
    /** true when the user has moved the mouse after a mousedown (for double click and select on move detection) */
    setMouseMoving(valueNew: boolean): void;
    /** Set states to default and removes all events */
    resetState(): void;
    /**
     * Selects controls and adds mousemove + mouseup handlers
     */
    private __onHighlightMouseDown;
    /**
     * Detects hierarchy and sets/unsets pointer events on selected controls
     * @param preventPointerEvents Prevent pointer events or do not touch
     */
    private __selectedControlsSameParent;
    /** Calculates the delta movement of the mouse and triggers {@link __processMove} if the activeControl is not the partial root
     */
    private __onHighlightMouseMove;
    /** Correct position of all selected Controls by setting top|bottom and left|right (in CSS only)
     * @param ctrlMeta Metadata of the control and its designer container
     * @param delta Distance of xy mouse movement since start of drag in normalised/zoom corrected coordinates
     */
    private __processMove;
    /**
     * Unselects controls, removes mousemove + mouseup handlers, position controls and sync the position to visual studio
     */
    private __onHighlightMouseUp;
}
/** Runtime Manager */
export declare const controlMoveManager: DesignerModeMasterControlMoveManager;
//# sourceMappingURL=DesignerModeMasterControlMoveMngr.d.ts.map