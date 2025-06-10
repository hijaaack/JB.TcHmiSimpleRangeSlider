import type { AllSyncCmd } from './SyncCmd.js';
export declare class DesignerModeComManager {
    /** Throws on error */
    constructor();
    private __websocket;
    private __websocketWasClosedUnexpected;
    private __connectionWatcherInterval;
    private __unloaded;
    /** */
    static RECONNECT_INTERVAL: number;
    /** Counting all reconnects (including reloads) till we have a valid answer */
    private __globalReconnectCount;
    private __onDisableCommunication;
    private __connectionWatcherTick;
    private __handleSyncCommandMessageResponse;
    private __createWebsocketOnOpenHandler;
    /**
     * @param closeEvent The this.__websocket this.__close event object.
     */
    private __websocketOnClose;
    /**
     * @param messageEvent The this.__websocket message event object.
     */
    private __websocketOnMessage;
    open(callback?: (this: void, data: IConnectionResultObject) => void): void;
    /**
     * Sends a command to the engineering.
     * @param cmd
     */
    sendCommand(cmd: AllSyncCmd): void;
}
export interface IConnectionResultObject extends TcHmi.IResultObject {
    url?: string;
}
export interface SyncMessage {
    /**
     * The id of the current message. Has to be a unique GUID.
     */
    id: string;
    /**
     * JavaScript timestamp
     */
    timestamp: number;
    /**
     * Command object
     */
    command: AllSyncCmd;
}
/** Runtime Manager */
export declare const designerModeComManager: DesignerModeComManager;
//# sourceMappingURL=DesignerModeComManager.d.ts.map