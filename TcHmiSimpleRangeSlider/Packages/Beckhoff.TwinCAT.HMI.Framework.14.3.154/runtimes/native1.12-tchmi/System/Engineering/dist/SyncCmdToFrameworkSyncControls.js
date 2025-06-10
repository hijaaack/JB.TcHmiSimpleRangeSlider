import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { designerModeManager } from './DesignerModeManager.js';
import { highlightManager } from './DesignerModeMasterControlHighlightMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkSyncControls extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        if (!TCHMI_DESIGNER) {
            return;
        }
        const preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
        if (preparedTargetPartial !== TCHMI_TARGET_PARTIAL) {
            return;
        }
        let bCausedChanges = false;
        // Handle Normal Scoped Controls
        for (const control of this.__cmd.controls) {
            try {
                // Process changes in the framework
                if (designerModeManager.syncControl(preparedTargetPartial, control.targetControl, control.controlHtml)) {
                    bCausedChanges = true;
                }
            }
            catch (e) {
                // Show the stacktrace only. The debuggers show it in a hopefully nice way ...
                TcHmi.Log.error(e);
                this.__result = TcHmi.Errors.ERROR;
            }
        }
        if (bCausedChanges) {
            highlightManager.processDomVisibility(); // DomVisibility of one or more controls might be changed during sync
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkSyncControls.js.map