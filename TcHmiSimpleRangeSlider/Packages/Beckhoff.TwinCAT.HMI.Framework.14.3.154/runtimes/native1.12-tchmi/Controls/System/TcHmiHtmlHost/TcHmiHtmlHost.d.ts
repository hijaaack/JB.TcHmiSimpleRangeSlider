declare namespace TcHmi.Controls.System {
    class TcHmiHtmlHost extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /** */
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
         */
        setContent(value: string | null): void;
        /**
         */
        getContent(): string;
        /**
         * Returns the calculated width in pixel if self defined (not percent based).
         * max-width overrides width, but min-width overrides max-width.
         */
        __getContentWidth(): number | null;
        /**
         * Returns the calculated height in pixel if self defined (not percent based).
         * max-height overrides height, but min-height overrides max-height.
         */
        __getContentHeight(): number | null;
    }
}