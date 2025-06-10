import { SyncCmdToCreator } from './SyncCmdToCreator.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToCreatorControlDoubleClick extends SyncCmdToCreator {
    constructor(cmd) {
        super(cmd);
    }
}
//# sourceMappingURL=SyncCmdToCreatorControlDoubleClick.js.map