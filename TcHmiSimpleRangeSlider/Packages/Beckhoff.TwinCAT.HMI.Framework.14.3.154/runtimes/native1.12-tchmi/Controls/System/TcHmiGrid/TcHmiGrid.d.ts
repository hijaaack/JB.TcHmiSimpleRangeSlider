declare namespace TcHmi.Controls.System {
    class TcHmiGrid extends TcHmi.Controls.System.TcHmiContainerControl {
        #private;
        /**
         * Constructor
         * @param element
         * @param attrs
         * @param pcElement
         * @param pcAttrs
         */
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        private __elementTemplateRoot;
        private __elementGridcontainer;
        /**
         * Internal reference to the attribute 'data-tchmi-cell-wrap'
         */
        protected __cellWrap: boolean | undefined;
        /**
         * Internal reference to the attribute 'data-tchmi-cell-options'
         */
        protected __cellOptions: TcHmiGrid.ICellOptions[] | undefined;
        /**
         * Internal reference to the attribute 'data-tchmi-row-options'
         */
        protected __rowOptions: TcHmiGrid.IRowOptions[] | undefined;
        /**
         * Internal reference to the attribute 'data-tchmi-column-options'
         */
        protected __columnOptions: TcHmiGrid.IColumnOptions[] | undefined;
        /** Holds the pixel size the column uses, null if all relative. Cache has to be rebuild if variable is null */
        protected __cacheWidthPerColumn: (null | number)[] | null;
        /** Holds the pixel size the row uses, null if all relative. Cache has to be rebuild if variable is null */
        protected __cacheHeightPerRow: (null | number)[] | null;
        /** Is the current layout known? This does not imply a precise layout for responsive configurations */
        protected __roughLayoutKnown: boolean;
        private __cacheCellHeightPerRow;
        private __onControlGridRowIndexChangedDestroyEvent;
        private __onControlGridColumnIndexChangedDestroyEvent;
        private __onControlsMovedDestroyEvent;
        private __onControlsResizedDestroyEvent;
        private __onThemeChangedDestroyEvent;
        private __onControlPositionParameterChangedDestroyEvent;
        private __onControlSizeParameterChangedDestroyEvent;
        protected __asyncWorkData: TcHmiGrid.IControlSpecificData;
        /** True if a large control stretches a column dimension */
        protected __controlStretchedWidth: boolean;
        /** True if a large control stretches a row dimension */
        protected __controlStretchedHeight: boolean;
        /** True if we need to check wrapping on next attach */
        protected __wrapCheckNeeded: boolean;
        /** The grid border width shifts the child but is not often changed. */
        protected __borderOffsets: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        /**
         * If raised, the control object exists in control cache and constructor of each inheritation level was called.
         * This function is only to be used by the System. Other function calls are not intended.
         */
        __previnit(): void;
        /**
         * If raised, all attributes have been set to it's default or dom values.
         * This function is only to be used by the System. Other function calls are not intended.
         */
        __init(): void;
        /**
         * Is called by the system after the control instance gets part of the current DOM.
         * This function is only to be used by the System. Other function calls are not intended.
         */
        __attach(): void;
        /**
         * Is called by the system after the control instance is no longer part of the current DOM.
         * This function is only to be used by the System. Other function calls are not intended.
         */
        __detach(): void;
        /**
         * Destroy the current control instance.
         * Will be called automatically if system destroys control!
         */
        destroy(): void;
        /**
         * Adds a child to this control and handles the hierarchical management layer.
         * This will also add child's DOM element to the container DOM.
         * @param control Class instance of the child.
         * @param pos Optional index of the position for the new child.
         */
        addChild(control: TcHmi.Controls.System.baseTcHmiControl | undefined | null, pos?: number | null): void;
        /**
         * Adds a child to this control and handles the hierarchical management layer.
         * This will also add child's DOM element to the container DOM.
         * @param control Class instance of the child.
         * @param pos Optional index of the position for the new child.
         */
        __addChild(control: TcHmi.Controls.System.baseTcHmiControl, pos?: number | null): void;
        /**
         * Remove a child control.
         */
        removeChild(control: TcHmi.Controls.System.baseTcHmiControl | undefined | null): void;
        __removeChild(control: TcHmi.Controls.System.baseTcHmiControl): void;
        /** Updates border width cache */
        protected __updateBorderCache(): void;
        protected __processBorderWidth(): void;
        /**
         * Moves a control to the correct Grid cell
         */
        protected __onGridRowOrColumnIndexChanged(_event: TcHmi.EventProvider.Event, control: TcHmi.Controls.System.baseTcHmiControl): void;
        /**
         * Adjust Cell Dimension on Control resize or move
         * @param move Is this a moved control? If not it was resized
         */
        protected __onControlGeometryChanged(event: TcHmi.EventProvider.Event, controls: TcHmi.Controls.System.baseTcHmiControl[]): void;
        protected __doAsyncWork(timestamp?: number): void;
        private __rebuildCellHeightPerRowCache;
        /**
         * Returns the current cell wrap value.
         * @returns The current cell wrap value.
         */
        getCellWrap(): boolean | undefined;
        /**
         * Sets a new cell wrap
         * @param valueNew
         */
        setCellWrap(valueNew: boolean | null): void;
        /**
         *
         */
        protected __processCellWrap(): void;
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
         * Updates caches...
         */
        protected __processWidthMode(): void;
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
         * Updates caches...
         */
        protected __processHeightMode(): void;
        /**
         * Adds new Rows if needed.
         * If Rows are removed the affected controls are moved in the correct cell if needed.
         */
        __recalculateRowCount(): void;
        /**
         * Checks each Row in the Grid and adds/removes cells if needed.
         * After that all controls are moved in the correct cell if needed.
         */
        __recalculateColumnCount(): void;
        /**
         * Returns the current row options value.
         * @returns The current row options value.
         */
        getRowOptions(): TcHmiGrid.IRowOptions[] | undefined;
        /**
         * Sets new Row options
         * @param valueNew
         */
        setRowOptions(valueNew: TcHmiGrid.IRowOptions[] | null): void;
        /**
         * The watch callback for the rowOptions object resolver.
         */
        protected __onResolverForRowOptionsWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmiGrid.IRowOptions[]>): void;
        /**
         * Processes row options
         * height is set directly
         * min/max value are set after comparing to the content dimension
         */
        protected __processRowOptions(): void;
        /**
         * Returns the current column options value.
         * @returns The current column options value.
         */
        getColumnOptions(): TcHmiGrid.IColumnOptions[] | undefined;
        /**
         * Sets new column options
         * @param valueNew
         */
        setColumnOptions(valueNew: TcHmiGrid.IColumnOptions[] | null): void;
        /**
         * The watch callback for the columnOptions object resolver.
         */
        protected __onResolverForColumnOptionsWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmiGrid.IColumnOptions[]>): void;
        /**
         * Processes column options
         * width is set directly
         * min/max value are set after comparing to the content dimension
         */
        protected __processColumnOptions(): void;
        /**
         * PaddingTop
         */
        getCellOptions(): TcHmiGrid.ICellOptions[] | undefined;
        setCellOptions(valueNew: TcHmiGrid.ICellOptions[] | null): void;
        /**
         * The watch callback for the cellOptions object resolver.
         */
        protected __onResolverForCellOptionsWatchCallback(data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<TcHmiGrid.ICellOptions[]>): void;
        protected __processCellOptions(): void;
        private __correctAllGridPositions;
        private __correctGridPosition;
        private __appendRows;
        private __removeRows;
        private __createColumns;
        private __createCell;
        private __processSequenceOptions;
        /**
         * Returns the calculated width in pixel if self defined (not percent based) or based on the children.
         */
        __getContentWidth(): number | null;
        /**
         * Returns the calculated height in pixel if self defined (not percent based) or based on the children.
         */
        __getContentHeight(): number | null;
        /**
         * Processes the current height and height unit.
         */
        __processHeight(callerControl?: TcHmiControl): void;
        private __processHeightAsync;
        /**
         * Processes the current width and width unit.
         */
        __processWidth(callerControl?: TcHmiControl): void;
        private __processWidthAsync;
        private static __getPixelNumberInStyle;
    }
    namespace TcHmiGrid {
        interface IControlSpecificData extends TcHmiControl.IControlSpecificData {
            'System.TcHmiGrid.triggerRebuildAll': boolean;
            'System.TcHmiGrid.triggerRecheckHeight': boolean;
            'System.TcHmiGrid.triggerProcessWidth': boolean;
            'System.TcHmiGrid.triggerProcessHeight': boolean;
        }
        interface ISequenceOption {
            /** Defines size of the column/row of the grid. Can be a pixel value (42px), percent value (42%), a grow factor (1) or null (equivalent to grow factor 1). The grow factor determines how much the items will grow relative to the rest of the items when positive free space is distributed. */
            size?: number | null;
            sizeUnit?: TcHmi.DimensionUnit | 'factor' | null;
            sizeMode?: 'Value' | 'Content' | null;
            minSize?: number | null;
            minSizeUnit?: TcHmi.DimensionUnit | null;
            maxSize?: number | null;
            maxSizeUnit?: TcHmi.DimensionUnit | null;
            overflow?: boolean | null;
        }
        interface IColumnOptions {
            width?: number | null;
            widthUnit?: TcHmi.DimensionUnit | 'factor' | null;
            widthMode?: 'Value' | 'Content' | null;
            minWidth?: number | null;
            minWidthUnit?: TcHmi.DimensionUnit | null;
            maxWidth?: number | null;
            maxWidthUnit?: TcHmi.DimensionUnit | null;
            overflow?: boolean | null;
        }
        interface IRowOptions {
            height?: number | null;
            heightUnit?: TcHmi.DimensionUnit | 'factor' | null;
            heightMode?: 'Value' | 'Content' | null;
            minHeight?: number | null;
            minHeightUnit?: TcHmi.DimensionUnit | null;
            maxHeight?: number | null;
            maxHeightUnit?: TcHmi.DimensionUnit | null;
            overflow?: boolean | null;
        }
        interface ICellOptions {
            rowIndex: number | null;
            columnIndex: number | null;
            borderWidth?: TcHmi.BorderWidth | null;
            borderStyle?: TcHmi.BorderStyle | null;
            borderColor?: TcHmi.SolidColor | null;
            padding?: TcHmi.FourSidedCss | null;
            backgroundColor?: TcHmi.Color | null;
            backgroundImage?: string | null;
            backgroundImagePadding?: TcHmi.FourSidedCss | null;
            backgroundImageWidth?: number | null;
            backgroundImageWidthUnit?: TcHmi.DimensionUnit | null;
            backgroundImageHeight?: number | null;
            backgroundImageHeightUnit?: TcHmi.DimensionUnit | null;
            backgroundImageHorizontalAlignment?: TcHmi.HorizontalAlignment | null;
            backgroundImageVerticalAlignment?: TcHmi.VerticalAlignment | null;
        }
        const enum Direction {
            column = 0,
            row = 1
        }
    }
}