import { type ControlMetaData } from './DesignerModeControlMetaDataMngr.js';
import type { ControlResizeManagerShape } from '../../ServicesTypes/SystemEngineering.js';
/**
 * Handles control resizing in designer master.
 */
export declare class DesignerModeMasterControlResizeManager implements ControlResizeManagerShape {
    /**
     * Handles control resizing in designer master.
     */
    constructor();
    private readonly __anchorMouseMoveNs;
    private readonly __anchorMouseUpNs;
    private readonly __anchorMouseDownNs;
    /**
     * Disallow resizing of a control
     */
    private __lockControlResize;
    /**
     * True while control anchors are hanging on the mouse on resize
     */
    private __controlResizing;
    /**
     * The active control is the direct target of the mouse interaction
     */
    private __activeControl;
    /**
     * Register mouse interaction for control resizing
     * @param ctrlMeta
     */
    registerControl(ctrlMeta: ControlMetaData): void;
    /** true while control anchors are hanging on the mouse on resize */
    getControlResizing(): boolean;
    /** Disallow resizing of a control */
    lockControlResize(): void;
    /**
     * Finds current anchors and adds mousemove + mouseup handlers
     */
    private __onAnchorMouseDown;
    private __onAnchorMouseMove;
    /**
     * Resizes all selected Controls by delta x/y
     * @param anchorType Name of the manipulated Anchor
     * @param delta Distance of xy mouse movement since start of drag in normalised/zoom corrected coordinates
     */
    private __processResize;
    /**
     * Calculate the resize rect offset with respect to rotation (in radians).
     * @param startWidth
     * @param startHeight
     * @param deltaWidth
     * @param deltaHeight
     * @param angle in radians
     */
    private __getResizedRectRotationOffset;
    /**
     * Resize a control based on a specific anchor.
     * Does add missing dimensions in some cases for example left and top is defined and nothing else
     * and you start resizing in bottom direction height will be created.
     * @param ctrlMeta Metadata of the control and its designer container
     * @param anchorType
     * @param deltaLeft Left delta moved with mouse
     * @param deltaTop Top delta moved with mouse
     */
    private __getResizedRect;
    private __onAnchorMouseUp;
}
/** Runtime Manager */
export declare const controlResizeManager: DesignerModeMasterControlResizeManager;
//# sourceMappingURL=DesignerModeMasterControlResizeMngr.d.ts.map