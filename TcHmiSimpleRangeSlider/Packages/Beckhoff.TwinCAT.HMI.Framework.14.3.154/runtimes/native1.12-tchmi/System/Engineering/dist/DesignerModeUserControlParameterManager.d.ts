import type { UserControlParameterManagerShape } from '../../ServicesTypes/SystemEngineering.js';
export declare class DesignerModeUserControlParameterManager implements UserControlParameterManagerShape {
    constructor();
    private __params;
    add(name: string, param: Parameter): void;
    remove(name: string): void;
    get(name: string): Parameter | undefined;
}
export interface Parameter {
    descr: TcHmi.ControlAttributeDescription;
    value: any;
}
/** Runtime Manager */
export declare const userControlParameterManager: DesignerModeUserControlParameterManager;
//# sourceMappingURL=DesignerModeUserControlParameterManager.d.ts.map