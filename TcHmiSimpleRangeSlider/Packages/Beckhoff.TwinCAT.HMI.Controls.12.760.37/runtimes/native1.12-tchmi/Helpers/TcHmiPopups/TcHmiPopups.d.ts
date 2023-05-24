declare module TcHmi.Controls.Helpers {
    abstract class Popup<T> {
        #private;
        protected readonly __parentControl?: System.TcHmiControl | null | undefined;
        protected __name: string;
        protected __element: HTMLDivElement;
        protected __elementHeaderContainer: HTMLDivElement;
        protected __elementHeader: HTMLHeadingElement;
        protected __elementClose: HTMLAnchorElement;
        protected __elementContent: HTMLDivElement;
        protected __elementFooter: HTMLDivElement;
        protected __childControls: TcHmi.Controls.System.TcHmiControl[];
        protected __destroyers: DestroyFunction[];
        protected __prompt: {
            answer: (value: T | PromiseLike<T>) => void;
            error: (reason?: Error) => void;
        } | null;
        protected __isShowing: boolean;
        protected __onShowManager: CallbackManager<() => void>;
        onShow: Readonly<{
            add: (callback: () => void) => DestroyFunction;
            remove: (callback: () => void) => void;
        }>;
        protected __onHideManager: CallbackManager<() => void>;
        onHide: Readonly<{
            add: (callback: () => void) => DestroyFunction;
            remove: (callback: () => void) => void;
        }>;
        protected __onBoundsChangeManager: CallbackManager<(data: {
            bounds: TcHmi.UiProvider.PopupProvider.Bounds | null;
        }) => void>;
        onBoundsChange: Readonly<{
            add: (callback: (data: {
                bounds: TcHmi.UiProvider.PopupProvider.Bounds | null;
            }) => void) => DestroyFunction;
            remove: (callback: (data: {
                bounds: TcHmi.UiProvider.PopupProvider.Bounds | null;
            }) => void) => void;
        }>;
        protected __backgroundAction: Popup.BackgroundAction<string>;
        protected __backgroundMode: Popup.BackgroundMode;
        protected __positioningMode: Popup.PositioningMode;
        protected __bounds: Popup.Bounds | null;
        protected __movable: boolean;
        protected readonly __className = "TcHmi_Controls_Helpers_Popup";
        protected __localizationSymbols: Map<string, {
            symbol: Symbol<string>;
            destroyWatch: DestroyFunction;
        }>;
        protected __eventHandlers: {
            onCloseClick: (event: MouseEvent) => void;
            onPopupMouseDown: (event: MouseEvent) => void;
            onDocumentMouseMove: (event: MouseEvent) => void;
            onDocumentMouseUp: (event: MouseEvent) => void;
            onPopupTouchStart: (event: TouchEvent) => void;
            onDocumentTouchMove: (event: TouchEvent) => void;
            onDocumentTouchEndOrCancel: (event: TouchEvent) => void;
        };
        private __passiveEventOptions;
        /** Prevents mouse event while touch interaction is in progress. */
        protected __touchLock: boolean;
        protected __touchLockTimeoutId: number;
        protected __movingInfo: {
            moving: boolean;
            /** Offset from the interaction coordinates to element left side */
            startLeftOffset: number;
            /** Offset from the interaction coordinates to element top side */
            startTopOffset: number;
            /** A popup should be movable partly outside the screen but 50px should be always visible. */
            minLeft: number;
            /** A popup should be movable partly outside the screen but not at the top. */
            minTop: number;
            /** A popup should be movable partly outside the screen but 50px should be always visible. */
            maxLeft: number;
            /** A popup should be movable partly outside the screen but 50px should be always visible. */
            maxTop: number;
        };
        protected __animationFrameId: number;
        protected __storage: LocalStorage<{
            bounds: Popup.Bounds;
        }, {
            bounds: Popup.Bounds | null;
        }> | undefined;
        protected __storageSettings: TcHmi.UiProvider.PopupProvider.StorageSettings | undefined;
        /**
         * Creates a new Popup instance.
         * @param __parentControl The control which owns the popup.
         */
        constructor(__parentControl?: System.TcHmiControl | null | undefined);
        /**
         * Keeps popup visible after resize
         * Could be smaller and slide outside the view on the left
         */
        private __resizeObs;
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Hides the popup.
         */
        hide(): void;
        /**
         * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
         */
        prompt(): Promise<T>;
        /**
         * Aborts a prompted popup and performs the background action to answer the prompt. If no background action was set, the promise is rejected.
         */
        abort(): void;
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Gets a value indicating if the popup is currently shown to the user.
         */
        isShowing(): boolean;
        /**
         * Gets a value indicating if the popup has a prompt that is still pending to be answered by the user.
         * If that is the case, calling prompt() againg will result in an error. If the popup is not currently
         * showing, you can call show() to display the popup again and wait for the user to answer the prompt.
         */
        hasActivePrompt(): boolean;
        /**
         * Resets the size and position of the Popup and clears that data from localStorage.
         */
        resetBounds(): void;
        /**
         * Sets what happens when the user clicks the close button or the background while the popup is showing, or
         * when the prompt is aborted via API call. Default is { close: true }.
         * @param action The action to perform. If the popup should be closed, further action can be specified.
         */
        setBackgroundAction(action: Popup.BackgroundAction<string>): void;
        /**
         * Performs the background action. Must be implemented by inheriting classes.
         */
        protected abstract __performBackgroundAction(): void;
        /**
         * Sets the background mode of the TopMostLayer used for displaying the popup.
         * @param mode
         */
        setBackgroundMode(mode: Popup.BackgroundMode): void;
        /**
         * Sets the positioning mode of the popup in the TopMostLayer.
         * @param mode
         */
        setPositioningMode(mode: Popup.PositioningMode): void;
        /**
         * Sets the bounds of the popup. Does only have any effect if PositioningMode.Floating is used.
         * @param bounds
         */
        setBounds(bounds: Popup.Bounds | null): void;
        /**
         * Process the given Popup.Bounds.
         * @param bounds
         */
        protected __processBounds(bounds: Popup.Bounds | null): void;
        /**
         * Sets the movable option.
         */
        setMovable(movable: boolean): void;
        /**
         * Sets the local storage settings and initializes the storage.
         */
        setStorageSettings(settings: TcHmi.UiProvider.PopupProvider.StorageSettings): void;
        /**
         * Sets if the close button should be used or not.
         * @param closeButton
         */
        setCloseButton(closeButton: boolean): void;
        /**
         * Handles the onPressed event of the close button.
         */
        protected __onCloseClick(event: MouseEvent): void;
        /**
         * Handles the popup mousedown event.
         */
        protected __onPopupMouseDown(event: MouseEvent): void;
        /**
         * Handles the document mouseup event.
         */
        protected __onDocumentMouseUp(event: MouseEvent): void;
        /**
         * Handles the document mousemove event.
         */
        protected __onDocumentMouseMove(event: MouseEvent): void;
        /**
         * Handles the popup touchstart event.
         */
        protected __onPopupTouchStart(event: TouchEvent): void;
        /**
         * Handles the document touch end and cancel events.
         */
        protected __onDocumentTouchEndOrCancel(event: TouchEvent): void;
        /**
         * Handles the document touchmove event.
         */
        protected __onDocumentTouchMove(event: TouchEvent): void;
        /**
         * AnimationFrame handler for drawing
         */
        protected __updatePosition(): void;
        /**
         * Watch the given symbol and call the onChange callback every time it changes with the resolved and formatted symbol value.
         * @param name The name for this symbol. Must be unique across all inheritance layers and further calls for the same localization must use the same name.
         * @param localization The localization to watch.
         * @param onChange The callback that is called with the localized and formatted text as a parameter.
         */
        protected __watchLocalization(name: string, localization: FormattedLocalizable, onChange: (localizedText: string) => void): void;
        /**
         * Destroys the localization watch with the given name, if it exists.
         * @param name The name that was used with __watchLoclalization to start watching the symbol.
         */
        protected __unwatchLocalization(name: string): void;
    }
    module Popup {
        type BackgroundAction<A extends string> = {
            close: false;
        } | {
            close: true;
            action?: A;
        };
        enum PositioningMode {
            Centered = 1,
            Floating = 2
        }
        enum BackgroundMode {
            None = 1,
            Dimmed = 2
        }
        interface Bounds {
            width?: number | null;
            widthUnit?: 'px' | '%';
            height?: number | null;
            heightUnit?: 'px' | '%';
            left?: number | null;
            leftUnit?: 'px' | '%';
            top?: number | null;
            topUnit?: 'px' | '%';
            bottom?: number | null;
            bottomUnit?: 'px' | '%';
            right?: number | null;
            rightUnit?: 'px' | '%';
        }
    }
}
declare module TcHmi.Controls.Helpers {
    abstract class ButtonsPrompt<T> extends Popup<T> {
        protected __buttons: Map<string, {
            value: T;
            button: Beckhoff.TcHmiButton;
        }>;
        protected __localizationSymbols: Map<string, {
            symbol: Symbol<string>;
            destroyWatch: DestroyFunction;
        }>;
        protected __backgroundAction: ButtonsPrompt.BackgroundAction<T>;
        /**
         * Creates a new ButtonsPrompt instance.
         * @param buttons A collection of attributes to generate buttons from and the value that should be used in the prompt answer for each button.
         * @param parentControl The control which owns the popup.
         */
        constructor(buttons: Dictionary<{
            value: T;
            attributes: Dictionary<any>;
        }>, parentControl?: TcHmi.Controls.System.TcHmiControl | null);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Creates a handler for the pressed event of a button.
         * @param value The value that should be used to answer the prompt when the button is clicked.
         */
        protected __createPressedHandler(value: T): () => void;
        /**
         * Returns the created buttons.
         */
        getButtons(): Map<string, {
            value: T;
            button: Beckhoff.TcHmiButton;
        }>;
        /**
         * Sets what happens when the user clicks the close button or the background while the popup is showing, or
         * when the prompt is aborted via API call.
         * @param action The action to perform. If the popup should be closed, you can specify the name of a button to
         * get the prompt to be answered as if this button was clicked, or directly specify a result to answer the
         * prompt with.
         */
        setBackgroundAction(action: ButtonsPrompt.BackgroundAction<T>): void;
        /**
         * Performs the background action.
         */
        protected __performBackgroundAction(): void;
        /**
         * DEPRECATED
         * Please use setTexts
         * @param texts A collection of localization symbol expressions.
         * @deprecated Please use setTexts
         */
        setLocalizations(texts: Partial<ButtonsPrompt.LocalizableTexts>): void;
        /**
         * Sets texts which can either be localizable or static.
         */
        setTexts(texts: Partial<ButtonsPrompt.LocalizableTexts>): void;
    }
    module ButtonsPrompt {
        interface LocalizableTexts {
            headerText: Localizable;
            buttons: Dictionary<{
                text?: Localizable;
                tooltip?: Localizable;
            }>;
        }
        type BackgroundAction<R = any> = Popup.BackgroundAction<string> | {
            close: true;
            result: R;
        };
    }
}
declare module TcHmi.Controls.Helpers {
    class HtmlAndButtonsPrompt<T> extends ButtonsPrompt<T> {
        protected __elementContentContent: HTMLElement | null;
        /**
         * Creates a new TextAndButtonsPrompt instance.
         * @param buttons A collection of attributes to generate buttons from and the value that should be used in the prompt answer for each button.
         * @param parentControl The control which owns the popup.
         */
        constructor(buttons: Dictionary<{
            value: T;
            attributes: Dictionary<any>;
        }>, parentControl?: TcHmi.Controls.System.TcHmiControl | null);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Sets the content element.
         * @param element
         */
        setContentElement(element: HTMLElement): void;
    }
}
declare module TcHmi.Controls.Helpers {
    class TextAndButtonsPrompt<T> extends ButtonsPrompt<T> {
        /**
         * Creates a new TextAndButtonsPrompt instance.
         * @param buttons A collection of attributes to generate buttons from and the value that should be used in the prompt answer for each button.
         * @param parentControl The control which owns the popup.
         */
        constructor(buttons: Dictionary<{
            value: T;
            attributes: Dictionary<any>;
        }>, parentControl?: TcHmi.Controls.System.TcHmiControl | null);
        /**
         * DEPRECATED
         * Please use setTexts
         * @param texts A collection of localization symbol expressions.
         * @deprecated Please use setTexts
         */
        setLocalizations(texts: Partial<TextAndButtonsPrompt.LocalizableTexts>): void;
        /**
         * Sets texts which can either be localizable or static.
         */
        setTexts(texts: Partial<TextAndButtonsPrompt.LocalizableTexts>): void;
    }
    module TextAndButtonsPrompt {
        interface LocalizableTexts extends ButtonsPrompt.LocalizableTexts {
            contentText: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    abstract class OkCancelPrompt<T> extends Popup<{
        isOk: true;
        value: T;
    } | {
        isOk: false;
    }> {
        protected __okButton: Beckhoff.TcHmiButton;
        protected __cancelButton: Beckhoff.TcHmiButton;
        protected __backgroundAction: Popup.BackgroundAction<'ok' | 'cancel'>;
        /**
         * Creates a new OkCancelPrompt instance.
         * @param localizations A collection of localization symbol expressions to localize texts in the control.
         * @param parentControl The control which owns the popup.
         */
        constructor(parentControl?: TcHmi.Controls.System.TcHmiControl | null);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Handler for the onPressed event of the OK button.
         */
        protected __onOkPressed: () => void;
        /**
         * Handler for the onPressed event of the cancel button.
         */
        protected __onCancelPressed: () => void;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer(). Must be implemented by inheriting class.
         * Please check validity in this method and don't rely on the OK buttons isEnabled state, as this method might be called on background click or other events too.
         */
        protected abstract __ok(): void;
        /**
         * Performs the action for the Cancel button.
         */
        protected __cancel(): void;
        /**
         * Sets what happens when the user clicks the close button or the background while the popup is showing, or
         * when the prompt is aborted via API call.
         * @param action The action to perform. If the popup should be closed, you can specify ok or cancel to perform
         * the associated action.
         */
        setBackgroundAction(action: Popup.BackgroundAction<'ok' | 'cancel'>): void;
        /**
         * Performs the background action.
         */
        protected __performBackgroundAction(): void;
        /**
         * DEPRECATED
         * Please use setTexts
         * @param texts A collection of localization symbol expressions.
         * @deprecated Please use setTexts
         */
        setLocalizations(texts: Partial<OkCancelPrompt.LocalizableTexts>): void;
        /**
         * Sets texts which can either be localizable or static.
         */
        setTexts(texts: Partial<OkCancelPrompt.LocalizableTexts>): void;
    }
    module OkCancelPrompt {
        interface LocalizableTexts {
            buttonTextOk: Localizable;
            buttonTooltipOk: Localizable;
            buttonTextCancel: Localizable;
            buttonTooltipCancel: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class InputPrompt extends OkCancelPrompt<string> {
        protected __input: Beckhoff.TcHmiInput;
        protected __forbiddenValues: Set<string>;
        protected __validationPatterns: {
            pattern: RegExp;
            expectedTestResult: boolean;
        }[];
        protected __elementLabel: HTMLElement;
        /**
         * Creates a new InputPrompt instance.
         * @param parentControl The control which owns the popup.
         */
        constructor(parentControl?: TcHmi.Controls.System.TcHmiControl | null);
        /**
         * Handler for the onTextChanged event of the input.
         */
        protected __onTextChanged: () => void;
        /**
         * Handler for the keydown event of the popup element.
         */
        protected __onKeydown: (e: KeyboardEvent) => void;
        /**
         * Checks if the text of the input is valid and sets the isEnabled state of the button and the invalid class of the input accordingly.
         */
        protected __validate(): void;
        /**
         * Validates the given text.
         * @param text The text to validate.
         */
        protected __isValid(text: string): boolean;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer().
         */
        protected __ok(): void;
        /**
         * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
         * @param forbiddenValues Values that cannot be entered (i.e. because another item with this name already exists).
         * @param defaultValue The default to fill the input with.
         */
        prompt(forbiddenValues?: Iterable<string> | null, defaultValue?: string): Promise<{
            isOk: true;
            value: string;
        } | {
            isOk: false;
        }>;
        /**
         * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
         */
        show(): void;
        setValidationPatterns(patterns: {
            pattern: RegExp;
            expectedTestResult: boolean;
        }[]): void;
        getValidationPatterns(): {
            pattern: RegExp;
            expectedTestResult: boolean;
        }[];
        /**
         * DEPRECATED
         * Please use setTexts
         * @param texts A collection of localization symbol expressions.
         * @deprecated Please use setTexts
         */
        setLocalizations(texts: Partial<InputPrompt.LocalizableTexts>): void;
        /**
         * Sets texts which can either be localizable or static.
         */
        setTexts(texts: Partial<InputPrompt.LocalizableTexts>): void;
    }
    module InputPrompt {
        interface LocalizableTexts extends OkCancelPrompt.LocalizableTexts {
            labelText: Localizable;
            headerText: Localizable;
        }
    }
}
//# sourceMappingURL=TcHmiPopups.d.ts.map