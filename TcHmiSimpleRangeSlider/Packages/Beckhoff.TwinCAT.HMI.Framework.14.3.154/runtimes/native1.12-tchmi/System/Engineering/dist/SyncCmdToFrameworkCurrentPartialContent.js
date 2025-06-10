import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { designerModeManager } from './DesignerModeManager.js';
import { partialContentManager } from './DesignerModePartialContentManager.js';
if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
let highlightManager;
if (TCHMI_DESIGNER) {
    import('./DesignerModeMasterControlHighlightMngr.js')
        .then((module) => {
        highlightManager = module.highlightManager;
    })
        .catch((ex) => {
        TcHmi.Log.error('Failed to load highlightManager in Framework SyncCmdToFrameworkCurrentPartialContent: ' + ex);
    });
}
export class SyncCmdToFrameworkCurrentPartialContent extends SyncCmdToFramework {
    constructor(cmd) {
        super(cmd);
    }
    run() {
        if (this.__cmd.targetPartial === undefined || this.__cmd.targetPartial === null) {
            TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkCurrentPartialContent] Failed to synchronize partial. Command property targetPartial=' +
                this.__cmd.targetPartial +
                '.');
            this.__result = TcHmi.Errors.E_PARAMETER_INVALID;
            return;
        }
        let targetPartial = tchmi_path(this.__cmd.targetPartial);
        const piggyBackObj = TcHmi.ValueConverter.toObject(this.__cmd.piggyBack);
        // Framework requested or creator forced?
        if (piggyBackObj !== undefined &&
            piggyBackObj !== null &&
            piggyBackObj.requestId !== undefined &&
            piggyBackObj.requestId !== null) {
            // Framework requested
            let request = partialContentManager.getRequest(piggyBackObj.requestId);
            if (request) {
                // Destroy will clear request object
                const callback = request.callback;
                if (request.destroy) {
                    request.destroy();
                }
                if (this.__cmd.content) {
                    TcHmi.Callback.callSafeEx(callback, null, {
                        error: TcHmi.Errors.NONE,
                        targetPartial: targetPartial,
                        content: this.__cmd.content,
                    });
                }
                else {
                    TcHmi.Callback.callSafeEx(callback, null, {
                        error: TcHmi.Errors.E_PARAMETER_INVALID,
                        targetPartial: targetPartial,
                        details: {
                            code: TcHmi.Errors.E_PARAMETER_INVALID,
                            message: TcHmi.Errors[TcHmi.Errors.E_PARAMETER_INVALID],
                            reason: 'Got no content for targetpartial ' + this.__cmd.targetPartial,
                            domain: 'TcHmi.System.Engineering.SyncCmdToFrameworkCurrentPartialContent',
                        },
                    });
                }
            }
            return;
        }
        else {
            // Creator forced
            // Extract content
            if (!this.__cmd.content) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkCurrentPartialContent] Failed to synchronize partial=' +
                    targetPartial +
                    '. Command property content=' +
                    this.__cmd.content +
                    '.');
                this.__result = TcHmi.Errors.E_PARAMETER_INVALID;
                return;
            }
            // Extract current partial id
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.__cmd.content;
            let rawPartialContent = tempDiv.firstElementChild;
            if (!rawPartialContent || rawPartialContent.id === undefined) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkCurrentPartialContent] Failed to synchronize partial=' +
                    targetPartial +
                    '. Failed to read attribute=id.');
                this.__result = TcHmi.Errors.E_PARAMETER_INVALID;
                return;
            }
            // Drop tempDiv for GC
            rawPartialContent.remove();
            const currentControl = TcHmi.Controls.get(rawPartialContent.id);
            if (currentControl && currentControl.getType() !== 'TcHmi.Controls.System.TcHmiUserControlHost') {
                // Sync control if we got no UC which is named the same as its UCH instance
                try {
                    designerModeManager.syncControl(targetPartial, rawPartialContent.id, rawPartialContent.outerHTML);
                }
                catch (e) {
                    TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkCurrentPartialContent] Failed to synchronize partial=' +
                        targetPartial +
                        '. An uncaught exception occurred:\n', e);
                    this.__result = TcHmi.Errors.E_PARAMETER_INVALID;
                    return;
                }
            }
            // Cache update...
            let type = TcHmi.PartialType.Invalid;
            try {
                let partials = [];
                if (targetPartial.endsWith('.view')) {
                    partials = TcHmi.System.config.views;
                    type = TcHmi.PartialType.View;
                }
                else if (targetPartial.endsWith('.content')) {
                    partials = TcHmi.System.config.content;
                    type = TcHmi.PartialType.Content;
                }
                else if (targetPartial.endsWith('.usercontrol')) {
                    partials = TcHmi.System.config.userControls;
                    type = TcHmi.PartialType.UserControl;
                }
                for (const partial of partials) {
                    if (partial.url === targetPartial) {
                        if (type === TcHmi.PartialType.UserControl || // Usercontrols do no longer have a preload flag... Usercontrols are always preloaded.
                            ((type === TcHmi.PartialType.View || type === TcHmi.PartialType.Content) &&
                                partial.preload)) {
                            TcHmi.System.Data.Caches.partialMarkupCache.set(targetPartial, {
                                markup: this.__cmd.content,
                                partialId: rawPartialContent.id,
                            });
                        }
                        break;
                    }
                }
            }
            catch (e) {
                TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkCurrentPartialContent] Failed to synchronize partial=' +
                    targetPartial +
                    '. An uncaught exception occurred:\n', e);
            }
            switch (type) {
                case TcHmi.PartialType.View:
                    TcHmi.EventProvider.raise('System.onViewChanged', {
                        url: targetPartial,
                        content: this.__cmd.content,
                    });
                    break;
                case TcHmi.PartialType.Content:
                    TcHmi.EventProvider.raise('System.onContentChanged', {
                        url: targetPartial,
                        content: this.__cmd.content,
                    });
                    break;
                case TcHmi.PartialType.UserControl:
                    TcHmi.EventProvider.raise('System.onUserControlChanged', {
                        url: targetPartial,
                        content: this.__cmd.content,
                    });
                    break;
                case TcHmi.PartialType.Invalid:
                default:
                    break;
            }
            if (TCHMI_ENGINEERING && TCHMI_DESIGNER) {
                highlightManager?.processDomVisibility(); // DomVisibility of one or more controls might be changed during sync
            }
            return;
        }
    }
}
//# sourceMappingURL=SyncCmdToFrameworkCurrentPartialContent.js.map