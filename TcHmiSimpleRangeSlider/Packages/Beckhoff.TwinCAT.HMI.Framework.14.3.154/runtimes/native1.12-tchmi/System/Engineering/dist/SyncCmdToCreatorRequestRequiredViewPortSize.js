import { SyncCmdToCreator } from './SyncCmdToCreator.js';
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
export class SyncCmdToCreatorRequestRequiredViewPortSize extends SyncCmdToCreator {
    constructor(cmd) {
        super(cmd);
    }
}
//# sourceMappingURL=SyncCmdToCreatorRequestRequiredViewPortSize.js.map