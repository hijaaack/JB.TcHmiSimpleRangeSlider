export declare class DesignerModeManager {
    constructor();
    /**
     * Lock state of the whole designer view (for things which can not be changed after load)
     */
    private __locked;
    private readonly __partialRequested;
    /**
     * Creates Transformed, Untransformed, Selection Highlight and Selection Anchor Container and attaches them to the DOM
     */
    private __onControlAttached;
    private __onThemeDataChanged;
    /**
     * Synchronizes the list of selected controls with the creator.
     */
    resyncSelectedControls(): void;
    /**
     * Synchronizes the attributes of changed controls with the creator.
     */
    resyncControls(): void;
    /**
     * Processes changes of one control inside the Framework
     * @returns true if changes have been processed and false if not!
     */
    syncControl(targetPartial: string, targetControl: string, controlHtml: string | null): boolean;
    /**
     * Creates new Control in Designer and attach it asynchronous
     * @param targetParentControl Id of the Parent
     * @param domPos
     * @param controlHtml HTML Code of the new control
     * @param callback
     */
    createControl(targetParentControl: string, domPos: number, controlHtml: string, callback?: null | ((this: DesignerModeManager, data: TcHmi.IResultObject) => void)): TcHmi.System.ControlManager.CompileResult<TcHmi.Controls.System.baseTcHmiControl>;
    /**
     * Marks a control as selected and enable its highlighting
     * @param controlId The name of the control to select.
     * @param bIgnoreSync If this is true it will not sync to Visual Studio
     */
    select(controlId: string, bIgnoreSync?: boolean): void;
    /**
     * Marks a control as not selected and disable its highlighting
     * @param controlId The name of the control to unselect.
     * @param bIgnoreSync If this is true it will not sync to Visual Studio
     */
    unselect(controlId: string, bIgnoreSync?: boolean): void;
    selectEach(bIgnoreSync: boolean): boolean;
    unselectEach(bIgnoreSync: boolean): boolean;
    /**
     * Sets the Highlight Container to a specific state (visible or invisible) or toggle the state if called with null
     * @param newValue
     */
    setControlLocked(targetControl: string, bLocked: boolean): void;
    /**
     * Locks the designer or live-view
     */
    lock(): void;
    /**
     * Reserved!
     * Currently no need for unlock... Reload required!
     */
    unlock(): void;
    isLocked(): boolean;
    private __settings;
    getSettings(): Settings;
    updateSettings(valueNew: Settings): void;
}
export interface VisualStudioThemeResources {
    ChessboardLight: SystemColor | null;
    ChessboardDark: SystemColor | null;
    ThemeName?: 'Dark' | 'Light';
}
export interface Settings {
    theme?: VisualStudioThemeResources;
    /** Global snap feature toggle */
    enableSnapping: boolean;
    snapToControls: boolean;
    snapToInnerContainerSides: boolean;
    /**
     * --tchmi-designer-control-remote-snap-distance
     * Needs to be adjusted with creator zoom factor.
     */
    snapDistanceToControls: number;
    /** --tchmi-designer-control-untransformed-color */
    untransformedColor: SystemColor | null;
    /** --tchmi-designer-control-unselected-color */
    unSelectedHighlightColor: SystemColor | null;
    /** --tchmi-designer-control-selected-color */
    selectionHighlightColor: SystemColor | null;
    /** --tchmi-designer-control-selected-secondary-color */
    selectedSecondaryColor: SystemColor | null;
    /** --tchmi-designer-control-snap-color */
    snapHighlightColor: SystemColor | null;
    /**
     * Zoom steps from the VS combobox. Floats as in zoom command.
     * @since 2023-12-19
     */
    scaleFactors?: number[];
}
export interface SystemColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
export type baseGridTcHmiControl = TcHmi.Controls.System.baseTcHmiControl & {
    __columnOptions: object[] | undefined;
    __rowOptions: object[] | undefined;
};
/** Runtime Manager */
export declare const designerModeManager: DesignerModeManager;
//# sourceMappingURL=DesignerModeManager.d.ts.map