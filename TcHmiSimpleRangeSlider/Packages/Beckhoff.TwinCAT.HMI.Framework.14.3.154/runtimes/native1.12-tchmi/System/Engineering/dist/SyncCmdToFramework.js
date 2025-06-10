if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class SyncCmdToFramework {
    constructor(cmd) {
        this.__cmd = cmd;
        this.__result = TcHmi.Errors.NONE;
    }
    __result;
}
//# sourceMappingURL=SyncCmdToFramework.js.map