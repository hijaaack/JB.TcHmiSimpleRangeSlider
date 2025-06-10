declare namespace TcHmi.Controls.System {
    interface TcHmiUserControlParameter {
        description: TcHmiUserControlHost.ControlAttributeDescription;
        value: any;
    }
    class TcHmiUserControlHost extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        protected __markup: string | null | undefined;
        protected __config: TcHmi.System.UserControlConfig | null | undefined;
        protected readonly __targetUserControlUrl: string;
        protected readonly __targetUserControlUrlClean: string;
        protected readonly __targetUserControlConfigUrl: string;
        protected readonly __targetUserControlConfigUrlClean: string;
        protected __targetUserControlControlObject: TcHmiUserControl | null;
        /** Maps user control parameter values and descriptions to their html attribute name */
        protected __params: Map<`data-tchmi-${string}`, TcHmiUserControlParameter>;
        protected __partialDefaultVirtualRights: Map<string, TcHmi.Controls.ControlAccessDescription>;
        protected __widthMode: TcHmi.SizeModeWithContent | undefined;
        protected __heightMode: TcHmi.SizeModeWithContent | undefined;
        protected __elementTemplateRoot: JQuery;
        /** User control getter. */
        [setter: `set${string}`]: undefined | ((valueNew: any, dirtyPaths?: string[]) => void);
        /** User control setter. */
        [getter: `get${string}`]: undefined | ((_unused?: any) => any);
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
         * Sets __keepAlive
         * @param value
         */
        __setKeepAlive(value: boolean): void;
        /**
         * Provides the child user control object.
         * @returns
         */
        getCurrentUserControl(): TcHmiUserControl | null;
        /**
         * @param _event
         * @param data
         */
        protected __onUserControlChanged(_event: TcHmi.EventProvider.Event, data: {
            url: string;
            content: string;
        }): void;
        /**
         * @param _event
         * @param data
         */
        protected __onUserControlConfigChanged(_event: TcHmi.EventProvider.Event, data: {
            url: string;
        }): void;
        /**
         * @param _event
         * @param data
         */
        protected __onUserControlCreated(_event: TcHmi.EventProvider.Event, data: {
            url: string;
        }): void;
        /**
         * @param _event
         * @param data
         */
        protected __onUserControlRemoved(_event: TcHmi.EventProvider.Event, data: {
            url: string;
        }): void;
        /**
         * Returns the current value of attribute member "targetPartial".
         */
        getTargetUserControl(): string;
        /**
         * Sets the value of the width mode attribute.
         * @param valueNew The new width mode value..
         */
        setWidthMode(valueNew: TcHmi.SizeModeWithContent | null): void;
        /**
         * Processes the current width and width unit.
         */
        __processWidth(callerControl?: TcHmiControl): void;
        /**
         * Sets the value of the height mode attribute.
         * @param valueNew The new height mode value..
         */
        setHeightMode(valueNew: TcHmi.SizeModeWithContent | null): void;
        /**
         * Processes the current height and height unit.
         */
        __processHeight(callerControl?: TcHmiControl): void;
        /**
         * Returns the calculated width in pixel if self defined (not percent based) or based on the usercontrol.
         */
        __getContentWidth(): number | null;
        /**
         * Returns the calculated height in pixel if self defined (not percent based) or based on the usercontrol.
         */
        __getContentHeight(): number | null;
        /**
         * Gets virtual access of a user control
         * @param name name of the control right to fetch
         */
        getDescriptionAccessByName(name: string): TcHmi.Controls.ControlAccessDescription | null;
        /**
         * Gets a map of parameters that are configured on the current user control.
         */
        getParams(): Map<`data-tchmi-${string}`, TcHmiUserControlParameter>;
    }
    namespace TcHmiUserControlHost {
        interface IScopedMarkupResultObject extends TcHmi.IResultObject {
            markup?: string;
        }
        interface ControlAttributeDescription extends TcHmi.ControlAttributeDescription {
            /** The name is generated via Engineering with the prefix */
            name: `data-tchmi-${string}`;
            /** The getter name is generated via Engineering with the prefix */
            propertyGetterName: `get${string}`;
            /** The setter name is generated via Engineering with the prefix */
            propertySetterName: `set${string}`;
        }
    }
}