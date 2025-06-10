import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { SyncCmdToCreatorSyncControls } from './SyncCmdToCreatorSyncControls.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkRemoveControls extends SyncCmdToFramework {
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
        const deletedChildControls = new Set();
        for (const controlId of this.__cmd.controls) {
            if (deletedChildControls.has(controlId)) {
                // Skip if a control was part of parent destroy
                continue;
            }
            const tco = TcHmi.Controls.get(controlId);
            if (!tco) {
                TcHmi.Log.error(`[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkRemoveControls] Failed to remove control "${controlId}": Not found in control cache.\n`);
                break;
            }
            // Adjust pcElement of parent for later sync consistency
            const updateParents = (ctrl) => {
                const parentCtrl = ctrl.getParent();
                if (!parentCtrl) {
                    return;
                }
                const parentPcElem = parentCtrl.getPcElement();
                const deletedChildInPc = parentPcElem?.[0].querySelector('#' + CSS.escape(controlId));
                deletedChildInPc?.remove();
                updateParents(parentCtrl);
            };
            updateParents(tco);
            // cleanup old messages
            TcHmi.Engineering.ErrorPane.remove(controlId + 'requiredAttributeTouched');
            for (const children of tco.getElement()[0].querySelectorAll('div[id][data-tchmi-type]')) {
                deletedChildControls.add(children.id);
            }
            // Force __keepAlive to false to allow creator related control destruction
            let keepAlive = tco.__getKeepAlive();
            if (keepAlive) {
                tco.__setKeepAlive(false);
            }
            tco.destroy();
        }
        // Send empty SyncControls command to allow property grid to remove selection!
        new SyncCmdToCreatorSyncControls({
            name: 'SyncControls',
            controls: [],
            frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
            targetPartial: TCHMI_TARGET_PARTIAL,
            replyTo: null,
        }).send();
    }
}
//# sourceMappingURL=SyncCmdToFrameworkRemoveControls.js.map