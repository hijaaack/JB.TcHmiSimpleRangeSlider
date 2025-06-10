import { SyncCmdToCreatorMessages } from './SyncCmdToCreatorMessages.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
export class ErrorPane {
    constructor() { }
    __messages = {};
    add(name, content, type) {
        if (!TCHMI_DESIGNER) {
            return; // Only designer instances are allowed to raise error pane messages.
        }
        this.remove(name); // Override existing message based on name.
        let guid = tchmi_create_guid();
        let message = {
            identifier: guid,
            type: type,
            content: content,
        };
        let m = {
            append: true,
            identifier: guid,
            targetPartial: TCHMI_TARGET_PARTIAL,
            targetInstance: TCHMI_DYNAMIC_INSTANCE_ID,
            type: type,
            content: content,
            line: null,
            position: null,
            unixTimestamp: Math.round(Date.now() / 1000), // UnixTimestmap = Seconds since 01.01.1970; JavaScript Timestamp = Milliseconds since 01.01.1970;
        };
        this.__messages[name] = message;
        new SyncCmdToCreatorMessages({
            name: 'Messages',
            frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
            messages: [m],
            replyTo: null,
        }).send();
        return;
    }
    remove(name) {
        if (!TCHMI_DESIGNER) {
            return; // Only designer instances are allowed to raise error pane messages.
        }
        let message = this.__messages[name];
        if (!message) {
            return;
        }
        let m = {
            remove: true,
            identifier: message.identifier,
        };
        new SyncCmdToCreatorMessages({
            name: 'Messages',
            frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
            messages: [m],
            replyTo: null,
        }).send();
        delete this.__messages[name];
    }
}
/** Runtime Manager */
export const errorPane = new ErrorPane();
//# sourceMappingURL=ErrorPane.js.map