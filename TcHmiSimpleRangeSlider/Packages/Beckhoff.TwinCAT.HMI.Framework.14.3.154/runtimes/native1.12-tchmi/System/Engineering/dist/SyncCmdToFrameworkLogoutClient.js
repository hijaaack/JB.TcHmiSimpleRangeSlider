import { SyncCmdToFramework } from './SyncCmdToFramework.js';
if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class SyncCmdToFrameworkLogoutClient extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        if (TcHmi.System.Services.accessManager.getCurrentUserConfig().state ===
            4 /* TcHmi.Server.userConfigState.usergroup */ &&
            (!this.__cmd.targetInstance || this.__cmd.targetInstance === TCHMI_DYNAMIC_INSTANCE_ID)) {
            TcHmi.Server.logout();
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkLogoutClient.js.map