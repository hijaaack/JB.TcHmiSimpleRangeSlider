import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { rootControlManager } from './DesignerModeMasterRootControlMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
     * !32359 and with 1.12.760.0 in 2022-12
     * activated default browser scrollbars in Designer.
    
     * Viewport logic before that:
     * Framework designer works in a div without scrollbar (overflow:hidden).
     * Informs Creator about width change via RequestRequiredViewPortSize
     * which sets browser size (perhaps with scrollbars)
     * Interaction with the VS scrollbar is communicated via ScrollPositionChanged to Framework
     * which sets scrollLeft on the document.scrollingElement
     */
export class SyncCmdToFrameworkScrollPositionChanged extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        const preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
        if (TCHMI_DESIGNER && preparedTargetPartial === TCHMI_TARGET_PARTIAL) {
            rootControlManager.scroll(this.__cmd.position);
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkScrollPositionChanged.js.map