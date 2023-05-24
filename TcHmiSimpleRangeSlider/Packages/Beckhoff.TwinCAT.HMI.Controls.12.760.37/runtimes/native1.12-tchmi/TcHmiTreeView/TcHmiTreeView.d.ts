declare module TcHmi.Controls.Beckhoff {
    class TcHmiTreeView extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /** Reference to the root dom element of the current control template as  jquery object. */
        protected __elementTemplateRoot: JQuery;
        /** Refernce to the outer container element */
        protected __elementOuter: JQuery;
        /** Reference to the div containing the header table */
        protected __elementHeaderScroll: JQuery;
        /** Reference to the header table */
        protected __elementHeaderTable: JQuery;
        /** Reference to the div containig the main table */
        protected __elementDataScroll: JQuery;
        /** Reference to the main table body */
        protected __elementDataTableBody: JQuery;
        protected __elementSentinelTop: HTMLElement;
        protected __elementSentinelBottom: HTMLElement;
        /** Internal reference to the attribute "data-tchmi-data" */
        protected __data: TcHmiDatagrid.PagedArray<any> | undefined;
        protected __oldData: TcHmiDatagrid.PagedArray<any> | undefined;
        protected __overriddenData: any[] | null | undefined;
        /** Internal reference to the attribute "data-tchmi-data-schema" */
        protected __dataSchema: JsonSchema | null | undefined;
        protected __overriddenDataSchema: JsonSchema | null | undefined;
        protected __editorInfo: TcHmi.Controls.Helpers.Editor.EditorInfo | null | undefined;
        /** Internal reference to the attribute "data-tchmi-hierarchical-data-property" */
        protected __hierarchicalDataProperty: string | undefined;
        /** Internal reference to the attribute "data-tchmi-data-symbol" */
        protected __dataSymbol: Symbol<any[]> | undefined | null;
        protected __destroyDataSymbolWatch: DestroyFunction | null;
        protected __pagingInfo: {
            usePaging: boolean;
            subscriptionId: number | null;
            buffer: number;
            theoreticalOffset: number;
            actualOffset: number;
            maxEntries: number;
            filterMap: HierarchicalFilterMap[];
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
        protected __dataSymbolTransform: ((rowData: any) => any) | null;
        /**
         * A map to save the subscription data.
         *  1 Symbolname
         *  2 SubscriptionData
         * Due to the fact that sub levels get an own command in the subscription
         * the data of some levels can be missing in the server response if the data has not changed.
         * In that case we can resort to the data stored here. */
        protected __subscriptionData: Map<string, TcHmiTreeView.SubscriptionData>;
        /** Internal reference to the attribute "data-tchmi-columns" */
        protected __columns: TcHmiTreeView.Column[] | TcHmiTreeView.SimpleColumn | undefined;
        /** Internal reference to the attribute "data-tchmi-sorting" */
        protected __sorting: TcHmiDatagrid.SortingInfo[] | undefined;
        protected __internalSorting: TcHmiDatagrid.SortingInfo[];
        /** Internal reference to the attribute "data-tchmi-filter" */
        protected __filter: Filter | null | undefined;
        protected __filterInstance: TcHmi.FilterInstance | null;
        protected __restoreUserInputOnLoad: boolean | undefined;
        protected __dataPrecedence: TcHmi.DataPrecedence | undefined;
        protected __rowClassesProvider: TcHmi.IFunction | undefined;
        protected __indirectWrite: boolean | undefined;
        /** Internal reference to the attribute "data-tchmi-src-column" */
        protected __internalColumns: (TcHmiTreeView.Column | TcHmiTreeView.SimpleColumn)[];
        /**  Internal reference to the attribute " data-tchmi-header-height" */
        protected __headerHeight: number | undefined;
        /**  Internal reference to the attribute " data-tchmi-header-height-unit" */
        protected __headerHeightUnit: DimensionUnit | undefined;
        /** Internal reference to the attribute "data-tchmi-header-cell-padding" */
        protected __headerCellPadding: TcHmi.FourSidedCss | null | undefined;
        /**  Internal reference to the attribute "data-tchmi-row-height" */
        protected __rowHeight: number | undefined;
        /** Internal reference to the attribute "data-tchmi-text-color". */
        protected __headerTextColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute "data-tchmi-row-numbers-text-color". */
        protected __rowNumbersTextColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute "data-tchmi-table-border-color". */
        protected __tableBorderColor: TcHmi.SolidColor | null | undefined;
        /** Internal reference to the attribute "data-tchmi-table-border-width". */
        protected __tableBorderWidth: number | undefined;
        /** Internal reference to the attribute "data-tchmi-table-border-style". */
        protected __tableBorderStyle: TcHmi.BorderStyle | null | undefined;
        /** Internal reference to the attribute "data-tchmi-header-background" */
        protected __headerBackgroundColor: TcHmi.Color | null | undefined;
        /** Internal reference to the attribute "data-tchmi-row-numbers-background" */
        protected __rowNumbersBackgroundColor: TcHmi.Color | null | undefined;
        /** Internal reference to the attribute "data-tchmi-cell-content-padding" */
        protected __cellContentPadding: TcHmi.FourSidedCss | null | undefined;
        protected __showHeader: boolean | undefined;
        protected __showRowNumbers: boolean | undefined;
        protected __rowNumbersResizable: boolean | undefined;
        protected __rowNumbersStartNumber: number | undefined;
        protected __rowNumbersWidth: number | undefined;
        protected __rowNumbersWidthUnit: DimensionUnit | undefined;
        protected __rowNumbersHorizontalAlignment: TcHmi.HorizontalAlignment | undefined;
        protected __rowNumbersVerticalAlignment: TcHmi.VerticalAlignment | undefined;
        protected __rowNumbersCellPadding: TcHmi.FourSidedCss | null | undefined;
        protected __headerFontFamily: FontFamily | null | undefined;
        protected __headerFontSize: number | undefined;
        protected __headerFontSizeUnit: FontSizeUnit | undefined;
        protected __headerFontStyle: FontStyle | undefined;
        protected __headerFontWeight: FontWeight | undefined;
        protected __gridFontFamily: FontFamily | null | undefined;
        protected __gridFontSize: number | undefined;
        protected __gridFontSizeUnit: FontSizeUnit | undefined;
        protected __gridFontStyle: FontStyle | undefined;
        protected __gridFontWeight: FontWeight | undefined;
        protected __rowNumbersFontFamily: FontFamily | null | undefined;
        protected __rowNumbersFontSize: number | undefined;
        protected __rowNumbersFontSizeUnit: FontSizeUnit | undefined;
        protected __rowNumbersFontStyle: FontStyle | undefined;
        protected __rowNumbersFontWeight: FontWeight | undefined;
        protected __dateTimePickerInstance: TcHmi.Controls.Beckhoff.TcHmiDateTimePicker | undefined;
        protected __timespanPickerInstance: TcHmi.Controls.Beckhoff.TcHmiTimespanPicker | undefined;
        protected __timePickerConfirmedEventDestroyer: DestroyFunction | null;
        protected __timePickerCanceledEventDestroyer: DestroyFunction | null;
        /** Regex to validate a string after RFC 3339, the subset of ISO 8601 that is used in JsonSchema. See https://regexr.com/5cnhd for tests.*/
        private __REGEX_ISO_8601_DATETIME;
        /** Regex to validate an ISO 8601 duration. See https://regexr.com/5d2q2 for tests. */
        private __REGEX_ISO_8601_TIMESPAN;
        /** Stores information about the current lock state and which cell is locked (for interaction)*/
        protected __lockState: {
            row: number[];
            column: number;
            propertyName: string | null;
            rowElement: HTMLTableRowElement;
            editStarted: boolean;
            targetElement: HTMLElement | undefined;
        } | null;
        protected __lastSorting: string | undefined;
        /** Header width and minWidth for each column including row numbers */
        protected __columnWidths: TcHmiDatagrid.ColumnWidth[];
        protected __draggingInfo: {
            isDragging: boolean;
            columnIndex: number | null;
            startingPoint: number | null;
            offset: number | null;
        };
        protected __lastRemovedSorting: {
            name?: string;
            position: number;
        } | null;
        protected __filterSortMap: TcHmi.HierarchicalFilterMap[] | null;
        /** the length of the data or the filterSortMap*/
        protected __dataLength: number;
        /** All displayed data entries including displayed child elements*/
        protected __dataCount: number;
        /** Contains the data indices in the order the items are displayed */
        protected __flatData: TcHmiTreeView.FlatData[];
        protected __expandedElements: TcHmiTreeView.ExpandedElement[];
        protected __sortTouches: TcHmiDatagrid.SortTouchInfo[];
        /** Returns if the data has changed. */
        protected __dataHasChanged: boolean;
        /** Stores the selected cell */
        protected __selectedCell: {
            rowIndex: number[] | null;
            columnIndex: number;
        } | null;
        protected __scrollInfo: {
            scrollTop: number;
            scrollLeft: number;
            updateScrollPosition: boolean;
            firstIndex: number;
            oldFirstIndex: number;
            rowCount: number;
            oldRowCount: number;
            buffer: number;
        };
        /** Stores the callback function for the resize event */
        protected __resizedEventDestroyEvent: DestroyFunction | null;
        protected __movedEventDestroyEvent: DestroyFunction | null;
        protected __comboboxDropdowns: Dictionary<HTMLElement>;
        protected __selectedCombobox: {
            cell: HTMLTableCellElement;
            column: TcHmiTreeView.Column | TcHmiTreeView.SimpleColumn;
            row: number[];
            combobox: HTMLElement;
            dropdown: HTMLElement;
        } | null;
        protected __resizeElementMinWidth: number;
        protected __contentWidth: number | null;
        protected __contentHeight: number | null;
        protected __userInput: TcHmiTreeView.UserInput[];
        protected __preparedValues: TcHmiTreeView.UserInput[];
        protected __storage: LocalStorage<{
            sorting: SortingInfo[];
            columnWidths: number[];
            userInput: TcHmiTreeView.UserInput[];
        }, {
            sorting: ReturnType<TcHmiDatagrid['getSorting']>;
            columnWidths: string[];
            userInput: string[];
        }> | undefined;
        protected __buttonLeaveDestroyer: (() => void) | null;
        protected __buttonEnterDestroyer: (() => void) | null;
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
         * A function to selected the parent element of the currently selected element.
         */
        selectParentRow(): void;
        /**
         * A function to callapse every expanded element.
         */
        collapseAll(): void;
        /**
         * Expand an element by its hierarchical index.
         * @param index The index of the element to expand in the original data.
         */
        expandElement(index: number[], expandParents: boolean): void;
        /**
         * Collapse an element by its hierarchical index.
         * @param index The Original Index of the element to collapse.
         */
        collapseElement(index: number[]): void;
        /**
         * scroll to an element by its hierarchical index.
         * @param index The Original Index of the element to scroll to.
         */
        scrollTo(index: number[], expandParents: boolean): void;
        /**
         * If server paging is used, translates the index of an item in __data to the original index before serverside filtering, sorting and paging.
         * Returns -1 if the index is not included in the filterMap sent from the server.
         * @param index The index to translate, referring to an item in the __data array.
         * @returns The index in the original data.
         */
        protected __dataIndexToOriginalIndex(index: number[]): number[];
        /**
         * If server paging is used, translates an index referring to an item in the original data before serverside filtering, sorting and paging to the index of the item in __data.
         * Returns -1 if the index is not included in the filterMap sent from the server.
         * @param index The index to translate, referring to an item in the original data.
         * @returns The index in the src data.
         */
        protected __originalIndexToDataIndex(index: number[]): number[];
        /**
         * A function to get an element in an hierarchical data structure by the hierarchical index.
         * @param index The hierarchical index searched for.
         * @param data The data in which the element is searched.
         * @returns the found element or null.
         */
        protected __originalIndexToDataElement(index: number[], data: TcHmiDatagrid.PagedArray<any>): any;
        /**
         *
         * @param index
         * @param data
         * @param valueNew
         */
        protected __writeDateElementByOriginalIndex(index: number[], data: TcHmiDatagrid.PagedArray<any>, valueNew: any): void;
        /**
         * @param index The original index.
         * @param filterSortMap The filterSortData which will searched in.
         * @return the "new" index in the filterSortData of the searched "old" index if found and otherwise [-1].
         */
        protected __originalIndexToFilterMapElement(index: number[], filterSortMap: TcHmi.HierarchicalFilterMap[]): number[];
        /**
         * Basic function to convert the data to a HierarchicalFilterMap array
         * @param data The data to convert
         * @param index the hierarchical index of the higher levels.
         * @return the resulting TcHmi.HierarchicalFilterMap[],
         */
        protected __dataToFilteredSortMap(data: TcHmiDatagrid.PagedArray<any> | any[], index?: number[]): HierarchicalFilterMap[];
        /**
         * Function to convert the name of a symbol used in the Subscription to the server into a hierarchical index.
         * @param symbolName name of the symbol.
         */
        protected __symbolNameToOriginalIndex(symbolName: string): number[] | null;
        /**
         * Compare to number arrays for equality
         * @param index_1 The first Array to check.
         * @param index_2 The second Array to check.
         * @returns true if the array have the same content.
         */
        protected __compareIndices(index_1: number[], index_2: number[]): boolean;
        /**
         * Check if a filterSortMap includes a specifix index
         * @param filterSortMap The checked filterSortMap
         * @param rowIndex The index searched for
         * @param arrayPosition The checked position in the rowIndex
         * @returns true if the filterSortMap or one of its children includes the rowIndex
         */
        protected __filterSortMapIncludesIndex(filterSortMap: TcHmi.HierarchicalFilterMap[], rowIndex: number[], arrayPosition?: number): boolean;
        /**
         * Bring the treeview structure in a simple array form.
         */
        protected __fillFlatData(): void;
        /**
         * Converts the filterSortMap Structure in an flat array containing the original indexed of the elements.
         * Only respects top level elements and the childs of expanded elements.
         * @param data The data Array.
         * @param flatData The which will be filled.
         */
        protected __fillFlatDataWithFilterSortMap(data: TcHmi.HierarchicalFilterMap[], flatData: TcHmiTreeView.FlatData[]): void;
        /**
         * Converts the data Structure in an flat array containing the original indexed of the elements.
         * Only respects top level elements and the childs of expanded elements.
         * @param data The data Array.
         * @param flatData The flat src data array which will be filled.
         * @param previousIndex The Index of the previous tree structure level. Needed for recursion.
         */
        protected __fillFlatDataWithData(data: TcHmiDatagrid.PagedArray<any> | any, flatData: TcHmiTreeView.FlatData[], previousIndex?: number[]): void;
        /**
         * Insert dummy entries for each child hidden through paging to have consistent
         * row numbers and avoid jumping entries.
         */
        protected __insertHiddenChildDummiesInFlatData(): void;
        /**
         * Get the Editor Info of a specific object and property by the hierarchical index and property name
         * @param editorInfo base editor info
         * @param index The hierarchical index
         * @param propertyName The property name
         */
        protected __getEditorInfoByOriginalIndex(editorInfo: TcHmi.Controls.Helpers.Editor.EditorInfo | undefined, index: number[], propertyName: string): TcHmi.Controls.Helpers.Editor.EditorInfo | undefined;
        /**
         * Get the editorInfo of an optionalEditor if the parameter is an optionalEditor
         * @param editorInfo
         */
        protected __removeOptionalEditorLayer(editorInfo: TcHmi.Controls.Helpers.Editor.EditorInfo | undefined): Helpers.BooleanEditor.Info | Helpers.NumberEditor.Info | Helpers.StringEditor.Info | Helpers.TimeEditor.Info | Helpers.EnumEditor.Info<any> | Helpers.ObjectEditor.Info | Helpers.ArrayEditor.Info | Helpers.TupleEditor.Info | Helpers.ChoiceEditor.Info | Helpers.NullEditor.Info | Helpers.InvalidEditor.Info | undefined;
        /**
         *
         * @param editorInfo
         */
        protected __getColumnControlInfoByEditorInfo(editorInfo: TcHmi.Controls.Helpers.Editor.EditorInfo | undefined): {
            columnControl: "TextBlock" | "TextBox" | "CheckBox" | "ComboBox" | "NumericInput" | "SpinboxInput" | "DateTimeInput" | "TimespanInput";
            dataDefinitions: TcHmiDatagrid.DataDefinition | TcHmiDatagrid.DataDefinition[] | undefined;
            editable: boolean;
        };
        /**
         * Racalculate the row count.
         */
        private __recalcRowCount;
        /**
         * Returns an event handler function for the onResized event.
         * @returns an event handler function for the onResized event.
         */
        protected __onResized(): (evt: EventProvider.Event, ctrl: Controls.System.TcHmiControl) => void;
        /**
         * Recalculates the widths of all columns.
         * @param force Calculation of the column width can be forced.
         */
        protected __recalcAllColumnWidths(force?: boolean): void;
        protected __setCheckboxRadioButtonSize(): void;
        /**
         * Clears the header and builds a new one
         */
        protected __buildHeader(): void;
        /**
         * Clears the table data and fills the table with the current data
         * @param updateType The reason why the table is updated.
         */
        protected __updateTable(updateType: TcHmiDatagrid.__updateTableType): void;
        /**
         * Sets the scroll position to the position stored in __scrollInfo
         */
        protected __updateScrollPosition(): void;
        /**
         * Returns an event handler for the mousedown event of the dropdown elements.
         * @param event The mousedown event.
         */
        protected __onMousedown: (event: MouseEvent) => void;
        /**
         * Returns an event handler for the click event of the dropdown elements.
         * @param event The click event.
         */
        protected __onItemClick: (event: MouseEvent) => void;
        /**
         * Opens the dropdown of the combobox in the specified cell.
         * @param cell The cell containing the combobox.
         */
        protected __openCombobox(cell: HTMLTableCellElement): void;
        /**
         * Closes the open combobox.
         */
        protected __closeCombobox(): void;
        /**
         * Resize Combobox callback.
         */
        protected __resizeDropdownBoxCb: () => void;
        /**
         * Is called from updateTable for each row to append it to the tbody element.
         * @param data The data set with the information about the row.
         * @param body The body to append the row.
         * @param row The information about the position of object. Number between 0 and data.length -1
         * @returns the created row.
         */
        protected __createRow(dataIndex: number[], row: number, rowToRecycle?: HTMLTableRowElement, lockedCell?: number): HTMLTableRowElement;
        /**
         * Fills the given cell with the correct control and the given value.
         * The properties of the current internalColumn have to be executed even if the html element of the cell already exists.
         * Other "cell properties" like cellContentPadding only have to be set when the html element of the cell does not exists as thoses will be set by attribute processors or something similar.
         * @param elementCell The cell to fill.
         * @param internalColumn The column definition.
         * @param value The value the cell should display.
         */
        protected __fillCell(elementCell: HTMLTableCellElement, internalColumn: TcHmiTreeView.Column | TcHmiTreeView.SimpleColumn, value: any, isPreparedValue?: boolean): void;
        /**
         * Resizes the specified column and remembers the result in __columnWidths
         * @param columnIndex The index of the column to resize. 0 is row numbers column.
         * @param newWidth The new width of the column. Will be set to minWidth if it is smaller. This value already respects the widthUnit.
         * @param override Set to true to resize a column that is marked as not resizable and process the size even when it has not changed. Useful for changes in widthUnit.
         */
        protected __resizeColumn(columnIndex: number, newWidth: number, override?: boolean): void;
        /**
         * Function to expand a row.
         * @param rowElement The HTMLElement row to expand
         */
        protected __expandRowElement(rowElement: HTMLElement): void;
        /**
         * Function to collapse a row.
         * @param rowElement The HTMLElement row to expand
         */
        protected __collapseRowElement(rowElement: HTMLElement): void;
        /**
         * Is raised when a row is clicked.
         * @param event The click event.
         */
        protected __onRowClick: (event: MouseEvent) => void;
        /**
         * Is raised if the span in the first table is mousedown.
         * @param event - The event of mouseDown
         */
        protected __onColumnMouseDown: (event: MouseEvent) => void;
        /**
         * Is raised if the span in the first table is moved.
         * @param event - The event of mouseMove
         */
        protected __onColumnMouseMove: (event: MouseEvent) => void;
        /**
         * Is raised if the span in the first table is mouseup.
         */
        protected __onColumnMouseUp: () => void;
        /**
         * Is raised if the span in the first table is double clicked.
         * @param event - The event of mouseDblClick.
         */
        protected __onColumnMouseDblClick: (event: MouseEvent) => void;
        /**
         * Is raised if the header element is keyup. Sort the data table.
         * @param event - The event of mouseUp
         */
        protected __onSortClick: (event: MouseEvent) => void;
        /**
         * Handles touchstart events on table headers for sorting
         * @param event The event of touchstart
         */
        protected __onSortTouchStart: (event: TouchEvent) => void;
        /**
         * Handles touchmove events on table headers for sorting
         * @param event The event of touchmove
         */
        protected __onSortTouchMove: (event: TouchEvent) => void;
        /**
         * Handles touchend events on table headers for sorting
         * @param event The event of touchend
         */
        protected __onSortTouchEnd: (event: TouchEvent) => void;
        /**
         * Handles touchcancel event on table headers for sorting
         * @param event The event of touchcancel
         */
        protected __onSortTouchCancel: (event: TouchEvent) => void;
        /**
         * Modifies the sorting after a click or touch on a sort element.
         * @param sortElement The sort element.
         * @param composing Whether the sorting is modified by composing multiple sort criteria.
         */
        protected __modifySorting(sortElement: HTMLElement, composing: boolean): void;
        /**
         * Generate a map that specifies the indices of the data according to the sort criteria in __sorting
         */
        protected __filterAndSort(): void;
        /**
         * Is raised if the data table is scrolled.
         * @param event - The event of scroll
         */
        protected __onScroll: (event: Event) => void;
        /**
         * Updates the height of the divs above and below the data table to display correct scrollbars.
         */
        protected __updateSentinels(): void;
        /**
         * Is raised if the TextBox or overlay div of TextBlock gets the focus.
         * @param event The event of focus
         */
        protected __onFocusElement: (event: Event) => void;
        /**
         * Is raised if the TextBox or overlay div of TextBlock loose the focus and set the new value to data.
         * @param event The focus out event.
         */
        protected __onFocusElementOut: (event: Event) => void;
        /**
         * Is raised after successful interaction with a TcHmiKeyboard control with indirect input.
         * @param event
         */
        protected __onIndirectInputAccepted: (event: Event) => void;
        /**
         * Is raised after canceled interaction with an TcHmiKeyboard control with indirect input.
         * @param event
         */
        protected __onIndirectInputCanceled: (event: Event) => void;
        /**
         * Is raised if an empty area is clicked.
         * @param event The event of click.
         */
        protected __onEmptyAreaClick: (event: MouseEvent) => void;
        /**
         * Event handler for the keydown event of textboxes.
         * @param event The event object
         */
        protected __onKeydown: (event: KeyboardEvent) => void;
        /**
         * Event handler for the input event of textboxes.
         * @param event The event object
         */
        protected __onInput: (event: KeyboardEvent) => void;
        /**
         * Event handler for the mousedown event of checkboxes.
         * @param event The event object
         */
        protected __onCheckboxMouseDown: (event: MouseEvent) => void;
        /**
         * Is raised if the CheckBox, ToggleSwitch or RadioButton state is changed.
         * @param elemCell - The change event.
         */
        protected __onValueChange: (event: Event) => void;
        /**
         * Accepts the value entered into a textbox, writes it to the source data and optionally unlocks the table cell.
         * @param inputElement The input element that the value was written into.
         * @param unlock If true, the table cell will be unlocked.
         */
        protected __acceptTextboxInput(inputElement: HTMLInputElement, unlock: boolean): void;
        /**
         * Modifies the data when a radio button is pressed. Returns the new value of the modified row and column.
         * @param row The actively manipulated row.
         * @param column The index of the column to modify.
         */
        protected __modifyRadioButton(row: number[], column: number, rowElement?: HTMLElement, forceWrite?: boolean): {
            convertedValue: boolean;
            needSorting: boolean;
        } | null | undefined;
        /**
         * Event handler for the mousedown event of buttons.
         * @param event The event object
         */
        protected __onButtonMousedown: (event: MouseEvent) => void;
        /**
         * Event handler for the mousedown event of buttons.
         * @param event The event object
         */
        protected __onButtonMouseup: (event: MouseEvent) => void;
        /**
         * Event handler for the mousedown event of buttons.
         * @param event The event object
         */
        protected __onButtonMouseleave: (event: MouseEvent) => void;
        /**
         * Event handler for the mousedown event of buttons.
         * @param event The event object
         */
        protected __onButtonMouseenter: (event: MouseEvent) => void;
        /**
         * Event handler for the touchstart event of buttons.
         * @param event The event object
         */
        protected __onButtonTouchstart: (event: TouchEvent) => void;
        /**
         * Event handler for the touchend event of buttons.
         * @param event The event object
         */
        protected __onButtonTouchend: (event: TouchEvent) => void;
        /**
         * Modifies the data. Returns the new value of the modified row and column.
         * @param valueNew The new value.
         * @param row The row in the current Data to modify.
         * @param column The index of the column to modify.
         * @returns null or an objects including the converted value and information whether sorting is needed.
         */
        protected __modifyData(valueNew: any, row: number[], column: number, rowElement?: HTMLElement, forceWrite?: boolean): {
            convertedValue: any;
            needSorting: boolean;
        } | null;
        /**
         * Reads the property of an object that can be found by following the specified path.
         * @param obj The object containing the property to read.
         * @param path The path where the property can be found.
         * @returns the value or null if the value could not be read.
         */
        protected __readObjectProperty(obj: object, path: string): any;
        /**
         * Writes the property of an object that is specified by the given path.
         * @param obj The object which will be written to.
         * @param path The path where to write.
         * @param valueNew The value to write.
         */
        protected __writeObjectProperty(obj: object, path: string, valueNew: any): void;
        /**
         * Lock the cell specified by row and column. A locked cell will not be updated when Data changes.
         * @param row The hierarchical index of the row that contains the cell to be locked. This index refers to the row in the unpaged data.
         * @param column The column that contains the cell to be locked.
         * @param rowElement The table row element of the row that contains the cell to be locked.
         * @param targetElement If the cell to be locked contains a button, this is the element that received the click or touchstart event.
         */
        protected __lock(row: number[], column: number, rowElement: HTMLTableRowElement, targetElement?: HTMLElement): void;
        /**
         * Unlocks the control.
         */
        protected __unlock(): void;
        /**
         * Processes the current enabled state.
         */
        __processIsEnabled(): void;
        /**
         * Sets the value of the member variable "Columns" if the new value is not equal to the current value
         * and calls the associated process function (processColumns) after that.
         * @param valueNew The new value for Columns.
         */
        setColumns(valueNew: TcHmiTreeView.Column[] | TcHmiTreeView.SimpleColumn | null): void;
        /**
         * The watch callback for the columns object resolver.
         */
        protected __onResolverForColumnsWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiTreeView.Column[] | TcHmiTreeView.SimpleColumn>) => void;
        /**
         * Returns the current value of the member variable text.
         * @returns the current value of the member variable text.
         */
        getColumns(): TcHmiTreeView.SimpleColumn | TcHmiTreeView.Column[] | undefined;
        /**
         * Processes the current value of columns.
         * UpdateTable is called with columns (Array.<DGColumnDefinition>) and null as parameter.
         */
        protected __processColumns(): void;
        /**
         * Create the HTMLElemets of a combobox dropdown.
         * @param dataDefinitions
         */
        protected __createDropDown(dataDefinitions: TcHmiDatagrid.DataDefinition | TcHmiDatagrid.DataDefinition[] | undefined): void;
        /**
         * Executes the given format function.
         * @param format   The format function to execute.
         * @param value    The value to format.
         * @returns the result of the function.
         */
        private __executeFormatFunction;
        /**
         * Sets the value of the member variable "data" if the new value is not equal to the current value
         * and calls the associated process function (processData) after that.
         * @param valueNew The new value for data.
         */
        setData(valueNew: any[] | null): void;
        /**
         * The private setter of the member variable "data".
         * @param valueNew The new value for data.
         */
        private __setData;
        /**
         * The watch callback for the data object resolver
         */
        protected __onResolverForDataWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<any[]>) => void;
        /**
         * Returns the current value of the member variable data.
         * @returns the current value of the member variable data.
         */
        getData(): any[] | undefined;
        /**
         * Processes the current value of data.
         * UpdateTable is called with null and data (Array.<Object>) as parameter.
         */
        protected __processData(): void;
        /**
         * Writes all values previously entered by the user into the source data, depending on DataPrecedence.
         * UserInput that is overridden by incoming data will be removed.
         */
        protected __restoreUserInput(data: TcHmiDatagrid.PagedArray<any>, raiseEvents?: boolean): void;
        /**
         * Function to process the user input and write changes to the data.
         **/
        writePreparedValues(): void;
        /**
         * Function to reset the user input and write changes to the data.
         **/
        resetPreparedValues(): void;
        /**
         * Function to check if there is user input for a specific cell
         * @param value the original value
         * @param row the row of the cell
         * @param column the column of the cell
         */
        protected __checkForIndirectWriteValue(value: any, row: number[], column: number): {
            value: any;
            isPreparedValue: boolean;
        };
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
        getDataSchema(): JsonSchema | null | undefined;
        /**
         * Processes the current value of dataSchema.
         * UpdateTable is called.
         */
        protected __processDataSchema(): void;
        /**
         * The setter function for the "data symbol".
         * @param valueNew The new datasymbol.
         */
        setDataSymbol(valueNew: TcHmi.Symbol<any[]> | null): void;
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
        protected __onDataSymbolPage: (data: Server.IResultObject<unknown, any[]>) => void;
        /**
         * Checks all levels of a server response for errors and returns any error details that are found.
         * @param data The server resonse.
         */
        protected __checkServerErrors(data: Server.IResultObject): IErrorDetails | null;
        /**
         * Callback function for dataSymbol watch.
         */
        protected __onDataSymbolWatch: (data: TcHmi.Symbol.IReadResultObject<any[]>) => void;
        /**
         * The setter for the dataSymbolTransform function.
         * @param valueNew The new dataSymbolTransform function.
         */
        __setDataSymbolTransform(valueNew: ((rowData: any) => any) | null): void;
        /**
         * Sets the value of the member variable "sorting" if the new value is not equal to the current value
         * and calls the associated process function (processSorting) after that.
         * @param valueNew The new value for sorting.
         */
        setSorting(valueNew: TcHmiDatagrid.SortingInfo[] | null): void;
        /**
         * The watch callback for the sorting object resolver
         */
        protected __onResolverForSortingWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiDatagrid.SortingInfo[]>) => void;
        /**
         * Returns the current value of the member variable sorting.
         * @returns the current value of the member variable sorting.
         */
        getSorting(): SortingInfo[] | undefined;
        /**
         * Processes the current value of sorting.
         */
        protected __processSorting(): void;
        /**
         * Sets the value of the member variable "filter" if the new value is not equal to the current value
         * and calls the associated process function (processFilter) after that.
         * @param valueNew the new value for filter.
         */
        setFilter(valueNew: Filter | null): void;
        /**
         * The watch callback for the filter object resolver
         */
        protected __onResolverForFilterWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Filter>) => void;
        /**
         * Returns the current value of the member variable filter.
         * @returns the current value of the member variable filter.
         */
        getFilter(): Filter | null | undefined;
        /**
         * Processes the current value of filter.
         */
        protected __processFilter(): void;
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
         * @param restoreOriginalValues If true, the original values will be restored in the control. Otherwise the control will just forget which values were entered by the user
         */
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
        protected getDataPrecedence(): DataPrecedence | undefined;
        /**
         * Sets the value of indirectWrite
         * @param valueNew The new value for indirectWrite
         */
        setIndirectWrite(valueNew: boolean | null): void;
        /**
         * Gets the value of IndirectWrite
         * @returns The current value of IndirectWrite
         */
        getIndirectWrite(): boolean | undefined;
        /**
         * Processes IndirectWrite
         */
        protected __processIndirectWrite(): void;
        /**

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
         * Processes the current rowClassesProvider method
         */
        protected __processRowClassesProvider(): void;
        /**
         * Executes the current rowClassesProvider function.
         * @param originalIndex The hierarchical index of the element to handle.
         */
        private __executeRowClassesProviderFunction;
        /**
         * Set the required classes on the specified row element
         * @param row The element to set classes on
         * @param dataIndex The index of the row data in data
         */
        protected __setRowClasses(row: HTMLElement, dataIndex: number[]): void;
        /**
         * Sets the value of the member variable "headerHeight" if the new value is not equal to the current value
         * and calls the associated process function (processHeaderHeight) after that.
         * @param valueNew The new value for headerHeight.
         */
        setHeaderHeight(valueNew: number | null): void;
        /**
         * Returns the current value of the member variable headerHeight.
         * @returns the current value of the member variable headerHeight.
         */
        getHeaderHeight(): number | undefined;
        /**
         * Processes the current value of headerHeight.
         * UpdateTable is called with columns (string) and null as parameter.
         */
        protected __processHeaderHeight(): void;
        /**
         * Sets the value of the member variable "headerHeightUnit" if the new value is not equal to the current value
         * and calls the associated process function (processHeaderHeightUnit) after that.
         * @param valueNew The new value for headerHeightUnit.
         */
        setHeaderHeightUnit(valueNew: DimensionUnit | null): void;
        /**
         * Returns the current value of the member variable headerHeightUnit.
         * @returns the current value of the member variable headerHeightUnit.
         */
        getHeaderHeightUnit(): "px" | "%" | undefined;
        /**
         * Processes the current value of headerHeightUnit.
         * UpdateTable is called with columns (string) and null as parameter.
         */
        protected __processHeaderHeightUnit(): void;
        /**
         * Sets the value of the member variable "headerCellPadding" if the new value is not equal to the current value
         * and calls the associated process function (processHeaderCellPadding) after that.
         * @param valueNew The new value for headerCellPadding.
         */
        setHeaderCellPadding(valueNew: FourSidedCss | null): void;
        /**
         * The watch callback for the headerCellPadding object resolver
         */
        protected __onResolverForHeaderCellPaddingWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<FourSidedCss>) => void;
        /**
         * Returns the current value of the member variable headerCellPadding.
         * @returns the current value of the member variable headerCellPadding.
         */
        getHeaderCellPadding(): FourSidedCss | null | undefined;
        /**
         * Processes the current value of headerCellPadding.
         * UpdateTable is called with null and data (string) as parameter.
         */
        protected __processHeaderCellPadding(): void;
        /**
         *
         * Sets the value of the member variable "rowHeight" if the new value is not equal to the current value
         * and calls the associated process function (processrowHeight) after that.
         * @param valueNew The new value for rowHeight.
         */
        setRowHeight(valueNew: number | null): void;
        /**
         * Returns the current value of the member variable rowHeight.
         * @returns the current value of the member variable rowHeight.
         */
        getRowHeight(): number | undefined;
        /**
         * Processes the current value of rowHeight.
         * UpdateTable is called with null and data (string) as parameter.
         */
        protected __processRowHeight(): void;
        /**
         * Returns the current value of the member variable rowHeightUnit.
         * @returns the current value of the member variable rowHeightUnit.
         */
        getRowHeightUnit(): string;
        /**
         * Sets the table-border-color attribute value and calls the associated process function (processBorderColor).
         * @param valueNew The new attribute value.
         */
        setTableBorderColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the tableBorderColor object resolver
         */
        protected __onResolverForTableBorderColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current table-border-color value.
         * @returns the current attribute value.
         */
        getTableBorderColor(): SolidColor | null | undefined;
        /**
         * Processes the current table-border-color attribute.
         */
        protected __processTableBorderColor(): void;
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
         * Processes the current border-width attribute.
         */
        protected __processTableBorderWidth(): void;
        /**
         * Internal reference to the attribute "data-tchmi-table-border-type".
         * @param valueNew The new BorderStyle of the table.
         */
        setTableBorderStyle(valueNew: TcHmi.BorderStyle | null): void;
        /**
         * The watch callback for the tableBorderStyle object resolver
         */
        protected __onResolverForTableBorderStyleWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<BorderStyle>) => void;
        /**
         * Returns the current table-border-style value.
         * @returns The current attribute value.
         */
        getTableBorderStyle(): BorderStyle | null | undefined;
        /**
         * Processes the current border-style attribute.
         */
        protected __processTableBorderStyle(): void;
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
         * Processes showHeader
         */
        protected __processShowHeader(): void;
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
         * Processes showRowNumbers
         */
        protected __processShowRowNumbers(): void;
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
         * Processes rowNumbersResizable
         */
        protected __processRowNumbersResizable(): void;
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
         * Processes rowNumbersStartNumber
         */
        protected __processRowNumbersStartNumber(): void;
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
         * Processes rowNumbersWidth
         */
        protected __processRowNumbersWidth(): void;
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
         * Processes rowNumbersWidthUnit
         */
        protected __processRowNumbersWidthUnit(): void;
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
         * Processes rowNumbersHorizontalAlignment
         */
        protected __processRowNumbersHorizontalAlignment(): void;
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
         * Processes rowNumbersVerticalAlignment
         */
        protected __processRowNumbersVerticalAlignment(): void;
        /**
         * Sets the value of the member variable "rowNumbersCellPadding" if the new value is not equal to the current value
         * and calls the associated process function (processRowNumbersCellPadding) after that.
         * @param valueNew The new value for rowNumbersCellPadding.
         */
        setRowNumbersCellPadding(valueNew: TcHmi.FourSidedCss | null): void;
        /**
         * The watch callback for the rowNumbersCellPadding object resolver
         */
        protected __onResolverForRowNumbersCellPaddingWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<FourSidedCss>) => void;
        /**
         * Returns the current value of the member variable rowNumbersCellPadding.
         * @returns the current value of the member variable rowNumbersCellPadding.
         */
        getRowNumbersCellPadding(): FourSidedCss | null | undefined;
        /**
         * Processes the current value of rowNumbersCellPadding.
         * UpdateTable is called with null and data (string) as parameter.
         */
        protected __processRowNumbersCellPadding(): void;
        /**
         * Sets the value of the member variable "cellContentPadding" if the new value is not equal to the current value
         * and calls the associated process function (processCellContentPadding) after that.
         * @param valueNew The new value for cellContentPadding.
         */
        setCellContentPadding(valueNew: FourSidedCss | null): void;
        /**
         * The watch callback for the cellContentPadding object resolver
         */
        protected __onResolverForCellContentPaddingWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<FourSidedCss>) => void;
        /**
         * Returns the current value of the member variable cellContentPadding.
         * @returns the current value of the member variable cellContentPadding.
         */
        getCellContentPadding(): FourSidedCss | null | undefined;
        /**
         * Processes the current value of cellContentPadding.
         * UpdateTable is called with null and data (string) as parameter.
         */
        protected __processCellContentPadding(): void;
        /**
         * Sets the background value and calls the associated process function ("processHeaderBackground").
         * @param valueNew The new value for the header background attribute as json string.
         */
        setHeaderBackgroundColor(valueNew: Color | null): void;
        /**
         * The watch callback for the headerBackgroundColor object resolver
         */
        protected __onResolverForHeaderBackgroundColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Color>) => void;
        /**
         * Returns the current header background value.
         * @returns The current value of the header background member variable as json in string format.
         */
        getHeaderBackgroundColor(): Color | null | undefined;
        /**
         * Processes the current header background attribute.
         */
        protected __processHeaderBackgroundColor(): void;
        /**
         * Sets the text color and calls the associated process function (processHeaderTextColor).
         * @param valueNew The new value for textFColor.
         */
        setHeaderTextColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the headerTextColor object resolver
         */
        protected __onResolverForHeaderTextColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current value of headertextColor.
         * @returns The current value of headertextColor.
         */
        getHeaderTextColor(): SolidColor | null | undefined;
        /**
         * Processes the current headertextColor attribute value.
         */
        protected __processHeaderTextColor(): void;
        /**
         * Sets the text color and calls the associated process function (processRowNumbersTextColor).
         * @param valueNew The new value for textFColor.
         */
        setRowNumbersTextColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the rowNumbersTextColor object resolver
         */
        protected __onResolverForRowNumbersTextColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;
        /**
         * Returns the current value of rowNumberstextColor.
         * @returns the current value of rowNumberstextColor.
         */
        getRowNumbersTextColor(): SolidColor | null | undefined;
        /**
         * Processes the current rowNumberstextColor attribute value.
         */
        protected __processRowNumbersTextColor(): void;
        /**
         * Sets the row numbers background value and calls the associated process function ("processRowNumbersBackground").
         * @param valueNew The new value for the row numbers background attribute.
         */
        setRowNumbersBackgroundColor(valueNew: Color | null): void;
        /**
         * The watch callback for the rowNumbersBackgroundColor object resolver
         */
        protected __onResolverForRowNumbersBackgroundColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Color>) => void;
        /**
         * Returns the current row numbers background value.
         * @returns The current value of the row numbers background member variable.
         */
        getRowNumbersBackgroundColor(): Color | null | undefined;
        /**
         * Processes the current row numbers background attribute.
         */
        protected __processRowNumbersBackgroundColor(): void;
        /**
         * Sets the header font family and calls the associated process function.
         * @param valueNew The new value for headerFontFamily
         */
        setHeaderFontFamily(valueNew: FontFamily | null): void;
        /**
         * Returns the current value of headerFontFamily.
         * @returns The current value of headerFontFamily.
         */
        getHeaderFontFamily(): string | null | undefined;
        /**
         * Processes the current headerFontFamily.
         */
        protected __processHeaderFontFamily(): void;
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
         * Processes the current headerFontSize.
         */
        protected __processHeaderFontSize(): void;
        /**
         * Sets the header font size unit and calls the associated process function.
         * @param valueNew The new value for headerFontSizeUnit
         */
        setHeaderFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current value of headerFontSizeUnit.
         * @returns The current value of headerFontSizeUnit.
         */
        getHeaderFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current headerFontSizeUnit.
         */
        protected __processHeaderFontSizeUnit(): void;
        /**
         * Sets the header font style and calls the associated process function.
         * @param valueNew The new value for headerFontStyle
         */
        setHeaderFontStyle(valueNew: FontStyle | null): void;
        /**
         * Returns the current value of headerFontStyle.
         * @returns The current value of headerFontStyle.
         */
        getHeaderFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined;
        /**
         * Processes the current headerFontStyle.
         */
        protected __processHeaderFontStyle(): void;
        /**
         * Sets the header font family and calls the associated process function.
         * @param valueNew The new value for headerFontWeight
         */
        setHeaderFontWeight(valueNew: FontWeight | null): void;
        /**
         * Returns the current value of headerFontWeight.
         * @returns The current value of headerFontWeight.
         */
        getHeaderFontWeight(): "Normal" | "Auto" | "Bold" | undefined;
        /**
         * Processes the current headerFontWeight.
         */
        protected __processHeaderFontWeight(): void;
        /**
         * Sets the grid font family and calls the associated process function.
         * @param valueNew The new value for gridFontFamily
         */
        setGridFontFamily(valueNew: FontFamily | null): void;
        /**
         * Returns the current value of gridFontFamily.
         * @returns The current value of gridFontFamily.
         */
        getGridFontFamily(): string | null | undefined;
        /**
         * Processes the current gridFontFamily.
         */
        protected __processGridFontFamily(): void;
        /**
         * Sets the grid font size and calls the associated process function.
         * @param valueNew The new value for gridFontSize
         */
        setGridFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of gridFontSize.
         * @returns The current value of gridFontSize.
         */
        getGridFontSize(): number | undefined;
        /**
         * Processes the current gridFontSize.
         */
        protected __processGridFontSize(): void;
        /**
         * Sets the grid font size unit and calls the associated process function.
         * @param valueNew The new value for gridFontSizeUnit
         */
        setGridFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current value of gridFontSizeUnit.
         * @returns The current value of gridFontSizeUnit.
         */
        getGridFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current gridFontSizeUnit.
         */
        protected __processGridFontSizeUnit(): void;
        /**
         * Sets the grid font style and calls the associated process function.
         * @param valueNew The new value for gridFontStyle
         */
        setGridFontStyle(valueNew: FontStyle | null): void;
        /**
         * Returns the current value of gridFontStyle.
         * @returns The current value of gridFontStyle.
         */
        getGridFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined;
        /**
         * Processes the current gridFontStyle.
         */
        protected __processGridFontStyle(): void;
        /**
         * Sets the grid font family and calls the associated process function.
         * @param valueNew The new value for gridFontWeight
         */
        setGridFontWeight(valueNew: FontWeight | null): void;
        /**
         * Returns the current value of gridFontWeight.
         * @returns The current value of gridFontWeight.
         */
        getGridFontWeight(): "Normal" | "Auto" | "Bold" | undefined;
        /**
         * Processes the current gridFontWeight.
         */
        protected __processGridFontWeight(): void;
        /**
         * Sets the row numbers font family and calls the associated process function.
         * @param valueNew The new value for rowNumbersFontFamily
         */
        setRowNumbersFontFamily(valueNew: FontFamily | null): void;
        /**
         * Returns the current value of rowNumbersFontFamily.
         * @returns The current value of rowNumbersFontFamily.
         */
        getRowNumbersFontFamily(): string | null | undefined;
        /**
         * Processes the current rowNumbersFontFamily.
         */
        protected __processRowNumbersFontFamily(): void;
        /**
         * Sets the row numbers font size and calls the associated process function.
         * @param valueNew The new value for rowNumbersFontSize
         */
        setRowNumbersFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of rowNumbersFontSize.
         * @returns The current value of rowNumbersFontSize.
         */
        getRowNumbersFontSize(): number | undefined;
        /**
         * Processes the current rowNumbersFontSize.
         */
        protected __processRowNumbersFontSize(): void;
        /**
         * Sets the row numbers font size unit and calls the associated process function.
         * @param valueNew The new value for rowNumbersFontSizeUnit
         */
        setRowNumbersFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current value of rowNumbersFontSizeUnit.
         * @returns The current value of rowNumbersFontSizeUnit.
         */
        getRowNumbersFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current rowNumbersFontSizeUnit.
         */
        protected __processRowNumbersFontSizeUnit(): void;
        /**
         * Sets the row numbers font style and calls the associated process function.
         * @param valueNew The new value for rowNumbersFontStyle
         */
        setRowNumbersFontStyle(valueNew: FontStyle | null): void;
        /**
         * Returns the current value of rowNumbersFontStyle.
         * @returns The current value of rowNumbersFontStyle.
         */
        getRowNumbersFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined;
        /**
         * Processes the current rowNumbersFontStyle.
         */
        protected __processRowNumbersFontStyle(): void;
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
         * Processes the current rowNumbersFontWeight.
         */
        protected __processRowNumbersFontWeight(): void;
        /**
         * Sets the selected row by index.
         * @param valueNew The new value for selectedRowIndex
         */
        setSelectedRowIndex(valueNew: number[] | null): void;
        /**
         * The watch callback for the rowNumbersBackgroundColor object resolver
         */
        protected __onResolverForSelectedRowIndexWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<number[]>) => void;
        /**
         * Returns the current value of selectedRowIndex.
         * @returns The current value of selectedRowIndex.
         */
        getSelectedRowIndex(): number[] | null;
        /**
         * Processes the current selectedRowIndex.
         */
        protected __processSelectedRowIndex(): void;
        /**
         * Sets the selected column by index.
         * @param valueNew The new value for selectedColumnIndex
         */
        setSelectedColumnIndex(valueNew: number | null): void;
        /**
         * Returns the current value of selectedColumnIndex.
         * @returns The current value of selectedColumnIndex.
         */
        getSelectedColumnIndex(): number | null;
        /**
         * Processes the current selectedColumnIndex.
         */
        protected __processSelectedColumnIndex(): void;
        /**
         * Returns the current value of dataHasChanged.
         * @returns The current value of dataHasChanged.
         */
        getDataHasChanged(): boolean;
        /**
         * Returns the current value of SelectedCellValue.
         * @returns The current value of SelectedCellValue.
         */
        getSelectedCellValue(): any;
        /**
         * Returns the current value of SelectedRowValue.
         * @returns The current value of SelectedRowValue.
         */
        getSelectedRowValue(): any;
        /**
         * Sets the value of the width mode attribute.
         * @param valueNew The new width mode value.
         */
        setWidthMode(valueNew: SizeModeWithContent | null): void;
        /**
         * Calculates the width of all columns inside the control.
         */
        __getContentWidth(): number | null;
        /**
         * Processes the width attribute
         */
        __processWidth(): void;
        /**
         * Sets the value of the height mode attribute.
         * @param valueNew The new height mode value.
         */
        setHeightMode(valueNew: SizeModeWithContent | null): void;
        /**
         * Calculates the height of all columns inside the control.
         */
        __getContentHeight(): number | null;
        /**
         * Processes the height attribute
         */
        __processHeight(): void;
        /**
         * Sets the value of the member variable "HierarchicalDataProperty".
         * @param valueNew The new value for HierarchicalDataProperty
         */
        setHierarchicalDataProperty(valueNew: string | null | undefined): void;
        /**
         * Returns the current value of the member variable HierarchicalDataProperty.
         * @returns the current value of the member variable HierarchicalDataProperty.
         */
        getHierarchicalDataProperty(): string | undefined;
        /**
         * Processes the current value of HierarchicalDataProperty.
         */
        protected __processHierarchicalDataProperty(): void;
    }
    module TcHmiTreeView {
        interface FlatData {
            /** List of indices to address a data object in a nested array or object */
            index: number[];
        }
        interface ExpandedElement {
            index: string;
            childCount?: number;
            oldDisplayedIndex?: number[];
            used?: boolean;
        }
        interface Cell {
            /** List of indices to address a data object in a nested array or object */
            index: number[];
            column: number;
            newValue: any;
            path: string;
            time: number;
        }
        interface SubscriptionData {
            filterMap: number[];
            readValue: any[];
            offset?: number;
            maxEntries?: number;
            orderBy?: string;
        }
        type ColumnControl = 'TextBlock' | 'TextBox' | 'CheckBox' | 'ComboBox' | 'Image' | 'PasswordInput' | 'NumericInput' | 'SpinboxInput' | 'DateTimeInput' | 'TimespanInput' | 'Button' | 'ToggleButton' | 'ToggleSwitch' | 'RadioButton' | 'AutoDetectControl';
        interface Column extends SimpleColumn {
            /** Name of the property in the srcData object */
            name: string;
        }
        interface SimpleColumn {
            /** Background color of the cells in this column */
            cellBackground?: TcHmi.SolidColor | null;
            /** Text color of the cells in this column */
            textColor?: TcHmi.SolidColor | null;
            /** Name of the Label for this column */
            label: string;
            /** Type of the input elements for this column */
            control: ColumnControl;
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
            /** Mapping from the srcData to a Combobox or Image selection */
            dataDefinitions?: TcHmiDatagrid.DataDefinition[] | TcHmiDatagrid.DataDefinition;
            /**Horizontal alignment of this header */
            headerHorizontalAlignment?: TcHmi.HorizontalAlignment;
            /**Vertical alignment of this header */
            headerVerticalAlignment?: TcHmi.VerticalAlignment;
            /** When set to true a backslash in a text will be shown verbatim in the HMI. */
            ignoreEscapeSequences?: boolean;
            /** When set to true the control will automatically lose focus when the user presses the enter or escape key */
            autoFocusOut?: boolean;
            /** When set to true all text within the control will be selected when the control gains focus */
            autoSelectText?: boolean;
        }
        function isNamedColumn(obj: Column | SimpleColumn): obj is Column;
        interface UserInput {
            /** List of indices to address a data object in a nested array or object */
            index: number[];
            column?: string;
            columnIndex: number;
            userData: any;
            originalData: any;
        }
    }
}
//# sourceMappingURL=TcHmiTreeView.d.ts.map