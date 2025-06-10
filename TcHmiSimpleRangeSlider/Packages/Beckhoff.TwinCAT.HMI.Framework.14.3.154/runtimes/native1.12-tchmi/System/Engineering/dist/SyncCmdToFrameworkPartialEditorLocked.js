import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { designerModeManager } from './DesignerModeManager.js';
if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class SyncCmdToFrameworkPartialEditorLocked extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        let preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
        if (preparedTargetPartial !== tchmi_path(TCHMI_TARGET_PARTIAL)) {
            return;
        }
        designerModeManager.lock();
    }
}
//# sourceMappingURL=SyncCmdToFrameworkPartialEditorLocked.js.map