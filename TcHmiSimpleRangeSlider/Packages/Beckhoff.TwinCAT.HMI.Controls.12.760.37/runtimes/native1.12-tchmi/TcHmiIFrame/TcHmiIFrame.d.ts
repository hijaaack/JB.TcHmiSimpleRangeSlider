declare module TcHmi.Controls.Beckhoff {
    class TcHmiIFrame extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /** member variables */
        /** Reference to the root dom element of the current control template as jquery object. */
        protected __elementTemplateRoot: JQuery;
        /** Reference to the underlying html iframe element as jquery object. */
        protected __elementFrame: JQuery<HTMLIFrameElement>;
        /** Localization Creator */
        protected __localizedElements: Map<string, Element>;
        protected __localizationReader: Locale.LocalizationReader | undefined;
        protected __destroyLocalizationWatch: DestroyFunction | null;
        /**
         * Internal reference to the attribute "tchmi-src"
         * Possible Values: Relative path to the target content file or url based on the project directory as root.
         */
        protected __src: string | null | undefined;
        /** Event handlers */
        protected __loadHandler: (event: Event) => void;
        /**
         * If raised, the control object exists in control cache and constructor of each inheritation level was called.
         */
        __previnit(): void;
        /**
         * If raised, all attributes have been set to it's default or dom values.
         */
        __init(): void;
        /**
         * Is called by the system after the control instance gets part of the current DOM.
         * Is only allowed to be called from the framework itself!
         */
        __attach(): void;
        /**
         * Is called by the system after the control instance is no longer part of the current DOM.
         * Is only allowed to be called from the framework itself!
         */
        __detach(): void;
        /**
         * Destroy the current control instance.
         * Will be called automatically if system destroys control!
         */
        destroy(): void;
        /**
         * Sets the src attribute to a new value.
         * @param valueNew The new value for the src attribute;
         */
        setSrc(valueNew: string | null): void;
        /**
         * @returns The current value of the src attribute.
         */
        getSrc(): string | null | undefined;
        /**
         * Processes the current value of attribute src.
         */
        protected __processSrc(): void;
        /**
         * Loads IFrame if access is now possible
         */
        __processAccessConfig(): void;
        /**
         * Loads IFrame if access is now possible
         */
        __processIsEnabled(): void;
        /**
         * Is raised if the load event is raised
         */
        protected __onLoad(): (e: Event) => void;
    }
}
//# sourceMappingURL=TcHmiIFrame.d.ts.map