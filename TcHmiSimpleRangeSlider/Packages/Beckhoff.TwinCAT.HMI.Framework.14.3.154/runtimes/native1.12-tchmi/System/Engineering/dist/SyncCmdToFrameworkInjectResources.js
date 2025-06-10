import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { SyncCmdToCreatorInjectedResources } from './SyncCmdToCreatorInjectedResources.js';
import { resourceInjectionManager } from './DesignerModeResourceInjectionManager.js';
if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class SyncCmdToFrameworkInjectResources extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        resourceInjectionManager.injectPackageResources(this.__cmd.injectInfo, (data) => {
            new SyncCmdToCreatorInjectedResources({
                name: 'InjectedResources',
                piggyBack: this.__cmd.piggyBack,
                frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
                targetPartial: TCHMI_DESIGNER ? TCHMI_TARGET_PARTIAL : undefined,
                replyTo: null,
            }).send();
        });
    }
}
//# sourceMappingURL=SyncCmdToFrameworkInjectResources.js.map