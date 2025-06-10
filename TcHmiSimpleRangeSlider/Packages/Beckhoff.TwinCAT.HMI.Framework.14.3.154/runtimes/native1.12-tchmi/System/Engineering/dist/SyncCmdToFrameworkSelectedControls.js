import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { designerModeManager } from './DesignerModeManager.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkSelectedControls extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        const preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
        if (TCHMI_DESIGNER && preparedTargetPartial === TCHMI_TARGET_PARTIAL) {
            designerModeManager.unselectEach(true); // Do not synchronize ! Following select will trigger synchronization of current selection.
            for (const controlId of this.__cmd.controls) {
                designerModeManager.select(controlId, true);
            }
            // Creater needs an additional SelectedControls after we have processed selection.
            designerModeManager.resyncSelectedControls();
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkSelectedControls.js.map