import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { rootControlManager } from './DesignerModeMasterRootControlMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkZoom extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        const preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
        if (TCHMI_DESIGNER && preparedTargetPartial === TCHMI_TARGET_PARTIAL) {
            rootControlManager.setCreatorZoom(this.__cmd.factor);
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkZoom.js.map