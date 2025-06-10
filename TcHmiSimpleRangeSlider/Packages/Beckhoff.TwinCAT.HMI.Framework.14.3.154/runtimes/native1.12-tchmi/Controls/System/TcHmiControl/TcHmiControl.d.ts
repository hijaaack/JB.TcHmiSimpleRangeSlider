declare namespace TcHmi.Controls.System {
    /**
     * Base class for all TwinCAT HMI Controls
     * Check out
     * https://infosys.beckhoff.com/content/1031/te2000_tc3_hmi_engineering/3845361931.html?id=3265481440996758836
     * for an API reference.
     * @preserve (Part of the public API)
     */
    class TcHmiControl extends TcHmi.Controls.System.baseTcHmiControl {
        #private;
        get [globalThis.Symbol.toStringTag](): string;
        /**
         * Constructor of the control
         * @param element Element from HTML (internal, do not use)
         * @param pcElement precompiled Element (internal, do not use)
         * @param attrs Attributes defined in HTML in a special format (internal, do not use)
         * @preserve (Part of the public API)
         */
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /** Add destroy functions to this array to have them automatically called when the control is detached. */
        protected __destroyOnDetach: TcHmi.DestroyFunction[];
        /** Add destroy functions to this array to have them automatically called when the control is destroyed. */
        protected __destroyOnDestroy: TcHmi.DestroyFunction[];
        protected __destroyTriggerAttach: TcHmi.DestroyFunction | null;
        protected __destroyTriggerNonAttach: TcHmi.DestroyFunction | null;
        protected __passThroughEvents: {
            /** The TcHmi event that is fired when the related DOM event is caught. */
            tcHmiEvent: string;
            /** The DOM event that is caught and triggers the TcHmi event. */
            domEvent: keyof HTMLElementEventMap;
            /** Maps the event IDs of registered TcHmiEvents to their destroy functions. */
            destroyers: Map<number, TcHmi.DestroyFunction> | null;
        }[];
        protected __syntheticEvents: {
            /** The TcHmi event that may be fired when the related base event is caught. */
            syntheticEvent: string;
            /** The base event that is caught and may trigger the TcHmi event. */
            baseEvent: string;
            /**
             * The action to execute when the base event is caught. Usually this will fire the synthetic event.
             * @param eventRegistrationData The data object of the event registration callback.
             * @param baseEvent The event object of the base event.
             * @param args The arguments of the base event.
             */
            action: (eventRegistrationData: TcHmi.EventProvider.IEventRegResultObject, baseEvent: TcHmi.EventProvider.Event, ...args: any[]) => void;
            /** Maps the event IDs of registered TcHmiEvents to their destroy functions. */
            destroyers: Map<number, TcHmi.DestroyFunction> | null;
        }[];
        /**
         * Version
         * @preserve (Part of the public API)
         */
        version: TcHmi.Version;
        /**
         * Main HTML Element of the Control as jQuery object.
         */
        protected __element: JQuery;
        /**
         * Precompiled copy of main JQuery element defining this control.
         */
        protected __pcElement: JQuery;
        /**
         * List of attributes defined in html.
         */
        protected readonly __attrs: TcHmi.Controls.ControlAttributeList;
        /**
         * Control Id
         */
        protected __id: string;
        /**
         * Type of the Control
         */
        protected readonly __type: string;
        /**
         *  Row index of the Control inside a TcHmiGrid Container.
         */
        protected __gridRowIndex: number | undefined;
        /**
         *  Column index of the Control inside a TcHmiGrid Container.
         */
        protected __gridColumnIndex: number | undefined;
        private __isEnabled;
        /**
         * Determines if the control is attached to the dom.
         */
        protected __isAttached: boolean;
        private __isInitialized;
        /**
         * Determines if all setters of the control were already called.
         */
        protected __attributesInitialized: boolean;
        /**
         * Determines if the control was already destroyed.
         */
        protected __isDestroyed: boolean;
        /**
         * Determines if the control should not be destroyed.
         */
        protected __keepAlive: boolean;
        /**
         * Parent control or null if there is (till now?) no parent control.
         */
        protected __parent: TcHmi.Controls.System.baseTcHmiControl | null;
        /**
         * Child controls of the control.
         */
        protected readonly __children: TcHmi.Controls.System.baseTcHmiControl[];
        /**
         * True for all ContainerControls
         */
        protected __isContainerControl: boolean;
        /**
         * A list of access rules which is defined in this control.
         * Set in constructor. If no Attribute is set, the processor will be called in __init
         */
        protected __accessConfig: TcHmi.AccessControl[];
        /**
         * A list of virtual control right mappings.
         */
        protected __virtualControlRightMappings: TcHmi.VirtualControlRightMapping[];
        protected __classNames: string[] | undefined;
        /**
         * Map of Symbol.ObjectResolver used in attributes.
         */
        protected __objectResolvers: Map<string, {
            resolver: TcHmi.Symbol.ObjectResolver<object | null>;
            watchCallback: (data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<object | null>) => void;
            watchDestroyer: TcHmi.DestroyFunction | null;
        }>;
        protected __localization: TcHmi.Locale.ControlLocalization;
        /**
         * The elements z-index.
         */
        protected __zindex: number | null | undefined;
        /**
         * The width of the control element.
         */
        protected __width: number | null | undefined;
        /**
         * The width unit of the control element.
         */
        protected __widthUnit: TcHmi.DimensionUnit | undefined;
        /**
         * In normal controls only 'Value' and 'Parent' must be used
         * This base class must hold all possible values for technical reasons.
         */
        protected __widthMode: TcHmi.SizeMode | TcHmi.SizeModeWithContent | undefined;
        /**
         * The height of the control element.
         */
        protected __height: number | null | undefined;
        /**
         * The height unit of the control element.
         */
        protected __heightUnit: TcHmi.DimensionUnit | undefined;
        /**
         * Resolved (content?) height as string, will be set to control.getElement() on __processHeight
         */
        protected __intHeight: string | null;
        /**
         * In normal controls only 'Value' and 'Parent' must be used
         * This base class must hold all possible values for technical reasons.
         */
        protected __heightMode: TcHmi.SizeMode | TcHmi.SizeModeWithContent | undefined;
        /**
         * The top coordinate of the element.
         */
        protected __top: number | null | undefined;
        /**
         * The top unit of the control element.
         */
        protected __topUnit: TcHmi.DimensionUnit | undefined;
        /**
         * The left coordinate of the element.
         */
        protected __left: number | null | undefined;
        /**
         * The left unit of the control element.
         */
        protected __leftUnit: TcHmi.DimensionUnit | undefined;
        /**
         * The bottom coordinate of the element.
         */
        protected __bottom: number | null | undefined;
        /**
         * The bottom unit of the control element.
         */
        protected __bottomUnit: TcHmi.DimensionUnit | undefined;
        /**
         * The right coordinate of the element.
         */
        protected __right: number | null | undefined;
        /**
         * The right unit of the control element.
         */
        protected __rightUnit: TcHmi.DimensionUnit | undefined;
        /**
         * The minimum width of the element.
         */
        protected __minWidth: number | null | undefined;
        /**
         * The minimum width unit of the control element.
         */
        protected __minWidthUnit: TcHmi.DimensionUnit | undefined;
        /**
         * The maximum width of the element.
         */
        protected __maxWidth: number | null | undefined;
        /**
         * The maximum width unit of the control element.
         */
        protected __maxWidthUnit: TcHmi.DimensionUnit | undefined;
        /**
         * The minimum height of the element.
         */
        protected __minHeight: number | null | undefined;
        /**
         * The minimum height unit of the control element.
         */
        protected __minHeightUnit: TcHmi.DimensionUnit | undefined;
        /**
         * The maximum height of the element.
         */
        protected __maxHeight: number | null | undefined;
        /**
         * The maximum height unit of the control element.
         */
        protected __maxHeightUnit: TcHmi.DimensionUnit | undefined;
        /**
         * The elements opacity. The value has to be between 0 (0%) and 1 (100%).
         */
        protected __opacity: number | null | undefined;
        /**
         * The elements visibility.
         */
        protected __visibility: TcHmi.Visibility | undefined;
        /**
         * Transform
         */
        protected __transform: TcHmi.Transform[] | null | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-border-color".
         */
        protected __borderColor: TcHmi.Color | null | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-border-width".
         */
        protected __borderWidth: TcHmi.BorderWidth | null | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-border-radius".
         */
        protected __borderRadius: TcHmi.BorderRadius | null | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-border-style".
         */
        protected __borderStyle: TcHmi.BorderStyle | null | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-box-shadow".
         */
        protected __boxShadow: TcHmi.BoxShadow[] | null | undefined;
        /**
         *  Trigger
         */
        protected __trigger: TcHmi.Trigger[] | null | undefined;
        /**
         *  Trigger which are active even when detached (only own onInitialized and onDestroyed)
         */
        protected __triggerNonAttachList: TcHmi.Trigger[];
        /**
         *  Trigger which are active only when attached
         */
        protected __triggerAttachList: TcHmi.Trigger[];
        /**
         * Internal reference to the attribute "data-tchmi-tooltip".
         */
        protected __tooltip: string | null | undefined;
        /**
         * Internal object to store the values of the various background attributes.
         */
        protected __background: Partial<TcHmi.Background>;
        private __accessAndEnableState;
        private static __asyncWorkAnimationFrameId;
        private static __asyncWorkControls;
        protected __asyncWorkData: TcHmiControl.IControlSpecificData;
        /**
         * Rendered size cache.
         */
        protected readonly __renderedSizeCache: {
            /** Cached result of getComputedStyle of the control main element. */
            left: number | null;
            /** Cached result of getComputedStyle of the control main element. */
            top: number | null;
            /** Cached result of getComputedStyle of the control main element. */
            right: number | null;
            /** Cached result of getComputedStyle of the control main element. */
            bottom: number | null;
            /** Cached result of getComputedStyle of the control main element. */
            width: number | null;
            /** Cached result of getComputedStyle of the control main element. */
            height: number | null;
            /** The number of pixels of the control as resulted from its getBoundingClientRect. */
            viewportLeft: number | null;
            /** The number of pixels of the control as resulted from its getBoundingClientRect. */
            viewportTop: number | null;
        };
        /**
         * Control will be detached in the near future.
         */
        protected __isDetaching: boolean;
        __setLifeCycleState(doNotCallThisApi: number): void;
        /**
         * Current life cycle states
         */
        getLifeCycleState(): {
            initialized: boolean;
            attached: boolean;
            /** Detach in progress (in region switching for example) */
            detaching: boolean;
            destroyed: boolean;
        };
        /**
         * Get all children controls.
         * Only readable access to them is good practice for most parent controls.
         */
        getChildren(): TcHmi.Controls.System.baseTcHmiControl[];
        /**
         * Is raised before control attribute setters are called to allow initialization based on current attribute values.
         * @preserve (Part of the public API)
         */
        __previnit(): void;
        /**
         * Is raised after control attribute setters have been called to allow initialization based on current attribute values.
         * @preserve (Part of the public API)
         */
        __init(): void;
        /**
         * Is called of control is attached to the dom.
         * @preserve (Part of the public API)
         */
        __attach(): void;
        /**
         * Is called if control is detached from the dom.
         * @preserve (Part of the public API)
         */
        __detach(): void;
        /**
         * Destroy the current control instance.
         * Will be called automatically if system destroys control!
         * @preserve (Part of the public API)
         */
        destroy(): void;
        /**
         * Suspned ObjectResolver by key
         * @param key
         */
        protected __suspendObjectResolver(key: string): void;
        /**
         * Returns the configured defaultInternalValue of the control property
         * @param propertyName
         * @template T Type of the default value
         * @preserve (Part of the public API)
         */
        protected getAttributeDefaultValueInternal<T = any>(propertyName: string): T | null;
        /**
         * To keep compatibility with the legacy [Control].onFunctionResultChanged event all raised [Control].onFunctionResultChanged events without property 'noLegacyForwarding' set to true
         * will be forwarded to [Control].onPropertyChanged and [Control].onPropertyChanged<[PropertyName]>
         */
        /**
         * Is raised if the <Control>.onFunctionResultChanged event is raised.
         * @param event
         */
        protected __onFunctionResultChanged(_event: TcHmi.EventProvider.Event, data: string[], dataEx?: {
            propertyName: string;
            noLegacyForwarding?: boolean;
            dirtyPaths?: string[];
        }[]): void;
        /**
         * Is raised if the <Control>.onPropertyChanged event is raised.
         * @param event
         */
        protected __onPropertyChanged(_event: TcHmi.EventProvider.Event, data: {
            propertyName: string;
            noLegacyForwarding?: boolean;
            dirtyPaths?: string[];
        }): void;
        /**
         * Control Id
         * @preserve (Part of the public API)
         */
        getId(): string;
        /**
         * Type of the control
         * @preserve (Part of the public API)
         */
        getType(): string;
        /**
         * Main HTML Element of the Control as jQuery object.
         * @preserve (Part of the public API)
         */
        getElement(): JQuery<HTMLElement>;
        /**
         * Precompiled copy of main JQuery element defining this control.
         * @preserve (Part of the public API)
         */
        getPcElement(): JQuery;
        /**
         * Set __pcElement (with cleaned prevObj jQuery Stack)
         * @param value
         */
        __setPcElement(value: JQuery): void;
        /**
         * List of attributes defined in html.
         * @preserve (Part of the public API)
         */
        getAttrs(): TcHmi.Controls.ControlAttributeList;
        /**
         * Returns a boolean determining if the control was already destroyed.
         * @preserve (Part of the public API)
         */
        getIsDestroyed(): boolean;
        /**
         * List of classes of the control.
         * @preserve (Part of the public API)
         */
        getClassNames(): string[] | undefined;
        /**
         * Defines the classes the control is part of.
         * @param valueNew
         */
        setClassNames(valueNew: string[] | null): void;
        /**
         * The watch callback for the classNames object resolver.
         */
        protected __onResolverForClassNamesWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<string[]>): void;
        /**
         * Process classes.
         */
        __processClassNames(): void;
        /**
         * AccessConfig
         * @preserve (Part of the public API)
         */
        getAccessConfig(): TcHmi.AccessControl[];
        /**
         * Sets the new AccessConfig
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setAccessConfig(valueNew: TcHmi.AccessControl[] | null): void;
        /**
         * The watch callback for the accessConfig object resolver.
         */
        protected __onResolverForAccessConfigWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.AccessControl[]>): void;
        /**
         * Shows/hides the control and its children depending of the current 'observe' right and mark if operate is not allowed
         */
        __processAccessConfig(): void;
        /**
         * Sets the value of the trigger attribute.
         */
        setTrigger(valueNew: TcHmi.Trigger[] | null): void;
        /**
         * Returns the current trigger value.
         */
        getTrigger(): TcHmi.Trigger[] | null | undefined;
        /**
         * Processes the current trigger value.
         */
        protected __processTrigger(): void;
        /**
         * Returns the VirtualControlRightMapping so it can react on parent control virtual rights.
         * @preserve (Part of the public API)
         */
        getVirtualControlRightMappings(): TcHmi.VirtualControlRightMapping[];
        /**
         * Sets the new VirtualControlRightMapping so it can react on parent control virtual rights.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setVirtualControlRightMappings(valueNew: TcHmi.VirtualControlRightMapping[] | null): void;
        /**
         * The watch callback for the virtualControlRightMappings object resolver.
         */
        protected __onResolverForVirtualControlRightMappingsWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.VirtualControlRightMapping[]>): void;
        /**
         * Reprocesses the access config
         */
        protected __processVirtualControlRightMappings(): void;
        /**
         * Returns the effective value of isEnabled based on own and parent isEnabled variable.
         */
        getIsEnabled(): boolean;
        /**
         * Sets the isEnabled attribute and calls the associated process function (processIsEnabled).
         * @preserve (Part of the public API)
         */
        setIsEnabled(valueNew: boolean | null): void;
        /**
         * Processes and publish the current isEnabled attribute value and of its children.
         */
        __processIsEnabled(): void;
        /**
         * Returns the Row index of the Control inside a TcHmiGrid Container.
         * @preserve (Part of the public API)
         */
        getGridRowIndex(): number | undefined;
        /**
         * Sets a new GridRow index
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setGridRowIndex(valueNew: number | null): void;
        /**
         * Process GridRowIndex (no op in this base class)
         */
        protected __processGridRowIndex(): void;
        /**
         * Returns the Column index of the Control inside a TcHmiGrid Container.
         * @preserve (Part of the public API)
         */
        getGridColumnIndex(): number | undefined;
        /**
         * Sets a new GridColumn index
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setGridColumnIndex(valueNew: number | null): void;
        /**
         * Process GridColumnIndex (no op in this base class)
         */
        protected __processGridColumnIndex(): void;
        /**
         * Returns a boolean determining if the control is initialized.
         * @preserve (Part of the public API)
         */
        getIsInitialized(): boolean;
        /**
         * Returns a boolean determining if the control is attached to the dom.
         * @preserve (Part of the public API)
         */
        getIsAttached(): boolean;
        /**
         * Returns a boolean determining if the control should not be destroyed.
         * @preserve (Part of the public API)
         */
        getKeepAlive(): boolean;
        /**
         * Sets __keepAlive
         * @param value
         */
        __setKeepAlive(value: boolean): void;
        /**
         * Gets __keepAlive
         * @param value
         */
        __getKeepAlive(): boolean;
        /**
         * Returns a boolean determining if the control is a container control.
         * @preserve (Part of the public API)
         */
        getIsContainerControl(): boolean;
        /**
         * Parent control or null if there is (till now?) no parent control.
         * @preserve (Part of the public API)
         */
        getParent(): TcHmi.Controls.System.baseTcHmiControl | null;
        /**
         * Sets __parent
         * @param value
         */
        __setParent(value: TcHmi.Controls.System.baseTcHmiControl | null): void;
        /**
         * Adds a child to this control and handles the hierarchical management layer.
         * This base class does not append child's DOM element to the container DOM!
         * @param control Class instance of the child.
         * @param pos Optional index of the position for the new child.
         */
        __addChild(control: TcHmi.Controls.System.baseTcHmiControl, pos?: number | null): void;
        /**
         * Remove a child from a control.
         * @param control
         */
        __removeChild(control: TcHmi.Controls.System.baseTcHmiControl): void;
        /**
         * Returns the current width of the Control.
         * @preserve (Part of the public API)
         */
        getWidth(): number | null | undefined;
        /**
         * Returns the current width unit of the Control.
         * @preserve (Part of the public API)
         */
        getWidthUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current width mode of the control.
         * @preserve (Part of the public API)
         */
        getWidthMode(): "Value" | "Parent" | "Content" | undefined;
        /**
         * Returns if inner widths depends on child controls.
         * @preserve (Part of the public API)
         */
        innerWidthDependsOnChilds(): boolean;
        /**
         * Updates the inner dimension depending on child controls.
         * @preserve (Part of the public API)
         */
        updateInnerWidthDependingOnChilds(): void;
        /**
         * Returns the current height of the Control.
         * @preserve (Part of the public API)
         */
        getHeight(): number | null | undefined;
        /**
         * Returns the current height mode of the control.
         * @preserve (Part of the public API)
         */
        getHeightMode(): "Value" | "Parent" | "Content" | undefined;
        /**
         * Returns if inner heights depends on child controls.
         * @preserve (Part of the public API)
         */
        innerHeightDependsOnChilds(): boolean;
        /**
         * Updates the inner dimension depending on child controls.
         * @preserve (Part of the public API)
         */
        updateInnerHeightDependingOnChilds(): void;
        /**
         * Returns the current height unit of the Control.
         */
        getHeightUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current top coordinate of the Control.
         * @preserve (Part of the public API)
         */
        getTop(): number | null | undefined;
        /**
         * Returns the current top coordinate unit of the Control.
         * @preserve (Part of the public API)
         */
        getTopUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current left coordinate of the Control.
         * @preserve (Part of the public API)
         */
        getLeft(): number | null | undefined;
        /**
         * Returns the current left coordinate unit of the Control.
         * @preserve (Part of the public API)
         */
        getLeftUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current bottom coordinate of the Control.
         * @preserve (Part of the public API)
         */
        getBottom(): number | null | undefined;
        /**
         * Returns the current bottom coordinate unit of the Control.
         * @preserve (Part of the public API)
         */
        getBottomUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current right coordinate of the Control.
         * @preserve (Part of the public API)
         */
        getRight(): number | null | undefined;
        /**
         * Returns the current right coordinate unit of the Control.
         * @preserve (Part of the public API)
         */
        getRightUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current minwidth value.
         * @preserve (Part of the public API)
         */
        getMinWidth(): number | null | undefined;
        /**
         * Returns the current minwidth unit.
         * @preserve (Part of the public API)
         */
        getMinWidthUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current minheight value.
         * @preserve (Part of the public API)
         */
        getMinHeight(): number | null | undefined;
        /**
         * Returns the current minheight unit.
         * @preserve (Part of the public API)
         */
        getMinHeightUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current maxwidth value.
         * @preserve (Part of the public API)
         */
        getMaxWidth(): number | null | undefined;
        /**
         * Returns the current maxwidth unit.
         * @preserve (Part of the public API)
         */
        getMaxWidthUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current maxheight value.
         * @preserve (Part of the public API)
         */
        getMaxHeight(): number | null | undefined;
        /**
         * Returns the current maxheight unit.
         * @preserve (Part of the public API)
         */
        getMaxHeightUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Returns the current rendered left value in pixel. Value is relative to parent element.
         * @preserve (Part of the public API)
         */
        getRenderedLeft(): number | null;
        /**
         * Returns the current rendered top value in pixel. Value is relative to parent element.
         * @preserve (Part of the public API)
         */
        getRenderedTop(): number | null;
        /**
         * Returns the current rendered right value in pixel. Value is relative to parent element.
         * @preserve (Part of the public API)
         */
        getRenderedRight(): number | null;
        /**
         * Returns the current rendered bottom value in pixel. Value is relative to parent element.
         * @preserve (Part of the public API)
         */
        getRenderedBottom(): number | null;
        /**
         * Returns the current rendered width value in pixel.
         * @preserve (Part of the public API)
         */
        getRenderedWidth(): number | null;
        /**
         * Returns the current rendered height value in pixel.
         * @preserve (Part of the public API)
         */
        getRenderedHeight(): number | null;
        __injectRenderedDimensions(doNotCallThisApi: object): void;
        /**
         * Checks computed style of the main element for some css attributes.
         * Updates the cache and raises onFunctionResultChanged of corresponding getters.
         * @param timestamp Timestamp indicating the point in time when requestAnimationFrame() starts to execute callback functions.
         */
        protected __doAsyncWork(timestamp?: number): void;
        /**
         * The control has to do some work to do in the next animation frame
         */
        protected __requestAsyncWork(): void;
        /**
         * Sets the value of the width attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setWidth(valueNew: number | null): void;
        /**
         * Processes the current width and width unit and trigger __processWidth in parent of this is Content sized.
         */
        __processWidth(callerControl?: TcHmiControl): void;
        /**
         * Sets the unit of the width attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setWidthUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current width and width unit.
         */
        protected __processWidthUnit(): void;
        /**
         * Sets the value of the width mode attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setWidthMode(valueNew: TcHmi.SizeMode | null): void;
        /**
         * Processes the current width and width unit.
         */
        protected __processWidthMode(): void;
        /**
         * Sets the value of the height attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setHeight(valueNew: number | null): void;
        /**
         * Processes the current height and height unit and trigger __processHeight in parent of this is Content sized.
         * Adds fake height without height and only top/bottom definition
         */
        __processHeight(callerControl?: TcHmiControl): void;
        /**
         * Sets the value of the height mode attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setHeightMode(valueNew: TcHmi.SizeMode | null): void;
        /**
         * Processes the current height and height unit.
         */
        protected __processHeightMode(): void;
        /**
         * Sets the unit of the height attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setHeightUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current height and height unit
         */
        protected __processHeightUnit(): void;
        __getContentWidth(): number | null;
        __getContentHeight(): number | null;
        /**
         * Sets the value of the top attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setTop(valueNew: number | null): void;
        /**
         * Processes the current top and top unit
         */
        protected __processTop(): void;
        /**
         * Sets the unit of the top attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setTopUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current top and top unit
         */
        protected __processTopUnit(): void;
        /**
         * Sets the value of the left attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setLeft(valueNew: number | null): void;
        /**
         * Processes the current left and left unit value.
         */
        protected __processLeft(): void;
        /**
         * Sets the unit of the left attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setLeftUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current left and left unit value.
         */
        protected __processLeftUnit(): void;
        /**
         * Sets the value of the bottom attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBottom(valueNew: number | null): void;
        /**
         * Processes the current bottom and bottom unit value.
         */
        protected __processBottom(): void;
        /**
         * Sets the unit of the bottom attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBottomUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current bottom and bottom unit value.
         */
        protected __processBottomUnit(): void;
        /**
         * Sets the value of the right attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setRight(valueNew: number | null): void;
        /**
         * Processes the current right and right unit value.
         */
        protected __processRight(): void;
        /**
         * Sets the unit of the right attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setRightUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current right and right unit value.
         */
        protected __processRightUnit(): void;
        /**
         * Sets the value of the minwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setMinWidth(valueNew: number | null): void;
        /**
         * Processes the current minwidth and minwidth unit.
         */
        protected __processMinWidth(): void;
        /**
         * Sets the unit of the minwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setMinWidthUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current width and width unit.
         */
        protected __processMinWidthUnit(): void;
        /**
         * Sets the value of the minheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setMinHeight(valueNew: number | null): void;
        /**
         * Processes the current minheight and minheight unit.
         */
        protected __processMinHeight(): void;
        /**
         * Sets the unit of the minheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setMinHeightUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current height and height unit.
         */
        protected __processMinHeightUnit(): void;
        /**
         * Sets the value of the maxwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setMaxWidth(valueNew: number | null): void;
        /**
         * Processes the current maxwidth and maxwidth unit.
         */
        protected __processMaxWidth(): void;
        /**
         * Sets the unit of the maxwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setMaxWidthUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current width and width unit.
         */
        protected __processMaxWidthUnit(): void;
        /**
         * Sets the value of the maxheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setMaxHeight(valueNew: number | null): void;
        /**
         * Processes the current maxheight and maxheight unit.
         */
        protected __processMaxHeight(): void;
        /**
         * Sets the unit of the maxheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setMaxHeightUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current height and height unit.
         */
        protected __processMaxHeightUnit(): void;
        /**
         * Returns the current zindex value.
         */
        getZindex(): number | null | undefined;
        /**
         * Sets the value of the zindex attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setZindex(valueNew: number | null): void;
        /**
         * Processes the current zindex value.
         */
        protected __processZindex(): void;
        /**
         * Returns the current opacity value.
         * Sets the value of the zindex attribute.
         * @preserve (Part of the public API)
         */
        getOpacity(): number | null | undefined;
        /**
         * Sets the value of the opacity attribute. The value must be between 0 (0%) and 1 (100%).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setOpacity(valueNew: number | null): void;
        /**
         * Processes the current opacity value.
         */
        protected __processOpacity(): void;
        /**
         * Sets the value of the visibility attribute.
         */
        setVisibility(valueNew: TcHmi.Visibility | null): void;
        /**
         * Returns the current visibility value.
         */
        getVisibility(): TcHmi.Visibility | undefined;
        /**
         * Processes the current visibility value.
         */
        protected __processVisibility(): void;
        /**
         * Returns the current transform value.
         * @preserve (Part of the public API)
         */
        getTransform(): TcHmi.Transform[] | null | undefined;
        /**
         * Sets the value of the transform attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setTransform(valueNew: TcHmi.Transform[] | null): void;
        /**
         * The watch callback for the transform object resolver.
         */
        protected __onResolverForTransformWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.Transform[]>): void;
        /**
         * Processes the current transform value.
         */
        protected __processTransform(): void;
        /**
         * Processes the current background attributes.
         */
        protected __processAllBackground(): void;
        /**
         * Returns the current background value.
         * @preserve (Part of the public API)
         */
        getBackgroundColor(): TcHmi.Color | null | undefined;
        /**
         * Sets the background value and calls the associated process function (processBackground).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBackgroundColor(valueNew: TcHmi.Color | null): void;
        /**
         * The watch callback for the backgroundColor object resolver.
         */
        protected __onResolverForBackgroundColorWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.Color>): void;
        /**
         * Processes the current background-color attribute.
         */
        protected __processBackgroundColor(): void;
        /**
         * Returns the current value of the member variable backgroundImage.
         * @preserve (Part of the public API)
         */
        getBackgroundImage(): string | null | undefined;
        /**
         * Sets the value of the member variable "backgroundImage" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImage) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBackgroundImage(valueNew: string | null): void;
        /**
         * Processes the current value of backgroundImage and forwards it to the target html container element.
         */
        protected __processBackgroundImage(): void;
        /**
         * Returns the current value of the member variable backgroundImagePadding.
         * @preserve (Part of the public API)
         */
        getBackgroundImagePadding(): TcHmi.FourSidedCss | null | undefined;
        /**
         * Sets the value of the member variable "backgroundImagePadding" if the new value is not equal to the current value
         * and calls the associated process function (processBackgroundImagePadding) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBackgroundImagePadding(valueNew: TcHmi.FourSidedCss | null): void;
        /**
         * The watch callback for the backgroundImagePadding object resolver.
         */
        protected __onResolverForBackgroundImagePaddingWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.FourSidedCss>): void;
        /**
         * Processes the current value of backgroundImagePadding and forwards it to the target span element in template html.
         * The current value of backgroundImagePadding is only forwarded if it is no binding expression.
         */
        protected __processBackgroundImagePadding(): void;
        /**
         * Returns the current value of the member variable backgroundImageWidth.
         * @preserve (Part of the public API)
         */
        getBackgroundImageWidth(): number | null | undefined;
        /**
         * Sets the value of the member variable "backgroundImageWidth" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageWidth) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBackgroundImageWidth(valueNew: number | null): void;
        /**
         * Processes the current value of backgroundImageWidth and forwards it to the target html container element.
         */
        protected __processBackgroundImageWidth(): void;
        /**
         * Returns the current value of the member variable backgroundImageWidthUnit.
         * @preserve (Part of the public API)
         */
        getBackgroundImageWidthUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Sets the value of the member variable "backgroundImageWidthUnit" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageWidthUnit) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBackgroundImageWidthUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current value of backgroundImageWidth and backgroundImageWidth unit and forwards it to the target html container element.
         */
        protected __processBackgroundImageWidthUnit(): void;
        /**
         * Returns the current value of the member variable backgroundImageHeight.
         * @preserve (Part of the public API)
         */
        getBackgroundImageHeight(): number | null | undefined;
        /**
         * Sets the value of the member variable "backgroundImageHeight" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageHeight) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBackgroundImageHeight(valueNew: number | null): void;
        /**
         * Processes the current value of backgroundImageHeight and forwards it to the target html container element.
         */
        protected __processBackgroundImageHeight(): void;
        /**
         * Returns the current value of the member variable backgroundImageHeightUnit.
         * @preserve (Part of the public API)
         */
        getBackgroundImageHeightUnit(): TcHmi.DimensionUnit | undefined;
        /**
         * Sets the value of the member variable "backgroundImageHeightUnit" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageHeightUnit) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBackgroundImageHeightUnit(valueNew: TcHmi.DimensionUnit | null): void;
        /**
         * Processes the current value of backgroundImageHeight and forwards it to the target html container element.
         */
        protected __processBackgroundImageHeightUnit(): void;
        /**
         * Returns the current value of horizontalBackgroundImageAligment.
         * @preserve (Part of the public API)
         */
        getBackgroundImageHorizontalAlignment(): TcHmi.HorizontalAlignment | undefined;
        /**
         * Sets the backgroundImageHorizontalAlignment value and calls the associated process function (processBackgroundImageHorizontalAlignment).
         * @preserve (Part of the public API)
         */
        setBackgroundImageHorizontalAlignment(valueNew: TcHmi.HorizontalAlignment | null): void;
        /**
         * Processes the current backgroundImageHorizontalAlignment attribute value.
         */
        protected __processBackgroundImageHorizontalAlignment(): void;
        /**
         * Returns the current value of backgroundImageVerticalAlignment.
         * @preserve (Part of the public API)
         */
        getBackgroundImageVerticalAlignment(): TcHmi.VerticalAlignment | undefined;
        /**
         * Sets the backgroundImageVerticalAlignment value and calls the associated process function (processBackgroundImageVerticalAlignment).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBackgroundImageVerticalAlignment(valueNew: TcHmi.VerticalAlignment | null): void;
        /**
         * Processes the current backgroundImageVerticalAlignment attribute value.
         */
        protected __processBackgroundImageVerticalAlignment(): void;
        /**
         * Returns the current border-color value.
         * @preserve (Part of the public API)
         */
        getBorderColor(): TcHmi.Color | null | undefined;
        /**
         * Sets the border-color attribute value and calls the associated process function (processBorderColor).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBorderColor(valueNew: TcHmi.Color | null): void;
        /**
         * The watch callback for the borderColor object resolver.
         */
        protected __onResolverForBorderColorWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.Color>): void;
        /**
         * Processes the current border-color attribute.
         */
        protected __processBorderColor(): void;
        /**
         * Returns the current border-width value.
         * @preserve (Part of the public API)
         */
        getBorderWidth(): TcHmi.PixelFourSidedCss | null | undefined;
        /**
         * Sets the border-width attribute value and calls the associated process function (processBorderWidth).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBorderWidth(valueNew: TcHmi.BorderWidth | null): void;
        /**
         * The watch callback for the borderWidth object resolver.
         */
        protected __onResolverForBorderWidthWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.BorderWidth>): void;
        /**
         * Processes the current border-width attribute.
         */
        protected __processBorderWidth(): void;
        /**
         * Returns the current border-radius value.
         * @preserve (Part of the public API)
         */
        getBorderRadius(): TcHmi.BorderRadius | null | undefined;
        /**
         * Sets the border-radius attribute value and calls the associated process function (processBorderRadius).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBorderRadius(valueNew: TcHmi.BorderRadius | null): void;
        /**
         * The watch callback for the borderRadius object resolver.
         */
        protected __onResolverForBorderRadiusWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.BorderRadius>): void;
        /**
         * Processes the current border-radius attribute.
         */
        protected __processBorderRadius(): void;
        /**
         * Returns the current border-style value.
         * @preserve (Part of the public API)
         */
        getBorderStyle(): TcHmi.BorderStyle | null | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-border-type".
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setBorderStyle(valueNew: TcHmi.BorderStyle | null): void;
        /**
         * The watch callback for the borderStyle object resolver.
         */
        protected __onResolverForBorderStyleWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.BorderStyle>): void;
        /**
         * Processes the current border-style attribute.
         */
        protected __processBorderStyle(): void;
        /**
         * Sets the internal reference to the attribute "data-tchmi-box-shadow".
         * @preserve (Part of the public API)
         */
        setBoxShadow(valueNew: TcHmi.BoxShadow[] | null): void;
        /**
         * The watch callback for the boxShadow object resolver.
         */
        protected __onResolverForBoxShadowWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmi.BoxShadow[]>): void;
        /**
         * Returns the current box-shadow value.
         * @preserve (Part of the public API)
         */
        getBoxShadow(): TcHmi.BoxShadow[] | null | undefined;
        /**
         * Processes the current box-shadow attribute.
         */
        protected __processBoxShadow(): void;
        /**
         * Returns the current value of tooltip.
         * @preserve (Part of the public API)
         */
        getTooltip(): string | null | undefined;
        /**
         * Sets the tooltip attribute and calls the associated process function (processTooltip).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        setTooltip(valueNew: string | null): void;
        /**
         * Processes the current tooltip attribute value.
         */
        protected __processTooltip(): void;
    }
    namespace TcHmiControl {
        interface IDomEventObjCacheEntry {
            event: TcHmi.EventProvider.IEventEntry;
            domEventListener: TcHmiControl.IDomEventObj;
        }
        interface IDomEventObj {
            eventName: keyof HTMLElementEventMap;
            listener: EventListener | EventListenerObject;
            options: EventListenerOptions | boolean;
        }
        interface IControlSpecificData {
            'System.TcHmiControl.layoutData': object;
        }
    }
}