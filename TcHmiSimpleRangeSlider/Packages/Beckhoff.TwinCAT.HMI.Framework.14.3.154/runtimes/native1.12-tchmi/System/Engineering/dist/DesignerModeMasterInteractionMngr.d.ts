import { type AnchorName, type ControlMetaData, type TcHmiClientRect } from './DesignerModeControlMetaDataMngr.js';
import type { Position } from './Position.js';
/**
 * Handles common interaction properties and methods in designer master.
 */
export declare class DesignerModeMasterInteractionManager {
    /**
     * Handles common interaction properties and methods in designer master.
     */
    constructor();
    /**
     * Cache of control dimension in absolute pixels calculated from the document.
     */
    private __verPositionCache;
    /**
     * Cache of control dimension in absolute pixels calculated from the document.
     */
    private __horPositionCache;
    private __modifierKeyPressed;
    /**
     * event.pageXY on interaction start for mouse handling
     */
    private __startMousePosition;
    /**
     * event.pageXY on interaction start offset for mouse handling while copyMove was activated during move progress
     */
    private __startMousePositionCopyMoveOffsetPosition;
    /**
     * Pixel distance from the mouse to the bounding box of the active control and its size in viewport pixels in the whole document
     */
    private __positionInsideControl;
    /**
     * Name of the manipulated Anchor
     * One of these: 'TopLeft', 'TopCenter', 'TopRight', 'CenterRight', 'BottomRight', 'BottomCenter', 'BottomLeft', 'CenterLeft'
     */
    private __anchorName;
    getAnchorName(): AnchorName | undefined;
    setAnchorName(newAnchorName: AnchorName | undefined): void;
    /** event.pageXY on interaction start for mouse handling */
    getStartMousePos(): Position;
    /** event.pageXY on interaction start offset for mouse handling on copy move while move was already in progress */
    getStartMousePosCopyMoveOffsetPosition(): Position;
    /** Pixel distance from the mouse to the bounding box of the active control and its size in viewport pixels in the whole document */
    getPositionInsideControl(): Omit<TcHmiClientRect, "right" | "bottom">;
    setCtrlModifierKeyState(bState: boolean): void;
    setShiftModifierKeyState(bState: boolean): void;
    /**
     * Clear snap position cache
     */
    clearControlSnapPositionCache(): void;
    /** Remember event.pageXY on interaction start and optional control dimension for mouse handling */
    handleInteractionStart(event: JQuery.TriggeredEvent, activeControl: ControlMetaData | null): void;
    /** Remember event.pageXY on interaction start offset for copy move activated during move process. */
    handleInteractionStartCopyMoveOffsetPosition(event: JQuery.TriggeredEvent): void;
    /**
     * Add a single entry to snap position cache
     * @param ctrlMeta Metadata of the control and its designer container
     */
    refreshControlSnapPositionCache(ctrlMeta: ControlMetaData): void;
    /**
     * Rebuild snap position cache
     * @param ctrlMeta Metadata of the control and its designer container
     */
    refreshControlSnapPositionCache(): void;
    /**
     * @param cache
     * @param newEntry
     * @param key
     */
    private __addSnapPosition;
    /**
     * Remember the dimension for one HTML element
     * @param htmlElem Element which dimension should be added to the caches
     * @param name Name for "self" detection in snap
     */
    private __addPositionCacheEntry;
    /**
     * Correct delta movement with snapping and handle highlighting.
     * Works on document based coordinates, not viewport
     * @param ctrlMeta Metadata of the control and its designer container
     * @param mouseDelta Distance of xy mouse movement since start of drag in controlDimension/normalised/zoom corrected coordinates
     * @param mousePos mouse coordinates in pageX/viewport/getBoundingRect coordinates
     * @param snapControls bool to skip search for a snapTo
     * @returns corrected distance of xy mouse movement since start of drag in controlDimension/normalised/zoom corrected coordinates
     */
    handleSnapping(ctrlMeta: ControlMetaData, mouseDelta: Position, mousePos: Position, snapControls: boolean, directionLock: 'none' | 'topBottom' | 'leftRight'): Position;
    private __handleDesignerWheelEvents;
}
export type PositionCacheEntry = {
    /** Name of the Control */
    name: string;
    /** The match is top/left */
    controlTopOrLeft: boolean;
    /** Is this a snap at a distance */
    remoteMatch: boolean;
};
/** Runtime Manager */
export declare const interactionManager: DesignerModeMasterInteractionManager;
//# sourceMappingURL=DesignerModeMasterInteractionMngr.d.ts.map