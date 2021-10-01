declare module TcHmi {
    module Controls {
        module TcHmiSimpleRangeSlider {
            class TcHmiSimpleRangeSliderControl extends TcHmi.Controls.System.TcHmiControl {
                /**
                 * Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
                protected __elementTemplateRoot: JQuery;
                protected __elementRangeSliderDiv: JQuery;
                protected __elementRangeSliderInput: JQuery;
                protected __value: number | null;
                protected __min: number | null;
                protected __max: number | null;
                protected __step: number | null;
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  * Call attribute processor functions here to initialize default values!
                  */
                __previnit(): void;
                /**
                 * Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
                 * @returns {void}
                 */
                __init(): void;
                /**
                * Is called by tachcontrol() after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __attach(): void;
                /**
                * Is called by tachcontrol() after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __detach(): void;
                /**
                * Destroy the current control instance.
                * Will be called automatically if system destroys control!
                */
                destroy(): void;
                /**
                * Gets the value of __step
                * @returns The current value of Step
                */
                getStepSize(): number | null;
                /**
                 * Sets the value of Step
                 * @param valueNew The new value for Step
                 */
                setStepSize(valueNew: number): void;
                /**
                * Gets the value of __max
                * @returns The current value of Max
                */
                getMax(): number | null;
                /**
                 * Sets the value of Max
                 * @param valueNew The new value for Max
                 */
                setMax(valueNew: number): void;
                /**
                * Gets the value of __min
                * @returns The current value of Min
                */
                getMin(): number | null;
                /**
                 * Sets the value of Min
                 * @param valueNew The new value for Min
                 */
                setMin(valueNew: number): void;
                /**
                * Gets the value of __value
                * @returns The current value of Value
                */
                getValue(): number | null;
                /**
                * Sets the value of Value
                * @param valueNew The new value for Value
                */
                setValue(valueNew: number): void;
                /**
                 * Processes the Value.
                 * @function
                 */
                protected __processValue(): void;
                /**
                 * Processes the Slider Change Event.
                 * @function
                 */
                protected __sliderInputChange(e: any, $this: this): void;
            }
        }
    }
}
