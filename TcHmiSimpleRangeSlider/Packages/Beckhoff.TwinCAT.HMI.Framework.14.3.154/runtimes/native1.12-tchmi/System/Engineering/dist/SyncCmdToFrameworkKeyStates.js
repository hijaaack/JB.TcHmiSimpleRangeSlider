import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { interactionManager } from './DesignerModeMasterInteractionMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkKeyStates extends SyncCmdToFramework {
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
        let s = this.__cmd.states;
        if (s === undefined || s === null) {
            this.__result = TcHmi.Errors.E_PARAMETER_INVALID;
            return;
        }
        if ((s.leftCtrl !== undefined && s.leftCtrl !== null && s.leftCtrl.down !== undefined && s.leftCtrl.down) ||
            (s.rightCtrl !== undefined && s.rightCtrl !== null && s.rightCtrl.down !== undefined && s.rightCtrl.down)) {
            interactionManager.setCtrlModifierKeyState(true);
        }
        else {
            interactionManager.setCtrlModifierKeyState(false);
        }
        if ((s.leftShift !== undefined && s.leftShift !== null && s.leftShift.down !== undefined && s.leftShift.down) ||
            (s.rightShift !== undefined &&
                s.rightShift !== null &&
                s.rightShift.down !== undefined &&
                s.rightShift.down)) {
            interactionManager.setShiftModifierKeyState(true);
        }
        else {
            interactionManager.setShiftModifierKeyState(false);
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkKeyStates.js.map