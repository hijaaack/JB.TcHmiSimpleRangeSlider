declare module TcHmi.Controls.Beckhoff {
    class TcHmiObjectBrowser extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        protected __localizedElements: Map<HTMLElement, {
            key: string;
            parameters?: any[] | undefined;
        }>;
        protected __localizationReader: Locale.LocalizationReader | undefined;
        protected __treeView: TcHmi.Controls.Beckhoff.TcHmiTreeView;
        /** Internal reference to the attribute "data-tchmi-data" */
        protected __data: any | undefined;
        protected __oldData: any | undefined;
        protected __overriddenData: any | null | undefined;
        protected __dataSchema: JsonSchema | undefined;
        protected __overriddenDataSchema: JsonSchema | null | undefined;
        /** Internal reference to the attribute "data-tchmi-data-symbol" */
        protected __dataSymbol: Symbol<any[]> | undefined | null;
        protected __bindingMode: TcHmi.BindingMode;
        protected __destroyDataSymbolWatch: DestroyFunction | null;
        protected __dataHasChanged: boolean;
        protected __columns: TcHmiObjectBrowser.Column[] | undefined;
        protected __subscriptionInfo: {
            subscriptionId: number | null;
            timing: {
                isScrolling: boolean;
                timeoutID: number | null;
                lastRequestTime: number;
                lastUpdateTime: number;
                minTimeout: number;
                responseLatencies: number[];
                updateTimings: number[];
                firstResponsePending: boolean;
            };
        };
        protected __ignoreFirstLevel: boolean | undefined;
        protected __firstLevelName: string | undefined;
        protected __treeViewEventDestroyFunctions: DestroyFunction[];
        /**
         * A map to save the subscription data.
         *  1 Symbolname
         *  2 SubscriptionData
         * Due to the fact that sub levels get an own command in the subscription
         * the data of some levels can be missing in the server response if the data has not changed.
         * In that case we can resort to the data stored here.
         */
        protected __subscriptionData: Map<string, any>;
        /**
         * An array of the expanded subsymbols.
         */
        protected __expandedElements: string[];
        /**
         * If raised, the control object exists in control cache and constructor of each inheritation level was called.
         * Call attribute processor functions here to initialize default values!
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
         * Add an element to be localized.
         * @param element The element.
         * @param key The localization key.
         * @param parameters Optional parameters to pass to tchmi_format_string.
         */
        __addLocalizedElement(element: HTMLElement, key: string, ...parameters: any[]): void;
        /**
         * Remove a localized element.
         * @param element The element to remove.
         */
        __removeLocalizedElement(element: HTMLElement): void;
        /**
         * Transforms the data into a homogene structure to be able to display the data with the TcHmiTreeView control
         * @param data The data to be transformed.
         * @param name The name of the current level
         */
        protected __transformDataAndDataSchema(data: any, name: string, schema: JsonSchema): TcHmiObjectBrowser.ITransformationResult;
        /**
         * Get the origninal schema by an hierarchical index
         * @param schema
         * @param index List of indices to address a data object in a nested array or object
         */
        protected __originalIndexToDataSchema(schema: JsonSchema, index: number[]): JsonSchema;
        /**
         * Get the original data by an hierarchical index
         * @param data
         * @param index List of indices to address a data object in a nested array or object
         */
        protected __originalIndexToData(data: any, index: number[]): any;
        /**
         * Write a value to a sub property of a nested array or object by a hierarchical index
         * @param data
         * @param index List of indices to address a data object in a nested array or object
         */
        protected __writeDataByHierarchicalIndex(data: any, index: number[], valueNew: any): void;
        /**
         * Modify a value of the data and write it to the symbol if the dataSymbol is used
         * @param valueNew
         * @param index List of indices to address a data object in a nested array or object
         */
        protected __modifyData(valueNew: any, index: number[]): void;
        /**
         * Get the name of sub symbol by the hierarchical index
         * @param data
         * @param index List of indices to address a data object in a nested array or object
         */
        protected __originalIndexToSubSymbolName(data: any, index: number[]): string;
        /**
         * Get the hierarchical index by the name of the symbol
         * @param data
         * @param symbolName Name to address a data object in a nested array or object
         */
        protected __symbolNameToOriginalIndex(data: any, symbolName: string): number[] | null;
        /**
         * A function to selected the parent element of the currently selected element.
         */
        selectParentRow(): void;
        /**
         * A function to callapse every expanded element.
         */
        collapseAll(): void;
        /**
         * Expand an element by its path.
         * @param path The path of the element to expand in the original data.
         */
        expandElement(path: string, expandParents: boolean): void;
        /**
         * Collapse an element by its hierarchical index.
         * @param path The path of the element to expand in the original data.
         */
        collapseElement(path: string): void;
        /**
         * Scroll to an element by its hierarchical index.
         * @param path The path of the element to scroll to.
         */
        scrollTo(path: string, expandParents: boolean): void;
        /**
         * Call through function to process the pending changes.
         **/
        writePreparedValues(): void;
        /**
         * Call through function to reset the pending changes.
         **/
        resetPreparedValues(): void;
        /**
         * Callback function for the onDataChanged event of the TreeView
         * @param event
         * @param args
         */
        protected __onEdit: (event: EventProvider.Event, args: any) => void;
        /**
         * Callback function for the onElementExpanded event of the TreeView
         * @param event
         * @param args
         */
        protected __onElementExpanded: (event: EventProvider.Event, args: any) => void;
        /**
         * Callback function for the onElementCollapsed event of the TreeView
         * @param event
         * @param args
         */
        protected __onElementCollapsed: (event: EventProvider.Event, args: any) => void;
        /**
         * Handles the onPropertyChanged event of the treeview.
         */
        private __onTreeViewPropertyChanged;
        /**
         * Sets the value of the member variable "data" if the new value is not equal to the current value
         * and calls the associated process function (processData) after that.
         * @param valueNew The new value for data.
         */
        setData(valueNew: any | null): void;
        /**
         * The private setter of the member variable "data".
         * @param valueNew The new value for data.
         */
        private __setData;
        /**
         * The watch callback for the data object resolver
         */
        protected __onResolverForDataWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<any>) => void;
        /**
         * Returns the current value of the member variable data.
         * @returns the current value of the member variable data.
         */
        getData(): any;
        /**
         * Processes the current value of data.
         * UpdateTable is called with null and data (Array.<Object>) as parameter.
         */
        protected __processData(): void;
        /**
         * Sets the value of the member variable "DataSchema" if the new value is not equal to the current value
         * and calls the associated process function (processDataSchema) after that.
         * @param valueNew The new value for data.
         */
        setDataSchema(valueNew: JsonSchema | null): void;
        /**
         * The private setter of the member variable "dataSchema".
         * @param valueNew The new value for dataSchema.
         */
        private __setDataSchema;
        /**
         * The watch callback for the DataSchema object resolver
         */
        protected __onResolverForDataSchemaWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<JsonSchema>) => void;
        /**
         * Returns the current value of the member variable dataSchema.
         * @returns the current value of the member variable dataSchema.
         */
        getDataSchema(): JsonSchema | undefined;
        /**
         * Processes the current value of dataSchema.
         */
        protected __processDataSchema(): void;
        /**
         * Process the current data and its schema and pass it to the treeview control.
         **/
        protected __processDataAndDataSchema(): void;
        /**
         * The setter function for the "data symbol".
         * @param valueNew The new datasymbol.
         */
        setDataSymbol(valueNew: TcHmi.Symbol<any> | null): void;
        /**
         * @returns the dataSymbol.
         */
        getDataSymbol(): Symbol<any[]> | null | undefined;
        /**
         * Processes the dataSymbol.
         * @param unsubscribeOnly Should be set to true when this method is called from __detach. Prevents a new subscription being created after the existing subscription was unsubscribed.
         */
        protected __processDataSymbol(unsubscribeOnly?: boolean): void;
        /**
         * Updates the data symbol paging parameters.
         * @param force Forces the subscription update if set to true.
         */
        protected __updatePaging(force?: boolean): void;
        /**
         * Callback function for dataSymbol paging.
         * @param data The result object of the subscription.
         */
        protected __onDataSymbolPage: (data: Server.IResultObject<unknown, any>) => void;
        /**
         * Callback function for dataSymbol watch.
         */
        protected __onDataSymbolWatch: (data: TcHmi.Symbol.IReadResultObject<any[]>) => void;
        /**
         * Sets the value of the member variable "Columns" if the new value is not equal to the current value
         * and calls the associated process function (processColumns) after that.
         * @param valueNew The new value for Columns.
         */
        setColumns(valueNew: TcHmiObjectBrowser.Column[] | null): void;
        /**
         * The watch callback for the columns object resolver.
         */
        protected __onResolverForColumnsWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiObjectBrowser.Column[]>) => void;
        /**
         * Returns the current value of the member variable text.
         * @returns the current value of the member variable text.
         */
        getColumns(): TcHmiObjectBrowser.Column[] | undefined;
        /**
         * Processes the current value of columns and forward it to the treeview control.
         */
        protected __processColumns(): void;
        /**
         * Sets the value of IgnoreFirstLevel
         * @param valueNew The new value for IgnoreFirstLevel
         */
        setIgnoreFirstLevel(valueNew: boolean | null): void;
        /**
         * Gets the value of IgnoreFirstLevel
         * @returns The current value of IgnoreFirstLevel
         */
        getIgnoreFirstLevel(): boolean | undefined;
        /**
         * Processes IgnoreFirstLevel
         */
        protected __processIgnoreFirstLevel(): void;
        /**
         * Sets the value of the member variable "FirstLevelName" if the new value is not equal to the current value
         * and calls the associated process function (processFirstLevelName) after that.
         * @param valueNew The new value for FirstLevelName.
         */
        setFirstLevelName(valueNew: string | null): void;
        /**
         * Returns the current value of the member variable FirstLevelName.
         */
        getFirstLevelName(): string | undefined;
        /**
         * Processes the current value of FirstLevelName.
         */
        protected __processFirstLevelName(): void;
        /**
         * Returns the current value of dataHasChanged.
         * @returns The current value of dataHasChanged.
         */
        getDataHasChanged(): boolean;
        /**
         * Sets the value of restoreUserInputOnLoad
         * @param valueNew The new value for restoreUserInputOnLoad
         */
        protected setRestoreUserInputOnLoad(valueNew: boolean | null): void;
        /**
         * Gets the value of restoreUserInputOnLoad
         * @returns The current value of restoreUserInputOnLoad
         */
        protected getRestoreUserInputOnLoad(): void;
        protected resetUserInput(restoreOriginalValues: boolean): void;
        /**
         * Sets the value of dataPrecedence
         * @param valueNew The new value for dataPrecedence
         */
        protected setDataPrecedence(valueNew: TcHmi.DataPrecedence | null): void;
        /**
         * Gets the value of dataPrecedence
         * @returns The current value of dataPrecedence
         */
        protected getDataPrecedence(): void;
        /**
         * Sets the value of indirectWrite
         * @param valueNew The new value for indirectWrite
         */
        setIndirectWrite(valueNew: boolean | null): void;
        /**
         * Gets the value of indirectWrite
         * @returns The current value of indirectWrite
         */
        getIndirectWrite(): boolean | undefined;
        /**
         * Set the value for the attribute filter in the treeview instance.
         * @param valueNew
         */
        setFilter(valueNew: Filter | null): void;
        /**
         * Get the filter attribute from the treeview instance
         **/
        getFilter(): Filter | null | undefined;
        /**
         * Set the value for the attribute sorting in the treeview instance.
         * @param valueNew
         */
        setSorting(valueNew: TcHmi.SortingInfo[] | null): void;
        /**
         * Get the Sorting attribute from the treeview instance
         **/
        getSorting(): SortingInfo[] | undefined;
        /**
         * Sets the value of the rowClassesProvider order attribute.
         * @param value The new rowClassesProvider method.
         */
        setRowClassesProvider(valueNew: TcHmi.IFunction | null): void;
        /**
         * Gets the current rowClassesProvider method.
         * @returns the current rowClassesProvider method.
         */
        getRowClassesProvider(): IFunction | undefined;
        /**
         * Sets the value of the member variable "headerHeight".
         * @param valueNew The new value for headerHeight.
         */
        setHeaderHeight(valueNew: number | null): void;
        /**
         * Returns the current value of the member variable headerHeight.
         * @returns the current value of the member variable headerHeight.
         */
        getHeaderHeight(): number | undefined;
        /**
         * Sets the value of the member variable "headerHeightUnit".
         * @param valueNew The new value for headerHeightUnit.
         */
        setHeaderHeightUnit(valueNew: DimensionUnit | null): void;
        /**
         * Returns the current value of the member variable headerHeightUnit.
         * @returns the current value of the member variable headerHeightUnit.
         */
        getHeaderHeightUnit(): number | undefined;
        /**
         * Sets the value of the member variable "headerCellPadding".
         * @param valueNew The new value for headerCellPadding.
         */
        setHeaderCellPadding(valueNew: FourSidedCss | null): void;
        /**
         * Returns the current value of the member variable headerCellPadding.
         * @returns the current value of the member variable headerCellPadding.
         */
        getHeaderCellPadding(): FourSidedCss | null | undefined;
        /**
         *
         * Sets the value of the member variable "rowHeight".
         * @param valueNew The new value for rowHeight.
         */
        setRowHeight(valueNew: number | null): void;
        /**
         * Returns the current value of the member variable rowHeight.
         * @returns the current value of the member variable rowHeight.
         */
        getRowHeight(): number | undefined;
        /**
         * Sets the table-border-color attribute value and calls the associated process function (processBorderColor).
         * @param valueNew The new attribute value.
         */
        setTableBorderColor(valueNew: SolidColor | null): void;
        /**
         * Returns the current table-border-color value.
         * @returns the current attribute value.
         */
        getTableBorderColor(): SolidColor | null | undefined;
        /**
         * Sets the Grid-width attribute value and calls the associated process function (processBorderWidth).
         * @param valueNew The new attribute value.
         */
        setTableBorderWidth(valueNew: number | null): void;
        /**
         * Returns the current table-border-width value.
         * @returns The current attribute value.
         */
        getTableBorderWidth(): number | undefined;
        /**
         * Internal reference to the attribute "data-tchmi-table-border-type".
         * @param valueNew The new BorderStyle of the table.
         */
        setTableBorderStyle(valueNew: TcHmi.BorderStyle | null): void;
        /**
         * Returns the current table-border-style value.
         * @returns The current attribute value.
         */
        getTableBorderStyle(): BorderStyle | null | undefined;
        /**
         * Sets the value of showHeader
         * @param valueNew The new value for showHeader
         */
        setShowHeader(valueNew: boolean | null): void;
        /**
         * Gets the value of showHeader
         * @returns The current value of showHeader
         */
        getShowHeader(): boolean | undefined;
        /**
         * Sets the value of showRowNumbers
         * @param valueNew The new value for showRowNumbers
         */
        setShowRowNumbers(valueNew: boolean | null): void;
        /**
         * Gets the value of showRowNumbers
         * @returns The current value of showRowNumbers
         */
        getShowRowNumbers(): boolean | undefined;
        /**
         * Sets the value of rowNumbersResizable
         * @param valueNew The new value for rowNumbersResizable
         */
        setRowNumbersResizable(valueNew: boolean | null): void;
        /**
         * Gets the value of rowNumbersResizable
         * @returns The current value of rowNumbersResizable
         */
        getRowNumbersResizable(): boolean | undefined;
        /**
         * Sets the value of rowNumbersStartNumber
         * @param valueNew The new value for rowNumbersStartNumber
         */
        setRowNumbersStartNumber(valueNew: number | null): void;
        /**
         * Gets the value of rowNumbersStartNumber
         * @returns The current value of rowNumbersStartNumber
         */
        getRowNumbersStartNumber(): number | undefined;
        /**
         * Sets the value of rowNumbersWidth
         * @param valueNew The new value for rowNumbersWidth
         */
        setRowNumbersWidth(valueNew: number | null): void;
        /**
         * Gets the value of rowNumbersWidth
         * @returns The current value of rowNumbersWidth
         */
        getRowNumbersWidth(): number | undefined;
        /**
         * Sets the value of rowNumbersWidthUnit
         * @param valueNew The new value for rowNumbersWidthUnit
         */
        setRowNumbersWidthUnit(valueNew: DimensionUnit | null): void;
        /**
         * Gets the value of rowNumbersWidthUnit
         * @returns The current value of rowNumbersWidthUnit
         */
        getRowNumbersWidthUnit(): "px" | "%" | undefined;
        /**
         * Sets the value of rowNumbersHorizontalAlignment
         * @param valueNew The new value for rowNumbersHorizontalAlignment
         */
        setRowNumbersHorizontalAlignment(valueNew: HorizontalAlignment | null): void;
        /**
         * Gets the value of rowNumbersHorizontalAlignment
         * @returns The current value of rowNumbersHorizontalAlignment
         */
        getRowNumbersHorizontalAlignment(): "Left" | "Center" | "Right" | undefined;
        /**
         * Sets the value of rowNumbersVerticalAlignment
         * @param valueNew The new value for rowNumbersVerticalAlignment
         */
        setRowNumbersVerticalAlignment(valueNew: TcHmi.VerticalAlignment | null): void;
        /**
         * Gets the value of rowNumbersVerticalAlignment
         * @returns The current value of rowNumbersVerticalAlignment
         */
        getRowNumbersVerticalAlignment(): "Center" | "Top" | "Bottom" | undefined;
        /**
         * Sets the value of the member variable "rowNumbersCellPadding" if the new value is not equal to the current value
         * and calls the associated process function (processRowNumbersCellPadding) after that.
         * @param valueNew The new value for rowNumbersCellPadding.
         */
        setRowNumbersCellPadding(valueNew: TcHmi.FourSidedCss | null): void;
        /**
         * Returns the current value of the member variable rowNumbersCellPadding.
         * @returns the current value of the member variable rowNumbersCellPadding.
         */
        getRowNumbersCellPadding(): FourSidedCss | null | undefined;
        /**
         * Sets the value of the member variable "cellContentPadding".
         * @param valueNew The new value for cellContentPadding.
         */
        setCellContentPadding(valueNew: FourSidedCss | null): void;
        /**
         * Returns the current value of the member variable cellContentPadding.
         * @returns the current value of the member variable cellContentPadding.
         */
        getCellContentPadding(): FourSidedCss | null | undefined;
        /**
         * Sets the background value.
         * @param valueNew The new value for the header background attribute as json string.
         */
        setHeaderBackgroundColor(valueNew: Color | null): void;
        /**
         * Returns the current header background value.
         * @returns The current value of the header background member variable as json in string format.
         */
        getHeaderBackgroundColor(): Color | null | undefined;
        /**
         * Sets the text color.
         * @param valueNew The new value for textFColor.
         */
        setHeaderTextColor(valueNew: SolidColor | null): void;
        /**
         * Returns the current value of headertextColor.
         * @returns The current value of headertextColor.
         */
        getHeaderTextColor(): SolidColor | null | undefined;
        /**
         * Sets the text color.
         * @param valueNew The new value for textFColor.
         */
        setRowNumbersTextColor(valueNew: SolidColor | null): void;
        /**
         * Returns the current value of rowNumberstextColor.
         * @returns the current value of rowNumberstextColor.
         */
        getRowNumbersTextColor(): SolidColor | null | undefined;
        /**
         * Sets the row numbers background value.
         * @param valueNew The new value for the row numbers background attribute.
         */
        setRowNumbersBackgroundColor(valueNew: Color | null): void;
        /**
         * Returns the current row numbers background value.
         * @returns The current value of the row numbers background member variable.
         */
        getRowNumbersBackgroundColor(): Color | null | undefined;
        /**
         * Sets the header font family.
         * @param valueNew The new value for headerFontFamily
         */
        setHeaderFontFamily(valueNew: FontFamily | null): void;
        /**
         * Returns the current value of headerFontFamily.
         * @returns The current value of headerFontFamily.
         */
        getHeaderFontFamily(): string | null | undefined;
        /**
         * Sets the header font size and calls the associated process function.
         * @param valueNew The new value for headerFontSize
         */
        setHeaderFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of headerFontSize.
         * @returns The current value of headerFontSize.
         */
        getHeaderFontSize(): number | undefined;
        /**
         * Sets the header font size unit.
         * @param valueNew The new value for headerFontSizeUnit
         */
        setHeaderFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current value of headerFontSizeUnit.
         * @returns The current value of headerFontSizeUnit.
         */
        getHeaderFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Sets the header font style.
         * @param valueNew The new value for headerFontStyle
         */
        setHeaderFontStyle(valueNew: FontStyle | null): void;
        /**
         * Returns the current value of headerFontStyle.
         * @returns The current value of headerFontStyle.
         */
        getHeaderFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined;
        /**
         * Sets the header font family.
         * @param valueNew The new value for headerFontWeight
         */
        setHeaderFontWeight(valueNew: FontWeight | null): void;
        /**
         * Returns the current value of headerFontWeight.
         * @returns The current value of headerFontWeight.
         */
        getHeaderFontWeight(): "Normal" | "Auto" | "Bold" | undefined;
        /**
         * Sets the grid font family.
         * @param valueNew The new value for gridFontFamily
         */
        setGridFontFamily(valueNew: FontFamily | null): void;
        /**
         * Returns the current value of gridFontFamily.
         * @returns The current value of gridFontFamily.
         */
        getGridFontFamily(): string | null | undefined;
        /**
         * Sets the grid font size.
         * @param valueNew The new value for gridFontSize
         */
        setGridFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of gridFontSize.
         * @returns The current value of gridFontSize.
         */
        getGridFontSize(): number | undefined;
        /**
         * Sets the grid font size unit.
         * @param valueNew The new value for gridFontSizeUnit
         */
        setGridFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current value of gridFontSizeUnit.
         * @returns The current value of gridFontSizeUnit.
         */
        getGridFontSizeUnit(): number | undefined;
        /**
         * Sets the grid font style.
         * @param valueNew The new value for gridFontStyle
         */
        setGridFontStyle(valueNew: FontStyle | null): void;
        /**
         * Returns the current value of gridFontStyle.
         * @returns The current value of gridFontStyle.
         */
        getGridFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined;
        /**
         * Sets the grid font family.
         * @param valueNew The new value for gridFontWeight
         */
        setGridFontWeight(valueNew: FontWeight | null): void;
        /**
         * Returns the current value of gridFontWeight.
         * @returns The current value of gridFontWeight.
         */
        getGridFontWeight(): "Normal" | "Auto" | "Bold" | undefined;
        /**
         * Sets the row numbers font family.
         * @param valueNew The new value for rowNumbersFontFamily
         */
        setRowNumbersFontFamily(valueNew: FontFamily | null): void;
        /**
         * Returns the current value of rowNumbersFontFamily.
         * @returns The current value of rowNumbersFontFamily.
         */
        getRowNumbersFontFamily(): string | null | undefined;
        /**
         * Sets the row numbers font size.
         * @param valueNew The new value for rowNumbersFontSize
         */
        setRowNumbersFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of rowNumbersFontSize.
         * @returns The current value of rowNumbersFontSize.
         */
        getRowNumbersFontSize(): number | undefined;
        /**
         * Sets the row numbers font size unit.
         * @param valueNew The new value for rowNumbersFontSizeUnit
         */
        setRowNumbersFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current value of rowNumbersFontSizeUnit.
         * @returns The current value of rowNumbersFontSizeUnit.
         */
        getRowNumbersFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Sets the row numbers font style.
         * @param valueNew The new value for rowNumbersFontStyle
         */
        setRowNumbersFontStyle(valueNew: FontStyle | null): void;
        /**
         * Returns the current value of rowNumbersFontStyle.
         * @returns The current value of rowNumbersFontStyle.
         */
        getRowNumbersFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined;
        /**
         * Sets the row numbers font family and calls the associated process function.
         * @param valueNew The new value for rowNumbersFontWeight
         */
        setRowNumbersFontWeight(valueNew: FontWeight | null): void;
        /**
         * Returns the current value of rowNumbersFontWeight.
         * @returns The current value of rowNumbersFontWeight.
         */
        getRowNumbersFontWeight(): "Normal" | "Auto" | "Bold" | undefined;
        /**
         * Sets the selected row by index.
         * @param valueNew The new value for selectedPath
         */
        setSelectedPath(valueNew: string | null): void;
        /**
         * Returns the current value of selectedPath.
         * @returns The current value of selectedPath.
         */
        getSelectedPath(): string | null;
        /**
         * Sets the selected column by index.
         * @param valueNew The new value for selectedColumnIndex
         */
        setSelectedColumn(valueNew: TcHmiObjectBrowser.ColumnData | null): void;
        /**
         * Returns the current value of selectedColumnIndex.
         * @returns The current value of selectedColumnIndex.
         */
        getSelectedColumn(): TcHmiObjectBrowser.ColumnData | null;
        /**
         * Returns the current value of selectedCellValue.
         * @returns The current value of selectedCellValue.
         */
        getSelectedCellValue(): any;
        /**
         * Returns the current value of selectedRowValue.
         * @returns The current value of selectedRowValue.
         */
        getSelectedRowValue(): any;
    }
    module TcHmiObjectBrowser {
        interface ITransformedData {
            name: string;
            datatype: string;
            value: any;
            children?: ITransformedData[];
        }
        interface ITransformationResult {
            data: ITransformedData;
            schema: JsonSchema;
        }
        type ColumnData = 'Name' | 'Value' | 'Datatype' | 'ValueDisplay';
        interface Column {
            /** Background color of the cells in this column */
            cellBackground?: TcHmi.SolidColor | null;
            /** Text color of the cells in this column */
            textColor?: TcHmi.SolidColor | null;
            /** Data displayed in the column*/
            columnData: ColumnData;
            /** Name of the Label for this column */
            label: string;
            /** Width for this column */
            width: number;
            /** Width unit for this column */
            widthUnit: TcHmiDatagrid.DimensionUnitOrFactor;
            /** Can this column be resized? */
            resize?: boolean;
            /** Minimum width for this column */
            minWidth?: number;
            /** Minimum width unit for this column */
            minWidthUnit?: DimensionUnit;
            /** Can this column be edited (text, number) or operated (button, checkbox)? */
            editable?: boolean;
            /** Can this column be sorted by user interaction? */
            sortable?: boolean;
            /** Horizontal alignment of this column */
            horizontalAlignment?: TcHmi.HorizontalAlignment;
            /** Vertical alignment of this column */
            verticalAlignment?: TcHmi.VerticalAlignment;
            /** A reference of function which is called with each entry */
            format?: TcHmi.IFunction;
            /**Horizontal alignment of this header */
            headerHorizontalAlignment?: TcHmi.HorizontalAlignment;
            /**Vertical alignment of this header */
            headerVerticalAlignment?: TcHmi.VerticalAlignment;
            /** When set to true a backslash in a text will be shown verbatim in the HMI. */
            ignoreEscapeSequences?: boolean;
        }
    }
}
//# sourceMappingURL=TcHmiObjectBrowser.d.ts.map