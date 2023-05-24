declare module TcHmi.Controls.Beckhoff {
    class TcHmiSpinboxInput extends TcHmi.Controls.Beckhoff.TcHmiNumericInput {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /** Reference to the root dom element of the current control template as  jquery object. */
        protected __elementButtonContainerStart: HTMLElement;
        /** Reference to the element containing the text input element as jquery object. */
        protected __elementButtonContainerEnd: HTMLElement;
        protected __inputBackgroundColor: Color | null | undefined;
        protected __buttonPlus: HTMLElement | undefined;
        protected __buttonMinus: HTMLElement | undefined;
        protected __autoStep: boolean | undefined;
        /** Saved if a time button is pressed */
        protected __isPressed: boolean;
        /** The interval timer for time buttons */
        protected __intervalTimer: number;
        protected readonly __evtHandlerMouseClickPlus: (this: void, e: MouseEvent) => void;
        protected readonly __evtHandlerMouseClickMinus: (this: void, e: MouseEvent) => void;
        protected readonly __evtHandlerMouseDownPlus: (this: void, e: MouseEvent) => void;
        protected readonly __evtHandlerMouseDownMinus: (this: void, e: MouseEvent) => void;
        protected readonly __evtHandlerDocumentMouseUp: (this: void, e: MouseEvent) => void;
        /**
         * Is set to true if the control is locked and to false if the control is unlocked.
         * When the control is locked, calls to setValue are ignored.
         */
        protected __locked: boolean;
        /** Internal reference to the attribute 'data-tchmi-step' */
        protected __step: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-button-position' */
        protected __buttonPosition: TcHmiSpinboxInput.ButtonPosition | undefined;
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
        protected __createAndAppendButtons(): void;
        /**
         * Execute a single step.
         */
        protected __executeStep(direction: 'increment' | 'decrement'): void;
        /**
         * Eventhandler for the plus button
         **/
        protected __onButtonPlus(): () => void;
        /**
         * Eventhandler for the minus button
         **/
        protected __onButtonMinus(): () => void;
        /**
         * Eventhandler for the plus button mousedown
         **/
        protected __onMouseDownButtonPlus(): () => void;
        /**
         * Eventhandler for the minus button mousedown
         **/
        protected __onMouseDownButtonMinus(): () => void;
        /**
         * Is called if onPressed event of buttons has raised.
         */
        private __onMouseUp;
        /**
         * Sets the step attribute.
         * @param valueNew The new value for step.
         */
        setStep(valueNew: number | null): void;
        /**
         * Returns the current value of step.
         * @returns The current value of step.
         */
        getStep(): number | undefined;
        /**
         * Processes the current value of attribute step.
         */
        protected __processStep(): void;
        /**
         * Sets the buttonPosition attribute.
         * @param valueNew The new value for buttonPosition.
         */
        setButtonPosition(valueNew: TcHmiSpinboxInput.ButtonPosition | null): void;
        /**
         * Returns the current value of buttonPosition.
         */
        getButtonPosition(): TcHmiSpinboxInput.ButtonPosition | undefined;
        /**
         * Processes the current value of attribute buttonPosition.
         */
        protected __processButtonPosition(): void;
        /**
         * Sets the input background color and calls the associated process function (processInputBackgroundColor).
         * @param valueNew
         */
        setInputBackgroundColor(valueNew: Color | null): void;
        /**
         * The watch callback for the InputBackgroundColor object resolver.
         */
        protected __onResolverForInputBackgroundColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Color>) => void;
        /**
         * Returns the current input background color.
         */
        getInputBackgroundColor(): Color | null | undefined;
        /**
         * Processes the current input background color attribute.
         */
        protected __processInputBackgroundColor(): void;
        /**
         * Sets the auto focus out attribute and calls the associated process function (processAutoStep).
         * @param valueNew The new value for autoStep.
         */
        setAutoStep(valueNew: boolean | null): void;
        /**
         * Returns the current value of autoStep.
         * @returns The current value of autoStep.
         */
        getAutoStep(): boolean | undefined;
        /**
         * Processes the current autoStep attribute value.
         */
        protected __processAutoStep(): void;
    }
    module TcHmiSpinboxInput {
        type ButtonPosition = 'BothLeft' | 'BothRight' | 'PlusLeftAndMinusRight' | 'MinusLeftAndPlusRight' | 'PlusTopAndMinusBottom' | 'MinusTopAndPlusBottom';
    }
}
//# sourceMappingURL=TcHmiSpinboxInput.d.ts.map