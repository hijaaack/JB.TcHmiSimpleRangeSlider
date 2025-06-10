import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { highlightManager } from './DesignerModeMasterControlHighlightMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkCurrentPartialHighlightContainerState extends SyncCmdToFramework {
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
        highlightManager.setHighlightContainerVisibility(this.__cmd.state);
    }
}
//# sourceMappingURL=SyncCmdToFrameworkCurrentPartialHighlightContainerState.js.map