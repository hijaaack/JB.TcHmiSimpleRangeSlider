declare module TcHmi.Controls.Beckhoff {
    class TcHmiRecipeEdit extends TcHmi.Controls.System.TcHmiControl {
        #private;
        /**
         * Constructor
         * @param element
         * @param pcElement
         * @param attrs
         */
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        protected __elementTemplateRoot: HTMLElement | undefined;
        protected __serverDomain: string | undefined;
        protected __path: string | undefined;
        protected __oldPath: string | undefined;
        protected __unwatchRecipeManagementDomain: DestroyFunction | null;
        protected __unwatchRecipeList: DestroyFunction | null;
        protected __watchRecipeListResult: Server.RecipeManagement.FolderRecipe | null;
        protected __onRecipeListReceivedManager: Helpers.CallbackManager<(rootDirectory: Server.RecipeManagement.FolderRecipe | null) => void>;
        protected __buttons: {
            createFolder: TcHmiButton;
            createRecipe: TcHmiButton;
            rename: TcHmiButton;
            copy: TcHmiButton;
            cut: TcHmiButton;
            paste: TcHmiButton;
            delete: TcHmiButton;
            activate: TcHmiButton;
            teach: TcHmiButton;
            save: TcHmiButton;
            close: TcHmiButton;
        };
        protected __clipboard: {
            action: 'cut' | 'copy';
            origin: string[];
            items: Helpers.DirectoryBrowser.DescendantItem<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe>[];
        } | null;
        protected __symbolAccessSubscriptionId: number | null;
        protected __symbolAccess: {
            '{0}.Config': Server.ACCESS;
            Rename: Server.ACCESS;
            '{0}.ActivateRecipe': Server.ACCESS;
            '{0}.ReadFromTarget': Server.ACCESS;
            '{0}.UpdateRecipe': Server.ACCESS;
        };
        protected __recipeBrowser: Helpers.DirectoryBrowser<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe> | undefined;
        protected __recipeEditor: TcHmiRecipeEditComponents.RecipeEditor | undefined;
        protected __namePrompt: Helpers.InputPrompt | null;
        protected __createRecipePrompt: TcHmiRecipeEditComponents.CreateRecipePrompt | null;
        protected __confirmDeletionPrompt: Helpers.TextAndButtonsPrompt<boolean> | null;
        protected __activatePrompt: Helpers.TextAndButtonsPrompt<'saveAndActivate' | 'justActivate' | 'cancel'> | null;
        protected __teachErrorPopup: Helpers.TextAndButtonsPrompt<void> | null;
        protected __confirmClosePrompt: Helpers.TextAndButtonsPrompt<'save' | 'discard' | 'cancel'> | null;
        protected __childControls: TcHmi.Controls.System.TcHmiControl[];
        protected __destroyersToCallOnDestroy: DestroyFunction[];
        protected __localizationReader: Locale.LocalizationReader | undefined;
        protected __destroyLocalizationWatch: DestroyFunction | null;
        /**
         * If raised, the control object exists in control cache and constructor of each inheritation level was called.
         */
        __previnit(): void;
        /**
         * If raised, all attributes have been set to it's default or dom values.
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
         * Handler for the pressed event of the new folder button.
         */
        protected __onNewFolderPressed: () => void;
        /**
         * Handler for the pressed event of the new recipe button.
         */
        protected __onNewRecipePressed: () => void;
        /**
         * Handler for the pressed event of the rename button.
         */
        protected __onRenamePressed: () => void;
        /**
         * Handler for the pressed event of the copy button.
         */
        protected __onCopyPressed: () => void;
        /**
         * Handler for the pressed event of the cut button.
         */
        protected __onCutPressed: () => void;
        /**
         * Handler for the pressed event of the paste button.
         */
        protected __onPastePressed: () => void;
        /**
         * Handler for the pressed event of the delete button.
         */
        protected __onDeletePressed: () => void;
        /**
         * Handler for the selectionChanged event of the recipe browser.
         * @param selectedItem The now selected item.
         * @param path The path of the folder the selected item is in.
         * @param selectedItemName The name of the selected item.
         */
        protected __onSelectionChanged: (selectedItems: Helpers.DirectoryBrowser.DescendantItem<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe>[] | null) => void;
        /**
         * Handler for the beforePathChange event of the recipe browser.
         * @param currentItem The new current item.
         * @param path The new path.
         */
        protected __onBeforePathChange: (newCurrentItem: Helpers.DirectoryBrowser.Item<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe> | null, newPath: string[] | null, cancelable: boolean) => Promise<boolean>;
        /**
         * Handler for the pathChanged event of the recipe browser.
         * @param currentItem The new current item.
         * @param path The new path.
         */
        protected __onPathChanged: (currentItem: Helpers.DirectoryBrowser.Item<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe> | null, path: string[] | null) => void;
        /**
         * Handler for the dragAndDrop event of the browsing display of the recipe browser.
         * @param dragged The name of the dragged item.
         * @param droppedOnto Infos about the item the dragged item was dropped onto.
         */
        protected __onDragAndDropped: (dragged: string, droppedOnto: {
            name: string;
            isParent: boolean;
        }) => void;
        /**
         * Handler for the pressed event of the activate button
         */
        protected __onActivatePressed: () => void;
        /**
         * Handler for the pressed event of the teach button
         */
        protected __onTeachPressed: () => void;
        /**
         * Handler for the pressed event of the save button.
         */
        protected __onSavePressed: () => void;
        /**
         * Handler for the pressed event of the close button.
         */
        protected __onClosePressed: () => void;
        /**
         * Handler for the changed event of the recipe editor.
         * @param isValid Whether the recipe editor is now in a valid state.
         * @param value The current value of the recipe editor.
         */
        protected __onRecipeEditorChanged: (editor: TcHmiRecipeEditComponents.RecipeEditor) => void;
        /**
         * Expands the given localization key to a full symbol expression.
         * @param key The key to expand.
         */
        protected __expandLocalizationSymbol(key: string): string;
        /**
         * Forces the buttons operate rights to Deny if the user doesn't have the necessary symbol access.
         */
        protected __updateButtonAccess(): void;
        /**
         * Creates a new InputPrompt and sets the validationPatterns and localizations.
         */
        protected __createNamePrompt(): Helpers.InputPrompt;
        /**
         * Shows a prompt to enter a name and then creates a new folder.
         */
        protected __createFolder(): Promise<void>;
        /**
         * Shows a prompt to enter a name, select a recipe type and then creates a new recipe.
         */
        protected __createRecipe(): Promise<void>;
        /**
         * Shows a prompt to enter a name and then renames the selected item.
         */
        protected __rename(): Promise<void>;
        /**
         * Shows a prompt to confirm and then deletes the selected item.
         */
        protected __delete(): Promise<void>;
        /**
         * Fill the clipboard with the currently selected items.
         * @param action Whether to copy or cut the selected items.
         */
        protected __fillClipboard(action: 'copy' | 'cut'): void;
        /**
         * Pastes the clipboard items into the current location.
         */
        protected __paste(): Promise<void>;
        /**
         * Copy the items to the current folder.
         * @param itemsToPaste The items to copy and paste.
         */
        protected __copyPaste(itemsToPaste: Map<string, Helpers.DirectoryBrowser.DescendantItem<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe>>, target: string[]): void;
        /**
         * Move the items to the current folder.
         * @param origin The original folder containing the items.
         * @param itemsToPaste The items to move.
         */
        protected __cutPaste(itemsToPaste: Map<string, Helpers.DirectoryBrowser.DescendantItem<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe>>, origin: string[], target: string[]): void;
        /**
         * Shows a popup asking the user how to resolve conflicting file names.
         * @param conflictingNames The names that conflict.
         * @param existingNames The names that already exist in the folder.
         */
        protected __resolveFileNameConflicts(conflictingNames: Iterable<string>, existingNames: Iterable<string>): Promise<{
            isOk: true;
            value: Map<string, string>;
        } | {
            readonly isOk: false;
        }>;
        /**
         * Enables or disables the rename and delete button depending on the selected item.
         * @param selectedItem The currently selected item.
         */
        protected __updateBrowsingButtons(selectedItems: Helpers.DirectoryBrowser.DescendantItem<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe>[] | null): void;
        /**
         * Opens or closes the editor depending on the current path.
         * @param currentItem The item the current path points to.
         * @param path The current path.
         */
        protected __openOrCloseEditor(currentItem: Server.RecipeManagement.FolderRecipe | Server.RecipeManagement.Recipe | undefined, path: string[] | null): void;
        /**
         * Checks if the control is in an editing state and if the editor has changes. If so, prompts the user to save or discard changes or cancel the operation.
         * Returns a boolean indicating whether the operation should be canceled or proceeded with.
         */
        protected __checkUnsavedChanges(): Promise<boolean>;
        /**
         * Moves a recipe or folder into another folder.
         * @param dragged The name of the item being moved.
         * @param droppedOnto Infos about the item the dragged item was dropped onto.
         */
        protected __moveItem(dragged: string, droppedOnto: {
            name: string;
            isParent: boolean;
        }): void;
        /**
         * Activates the currently edited recipe.
         */
        protected __activate(): Promise<void>;
        /**
         * Reads the values of the symbols in the currently edited recipe from the PLC and writes them into the recipe.
         */
        protected __teach(): Promise<void>;
        /**
         * Saves the currently edited recipe.
         */
        protected __save(): Promise<void>;
        /**
         * Closes the editor after prompting the user to save changes if there are changes
         */
        protected __closeEditor(): Promise<void>;
        /**
         * Updates the editing buttons according to the state of the editor.
         * @param isValid Whether the editor has valid values.
         */
        protected __updateEditingButtons(isValid: boolean): void;
        /**
         * Sets the current value of attribute ServerDomain.
         * @param valueNew
         */
        setServerDomain(valueNew: string): void;
        /**
         * Returns the current value of attribute ServerDomain.
         */
        getServerDomain(): string | undefined;
        /**
         * Processes the current value of attribute ServerDomain.
         */
        protected __processServerDomain(): void;
        /**
         * Sets the current value of attribute Path.
         * @param valueNew The new value.
         */
        setPath(valueNew: string | null): void;
        /**
         * Returns the current value of attribute Path.
         */
        getPath(): string | undefined;
        /**
         * Processes the current value of attribute Path.
         */
        protected __processPath(): Promise<void>;
        /**
         * Returns the current value of the readonly attribute SelectedItems.
         */
        getSelectedItems(): string[];
        /**
         * Updates the RecipeManagementDomainWatch.
         * @param unwatchOnly Set to true to only destroy the existing watch. Defaults to false.
         */
        protected __updateRecipeWatches(unwatchOnly?: boolean): void;
        /**
         * Callback function for Server.RecipeManagement.watchRecipeList.
         * @param data The recipes.
         */
        protected __onRecipeListWatch: (data: Server.RecipeManagement.IWatchResultObject<Server.RecipeManagement.FolderRecipe>) => void;
        /**
         * Register a callback to receive the current recipe list.
         * @param callback The callback.
         */
        __registerOnRecipeListReceived(callback: (rootDirectory: Server.RecipeManagement.FolderRecipe | null) => void): DestroyFunction;
        /**
         * Unregister a callback to receive the current recipe list.
         * @param callback The callback.
         */
        __unregisterOnRecipeListReceived(callback: (rootDirectory: Server.RecipeManagement.FolderRecipe | null) => void): void;
        /**
         * Update the subscription to GetSymbolAccess.
         * @param unsubscribeOnly Only unsubscribe. Should be used on detach.
         */
        protected __updateSymbolAccessSubscription(unsubscribeOnly?: boolean): void;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiRecipeEditComponents {
    export class RecipeTypeParser {
        private __recipeManagementDomain;
        private __parentControl;
        /**
         * Create a new RecipeTypeParser.
         * @param __recipeManagementDomain The domain of the recipe management extension.
         * @param __parentControl The control owning the recipe type parser.
         */
        constructor(__recipeManagementDomain: string | null, __parentControl: Controls.System.TcHmiControl);
        /**
         * Parse a recipe type.
         * @param recipeType The recipe type to parse.
         */
        parse(recipeTypeName: string, recipeType?: Server.RecipeManagement.RecipeType): Promise<ParsedRecipeType>;
        /**
         * Gets the requested recipe types from the server.
         * @param names The names of the recipe types to get.
         */
        protected __getRecipeTypes(names: string[]): Promise<Server.RecipeManagement.RecipeType[]>;
        /**
         * Resolves a recipe types inheritance chain and puts the members of the recipe type into maps according to their group.
         * @param recipeType The recipe type to parse.
         */
        protected __parseRecipeType(recipeTypeName: string, recipeType: Server.RecipeManagement.RecipeType): Promise<ParsedRecipeType>;
        /**
         * Gets the JSON schemas for the given symbols.
         * @param symbols The symbol names to get schemas for.
         */
        protected __getSchemas(symbols: Set<string>): Promise<Map<any, any>>;
    }
    export interface ParsedRecipeType {
        name: string;
        ungroupedMembers: RecipeTypeMember[];
        memberGroups: Map<string, RecipeTypeMember[]>;
        membersEnabled: boolean;
        comment?: string;
    }
    interface RecipeTypeMemberBase {
        name: string;
        comment?: string;
        enabled: boolean;
        group?: string;
        order?: number;
    }
    export interface RecipeTypeMemberSymbol extends RecipeTypeMemberBase {
        /** Name of the symbol of this entry */
        symbol: string;
        /** The type of the symbol */
        symbolType: JsonSchema;
        /** defaultValue for this symbol */
        defaultValue: any;
        /** Schema to restrict the value of the symbol further */
        schema?: JsonSchema;
        /** Engineering unit for this symbol */
        unit?: string;
    }
    export interface RecipeTypeMemberRecipe extends RecipeTypeMemberBase {
        recipeType: string;
    }
    export type RecipeTypeMember = RecipeTypeMemberSymbol | RecipeTypeMemberRecipe;
    export {};
}
declare module TcHmi.Controls.Beckhoff.TcHmiRecipeEditComponents {
    class RecipeEditor {
        #private;
        protected __element: HTMLDivElement;
        protected __parentControl: TcHmiRecipeEdit;
        protected __tableBody: HTMLTableSectionElement;
        protected __recipeManagementDomain: string | null;
        protected __recipe: Server.RecipeManagement.Recipe | null;
        protected __recipeName: string | null;
        protected __recipeTypeName: string | null;
        protected __editors: Map<string, Helpers.Editor<any> | RecipeReferenceEditor>;
        protected __tableHeaders: {
            name: HTMLTableCellElement;
            value: HTMLTableCellElement;
            min: HTMLTableCellElement;
            max: HTMLTableCellElement;
            unit: HTMLTableCellElement;
            comment: HTMLTableCellElement;
        };
        protected __localizations: Partial<RecipeEditor.LocalizableTexts> | undefined;
        protected __localizationSymbols: Map<string, {
            symbol: Symbol<string>;
            destroyWatch: DestroyFunction;
        }>;
        protected readonly __onChangeManager: Helpers.CallbackManager<(editor: RecipeEditor) => void>;
        readonly onChange: Readonly<{
            add: (callback: (editor: RecipeEditor) => void) => DestroyFunction;
            remove: (callback: (editor: RecipeEditor) => void) => void;
        }>;
        /**
         * Creates a new RecipeEditor.
         * @param __element The element hosting the editor.
         * @param __parentControl The parent control of the editor.
         */
        constructor(__element: HTMLDivElement, __parentControl: TcHmiRecipeEdit);
        /**
         * Destroys the recipe editor.
         */
        destroy(): void;
        /**
         * Populates the editor with members of a recipe type and optionaly values of a given recipe.
         * @param recipeType The recipe type or the name of a recipe type for the recipe that should be edited.
         * @param recipe The recipe to be edited.
         */
        populate(recipeType: {
            name: string;
            recipeType?: Server.RecipeManagement.RecipeType;
        }, recipe: {
            name: string;
            recipe?: Server.RecipeManagement.Recipe;
        }): Promise<void>;
        /**
         * Clears the recipe editor.
         */
        clear(): void;
        /**
         * Removes all elements from the table body.
         */
        protected __clearTableBodyAndEditors(): void;
        /**
         * Creates the table content for the given recipe type and recipe.
         * @param recipeType The type of the recipe to edit.
         * @param recipe The recipe to edit.
         */
        protected __render(recipeType: ParsedRecipeType, recipe?: Server.RecipeManagement.Recipe): void;
        /**
         * Creates a table row for a single recipe type member.
         * @param member The member of the recipe type.
         * @param value The value of the member.
         */
        protected __createMemberRow(member: RecipeTypeMember, value?: any): HTMLTableRowElement;
        /**
         * Handler for the change events of the editors.
         */
        protected __onEditorChanged: () => void;
        /**
         * Returns whether the recipe editor contains valid data.
         */
        isValid(): boolean;
        /**
         * Set the currently edited recipes values to the passed in values.
         * @param recipe A recipe containing the new values.
         */
        setRecipeValues(recipe: Server.RecipeManagement.Recipe): void;
        /**
         * Returns the currently configured data. Throws errors when the data is invalid. Call isValid beforehand to check for possible errors.
         */
        getState(): RecipeEditor.State;
        /**
         * Returns whether the editor contains data that is different from the initially passed in data.
         */
        hasChanges(): boolean;
        /**
         * Returns the name of the currently edited recipe. Returns null if no recipe is currently being edited.
         */
        getRecipeName(): string | null;
        /**
         * Returns whether the currently edited recipe already exists or is new
         */
        recipeExists(): boolean;
        /**
         * Confirms that the current value has been saved
         */
        confirmSave(): void;
        /**
         * Sets the RecipeManagementDomain. The calling code should verify that the domain is valid and active. If the domain becomes invalid or inactive, this setter should be called with null.
         * @param domain The domain of the recipe management extension on the server.
         */
        setRecipeManagementDomain(domain: string | null): void;
        /**
         * Returns the current RecipeManagementDomain.
         */
        getRecipeManagementDomain(): string | null;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<RecipeEditor.LocalizableTexts>): void;
        /**
         * Watch the given symbol and call the onChange callback every time it changes with the resolved and formatted symbol value.
         * @param name The name for this symbol. Must be unique across all inheritance layers and further calls for the same localization must use the same name.
         * @param localization The localization to watch.
         * @param onChange The callback that is called with the localized and formatted text as a parameter.
         */
        protected __watchLocalization(name: string, localization: FormattedLocalizable, onChange: (localizedText: string) => void): void;
    }
    module RecipeEditor {
        type State = {
            isValid: false;
        } | {
            isValid: true;
            value: Server.RecipeManagement.Recipe;
            recipeName: string;
            recipeTypeName: string;
        };
        interface LocalizableTexts {
            tableHeaderName: Localizable;
            tableHeaderValue: Localizable;
            tableHeaderMin: Localizable;
            tableHeaderMax: Localizable;
            tableHeaderUnit: Localizable;
            tableHeaderComment: Localizable;
            editorLocalizations: Partial<Helpers.Editor.LocalizableTexts>;
            recipeReferenceEditorLocalizations: Partial<RecipeReferenceEditor.LocalizableTexts>;
        }
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiRecipeEditComponents {
    class RecipeReferenceEditor {
        #private;
        protected __element: HTMLElement;
        protected __recipeType: string;
        protected __parentControl: TcHmiRecipeEdit;
        protected __eventDestroyers: Set<DestroyFunction>;
        protected __container: HTMLDivElement;
        protected __pathBoxElement: HTMLDivElement;
        protected __button: TcHmiButton;
        protected __selectRecipePrompt: SelectRecipePrompt;
        protected __recipe: {
            name: string;
            recipe: Server.RecipeManagement.Recipe;
        } | null;
        protected __isEnabled: boolean;
        protected __localizationSymbols: Map<string, {
            symbol: Symbol<string>;
            destroyWatch: DestroyFunction;
        }>;
        protected readonly __onChangeManager: Helpers.CallbackManager<(editor: RecipeReferenceEditor) => void>;
        readonly onChange: Readonly<{
            add: (callback: (editor: RecipeReferenceEditor) => void) => DestroyFunction;
            remove: (callback: (editor: RecipeReferenceEditor) => void) => void;
        }>;
        /**
         * Creates a new RecipeReferenceEditor.
         * @param __element The element hosting the editor.
         * @param __parentControl The parent control of the editor.
         */
        constructor(__element: HTMLElement, __recipeType: string, __parentControl: TcHmiRecipeEdit);
        /**
         * Destroys the editor and all its controls.
         */
        destroy(): void;
        /**
         * Set a new Value.
         * @param value The value to set.
         */
        setValue(value: string | null): Promise<void>;
        /**
         * Gets the current value.
         */
        getState(): RecipeReferenceEditor.State;
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
         * Event handler for the onPressed event of the button.
         */
        protected __onPressed: () => void;
        /**
         * Handler for the click event of path items.
         * @param event
         */
        protected __onPathItemClicked: (event: MouseEvent) => void;
        /**
         * Prompts the user for a recipe type.
         */
        protected __promptRecipe(): Promise<void>;
        /**
         * Sets the internal recipe variable, toggles the invalid class and triggers change handlers.
         * @param recipe The new recipe.
         */
        protected __setRecipe(recipe: {
            name: string;
            recipe: Server.RecipeManagement.Recipe;
        } | null): void;
        /**
         * Callback for received recipe lists.
         * @param rootDirectory The recipe list.
         */
        protected __onRecipeListReceived: (rootDirectory: Server.RecipeManagement.FolderRecipe | null) => void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<RecipeReferenceEditor.LocalizableTexts>): void;
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
    module RecipeReferenceEditor {
        interface LocalizableTexts extends Helpers.OkCancelPrompt.LocalizableTexts {
            openPopupButtonTooltip: Localizable;
            recipePopupHeaderText: Localizable;
        }
        type State = {
            isValid: false;
        } | {
            isValid: true;
            value: string;
        };
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiRecipeEditComponents {
    class CreateRecipePrompt extends Helpers.OkCancelPrompt<{
        name: string;
        recipeTypeName: string;
        recipeType: Server.RecipeManagement.RecipeType;
    }> {
        protected __parentControl: TcHmi.Controls.System.TcHmiControl;
        protected __textbox: TcHmiTextbox;
        protected __forbiddenNames: Set<string>;
        protected __nameLabel: HTMLSpanElement;
        protected __recipeTypeLabel: HTMLSpanElement;
        protected __pathBoxElement: HTMLDivElement;
        protected __selectRecipeTypePrompt: SelectRecipeTypePrompt;
        protected __selectButton: TcHmiButton;
        protected __recipeType: {
            name: string;
            recipeType: Server.RecipeManagement.RecipeType;
        } | null;
        /**
         * Creates a new CreateRecipePrompt instance.
         * @param parentControl The control which owns the popup.
         */
        constructor(parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Handler for the onTextChanged event of the textbox.
         */
        protected __onTextChanged: () => void;
        /**
         * Handler for the onPressed event of the select button.
         */
        protected __onSelectPressed: () => void;
        /**
         * Handler for the click event of path items.
         * @param event
         */
        protected __onPathItemClicked: (event: MouseEvent) => void;
        /**
         * Validates the given text as a name. A valid name must not be empty and not contain '::'.
         * @param text The text to validate.
         */
        protected __isValidName(text: string): boolean;
        /**
         * Prompts the user for a recipe type.
         */
        protected __promptRecipeType(): Promise<void>;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer().
         */
        protected __ok(): void;
        /**
         * Sets the recipeManagementDomain. The recipeManagementDomain must be set to be able to browse recipe types.
         * @param recipeManagementDomain The server domain that is used for recipe management.
         */
        setRecipeManagementDomain(recipeManagementDomain: string | null): void;
        /**
         * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
         * @param forbiddenNames Names that cannot be entered (i.e. because another item with this name already exists).
         */
        prompt(forbiddenNames?: Iterable<string> | null, defaultValue?: string): Promise<{
            isOk: true;
            value: {
                name: string;
                recipeTypeName: string;
                recipeType: Server.RecipeManagement.RecipeType;
            };
        } | {
            isOk: false;
        }>;
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Hides the popup.
         */
        hide(): void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<CreateRecipePrompt.LocalizableTexts>): void;
    }
    module CreateRecipePrompt {
        interface LocalizableTexts extends Helpers.OkCancelPrompt.LocalizableTexts {
            headerText: Localizable;
            nameLabelText: Localizable;
            recipeTypeLabelText: Localizable;
            selectButtonTooltip: Localizable;
            recipeTypePopupHeaderText: Localizable;
        }
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiRecipeEditComponents {
    class SelectRecipePrompt extends Helpers.OkCancelPrompt<{
        name: string;
        recipe: Server.RecipeManagement.Recipe;
    }> {
        #private;
        protected __parentControl: TcHmi.Controls.System.TcHmiControl;
        protected __recipeBrowser: Helpers.DirectoryBrowser<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe>;
        protected __initialPath: string[] | null;
        /**
         * Creates a new SelectRecipePrompt instance.
         * @param pathDisplay The display to show the currently chosen path in.
         * @param parentControl The control which owns the popup.
         */
        constructor(pathDisplay: Helpers.PathDisplay, parentControl: TcHmiRecipeEdit);
        /**
         * Handler for the PathChanged event of the recipe type browser.
         * @param currentItem The current item.
         * @param path The path to the current item.
         */
        protected __onPathChanged: (currentItem: Helpers.DirectoryBrowser.Item<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe> | null, path: string[] | null) => void;
        /**
         * Handler for the SelectionChanged event of the recipe type browser.
         * @param selectedItem The selected item, or null if nothing is selected.
         * @param path The current path.
         * @param selectedItemName The name of the selected item, or null if nothing is selected.
         */
        protected __onSelectionChanged: (selectedItems: Helpers.DirectoryBrowser.DescendantItem<Server.RecipeManagement.Recipe, Server.RecipeManagement.FolderRecipe>[] | null) => void;
        /**
         * Suspends the RecipeBrowser of this popup.
         */
        suspend(): void;
        /**
         * Resumes the RecipeBrowser of this popoup.
         */
        resume(): void;
        /**
         * Sets the path of the RecipeBrowser to the specified value.
         * @param value The path.
         */
        setPath(value: string[]): Promise<{
            name: string;
            recipe: Server.RecipeManagement.Recipe;
        } | null>;
        /**
         * Sets the path of the RecipeBrowser to the root directory.
         */
        reset(): void;
        /**
         * Callback function for Server.RecipeManagement.watchRecipeList.
         * @param data The recipes.
         */
        setRecipeList(rootDirectory: Server.RecipeManagement.FolderRecipe | null): void;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer(). Must be implemented by inheriting class.
         */
        protected __ok(): Promise<void>;
        /**
         * Performs the action for the Cancel button.
         */
        protected __cancel(): void;
        /**
         * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
         */
        prompt(): Promise<{
            isOk: true;
            value: {
                name: string;
                recipe: Server.RecipeManagement.Recipe;
            };
        } | {
            isOk: false;
        }>;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<SelectRecipePrompt.LocalizableTexts>): void;
    }
    module SelectRecipePrompt {
        interface LocalizableTexts extends Helpers.OkCancelPrompt.LocalizableTexts {
            headerText: Localizable;
        }
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiRecipeEditComponents {
    class SelectRecipeTypePrompt extends Helpers.OkCancelPrompt<{
        name: string;
        recipeType: Server.RecipeManagement.RecipeType;
    }> {
        #private;
        protected __parentControl: TcHmi.Controls.System.TcHmiControl;
        protected __recipeTypeBrowser: Helpers.DirectoryBrowser<Server.RecipeManagement.RecipeType, Server.RecipeManagement.FolderRecipeType>;
        protected __initialPath: string[] | null;
        protected __recipeManagementDomain: string | null;
        protected __unwatchRecipeList: DestroyFunction | null;
        /**
         * Creates a new SelectRecipeTypePrompt instance.
         * @param pathDisplay The display to show the currently chosen path in.
         * @param parentControl The control which owns the popup.
         */
        constructor(pathDisplay: Helpers.PathDisplay, parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Handler for the PathChanged event of the recipe type browser.
         * @param currentItem The current item.
         * @param path The path to the current item.
         */
        protected __onPathChanged: (currentItem: Helpers.DirectoryBrowser.Item<Server.RecipeManagement.RecipeType, Server.RecipeManagement.FolderRecipeType> | null, path: string[] | null) => void;
        /**
         * Handler for the SelectionChanged event of the recipe type browser.
         * @param selectedItem The selected item, or null if nothing is selected.
         * @param path The current path.
         * @param selectedItemName The name of the selected item, or null if nothing is selected.
         */
        protected __onSelectionChanged: (selectedItems: Helpers.DirectoryBrowser.DescendantItem<Server.RecipeManagement.RecipeType, Server.RecipeManagement.FolderRecipeType>[] | null) => void;
        /**
         * Suspends the RecipeTypeBrowser of this popup.
         */
        suspend(): void;
        /**
         * Resumes the RecipeTypeBrowser of this popoup.
         */
        resume(): void;
        /**
         * Sets the path of the RecipeTypeBrowser to the root directory.
         */
        reset(): void;
        /**
         * Sets the recipeManagementDomain. The recipeManagementDomain must be set to be able to browse recipe types.
         * @param recipeManagementDomain The server domain that is used for recipe management.
         */
        setRecipeManagementDomain(recipeManagementDomain: string | null): void;
        /**
         * Callback function for Server.RecipeManagement.watchRecipeList.
         * @param data The recipes.
         */
        protected __onRecipeTypeListWatch: (data: Server.RecipeManagement.IWatchResultObject<Server.RecipeManagement.FolderRecipeType>) => void;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer(). Must be implemented by inheriting class.
         */
        protected __ok(): Promise<void>;
        /**
         * Performs the action for the Cancel button.
         */
        protected __cancel(): void;
        /**
         * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
         */
        prompt(): Promise<{
            isOk: true;
            value: {
                name: string;
                recipeType: Server.RecipeManagement.RecipeType;
            };
        } | {
            isOk: false;
        }>;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<SelectRecipeTypePrompt.LocalizableTexts>): void;
    }
    module SelectRecipeTypePrompt {
        interface LocalizableTexts extends Helpers.OkCancelPrompt.LocalizableTexts {
            headerText: Localizable;
        }
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiRecipeEditComponents {
    class FileConflictPrompt extends Helpers.OkCancelPrompt<Map<string, string>> {
        protected __existingNames: Set<string>;
        protected __elementLabel: HTMLElement;
        protected __rows: Map<string, {
            skip: TcHmiRadioButton;
            replace: TcHmiRadioButton;
            both: TcHmiRadioButton;
        }>;
        protected __doAll: {
            label: HTMLElement;
            controls: {
                skip: TcHmiRadioButton;
                replace: TcHmiRadioButton;
                both: TcHmiRadioButton;
            };
        } | undefined;
        /**
         * Creates a new FileConflictPrompt instance.
         * @param conflictingNames A map of the names that produce conflicts and whether the original file is replaceable (i. e. not read only).
         * @param parentControl The control which owns the popup.
         */
        constructor(conflictingNames: Map<string, boolean>, existingNames: Iterable<string>, parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Destroys the popup and all its controls.
         * @param force If true, child controls will be removed from the parent control before destruction, to ensure destruction in case of keepAlive === true.
         */
        destroy(force?: boolean): void;
        /**
         * Creates a container element with a label and three radio buttons.
         * @param labelText The text that is displayed in the label.
         * @param replaceable Whether to enable or disable the 'Replace' radio button.
         * @param eventHandler The event handler for the radioStateChanged event of the radio buttons.
         */
        protected __buildRow(labelText: string, replaceable?: boolean, eventHandler?: () => void): {
            container: HTMLDivElement;
            label: HTMLSpanElement;
            controls: {
                skip: TcHmiRadioButton;
                replace: TcHmiRadioButton;
                both: TcHmiRadioButton;
            };
        };
        /**
         * Event handler for the radioStateChanged event of the radio buttons
         */
        protected __onRadioStateChanged: () => void;
        /**
         * Create an event handler for radioStateChanged event of an all
         * @param name
         */
        protected __getOnAllRadioStateChangedHandler(name: 'skip' | 'replace' | 'both'): () => void;
        /**
         * Performs the action for the OK button, i.e. calling prompt.answer().
         */
        protected __ok(): void;
        /**
         * Sets localizable texts to the given localization symbols.
         * @param texts A collection of localization symbol expressions.
         */
        setLocalizations(texts: Partial<FileConflictPrompt.LocalizableTexts>): void;
    }
    module FileConflictPrompt {
        interface LocalizableTexts extends Helpers.OkCancelPrompt.LocalizableTexts {
            headerText: Localizable;
            labelText: Localizable;
            radioTextSkip: Localizable;
            radioTextReplace: Localizable;
            radioTextKeepBoth: Localizable;
            labelDoForAll: Localizable;
        }
    }
}
//# sourceMappingURL=TcHmiRecipeEdit.d.ts.map