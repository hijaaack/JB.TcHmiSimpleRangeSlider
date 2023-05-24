declare module TcHmi.Controls.Beckhoff {
    class TcHmiCheckbox extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        protected __elementCheckbox: JQuery;
        protected __textDiv: HTMLDivElement | null;
        protected __toggleGroup: string | null | undefined;
        protected __toggleState: ToggleState | undefined;
        protected __stateSymbol: TcHmi.Symbol<boolean> | null | undefined;
        protected __toggleStateIconColor: TcHmi.SolidColor | null | undefined;
        protected __text: string | null | undefined;
        /**  Internal reference to the attribute "data-tchmi-ignore-escape-sequences" */
        protected __ignoreEscapeSequences: boolean | undefined;
        protected __textPosition: TcHmiCheckbox.TextPosition | undefined;
        protected __textHorizontalAlignment: HorizontalAlignment | undefined;
        protected __textVerticalAlignment: VerticalAlignment | undefined;
        protected __textFontFamily: FontFamily | null | undefined;
        protected __textFontSize: number | null | undefined;
        protected __textFontSizeUnit: FontSizeUnit | undefined;
        protected __textFontStyle: FontStyle | undefined;
        protected __textFontWeight: FontWeight | undefined;
        protected __textColor: SolidColor | null | undefined;
        protected __textBackgroundColor: Color | null | undefined;
        /** Destroy functions */
        protected __onPressedEventDestroyEvent: DestroyFunction | null;
        protected __resizedEventDestroyEvent: DestroyFunction | null;
        protected __onToggleGroupToggledEventDestroyEvent: DestroyFunction | null;
        protected __destroyStateSymbolWatch: DestroyFunction | null;
        /** Helper */
        protected __state: boolean;
        protected __isActive: boolean;
        protected __restoreUserInputOnLoad: boolean | undefined;
        protected __dataPrecedence: TcHmi.DataPrecedence | undefined;
        protected __userInput: TcHmiCheckbox.UserInput | null;
        protected __storage: LocalStorage<{
            userInput: TcHmiCheckbox.UserInput;
        }> | undefined;
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
         * Is raised if a member of 'toggleGroup' has raised the toggled event.
         */
        protected __onToggleGroupToggled(): (evt: EventProvider.Event, data: {
            ActiveElementId: string;
            source: string;
        }) => void;
        /**
         * Sets the toggleGroup attribute to a new value.
         * @param valueNew The new value for the toggleGroup attribute.
         */
        setToggleGroup(valueNew: string | null): void;
        /**
         * Returns the current  value of the toggleGroup attribute
         */
        getToggleGroup(): string | null | undefined;
        /**
         * Processes the current value of the toggleGroup attribute.
         */
        protected __processToggleGroup(): void;
        /**
         * Writes the given state to the state symbol, if it exists. Otherwise just sets the internal state variable.
         * @param state The state to write.
         * @param source What caused the state change. Could be 'userInteraction', the change of an 'attribute' or the state symbol, or the 'toggleGroup'.
         */
        protected __writeState(state: boolean, source: string): Promise<boolean>;
        /**
         * Sets the internal state variable and raises state change events if state has changed.
         * @param state The new state of the control.
         * @param source What caused the state change. Could be 'userInteraction', the change of an 'attribute' or the state symbol, or the 'toggleGroup'.
         */
        protected __setInternalState(state: boolean, source: string): void;
        /**
         * Writes the state symbol, or just sets the internal state variable, depending on the value of forwardStateSymbol.
         * @param state The new state.
         * @param forwardStateSymbol Whether to write the state symbol or just set the internal state variable.
         * @param source What caused the state change. Could be 'userInteraction', the change of an 'attribute' or the state symbol, or the 'toggleGroup'.
         */
        protected __processState(state: boolean, forwardStateSymbol: boolean, source: string): void;
        /**
         * Sets whether the checkbox should be displayed in an active state.
         * @param valueNew The new active state.
         */
        protected __setIsActive(valueNew: boolean): void;
        /**
         * Returns an event handler function for the onResized event.
         */
        protected __onResized(): () => void;
        /**
         * Is raised when the onPressed event is fired from the base control.
         */
        protected __onPressed(): () => void;
        /**
         * Sets the toggleState attribute to a new value.
         * @param valueNew The new value for the toggleState attribute.
         * @param forwardStateSymbol Does nothing, only exists for backwards compatibility purposes.
         * @param process Allows to disable underlying calls to processToggleState. Required if a StateSymbol change is reflected to the ToggleState.
         */
        protected __setToggleState(valueNew: ToggleState | null, forwardStateSymbol: boolean, process: boolean): void;
        /**
         * Sets the toggleState attribute to a new value.
         * @param valueNew  The new value for the toggleState attribute.
         */
        setToggleState(valueNew: ToggleState | null): void;
        /**
         * Returns the current  value of the toggleState attribute
         */
        getToggleState(): "Normal" | "Active" | undefined;
        /**
         * Processes the current value of the toggleState attribute.
         * @param forwardStateSymbol Does nothing, only exists for backwards compatibility purposes.
         */
        protected __processToggleState(forwardStateSymbol?: boolean): void;
        /**
         * Sets the text color and calls the associated process function (processToggleStateIconColor).
         * @param valueNew The new value for toggleStateIconColor.
         */
        setToggleStateIconColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the toggleStateIconColor object resolver.
         */
        protected __onResolverForToggleStateIconColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current value of toggleStateIconColor.
         * @returns The current value of toggleStateIconColor.
         */
        getToggleStateIconColor(): SolidColor | null | undefined;
        /**
         * Processes the current toggleStateIconColor attribute value.
         */
        protected __processToggleStateIconColor(): void;
        protected __processStateSymbolResult(data: TcHmi.Symbol.IReadResultObject<boolean>): void;
        /**
         * The watch callback for the StateSymbol.
         * @param data Object containing the new value of the StateSymbol.
         */
        protected __onStateSymbolWatch(): (data: TcHmi.Symbol.IReadResultObject<boolean>) => void;
        /**
         * @param valueNew
         */
        setStateSymbol(valueNew: TcHmi.Symbol | null): void;
        /**
         */
        getStateSymbol(): Symbol<boolean> | null | undefined;
        /**
         * Sets the value of restoreUserInputOnLoad
         * @param valueNew The new value for restoreUserInputOnLoad
         */
        protected setRestoreUserInputOnLoad(valueNew: boolean | null): void;
        /**
         * Gets the value of restoreUserInputOnLoad
         * @returns The current value of restoreUserInputOnLoad
         */
        protected getRestoreUserInputOnLoad(): boolean | undefined;
        /**
         * Processes restoreUserInputOnLoad
         */
        protected __processRestoreUserInputOnLoad(): void;
        /**
         * Reset all user input data and optionally restore the original values into the control.
         * @param restoreOriginalValue If true, the original values will be restored in the control. Otherwise the control will just forget which values were entered by the user
         */
        protected resetUserInput(restoreOriginalValue: boolean): void;
        /**
         * Sets the value of dataPrecedence
         * @param valueNew The new value for dataPrecedence
         */
        protected setDataPrecedence(valueNew: TcHmi.DataPrecedence | null): void;
        /**
         * Gets the value of dataPrecedence
         * @returns The current value of dataPrecedence
         */
        protected getDataPrecedence(): DataPrecedence | undefined;
        /**
         * Returns whether the incoming data has precedence over userInput. Also updates userInput if necessary.
         * @param incoming The incoming data.
         */
        protected __evaluateDataPrecedence(incoming: boolean): boolean;
        /**
         * Sets the text attribute to a new value.
         * @param valueNew The new value for the text attribute.
         */
        setText(valueNew: string | null): void;
        /**
         * Returns the current  value of the text attribute
         */
        getText(): string | null | undefined;
        /**
         * Processes the current value of the text attribute.
         */
        protected __processText(): void;
        /**
         * Sets the value of the member variable IgnoreEscapeSequences.
         * @param valueNew The new value for IgnoreEscapeSequences
         */
        setIgnoreEscapeSequences(valueNew: boolean | null | undefined): void;
        /**
         * Returns the current value of IgnoreEscapeSequences.
         * @returns The current value of IgnoreEscapeSequences.
         */
        getIgnoreEscapeSequences(): boolean | undefined;
        /**
         * Sets the textPosition attribute to a new value.
         * @param valueNew The new value for the textPosition attribute.
         */
        setTextPosition(valueNew: TcHmiCheckbox.TextPosition | null): void;
        /**
         * Returns the current  value of the textPosition attribute
         */
        getTextPosition(): TcHmiCheckbox.TextPosition | undefined;
        /**
         * Processes the current value of the textPosition attribute.
         */
        protected __processTextPosition(): void;
        /**
         * Sets the textHorizontalAlignment attribute to a new value.
         * @param valueNew The new value for the textHorizontalAlignment attribute.
         */
        setTextHorizontalAlignment(valueNew: HorizontalAlignment | null): void;
        /**
         * Returns the current  value of the textHorizontalAlignment attribute
         */
        getTextHorizontalAlignment(): "Left" | "Right" | "Center" | undefined;
        /**
         * Processes the current value of the textHorizontalAlignment attribute.
         */
        protected __processTextHorizontalAlignment(): void;
        /**
         * Sets the textVerticalAlignment attribute to a new value.
         * @param valueNew The new value for the textVerticalAlignment attribute.
         */
        setTextVerticalAlignment(valueNew: VerticalAlignment | null): void;
        /**
         * Returns the current  value of the textVerticalAlignment attribute
         */
        getTextVerticalAlignment(): "Center" | "Top" | "Bottom" | undefined;
        /**
         * Processes the current value of the textVerticalAlignment attribute.
         */
        protected __processTextVerticalAlignment(): void;
        /**
         * Sets the textFontFamily attribute to a new value.
         * @param valueNew The new value for the textFontFamily attribute.
         */
        setTextFontFamily(valueNew: FontFamily | null): void;
        /**
         * Returns the current  value of the textFontFamily attribute
         */
        getTextFontFamily(): string | null | undefined;
        /**
         * Processes the current value of the textFontFamily attribute.
         */
        protected __processTextFontFamily(): void;
        /**
         * Sets the textFontSize attribute to a new value.
         * @param valueNew The new value for the textFontSize attribute.
         */
        setTextFontSize(valueNew: number | null): void;
        /**
         * Returns the current  value of the textFontSize attribute
         */
        getTextFontSize(): number | null | undefined;
        /**
         * Processes the current value of the textFontSize attribute.
         */
        protected __processTextFontSize(): void;
        /**
         * Sets the textFontSizeUnit attribute to a new value.
         * @param valueNew The new value for the textFontSizeUnit attribute.
         */
        setTextFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current  value of the textFontSizeUnit attribute
         */
        getTextFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current value of the textFontSizeUnit attribute.
         */
        protected __processTextFontSizeUnit(): void;
        /**
         * Sets the textFontStyle attribute to a new value.
         * @param valueNew The new value for the textFontStyle attribute.
         */
        setTextFontStyle(valueNew: FontStyle | null): void;
        /**
         * Returns the current  value of the textFontStyle attribute
         */
        getTextFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined;
        /**
         * Processes the current value of the textFontStyle attribute.
         */
        protected __processTextFontStyle(): void;
        /**
         * Sets the textFontWeight attribute to a new value.
         * @param valueNew The new value for the textFontWeight attribute.
         */
        setTextFontWeight(valueNew: FontWeight | null): void;
        /**
         * Returns the current  value of the textFontWeight attribute
         */
        getTextFontWeight(): "Normal" | "Auto" | "Bold" | undefined;
        /**
         * Processes the current value of the textFontWeight attribute.
         */
        protected __processTextFontWeight(): void;
        /**
         * Sets the text color and calls the associated process function (processTextColor).
         * @param valueNew The new value for textColor.
         */
        setTextColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the textColor object resolver.
         * @param data Object containing the new value for textColor
         */
        protected __onResolverForTextColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current value of textColor.
         * @returns The current value of textColor.
         */
        getTextColor(): SolidColor | null | undefined;
        /**
         * Processes the current textColor attribute value.
         */
        protected __processTextColor(): void;
        /**
         * Returns the current background value.
         * @preserve (Part of the public API)
         */
        getTextBackgroundColor(): Color | null | undefined;
        /**
         * Sets the background value and calls the associated process function (processBackground).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setTextBackgroundColor(valueNew: Color | null): void;
        /**
         * The watch callback for the TextBackgroundColor object resolver.
         */
        protected __onResolverForTextBackgroundColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Color>) => void;
        /**
         * Processes the current border-color attribute.
         */
        protected __processTextBackgroundColor(): void;
        /**
         * Before 1.12 BackgroundColor was the checkbox itself, as we had no label...
         * So we have to move the processed overall background config to the checkbox element
         */
        protected __processAllBackground(): void;
        /**
         * Processes the current border-radius attribute.
         */
        protected __processBorderRadius(): void;
    }
    module TcHmiCheckbox {
        type TextPosition = 'Left' | 'Right';
        interface UserInput {
            userData: boolean;
            originalData: boolean;
        }
    }
}
//# sourceMappingURL=TcHmiCheckbox.d.ts.map