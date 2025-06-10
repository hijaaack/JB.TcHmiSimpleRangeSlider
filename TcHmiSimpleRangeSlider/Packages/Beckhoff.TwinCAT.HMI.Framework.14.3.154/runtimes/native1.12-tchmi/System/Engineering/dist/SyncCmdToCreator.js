if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
// break circular dependency with dynamic load
let designerModeComManager;
import('./DesignerModeComManager.js')
    .then((module) => {
    designerModeComManager = module.designerModeComManager;
})
    .catch((ex) => {
    TcHmi.Log.errorEx('Failed to load designerModeComManager in Framework SyncCmdToCreator:', ex);
});
export class SyncCmdToCreator {
    constructor(cmd) {
        this.__cmd = cmd;
    }
    __cmd;
    send() {
        if (!designerModeComManager) {
            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToCreator] Internal error: designerModeComManager not loaded');
            return;
        }
        designerModeComManager.sendCommand(this.__cmd);
    }
}
//# sourceMappingURL=SyncCmdToCreator.js.map