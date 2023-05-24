declare module TcHmi.Controls.Beckhoff {
    class TcHmiLineChart extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /** Linechart element' */
        protected __lineChart: TcHmiCharting.LineChart | null;
        /** member variables */
        /** Reference to the root dom element of the current control template as  jquery object. */
        protected __elementTemplateRoot: JQuery;
        /** Reference to the div element used as chart container as jquery object. */
        protected __elementChart: JQuery;
        /** Reference to the div element used as tooltip as jquery object. */
        protected __elementTooltip: JQuery;
        /** Reference to the div element used as tooltip as jquery object. */
        protected __elementTooltipText: JQuery;
        /** Reference to the div element used as tooltip arrow as jquery object. */
        protected __elementTooltipArrow: JQuery;
        /** Reference to the div element used as legend as jquery object. */
        protected __elementLegend: JQuery;
        /** Internal reference to the attribute 'data-tchmi-y-axis-width' */
        protected __sectionsBackgroundColor: TcHmi.Color | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-y-axis-width' */
        protected __yAxisWidth: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-y-label-font-family' */
        protected __yLabelFontFamily: FontFamily | undefined;
        /** Internal reference to the attribute 'data-tchmi-y-label-font-size' */
        protected __yLabelFontSize: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-y-label-font-weight' */
        protected __yLabelFontWeight: FontWeight | undefined;
        /** Internal reference to the attribute 'data-tchmi-y-main-tick-steps' */
        protected __yMainTickSteps: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-show-y-sub-ticks' */
        protected __showYSubTicks: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-y-sub-tick-steps' */
        protected __ySubTickSteps: number | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-show-x-axis' */
        protected __showXAxis: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-logarithmic-scale' */
        protected __xLogarithmicScale: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-labeling' */
        protected __xAxisLabeling: string | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-show-labels' */
        protected __xShowLabels: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-main-tick-start-value' */
        protected __xMainTickMinValue: number | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-main-tick-max-width' */
        protected __xMainTickMaxValue: number | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-main-tick-steps' */
        protected __xMainTickSteps: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-show-x-sub-ticks' */
        protected __showXSubTicks: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-sub-tick-steps' */
        protected __xSubTickSteps: number | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-label-font-family' */
        protected __xLabelFontFamily: FontFamily | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-label-font-size' */
        protected __xLabelFontSize: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-label-font-weight'  */
        protected __xLabelFontWeight: FontWeight | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-label-font-color' */
        protected __xLabelFontColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-width' */
        protected __xAxisWidth: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-color' */
        protected __xAxisColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-show-x-axis-name' */
        protected __showXAxisName: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-name' */
        protected __xAxisName: string | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-font-family' */
        protected __xAxisNameFontFamily: FontFamily | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-font-size' */
        protected __xAxisNameFontSize: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-font-weight' */
        protected __xAxisNameFontWeight: FontWeight | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-font-color' */
        protected __xAxisNameFontColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-decimal-places' */
        protected __xAxisDecimalPlaces: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-unit' */
        protected __xAxisUnit: string | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-x-axis-auto-scaling' */
        protected __xAxisAutoScaling: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-value-format' */
        protected __xAxisFormat: TcHmi.IFunction | null | undefined;
        /**  Internal reference to the attribute 'data-tchmi-y-axis'  */
        protected __yAxis: TcHmiLineChart.YAxis[] | null | undefined;
        /**  Internal reference to the attribute 'data-tchmi-line-graph-descriptions'
         */
        protected __lineGraphDescriptions: TcHmiLineChart.lineGraphDescription[] | null | undefined;
        /** Only barGraphDescriptions that have been selected from __lineGraphDescriptions as an array of TcHmiLineChart.lineGraphDescription or null */
        protected __lineGraphDescriptionsSelected: TcHmiLineChart.lineGraphDescription[] | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-reference-lines' */
        protected __referenceLines: TcHmiLineChart.ReferenceLine[] | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-reference-lines-position' */
        protected __referenceLinesPosition: string | undefined;
        /**  Internal reference to the attribute 'data-tchmi-line-graph-data' */
        protected __lineGraphData: TcHmiLineChart.Point[][] | number[][] | number[] | null | undefined;
        /** Only lineGraphData that have been selected from __barGraphData as an array of arrays with numbers or null */
        protected __lineGraphDataSelected: TcHmiLineChart.Point[][] | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-show-grid' */
        protected __showGrid: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-grid-background-color' */
        protected __gridBackgroundColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-grid-show-horizontal-lines' */
        protected __gridShowHorizontalLines: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-grid-show-vertical-lines' */
        protected __gridShowVerticalLines: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-grid-line-width' */
        protected __gridLineWidth: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-grid-line-style' */
        protected __gridLineStyle: string | undefined;
        /** Internal reference to the attribute 'data-tchmi-grid-line-color' */
        protected __gridLineColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-subgrid-show-horizontal-lines' */
        protected __subgridShowHorizontalLines: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-subgrid-show-vertical-lines' */
        protected __subgridShowVerticalLines: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-subgrid-line-width' */
        protected __subgridLineWidth: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-subgrid-line-style' */
        protected __subgridLineStyle: string | undefined;
        /** Internal reference to the attribute 'data-tchmi-subgrid-line-color' */
        protected __subgridLineColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-show-tooltip' */
        protected __showTooltip: boolean | undefined;
        /** Internal reference to the attribute 'data-tchmi-tooltip-format' */
        protected __tooltipFormat: TcHmi.IFunction | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-tooltip-font-family' */
        protected __tooltipFontFamily: FontFamily | undefined;
        /** Internal reference to the attribute 'data-tchmi-tooltip-font-size' */
        protected __tooltipFontSize: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-tooltip-font-weight' */
        protected __tooltipFontWeight: FontWeight | undefined;
        /** Internal reference to the attribute 'data-tchmi-tooltip-font-color' */
        protected __tooltipFontColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-tooltip-background-color' */
        protected __tooltipBackgroundColor: TcHmi.Color | null | undefined;
        /** Internal reference to the attribute 'data-tchmi-legend-font-family' */
        protected __legendFontFamily: FontFamily | undefined;
        /** Internal reference to the attribute 'data-tchmi-legend-font-size' */
        protected __legendFontSize: number | undefined;
        /** Internal reference to the attribute 'data-tchmi-legend-font-style' */
        protected __legendFontStyle: FontStyle | undefined;
        /** Internal reference to the attribute 'data-tchmi-legend-font-weight' */
        protected __legendFontWeight: FontWeight | undefined;
        /** Internal variable for legend */
        protected __showLegend: boolean | undefined;
        /**  Internal lineGraph array as TcHmiLineChart.Point[][] */
        protected __lineGraphArray: TcHmiLineChart.Point[][] | null;
        /** Internal tooltip information */
        protected __tooltipInformation: {
            show: boolean;
            isActive: boolean;
            lineGraph: null | TcHmiCharting.LineGraph;
            point: {
                x: number;
                y: number;
            };
        };
        /** Event destroyer... */
        private __resizedEventDestroyEvent;
        protected __themeDataLoadedEventDestroyEvent: DestroyFunction | null;
        /** Event handlers */
        protected __mousemoveHandler: (event: MouseEvent) => void;
        protected __mousedownHandler: (event: MouseEvent) => void;
        protected __touchstartHandler: (event: TouchEvent) => void;
        protected __touchmoveHandler: (event: TouchEvent) => void;
        protected __touchendHandler: (event: TouchEvent) => void;
        /** Touch and hold timer */
        protected __holdTimer: number;
        protected __holdTimerDuration: number;
        protected __manipulationInfo: {
            mousePosition: {
                x: number;
                y: number;
            };
            offset: {
                left: number;
                top: number;
            };
        };
        protected __storage: LocalStorage<{
            activeLegendElements: number[];
        }, {
            activeLegendElements: number;
        }> | undefined;
        protected __activeLegendElements: number[] | undefined;
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
         * Is raised if the control are resized.
         */
        protected __rebuild(): (evt: EventProvider.Event, ctrl: Controls.System.TcHmiControl) => void;
        /**
         * Is called initial and and if size changed.
         */
        __drawLineChart(): void;
        /**
         * Created legend
         */
        __createLegend(useOldElements?: boolean): void;
        /**
         * Returns the current value of the member variable legend.
         */
        protected getCurrentGraphLength(): number;
        /**
         * Is raised if mouseDown on legend.
         * @param e The event of mouseDown.
         */
        protected __onCheckboxMouseDown: (event: MouseEvent) => void;
        /**
         * Is raised if touchstart on legend.
         * @param e The event of touchstart.
         */
        protected __onCheckboxTouchStart: (event: TouchEvent) => void;
        /**
         * Is raised if mouseDown on canvasDrawing.
         * @param e - The event of mouseDown.
         */
        protected __onMouseDown(): (e: MouseEvent) => void;
        /**
         * Is raised if mouseMove on canvasDrawing.
         * @param e - The event of mouseMove.
         */
        protected __onMouseMoveTooltip(): (e: MouseEvent) => void;
        /**
         * Make the tooltip invisible.
         */
        private __invisibleTooltip;
        /**
         * Is raised if touchStart on canvasDrawing.
         * @param e - The event of touchStart.
         */
        protected __onTouchStart(): (e: TouchEvent) => void;
        /**
         * Is raised if touchMove on document.
         * @param e - The event of touchMove.
         */
        protected __onTouchMove(): (e: TouchEvent) => void;
        /**
         * Is raised if touchEnd on document.
         * @param e - The event of touchEnd.
         */
        protected __onTouchEnd(): (e: TouchEvent) => void;
        /**
         * Create a tooltip if the offsetX and offsetY value is on a point.
         * @param offsetX The x coordinate of the mouse or touch.
         * @param offsetY The y coordinate of the mouse or touch.
         */
        protected __createTooltipFromTouch(offsetX: number, offsetY: number): void;
        /**
         * Sets the background value and calls the associated process function.
         * @param valueNew The new value for the background attribute as object.
         */
        setSectionsBackgroundColor(valueNew: Color | null): void;
        /**
         * The watch callback for the sectionsBackgroundColor object resolver.
         */
        protected __onResolverForSectionsBackgroundColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Color>) => void;
        /**
         * Returns the current background value.
         * @returns The current value of the background member variable as json in string format.
         */
        getSectionsBackgroundColor(): Color | null | undefined;
        /**
         * Processes the current border-color attribute.
         */
        protected __processSectionsBackgroundColor(): void;
        /**
         * Sets the value of yAxisWidth
         * @param valueNew The new value for yAxisWidth
         */
        setYAxisWidth(valueNew: number | null): void;
        /**
         * Gets the value of yAxisWidth
         * @returns The current value of yAxisWidth
         */
        getYAxisWidth(): number | undefined;
        /**
         * Processes yAxisWidth
         */
        protected __processYAxisWidth(): void;
        /**
         * Sets the value of yLabelFontFamily
         * @param valueNew The new value for yLabelFontFamily
         */
        setYLabelFontFamily(valueNew: FontFamily | null): void;
        /**
         * Gets the value of yLabelFontFamily
         * @returns The current value of yLabelFontFamily
         */
        getYLabelFontFamily(): string | undefined;
        /**
         * Processes yLabelFontFamily
         */
        protected __processYLabelFontFamily(): void;
        /**
         * Sets the value of yLabelFontSize
         * @param valueNew The new value for yLabelFontSize
         */
        setYLabelFontSize(valueNew: number | null): void;
        /**
         * Gets the value of yLabelFontSize
         * @returns The current value of yLabelFontSize
         */
        getYLabelFontSize(): number | undefined;
        /**
         * Processes yLabelFontSize
         */
        protected __processYLabelFontSize(): void;
        /**
         * DEPRECATED! yLabelFontSizeUnit is always 'px'. This function exists purely to avoid errors in existing projects.
         * @deprecated yLabelFontSizeUnit is always 'px'.
         */
        setYLabelFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Gets the value of yLabelFontSizeUnit
         * @returns The current value of yLabelFontSizeUnit
         */
        getYLabelFontSizeUnit(): string;
        /**
         * Sets the value of yLabelFontWeight
         * @param valueNew The new value for yLabelFontWeight
         */
        setYLabelFontWeight(valueNew: FontWeight | null): void;
        /**
         * Gets the value of yLabelFontWeight
         * @returns The current value of yLabelFontWeight
         */
        getYLabelFontWeight(): "Normal" | "Bold" | "Auto" | undefined;
        /**
         * Processes yLabelFontWeight
         */
        protected __processYLabelFontWeight(): void;
        /**
         * Sets the value of yMainTickSteps
         * @param valueNew The new value for yMainTickSteps
         */
        setYMainTickSteps(valueNew: number | null): void;
        /**
         * Gets the value of yMainTickSteps
         * @returns The current value of yMainTickSteps
         */
        getYMainTickSteps(): number | undefined;
        /**
         * Processes yMainTickSteps
         */
        protected __processYMainTickSteps(): void;
        /**
         * Sets the value of showYSubTicks
         * @param valueNew The new value for showYSubTicks
         */
        setShowYSubTicks(valueNew: boolean | null): void;
        /**
         * Gets the value of showYSubTicks
         * @returns The current value of showYSubTicks
         */
        getShowYSubTicks(): boolean | undefined;
        /**
         * Processes showYSubTicks
         */
        protected __processShowYSubTicks(): void;
        /**
         * Sets the value of ySubTickSteps
         * @param valueNew The new value for ySubTickSteps
         */
        setYSubTickSteps(valueNew: number | null): void;
        /**
         * Gets the value of ySubTickSteps
         * @returns The current value of ySubTickSteps
         */
        getYSubTickSteps(): number | null | undefined;
        /**
         * Processes ySubTickSteps
         */
        protected __processYSubTickSteps(): void;
        /**
         * Sets the value of showXAxis
         * @param valueNew The new value for showXAxis
         */
        setShowXAxis(valueNew: boolean | null): void;
        /**
         * Gets the value of showXAxis
         * @returns The current value of showXAxis
         */
        getShowXAxis(): boolean | undefined;
        /**
         * Processes showXAxis
         */
        protected __processShowXAxis(): void;
        /**
         * Sets the value of xLogarithmicScale
         * @param valueNew The new value for xLogarithmicScale
         */
        setXLogarithmicScale(valueNew: boolean | null): void;
        /**
         * Gets the value of xLogarithmicScale
         * @returns The current value of xLogarithmicScale
         */
        getXLogarithmicScale(): boolean | undefined;
        /**
         * Processes xLogarithmicScale
         */
        protected __processXLogarithmicScale(): void;
        /**
         * Sets the value of xShowLabels
         * @param valueNew The new value for xShowLabels
         */
        setXShowLabels(valueNew: boolean | null): void;
        /**
         * Gets the value of xShowLabels
         * @returns The current value of xShowLabels
         */
        getXShowLabels(): boolean | undefined;
        /**
         * Processes xShowLabels
         */
        protected __processXShowLabels(): void;
        /**
         * Sets the value of xAxisLabeling
         * @param valueNew The new value for xAxisLabeling
         * Possible Values: Number, Scientific, Auto
         */
        setXAxisLabeling(valueNew: string | null): void;
        /**
         * Gets the value of xAxisLabeling
         * @returns The current value of xAxisLabeling
         */
        getXAxisLabeling(): string | undefined;
        /**
         * Processes xAxisLabeling
         */
        protected __processXAxisLabeling(): void;
        /**
         * Sets the value of xMainTickMinValue
         * @param valueNew The new value for xMainTickMinValue
         */
        setXMainTickMinValue(valueNew: number | null): void;
        /**
         * Gets the value of xMainTickMinValue
         * @returns The current value of xMainTickMinValue
         */
        getXMainTickMinValue(): number | null | undefined;
        /**
         * Processes xMainTickMinValue
         */
        protected __processXMainTickMinValue(): void;
        /**
         * Sets the value of xMainTickMaxValue
         * @param valueNew The new value for xMainTickMaxValue
         */
        setXMainTickMaxValue(valueNew: number | null): void;
        /**
         * Gets the value of xMainTickMaxValue
         * @returns The current value of xMainTickMaxValue
         */
        getXMainTickMaxValue(): number | null | undefined;
        /**
         * Processes xMainTickMaxValue
         */
        protected __processXMainTickMaxValue(): void;
        /**
         * Sets the value of xMainTickSteps
         * @param valueNew The new value for xMainTickSteps
         */
        setXMainTickSteps(valueNew: number | null): void;
        /**
         * Gets the value of xMainTickSteps
         * @returns The current value of xMainTickSteps
         */
        getXMainTickSteps(): number | undefined;
        /**
         * Processes xMainTickSteps
         */
        protected __processXMainTickSteps(): void;
        /**
         * Sets the value of showXSubTicks
         * @param valueNew The new value for showXSubTicks
         */
        setShowXSubTicks(valueNew: boolean | null): void;
        /**
         * Gets the value of showXSubTicks
         * @returns The current value of showXSubTicks
         */
        getShowXSubTicks(): boolean | undefined;
        /**
         * Processes showXSubTicks
         */
        protected __processShowXSubTicks(): void;
        /**
         * Sets the value of xSubTickSteps
         * @param valueNew The new value for xSubTickSteps
         */
        setXSubTickSteps(valueNew: number | null): void;
        /**
         * Gets the value of xSubTickSteps
         * @returns The current value of xSubTickSteps
         */
        getXSubTickSteps(): number | null | undefined;
        /**
         * Processes xSubTickSteps
         */
        protected __processXSubTickSteps(): void;
        /**
         * Sets the value of xLabelFontFamily
         * @param valueNew The new value for xLabelFontFamily
         */
        setXLabelFontFamily(valueNew: FontFamily | null): void;
        /**
         * Gets the value of xLabelFontFamily
         * @returns The current value of xLabelFontFamily
         */
        getXLabelFontFamily(): string | undefined;
        /**
         * Processes xLabelFontFamily
         */
        protected __processXLabelFontFamily(): void;
        /**
         * Sets the value of xLabelFontSize
         * @param valueNew The new value for xLabelFontSize
         */
        setXLabelFontSize(valueNew: number | null): void;
        /**
         * Gets the value of xLabelFontSize
         * @returns The current value of xLabelFontSize
         */
        getXLabelFontSize(): number | undefined;
        /**
         * Processes xLabelFontSize
         */
        protected __processXLabelFontSize(): void;
        /**
         * DEPRECATED! xLabelFontSizeUnit is always 'px'. This function exists purely to avoid errors in existing projects.
         * @deprecated xLabelFontSizeUnit is always 'px'.
         */
        setXLabelFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Gets the value of xLabelFontSizeUnit
         * @returns The current value of xLabelFontSizeUnit
         */
        getXLabelFontSizeUnit(): string;
        /**
         * Sets the value of xLabelFontWeight
         * @param valueNew The new value for xLabelFontWeight
         */
        setXLabelFontWeight(valueNew: FontWeight | null): void;
        /**
         * Gets the value of xLabelFontWeight
         * @returns The current value of xLabelFontWeight
         */
        getXLabelFontWeight(): "Normal" | "Bold" | "Auto" | undefined;
        /**
         * Processes xLabelFontWeight
         */
        protected __processXLabelFontWeight(): void;
        /**
         * Sets the xLabelFontColor value and calls the associated process function (processXLabelFontColor).
         * @param valueNew The new value for the xLabelFontColor attribute as object.
         */
        setXLabelFontColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the xLabelFontColor object resolver.
         */
        protected __onResolverForXLabelFontColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current xLabelFontColor value.
         */
        getXLabelFontColor(): SolidColor | null | undefined;
        /**
         * Processes the current xLabelFontColor attribute.
         */
        protected __processXLabelFontColor(): void;
        /**
         * Sets the value of xAxisWidth
         * @param valueNew The new value for xAxisWidth
         */
        setXAxisWidth(valueNew: number | null): void;
        /**
         * Gets the value of xAxisWidth
         */
        getXAxisWidth(): number | undefined;
        /**
         * Processes xAxisWidth
         */
        protected __processXAxisWidth(): void;
        /**
         * Sets the xAxisColor value and calls the associated process function (processXAxisColor).
         * @param valueNew The new value for the xAxisColor attribute as object.
         */
        setXAxisColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the xAxisColor object resolver.
         */
        protected __onResolverForXAxisColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current xAxisColor value.
         * @returns The current value of the xAxisColor member variable as json in string format.
         */
        getXAxisColor(): SolidColor | null | undefined;
        /**
         * Processes the current xAxisColor attribute.
         */
        protected __processXAxisColor(): void;
        /**
         * Sets the value of showXAxisName
         * @param valueNew The new value for showXAxisName
         */
        setShowXAxisName(valueNew: boolean | null): void;
        /**
         * Gets the value of showXAxisName
         * @returns The current value of showXAxisName
         */
        getShowXAxisName(): boolean | undefined;
        /**
         * Processes showXAxisName
         */
        protected __processShowXAxisName(): void;
        /**
         * Sets the value of xAxisName
         * @param valueNew The new value for xAxisName
         */
        setXAxisName(valueNew: string | null): void;
        /**
         * Gets the value of xAxisName
         * @returns The current value of xAxisName
         */
        getXAxisName(): string | null | undefined;
        /**
         * Processes xAxisName
         */
        protected __processXAxisName(): void;
        /**
         * Sets the value of xAxisNameFontFamily
         * @param valueNew The new value for xAxisNameFontFamily
         */
        setXAxisNameFontFamily(valueNew: FontFamily | null): void;
        /**
         * Gets the value of xAxisNameFontFamily
         * @returns The current value of xAxisNameFontFamily
         */
        getXAxisNameFontFamily(): string | undefined;
        /**
         * Processes xAxisNameFontFamily
         */
        protected __processXAxisNameFontFamily(): void;
        /**
         * Sets the value of xAxisNameFontSize
         * @param valueNew The new value for xAxisNameFontSize
         */
        setXAxisNameFontSize(valueNew: number | null): void;
        /**
         * Gets the value of xAxisNameFontSize
         * @returns The current value of xAxisNameFontSize
         */
        getXAxisNameFontSize(): number | undefined;
        /**
         * Processes xAxisNameFontSize
         */
        protected __processXAxisNameFontSize(): void;
        /**
         * DEPRECATED! xAxisNameFontSizeUnit is always 'px'. This function exists purely to avoid errors in existing projects.
         * @deprecated xAxisNameFontSizeUnit is always 'px'.
         */
        setXAxisNameFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Gets the value of xAxisNameFontSizeUnit
         * @returns The current value of xAxisNameFontSizeUnit
         */
        getXAxisNameFontSizeUnit(): string;
        /**
         * Sets the value of xAxisNameFontWeight
         * @param valueNew The new value for xAxisNameFontWeight
         */
        setXAxisNameFontWeight(valueNew: FontWeight | null): void;
        /**
         * Gets the value of xAxisNameFontWeight
         * @returns The current value of xAxisNameFontWeight
         */
        getXAxisNameFontWeight(): "Normal" | "Bold" | "Auto" | undefined;
        /**
         * Processes xAxisNameFontWeight
         */
        protected __processXAxisNameFontWeight(): void;
        /**
         * Sets the xAxisNameFontColor value and calls the associated process function (processXAxisNameFontColor).
         * @param valueNew The new value for the xAxisNameFontColor attribute as object.
         */
        setXAxisNameFontColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the xAxisNameFontColor object resolver.
         */
        protected __onResolverForXAxisNameFontColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current xAxisNameFontColor value.
         * @returns The current value of the xAxisNameFontColor member variable as json in string format.
         */
        getXAxisNameFontColor(): SolidColor | null | undefined;
        /**
         * Processes the current xAxisNameFontColor attribute.
         */
        protected __processXAxisNameFontColor(): void;
        /**
         * Sets the value of xAxisDecimalPlaces
         * @param valueNew The new value for xAxisDecimalPlaces
         */
        setXAxisDecimalPlaces(valueNew: number | null): void;
        /**
         * Gets the value of xAxisDecimalPlaces
         * @returns The current value of xAxisDecimalPlaces
         */
        getXAxisDecimalPlaces(): number | undefined;
        /**
         * Processes xAxisDecimalPlaces
         */
        protected __processXAxisDecimalPlaces(): void;
        /**
         * Sets the value of xAxisUnit
         * @param valueNew The new value for xAxisUnit
         */
        setXAxisUnit(valueNew: string | null): void;
        /**
         * Gets the value of xAxisUnit
         * @returns The current value of xAxisUnit
         */
        getXAxisUnit(): string | null | undefined;
        /**
         * Processes xAxisUnit
         */
        protected __processXAxisUnit(): void;
        /**
         * Sets the value of xAxisAutoScaling
         * @param valueNew The new value for xAxisAutoScaling
         */
        setXAxisAutoScaling(valueNew: boolean | null): void;
        /**
         * Gets the value of xAxisAutoScaling
         * @returns The current value of xAxisAutoScaling
         */
        getXAxisAutoScaling(): boolean | undefined;
        /**
         * Processes xAxisAutoScaling
         */
        protected __processXAxisAutoScaling(): void;
        /**
         * Sets the xAxis of the xAxisFormat order attribute.
         * @param xAxis The new xAxisFormat method.
         */
        setXAxisFormat(valueNew: TcHmi.IFunction | null): void;
        /**
         * The watch callback for the xAxisFormat object resolver.
         */
        protected __onResolverForXAxisFormatWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<IFunction>) => void;
        /**
         * Gets the current xAxisFormat method.
         * @returns the current xAxisFormat method.
         */
        getXAxisFormat(): IFunction | null | undefined;
        /**
         * Processes the current xAxisFormat method
         */
        protected __processXAxisFormat(): void;
        /**
         * Executes the current xAxisFormat function.
         * @param first The first message to compare.
         * @param second The second message to compare.
         */
        private __executeXAxisFormatFunction;
        /**
         * Sets the value of the member variable 'yAxis' if the new value is not equal to the current value
         * and calls the associated process function (processYAxis) after that.
         * @param valueNew The new value for yAxis.
         */
        setYAxis(valueNew: TcHmiLineChart.YAxis[] | null): void;
        /**
         * The watch callback for the yAxis object resolver.
         */
        protected __onResolverForYAxisWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiLineChart.YAxis[]>) => void;
        /**
         * Returns the current value of the member variable yAxis.
         */
        getYAxis(): TcHmiLineChart.YAxis[] | null | undefined;
        /**
         * Processes the current value of yAxis.
         */
        protected __processYAxis(): void;
        /**
         * Sets the value of the member variable 'lineGraphDescriptions' if the new value is not equal to the current value
         * and calls the associated process function (processlineGraphDescriptions) after that.
         * @param valueNew The new value for lineGraphDescriptions.
         */
        setLineGraphDescriptions(valueNew: TcHmiLineChart.lineGraphDescription[] | null): void;
        /**
         * The watch callback for the lineGraphDescriptions object resolver.
         */
        protected __onResolverForLineGraphDescriptionsWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiLineChart.lineGraphDescription[]>) => void;
        /**
         * Returns the current value of the member variable lineGraphDescriptions.
         */
        getLineGraphDescriptions(): TcHmiLineChart.lineGraphDescription[] | null | undefined;
        /**
         * Processes the current value of lineGraphDescriptions.
         */
        protected __processLineGraphDescriptions(): void;
        /**
         * Sets the value of the member variable 'lineGraphData' if the new value is not equal to the current value
         * and calls the associated process function (processLineGraphData) after that.
         * @param valueNew The new value for lineGraphData.
         */
        setLineGraphData(valueNew: TcHmiLineChart.Point[][] | number[][] | number[] | null): void;
        /**
         * The watch callback for the lineGraphData object resolver.
         */
        protected __onResolverForLineGraphDataWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiLineChart.Point[][] | number[][] | number[]>) => void;
        /**
         * Returns the current value of the member variable lineGraphData.
         */
        getLineGraphData(): TcHmiLineChart.Point[][] | number[] | number[][] | null | undefined;
        /**
         * Processes the current value of lineGraphData.
         */
        protected __processLineGraphData(): void;
        /**
         * Sets the value of the member variable 'referenceLines' if the new value is not equal to the current value
         * and calls the associated process function (processReferenceLines) after that.
         * @param valueNew The new value for referenceLines.
         */
        setReferenceLines(valueNew: TcHmiLineChart.ReferenceLine[] | null): void;
        /**
         * The watch callback for the referenceLines object resolver.
         */
        protected __onResolverForReferenceLinesWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiLineChart.ReferenceLine[]>) => void;
        /**
         * Returns the current value of the member variable referenceLines.
         */
        getReferenceLines(): TcHmiLineChart.ReferenceLine[] | null | undefined;
        /**
         * Processes the current value of referenceLines.
         */
        protected __processReferenceLines(): void;
        /**
         * Sets the value of referenceLinesPosition
         * @param valueNew The new value for referenceLinesPosition
         * Possible Values: Left, Right
         */
        setReferenceLinesPosition(valueNew: string | null): void;
        /**
         * Gets the value of referenceLinesPosition
         * @returns The current value of referenceLinesPosition
         */
        getReferenceLinesPosition(): string | undefined;
        /**
         * Processes referenceLinesPosition
         */
        protected __processReferenceLinesPosition(): void;
        /**
         * Sets the value of showGrid
         * @param valueNew The new value for showGrid
         */
        setShowGrid(valueNew: boolean | null): void;
        /**
         * Gets the value of showGrid
         * @returns The current value of showGrid
         */
        getShowGrid(): boolean | undefined;
        /**
         * Processes showGrid
         */
        protected __processShowGrid(): void;
        /**
         * Sets the gridBackgroundColor value and calls the associated process function (processGridBackgroundColor).
         * @param valueNew The new value for the gridBackgroundColor attribute as object.
         */
        setGridBackgroundColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the gridBackgroundColor object resolver.
         */
        protected __onResolverForGridBackgroundColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current gridBackgroundColor value.
         * @returns The current value of the gridBackgroundColor member variable as json in string format.
         */
        getGridBackgroundColor(): SolidColor | null | undefined;
        /**
         * Processes the current gridBackgroundColor attribute.
         */
        protected __processGridBackgroundColor(): void;
        /**
         * Sets the value of gridShowHorizontalLines
         * @param valueNew The new value for gridShowHorizontalLines
         */
        setGridShowHorizontalLines(valueNew: boolean | null): void;
        /**
         * Gets the value of gridShowHorizontalLines
         * @returns The current value of gridShowHorizontalLines
         */
        getGridShowHorizontalLines(): boolean | undefined;
        /**
         * Processes gridShowHorizontalLines
         */
        protected __processGridShowHorizontalLines(): void;
        /**
         * Sets the value of gridShowVerticalLines
         * @param valueNew The new value for gridShowVerticalLines
         */
        setGridShowVerticalLines(valueNew: boolean | null): void;
        /**
         * Gets the value of gridShowVerticalLines
         * @returns The current value of gridShowVerticalLines
         */
        getGridShowVerticalLines(): boolean | undefined;
        /**
         * Processes gridShowVerticalLines
         */
        protected __processGridShowVerticalLines(): void;
        /**
         * Sets the value of gridLineWidth
         * @param valueNew The new value for gridLineWidth
         */
        setGridLineWidth(valueNew: number | null): void;
        /**
         * Gets the value of gridLineWidth
         * @returns The current value of gridLineWidth
         */
        getGridLineWidth(): number | undefined;
        /**
         * Processes gridLineWidth
         */
        protected __processGridLineWidth(): void;
        /**
         * Sets the value of gridLineStyle
         * @param valueNew The new value for gridLineStyle
         */
        setGridLineStyle(valueNew: string | null): void;
        /**
         * Gets the value of gridLineStyle
         */
        getGridLineStyle(): string | undefined;
        /**
         * Processes gridLineStyle
         */
        protected __processGridLineStyle(): void;
        /**
         * Sets the gridLineColor value and calls the associated process function (processGridLineColor).
         * @param valueNew The new value for the gridLineColor attribute as object.
         */
        setGridLineColor(valueNew: TcHmi.SolidColor | null): void;
        /**
         * The watch callback for the gridLineColor object resolver.
         */
        protected __onResolverForGridLineColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current gridLineColor value.
         * @returns The current value of the gridLineColor member variable as json in string format.
         */
        getGridLineColor(): SolidColor | null | undefined;
        /**
         * Processes the current gridLineColor attribute.
         */
        protected __processGridLineColor(): void;
        /**
         * Sets the value of subgridShowHorizontalLines
         * @param valueNew The new value for subgridShowHorizontalLines
         */
        setSubgridShowHorizontalLines(valueNew: boolean | null): void;
        /**
         * Gets the value of subgridShowHorizontalLines
         * @returns The current value of subgridShowHorizontalLines
         */
        getSubgridShowHorizontalLines(): boolean | undefined;
        /**
         * Processes subgridShowHorizontalLines
         */
        protected __processSubgridShowHorizontalLines(): void;
        /**
         * Sets the value of subgridShowVerticalLines
         * @param valueNew The new value for subgridShowVerticalLines
         */
        setSubgridShowVerticalLines(valueNew: boolean | null): void;
        /**
         * Gets the value of subgridShowVerticalLines
         * @returns The current value of subgridShowVerticalLines
         */
        getSubgridShowVerticalLines(): boolean | undefined;
        /**
         * Processes subgridShowVerticalLines
         */
        protected __processSubgridShowVerticalLines(): void;
        /**
         * Sets the value of subgridLineWidth
         * @param valueNew The new value for subgridLineWidth
         */
        setSubgridLineWidth(valueNew: number | null): void;
        /**
         * Gets the value of subgridLineWidth
         * @returns The current value of subgridLineWidth
         */
        getSubgridLineWidth(): number | undefined;
        /**
         * Processes subgridLineWidth
         */
        protected __processSubgridLineWidth(): void;
        /**
         * Sets the value of subgridLineStyle
         * @param valueNew The new value for subgridLineStyle
         */
        setSubgridLineStyle(valueNew: TcHmiLineChart.LineStyle | null): void;
        /**
         * Gets the value of subgridLineStyle
         */
        getSubgridLineStyle(): string | undefined;
        /**
         * Processes subgridLineStyle
         */
        protected __processSubgridLineStyle(): void;
        /**
         * Sets the subgridLineColor value and calls the associated process function (processSubgridLineColor).
         * @param valueNew The new value for the subgridLineColor attribute as object.
         */
        setSubgridLineColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the subgridLineColor object resolver.
         */
        protected __onResolverForSubgridLineColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current subgridLineColor value.
         * @returns The current value of the subgridLineColor member variable as json in string format.
         */
        getSubgridLineColor(): SolidColor | null | undefined;
        /**
         * Processes the current subgridLineColor attribute.
         */
        protected __processSubgridLineColor(): void;
        /**
         * Sets the value of showTooltip
         * @param valueNew The new value for showTooltip
         */
        setShowTooltip(valueNew: boolean | null): void;
        /**
         * Gets the value of showTooltip
         */
        getShowTooltip(): boolean | undefined;
        /**
         * Processes showTooltip
         */
        protected __processShowTooltip(): void;
        /**
         * Sets the value of the tooltipFormat order attribute.
         * @param value The new tooltipFormat method.
         */
        setTooltipFormat(valueNew: TcHmi.IFunction | null): void;
        /**
         * The watch callback for the tooltipFormat object resolver.
         */
        protected __onResolverForTooltipFormatWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<IFunction>) => void;
        /**
         * Gets the current tooltipFormat method.
         * @returns the current tooltipFormat method.
         */
        getTooltipFormat(): IFunction | null | undefined;
        /**
         * Processes the current tooltipFormat method
         */
        protected __processTooltipFormat(): void;
        /**
         * Executes the current tooltipFormat function.
         * @param first The first message to compare.
         * @param second The second message to compare.
         */
        private __executeTooltipFormatFunction;
        /**
         * Sets the value of tooltipFontFamily
         * @param valueNew The new value for tooltipFontFamily
         */
        setTooltipFontFamily(valueNew: FontFamily | null): void;
        /**
         * Gets the value of tooltipFontFamily
         */
        getTooltipFontFamily(): string | undefined;
        /**
         * Processes tooltipFontFamily
         */
        protected __processTooltipFontFamily(): void;
        /**
         * Sets the value of tooltipFontSize
         * @param valueNew The new value for tooltipFontSize
         */
        setTooltipFontSize(valueNew: number | null): void;
        /**
         * Gets the value of tooltipFontSize
         */
        getTooltipFontSize(): number | undefined;
        /**
         * Processes tooltipFontSize
         */
        protected __processTooltipFontSize(): void;
        /**
         * DEPRECATED! tooltipFontSizeUnit is always 'px'. This function exists purely to avoid errors in existing projects.
         * @deprecated tooltipFontSizeUnit is always 'px'.
         */
        setTooltipFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Gets the value of tooltipFontSizeUnit
         */
        getTooltipFontSizeUnit(): string;
        /**
         * Sets the value of tooltipFontWeight
         * @param valueNew The new value for tooltipFontWeight
         */
        setTooltipFontWeight(valueNew: FontWeight | null): void;
        /**
         * Gets the value of tooltipFontWeight
         */
        getTooltipFontWeight(): "Normal" | "Bold" | "Auto" | undefined;
        /**
         * Processes tooltipFontWeight
         */
        protected __processTooltipFontWeight(): void;
        /**
         * Sets the tooltipFontColor value and calls the associated process function (processTooltipFontColor).
         * @param valueNew The new value for the tooltipFontColor attribute as object.
         */
        setTooltipFontColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the tooltipFontColor object resolver.
         */
        protected __onResolverForTooltipFontColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current tooltipFontColor value.
         */
        getTooltipFontColor(): SolidColor | null | undefined;
        /**
         * Processes the current tooltipFontColor attribute.
         */
        protected __processTooltipFontColor(): void;
        /**
         * Sets the background value and calls the associated process function.
         * @param valueNew The new value for the background attribute as object.
         */
        setTooltipBackgroundColor(valueNew: Color | null): void;
        /**
         * The watch callback for the tooltipBackgroundColor object resolver.
         */
        protected __onResolverForTooltipBackgroundColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Color>) => void;
        /**
         * Returns the current background value.
         * @returns The current value of the background member variable as json in string format.
         */
        getTooltipBackgroundColor(): Color | null | undefined;
        /**
         * Processes the current border-color attribute.
         */
        protected __processTooltipBackgroundColor(): void;
        /**
         * Sets the value of showLegend
         * @param valueNew The new value for showLegend
         */
        setShowLegend(valueNew: boolean | null): void;
        /**
         * Gets the value of showLegend
         * @returns The current value of showLegend
         */
        getShowLegend(): boolean | undefined;
        /**
         * Processes showLegend
         */
        protected __processShowLegend(): void;
        /**
         * Sets the value of legendFontFamily
         * @param valueNew The new value for legendFontFamily
         */
        setLegendFontFamily(valueNew: FontFamily | null): void;
        /**
         * Gets the value of legendFontFamily
         * @returns The current value of legendFontFamily
         */
        getLegendFontFamily(): string | undefined;
        /**
         * Processes legendFontFamily
         */
        protected __processLegendFontFamily(): void;
        /**
         * Sets the value of legendFontSize
         * @param valueNew The new value for legendFontSize
         */
        setLegendFontSize(valueNew: number | null): void;
        /**
         * Gets the value of legendFontSize
         * @returns The current value of legendFontSize
         */
        getLegendFontSize(): number | undefined;
        /**
         * Processes legendFontSize
         */
        protected __processLegendFontSize(): void;
        /**
         * Gets the value of legendFontSizeUnit
         * @returns The current value of legendFontSizeUnit
         */
        getLegendFontSizeUnit(): string;
        /**
         * Sets the legend font style and calls the associated process function.
         * @param valueNew The new value for legendFontStyle
         */
        setLegendFontStyle(valueNew: FontStyle | null): void;
        /**
         * Returns the current value of legendFontStyle.
         * @returns The current value of legendFontStyle.
         */
        getLegendFontStyle(): "Normal" | "Auto" | "Italic" | "Oblique" | undefined;
        /**
         * Processes the current legendFontStyle.
         */
        protected __processLegendFontStyle(): void;
        /**
         * Sets the value of legendFontWeight
         * @param valueNew The new value for legendFontWeight
         */
        setLegendFontWeight(valueNew: FontWeight | null): void;
        /**
         * Gets the value of legendFontWeight
         * @returns The current value of legendFontWeight
         */
        getLegendFontWeight(): "Normal" | "Bold" | "Auto" | undefined;
        /**
         * Processes legendFontWeight
         */
        protected __processLegendFontWeight(): void;
    }
    module TcHmiLineChart {
        interface YAxis {
            id: number;
            showAxis: boolean;
            position: TcHmiLineChart.Position;
            logarithmicScale: boolean;
            axisLabeling: TcHmiLineChart.AxisLabeling;
            mainTickMinValue?: number;
            mainTickMaxValue?: number;
            showLabels?: boolean;
            labelFontColor?: TcHmi.SolidColor;
            axisColor?: TcHmi.SolidColor;
            showAxisName?: boolean;
            axisName?: string;
            axisNameFontFamily?: string;
            axisNameFontSize?: number;
            axisNameFontSizeUnit?: TcHmi.FontSizeUnit;
            axisNameFontWeight?: TcHmi.FontWeight;
            axisNameFontColor?: TcHmi.SolidColor;
            decimalPlaces?: number;
            unit?: string;
            autoScaling?: boolean;
        }
        interface lineGraphDescription {
            yAxisId: number;
            lineWidth?: number;
            lineColor?: TcHmi.SolidColor;
            pointDot?: boolean;
            pointDotRadius?: number;
            pointDotFillColor?: TcHmi.SolidColor;
            pointDotStrokeWidth?: number;
            pointDotStrokeColor?: TcHmi.SolidColor;
            legendName?: string;
            xScaleFactor?: number;
            yScaleFactor?: number;
            fillMode?: FillMode;
            fillColor?: TcHmi.SolidColor;
            fillTransparency?: number;
        }
        enum Position {
            Left = 0,
            Right = 1
        }
        interface Point {
            x: number;
            y: number;
        }
        enum LineStyle {
            Dotted = 0,
            Dashed = 1,
            Solid = 2
        }
        enum AxisLabeling {
            Number = 0,
            Scientific = 1,
            Auto = 2
        }
        enum Orientation {
            Horizontal = 0,
            Vertical = 1
        }
        interface ReferenceLine {
            name: string;
            show: boolean;
            yAxisId: number;
            value: number;
            orientation: Orientation;
            color: TcHmi.SolidColor;
            lineWidth: number;
            showLabel: boolean;
            labelHorizontalAlignment: HorizontalAlignment;
            labelVerticalAlignment: VerticalAlignment;
            labelFontFamily: TcHmi.FontFamily;
            labelFontSize: number;
            labelFontSizeUnit: TcHmi.FontSizeUnit;
            labelFontWeight: TcHmi.FontWeight;
        }
        enum FillMode {
            None = 0,
            HorizontalZero = 1,
            Bottom = 2,
            Top = 3,
            Center = 4,
            Source = 5
        }
    }
}
//# sourceMappingURL=TcHmiLineChart.d.ts.map