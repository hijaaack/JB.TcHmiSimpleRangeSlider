declare function parseInt(s: string | undefined, radix: number): number;
declare module TcHmi.Controls.Beckhoff {
    class TcHmiDateTimePicker extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /** member variables */
        /** Reference to the root dom element of the current control template as  jquery object. */
        protected __elementTemplateRoot: HTMLElement;
        /** Reference to the root dom element of the current control template as  jquery object. */
        protected __elementDTPTemplate: JQuery;
        /** Reference to the div with calendar in the control template as jquery object. */
        protected __elementCalendarTemplate: JQuery;
        /** Reference to the div with calendar in the control template as jquery object. */
        protected __elementTimeAndButtonTemplate: JQuery;
        /** Reference to the button template dom element of the current control as  jquery object. */
        protected __elementButtonTemplate: HTMLElement;
        /** Reference to the div element used as error display (top most layer) as jquery object. */
        protected __elementInvalidNotification: HTMLElement;
        /**
         * Internal reference to the attribute "data-tchmi-value" (iso timestamp string)
         */
        protected __value: string | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-min-value" (iso timestamp string)
         */
        protected __minValue: string | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-max-value" (iso timestamp string)
         */
        protected __maxValue: string | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-direct-display"
         */
        protected __directDisplay: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-ignore-invalid-values' */
        protected __ignoreInvalidValues: boolean | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-show-confirmation-buttons"
         */
        protected __showConfirmationButtons: boolean | undefined;
        /** Event handlers */
        protected __resizedEventDestroyEvent: DestroyFunction | null;
        protected __onMoveEventDestroyEvent: DestroyFunction | null;
        protected __mousedownHandler: (event: MouseEvent) => void;
        protected __mousedownCalendarHandler: (event: MouseEvent) => void;
        protected __mouseupHandler: (event: MouseEvent) => void;
        protected __focusoutHandler: (event: FocusEvent) => void;
        protected __keypressHandler: (event: KeyboardEvent) => void;
        private __onPressedOkDestroyEvent;
        private __onPressedCancelDestroyEvent;
        private __onUserInteractionFinishedHourDestroyEvent;
        private __onUserInteractionFinishedMinuteDestroyEvent;
        private __onUserInteractionFinishedSecondDestroyEvent;
        private __onUserInteractionFinishedMillisecondDestroyEvent;
        /** Stores the controls as System.TcHmiControl[] */
        protected __baseControls: Dictionary<System.TcHmiControl>;
        protected __localizationReader: Locale.LocalizationReader | undefined;
        protected __destroyLocalizationWatch: DestroyFunction | null;
        /** Internal date-object */
        protected defaultDate: TcHmi.Localization.DateParts;
        protected __internalDateObject: TcHmi.Localization.DateParts;
        protected __dateSelectionObject: TcHmi.Localization.DateParts;
        protected __internalMinDateObject: TcHmi.Localization.DateParts | null;
        protected __internalMaxDateObject: TcHmi.Localization.DateParts | null;
        /** Saved if the calendar is pressed */
        protected __isPressedCalendar: boolean;
        /** The interval timer for calendar interaction buttons */
        protected __intervalTimerCalendar: number;
        /** millisecond offset from the current (not browser) timeZone to utc */
        protected __utcOffset: number;
        /** Regex to validate a string after RFC 3339, the subset of ISO 8601 that is used in JsonSchema. See https://regexr.com/5cnhd for tests.*/
        private readonly __REGEX_ISO_8601;
        protected __restoreUserInputOnLoad: boolean | undefined;
        protected __dataPrecedence: TcHmi.DataPrecedence | undefined;
        protected __userInput: TcHmiDateTimePicker.UserInput | null;
        protected __storage: LocalStorage<{
            userInput: TcHmiDateTimePicker.UserInput;
        }> | undefined;
        /** The interval timer for updateInvalidNotification */
        protected __updateInvalidNotificationTimer: number;
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
         * Is called if onResized event of control has raised.
         */
        protected __onResized: () => void;
        /**
         * Update the invalid notification icon and adjusts OK button state.
         */
        protected __updateInvalidNotification(): void;
        /**
         * Return the currently configured UTC date.
         */
        protected __getUtcDate(): Date;
        /**
         * Return the currently configured UTC date.
         */
        protected __getUtcDateFromDateSelection(): Date;
        /**
         * Compares two dates in the form of Date objects of ISO 8601 compatible strings. If strings are used, they can
         * be compared with nanosecond precision.
         * Returns -1 if the first date is earlier then the second, 1 if the second date is earlier and 0 if the dates
         * are equal.
         * @param a The first date to compare.
         * @param b The second date to compare.
         */
        protected __compareDates(a: string | Date, b: string | Date): -1 | 0 | 1;
        /**
         * Returns an event handler for the mousedown event.
         */
        protected __onMousedown(): (event: MouseEvent) => void;
        /**
         * Returns an event handler for the mousedown event of the choice area element.
         */
        protected __onMousedownCalendar(): (event: MouseEvent) => void;
        private __updateHeaderDate;
        /**
         * Is called if onPressed event of buttons has raised.
         */
        private __onMouseup;
        /**
         * Is called if onMouseDown event of buttons (ok and cancel) has raised.
         */
        private __onPressed;
        /**
         * Is called if onUserInteractionFinished event of Textbox has raised.
         */
        private __onUserInteractionFinished;
        /**
         * Is called if focusout event  has raised.
         */
        private __onFocusOut;
        /**
         * Is called if keypress event  has raised.
         */
        private __onKeyPress;
        /**
         * Open the dateTimePicker (in TopMostLayer).
         */
        openDateTimePicker(): void;
        /**
         * Close the dateTimePicker without changes (delete from TopMostLayer).
         */
        closeDateTimePicker(): void;
        /**
         * Created a calendar for one year.
         */
        private createCalendar;
        /**
         * Create a spinbox control
         */
        protected __createSpinbox(name: string, value: number, zeroPadding: number, maxValue: number): TcHmiSpinboxInput;
        /**
         * Create a separating element.
         */
        protected __createDivider(character: string): HTMLDivElement;
        /**
         * Created a time picker.
         */
        private __createTime;
        /**
         * Sets __internalValue and updates the textboxes.
         */
        protected __setInternalValue(value: string | undefined): void;
        /**
         * Checks if dateSelection is in the value range and sets it to internalDateObject or not.
         */
        private __checkDateSelection;
        /**
         * Checks if value is valid.
         */
        isValid(value: string | Date): boolean;
        /**
         * Sets the value of value
         * @param valueNew The new value for value
         */
        setValue(valueNew: string | null): void;
        protected __setValue(valueNew: string | null, process?: boolean): void;
        /**
         * Gets the value of value
         */
        getValue(): string;
        /**
         * Processes value
         */
        protected __processValue(): void;
        /**
         * Sets the value of MinValue
         * @param valueNew The new value for MinValue
         */
        setMinValue(valueNew: string | null): void;
        /**
         * Gets the value of MinValue
         */
        getMinValue(): string | undefined;
        /**
         * Processes the value of MinValue
         */
        protected __processMinValue(): void;
        /**
         * Sets the value of MaxValue
         * @param valueNew The new value for MaxValue
         */
        setMaxValue(valueNew: string | null): void;
        /**
         * Gets the value of MaxValue
         */
        getMaxValue(): string | undefined;
        /**
         * Processes the value of MaxValue
         */
        protected __processMaxValue(): void;
        /**
         * Sets the ignoreInvalidValues attribute.
         * @param valueNew The new value for ignoreInvalidValues.
         */
        setIgnoreInvalidValues(valueNew: boolean | null): void;
        /**
         * Returns the current value of ignoreInvalidValues.
         * @returns The current value of ignoreInvalidValues.
         */
        getIgnoreInvalidValues(): boolean | undefined;
        /**
         * Processes the current value of attribute ignoreInvalidValues.
         */
        protected __processIgnoreInvalidValues(): void;
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
        protected __evaluateDataPrecedence(incoming: string | null): boolean;
        /**
         * Sets the value of DirectDisplay
         * @param valueNew The new value for DirectDisplay
         */
        setDirectDisplay(valueNew: boolean | null): void;
        /**
         * Gets the value of DirectDisplay
         */
        getDirectDisplay(): boolean | undefined;
        /**
         * Process the value of DirectDisplay
         */
        protected __processDirectDisplay(): void;
        /**
         * Sets the value of ShowConfirmationButtons
         * @param valueNew The new value for ShowConfirmationButtons
         */
        setShowConfirmationButtons(valueNew: boolean | null): void;
        /**
         * Gets the value of ShowConfirmationButtons
         */
        getShowConfirmationButtons(): boolean | undefined;
        /**
         * Process the value of ShowConfirmationButtons
         */
        protected __processShowConfirmationButtons(): void;
        /**
         * Processes the current enabled state.
         */
        __processIsEnabled(): void;
    }
    module TcHmiDateTimePicker {
        interface UserInput {
            userData: string;
            originalData: string | null;
        }
    }
}
//# sourceMappingURL=TcHmiDateTimePicker.d.ts.map