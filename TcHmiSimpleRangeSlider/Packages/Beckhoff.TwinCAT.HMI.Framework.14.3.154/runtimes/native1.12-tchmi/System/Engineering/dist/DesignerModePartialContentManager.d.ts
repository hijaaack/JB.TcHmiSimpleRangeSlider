import type { PartialContentManagerShape } from '../../ServicesTypes/SystemEngineering.js';
export declare class DesignerModePartialContentManager implements PartialContentManagerShape {
    constructor();
    private __requests;
    private __requestIdCount;
    requestCurrentPartialContent(partialUrl: string, callback: (this: void, data: IPartialContentResultObject) => void): TcHmi.DestroyFunction;
    getRequest(requestId: number): IRequestMetaData | undefined;
}
export interface IRequestMetaData {
    callback: null | ((this: void, data: IPartialContentResultObject) => void);
    timeoutTimer: number;
    destroy?: TcHmi.DestroyFunction;
}
export interface IPartialContentResultObject extends TcHmi.IResultObject {
    targetPartial?: string;
    /** HTML markup of the partial content. Can be undefined in error case. */
    content?: string;
}
/** Runtime Manager */
export declare const partialContentManager: DesignerModePartialContentManager;
//# sourceMappingURL=DesignerModePartialContentManager.d.ts.map