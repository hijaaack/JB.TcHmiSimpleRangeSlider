import { SyncCmdToCreatorRequestCurrentPartialContent } from './SyncCmdToCreatorRequestCurrentPartialContent.js';
if (!TCHMI_ENGINEERING) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer or live view.`);
}
export class DesignerModePartialContentManager {
    constructor() { }
    __requests = new Map();
    __requestIdCount = 0;
    requestCurrentPartialContent(partialUrl, callback) {
        let requestId = 0;
        let loopcount = 0;
        do {
            requestId = 0;
            loopcount++;
            if (loopcount >= 1000000) {
                TcHmi.Log.error('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModePartialContentManager] Reached maxium of parallel requests.');
                requestId = null;
                break;
            }
            this.__requestIdCount++;
            if (this.__requestIdCount >= 1000000) {
                this.__requestIdCount = 1;
            }
            requestId = this.__requestIdCount;
        } while (this.__requests.has(requestId));
        if (requestId === null) {
            return () => { };
        }
        let piggyBack = null;
        try {
            piggyBack = JSON.stringify({
                requestId: requestId,
                requestInstance: TCHMI_DYNAMIC_INSTANCE_ID,
            });
        }
        catch (e) {
            TcHmi.Log.errorEx('[Source=Framework, Module=TcHmi.System.Engineering.DesignerModePartialContentManager] An uncaught exception occurred:\n', e);
        }
        let requestObject = {
            callback: callback,
            timeoutTimer: setTimeout(() => {
                if (requestId !== null) {
                    this.__requests.delete(requestId);
                }
                TcHmi.Callback.callSafeEx(callback, null, {
                    error: TcHmi.Errors.E_TIMEOUT,
                    details: {
                        code: TcHmi.Errors.E_TIMEOUT,
                        message: TcHmi.Errors[TcHmi.Errors.E_TIMEOUT],
                        domain: 'TcHmi.System.Engineering.DesignerModePartialContentManager',
                    },
                });
            }, TcHmi.System.config.tcHmiServer.websocketSystemTimeout),
        };
        let destroy = () => {
            if (requestId !== null) {
                this.__requests.delete(requestId);
            }
            if (requestObject) {
                clearTimeout(requestObject.timeoutTimer);
                requestObject.timeoutTimer = 0;
                requestObject.callback = null;
                requestObject = null;
            }
        };
        requestObject.destroy = destroy;
        this.__requests.set(requestId, requestObject);
        new SyncCmdToCreatorRequestCurrentPartialContent({
            name: 'RequestCurrentPartialContent',
            targetPartial: partialUrl,
            piggyBack: piggyBack,
            replyTo: TCHMI_DYNAMIC_INSTANCE_ID,
        }).send();
        return destroy;
    }
    getRequest(requestId) {
        let request = this.__requests.get(requestId);
        if (request) {
            this.__requests.delete(requestId);
        }
        return request;
    }
}
/** Runtime Manager */
export const partialContentManager = new DesignerModePartialContentManager();
//# sourceMappingURL=DesignerModePartialContentManager.js.map