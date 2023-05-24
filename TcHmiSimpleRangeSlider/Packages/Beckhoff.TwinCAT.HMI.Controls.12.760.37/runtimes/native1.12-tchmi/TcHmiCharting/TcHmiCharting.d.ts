declare module TcHmiCharting {
    class Area {
        /** The canvas as HTMLCanvasElement. */
        protected __canvas: HTMLCanvasElement | undefined;
        /** The canvas context as CanvasRenderingContext2D. */
        protected __context: CanvasRenderingContext2D | null;
        /** The backgroundColor as string. */
        protected __backgroundColor: string | null;
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: number;
        /** The area with start and end x-coordinate as array*/
        protected __areas: Area.AreaRange[];
        /** The middlepoints with values of the areas as array*/
        protected __areaPositionAndValue: Area.AreaValueAndPosition[];
        /** Specifies whether the area should be drawn only 1 pixel forward. As boolean*/
        protected __drawLineWithOnePixel: boolean;
        /**
         * Creates a new LineGraph.
         * @param canvas The optional canvas element to drawing.
         */
        constructor(canvas?: HTMLCanvasElement);
        /**
         * Draws the lineGraph to the canvas.
         * @param line The line (yAxis and points) to drawing.
         * @param xAxis The xAxis.
         */
        draw(xAxis: XAxis, yAxis: YAxis): void;
        /**
         * Sets the canvas.
         * @param canvas The new canvas.
         */
        setCanvas(canvas: HTMLCanvasElement): void;
        /**
         * Returns the canvas.
         * @returns The canvas of the lineGraph.
         */
        getCanvas(): HTMLCanvasElement | undefined;
        /**
         * Sets the drawingBorder.
         * @param drawingBorder The new drawingBorder.
         */
        setDrawingBorder(drawingBorder: number): void;
        /**
         * Returns the areas of the lineGraph areas as array.
         * @returns The areas of the lineGraph areas.
         */
        getAreas(): Area.AreaRange[];
        /**
         * Removes all middlePoints of the lineGraph.
         */
        removeAllAreas(): void;
        /**
         * Returns the middlePoints with values of the lineGraph areas.
         * @returns The middlePoints with values of the lineGraph areas.
         */
        getAreasPositionAndValue(): Area.AreaValueAndPosition[];
        /**
         * Removes all middlePoints of the lineGraph.
         */
        addArea(area: Area.AreaRange): void;
        /**
         * Sets the backgroundColor.
         * @param backgroundColor The new backgroundColor.
         */
        setBackgroundColor(backgroundColor: string | null): void;
        /**
         * Returns the backgroundColor.
         * @returns The backgroundColor value.
         */
        getBackgroundColor(): string | null;
        /**
         * Sets the drawLineWithOnePixel.
         * @param drawLineWithOnePixel The new drawLineWithOnePixel.
         */
        setDrawLineWithOnePixel(drawLineWithOnePixel?: boolean): void;
        /**
         * Returns the drawLineWithOnePixel.
         * @returns The drawLineWithOnePixel value.
         */
        getDrawLineWithOnePixel(): boolean;
    }
    module Area {
        interface AreaRange {
            beginX: number;
            endX: number;
        }
        interface AreaValueAndPosition {
            xBeginPosition: number;
            xEndPosition: number;
            xBeginValue: number;
            xEndValue: number;
        }
    }
}
declare module TcHmiCharting {
    class IChart {
        /** The elementRoot as jquery object. */
        protected __elementRoot: JQuery;
        /** The canvas to drawing axis, grid and subgrid as HTMLCanvasElement. */
        protected __canvasFrame: HTMLCanvasElement | null;
        /** The canvas to drawing the lines as HTMLCanvasElement. */
        protected __canvasDrawing: HTMLCanvasElement | null;
        /** The canvas to drawing reference lines as HTMLCanvasElement. */
        protected __canvasLines: HTMLCanvasElement | null;
        /** The canvas frame context as CanvasRenderingContext2D. */
        protected __contextFrame: CanvasRenderingContext2D | null;
        /** The canvas context drawing as CanvasRenderingContext2D. */
        protected __contextDrawing: CanvasRenderingContext2D | null;
        /** The canvas context lines as CanvasRenderingContext2D. */
        protected __contextLines: CanvasRenderingContext2D | null;
        /** The canvas to drawing the graphs as HTMLCanvasElement. */
        protected __canvasGraph: HTMLCanvasElement | null;
        /** The yAxis as YAxis[]. */
        protected __yAxis: YAxis[];
        /** The xAxis as XAxis object. */
        protected __xAxis: XAxis | null;
        /** The grid as Grid object. */
        protected __grid: Grid | null;
        /** The subgrid as Subgrid object. */
        protected __subgrid: Subgrid | null;
        /** The referenceLines as ReferenceLines[]. */
        protected __referenceLines: ReferenceLine[];
        /** The position of reference lines canvas as ReferenceLines[]. */
        protected __referenceLinesPosition: IChart.Position;
        private __hasChanged;
        /** The yAxisWidth as number. */
        protected __yAxisWidth: number | null;
        /** The yLabelFontFamily as string. */
        protected __yLabelFontFamily: TcHmi.FontFamily | null;
        /** The yLabelFontSize as number. */
        protected __yLabelFontSize: number | null;
        /** The yLabelFontSizeUnit as string. */
        protected readonly __yLabelFontSizeUnit = "px";
        /** The yLabelFontWeight as string. */
        protected __yLabelFontWeight: TcHmi.FontWeight | null;
        /** The yShowLabels as boolean. */
        protected __yShowLabels: boolean;
        /** The yMainTickSteps as number. */
        protected __yMainTickSteps: number | null;
        /** The ySubTickSteps as number. */
        protected __ySubTickSteps: number | null;
        /** The showYSubTicks as boolean. */
        protected __showYSubTicks: boolean;
        /**
         * Creates a new IChart.
         * @param elementRoot The root element where the canvas elements added to.
         */
        constructor(elementRoot: JQuery, canvasWidth: number, canvasHeight: number, referenceLinesPosition: IChart.Position);
        /**
         * Adds a xAxis (only one xAxis are exists).
         */
        addXAxis(): void;
        /**
         * Adds a yAxis.
         * @param position The position where the yAxis should added.
         */
        addYAxis(position: IAxis.Position): void;
        /**
         * Adds a yAxis at index.
         * @param position The position where the yAxis should added.
         * @param index The index where the new yAxis should added in array.
         */
        addYAxisAtPosition(index: number, position: IAxis.Position): void;
        /**
         * Adds a grid (only one grid are exists).
         */
        addGrid(): void;
        /**
         * Delete the grid.
         */
        deleteGrid(): void;
        /**
         * Adds a subgrid (only one subgrid are exists).
         */
        addSubgrid(): void;
        /**
         * Delete the subgrid.
         */
        deleteSubgrid(): void;
        /**
         * Adds a reference line.
         */
        addReferenceLine(): void;
        /**
         * Adds a reference line at index.
         * @param index The index where the new reference line should added in array.
         */
        addReferenceLineAtPosition(index: number): void;
        /**
         * Removes all canvas elements.
         */
        remove(): void;
        /**
         * Clears all canvas elements.
         */
        clear(width: number, height: number): void;
        /**
         * Returns all yAxis.
         * @returns The yAxis.
         */
        getYAxis(): YAxis[];
        /**
         * Returns the specific yAxis.
         * @param index The index.
         * @returns The yAxis at index.
         */
        getYAxisAtPosition(index: number): YAxis;
        /**
         * Returns all referenceLines.
         * @returns The referenceLines.
         */
        getReferenceLines(): ReferenceLine[];
        /**
         * Returns the specific referenceLines.
         * @param index The index.
         * @returns The referenceLines at index.
         */
        getReferenceLinesAtPosition(index: number): ReferenceLine;
        /**
         * Returns the xAxis.
         * @returns The xAxis.
         */
        getXAxis(): XAxis | null;
        /**
         * Returns the grid.
         * @returns The grid.
         */
        getGrid(): Grid | null;
        /**
         * Returns the subgrid.
         * @returns The subgrid.
         */
        getSubgrid(): Subgrid | null;
        /**
         * Returns the yAxisWidth.
         * @returns The yAxisWidth.
         */
        getYAxisWidth(): number | null;
        /**
         * Returns the yLabelFontFamily.
         * @returns The yLabelFontFamily.
         */
        getYLabelFontFamily(): string | null;
        /**
         * Returns the yLabelFontSize.
         * @returns The yLabelFontSize.
         */
        getYLabelFontSize(): number | null;
        /**
         * Returns the yLabelFontSizeUnit.
         * @returns The yLabelFontSizeUnit.
         */
        getYLabelFontSizeUnit(): string;
        /**
         * Returns the yLabelFontWeight.
         * @returns The yLabelFontWeight.
         */
        getYLabelFontWeight(): "Normal" | "Bold" | "Auto" | null;
        /**
         * Returns the yShowLabels.
         * @returns The yShowLabels.
         */
        getYShowLabels(): boolean;
        /**
         * Returns the yMainTickSteps.
         * @returns The yMainTickSteps.
         */
        getYMainTickSteps(): number | null;
        /**
         * Returns the ySubTickSteps.
         * @returns The ySubTickSteps.
         */
        getYSubTickSteps(): number | null;
        /**
         * Returns the canvas object where the graphs are drawing.
         * @returns The canvas where drawing the graphs.
         */
        getCanvasDrawing(): JQuery<HTMLCanvasElement> | null;
        /**
         * Returns the canvas object where the axis, grid and subgrid are drawing.
         * @returns The canvas where drawing axis, grid and subgrid.
         */
        getCanvasFrame(): JQuery<HTMLCanvasElement> | null;
        /**
         * Returns the canvas object where the reference lines are drawing.
         * @returns The canvas where drawing reference lines.
         */
        getCanvasLines(): JQuery<HTMLCanvasElement> | null;
        /**
         * Returns the hasChanged attribute which saved if axis, grid and subgrid must be redrawing.
         * @returns The hasChanged attribute.
         */
        getHasChanged(): boolean;
        /**
         * Sets the yAxisWidth.
         * @param yAxisWidth The new yAxisWidth.
         */
        setYAxisWidth(yAxisWidth: number | null): void;
        /**
         * Sets the labelFontFamily.
         * @param labelFontFamily The new labelFontFamily.
         */
        setYLabelFontFamily(labelFontFamily: TcHmi.FontFamily | null | undefined): void;
        /**
         * Sets the labelFontSize.
         * @param labelFontSize The new labelFontSize.
         */
        setYLabelFontSize(labelFontSize: number | null): void;
        /**
         * Sets the labelFontSizeUnit.
         * @param labelFontSizeUnit The new labelFontSizeUnit.
         */
        setYLabelFontSizeUnit(labelFontSizeUnit: TcHmi.FontSizeUnit | null): void;
        /**
         * Sets the labelFontWeight.
         * @param labelFontWeight The new labelFontWeight.
         */
        setYLabelFontWeight(labelFontWeight: TcHmi.FontWeight | null): void;
        /**
         * Sets the yShowLabels.
         * @param yShowLabels The new yShowLabels.
         */
        setYShowLabels(yShowLabels: boolean): void;
        /**
         * Sets the yMainTickSteps.
         * @param yMainTickSteps The new yMainTickSteps.
         */
        setYMainTickSteps(yMainTickSteps: number | null): void;
        /**
         * Sets the ySubTickSteps.
         * @param ySubTickSteps The new ySubTickSteps.
         */
        setYSubTickSteps(ySubTickSteps: number | null): void;
        /**
         * Sets the showYSubTicks.
         * @param showYSubTicks The new showYSubTicks.
         */
        setShowYSubTicks(showYSubTicks: boolean): void;
        /**
         * Creates the canvas where axis, grid and subgrid are drawing.
         */
        __initCanvas(canvasWidth: number, canvasHeight: number): void;
        /**
         * Sets the hasChanged.
         * @param hasChanged The hasChanged attribute.
         */
        setHasChanged(hasChanged: boolean): void;
    }
    module IChart {
        enum Position {
            Background = 0,
            Foreground = 1
        }
    }
}
declare module TcHmiCharting {
    class LineChart extends TcHmiCharting.IChart {
        /** The lineGraph as LineGraph.Line[]. */
        protected __lineGraph: LineGraph.Line[];
        /** The lineGraphs as  LineGraph[]. */
        protected __lineGraphs: LineGraph[];
        /** The lineChanged as boolean. */
        protected __lineChanged: boolean;
        /** The widthLeft as number. */
        protected __widthLeft: number | null;
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: number;
        /**
         * Creates a new LineChart.
         * @param elementRoot The root element where the canvas elements added to.
         */
        constructor(elementRoot: JQuery, canvasWidth: number, canvasHeight: number, referenceLinesPosition: IChart.Position);
        /**
         * Delete the yAxis at index.
         * @param index The index.
         */
        deleteYAxis(index: number): void;
        /**
         * Delete all yAxis.
         */
        deleteAllYAxis(): void;
        /**
         * Delete all referenceLines.
         */
        deleteAllReferenceLines(): void;
        /**
         * Adds a lineGraph.
         * @param newGraph The newGraph (yAxis and points for drawing).
         */
        addGraph(newGraph: LineGraph.Line): void;
        /**
         * Delete the graph at index.
         * @param index The index.
         */
        deleteGraph(index: number): void;
        /**
         * Delete all graphs.
         */
        deleteAllGraphs(): void;
        /**
         * Removes all canvas elements and clears all arrays.
         */
        remove(): void;
        /**
         * Clears all canvas elements and calls all delete functions.
         */
        clear(width: number, height: number): void;
        /**
         * Returns the lineGraph.
         * @returns The lineGraph.
         */
        getLines(): LineGraph.Line[];
        /**
         * Returns the lineGraph at position.
         * @param index The index.
         * @returns The lineGraph.
         */
        getLinesAtPosition(index: number): LineGraph.Line;
        /**
         * Returns the lineGraphs.
         * @returns The lineGraphs.
         */
        getLineGraphs(): LineGraph[];
        /**
         * Returns the lineGraphs at position.
         * @param index The index.
         * @returns The lineGraphs.
         */
        getLineGraphsAtPosition(index: number): LineGraph;
        /**
         * Returns the drawingBorder of the lineGraph.
         */
        getDrawingBorder(): number;
        /**
         * Sets the lineChanged which saved if graphs must be redrawing.
         * @param lineChanged The lineChanged attribute.
         */
        setLineChanged(lineChanged: boolean): void;
        /**
         * Draws the lineChart if anything is changed.
         */
        draw(): void;
    }
}
declare module TcHmiCharting {
    class LineAreaChart extends TcHmiCharting.IChart {
        /** The lineGraph as LineGraph.Line[]. */
        protected __lineGraph: LineAreaGraph.Line[];
        /** The lineGraphs as  LineGraph[]. */
        protected __lineGraphs: LineAreaGraph[];
        /** The lineChanged as boolean. */
        protected __lineChanged: boolean;
        /** The widthLeft as number. */
        protected __widthLeft: number | null;
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: number;
        /**
         * Creates a new LineChart.
         * @param elementRoot The root element where the canvas elements added to.
         */
        constructor(elementRoot: JQuery, canvasWidth: number, canvasHeight: number, referenceLinesPosition: IChart.Position);
        /**
         * Delete the yAxis at index.
         * @param index The index.
         */
        deleteYAxis(index: number): void;
        /**
         * Delete all yAxis.
         */
        deleteAllYAxis(): void;
        /**
         * Delete all referenceLines.
         */
        deleteAllReferenceLines(): void;
        /**
         * Adds a lineGraph.
         * @param newGraph The newGraph (optional yAxis and points for drawing).
         */
        addGraph(newGraph: LineAreaGraph.Line): void;
        /**
         * Delete the graph at index.
         * @param index The index.
         */
        deleteGraph(index: number): void;
        /**
         * Delete all graphs.
         */
        deleteAllGraphs(): void;
        /**
         * Removes all canvas elements and clears all arrays.
         */
        remove(): void;
        /**
         * Clears all canvas elements and calls all delete functions.
         */
        clear(width: number, height: number): void;
        /**
         * Returns the lineGraph.
         * @returns The lineGraph.
         */
        getLines(): LineAreaGraph.Line[];
        /**
         * Returns the lineGraph at position.
         * @param index The index.
         * @returns The lineGraph.
         */
        getLinesAtPosition(index: number): LineAreaGraph.Line;
        /**
         * Returns the lineGraphs.
         * @returns The lineGraphs.
         */
        getLineGraphs(): LineAreaGraph[];
        /**
         * Returns the lineGraphs at position.
         * @param index The index.
         * @returns The lineGraphs.
         */
        getLineGraphsAtPosition(index: number): LineAreaGraph;
        /**
         * Returns the drawingBorder.
         * @returns The drawingBorder of the lineGraph.
         */
        getDrawingBorder(): number;
        /**
         * Sets the lineChanged which saved if graphs must be redrawing.
         * @param lineChanged The lineChanged attribute.
         */
        setLineChanged(lineChanged: boolean): void;
        /**
         * Draws the lineChart if anything is changed.
         */
        draw(): void;
    }
}
declare module TcHmiCharting {
    class BarChart extends TcHmiCharting.IChart {
        /** The barGraph as BarGraph.Bar[]. */
        protected __barGraph: BarGraph.Bar[];
        /** The barGraphs as  BarGraph[]. */
        protected __barGraphs: BarGraph[];
        /** The barChanged as boolean. */
        protected __barChanged: boolean;
        /** The widthLeft as number. */
        protected __widthLeft: number;
        /** The calculated width of the bars */
        protected __calcBarWidth: number;
        /** The width of the bars */
        protected __barWidth: number | null;
        /** The arrangement of the bars */
        protected __barGraphArrangement: string | null;
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: {
            height: number;
            width: number;
        };
        /**
         * Creates a new BarChart.
         * @param elementRoot The root element where the canvas elements added to.
         */
        constructor(elementRoot: JQuery, canvasWidth: number, canvasHeight: number, referenceLinesPosition: IChart.Position);
        /**
         * Delete the yAxis at index.
         * @param index The index.
         */
        deleteYAxis(index: number): void;
        /**
         * Delete all yAxis.
         */
        deleteAllYAxis(): void;
        /**
         * Delete all referenceLines.
         */
        deleteAllReferenceLines(): void;
        /**
         * Adds a barGraph.
         * @param newGraph The newGraph (yAxis and values for drawing).
         */
        addGraph(newGraph: BarGraph.Bar): void;
        /**
         * Delete the graph at index.
         * @param index The index.
         */
        deleteGraph(index: number): void;
        /**
         * Delete all graphs.
         */
        deleteAllGraphs(): void;
        /**
         * Removes all canvas elements and clears all arrays.
         */
        remove(): void;
        /**
         * Clears all canvas elements and calls all delete functions.
         */
        clear(width: number, height: number): void;
        /**
         * Returns the barGraph.
         * @returns The barGraph.
         */
        getBars(): BarGraph.Bar[];
        /**
         * Returns the barGraph at position.
         * @param index The index.
         * @returns The barGraph.
         */
        getBarsAtPosition(index: number): BarGraph.Bar;
        /**
         * Returns the barGraphs.
         * @returns The barGraphs.
         */
        getBarGraphs(): BarGraph[];
        /**
         * Returns the barGraphs at position.
         * @param index The index.
         * @returns The barGraphs.
         */
        getBarGraphsAtPosition(index: number): BarGraph;
        /**
         * Sets the barWidth.
         * @param barWidth The new barWidth.
         */
        setBarWidth(barWidth: number | null): void;
        /**
         * Sets the graphArrangement.
         * @param graphArrangement The new graphArrangement.
         */
        setBarGraphArrangement(barGraphArrangement: string | null): void;
        /**
         * Sets the barChanged which saved if graphs must be redrawing.
         * @param lineChanged The barChanged attribute.
         */
        setBarChanged(barChanged: boolean): void;
        /**
         * Draws the barChart if anything is changed.
         */
        draw(): void;
    }
}
declare module TcHmiCharting {
    class IAxis {
        /** The minimum for logarithmic y axis in pixel as number. */
        static readonly LOGARITHMIC_Y_MINIMUM: number;
        /** The minimum for logarithmic x axis in pixel as number. */
        static readonly LOGARITHMIC_X_MINIMUM: number;
        /** The showAxis as boolean. */
        protected __showAxis: boolean;
        /** The showLabels as boolean. */
        protected __showLabels: boolean;
        /** The mainTickStartValue as number. */
        protected __mainTickStartValue: number | null;
        /** The mainTickSteps as number. */
        protected __mainTickSteps: number | null;
        /** The mainTickEndValue as number. */
        protected __mainTickEndValue: number | null;
        /** The subTickSteps as number. */
        protected __subTickSteps: number | null;
        /** The showSubTicks as boolean. */
        protected __showSubTicks: boolean;
        /** The mainTickStartValueOverride as number. */
        protected __mainTickStartValueOverride: number | null;
        /** The mainTickEndValueOverride as number. */
        protected __mainTickEndValueOverride: number | null;
        /** The labelFontFamily as string. */
        protected __labelFontFamily: TcHmi.FontFamily | null;
        /** The labelFontSize as number. */
        protected __labelFontSize: number | null;
        /** The labelFontSizeUnit as string. */
        protected readonly __labelFontSizeUnit = "px";
        /** The labelFontWeight as string. */
        protected __labelFontWeight: TcHmi.FontWeight | null;
        /** The labelFontColor as string. */
        protected __labelFontColor: string | null;
        /** The axisWidth as number. */
        protected __axisWidth: number | null;
        /** The axisColor as string. */
        protected __axisColor: string | null;
        /** The showAxisName as boolean. */
        protected __showAxisName: boolean;
        /** The axisName as string. */
        protected __axisName: string | null;
        /** The axisNameFontFamily as string. */
        protected __axisNameFontFamily: TcHmi.FontFamily | null;
        /** The axisNameFontSize as number. */
        protected __axisNameFontSize: number | null;
        /** The axisNameFontSizeUnit as string. */
        protected __axisNameFontSizeUnit: string;
        /** The axisNameFontWeight as string. */
        protected __axisNameFontWeight: TcHmi.FontWeight | null;
        /** The axisNameFontColor as string. */
        protected __axisNameFontColor: string | null;
        /** The decimalPlaces as number. */
        protected __decimalPlaces: number | null;
        /** The unit as string. */
        protected __unit: string | null;
        /** The autoScaling as boolean. */
        protected __autoScaling: boolean;
        /** The logarithmicScale of yAxis as boolean. */
        protected __logarithmicScale: boolean;
        /** The axisLabeling as AxisLabeling. */
        protected __axisLabeling: IAxis.AxisLabeling;
        /** The id as number. */
        protected __id: number;
        /** The canvas element as HTMLCanvasElement. */
        protected __canvas: HTMLCanvasElement;
        /** The canvas context as CanvasRenderingContext2D. */
        protected __context: CanvasRenderingContext2D | null;
        /**
         * Creates a new IAxis.
         * @param id The id of IAxis (index in parent array).
         * @param canvas The canvas element where drawing the axis.
         */
        constructor(id: number, canvas: HTMLCanvasElement);
        /**
         * Returns an array with all labels as string for the axis.
         * @returns The array with all labels as string.
         */
        getCalculatedLabels(): string[];
        /**
         * Returns an array with all labels as number for the axis.
         * @returns The array with all labels as number.
         */
        getCalculatedNumbers(): number[];
        /**
         * Returns an array with min/max value as number for the axis.
         * @returns The array with min/max value as number.
         */
        ScaleLogarithmic(connectedRange: Array<number>, divisions: number): number[];
        private GetDekade;
        /**
         * Returns the calculated width of a string.
         * @param label The label for calculating.
         * @returns The width of label.
         */
        calculateLabelWidth(label: string | null): number;
        /**
         * Returns the calculated width of the longest label of all axis labels.
         * @returns The width of the longest label.
         */
        getLongestTextWidth(): number;
        /**
         * Returns the height of the label content.
         * @param content The content of label.
         * @returns The height of the content label.
         */
        calculateLabelHeight(content: string | null): number;
        /**
         * Returns the height of the axis name content.
         * @param content The content of axis name.
         * @returns The height of the axis name content.
         */
        calculateAxisNameHeight(content: string): number;
        /**
         * Returns the width of the axis name content.
         * @param content The content of axis name.
         * @returns The width of the axis name content.
         */
        calculateAxisNameWidth(content: string): number;
        /**
         * Returns the id.
         * @returns The id of the axis.
         */
        getId(): number;
        /**
         * Sets the showLabels.
         * @param showLabels The new showLabels.
         */
        setShowLabels(showLabels: boolean): void;
        /**
         * Sets the showAxis.
         * @param showAxis The new showAxis.
         */
        setShowAxis(showAxis: boolean): void;
        /**
         * Returns the showAxis.
         * @returns The showAxis value.
         */
        getShowAxis(): boolean;
        /**
         * Returns the showLabels.
         * @returns The showLabels.
         */
        getShowLabels(): boolean;
        /**
         * Sets the showSubTicks.
         * @param showSubTicks The new showSubTicks.
         */
        setShowSubTicks(showSubTicks: boolean): void;
        /**
         * Returns the showSubTicks.
         * @returns The showSubTicks.
         */
        getShowSubTicks(): boolean;
        /**
         * Sets the mainTickStartValue.
         * @param mainTickStartValue The new mainTickStartValue.
         */
        setMainTickStartValue(mainTickStartValue: number | null): void;
        /**
         * Returns the mainTickStartValue.
         * @returns The mainTickStartValue.
         */
        getMainTickStartValue(): number | null;
        /**
         * Sets the mainTickSteps.
         * @param mainTickSteps The new mainTickSteps.
         */
        setMainTickSteps(mainTickSteps: number | null): void;
        /**
         * Returns the mainTickSteps.
         * @returns The mainTickSteps.
         */
        getMainTickSteps(): number | null;
        /**
         * Sets the mainTickEndValue.
         * @param mainTickEndValue The new mainTickEndValue.
         */
        setMainTickEndValue(mainTickEndValue: number | null): void;
        /**
         * Returns the mainTickEndValue.
         * @returns The mainTickEndValue.
         */
        getMainTickEndValue(): number | null;
        /**
         * Sets the subTickSteps.
         * @param subTickSteps The new subTickSteps.
         */
        setSubTickSteps(subTickSteps: number | null): void;
        /**
         * Returns the subTickSteps.
         * @returns The subTickSteps.
         */
        getSubTickSteps(): number | null;
        /**
         * Sets the labelFontFamily.
         * @param labelFontFamily The new labelFontFamily.
         */
        setLabelFontFamily(labelFontFamily: TcHmi.FontFamily | null | undefined): void;
        /**
         * Returns the labelFontFamily.
         * @returns The labelFontFamily.
         */
        getLabelFontFamily(): string | null;
        /**
         * Sets the labelFontSize.
         * @param labelFontSize  The new labelFontSize.
         */
        setLabelFontSize(labelFontSize: number | null): void;
        /**
         * Returns the labelFontSize.
         * @returns The labelFontSize.
         */
        getLabelFontSize(): number | null;
        /**
         * Sets the labelFontSizeUnit.
         * @param labelFontSizeUnit  The new labelFontSizeUnit.
         */
        setLabelFontSizeUnit(labelFontSizeUnit: TcHmi.FontSizeUnit | null): void;
        /**
         * Returns the labelFontSizeUnit.
         * @returns The labelFontSizeUnit.
         */
        getLabelFontSizeUnit(): string;
        /**
        * Sets the labelFontWeight.
        * @param labelFontWeight  The new labelFontWeight.
\s        */
        setLabelFontWeight(labelFontWeight: TcHmi.FontWeight | null): void;
        /**
         * Returns the labelFontWeight.
         * @returns The labelFontWeight.
         */
        getLabelFontWeight(): "Normal" | "Bold" | "Auto" | null;
        /**
         * Sets the labelFontColor.
         * @param labelFontColor  The new labelFontColor.
         */
        setLabelFontColor(labelFontColor: string | null): void;
        /**
         * Returns the labelFontColor.
         * @returns The labelFontColor.
         */
        getLabelFontColor(): string | null;
        /**
         * Sets the showAxisName.
         * @param showAxisName  The new showAxisName.
         */
        setShowAxisName(showAxisName: boolean): void;
        /**
         * Returns the showAxisName.
         * @returns The showAxisName.
         */
        getShowAxisName(): boolean;
        /**
         * Sets the axisWidth.
         * @param axisWidth  The new axisWidth.
         */
        setAxisWidth(axisWidth: number | null): void;
        /**
         * Returns the axisWidth.
         * @returns The axisWidth.
         */
        getAxisWidth(): number | null;
        /**
         * Sets the axisColor.
         * @param axisColor  The new axisColor.
         */
        setAxisColor(axisColor: string | null): void;
        /**
         * Returns the axisColor.
         * @returns The axisColor.
         */
        getAxisColor(): string | null;
        /**
         * Returns the axisName.
         * @returns The axisName.
         */
        getAxisName(): string | null;
        /**
         * Sets the axisNameFontFamily.
         * @param axisNameFontFamily  The new axisNameFontFamily.
         */
        setAxisNameFontFamily(axisNameFontFamily: TcHmi.FontFamily | null | undefined): void;
        /**
         * Returns the axisNameFontFamily.
         * @returns The axisNameFontFamily.
         */
        getAxisNameFontFamily(): string | null;
        /**
         * Sets the axisNameFontSize.
         * @param axisNameFontSize  The new axisNameFontSize.
         */
        setAxisNameFontSize(axisNameFontSize: number | null): void;
        /**
         * Returns the axisNameFontSize.
         * @returns The axisNameFontSize.
         */
        getAxisNameFontSize(): number | null;
        /**
         * Sets the axisNameFontSizeUnit.
         * @param axisNameFontSizeUnit  The new axisNameFontSizeUnit.
         */
        setAxisNameFontSizeUnit(axisNameFontSizeUnit: TcHmi.FontSizeUnit | null): void;
        /**
         * Returns the axisNameFontSizeUnit.
         * @returns The axisNameFontSizeUnit.
         */
        getAxisNameFontSizeUnit(): string;
        /**
         * Sets the axisNameFontWeight.
         * @param axisNameFontWeight  The new axisNameFontWeight.
         */
        setAxisNameFontWeight(axisNameFontWeight: TcHmi.FontWeight | null): void;
        /**
         * Returns the axisNameFontWeight.
         * @returns The axisNameFontWeight.
         */
        getAxisNameFontWeight(): "Normal" | "Bold" | "Auto" | null;
        /**
         * Sets the axisNameFontColor.
         * @param axisNameFontColor  The new axisNameFontColor.
         */
        setAxisNameFontColor(axisNameFontColor: string | null): void;
        /**
         * Returns the axisNameFontColor.
         * @returns The axisNameFontColor.
         */
        getAxisNameFontColor(): string | null;
        /**
         * Sets the decimalPlaces.
         * @param decimalPlaces  The new decimalPlaces.
         */
        setDecimalPlaces(decimalPlaces: number | null): void;
        /**
         * Returns the decimalPlaces.
         * @returns The decimalPlaces.
         */
        getDecimalPlaces(): number | null;
        /**
         * Sets the unit.
         * @param unit  The new unit.
         */
        setUnit(unit: string | null): void;
        /**
         * Returns the unit.
         * @returns The unit.
         */
        getUnit(): string | null;
        /**
         * Sets the logarithmicScale.
         * @param logarithmicScale The new logarithmicScale.
         */
        setLogarithmicScale(logarithmicScale: boolean): void;
        /**
         * Returns the logarithmicScale.
         * @returns The logarithmicScale value.
         */
        getLogarithmicScale(): boolean;
        /**
         * Sets the axisLabeling.
         * @param axisLabeling The new axisLabeling.
         */
        setAxisLabeling(axisLabeling: IAxis.AxisLabeling): void;
        /**
         * Returns the axisLabeling.
         * @returns The axisLabeling value.
         */
        getAxisLabeling(): IAxis.AxisLabeling;
        /**
         * Sets the autoScaling.
         * @param autoScaling  The new autoScaling.
         */
        setAutoScaling(autoScaling: boolean): void;
        /**
         * Returns the autoScaling.
         * @returns The autoScaling.
         */
        getAutoScaling(): boolean;
        /**
         * Sets the mainTickStartValueOverride.
         * @param mainTickStartValueOverride  The new mainTickStartValueOverride.
         */
        setMainTickStartValueOverride(mainTickStartValueOverride: number | null): void;
        /**
         * Returns the mainTickStartValueOverride.
         * @returns The mainTickStartValueOverride.
         */
        getMainTickStartValueOverride(): number | null;
        /**
         * Sets the mainTickEndValueOverride.
         * @param mainTickEndValueOverride  The new mainTickEndValueOverride.
         */
        setMainTickEndValueOverride(mainTickEndValueOverride: number | null): void;
        /**
         * Returns the mainTickEndValueOverride.
         * @returns The mainTickEndValueOverride.
         */
        getMainTickEndValueOverride(): number | null;
    }
    module IAxis {
        enum Position {
            Left = 0,
            Right = 1
        }
        enum AxisLabeling {
            Number = 0,
            Scientific = 1,
            Auto = 2
        }
    }
}
declare module TcHmiCharting {
    class XAxis extends TcHmiCharting.IAxis {
        /** The width of yAxis as number. */
        protected __width: number;
        /** The height of yAxis as number. */
        protected __height: number;
        /** The lineHeight of yAxis as number. */
        protected __lineWidth: number;
        /** The diffStartLabelAndLine of yAxis as number. */
        protected __diffStartLabelAndLine: number;
        /** The diffEndLabelAndLine of yAxis as number. */
        protected __diffEndLabelAndLine: number;
        /** The xAxisCallback as (e) => void. */
        protected __xAxisCallback: null | ((e: number) => string | null);
        /** The beginning of x Axis */
        protected __xAxisLeftWidth: number;
        /** The logarithmicXPointsForSubgrid of yAxis as number[]. */
        protected __logarithmicXPointsForSubgrid: number[];
        /**
         * Creates a new YAxis.
         * @param id The number of yAxis.
         * @param canvas The canvas element where drawing the grid.
         */
        constructor(id: number, canvas: HTMLCanvasElement);
        /**
         * Draws the xAxis to the canvas.
         * @param startPoint The startpoint to drawing (bottom/left).
         * @param endPoint The endpoint to drawing (top/right).
         */
        drawAxis(startPoint: LineGraph.Point, endPoint: LineGraph.Point): void;
        /**
         * Sets the axisName.
         * @param axisName The new axisName.
         */
        setAxisName(axisName: string | null): void;
        /**
         * Returns the height.
         * @returns The height of the xAxis.
         */
        getHeight(): number;
        /**
         * Returns the width.
         * @returns The width of the xAxis.
         */
        getWidth(): number;
        /**
         * Returns the lineHeight.
         * @returns The lineHeight of the xAxis.
         */
        getLineWidth(): number;
        /**
         * Returns the diffStartLabelAndLine.
         * @returns The diffStartLabelAndLine of the xAxis.
         */
        getDiffStartLabelAndLine(): number;
        /**
         * Returns the diffEndLabelAndLine.
         * @returns The diffStartLabelAndLine of the xAxis.
         */
        getDiffEndLabelAndLine(): number;
        /**
         * Sets the xAxisCallback.
         * @param callback The new xAxisCallback.
         */
        setXAxisCallback(callback: (e: number) => string | null): void;
        /**
         * Returns the xAxisCallback.
         * @returns The yAisCallback of the xAxis.
         */
        getXAxisCallback(): ((e: number) => string | null) | null;
        /**
         * Returns the xAxisLeftWidth.
         * @returns The xAxisLeftWidth of the xAxis.
         */
        getXAxisLeftWidth(): number;
        /**
         * Returns the logarithmicXPointsForSubgrid.
         * @returns The logarithmicXPointsForSubgrid of the yAxis.
         */
        getLogarithmicXPointsForSubgrid(): number[];
    }
}
declare module TcHmiCharting {
    class YAxis extends TcHmiCharting.IAxis {
        /** The position as IAxis.Position. */
        protected __position: IAxis.Position;
        /** The width of yAxis as number. */
        protected __width: number;
        /** The height of yAxis as number. */
        protected __height: number;
        /** The lineHeight of yAxis as number. */
        protected __lineHeight: number;
        /** The diffStartLabelAndLine of yAxis as number. */
        protected __diffStartLabelAndLine: number;
        /** The diffEndLabelAndLine of yAxis as number. */
        protected __diffEndLabelAndLine: number;
        /** The yAxisCallback as (e) => void. */
        protected __yAxisCallback: null | ((e: number) => string | null);
        /** The logarithmicYPointsForSubgrid of yAxis as number[]. */
        protected __logarithmicYPointsForSubgrid: number[];
        /**
         * Creates a new YAxis.
         * @param id The number of yAxis.
         * @param canvas The canvas element where drawing the grid.
         * @param position The position where the yAxis should added.
         */
        constructor(id: number, canvas: HTMLCanvasElement, position: IAxis.Position);
        /**
         * Draws the yAxis to the canvas.
         * @param startPoint The startpoint to drawing (bottom/left).
         * @param endPoint The endpoint to drawing (top/right).
         * @param showOnlyYAxis Only y Axis is drawing..
         */
        drawAxis(startPoint: LineGraph.Point, endPoint: LineGraph.Point, showOnlyYAxis: boolean, labelSize: {
            first: number;
            latest: number;
        }): void;
        /**
         * Sets the position.
         * @param position The new position.
         */
        setPosition(position: IAxis.Position): void;
        /**
         * Returns the position.
         * @returns The position.
         */
        getPosition(): IAxis.Position;
        /**
         * Sets the axisName.
         * @param axisName The new axisName.
         */
        setAxisName(axisName: string | null): void;
        /**
         * Returns the height.
         * @returns The height of the yAxis.
         */
        getHeight(): number;
        /**
         * Returns the width.
         * @returns The width of the yAxis.
         */
        getWidth(): number;
        /**
         * Returns the lineHeight.
         * @returns The lineHeight of the yAxis.
         */
        getLineHeight(): number;
        /**
         * Returns the diffStartLabelAndLine.
         * @returns The diffStartLabelAndLine of the yAxis.
         */
        getDiffStartLabelAndLine(): number;
        /**
         * Returns the diffEndLabelAndLine.
         * @returns The diffStartLabelAndLine of the yAxis.
         */
        getDiffEndLabelAndLine(): number;
        /**
         * Sets the yAxisCallback.
         * @param callback The new yAxisCallback.
         */
        setYAxisCallback(callback: null | ((e: number) => string | null)): void;
        /**
         * Returns the yAxisCallback.
         * @returns The yAisCallback of the yAxis.
         */
        getYAxisCallback(): ((e: number) => string | null) | null;
        /**
         * Returns the logarithmicYPointsForSubgrid.
         * @returns The logarithmicYPointsForSubgrid of the yAxis.
         */
        getLogarithmicYPointsForSubgrid(): number[];
    }
}
declare module TcHmiCharting {
    class IGrid {
        /** The showHorizontalLines as boolean. */
        protected __showHorizontalLines: boolean;
        /** The showVerticalLines as boolean. */
        protected __showVerticalLines: boolean;
        /** The lineWidth as positive number without zero. */
        protected __lineWidth: number | null;
        /** The lineColor as string. */
        protected __lineColor: string | null;
        /** The line style as enum. */
        protected __lineStyle: string | null;
        /** The backgroundColor as string. */
        protected __backgroundColor: string | null;
        /** The canvas as HTMLCanvasElement. */
        protected __canvas: HTMLCanvasElement;
        /** The canvas context as CanvasRenderingContext2D. */
        protected __context: CanvasRenderingContext2D | null;
        /**
         * Creates a new IGrid.
         * @param canvas The canvas element to drawing.
         */
        constructor(canvas: HTMLCanvasElement);
        /**
         * Sets the lineWidth.
         * @param lineWidth The new lineWidth.
         */
        setLineWidth(lineWidth: number | null): void;
        /**
         * Returns the lineWidth.
         * @returns The lineWidth value.
         */
        getLineWidth(): number | null;
        /**
         * Sets the backgroundColor.
         * @param backgroundColor The new backgroundColor.
         */
        setBackgroundColor(backgroundColor: string | null): void;
        /**
         * Returns the backgroundColor.
         * @returns The backgroundColor value.
         */
        getBackgroundColor(): string | null;
        /**
         * Sets the lineColor.
         * @param lineColor The new lineColor.
         */
        setLineColor(lineColor: string | null): void;
        /**
         * Returns the lineColor.
         * @returns The lineColor value.
         */
        getLineColor(): string | null;
        /**
         * Sets the lineStyle.
         * @param lineStyle The new lineStyle.
         */
        setLineStyle(lineStyle: string | null): void;
        /**
         * Returns the lineStyle.
         * @returns The lineStyle value.
         */
        getLineStyle(): string | null;
        /**
         * Sets the showVerticalLines.
         * @param showVerticalLines The new showVerticalLines.
         */
        setShowVerticalLines(showVerticalLines: boolean): void;
        /**
         * Returns the showVerticalLines.
         * @returns The showVerticalLines value.
         */
        getShowVerticalLines(): boolean;
        /**
         * Sets the showHorizontalLines.
         * @param showHorizontalLines The new showHorizontalLines.
         */
        setShowHorizontalLines(showHorizontalLines: boolean): void;
        /**
         * Returns the showHorizontalLines.
         * @returns The showHorizontalLines value.
         */
        getShowHorizontalLines(): boolean;
    }
    module IGrid {
        interface Rect {
            startPoint: LineGraph.Point;
            width: number;
            height: number;
        }
        enum LineStyle {
            Dotted = 0,
            Dashed = 1,
            Solid = 2
        }
    }
}
declare module TcHmiCharting {
    class Grid extends TcHmiCharting.IGrid {
        /**
         * Creates a new Grid.
         * @param canvas The canvas element where drawing the grid.
         */
        constructor(canvas: HTMLCanvasElement);
        /**
         * Draws the grid to the canvas.
         * @param startPoint The startpoint to drawing (bottom/left).
         * @param width The width of the grid.
         * @param height The height of the grid.
         * @param numberOfWidthLines The number of width lines.
         * @param numberOfHeightLines The number of height lines.
         * @param drawingBorder The border (bigger than grid) of all sites.
         */
        draw(startPoint: LineGraph.Point, width: number, height: number, numberOfWidthLines: number, numberOfHeightLines: number, drawingBorder: {
            height: number;
            width: number;
        }): void;
        /**
         * Draws the grid to the canvas.
         * @param verticalLines The vertical lines with start and end point of a line.
         * @param horizontalLines The horizontal lines with start and end point of a line.
         */
        drawLines(verticalLines: {
            start: LineGraph.Point;
            end: LineGraph.Point;
        }[], horizontalLines: {
            start: LineGraph.Point;
            end: LineGraph.Point;
        }[]): void;
    }
}
declare module TcHmiCharting {
    class Subgrid extends TcHmiCharting.IGrid {
        /**
         * Creates a new Grid.
         * @param canvas The canvas element where drawing the grid.
         */
        constructor(canvas: HTMLCanvasElement);
        /**
         * Draws the subgrid to the canvas.
         * @param startPoint The startpoint to drawing (bottom/left).
         * @param width The width of the subgrid.
         * @param height The height of the subgrid.
         * @param numberOfLinesBetweenMainGridWidth The number of lines between maingrid in width.
         * @param widthBetweenMainGrid The width between two main grid lines.
         * @param numberOfLinesBetweenMainGridHeight The number of lines between maingrid in height.
         * @param heightBetweenMainGrid The height between two main grid lines.
         * @param numberOfMainGridWidthLines The number of main grid width lines.
         * @param numberOfMainGridHeightLines The number of main grid height lines.
         * @param gridLineWidth The line width of the grid.
         * @param drawingBorder The border (bigger than grid) of all sites.
         */
        draw(startPoint: LineGraph.Point, width: number, height: number, numberOfLinesBetweenMainGridWidth: number | null, widthBetweenMainGrid: number, numberOfLinesBetweenMainGridHeight: number | null, heightBetweenMainGrid: number, numberOfMainGridWidthLines: number, numberOfMainGridHeightLines: number, gridLineWidth: number, drawingBorder: {
            height: number;
            width: number;
        }): void;
        /**
         * Draws the subgrid to the canvas.
         * @param verticalLines The vertical lines with start and end point of a line.
         * @param horizontalLines The horizontal lines with start and end point of a line.
         */
        drawLines(verticalLines: {
            start: LineGraph.Point;
            end: LineGraph.Point;
        }[], horizontalLines: {
            start: LineGraph.Point;
            end: LineGraph.Point;
        }[]): void;
    }
}
declare module TcHmiCharting {
    class IGraph {
        /** The canvas as HTMLCanvasElement. */
        protected __canvas: HTMLCanvasElement | undefined;
        /** The canvas context as CanvasRenderingContext2D. */
        protected __context: CanvasRenderingContext2D | null;
        /**
         * Creates a new IGraph.
         * @param canvas The optional canvas element where drawing the grid.
         */
        constructor(canvas?: HTMLCanvasElement);
        getColorFromColorRanges(colorRanges: ColorRanges[] | null | undefined, value: number, defaultColor: string): string;
    }
    interface ColorRanges {
        color: TcHmi.SolidColor;
        filterInstance?: TcHmi.FilterInstance;
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
declare module TcHmiCharting {
    class LineGraph extends TcHmiCharting.IGraph {
        /** The lineWidth as positive number without zero. */
        protected __lineWidth: number | null;
        /** The lineColor as string. */
        protected __lineColor: string | null;
        /** The pointDot as boolean. */
        protected __pointDot: boolean;
        /** The pointDotRadius as number. */
        protected __pointDotRadius: number | null;
        /** The pointDotFillCOlor as string. */
        protected __pointDotFillColor: string | null;
        /** The pointDotStrokeWidth as number. */
        protected __pointDotStrokeWidth: number | null;
        /** The pointDotStrokeColor as string. */
        protected __pointDotStrokeColor: string | null;
        /** The middlepoints of the lineGraph dots as array*/
        protected __points: LineGraph.Point[];
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: number;
        /** The xScaleFactor as number. */
        protected __xScaleFactor: number;
        /** The yScaleFactor as number. */
        protected __yScaleFactor: number;
        /** The fillMode as FillMode. */
        protected __fillMode: FillMode;
        /** The fillColor as string. */
        protected __fillColor: string | null;
        /** The fillTransparency as number. */
        protected __fillTransparency: number | null;
        /**
         * Creates a new LineGraph.
         * @param canvas The optional canvas element to drawing.
         */
        constructor(canvas?: HTMLCanvasElement);
        /**
         * Draws the lineGraph to the canvas.
         * @param line The line (yAxis and points) to drawing.
         * @param xAxis The xAxis.
         */
        draw(line: LineGraph.Line, xAxis: XAxis): void;
        /**
         * Returns the middlePoints of the lineGraph dots.
         * @returns The middlePoints of the lineGraph dots.
         */
        getPoints(): LineGraph.Point[];
        /**
         * Removes all middlePoints of the lineGraph.
         */
        removePoints(): void;
        /**
         * Sets the lineWidth.
         * @param lineWidth The new lineWidth.
         */
        setLineWidth(lineWidth: number | null): void;
        /**
         * Returns the lineWidth.
         * @returns The lineWidth of the lineGraph.
         */
        getLineWidth(): number | null;
        /**
         * Sets the lineColor.
         * @param lineColor The new lineColor.
         */
        setLineColor(lineColor: string | null): void;
        /**
         * Returns the lineColor.
         * @returns The lineColor of the lineGraph.
         */
        getLineColor(): string | null;
        /**
         * Sets the pointDot.
         * @param pointDot The new pointDot.
         */
        setPointDot(pointDot: boolean): void;
        /**
         * Returns the pointDot.
         * @returns The pointDot of the lineGraph.
         */
        getPointDot(): boolean;
        /**
         * Sets the pointDotRadius.
         * @param pointDotRadius The new pointDotRadius.
         */
        setPointDotRadius(pointDotRadius: number | null): void;
        /**
         * Returns the pointDotRadius.
         * @returns The pointDotRadius of the lineGraph.
         */
        getPointDotRadius(): number | null;
        /**
         * Sets the pointDotFillColor.
         * @param pointDotFillColor The new pointDotFillColor.
         */
        setPointDotFillColor(pointDotFillColor: string | null): void;
        /**
         * Returns the pointDotFillColor.
         * @returns The pointDotFillColor of the lineGraph.
         */
        getPointDotFillColor(): string | null;
        /**
         * Sets the pointDotStrokeWidth.
         * @param pointDotStrokeWidth The new pointDotStrokeWidth.
         */
        setPointDotStrokeWidth(pointDotStrokeWidth: number | null): void;
        /**
         * Returns the pointDotStrokeWidth.
         * @returns The pointDotStrokeWidth of the lineGraph.
         */
        getPointDotStrokeWidth(): number | null;
        /**
         * Sets the pointDotStrokeColor.
         * @param pointDotStrokeColor The new pointDotStrokeColor.
         */
        setPointDotStrokeColor(pointDotStrokeColor: string | null): void;
        /**
         * Returns the pointDotStrokeColor.
         * @returns The pointDotStrokeColor of the lineGraph.
         */
        getPointDotStrokeColor(): string | null;
        /**
         * Sets the canvas.
         * @param canvas The new canvas.
         */
        setCanvas(canvas: HTMLCanvasElement): void;
        /**
         * Returns the canvas.
         * @returns The canvas of the lineGraph.
         */
        getCanvas(): HTMLCanvasElement | undefined;
        /**
         * Sets the drawingBorder.
         * @param drawingBorder The new drawingBorder.
         */
        setDrawingBorder(drawingBorder: number): void;
        /**
         * Returns the xScaleFactor.
         * @returns The xScaleFactor of the barGraph.
         */
        getXScaleFactor(): number;
        /**
         * Sets the xScaleFactor.
         * @param xScaleFactor The new xScaleFactor.
         */
        setXScaleFactor(xScaleFactor: number | null | undefined): void;
        /**
         * Returns the yScaleFactor.
         * @returns The yScaleFactor of the barGraph.
         */
        getYScaleFactor(): number;
        /**
         * Sets the yScaleFactor.
         * @param yScaleFactor The new yScaleFactor.
         */
        setYScaleFactor(yScaleFactor: number | null | undefined): void;
        /**
         * Returns the fillMode.
         * @returns The fillMode of the barGraph.
         */
        getFillMode(): FillMode;
        /**
         * Sets the fillMode.
         * @param fillMode The new fillMode.
         */
        setFillMode(fillMode: FillMode): void;
        /**
         * Returns the fillColor.
         * @returns The fillColor of the barGraph.
         */
        getFillColor(): string | null;
        /**
         * Sets the fillColor.
         * @param fillColor The new fillColor.
         */
        setFillColor(fillColor: string): void;
        /**
         * Returns the fillTransparency.
         * @returns The fillTransparency of the barGraph.
         */
        getFillTransparency(): number | null;
        /**
         * Sets the fillTransparency.
         * @param fillTransparency The new fillTransparency.
         */
        setFillTransparency(fillTransparency: number | null): void;
    }
    module LineGraph {
        interface Line {
            points: Point[];
            yAxis: YAxis | null;
        }
        interface Point {
            x: number;
            y: number;
        }
    }
}
declare module TcHmiCharting {
    class LineAreaGraph extends TcHmiCharting.IGraph {
        /** The lineWidth as positive number without zero. */
        protected __lineWidth: number | null;
        /** The lineColor as string. */
        protected __lineColor: string | null;
        /** The pointDot as boolean. */
        protected __pointDot: boolean;
        /** The pointDotRadius as number. */
        protected __pointDotRadius: number | null;
        /** The pointDotFillCOlor as string. */
        protected __pointDotFillColor: string | null;
        /** The pointDotStrokeWidth as number. */
        protected __pointDotStrokeWidth: number | null;
        /** The pointDotStrokeColor as string. */
        protected __pointDotStrokeColor: string | null;
        /** The middlepoints with values of the lineGraph dots as array*/
        protected __points: LineAreaGraph.PointValueAndPosition[];
        /** The middlepoints with values of the lineGraph areas as array*/
        protected __areaPoints: Area.AreaValueAndPosition[];
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: number;
        /** The scaleFactor as number. */
        protected __scaleFactor: number;
        /** The fillMode as FillMode. */
        protected __fillMode: FillMode;
        /** The fillColor as string. */
        protected __fillColor: string | null;
        /** The fillTransparency as number. */
        protected __fillTransparency: number | null;
        /** The area as Area[]*/
        protected __areas: LineAreaGraph.Area[];
        /**
         * Creates a new LineGraph.
         * @param canvas The optional canvas element to drawing.
         */
        constructor(canvas?: HTMLCanvasElement);
        /**
         * Draws the lineGraph areas to the canvas.
         * @param line The line (yAxis and points) to drawing.
         * @param xAxis The xAxis.
         */
        drawAreas(line: LineAreaGraph.Line, xAxis: XAxis): void;
        /**
         * Draws the lineGraph points to the canvas.
         * @param line The line (yAxis and points) to drawing.
         * @param xAxis The xAxis.
         */
        drawPoints(line: LineAreaGraph.Line, xAxis: XAxis): void;
        /**
         * Returns the middlePoints with values of the lineGraph dots.
         * @returns The middlePoints with values of the lineGraph dots.
         */
        getPoints(): LineAreaGraph.PointValueAndPosition[];
        /**
         * Removes all dots with middlePoints and values of the lineGraph.
         */
        removePoints(): void;
        /**
         * Returns the middlePoints with values of the lineGraph areas.
         * @returns The middlePoints with values of the lineGraph areas.
         */
        getAreaPoints(): Area.AreaValueAndPosition[];
        /**
         * Removes all areas with middlePoints and values of the lineGraph.
         */
        removeAreaPoints(): void;
        /**
         * Sets the lineWidth.
         * @param lineWidth The new lineWidth.
         */
        setLineWidth(lineWidth: number | null): void;
        /**
         * Returns the lineWidth.
         * @returns The lineWidth of the lineGraph.
         */
        getLineWidth(): number | null;
        /**
         * Sets the lineColor.
         * @param lineColor The new lineColor.
         */
        setLineColor(lineColor: string | null): void;
        /**
         * Returns the lineColor.
         * @returns The lineColor of the lineGraph.
         */
        getLineColor(): string | null;
        /**
         * Sets the pointDot.
         * @param pointDot The new pointDot.
         */
        setPointDot(pointDot: boolean): void;
        /**
         * Returns the pointDot.
         * @returns The pointDot of the lineGraph.
         */
        getPointDot(): boolean;
        /**
         * Sets the pointDotRadius.
         * @param pointDotRadius The new pointDotRadius.
         */
        setPointDotRadius(pointDotRadius: number | null): void;
        /**
         * Returns the pointDotRadius.
         * @returns The pointDotRadius of the lineGraph.
         */
        getPointDotRadius(): number | null;
        /**
         * Sets the pointDotFillColor.
         * @param pointDotFillColor The new pointDotFillColor.
         */
        setPointDotFillColor(pointDotFillColor: string | null): void;
        /**
         * Returns the pointDotFillColor.
         * @returns The pointDotFillColor of the lineGraph.
         */
        getPointDotFillColor(): string | null;
        /**
         * Sets the pointDotStrokeWidth.
         * @param pointDotStrokeWidth The new pointDotStrokeWidth.
         */
        setPointDotStrokeWidth(pointDotStrokeWidth: number | null): void;
        /**
         * Returns the pointDotStrokeWidth.
         * @returns The pointDotStrokeWidth of the lineGraph.
         */
        getPointDotStrokeWidth(): number | null;
        /**
         * Sets the pointDotStrokeColor.
         * @param pointDotStrokeColor The new pointDotStrokeColor.
         */
        setPointDotStrokeColor(pointDotStrokeColor: string | null): void;
        /**
         * Returns the pointDotStrokeColor.
         * @returns The pointDotStrokeColor of the lineGraph.
         */
        getPointDotStrokeColor(): string | null;
        /**
         * Sets the canvas.
         * @param canvas The new canvas.
         */
        setCanvas(canvas: HTMLCanvasElement): void;
        /**
         * Returns the canvas.
         * @returns The canvas of the lineGraph.
         */
        getCanvas(): HTMLCanvasElement | undefined;
        /**
         * Sets the drawingBorder.
         * @param drawingBorder The new drawingBorder.
         */
        setDrawingBorder(drawingBorder: number): void;
        /**
         * Adds an area.
         * @param newArea The newArea.
         */
        addArea(newArea: LineAreaGraph.Area): void;
        /**
         * Delete all areas.
         */
        deleteAllAreas(): void;
        /**
         * Delete the area at index.
         * @param index The index.
         */
        deleteArea(index: number): void;
        /**
         * Returns all areas.
         * @returns The areas of the lineGraph.
         */
        getAllAreas(): LineAreaGraph.Area[];
        /**
         * Return the area at index.
         * @returns The area at index.
         */
        getAreaAtPosition(index: number): LineAreaGraph.Area;
        /**
         * Returns the scaleFactor.
         * @returns The scaleFactor of the barGraph.
         */
        getScaleFactor(): number;
        /**
         * Sets the scaleFactor.
         * @param scaleFactor The new scaleFactor.
         */
        setScaleFactor(scaleFactor: number | null | undefined): void;
        /**
         * Returns the fillMode.
         * @returns The fillMode of the barGraph.
         */
        getFillMode(): FillMode;
        /**
         * Sets the fillMode.
         * @param fillMode The new fillMode.
         */
        setFillMode(fillMode: FillMode): void;
        /**
         * Returns the fillColor.
         * @returns The fillColor of the barGraph.
         */
        getFillColor(): string | null;
        /**
         * Sets the fillColor.
         * @param fillColor The new fillColor.
         */
        setFillColor(fillColor: string): void;
        /**
         * Returns the fillTransparency.
         * @returns The fillTransparency of the barGraph.
         */
        getFillTransparency(): number | null;
        /**
         * Sets the fillTransparency.
         * @param fillTransparency The new fillTransparency.
         */
        setFillTransparency(fillTransparency: number | null): void;
    }
    module LineAreaGraph {
        interface Line {
            points: Point[];
            yAxis?: YAxis | null;
        }
        interface Point {
            x: number;
            y?: number;
            isArea: boolean;
            bindPoints: boolean;
        }
        interface PointValueAndPosition {
            xPosition: number;
            yPosition: number;
            xValue: number;
            yValue: number;
        }
        interface Area {
            beginX: number;
            endX: number;
            backgroundColor: string | null;
            drawLineWithOnePixel?: boolean;
        }
    }
}
declare module TcHmiCharting {
    class BarGraph extends TcHmiCharting.IGraph {
        /** The barWidth as number. */
        protected __barWidth: number | null;
        /** The barColor as string. */
        protected __barColor: string | null;
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: {
            height: number;
            width: number;
        };
        /** The scaleFactor as number. */
        protected __scaleFactor: number;
        /** Defines how bars should be colored based on their value. */
        protected __colorRanges: ColorRanges[] | null | undefined;
        /**
         * Creates a new BarGraph.
         * @param elementRoot The root element where the canvas elements added to.
         */
        constructor(canvas: HTMLCanvasElement);
        /**
         * Draws the lineGraph to the canvas.
         * @param bar The bar (yAxis and values) to drawing.
         * @param xAxis The xAxis.
         */
        draw(bar: BarGraph.Bar, xAxis: XAxis): void;
        /**
         * Draws the lineGraph clustered to the canvas.
         * @param bar The bar (yAxis and values) to drawing.
         * @param xAxis The xAxis.
         * @param index The index of bar.
         */
        drawClustered(bar: BarGraph.Bar, xAxis: XAxis, index: number): void;
        /**
         * Draws the lineGraph to the canvas.
         * @param bar The bar (yAxis and values) to drawing.
         * @param xAxis The xAxis.
         * @param minValues Array which holds the minimal values. Will be filled in the function!
         */
        drawStacked(bar: BarGraph.Bar, xAxis: XAxis, minValues: number[]): void;
        /**
         * Sets the barWidth.
         * @param barWidth The new barWidth.
         */
        setBarWidth(barWidth: number | null): void;
        /**
         * Returns the barWidth.
         * @returns The barWidth of the barGraph.
         */
        getBarWidth(): number | null;
        /**
         * Sets the drawingBorder.
         * @param drawingBorder The new drawingBorder.
         */
        setDrawingBorder(drawingBorder: {
            height: number;
            width: number;
        }): void;
        /**
         * Sets the barColor.
         * @param barColor The new barColor.
         */
        setBarColor(barColor: string | null): void;
        /**
         * Returns the barColor.
         * @returns The barColor of the barGraph.
         */
        getBarColor(): string | null;
        /**
         * Sets the canvas.
         * @param canvas The new canvas.
         */
        setCanvas(canvas: HTMLCanvasElement): void;
        /**
         * Returns the canvas.
         * @returns The canvas of the lineGraph.
         */
        getCanvas(): HTMLCanvasElement | undefined;
        /**
         * Returns the scaleFactor.
         * @returns The scaleFactor of the barGraph.
         */
        getScaleFactor(): number;
        /**
         * Sets the scaleFactor.
         * @param scaleFactor The new scaleFactor.
         */
        setScaleFactor(scaleFactor: number | null | undefined): void;
        /**
         * Returns the colorRanges.
         * @returns The colorRanges of the barGraph.
         */
        getColorRanges(): ColorRanges[] | null | undefined;
        /**
         * Sets the colorRanges.
         * @param colorRanges The new colorRanges.
         */
        setColorRanges(colorRanges: ColorRanges[] | null | undefined): void;
    }
    module BarGraph {
        interface Bar {
            values: number[];
            yAxis: YAxis | null;
        }
        enum BarGraphArrangement {
            Overlapped = "Overlapped",
            Clustered = "Clustered",
            Stacked = "Stacked"
        }
    }
}
declare module TcHmiCharting {
    class HorizontalBarChart extends TcHmiCharting.IChart {
        /** The barGraph as BarGraph.Bar[]. */
        protected __barGraph: HorizontalBarGraph.Bar[];
        /** The barGraphs as  BarGraph[]. */
        protected __barGraphs: HorizontalBarGraph[];
        /** The barChanged as boolean. */
        protected __barChanged: boolean;
        /** The widthLeft as number. */
        protected __widthLeft: number;
        /** The calculated width of the bars */
        protected __calcBarWidth: number;
        /** The width of the bars */
        protected __barWidth: number | null;
        /** The arrangement of the bars */
        protected __barGraphArrangement: string | null;
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: {
            height: number;
            width: number;
        };
        /**
         * Creates a new BarChart.
         * @param elementRoot The root element where the canvas elements added to.
         */
        constructor(elementRoot: JQuery, canvasWidth: number, canvasHeight: number, referenceLinesPosition: IChart.Position);
        /**
         * Delete the yAxis at index.
         * @param index The index.
         */
        deleteYAxis(index: number): void;
        /**
         * Delete all yAxis.
         */
        deleteAllYAxis(): void;
        /**
         * Delete all referenceLines.
         */
        deleteAllReferenceLines(): void;
        /**
         * Adds a barGraph.
         * @param newGraph The newGraph (yAxis and values for drawing).
         */
        addGraph(newGraph: BarGraph.Bar): void;
        /**
         * Delete the graph at index.
         * @param index The index.
         */
        deleteGraph(index: number): void;
        /**
         * Delete all graphs.
         */
        deleteAllGraphs(): void;
        /**
         * Removes all canvas elements and clears all arrays.
         */
        remove(): void;
        /**
         * Clears all canvas elements and calls all delete functions.
         */
        clear(width: number, height: number): void;
        /**
         * Returns the barGraph.
         * @returns The barGraph.
         */
        getBars(): HorizontalBarGraph.Bar[];
        /**
         * Returns the barGraph at position.
         * @param index The index.
         * @returns The barGraph.
         */
        getBarsAtPosition(index: number): HorizontalBarGraph.Bar;
        /**
         * Returns the barGraphs.
         * @returns The barGraphs.
         */
        getBarGraphs(): HorizontalBarGraph[];
        /**
         * Returns the barGraphs at position.
         * @param index The index.
         * @returns The barGraphs.
         */
        getBarGraphsAtPosition(index: number): HorizontalBarGraph;
        /**
         * Sets the barWidth.
         * @param barWidth The new barWidth.
         */
        setBarWidth(barWidth: number | null): void;
        /**
         * Sets the graphArrangement.
         * @param graphArrangement The new graphArrangement.
         */
        setBarGraphArrangement(barGraphArrangement: string | null): void;
        /**
         * Sets the barChanged which saved if graphs must be redrawing.
         * @param lineChanged The barChanged attribute.
         */
        setBarChanged(barChanged: boolean): void;
        /**
         * Draws the barChart if anything is changed.
         */
        /**
         * Draws the barChart if anything is changed.
         */
        draw(): void;
    }
}
declare module TcHmiCharting {
    class HorizontalBarGraph extends TcHmiCharting.IGraph {
        /** The barWidth as number. */
        protected __barWidth: number | null;
        /** The barColor as string. */
        protected __barColor: string | null;
        /** The border (bigger than grid) of all sites.  */
        protected __drawingBorder: {
            height: number;
            width: number;
        };
        /** The scaleFactor as number. */
        protected __scaleFactor: number;
        /** Defines how bars should be colored based on their value. */
        protected __colorRanges: ColorRanges[] | null | undefined;
        /**
         * Creates a new BarGraph.
         * @param elementRoot The root element where the canvas elements added to.
         */
        constructor(canvas: HTMLCanvasElement);
        /**
         * Draws the lineGraph to the canvas.
         * @param bar The bar (yAxis and values) to drawing.
         * @param xAxis The xAxis.
         */
        draw(bar: BarGraph.Bar, xAxis: XAxis): void;
        /**
         * Draws the lineGraph clustered to the canvas.
         * @param bar The bar (yAxis and values) to drawing.
         * @param xAxis The xAxis.
         * @param index The index of bar.
         */
        drawClustered(bar: BarGraph.Bar, xAxis: XAxis, index: number): void;
        /**
         * Draws the lineGraph to the canvas.
         * @param bar The bar (yAxis and values) to drawing.
         * @param xAxis The xAxis.
         * @param minValues Array which holds the minimal values. Will be filled in the function!
         */
        drawStacked(bar: BarGraph.Bar, xAxis: XAxis, minValues: number[]): void;
        /**
         * Sets the barWidth.
         * @param barWidth The new barWidth.
         */
        setBarWidth(barWidth: number | null): void;
        /**
         * Returns the barWidth.
         * @returns The barWidth of the barGraph.
         */
        getBarWidth(): number | null;
        /**
         * Sets the drawingBorder.
         * @param drawingBorder The new drawingBorder.
         */
        setDrawingBorder(drawingBorder: {
            height: number;
            width: number;
        }): void;
        /**
         * Sets the barColor.
         * @param barColor The new barColor.
         */
        setBarColor(barColor: string | null): void;
        /**
         * Returns the barColor.
         * @returns The barColor of the barGraph.
         */
        getBarColor(): string | null;
        /**
         * Returns the scaleFactor.
         * @returns The scaleFactor of the barGraph.
         */
        getScaleFactor(): number;
        /**
         * Sets the scaleFactor.
         * @param scaleFactor The new scaleFactor.
         */
        setScaleFactor(scaleFactor: number | null | undefined): void;
        /**
         * Sets the canvas.
         * @param canvas The new canvas.
         */
        setCanvas(canvas: HTMLCanvasElement): void;
        /**
         * Returns the canvas.
         * @returns The canvas of the lineGraph.
         */
        getCanvas(): HTMLCanvasElement | undefined;
        /**
         * Returns the colorRanges.
         * @returns The colorRanges of the barGraph.
         */
        getColorRanges(): ColorRanges[] | null | undefined;
        /**
         * Sets the colorRanges.
         * @param colorRanges The new colorRanges.
         */
        setColorRanges(colorRanges: ColorRanges[] | null | undefined): void;
    }
    module HorizontalBarGraph {
        interface Bar {
            values: number[];
            yAxis: YAxis | null;
        }
        enum BarGraphArrangement {
            Overlapped = "Overlapped",
            Clustered = "Clustered",
            Stacked = "Stacked"
        }
    }
}
declare module TcHmiCharting {
    class ReferenceLine {
        /** The __name as string. */
        protected __name: string | null;
        /** The __show as boolean. */
        protected __show: boolean;
        /** The __yAxisId as string. */
        protected __yAxisId: number | null;
        /** The __value as number. */
        protected __value: number | null;
        /** The __orientation as ReferenceLine.Orientation. */
        protected __orientation: ReferenceLine.Orientation;
        /** The __color as string. */
        protected __color: string | null;
        /** The __lineWidth as number. */
        protected __lineWidth: number | null;
        /** The __showLabels as boolean. */
        protected __showLabel: boolean;
        /** The __labelHorizontalAlignment as string. */
        protected __labelHorizontalAlignment: string | null;
        /** The __labeVerticalAlignment as string. */
        protected __labelVerticalAlignment: string | null;
        /** The __labelFontFamily as string. */
        protected __labelFontFamily: string | null;
        /** The __labelFontSize as number. */
        protected __labelFontSize: number | null;
        /** The __labelFontSizeUnit as string. */
        protected __labelFontSizeUnit: string;
        /** The __labelFontWeight as string. */
        protected __labelFontWeight: string | null;
        /** The canvas element as HTMLCanvasElement. */
        protected __canvas: HTMLCanvasElement;
        /** The canvas context as CanvasRenderingContext2D. */
        protected __context: CanvasRenderingContext2D | null;
        /**
         * Creates a new ReferenceLine.
         * @param canvas The canvas element where drawing the axis.
         */
        constructor(canvas: HTMLCanvasElement);
        /**
         * Draws the lines to the canvas.
         */
        drawLine(startPoint: LineGraph.Point, endPoint: LineGraph.Point): void;
        /**
         * Returns the calculated width of a string.
         * @param label The label for calculating.
         * @returns The width of label.
         */
        calculateLabelWidth(label: string | null): number;
        /**
         * Sets the name.
         * @param name The new name.
         */
        setName(name: string | null): void;
        /**
         * Returns the name.
         * @returns The name.
         */
        getName(): string | null;
        /**
         * Sets the show.
         * @param name The new show.
         */
        setShow(show: boolean): void;
        /**
         * Returns the show.
         * @returns The show.
         */
        getShow(): boolean;
        /**
         * Sets the yAxisId.
         * @param name The new yAxisId.
         */
        setYAxisId(yAxisId: number | null): void;
        /**
         * Returns the yAxisId.
         * @returns The yAxisId.
         */
        getYAxisId(): number | null;
        /**
         * Sets the value.
         * @param name The new value.
         */
        setValue(value: number | null): void;
        /**
         * Returns the value.
         * @returns The value.
         */
        getValue(): number | null;
        /**
         * Sets the orientation.
         * @param name The new orientation.
         */
        setOrientation(orientation: ReferenceLine.Orientation): void;
        /**
         * Returns the orientation.
         * @returns The orientation.
         */
        getOrientation(): ReferenceLine.Orientation;
        /**
         * Sets the color.
         * @param name The new color.
         */
        setColor(color: string | null): void;
        /**
         * Returns the color.
         * @returns The color.
         */
        getColor(): string | null;
        /**
         * Sets the lineWidth.
         * @param name The new lineWidth.
         */
        setLineWidth(lineWidth: number | null): void;
        /**
         * Returns the lineWidth.
         * @returns The lineWidth.
         */
        getLineWidth(): number | null;
        /**
         * Sets the showLabel.
         * @param name The new showLabel.
         */
        setShowLabel(showLabel: boolean): void;
        /**
         * Returns the showLabel.
         * @returns The showLabel.
         */
        getShowLabel(): boolean;
        /**
         * Sets the labelHorizontalAlignment.
         * @param name The new labelHorizontalAlignment.
         */
        setLabelHorizontalAlignment(labelHorizontalAlignment: string | null): void;
        /**
         * Returns the labelHorizontalAlignment.
         * @returns The labelHorizontalAlignment.
         */
        getLabelHorizontalAlignment(): string | null;
        /**
         * Sets the labelVerticalAlignment.
         * @param name The new labelVerticalAlignment.
         */
        setLabelVerticalAlignment(labelVerticalAlignment: string | null): void;
        /**
         * Returns the labelVerticalAlignment.
         * @returns The labelVerticalAlignment.
         */
        getLabelVerticalAlignment(): string | null;
        /**
         * Sets the labelFontFamily.
         * @param labelFontFamily  The new labelFontFamily.
         */
        setLabelFontFamily(labelFontFamily: TcHmi.FontFamily | null | undefined): void;
        /**
         * Returns the labelFontFamily.
         * @returns The labelFontFamily.
         */
        getLabelFontFamily(): string | null;
        /**
         * Sets the labelFontSize.
         * @param labelFontSize  The new labelFontSize.
         */
        setLabelFontSize(labelFontSize: number | null): void;
        /**
         * Returns the labelFontSize.
         * @returns The labelFontSize.
         */
        getLabelFontSize(): number | null;
        /**
         * Sets the labelFontWeight.
         * @param labelFontWeight  The new labelFontWeight.
         */
        setLabelFontWeight(labelFontWeight: TcHmi.FontWeight | null): void;
        /**
         * Returns the labelFontWeight.
         * @returns The labelFontWeight.
         */
        getLabelFontWeight(): string | null;
    }
    module ReferenceLine {
        enum Orientation {
            Horizontal = 0,
            Vertical = 1
        }
    }
}
//# sourceMappingURL=TcHmiCharting.d.ts.map