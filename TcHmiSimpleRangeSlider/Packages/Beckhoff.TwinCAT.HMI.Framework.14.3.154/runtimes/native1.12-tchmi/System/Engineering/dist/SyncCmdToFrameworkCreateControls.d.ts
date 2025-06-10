import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import type { SyncCmdCreateControls } from './SyncCmd.js';
export declare class SyncCmdToFrameworkCreateControls extends SyncCmdToFramework {
    constructor(cmd: SyncCmdCreateControls);
    protected __cmd: SyncCmdCreateControls;
    private __controlsToSelect;
    private __createsPending;
    private __onControlCreated;
    run(): void;
}
//# sourceMappingURL=SyncCmdToFrameworkCreateControls.d.ts.map