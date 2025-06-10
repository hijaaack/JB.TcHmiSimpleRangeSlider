import { SyncCmdToFramework } from './SyncCmdToFramework.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkServerAddress extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        const preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
        if (TCHMI_DESIGNER && preparedTargetPartial === TCHMI_TARGET_PARTIAL) {
            TcHmi.System.Services.serverManager.setServerAddress(this.__cmd.protocol, this.__cmd.host, this.__cmd.port);
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkServerAddress.js.map