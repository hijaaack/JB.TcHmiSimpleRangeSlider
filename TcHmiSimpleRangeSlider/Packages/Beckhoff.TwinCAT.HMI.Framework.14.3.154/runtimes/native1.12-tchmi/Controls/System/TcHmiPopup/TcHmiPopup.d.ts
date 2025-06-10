declare namespace TcHmi.Controls.System {
    class TcHmiPopup extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        protected __elementTemplateRoot: HTMLElement | undefined;
        protected __popup: TcHmi.UiProvider.PopupProvider.HtmlElementBox<any> | null;
        protected __targetFile: TcHmiPopup.TargetFile | null | undefined;
        protected __targetFileAttributesPreserved: TcHmi.Dictionary<any> | null | undefined;
        protected __headerText: string | null | undefined;
        protected __buttons: TcHmiPopup.Button[] | null | undefined;
        protected __value: {
            property: string | null | undefined;
            description: TcHmiUserControlHost.ControlAttributeDescription | null;
            destroyPropertyChanged: TcHmi.DestroyFunction | null;
            value: any | undefined;
            writeToUserControl: boolean;
            hasBeenSet: boolean;
        };
        protected __restoreBounds: boolean | undefined;
        protected __movable: boolean | undefined;
        protected __modal: boolean | undefined;
        protected __closeOnBackground: boolean | undefined;
        protected __targetFileHostPreload: boolean | undefined;
        protected __targetFileHostKeepAlive: boolean | undefined;
        protected __scrolling: 'No' | 'Yes' | 'Auto' | undefined;
        protected __fileHost: TcHmiRegion | TcHmiUserControlHost | null | undefined;
        protected __popupSize: {
            top: null | number;
            left: null | number;
            width: null | number;
            height: null | number;
        };
        protected __resizeDestroyFnc: TcHmi.DestroyFunction | undefined;
        protected __moveDestroyFnc: TcHmi.DestroyFunction | undefined;
        protected __boundsChangedDestroy: TcHmi.DestroyFunction | undefined;
        protected __buttonPressedDestroy: TcHmi.DestroyFunction | undefined;
        /** Used to prevent firing the onPropertyChanged events for popup size during opening of the popup */
        protected __openInProgress: boolean;
        protected __ignoreNextPromptAnswer: boolean;
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
         * Builds the file host instance based on TargetFile and TargetFileHostAttributes.
         */
        protected __buildFileHost(): void;
        /**
         * Sets the TargetFile value and calls the associated process function.
         * @param valueNew The new value for the TargetFile attribute as string. Relative path value.
         */
        setTargetFile(valueNew: TcHmiPopup.TargetFile | null): void;
        /**
         * The watch callback for the targetFile object resolver.
         */
        protected __onResolverForTargetFileWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmiPopup.TargetFile>): void;
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
         * Sets the Buttons attribute value and calls the associated process function.
         * @param valueNew The new value for the Buttons attribute.
         */
        setButtons(valueNew: TcHmiPopup.Button[] | null): void;
        /**
         * Returns the currents Buttons attribute value.
         */
        getButtons(): TcHmiPopup.Button[] | null | undefined;
        /**
         * Processes the current Buttons attribute value.
         */
        protected __processButtons(): void;
        /**
         * Sets the ValueProperty attribute value and calls the associated process function.
         * @param valueNew The new value for the ValueProperty attribute.
         */
        setValueProperty(valueNew: string | null): void;
        /**
         * Returns the currents ValueProperty attribute value.
         */
        getValueProperty(): string | null | undefined;
        /**
         * Processes the current ValueProperty attribute value.
         */
        protected __processValueProperty(): void;
        /**
         * Sets the Value attribute value and calls the associated process function.
         * @param valueNew The new value for the Value attribute.
         */
        setValue(valueNew: any): void;
        /**
         * Internal setter for Value with additional writeToUserControl parameter.
         * @param valueNew The new value.
         * @param writeToUserControl Whether to write this value to the user control.
         */
        protected __setValue(valueNew: any | undefined, writeToUserControl: boolean): void;
        /**
         * Returns the currents Value attribute value.
         */
        getValue(): any | undefined;
        /**
         * Processes the current Value attribute value.
         */
        protected __processValue(): void;
        /**
         * Reads the value from the user control, if possible. If not, returns undefined.
         */
        protected __readValue(): any | undefined;
        /**
         * Sets the RestoreBounds attribute value and calls the associated process function.
         * @param valueNew The new value for the RestoreBounds attribute.
         */
        setRestoreBounds(valueNew: boolean | null): void;
        /**
         * Returns the currents RestoreBounds attribute value.
         */
        getRestoreBounds(): boolean | undefined;
        /**
         * Processes the current RestoreBounds attribute value.
         */
        protected __processRestoreBounds(): void;
        /**
         * Sets the Movable attribute value and calls the associated process function.
         * @param valueNew The new value for the Movable attribute.
         */
        setMovable(valueNew: boolean | null): void;
        /**
         * Returns the currents Movable attribute value.
         */
        getMovable(): boolean | undefined;
        /**
         * Processes the current Movable attribute value.
         */
        protected __processMovable(): void;
        /**
         * Sets the Modal attribute value and calls the associated process function.
         * @param valueNew The new value for the Modal attribute.
         */
        setModal(valueNew: boolean | null): void;
        /**
         * Returns the currents Modal attribute value.
         */
        getModal(): boolean | undefined;
        /**
         * Processes the current Modal attribute value.
         */
        protected __processModal(): void;
        /**
         * Sets the Modal attribute value and calls the associated process function.
         * @param valueNew The new value for the Modal attribute.
         */
        setCloseOnBackground(valueNew: boolean | null): void;
        /**
         * Returns the currents Modal attribute value.
         */
        getCloseOnBackground(): boolean | undefined;
        /**
         * Processes the current Modal attribute value.
         */
        protected __processCloseOnBackground(): void;
        /**
         * Sets the options for the popup.
         */
        protected __setPopupOptions(): void;
        /**
         * Set the value for the attribute scrolling.
         * @param valueNew
         */
        setScrolling(valueNew: 'No' | 'Yes' | 'Auto' | null): void;
        getScrolling(): "No" | "Yes" | "Auto" | undefined;
        protected __processScrolling(): void;
        /**
         * Opens the Popup.
         */
        open(suppressEvents?: boolean): void;
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
        setTargetFileHostPreload(valueNew: boolean | null): void;
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
        setTargetFileHostKeepAlive(valueNew: boolean | null): void;
        /**
         * Returns the currents TargetFileHostKeepAlive attribute value.
         */
        getTargetFileHostKeepAlive(): boolean | undefined;
        /**
         * Returns a boolean determining if the popup is open or not.
         */
        getIsOpen(): boolean;
    }
    namespace TcHmiPopup {
        interface TargetFile {
            /** Path to the content/usercontrol file to show. */
            path: string;
            /** A dictionary for the attributes with the html attribute names as keys. */
            attributes?: TcHmi.Dictionary<any>;
        }
        interface Button {
            name: string;
            value?: any;
            width: number;
            height: number;
            widthMode?: 'Value' | 'Content';
            heightMode?: 'Value' | 'Content';
            minWidth?: number;
            maxWidth?: number;
            minHeight?: number;
            maxHeight?: number;
            textPadding?: TcHmi.FourSidedCss;
            text: string;
            tooltip?: string;
            keepPopupOpen?: boolean;
            actions?: TcHmi.Trigger.Action[];
        }
    }
}