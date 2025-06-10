import type { ErrorPaneShape } from '../../ServicesTypes/SystemEngineering.js';
export declare class ErrorPane implements ErrorPaneShape {
    constructor();
    private __messages;
    add(name: string, content: string, type: TcHmi.Engineering.ErrorPane.MessageType): void;
    remove(name: string): void;
}
/** Runtime Manager */
export declare const errorPane: ErrorPane;
//# sourceMappingURL=ErrorPane.d.ts.map