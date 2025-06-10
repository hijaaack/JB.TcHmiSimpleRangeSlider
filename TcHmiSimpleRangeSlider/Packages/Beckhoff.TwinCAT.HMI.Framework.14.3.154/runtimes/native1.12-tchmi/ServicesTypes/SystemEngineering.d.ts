/**
 * All types for an import from 'System/Engineering/dist/*'
 * without dependency to fight circular dependencies
 **/
export interface ServicesImport {
    partialContentManager: PartialContentManagerShape;
    designerModeComManager: DesignerModeComManagerShape;
    userControlParameterManager: UserControlParameterManagerShape;
    controlResizeManager: ControlResizeManagerShape;
    controlMoveManager: ControlMoveManagerShape;
    errorPane: ErrorPaneShape;
    rootControlManager: RootControlManagerShape;
}
export interface ErrorPaneShape {
    add: (name: string, content: string, type: number) => void;
    remove: (name: string) => void;
}
export interface PartialContentManagerShape {
    requestCurrentPartialContent: (partialUrl: string, callback: (this: void, data: IPartialContentResultObject) => void) => void;
}
export interface IPartialContentResultObject {
    error: number;
    targetPartial?: string;
    /** HTML markup of the partial content. Can be undefined in error case. */
    content?: string;
    details?: any;
}
export interface DesignerModeComManagerShape {
    open: (callback?: (this: void, data: IConnectionResultObject) => void) => void;
}
export interface IConnectionResultObject {
    error: number;
    url?: string;
}
export interface UserControlParameterManagerShape {
    get: (name: string) => UserControlParameter | undefined;
}
export interface UserControlParameter {
    descr: any;
    value: any;
}
export interface ControlResizeManagerShape {
    getControlResizing: () => boolean;
}
export interface ControlMoveManagerShape {
    getControlMoveActive: () => boolean;
}
export interface RootControlManagerShape {
    getViewPortSimulator: () => HTMLElement;
    getBackgroundTarget: () => HTMLElement;
}
//# sourceMappingURL=SystemEngineering.d.ts.map