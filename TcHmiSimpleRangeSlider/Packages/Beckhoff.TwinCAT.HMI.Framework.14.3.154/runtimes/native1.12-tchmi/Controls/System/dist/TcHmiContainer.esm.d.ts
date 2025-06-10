import { TcHmiContainerControl } from '../dist/TcHmiContainerControl.esm.js';
export declare class TcHmiContainer extends TcHmiContainerControl {
    #private;
    /** Constructor */
    constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
    protected __elementTemplateRoot: JQuery;
    /**
     * If raised, the control object exists in control cache and constructor of each inheritation level was called.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __previnit(): void;
    /**
     * If raised, all attributes have been set to it's default or dom values.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __init(): void;
    /**
     * Is called by the system after the control instance gets part of the current DOM.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __attach(): void;
    /**
     * Is called by the system after the control instance is no longer part of the current DOM.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __detach(): void;
    /**
     * Destroy the current control instance.
     * Will be called automatically if system destroys control!
     */
    destroy(): void;
    /**
     * Adds a child to this control and handles the hierarchical management layer.
     * This will also add child's DOM element to the container DOM.
     * @param control Class instance of the child.
     * @param pos Optional index of the position for the new child.
     */
    addChild(control: TcHmi.Controls.System.baseTcHmiControl | undefined | null, pos?: number | null): void;
    /**
     * Adds a child to this control and handles the hierarchical management layer.
     * This will also add child's DOM element to the container DOM.
     * @param control Class instance of the child.
     * @param pos Optional index of the position for the new child.
     */
    __addChild(control: TcHmi.Controls.System.baseTcHmiControl, pos?: number | null): void;
    /**
     */
    removeChild(control: TcHmi.Controls.System.baseTcHmiControl | undefined | null): void;
    __removeChild(control: TcHmi.Controls.System.baseTcHmiControl): void;
}
//# sourceMappingURL=TcHmiContainer.esm.d.ts.map