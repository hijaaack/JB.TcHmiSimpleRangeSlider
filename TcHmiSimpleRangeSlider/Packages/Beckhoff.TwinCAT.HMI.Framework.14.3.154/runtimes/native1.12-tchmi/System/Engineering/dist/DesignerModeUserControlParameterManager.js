if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class DesignerModeUserControlParameterManager {
    constructor() {
        this.__params = new Map();
    }
    __params = new Map();
    add(name, param) {
        this.__params.set(name, param);
    }
    remove(name) {
        this.__params.delete(name);
    }
    get(name) {
        if (name) {
            return this.__params.get(name);
        }
        return undefined;
    }
}
/** Runtime Manager */
export const userControlParameterManager = new DesignerModeUserControlParameterManager();
//# sourceMappingURL=DesignerModeUserControlParameterManager.js.map