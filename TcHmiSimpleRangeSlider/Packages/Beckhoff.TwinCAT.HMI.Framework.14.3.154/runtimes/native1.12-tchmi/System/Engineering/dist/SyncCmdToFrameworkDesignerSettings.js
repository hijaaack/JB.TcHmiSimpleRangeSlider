import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { designerModeManager } from './DesignerModeManager.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkDesignerSettings extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        if (!TCHMI_DESIGNER) {
            return;
        }
        designerModeManager.updateSettings(this.__cmd.settings);
    }
}
//# sourceMappingURL=SyncCmdToFrameworkDesignerSettings.js.map