declare module TcHmi.Controls.Beckhoff {
    class TcHmiToggleButton extends TcHmiButton {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /**
         * Internal reference to the attribute 'data-tchmi-toggle-group'.
         */
        protected __toggleGroup: string | null | undefined;
        /**
         * Internal reference to the attribute 'data-tchmi-toggle-state'.
         */
        protected __toggleState: ToggleState | undefined;
        protected __restoreUserInputOnLoad: boolean | undefined;
        protected __dataPrecedence: TcHmi.DataPrecedence | undefined;
        protected __userInput: TcHmiToggleButton.UserInput | null;
        protected __storage: LocalStorage<{
            userInput: TcHmiToggleButton.UserInput;
        }> | undefined;
        protected __toggleLock: boolean;
        protected __touchLockTimeoutId: number;
        protected __onToggleGroupToggledEventDestroyEvent: DestroyFunction | null;
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
         * Processes the current state if state has changed.
         * @param state The new state of the control.
         * @param forwardStateSymbol Controls if a change should be reflected to an possible existing state symbol. This is required to prevent changes from the symbol to be written to the symbol again.
         * @param source What caused the state change. Could be 'userInteraction', the change of an 'attribute' or the state symbol, or the 'toggleGroup'.
         */
        protected __setInternalState(state: boolean, source: string): void;
        /**
         * Event handler for the onPropertyChanged<IsEnabled> Event. Overrides __onPropertyIsEnabledChanged of TcHmiButton.
         */
        protected __onPropertyIsEnabledChanged(): (e: EventProvider.Event, data: {
            propertyName: string;
            dirtyPaths?: string[];
        }) => void;
        /**
         * Returns an event handler for the mousedown event.
         */
        protected __onMouseDown(): (event: MouseEvent) => void;
        /**
         * Returns an event handler for the mouseup event.
         */
        protected __onMouseUp(): (event: MouseEvent) => void;
        /**
         * Returns an event handler for the mouseenter event.
         */
        protected __onMouseEnter(): (event: MouseEvent) => void;
        /**
         * Returns an event handler for the mouseleave event.
         */
        protected __onMouseLeave(): (event: MouseEvent) => void;
        /**
         * Returns an event handler for the touchstart event.
         */
        protected __onTouchStart(): (event: TouchEvent) => void;
        /**
         * Returns an event handler for the touchend and touchcancel events.
         */
        protected __onTouchEndOrCancel(): (event: TouchEvent) => void;
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
         * Sets the toggleState attribute to a new value.
         * @param valueNew The new value for the toggleState attribute.
         * @param forwardStateSymbol Does nothing, only exists for backwards compatibility purposes.
         * @param process Allows to disable underlying calls to processToggleState. Required if a StateSymbol change is reflected to the ToggleState.
         */
        protected __setToggleState(valueNew: ToggleState | null, forwardStateSymbol?: boolean, process?: boolean): void;
        /**
         * Sets the toggleState attribute to a new value.
         * @param valueNew The new value for the toggleState attribute.
         */
        setToggleState(valueNew: ToggleState | null): void;
        /**
         * Returns the current value of the toggleState attribute
         */
        getToggleState(): "Normal" | "Active" | undefined;
        /**
         * Processes the current value of the toggleState attribute.
         * @param forwardStateSymbol Does nothing, only exists for backwards compatibility purposes.
         */
        protected __processToggleState(forwardStateSymbol?: boolean): void;
        /**
         * Sets the value of restoreUserInputOnLoad
         * @param valueNew The new value for restoreUserInputOnLoad
         */
        protected setRestoreUserInputOnLoad(valueNew: boolean | null): void;
        /**
         * Gets the value of restoreUserInputOnLoad
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
    }
    module TcHmiToggleButton {
        interface UserInput {
            userData: boolean;
            originalData: boolean;
        }
    }
}
//# sourceMappingURL=TcHmiToggleButton.d.ts.map