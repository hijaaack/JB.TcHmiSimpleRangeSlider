declare module TcHmi.Controls.System {
    class TcHmiPopup extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        protected __elementTemplateRoot: HTMLElement | undefined;
        protected __popup: TcHmi.UiProvider.PopupProvider.HtmlElementBox | null | undefined;
        protected __targetFile: TcHmiPopup.TargetFile | null | undefined;
        protected __headerText: string | null | undefined;
        protected __restoreBounds: boolean;
        protected __movable: boolean;
        protected __modal: boolean | undefined;
        protected __targetFileHostPreload: boolean | undefined;
        protected __targetFileHostKeepAlive: boolean | undefined;
        protected __fileHost: TcHmi.Controls.System.TcHmiRegion | TcHmi.Controls.System.TcHmiUserControlHost | null | undefined;
        protected __popupSize: {
            top: number | null;
            left: number | null;
            width: number | null;
            height: number | null;
        };
        /**
         * If raised, the control object exists in control cache and constructor of each inheritation level was called.
         */
        __previnit(): void;
        /**
         * If raised, all attributes have been set to it's default or dom values.
         */
        __init(): void;
        private __resizeDestroyFnc;
        private __moveDestroyFnc;
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
         * Builds the file host instance based on TargetFile and TargetFileHostAttributes.
         */
        private __buildFileHost;
        /**
         * Sets the TargetFile value and calls the associated process function.
         * @param valueNew The new value for the TargetFile attribute as string. Relative path value.
         */
        setTargetFile(valueNew: TcHmiPopup.TargetFile | null): void;
        /**
         * The watch callback for the targetFile object resolver.
         */
        protected __onResolverForTargetFileWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiPopup.TargetFile>) => void;
        /**
         * Returns the current TargetFile value.
         * @returns The current value of the TargetFile member variable as string. Relative path value.
         */
        getTargetFile(): TcHmiPopup.TargetFile | null | undefined;
        /**
         * Processes the current target file.
         * @param override
         */
        protected __processTargetFile(): void;
        /**
         * Sets the HeaderText attribute value and calls the associated process function.
         * @param valueNew The new value for the HeaderText attribute.
         */
        setHeaderText(valueNew: string | null): void;
        /**
         * Returns the currents HeaderText attribute value.
         */
        getHeaderText(): string | null | undefined;
        /**
         * Processes the current HeaderText attribute value.
         */
        protected __processHeaderText(): void;
        /**
         * Sets the RestoreBounds attribute value and calls the associated process function.
         * @param valueNew The new value for the RestoreBounds attribute.
         */
        setRestoreBounds(valueNew: string | null): void;
        /**
         * Returns the currents RestoreBounds attribute value.
         */
        getRestoreBounds(): boolean;
        /**
         * Processes the current RestoreBounds attribute value.
         */
        protected __processRestoreBounds(): void;
        /**
         * Sets the Movable attribute value and calls the associated process function.
         * @param valueNew The new value for the Movable attribute.
         */
        setMovable(valueNew: string | null): void;
        /**
         * Returns the currents Movable attribute value.
         */
        getMovable(): boolean;
        /**
         * Processes the current Movable attribute value.
         */
        protected __processMovable(): void;
        /**
         * Sets the Modal attribute value and calls the associated process function.
         * @param valueNew The new value for the Modal attribute.
         */
        setModal(valueNew: string | null): void;
        /**
         * Returns the currents Modal attribute value.
         */
        getModal(): boolean | undefined;
        /**
         * Processes the current Modal attribute value.
         */
        protected __processModal(): void;
        /**
         * Sets the options for the popup.
         */
        protected __setPopupOptions(): void;
        private __boundsChangedDestroy;
        /** Prevent first bound change */
        private __openInProgress;
        /**
         * Opens the Popup.
         */
        open(): void;
        /**
         * Closes the Popup.
         */
        close(): void;
        /**
         * Resets the size and position of the Popup and clears that data from localStorage.
         */
        resetBounds(): void;
        getPopupLeft(): number | null;
        getPopupTop(): number | null;
        getPopupHeight(): number | null;
        getPopupWidth(): number | null;
        /**
         * Sets the TargetFileHostPreload attribute value and calls the associated process function.
         * @param valueNew The new value for the TargetFileHostPreload attribute.
         */
        setTargetFileHostPreload(valueNew: string | null): void;
        /**
         * Returns the currents TargetFileHostPreload attribute value.
         */
        getTargetFileHostPreload(): boolean | undefined;
        /**
         * Processes the current TargetFileHostPreload attribute value.
         */
        protected __processTargetFileHostPreload(): void;
        /**
         * Sets the TargetFileHostKeepAlive attribute value and calls the associated process function.
         * @param valueNew The new value for the TargetFileHostKeepAlive attribute.
         */
        setTargetFileHostKeepAlive(valueNew: string | null): void;
        /**
         * Returns the currents TargetFileHostKeepAlive attribute value.
         */
        getTargetFileHostKeepAlive(): boolean | undefined;
        /**
         * Returns a boolean determining if the popup is open or not.
         */
        getIsOpen(): boolean;
    }
    module TcHmiPopup {
        interface TargetFile {
            path: string;
            attributes?: Dictionary<any>;
        }
    }
}
//# sourceMappingURL=TcHmiPopup.d.ts.map