import { SyncCmdToFramework } from './SyncCmdToFramework.js';
if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class SyncCmdToFrameworkPartialEditorUnlocked extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        // Our clients now have an own reload handling. No need to reload
        if (TCHMI_DESIGNER) {
            let preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
            if (preparedTargetPartial !== tchmi_path(TCHMI_TARGET_PARTIAL)) {
                return;
            }
            if (window.location !== undefined && window.location !== null) {
                window.location.reload();
                return;
            }
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkPartialEditorUnlocked.js.map