/**
 * Handles all control meta data in designer master and slave.
 */
export declare class DesignerModeControlMetaDataManager {
    /**
     * Handles all control meta data in designer master and slave.
     */
    constructor();
    private __controlsMetaData;
    private __selectedControlsMetaData;
    private __selectedControlsMetaDataHasChanged;
    private __changedControlsMetaData;
    private __changedControlsMetaDataHasChanged;
    /**
     * A list of all ids of selected Controls without the partial root
     */
    private __selectedControlIdsWithChildren;
    /**
     * Register a control for the ControlMetaCache
     * @param ctrlMeta
     */
    register(ctrlMeta: ControlMetaData): void;
    /**
     * Unregister a control from ControlMetaCache and selectedControlsMetaData
     * @param tco
     */
    unregister(tcoId: string): void;
    private __onControlDetached;
    /**
     * Returns all ControlMetaData objects
     */
    getControlMetaData(): TcHmi.Dictionary<ControlMetaData>;
    /**
     * Returns the ControlMetaData object to an id or null.
     * If id is null or undefined a list of all ControlMetaDataObjects will be returned instead.
     * @param id
     */
    getControlMetaData(id: string): ControlMetaData | null;
    /**
     * Refresh metadata of all controls
     */
    refreshControlMetaData(): null;
    /**
     * Refresh metadata of a control and returns the metadata object
     * @param idOrControl The id of the control as string or the ControlMetaData object of the control
     */
    refreshControlMetaData(idOrControl: string | ControlMetaData): null | ControlMetaData;
    /**
     * Returns ControlMetaData for all controls with changes.
     */
    getChangedControlsMetaData(): TcHmi.Dictionary<ControlMetaData>;
    resetChangedControlsMetaData(): void;
    getChangedControlsMetaDataHasChanged(): boolean;
    /**
     * Adds a ControlMetaData object to changed cache
     */
    addChangedControlsMetaData(ctrlMeta: ControlMetaData): void;
    /**
     * Returns all selected ControlMetaData objects
     */
    getSelectedControlsMetaData(): TcHmi.Dictionary<ControlMetaData>;
    resetSelectedControlsMetaDataHasChanged(): void;
    getSelectedControlsMetaDataHasChanged(): boolean;
    /**
     * Adds a ControlMetaData object to select cache
     */
    selectControl(ctrlMeta: ControlMetaData): void;
    /**
     * Removes a ControlMetaData object from select cache
     */
    unselectControl(ctrlMeta: ControlMetaData): void;
    /** A list of all ids of selected Controls without the partial root */
    getSelectedControlIdsWithChildren(): string[];
    /**
     * Rebuild selected controlsID cache.
     * Corrects childcontrol-selected class with all controls.
     */
    private __rebuildSelectIdCache;
    /**
     * Returns the control dimension defined by its attributes
     * @param tco The control object
     */
    private __getControlAttributeDimension;
    /**
     * Returns the control dimension defined by jquery.css
     * @param tco The control object
     */
    private __getControlCssPixelDimension;
    /**
     * Returns the angle in degrees
     * @param jElem
     */
    private __getAbsoluteRotation;
    /**
     * Returns the angle in degrees
     * @param elem
     */
    private __getRelativeRotation;
}
export interface ControlMetaData {
    /** Control id */
    id: string;
    /** MetaData for the parent. Can be null if we have no parent control. */
    parent: ControlMetaData | null;
    /** Used for highlighting the original control position without transformations etc. */
    jOriginalPosition: JQuery;
    /** Used for highlighting the current control position, selection, mouseover including transformations etc. */
    jControlPosition: JQuery;
    /** Stack Container for clean Hierarchical z-index handling for Highlight */
    jHierarchyControlposition: JQuery;
    /** Used for resizing the current control including transformations. */
    jAnchorContainer: JQuery;
    /** Stack Container for clean Hierarchical z-index handling for AnchorContainer */
    jHierarchyAnchorContainer: JQuery;
    /** Is this Control selected so it's Property can be manipulated */
    isSelected: boolean;
    /** Old select State. Needed for own double click handling */
    isSelectedPrev: boolean;
    /** The Partial Root is special in some select and drag&drop interactions */
    isPartialRoot: boolean;
    /** Control is hidden in the Creator via Document Outline (creator attribute 'data-tchmi-creator-visibility') */
    domVisibility: boolean;
    /** Control is locked so no dimension change with the mouse is allowed  (creator attribute 'data-tchmi-creator-locked')*/
    locked: boolean;
    /** Control has visibility set to Collapsed */
    controlCollapsed: boolean;
    /** Containter are special */
    isContainerControl: boolean;
    /** TcHmiGrid is special */
    isGridControl: boolean;
    /** MASTER only! Control attribute dimension on interaction start for resize/move handling */
    controlAttributeDimension: TcHmiControlAttributeDimension | undefined;
    /** MASTER only! Control css pixel dimension on interaction start for resize/move handling */
    controlCssPixelDimension: TcHmiControlCssPixelDimension | undefined;
    /** MASTER only! Control rotation on interaction start for resize handling in degree */
    relativeControlRotation: number | undefined;
    /** MASTER only! Control rotation of the Parent on interaction start for resize handling in degree */
    absoluteParentRotation: number | undefined;
}
/** TcHmi internal read/write ClientRect */
export interface TcHmiClientRect {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
}
export interface TcHmiSparseStringClientRect extends TcHmi.Dictionary<string | undefined> {
    bottom?: string;
    height?: string;
    left?: string;
    right?: string;
    top?: string;
    width?: string;
}
/** Holds the control dimension defined by its attributes */
export interface TcHmiControlAttributeDimension {
    /** Caches the control attribute */
    topValue: number | null;
    /** Caches the control attribute */
    topUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    leftValue: number | null;
    /** Caches the control attribute */
    leftUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    widthValue: number | null;
    /** Caches the control attribute */
    widthUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    widthMode: TcHmi.SizeModeWithContent;
    /** Caches the control attribute */
    minWidthValue: number | null;
    /** Caches the control attribute */
    minWidthUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    maxWidthValue: number | null;
    /** Caches the control attribute */
    maxWidthUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    rightValue: number | null;
    /** Caches the control attribute */
    rightUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    heightValue: number | null;
    /** Caches the control attribute */
    heightUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    minHeightValue: number | null;
    /** Caches the control attribute */
    minHeightUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    maxHeightValue: number | null;
    /** Caches the control attribute */
    maxHeightUnit: TcHmi.DimensionUnit;
    /** Caches the control attribute */
    heightMode: TcHmi.SizeModeWithContent;
    /** Caches the control attribute */
    bottomValue: number | null;
    /** Caches the control attribute */
    bottomUnit: TcHmi.DimensionUnit;
}
export interface TcHmiControlCssPixelDimension {
    bottom: number | null;
    height: number | null;
    left: number | null;
    right: number | null;
    top: number | null;
    width: number | null;
}
/** 'TopLeft' | 'TopCenter' | 'TopRight' | 'CenterRight' | 'BottomRight' | 'BottomCenter' | 'BottomLeft' | 'CenterLeft' */
export type AnchorName = 'TopLeft' | 'TopCenter' | 'TopRight' | 'CenterRight' | 'BottomRight' | 'BottomCenter' | 'BottomLeft' | 'CenterLeft';
/** Runtime Manager */
export declare const metaDataManager: DesignerModeControlMetaDataManager;
//# sourceMappingURL=DesignerModeControlMetaDataMngr.d.ts.map