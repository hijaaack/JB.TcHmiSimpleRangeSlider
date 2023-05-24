declare module TcHmi.Controls.Helpers {
    class SchemaParser {
        private static readonly __restrictions;
        private static readonly __cloneEditorInfoOptions;
        private static readonly __compareEditorInfoOptions;
        /**
         * Parses a JSON schema into editor info objects.
         * @param schema The schema to parse.
         */
        static parse(schema: JsonSchema): BooleanEditor.Info | NumberEditor.Info | StringEditor.Info | TimeEditor.Info | EnumEditor.Info<any> | ObjectEditor.Info | ArrayEditor.Info | TupleEditor.Info | NullEditor.Info | ChoiceEditor.Info;
        /**
         * Resolves allOf members by combining all entries of the allOf into one schema.
         * @param schema The schema to be resolved.
         */
        static resolveAllOf(schema: JsonSchema): JsonSchema;
        /**
         * Recursively resolves references in a schema. Can handle recursive schemas.
         * @param schema The schema to resolve.
         */
        static resolveReferences(schema: JsonSchema): JsonSchema;
        /**
         * Returns the types and, if specified in the schema, their conversions, that are defined in the top level or reachable through anyOf or oneOf paths.
         * @param schema The schema to search for types.
         * @param strayRestrictions Restrictions that were defined further up the anyOf/oneOf chain but could not be applied there.
         */
        private static __findPossibleEditorTypes;
        /**
         * Generates a name for the given type by returning either the types title, a shortened version of the types id, or the capitalized editor type.
         * @param type The type to generate a name for.
         */
        private static __generateName;
        /**
         * Create an editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createEditorInfo;
        /**
         * Create a boolean editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createBooleanEditorInfo;
        /**
         * Create a number editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createNumberEditorInfo;
        /**
         * Create a string editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createStringEditorInfo;
        /**
         * Create a time editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createTimeEditorInfo;
        /**
         * Create an enum editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createEnumEditorInfo;
        /**
         * Create an object editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createObjectEditorInfo;
        /**
         * Create an array editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createArrayEditorInfo;
        /**
         * Create a tuple editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createTupleEditorInfo;
        /**
         * Create a choice editor info from the given types.
         * @param type The types to extract information from.
         * @param schema The original schema.
         */
        private static __createChoiceEditorInfo;
        /**
         * Create a null editor info from the given type.
         * @param type The types to extract information from.
         * @param schema The original schema.
         */
        private static __createNullEditorInfo;
        /**
         * Create an any editor info from the given type.
         * @param type The type to extract information from.
         * @param schema The original schema.
         */
        private static __createAnyEditorInfo;
        /**
         * Merges two or more editor infos together by creating an editor info that only accepts values that satisfy all passed in editor infos.
         * This functions trys to return an editor info of the same type as the first parameter.
         * @param toMerge The editor infos to be merged.
         */
        static mergeEditorInfos(...toMerge: Editor.EditorInfo[]): Editor.EditorInfo;
        /**
         * Merges boolean editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeBooleanEditorInfos;
        /**
         * Merges number editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeNumberEditorInfos;
        /**
         * Merges string editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeStringEditorInfos;
        /**
         * Merges time editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeTimeEditorInfos;
        /**
         * Merges enum editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeEnumEditorInfos;
        /**
         * Merges object editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeObjectEditorInfos;
        /**
         * Merges array editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeArrayEditorInfos;
        /**
         * Merges tuple editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeTupleEditorInfos;
        /**
         * Merges choice editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeChoiceEditorInfos;
        /**
         * Merges optional editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeOptionalEditorInfos;
        /**
         * Merges any editor infos.
         * @param target The target to merge into.
         * @param toMerge The editor infos to merge.
         */
        private static __mergeNullEditorInfos;
        /**
         * Compares two editor infos and determines if they are equivalent.
         * @param a The first editor info to compare.
         * @param b The second editor info to compare.
         */
        static editorInfoEquivalent(a: Editor.EditorInfo, b: Editor.EditorInfo): boolean;
    }
}
declare module TcHmi.Controls.Helpers {
    abstract class Editor<T, I extends Editor.EditorInfo = Editor.EditorInfo> {
        #private;
        protected __element: HTMLElement;
        protected __editorInfo: I;
        protected __parentControl: Controls.System.TcHmiControl;
        protected __name: string;
        protected readonly __className = "TcHmi_Controls_Helpers_Editor";
        protected __childControls: Set<System.TcHmiControl>;
        protected __eventDestroyers: Set<DestroyFunction>;
        protected __isEnabled: boolean;
        protected __localizations: Partial<Editor.LocalizableTexts> | undefined;
        protected __localizationSymbols: Map<string, {
            symbol: Symbol<string>;
            destroyWatch: DestroyFunction;
        }>;
        protected readonly __onChangeManager: CallbackManager<(editor: Editor<T, I>) => void>;
        readonly onChange: Readonly<{
            add: (callback: (editor: Editor<T, I>) => void) => DestroyFunction;
            remove: (callback: (editor: Editor<T, I>) => void) => void;
        }>;
        /**
         * Create a new editor.
         * @param __element The element to contain the editor.
         * @param __editorInfo An object containing information about the editor and the type of value to edit.
         * @param __parentControl The control owning the editor.
         */
        constructor(__element: HTMLElement, __editorInfo: I, __parentControl: Controls.System.TcHmiControl);
        /**
         * Create a new editor for the given editor info.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         * @param localizations A collection of localization symbols to display texts in the editor.
         */
        static create(element: HTMLElement, editorInfo: Editor.EditorInfo, parentControl: Controls.System.TcHmiControl, localizations?: Partial<Editor.LocalizableTexts>): Editor<any, Editor.EditorInfo>;
        /**
         * Calls all event destroyers.
         */
        destroy(): void;
        /**
         * Sets the editorInfo.
         * @param editorInfo
         */
        setEditorInfo(editorInfo: I): void;
        /**
         * Gets the editor info.
         */
        getEditorInfo(): I;
        /**
         * Processes the current editor info.
         */
        protected abstract __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        abstract setValue(value: T | null): void;
        /**
         * Gets the current value.
         */
        getState(): Editor.State<T>;
        /**
         * Gets the current raw value of the editor. This value might be invalid. To get the final actual value, always use getState.
         */
        abstract getRawValue(): T;
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: Editor.EditorInfo, value: any): boolean;
        /**
         * Enable or disable the editor. Disabled editors are greyed out and cannot be interacted with.
         * @param isEnabled Whether the editor should be enabled or disabled.
         */
        setIsEnabled(isEnabled: boolean): void;
        /**
         * Get whether the editor is enabled or disabled.
         */
        getIsEnabled(): boolean;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
        /**
         * Watch the given symbol and call the onChange callback every time it changes with the resolved and formatted symbol value.
         * @param name The name for this symbol. Must be unique across all inheritance layers and further calls for the same localization must use the same name.
         * @param localization The localization to watch.
         * @param onChange The callback that is called with the localized and formatted text as a parameter.
         */
        protected __watchLocalization(name: string, localization: FormattedLocalizable, onChange: (localizedText: string) => void): void;
        /**
         * Destroys the localization watch with the given name, if it exists.
         * @param name The name that was used with __watchLoclalization to start watching the symbol.
         */
        protected __unwatchLocalization(name: string): void;
    }
    module Editor {
        interface Info {
            type: EditorType;
            schema: JsonSchema;
            name: string;
        }
        type EditorType = 'boolean' | 'number' | 'string' | 'time' | 'enum' | 'object' | 'array' | 'tuple' | 'optional' | 'choice' | 'null' | 'invalid';
        type EditorInfo = BooleanEditor.Info | NumberEditor.Info | StringEditor.Info | TimeEditor.Info | EnumEditor.Info | ObjectEditor.Info | ArrayEditor.Info | TupleEditor.Info | OptionalEditor.Info | ChoiceEditor.Info | NullEditor.Info | InvalidEditor.Info;
        type State<T> = {
            isValid: false;
        } | {
            isValid: true;
            value: T;
        };
        interface LocalizableTexts {
            optionalEditor: Partial<OptionalEditor.LocalizableTexts>;
            buttonBasedEditor: Partial<ButtonBasedEditor.LocalizableTexts>;
            booleanEditor: Partial<BooleanEditor.LocalizableTexts>;
            timeEditor: Partial<TimeEditor.LocalizableTexts>;
            choiceEditor: Partial<ChoiceEditor.LocalizableTexts>;
            arrayBasedEditorPane: Partial<ArrayBasedEditorPane.LocalizableTexts>;
            objectEditorPane: Partial<ObjectEditorPane.LocalizableTexts>;
            arrayEditorPrompt: Partial<Omit<ArrayEditorPrompt.LocalizableTexts, 'editorLocalizations'>>;
            objectEditorPrompt: Partial<Omit<ObjectEditorPrompt.LocalizableTexts, 'editorLocalizations'>>;
            tupleEditorPrompt: Partial<Omit<TupleEditorPrompt.LocalizableTexts, 'editorLocalizations'>>;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    abstract class TextboxBasedEditor<T, I extends Editor.EditorInfo = Editor.EditorInfo> extends Editor<T, I> {
        protected __textbox: Beckhoff.TcHmiTextbox;
        /**
         * Create a new textbox based editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: I, parentControl: Controls.System.TcHmiControl);
        /**
         * Event handler for the onTextChanged event of the textbox.
         */
        protected __onTextChanged: () => void;
    }
}
declare module TcHmi.Controls.Helpers {
    class NumberEditor extends TextboxBasedEditor<number | string, NumberEditor.Info> {
        /**
         * Create a new number editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         * @param __restrictions Further restrictions for valid numbers.
         */
        constructor(element: HTMLElement, editorInfo: NumberEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: NumberEditor.Info, value: any): value is number | string;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Tests whether the supplied number fits into the given minimum.
         * @param value The number to test.
         * @param minimum The minimum to test against.
         */
        protected static __testMinimum(value: number, minimum: {
            value: number;
            exclusive: boolean;
        }): boolean;
        /**
         * Tests whether the supplied number fits into the given maximum.
         * @param value The number to test.
         * @param maximum The maximum to test against.
         */
        protected static __testMaximum(value: number, maximum: {
            value: number;
            exclusive: boolean;
        }): boolean;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: number | string | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): string | number;
    }
    module NumberEditor {
        interface Info extends Editor.Info {
            type: 'number';
            restrictions: Restriction[];
            specialValues: Set<string>;
        }
        interface Restriction {
            isInteger: boolean;
            multipleOf?: number;
            maximum?: {
                value: number;
                exclusive: boolean;
            };
            minimum?: {
                value: number;
                exclusive: boolean;
            };
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class StringEditor extends TextboxBasedEditor<string, StringEditor.Info> {
        /**
         * Create a new string editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: StringEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: StringEditor.Info, value: any): value is string;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: string | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): string;
    }
    module StringEditor {
        interface Info extends Editor.Info {
            type: 'string';
            restrictions: Restriction[];
        }
        interface Restriction {
            minLength?: number;
            maxLength?: number;
            patterns?: RegExp[];
            format?: JsonSchema['format'];
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class TimeEditor extends TextboxBasedEditor<string, TimeEditor.Info> {
        protected __container: HTMLDivElement;
        protected __dateTimePicker: Beckhoff.TcHmiDateTimePicker | undefined;
        protected __dateTimeButton: Beckhoff.TcHmiButton | undefined;
        protected __timespanPicker: Beckhoff.TcHmiTimespanPicker | undefined;
        protected __timespanButton: Beckhoff.TcHmiButton | undefined;
        /**
         * Create a new string editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: TimeEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: TimeEditor.Info, value: any): value is string;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: string | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): string;
        /**
         * Creates a DateTimePicker and a Button to open it.
         */
        protected __createDateTimeControls(): void;
        /**
         * Creates a TimespanPicker and a Button to open it.
         */
        protected __createTimespanControls(): void;
        /**
         * Event handler for the value changed event of the datetime picker.
         */
        protected __onDateTimeChanged: () => void;
        /**
         * Event handler for the pressed event of the datetime button.
         */
        protected __onDateTimeButtonPressed: () => void;
        /**
         * Event handler for the value changed event of the timespan picker.
         */
        protected __onTimespanChanged: () => void;
        /**
         * Event handler for the pressed event of the timespan button.
         */
        protected __onTimespanButtonPressed: () => void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
        /**
         * Localizes the dateTimeButton
         */
        protected __localizeDateTimeButton(): void;
        /**
         * Localizes the timespanButton
         */
        protected __localizeTimespanButton(): void;
    }
    module TimeEditor {
        interface Info extends Editor.Info {
            type: 'time';
            formats: Set<'date-time' | 'timespan'>;
        }
        interface LocalizableTexts {
            dateTimeButtonTooltip: Localizable;
            timespanButtonTooltip: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    abstract class ComboboxBasedEditor<T, I extends Editor.EditorInfo = Editor.EditorInfo> extends Editor<T, I> {
        protected __combobox: Beckhoff.TcHmiCombobox;
        /**
         * Create a new combobox based editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: I, parentControl: Controls.System.TcHmiControl);
        /**
         * Event handler for the onSelectionChanged event of the combobox.
         */
        protected __onSelectionChanged: () => void;
    }
}
declare module TcHmi.Controls.Helpers {
    class EnumEditor<T> extends ComboboxBasedEditor<T, EnumEditor.Info<T>> {
        /**
         * Create a new enum editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: EnumEditor.Info<T>, parentControl: Controls.System.TcHmiControl);
        /**
         * Returns whether the editor contains a valid value for the schema.
         */
        static validate<T = any>(editorInfo: EnumEditor.Info, value: any): value is T;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: T | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): any;
    }
    module EnumEditor {
        interface Info<T = any> extends Editor.Info {
            type: 'enum';
            members: Map<T, string | undefined>;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class BooleanEditor extends ComboboxBasedEditor<boolean, BooleanEditor.Info> {
        protected __comboboxTexts: {
            false: string;
            true: string;
        };
        /**
         * Create a new boolean editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: BooleanEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: BooleanEditor.Info, value: any): value is boolean;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: boolean | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): any;
        /**
         * Updates the combobox srcData with current texts.
         */
        protected __updateSrcData(): void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module BooleanEditor {
        interface Info extends Editor.Info {
            type: 'boolean';
        }
        interface LocalizableTexts {
            falseText: Localizable;
            trueText: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    abstract class ButtonBasedEditor<T, I extends Editor.EditorInfo = Editor.EditorInfo> extends Editor<T, I> {
        protected __container: HTMLDivElement;
        protected __textSpan: HTMLSpanElement;
        protected __button: Beckhoff.TcHmiButton;
        /**
         * Create a new button based editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: I, parentControl: Controls.System.TcHmiControl);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Event handler for the onPressed event of the button.
         */
        protected __onPressed: () => void;
        /**
         * Opens the popup for the editor.
         */
        protected abstract openPopup(): Promise<void>;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module ButtonBasedEditor {
        interface LocalizableTexts {
            buttonTooltip: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class ObjectEditor extends ButtonBasedEditor<object, ObjectEditor.Info> {
        protected __value: object;
        protected __popup: ObjectEditorPrompt | undefined;
        /**
         * Create a new object editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: ObjectEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Calls all event destroyers.
         */
        destroy(): void;
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: ObjectEditor.Info, value: any): value is object;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Resolves dependencies of an object editor info by merging the dependecies with names contained in knownProperties into the editorInfo. Returns the original editorInfo if no dependecies are matched.
         * @param editorInfo The editor info to resolve.
         * @param knownProperties The properties that are known to exist on the object value.
         */
        static resolveDependencies(editorInfo: ObjectEditor.Info, knownProperties: Set<string>): ObjectEditor.Info | InvalidEditor.Info;
        /**
         * Determines which editor info to use for the given property.
         * @param editorInfo The object editor info containing infos about the given property.
         * @param property The name of the property.
         */
        static getEditorInfoForProperty(editorInfo: ObjectEditor.Info, property: string): Editor.EditorInfo;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: object | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): object;
        /**
         * Opens the popup for the editor.
         */
        protected openPopup(): Promise<void>;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module ObjectEditor {
        interface Info extends Editor.Info {
            type: 'object';
            properties: Map<string, Editor.EditorInfo>;
            patternProperties?: Map<RegExp, Editor.EditorInfo>;
            additionalProperties: {
                allowed: boolean;
                editorInfo?: Editor.EditorInfo;
            };
            maxProperties?: number;
            minProperties?: number;
            dependencies?: Map<string, ObjectEditor.Info>;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class ObjectEditorPane extends Editor<object, ObjectEditor.Info> {
        protected __editorTable: HTMLTableElement;
        protected __newPropertyContainer: HTMLDivElement;
        protected __newPropertyTextbox: Beckhoff.TcHmiTextbox;
        protected __acceptNewPropertyButton: Beckhoff.TcHmiButton;
        protected __cancelNewPropertyButton: Beckhoff.TcHmiButton;
        protected __addPropertyButton: Beckhoff.TcHmiButton;
        protected __removeButtonTooltip: string;
        protected __editors: Map<string, ObjectEditorPane.EditorEntry>;
        protected __dependencyOverride: ObjectEditor.Info;
        protected __pauseChangeHandlers: boolean;
        /**
         * Create a new object editor pane.
         * @param element The element to contain the editor pane.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: ObjectEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Calls all event destroyers.
         */
        destroy(): void;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: object | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): object;
        /**
         * Determines which dependencies should be applied and changes the editors accordingly.
         */
        protected __applyDependencies(): void;
        /**
         * Creates a table row for the given editor info.
         * @param name The name of the property the row should edit.
         * @param editorInfo Info about the editor in the row.
         * @param isAdditional Whether the row describes an additional property that can be removed.
         */
        protected __createEditorRow(name: string, editorInfo: Editor.EditorInfo, isAdditional: boolean): ObjectEditorPane.EditorEntry;
        /**
         * Handler for the change events of the editors.
         */
        protected __onEditorChanged: (editor: Editor<any>) => void;
        /**
         * Creates a handler callback for the pressed event of a remove button.
         * @param name The name of the row to remove.
         */
        protected __getRemoveButtonPressedHandler(name: string): () => void;
        /**
         * Remove a row.
         * @param name The name of the row to remove.
         */
        protected __removeEditorRow(name: string): void;
        /**
         * Handler for the pressed event of the add property button.
         */
        protected __onAddPropertyPressed: () => void;
        /**
         * Handler for the text changed event of the new property textbox.
         */
        protected __onNewPropertyTextChanged: () => void;
        /**
         * Handler for the pressed event of the accept new property button.
         */
        protected __onAcceptNewPropertyPressed: () => void;
        /**
         * Handler for the pressed event of the cancel new property button.
         */
        protected __onCancelNewPropertyPressed: () => void;
        /**
         * Clear the new property textbox, hide the new property container and show the add property button.
         */
        protected __cancelNewProperty(): void;
        /**
         * Enable or disable the editor. Disabled editors are greyed out and cannot be interacted with.
         * @param isEnabled Whether the editor should be enabled or disabled.
         */
        setIsEnabled(isEnabled: boolean): void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module ObjectEditorPane {
        interface EditorEntry {
            editor: Editor<any>;
            row: HTMLTableRowElement;
            cell: HTMLTableCellElement;
            removeButton?: Beckhoff.TcHmiButton;
            additionalDestroyer?: DestroyFunction;
        }
        interface LocalizableTexts {
            addButtonTooltip: Localizable;
            acceptButtonText: Localizable;
            acceptButtonTooltip: Localizable;
            cancelButtonTooltip: Localizable;
            removeButtonTooltip: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class OptionalEditor<T> extends Editor<T | undefined, OptionalEditor.Info> {
        protected __container: HTMLDivElement;
        protected __editor: Editor<T>;
        protected __checkbox: Beckhoff.TcHmiCheckbox;
        /**
         * Create a new optional editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: OptionalEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Sets the editorInfo.
         * @param editorInfo
         */
        setEditorInfo(editorInfo: OptionalEditor.Info): void;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Handler for the toggleStateChanged event of the checkbox
         */
        protected __onToggleStateChanged: () => void;
        /**
         * Handler for the change event of the editor
         */
        protected __onEditorChanged: () => void;
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate<T = any>(editorInfo: OptionalEditor.Info, value: any): value is T;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: T | null | undefined): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): T | undefined;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module OptionalEditor {
        interface Info extends Editor.Info {
            type: 'optional';
            editorInfo: Exclude<Editor.EditorInfo, OptionalEditor.Info>;
            temporarilyRequired: boolean;
        }
        interface LocalizableTexts {
            optionalCheckboxTooltip: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class ArrayEditor extends ButtonBasedEditor<any[], ArrayEditor.Info> {
        protected __value: any[];
        protected __popup: ArrayEditorPrompt | undefined;
        /**
         * Create a new array editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: ArrayEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Calls all event destroyers.
         */
        destroy(): void;
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: ArrayEditor.Info, value: any): value is any[];
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: any[] | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): any[];
        /**
         * Opens the popup for the editor.
         */
        protected openPopup(): Promise<void>;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module ArrayEditor {
        interface Info extends Editor.Info {
            type: 'array';
            items: Editor.EditorInfo;
            minItems?: number;
            maxItems?: number;
            uniqueItems: boolean;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    abstract class ArrayBasedEditorPane<I extends ArrayEditor.Info | TupleEditor.Info> extends Editor<any[], I> {
        protected __editorTable: HTMLTableElement;
        protected __addItemButton: Beckhoff.TcHmiButton;
        protected __upButton: Beckhoff.TcHmiButton;
        protected __downButton: Beckhoff.TcHmiButton;
        protected __removeButtonTooltip: string;
        protected __editors: ArrayBasedEditorPane.EditorEntry[];
        protected __selectedEditorEntry: ArrayBasedEditorPane.EditorEntry | null;
        protected __pauseChangeHandlers: boolean;
        /**
         * Create a new array based editor pane.
         * @param element The element to contain the editor pane.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: I, parentControl: Controls.System.TcHmiControl);
        /**
         * Calls all event destroyers.
         */
        destroy(): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): any[];
        /**
         * Creates a table row for the given editor info.
         * @param editorInfo Info about the editor in the row.
         */
        protected __createEditorRow(editorInfo: Editor.EditorInfo, removable?: boolean): ArrayBasedEditorPane.EditorEntry;
        /**
         * Handler for the change events of the editors.
         * @param editor The editor that was changed.
         */
        protected __onEditorChanged: (editor: Editor<any>) => void;
        /**
         * Handles the change events of the editors.
         * @param editor The editor that was changed.
         */
        protected __handleOnEditorChanged(editor: Editor<any>): void;
        /**
         * Creates a handler callback for the pressed event of a remove button.
         * @param editorEntry The entry describing the row to remove.
         */
        protected __getRemoveButtonPressedHandler(entry: ArrayBasedEditorPane.EditorEntry): () => void;
        /**
         * Remove a row.
         * @param editorEntry The entry describing the row to remove.
         */
        protected __removeEditorRow(editorEntry: ArrayBasedEditorPane.EditorEntry): void;
        /**
         * Mark the row element of the given editor entry as selected and set this.__selectedEditorEntry.
         * @param editorEntry The editor entry to select. Pass null to reset the selection.
         */
        protected __selectItem(editorEntry: ArrayBasedEditorPane.EditorEntry | null): void;
        /**
         * Disables or enables the up and down buttons depending on the index of the selected item.
         * @param selectedIndex The index of the selected item.
         */
        protected __updateMoveButtons(selectedIndex: number): void;
        /**
         * Handler for the click event of the editor element.
         * @param e The event object.
         */
        protected __onClick: (e: MouseEvent) => void;
        /**
         * Handler for the pressed event of the add item button.
         */
        protected __onAddItemPressed: () => void;
        /**
         * Adds a new table row with an editor for a new item
         */
        protected abstract __addItem(): void;
        /**
         * Handler for the pressed event of the up button.
         */
        protected __onUpPressed: () => void;
        /**
         * Handler for the pressed event of the down button.
         */
        protected __onDownPressed: () => void;
        /**
         * Enable or disable the editor. Disabled editors are greyed out and cannot be interacted with.
         * @param isEnabled Whether the editor should be enabled or disabled.
         */
        setIsEnabled(isEnabled: boolean): void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module ArrayBasedEditorPane {
        interface EditorEntry {
            editor: Editor<any>;
            row: HTMLTableRowElement;
            cell: HTMLTableCellElement;
            removeButton?: Beckhoff.TcHmiButton;
            removeDestroyer?: DestroyFunction;
        }
        interface LocalizableTexts {
            addButtonTooltip: Localizable;
            upButtonTooltip: Localizable;
            downButtonTooltip: Localizable;
            removeButtonTooltip: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class ArrayEditorPane extends ArrayBasedEditorPane<ArrayEditor.Info> {
        /**
         * Create a new array editor pane.
         * @param element The element to contain the editor pane.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: ArrayEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: any[] | null): void;
        /**
         * Adds a new table row with an editor for a new item
         */
        protected __addItem(): void;
    }
}
declare module TcHmi.Controls.Helpers {
    class TupleEditor extends ButtonBasedEditor<any[], TupleEditor.Info> {
        protected __value: any[];
        protected __popup: TupleEditorPrompt | undefined;
        /**
         * Create a new array editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: TupleEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Calls all event destroyers.
         */
        destroy(): void;
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: TupleEditor.Info, value: any): value is any[];
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: any[] | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): any[];
        /**
         * Opens the popup for the editor.
         */
        protected openPopup(): Promise<void>;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module TupleEditor {
        interface Info extends Editor.Info {
            type: 'tuple';
            items: Editor.EditorInfo[];
            additionalItems: {
                allowed: boolean;
                editorInfo?: Editor.EditorInfo;
            };
            minItems?: number;
            maxItems?: number;
            uniqueItems: boolean;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class TupleEditorPane extends ArrayBasedEditorPane<TupleEditor.Info> {
        /**
         * Create a new tuple editor pane.
         * @param element The element to contain the editor pane.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: TupleEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: any[] | null): void;
        /**
         * Marks optional editors as temporarily required.
         */
        protected __markRequired(): void;
        /**
         * Handles the change events of the editors.
         * @param editor The editor that was changed.
         */
        protected __handleOnEditorChanged(editor: Editor<any>): void;
        /**
         * Adds a new table row with an editor for a new item
         */
        protected __addItem(): void;
        /**
         * Remove a row.
         * @param editorEntry The entry describing the row to remove.
         */
        protected __removeEditorRow(editorEntry: ArrayBasedEditorPane.EditorEntry): void;
        /**
         * Disables or enables the up and down buttons depending on the index of the selected item.
         * @param selectedIndex The index of the selected item.
         */
        protected __updateMoveButtons(selectedIndex: number): void;
    }
}
declare module TcHmi.Controls.Helpers {
    class NullEditor extends Editor<null, NullEditor.Info> {
        /**
         * Create a new null editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: NullEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: NullEditor.Info, value: any): value is null;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): null;
    }
    module NullEditor {
        interface Info extends Editor.Info {
            type: 'null';
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class InvalidEditor extends Editor<any, InvalidEditor.Info> {
        protected __value: any;
        protected __textContainer: HTMLElement;
        /**
         * Create a new invalid editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: InvalidEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: InvalidEditor.Info, value: any): value is any;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: any | null): void;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): any;
    }
    module InvalidEditor {
        interface Info extends Editor.Info {
            type: 'invalid';
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class ChoiceEditor extends Editor<any, ChoiceEditor.Info> {
        protected __value: any;
        protected __container: HTMLDivElement;
        protected __combobox: Beckhoff.TcHmiCombobox;
        protected __editors: Map<Editor.EditorType, {
            editor: Editor<any>;
            container: HTMLDivElement;
        }>;
        protected __activeEditor: {
            editor: Editor<any>;
            container: HTMLDivElement;
        } | null;
        /**
         * Create a new choice editor.
         * @param element The element to contain the editor.
         * @param editorInfo An object containing information about the editor and the type of value to edit.
         * @param parentControl The control owning the editor.
         */
        constructor(element: HTMLElement, editorInfo: ChoiceEditor.Info, parentControl: Controls.System.TcHmiControl);
        /**
         * Create a choice editor info that allows any type.
         */
        static createAnyEditorInfo(): ChoiceEditor.Info;
        /**
         * Create a choice editor info that allows any type.
         */
        static getAnyChoices(): Exclude<ChoiceEditor.Info['choices'], undefined>;
        /**
         * Validates the given value against the specified editor info.
         * @param editorInfo The editor info to validate against.
         * @param value The value to validate.
         */
        static validate(editorInfo: ChoiceEditor.Info, value: any): value is any;
        /**
         * Processes the current editor info.
         */
        protected __processEditorInfo(): void;
        /**
         * Handler for the selectionChanged event of the combobox
         */
        protected __onSelectionChanged: () => void;
        /**
         * Handler for the change event of the editor
         */
        protected __onEditorChanged: (editor: Editor<any>) => void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: any | null): void;
        /**
         * Gets the current value.
         */
        getState(): Editor.State<any>;
        /**
         * Gets the current raw value of the editor. This value might be invalid and, if it is valid, might differ from the value returned by getState.
         * To get the final actual value, always use getState.
         */
        getRawValue(): any;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<Editor.LocalizableTexts>): void;
    }
    module ChoiceEditor {
        interface Info extends Editor.Info {
            type: 'choice';
            choices?: Exclude<Editor.EditorInfo, ChoiceEditor.Info>[];
        }
        interface LocalizableTexts {
            comboboxText: Localizable;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class ObjectEditorPrompt extends Helpers.OkCancelPrompt<object> {
        protected __editorPane: ObjectEditorPane;
        /**
         * Creates a new ObjectEditorPrompt instance.
         * @param editorInfo Information about the object editor.
         * @param parentControl The control which owns the popup.
         */
        constructor(editorInfo: ObjectEditor.Info, parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Sets the editorInfo.
         * @param editorInfo
         */
        setEditorInfo(editorInfo: ObjectEditor.Info): void;
        /**
         * Set a new Value. Returns whether the given value is valid.
         * @param value The value to set.
         */
        setValue(value: object | null): void;
        /**
         * Handler for the change event of the editor pane.
         * @param state The state of the editor pane.
         */
        protected __onEditorChanged: (editor: ObjectEditorPane) => void;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer().
         */
        protected __ok(): void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<ObjectEditorPrompt.LocalizableTexts>): void;
    }
    module ObjectEditorPrompt {
        interface LocalizableTexts extends Helpers.OkCancelPrompt.LocalizableTexts {
            editorLocalizations: Partial<Editor.LocalizableTexts>;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class ArrayEditorPrompt extends Helpers.OkCancelPrompt<any[]> {
        protected __editorPane: ArrayEditorPane;
        /**
         * Creates a new ArrayEditorPrompt instance.
         * @param editorInfo Information about the array editor.
         * @param parentControl The control which owns the popup.
         */
        constructor(editorInfo: ArrayEditor.Info, parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Sets the editorInfo.
         * @param editorInfo
         */
        setEditorInfo(editorInfo: ArrayEditor.Info): void;
        /**
         * Set a new Value. Returns whether the given value is valid.
         * @param value The value to set.
         */
        setValue(value: any[] | null): void;
        /**
         * Handler for the change event of the editor pane.
         * @param state The state of the editor pane.
         */
        protected __onEditorChanged: (editor: ArrayEditorPane) => void;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer().
         */
        protected __ok(): void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<ArrayEditorPrompt.LocalizableTexts>): void;
    }
    module ArrayEditorPrompt {
        interface LocalizableTexts extends Helpers.OkCancelPrompt.LocalizableTexts {
            editorLocalizations: Partial<Editor.LocalizableTexts>;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class TupleEditorPrompt extends Helpers.OkCancelPrompt<any[]> {
        protected __editorPane: TupleEditorPane;
        /**
         * Creates a new TupleEditorPrompt instance.
         * @param editorInfo Information about the array editor.
         * @param parentControl The control which owns the popup.
         */
        constructor(editorInfo: TupleEditor.Info, parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Sets the editorInfo.
         * @param editorInfo
         */
        setEditorInfo(editorInfo: TupleEditor.Info): void;
        /**
         * Set a new Value. Returns whether the given value is valid.
         * @param value The value to set.
         */
        setValue(value: any[] | null): void;
        /**
         * Handler for the change event of the editor pane.
         * @param state The state of the editor pane.
         */
        protected __onEditorChanged: (editor: TupleEditorPane) => void;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer().
         */
        protected __ok(): void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<TupleEditorPrompt.LocalizableTexts>): void;
    }
    module TupleEditorPrompt {
        interface LocalizableTexts extends Helpers.OkCancelPrompt.LocalizableTexts {
            editorLocalizations: Partial<Editor.LocalizableTexts>;
        }
    }
}
//# sourceMappingURL=TcHmiJsonEditors.d.ts.map