/*
 * Generated 9/22/2021 6:02:32 PM
 * Copyright (C) 2021
 */
module TcHmi {
    export module Controls {
        export module TcHmiSimpleRangeSlider {
            export class TcHmiSimpleRangeSliderControl extends TcHmi.Controls.System.TcHmiControl {

                /*
                Attribute philosophy
                --------------------
                - Local variables are not set while definition in class, so they have the value 'undefined'.
                - On compile the Framework sets the value from HTML or from theme (possibly 'null') via normal setters.
                - The "changed detection" in the setter will result in processing the value only once while compile.
                - Attention: If we have a Server Binding on an Attribute the setter will be called once with null to initialize and later with the correct value.
                */

                /**
                 * Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
                }

                protected __elementTemplateRoot!: JQuery;
                protected __elementRangeSliderDiv!: JQuery;
                protected __elementRangeSliderInput!: JQuery;
                protected __value: number | null;
                protected __min: number | null;
                protected __max: number | null;
                protected __step: number | null;

                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  * Call attribute processor functions here to initialize default values!
                  */
                public __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_TcHmiSimpleRangeSlider_TcHmiSimpleRangeSliderControl-Template');
                    if (this.__elementTemplateRoot.length === 0) {
                        throw new Error('Invalid Template.html');
                    }

                    this.__elementRangeSliderDiv = this.__elementTemplateRoot.find('.range-slider');
                    this.__elementRangeSliderInput = this.__elementRangeSliderDiv.find('.range-slider-input');
                 
                    // Call __previnit of base class
                    super.__previnit();
                }
                /** 
                 * Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values. 
                 * @returns {void}
                 */
                public __init() {
                    super.__init();
                }

                /**
                * Is called by tachcontrol() after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                public __attach() {
                    super.__attach();

                    /**
                     * Initialize everything which is only available while the control is part of the active dom.
                     */

                    var $this = this;

                    this.__elementRangeSliderInput.on('change', function (e) {
                        $this.__sliderInputChange(e, $this);
                    });

                }

                /**
                * Is called by tachcontrol() after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                public __detach() {
                    super.__detach();

                    /**
                     * Disable everything which is not needed while the control is not part of the active dom.
                     * No need to listen to events for example!
                     */

                    this.__elementRangeSliderInput.off('change');
                }

                /**
                * Destroy the current control instance. 
                * Will be called automatically if system destroys control!
                */
                public destroy() {
                    /**
                    * While __keepAlive is set to true control must not be destroyed.
                    */
                    if (this.__keepAlive) {
                        return;
                    }

                    super.destroy();

                    /**
                    * Free resources like child controls etc.
                    */
                }
                        
                /**
                * Gets the value of __step
                * @returns The current value of Step
                */
                getStepSize(): number | null {
                    return this.__step;
                }

                /**
                 * Sets the value of Step
                 * @param valueNew The new value for Step
                 */
                public setStepSize(valueNew: number) {
                    //convert the new value
                    let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                    //if converted value is null, get internal default
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("StepSize");
                    }

                    //save the new value
                    this.__step = convertedValue;

                    //Inform the system that the function has a changed result
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getStepSize"]);

                    //Process the new Value
                    this.__processValue();
                }



                /**
                * Gets the value of __max
                * @returns The current value of Max
                */
                getMax(): number | null {
                    return this.__max;
                }

                /**
                 * Sets the value of Max
                 * @param valueNew The new value for Max
                 */
                public setMax(valueNew: number) {
                    //convert the new value
                    let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                    //if converted value is null, get internal default
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("Max");
                    }

                    //save the new value
                    this.__max = convertedValue;

                    //Inform the system that the function has a changed result
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getMax"]);

                    //Process the new Value
                    this.__processValue();
                }

                /**
                * Gets the value of __min
                * @returns The current value of Min
                */
                getMin(): number | null {
                    return this.__min;
                }

                /**
                 * Sets the value of Min
                 * @param valueNew The new value for Min
                 */
                public setMin(valueNew: number) {
                    //convert the new value
                    let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                    //if converted value is null, get internal default
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("Min");
                    }

                    //save the new value
                    this.__min = convertedValue;

                    //Inform the system that the function has a changed result
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getMin"]);

                    //Process the new Value
                    this.__processValue();
                }

                /**
                * Gets the value of __value
                * @returns The current value of Value
                */
                getValue(): number | null {
                    return this.__value;
                }

                /**
                * Sets the value of Value
                * @param valueNew The new value for Value
                */
                public setValue(valueNew: number) {
                    //convert the new value
                    let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                    //if converted value is null, get internal default
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("Value");
                    }

                    //save the new value
                    this.__value = convertedValue;

                    //Inform the system that the function has a changed result
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getValue"]);

                    //Process the new Value
                    this.__processValue();
                }

                /**
                 * Processes the Value.
                 * @function
                 */
                protected __processValue(): void {
                    if (!this.__elementRangeSliderInput)
                        return;

                    //Write Value to HTML-elements attributes
                    this.__elementRangeSliderDiv[0].attributes[1].nodeValue = `--min:${this.__min}; --max:${this.__max}; --step:${this.__step}; --value:${this.__value}; --text-value:"${this.__value}";`;
                    // @ts-ignore
                    this.__elementRangeSliderInput[0].valueAsNumber = this.__value;
                     // @ts-ignore
                    this.__elementRangeSliderInput[0].min = String(this.__min);
                     // @ts-ignore
                    this.__elementRangeSliderInput[0].max = String(this.__max);
                    // @ts-ignore
                    this.__elementRangeSliderInput[0].step = String(this.__step);
                }


                /**
                 * Processes the Slider Change Event.
                 * @function
                 */
                protected __sliderInputChange(e: any, $this: this): void {
                    this.setValue(e.target.value);

                    //raise event
                    TcHmi.EventProvider.raise($this.getId() + '.onSliderInputChanged');
                }
            }
        }
    }
}
/**
* Register Control
*/
TcHmi.Controls.registerEx('TcHmiSimpleRangeSlider', 'TcHmi.Controls.TcHmiSimpleRangeSlider', TcHmi.Controls.TcHmiSimpleRangeSlider.TcHmiSimpleRangeSliderControl);
