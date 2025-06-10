import { SyncCmdToCreator } from './SyncCmdToCreator.js';
if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class SyncCmdToCreatorRegisterSyncView extends SyncCmdToCreator {
    constructor(cmd) {
        super(cmd);
    }
}
//# sourceMappingURL=SyncCmdToCreatorRegisterSyncView.js.map