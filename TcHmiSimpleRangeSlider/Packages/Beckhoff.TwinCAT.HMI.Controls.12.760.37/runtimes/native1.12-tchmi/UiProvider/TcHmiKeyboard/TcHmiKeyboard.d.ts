declare module TcHmi.Controls.UiProvider.Keyboard {
    class TcHmiKeyboard extends TcHmi.UiProvider.KeyboardProvider {
        static readonly providerName = "Beckhoff.TcHmiKeyboard";
        private static readonly keyboardClassFqn;
        constructor();
        private __keyboardCtrl;
        private __popup;
        private __mutationObserver;
        /** Also the marker of active keyboard */
        private __activeTextElement;
        private __localeChangedRegistered;
        private __deviceHasOSK;
        refreshConfig(): void;
        open(textElement: HTMLInputElement | HTMLTextAreaElement): IErrorDetails;
        private __closeViaApi;
        close(): IErrorDetails;
    }
}
//# sourceMappingURL=TcHmiKeyboard.d.ts.map