import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { SyncCmdToCreatorDropControlPosition } from './SyncCmdToCreatorDropControlPosition.js';
import { hierarchyManager } from './DesignerModeMasterHierarchyMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class SyncCmdToFrameworkRequestDropControlPosition extends SyncCmdToFramework {
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
        if (this.__cmd.type === undefined || this.__cmd.type === null) {
            this.__result = TcHmi.Errors.E_PARAMETER_INVALID;
            return;
        }
        const dropConfig = hierarchyManager.getContainerFromPoint({
            left: this.__cmd.position.left + window.scrollX,
            top: this.__cmd.position.top + window.scrollY,
        });
        if (!dropConfig) {
            this.__result = TcHmi.Errors.ERROR;
            return;
        }
        let command = {
            name: 'DropControlPosition',
            controls: [
                {
                    piggyBack: this.__cmd.piggyBack,
                    targetParentControl: dropConfig.tco.getId(),
                    type: this.__cmd.type,
                    position: {
                        centerX: dropConfig.mousePosXinTarget,
                        centerY: dropConfig.mousePosYinTarget,
                    },
                },
            ],
            targetPartial: preparedTargetPartial,
            frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
            replyTo: null,
        };
        if (dropConfig.rowIndex !== null &&
            dropConfig.columnIndex !== null &&
            (dropConfig.rowIndex !== 0 || dropConfig.columnIndex !== 0)) {
            command.controls[0].attributes = [
                {
                    name: 'data-tchmi-grid-row-index',
                    value: dropConfig.rowIndex,
                },
                {
                    name: 'data-tchmi-grid-column-index',
                    value: dropConfig.columnIndex,
                },
            ];
        }
        // Response
        new SyncCmdToCreatorDropControlPosition(command).send();
    }
}
//# sourceMappingURL=SyncCmdToFrameworkRequestDropControlPosition.js.map