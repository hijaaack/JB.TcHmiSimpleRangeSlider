import { SyncCmdToCreator } from './SyncCmdToCreator.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToCreatorHierarchyMoveControls extends SyncCmdToCreator {
    constructor(cmd) {
        super(cmd);
    }
}
//# sourceMappingURL=SyncCmdToCreatorHierarchyMoveControls.js.map