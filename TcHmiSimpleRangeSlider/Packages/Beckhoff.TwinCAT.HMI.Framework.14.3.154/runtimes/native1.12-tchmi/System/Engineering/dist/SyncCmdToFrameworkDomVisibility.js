import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { highlightManager } from './DesignerModeMasterControlHighlightMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkDomVisibility extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        const preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
        if (TCHMI_DESIGNER && preparedTargetPartial === TCHMI_TARGET_PARTIAL) {
            highlightManager.setCreatorVisibilityAttribute(this.__cmd.targetControl, this.__cmd.visibility);
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkDomVisibility.js.map