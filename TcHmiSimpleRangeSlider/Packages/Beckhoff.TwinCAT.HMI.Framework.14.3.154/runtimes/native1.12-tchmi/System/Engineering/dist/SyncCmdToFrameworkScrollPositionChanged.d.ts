import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import type { SyncCmdScrollPositionChanged } from './SyncCmd.js';
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
export declare class SyncCmdToFrameworkScrollPositionChanged extends SyncCmdToFramework {
    constructor(cmd: SyncCmdScrollPositionChanged);
    protected __cmd: SyncCmdScrollPositionChanged;
    run(): void;
}
//# sourceMappingURL=SyncCmdToFrameworkScrollPositionChanged.d.ts.map