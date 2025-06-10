import type { SyncCmd } from './SyncCmd.js';
export declare abstract class SyncCmdToFramework {
    constructor(cmd: SyncCmd);
    protected __cmd: SyncCmd;
    protected __result: TcHmi.Errors;
    abstract run(): void;
}
//# sourceMappingURL=SyncCmdToFramework.d.ts.map