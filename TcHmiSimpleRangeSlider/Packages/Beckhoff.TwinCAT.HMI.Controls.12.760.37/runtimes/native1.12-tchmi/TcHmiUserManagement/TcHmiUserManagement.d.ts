declare module TcHmi.Controls.Beckhoff {
    class TcHmiUserManagement extends TcHmi.Controls.System.TcHmiControl {
        #private;
        /**
         * Constructor of the control
         * @param element Element from HTML (internal, do not use)
         * @param pcElement precompiled Element (internal, do not use)
         * @param attrs Attributes defined in HTML in a special format (internal, do not use)
         */
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /**HTML-Templete root elements */
        protected __elementTemplateRoot: HTMLElement;
        /**Base html element */
        protected __elementBase: HTMLElement;
        /**dropdown html element */
        protected __elementDropdown: HTMLElement;
        /**user management popup html template */
        protected __elementManageUserPopup: HTMLElement;
        /**warning popup html template */
        protected __elementWarningPopup: HTMLElement;
        /**notification popup html template */
        protected __elementNotificationPopup: HTMLElement;
        /**add user popup html template*/
        protected __elementEditUserPopup: HTMLElement;
        /**add user popup html template*/
        protected __elementAddUserPopup: HTMLElement;
        /**group management popup html template */
        protected __elementChangeGroupsPopup: HTMLElement;
        /**warning popup html template */
        protected __elementDeleteUserPopup: HTMLElement;
        /**switch popup html template */
        protected __elementSwitchUserPopup: HTMLElement;
        /** registered and destroyed only while topmostlayer interaction */
        protected __resizedEventDestroyEvent: TcHmi.DestroyFunction | null;
        /** registered and destroyed only while topmostlayer interaction */
        protected __movedEventDestroyEvent: TcHmi.DestroyFunction | null;
        /**boolean to show if dropdownbox is open */
        protected __dropdownboxOpen: boolean;
        /**dropdown event destroy functions */
        protected __dropdownEventDestroyFunction: TcHmi.DestroyFunction[];
        /**text font size */
        protected __textFontSize: number | undefined;
        /**text font size unit */
        protected __textFontSizeUnit: TcHmi.FontSizeUnit | undefined;
        /**text font size */
        protected __userNameFontSize: number | undefined;
        /**text font size unit */
        protected __userNameFontSizeUnit: TcHmi.FontSizeUnit | undefined;
        /**headline font size */
        protected __headlineFontSize: number | undefined;
        /**headline font size unit */
        protected __headlineFontSizeUnit: TcHmi.FontSizeUnit | undefined;
        /**sub headline font size */
        protected __subHeadlineFontSize: number | undefined;
        /** subheadline font size unit */
        protected __subHeadlineFontSizeUnit: TcHmi.FontSizeUnit | undefined;
        /** drop down font size */
        protected __dropDownFontSize: number | undefined;
        /** drop down font size unit */
        protected __dropDownFontSizeUnit: FontSizeUnit | undefined;
        /**text color of the main element */
        protected __textColor: TcHmi.SolidColor | null | undefined;
        /**logout button */
        protected __logoutButton: HTMLElement | undefined;
        /**logout button */
        protected __switchUserButton: HTMLElement | undefined;
        /**Add User button  */
        protected __editUserButton: HTMLElement | undefined;
        /**Add User button  */
        protected __userManagementButton: HTMLElement | undefined;
        /**touch interactions */
        protected __touches: {
            id: number;
            originalX: number;
            originalY: number;
            element: HTMLElement;
        }[];
        /**dropdown eventhandler for click logout*/
        protected readonly __evtHandlerLogout: (this: void, e: MouseEvent) => void;
        /**dropdown eventhandler for click switchUser*/
        protected readonly __evtHandlerSwitchUser: (this: void, e: MouseEvent) => void;
        /**dropdown eventhandler for click user management */
        protected readonly __evtHandlerEditUser: (this: void, e: MouseEvent) => void;
        /**dropdown eventhandler for click user management */
        protected readonly __evtHandlerUserManagement: (this: void, e: MouseEvent) => void;
        /**dropdown eventhandler for mouse enter */
        protected readonly __evtHandlerMouseEnter: (this: void, e: MouseEvent) => void;
        /**dropdown eventhandler for mouse leave */
        protected readonly __evtHandlerMouseLeave: (this: void, e: MouseEvent) => void;
        /**dropdown eventhandler for mouse leave */
        protected readonly __evtHandlerMouseUp: (this: void, e: MouseEvent) => void;
        /** display logout button */
        protected __allowLogout: boolean | null | undefined;
        /** display switch user button */
        protected __allowSwitchUser: boolean | null | undefined;
        /**mouse down */
        protected __mouseDown: boolean;
        /** popups are in advanced state */
        protected __advanced: boolean;
        /**Switch User Popup */
        protected __switchUserPopup: TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups.SwitchUserPopup | null | undefined;
        /**Edit User Popup */
        protected __editUserPopup: TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups.EditUserPopup | null | undefined;
        /**UserManagement Popup */
        protected __manageUserPopup: TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups.ManageUserPopup | null | undefined;
        /** Localization */
        protected __localizedElements: Map<HTMLElement, {
            key: string;
            parameters?: any[] | undefined;
        }>;
        protected __localizationReader: Locale.LocalizationReader | undefined;
        protected __destroyLocalizationWatch: DestroyFunction | null;
        protected __onUserDataChangedDestroyer: DestroyFunction | null;
        protected __showUsermanagementButtons: {
            editUser: boolean;
            userManagement: boolean;
        };
        /**
         * If raised, the control object exists in control cache and constructor of each inheritation level was called.
         */
        __previnit(): void;
        /**
         * Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
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
        protected __onDocumentClick: (evt: MouseEvent) => void;
        /**
         * function to adjust dropdown posotion on resize or scroll
         */
        protected __resizeDropDownBox: (evt?: Event | TcHmi.EventProvider.Event) => void;
        /**
         * function to build or destroy Popup
         * @param valueNew? Toogles the dropdown
         */
        protected __setDropDownboxOpen(valueNew?: boolean): void;
        /**
         * Updates the displayed entries of the drop down menu
         **/
        updateDropdown(): void;
        /**
         * Get Api access to each domain and break them down to the usermanagement buttons
         **/
        protected __getApiAccessForDomains(): void;
        /**
         * Populates the dropdown list with elements specified in __data
         */
        protected __fillDropdown(): void;
        /**
         * function to create a drop down button.
         * @param localizationKey The localization key of the created button.
         * @param clickEventHandler The event handler for the click event of the button.
         */
        protected __createDropDownButton(clickEventHandler: (this: void, e: MouseEvent) => void, localizationKey: string): HTMLDivElement;
        /**
         * function to remove a drop down buttons eventListeners and localized elements.
         * @param buttonElement The element to remove.
         * @param clickEventHandler The event handler for the click event of the button.
         */
        protected __removeDropDownbutton(buttonElement: HTMLElement | undefined, clickEventHandler: (this: void, e: MouseEvent) => void): void;
        /**
         * function to create the switch user popup
         */
        showSwitchUserPopup(): void;
        /**
         * function to create the edit user popup
         */
        showEditUserPopup(): void;
        /**
         * function to create the Usermanagement Popup
         */
        showManageUserPopup(): void;
        /**
         * Refresh resources for existing popups
         */
        protected __refreshPopupResources(): void;
        /**
         * Event Callbackfunction ...
         */
        protected __onExpandDropdown(): (event: EventProvider.Event) => void;
        /**
         * Event Callbackfunction Mousedown
         */
        protected __onExpandDropdownMouseDown(): (event: EventProvider.Event) => void;
        /**
         * Event Callbackfunction Mouseout
         */
        protected __onExpandDropdownMouseLeave(): (event: EventProvider.Event) => void;
        /**
         * Event Callbackfunction Mousedown
         */
        protected __onExpandDropdownMouseEnter(): (event: EventProvider.Event) => void;
        /**
         * Event Callbackfunction called onMouseUp of document
         */
        protected __onMouseUp(): (event: MouseEvent) => void;
        /**
         * Event Callbackfunction called onClick of LogoutButton
         */
        protected __onLogout(): (event: MouseEvent) => void;
        /**
         * Event Callbackfunction called onClick of SwitchUserButton
         */
        protected __onSwitchUser(): (event: MouseEvent) => void;
        /**
         * Event Callbackfunction called onClick of EditUserButton
         */
        protected __onEditUser(): (event: MouseEvent) => void;
        /**
         * Event Callbackfunction called onClick of UserManagementButton
         */
        protected __onUserManagement(): (event: MouseEvent) => void;
        /**
         * Is raised if mouse enter to the combobox element.
         */
        protected __onMouseEnter(): (event: MouseEvent) => void;
        /**
         * Is raised if mouse leave the combobox element.
         */
        protected __onMouseLeave(): (event: MouseEvent) => void;
        /**
         * Returns an event handler for the touchstart event.
         */
        protected __onTouchstart(): (event: TouchEvent) => void;
        /**
         * Is raised if user data changed.
         */
        protected __onUserDataChanged(): () => void;
        /**
         * Adds or removes the hover class to the given combobox item.
         * @param element   The element representing the combobox item.
         * @param hover     Whether to add or remove the hover class.
         */
        protected __hoverComboboxItem(element: HTMLElement, hover: boolean): void;
        /**
         * get Notification Template
         */
        __getNotificationElement(): HTMLElement;
        /**
         * get Warning Template
         */
        __getWarningElement(): HTMLElement;
        /**
         * get AddUser Template
         */
        __getAddUserElement(): HTMLElement;
        /**
         * get AddUser Template
         */
        __getDeleteUserElement(): HTMLElement;
        /**
         * get AddUser Template
         */
        __getGroupmanagementElement(): HTMLElement;
        /**
         *  Get advanced state
         */
        getAdvancedState(): boolean;
        /**
         *  Set advanced state
         */
        setAdvancedState(valueNew: boolean): void;
        /**
         * Add an element to be localized.
         * @param element The element.
         * @param key The localization key.
         * @param parameters Optional parameters to pass to tchmi_format_string.
         */
        private __addLocalizedElement;
        /**
         * Remove a localized element.
         * @param element The element to remove.
         */
        private __removeLocalizedElement;
        getLocalization(): Locale.ControlLocalization;
        /********************************* ATTRIBUTE GETTER & SETTER *********************************************/
        /**
         * Sets the font size and calls the associated process function (processTextFontSize).
         * @param valueNew The new value for textFontSize.
         */
        setTextFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of textFontSize.
         * @returns The current value of textFontSize.
         */
        getTextFontSize(): number | undefined;
        /**
         * Processes the current TextFontSize attribute value.
         */
        protected __processTextFontSize(): void;
        /**
         * Sets the font size unit and calls the associated process function (processTextFontSizeUnit).
         * @param valueNew The new value for textFontSizeUnit.
         */
        setTextFontSizeUnit(valueNew: TcHmi.FontSizeUnit | null): void;
        /**
         * Returns the current value of textFontSizeUnit.
         * @returns The current value of textFontSizeUnit.
         */
        getTextFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current TextFontSize attribute value.
         */
        protected __processTextFontSizeUnit(): void;
        /**
         * Sets the font size and calls the associated process function (processHeadlineFontSize).
         * @param valueNew The new value for headlineFontSize.
         */
        setHeadlineFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of headlineFontSize.
         * @returns The current value of headlineFontSize.
         */
        getHeadlineFontSize(): number | undefined;
        /**
         * Processes the current headlineFontSize attribute value.
         */
        protected __processHeadlineFontSize(): void;
        /**
         * Sets the font size unit and calls the associated process function (processHeadlineFontSizeUnit).
         * @param valueNew The new value for headlineFontSizeUnit.
         */
        setHeadlineFontSizeUnit(valueNew: TcHmi.FontSizeUnit | null): void;
        /**
         * Returns the current value of headlineFontSizeUnit.
         * @returns The current value of headlineFontSizeUnit.
         */
        getHeadlineFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current headlineFontSizeUnit attribute value.
         */
        protected __processHeadlineFontSizeUnit(): void;
        /**
         * Sets the font size and calls the associated process function (procesSubHeadlineFontSize).
         * @param valueNew The new value for subHeadlineFontSize.
         */
        setSubHeadlineFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of subHeadlineFontSize.
         * @returns The current value of subHeadlineFontSize.
         */
        getSubHeadlineFontSize(): number | undefined;
        /**
         * Processes the current subHeadlineFontSize attribute value.
         */
        protected __procesSubHeadlineFontSize(): void;
        /**
         * Sets the font size unit and calls the associated process function (processSubHeadlineFontSizeUnit).
         * @param valueNew The new value for subHeadlineFontSizeUnit.
         */
        setSubHeadlineFontSizeUnit(valueNew: TcHmi.FontSizeUnit | null): void;
        /**
         * Returns the current value of subHeadlineFontSizeUnit.
         * @returns The current value of subHeadlineFontSizeUnit.
         */
        getSubHeadlineFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current subHeadlineFontSizeUnit attribute value.
         */
        protected __processSubHeadlineFontSizeUnit(): void;
        /**
         * Sets the font size and calls the associated process function (processDropDownFontSize).
         * @param valueNew The new value for DropDownFontSize.
         */
        setDropDownFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of DropDownFontSize.
         * @returns The current value of DropDownFontSize.
         */
        getDropDownFontSize(): number | undefined;
        /**
         * Processes the current DropDownFontSize attribute value.
         */
        protected __processDropDownFontSize(): void;
        /**
         * Sets the font size unit and calls the associated process function (processDropDownFontSizeUnit).
         * @param valueNew The new value for DropDownFontSizeUnit.
         */
        setDropDownFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current value of DropDownFontSizeUnit.
         * @returns The current value of DropDownFontSizeUnit.
         */
        getDropDownFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current DropDownFontSizeUnit attribute value.
         */
        protected __processDropDownFontSizeUnit(): void;
        /**
         * Sets the font size and calls the associated process function (processUserNameFontSize).
         * @param valueNew The new value for userNameFontSize.
         */
        setUserNameFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of userNameFontSize.
         * @returns The current value of userNameFontSize.
         */
        getUserNameFontSize(): number | undefined;
        /**
         * Processes the current userNameFontSize attribute value.
         */
        protected __processUserNameFontSize(): void;
        /**
         * Sets the font size unit and calls the associated process function (processUserNameFontSizeUnit).
         * @param valueNew The new value for userNameFontSizeUnit.
         */
        setUserNameFontSizeUnit(valueNew: TcHmi.FontSizeUnit | null): void;
        /**
         * Returns the current value of userNameFontSizeUnit.
         * @returns The current value of userNameFontSizeUnit.
         */
        getUserNameFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined;
        /**
         * Processes the current userNameFontSizeUnit attribute value.
         */
        protected __processUserNameFontSizeUnit(): void;
        /**
         * Sets the text color and calls the associated process function (processTextColor).
         * @param valueNew The new value for textColor.
         */
        setTextColor(valueNew: TcHmi.SolidColor | null): void;
        /**
         * The watch callback for the textColor object resolver.
         */
        protected __onResolverForTextColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmi.SolidColor>) => void;
        /**
         * Returns the current value of textColor.
         * @returns The current value of textColor.
         */
        getTextColor(): SolidColor | null | undefined;
        /**
         * Processes the current textColor attribute value.
         */
        protected __processTextColor(): void;
        /**
         * Sets the value of allowLogout
         * @param valueNew The new value for allowLogout
         */
        setAllowLogout(valueNew: boolean | null): void;
        /**
         * Gets the value of allowLogout
         * @returns The current value of allowLogout
         */
        getAllowLogout(): boolean | null | undefined;
        /**
         * Processes allowLogout
         */
        protected __processAllowLogout(): void;
        /**
         * Sets the value of allowSwitchUser
         * @param valueNew The new value for allowSwitchUser
         */
        setAllowSwitchUser(valueNew: boolean | null): void;
        /**
         * Gets the value of allowSwitchUser
         * @returns The current value of allowSwitchUser
         */
        getAllowSwitchUser(): boolean | null | undefined;
        /**
         * Processes allowSwitchUser
         */
        protected __processAllowSwitchUser(): void;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups {
    abstract class Popup {
        /**
         * Creates a new Popup.
         * @param element The HTML element that hosts the popup.
         * @param parentControl The control owning the popup.
         */
        constructor(element: HTMLElement, parentControl: TcHmi.Controls.Beckhoff.TcHmiUserManagement);
        /**parent control */
        protected __parentControl: TcHmi.Controls.Beckhoff.TcHmiUserManagement;
        /**popup html root element*/
        protected __element: HTMLElement;
        /**header html element */
        protected __elementHeadline: HTMLDivElement;
        /**content html element */
        protected __elementContent: HTMLDivElement;
        /**footer html element */
        protected __elementFooter: HTMLDivElement;
        /**font size of the displayed text*/
        protected __textFontSize: number | undefined;
        /**font size unit of the displayed text*/
        protected __textFontSizeUnit: FontSizeUnit | undefined;
        /**headline font size */
        protected __headlineFontSize: number | undefined;
        /**headline font size unit */
        protected __headlineFontSizeUnit: TcHmi.FontSizeUnit | undefined;
        /**sub headline font size */
        protected __subHeadlineFontSize: number | undefined;
        /** subheadline font size unit */
        protected __subHeadlineFontSizeUnit: TcHmi.FontSizeUnit | undefined;
        /**event destroyer functions */
        protected __eventDestroyers: DestroyFunction[];
        /**popup is displayed */
        protected __isShowing: boolean;
        /** The domain used for the api function */
        protected __selectedDomain: string | undefined;
        /** Localization */
        protected __localization: TcHmi.Locale.ControlLocalization;
        protected __localizedElements: Map<HTMLElement, {
            key: string;
            parameters?: any[] | undefined;
        }>;
        protected __localizationReader: Locale.LocalizationReader | undefined;
        /** Feedback Popup*/
        protected __feedbackPrompt: Helpers.TextAndButtonsPrompt<void> | null;
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Hides the popup.
         */
        hide(): void;
        /**
         * Destroys the popup and all its controls.
         */
        destroy(): void;
        isShowing(): boolean;
        /**
         * Set the domain used by the api function
         */
        setDomain(domain: string | undefined): void;
        /**
         * Add an element to be localized.
         * @param element The element.
         * @param key The localization key.
         * @param parameters Optional parameters to pass to tchmi_format_string.
         */
        protected __addLocalizedElement(element: HTMLElement, key: string, ...parameters: any[]): void;
        /**
         * Remove a localized element.
         * @param element The element to remove.
         */
        protected __removeLocalizedElement(element: HTMLElement): void;
        /**
         * Expands the given localization key to a full symbol expression.
         * @param key The key to expand.
         */
        protected __expandLocalizationSymbol(key: string): string;
        /**
         * Get all font sizes from the parent control and set them to the elements.
         */
        protected __updateFontSizes(): void;
        /**
         * Update resources from the parent control
         */
        refreshParentControlResources(): void;
        /**
         * Create a feedback prompt
         **/
        protected __createFeedbackPrompt(): Helpers.TextAndButtonsPrompt<undefined>;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups {
    /**
     * A popup to edit the information of the user.
     */
    class EditUserPopup extends Popup {
        /**
         * Creates a new LoginPopup.
         * @param element The HTML element that hosts the popup.
         * @param parentControl The control owning the popup.
         */
        constructor(element: HTMLElement, parentControl: TcHmi.Controls.Beckhoff.TcHmiUserManagement);
        /**content password*/
        protected __elementPassword: HTMLElement;
        /**content groups*/
        protected __elementGroups: HTMLElement;
        /**groups content html element*/
        protected __elementContentGroups: HTMLElement;
        /**localization content html element*/
        protected __elementLocale: HTMLElement;
        /**timezone content html element */
        /**dropdown eventhandler for group element scroll*/
        protected readonly __evtHandlerGroupScroll: (this: void, e: MouseEvent) => void;
        /**save button*/
        protected __saveButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**cancel button*/
        protected __closeButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**advanced toggle switch*/
        protected __advancedSwitch: TcHmi.Controls.Beckhoff.TcHmiToggleSwitch | undefined;
        /**old password textbox*/
        protected __oldPasswordInput: TcHmi.Controls.Beckhoff.TcHmiPasswordInput | undefined;
        /**new password textbox 1*/
        protected __newPasswordInput: TcHmi.Controls.Beckhoff.TcHmiPasswordInput | undefined;
        /** new password textbox 2*/
        protected __newPasswordInput_2: TcHmi.Controls.Beckhoff.TcHmiPasswordInput | undefined;
        /**localizatino combobox */
        protected __localCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        /**radiobutton client localization*/
        protected __radioButtonLocaleClient: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /** radiobutton project localization*/
        protected __radioButtonLocaleProject: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**radio button combobox selected localization*/
        protected __radioButtonLocale: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**time zone combobox */
        protected __timeZoneCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        /**radio button client time zone*/
        protected __radioButtonTimeZoneClient: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**radio button project time zone*/
        protected __radioButtonTimeZoneProjekt: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**radio button combobox selected time zone*/
        protected __radioButtonTimeZone: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**List of all existing user groups*/
        protected __groupList: string[];
        /**List of group checkboxes*/
        protected __groupCheckboxes: Map<string, TcHmi.Controls.Beckhoff.TcHmiCheckbox>;
        /** save the group changes done to the new user */
        protected __groupConfigurations: string[];
        /**Group checkbox event destroyers */
        protected __groupCheckboxEventDestroyer: DestroyFunction[];
        /** the last api access result */
        protected __apiAccessResult: TcHmi.Server.UserManagement.IApiAccessResultObject | undefined;
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Destroys the popup and all its controls.
         */
        destroy(): void;
        /**
         * Callback function to show Usermanagement buttons depending on the symbol Access of the User
         */
        protected __showControlsBasedOnApiAccess(): void;
        /**
         * create Username and Password Textbox
         */
        protected __createPasswordTextboxes(): void;
        /**
         * create user group selection
         */
        protected __createUserGroupSelection(): void;
        /**
         * create a single user group selection checkboxes
         * @param name Name of the created radion button
         */
        protected __createGroupCheckbox(name: string): void;
        /**
         * GroupCheckbox callback function
         * @param groupName group name
         */
        protected __onGroupCheckbox(checkbox: TcHmi.Controls.Beckhoff.TcHmiCheckbox, groupName: string): () => void;
        /**
         * Set group checkbox toggle states based on the current user config
         */
        protected __setGroupCheckboxesByUserConfig(): void;
        /**
         * create localization Selection radion buttons
         */
        protected __createLocalizationSelection(): void;
        /**
         * Set the radio button radio states by the current user config
         */
        protected __setLocaleRadioButtonsByUserConfig(): void;
        /**
         * create localization Selection radion buttons
         */
        protected __createTimeZoneSelection(): void;
        /**
         * Check selected locale RadioButton
         */
        protected __checkLocaleRadioButtons(): string | undefined;
        /**
         * Check selected timeZone RadioButton
         */
        protected __checkTimeZoneRadioButtons(): string | undefined;
        /**
         * Callback for a scroll on the groups element
         */
        protected __onGroupScroll(): (e: MouseEvent) => void;
        /**
         * Set group element scroll data
         */
        protected __setGroupScrollData(): void;
        /**
         * Enable and disable localization-/timezoneCombobox
         * @param isLocale Selection between locale and time zone
         */
        protected __onRadioStateChanged(isLocale: boolean): () => void;
        /**
         * Callback function on Savebutton up
         */
        protected __onSaveUp(): () => void;
        /**
         * Adds and removes usergroups of a User
         * @param username The name of the user which properties will be changed
         * @param oldPassword The old password
         * @param newPassword The new password of the user
         * @param groupsToAdd Array of groups which will be added to the user
         * @param groupsToRemove Array of groups which will be remove from the user
         * @param locale the new locale of the user
         * @param timeZone the new time zone of the user
         */
        protected __updateUser(username: string, oldPassword: string | undefined, newPassword: string | undefined, groupsToAdd: string[] | undefined, groupsToRemove: string[] | undefined, locale: string | undefined, timeZone: string | undefined): void;
        /**
         * Callback function for the advanced toggle switch
         */
        protected __onAdvanced(): () => void;
        /**
         * Resets the controls used in this popup
         */
        protected __resetControls(): void;
        /**
         * Callback function on Cancelbutton up
         */
        protected __onCloseUp(): () => void;
        /**
         * Get all font sizes from the parent control and set them to the elements.
         */
        protected __updateFontSizes(): void;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups {
    /**
     * The popup to navigate to the real functional popup.
     */
    class ManageUserPopup extends Popup {
        /**
         * Creates a new LoginPopup.
         * @param element The HTML element that hosts the popup.
         * @param parentControl The control owning the popup.
         */
        constructor(element: HTMLElement, parentControl: TcHmi.Controls.Beckhoff.TcHmiUserManagement);
        /** Domain selection headline */
        protected __domainHeadline: HTMLElement;
        /** feedback element */
        protected __elementFeedback: HTMLElement;
        /** Confirm button*/
        protected __closeButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /** add user button*/
        protected __addUserButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**delete user button */
        protected __deleteUserButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /** manage user groups button */
        protected __manageUserGroupsButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /** domain combobox */
        protected __domainCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        /** add user popup */
        protected __addUserPopup: TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups.AddUserPopup | undefined;
        /** delete user popup */
        protected __deleteUserPopup: TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups.DeleteUserPopup | undefined;
        /** manage user popup */
        protected __changeUserPopup: TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups.ChangeUserPopup | undefined;
        /** List of user groups */
        protected __groupList: Dictionary<TcHmi.Server.UserManagement.IGroupDetails> | undefined;
        /**content buttons*/
        protected __elementButtons: HTMLElement;
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Destroys the popup and all its controls.
         */
        destroy(): void;
        updateDomains(): void;
        /**
         * Create the domain combobox if it doesn't exist already.
         */
        protected __createDomainCombobox(): void;
        /**
         * display the buttons based on the current api access
         */
        protected __showButtonsBasedOnApiAccess(): void;
        /**
         * Callback function to create Usermanagement buttons depending on the symbol Access of the User
         */
        protected __createButtons(): void;
        /**
         * Callback function on ConfirmButton
         */
        protected __onClose(): () => void;
        /**
         * Callback function on AddUser
         */
        protected __onAddUser(): () => void;
        /**
         * Callback function on Edit User Properties
         */
        protected __onDeleteUser(): () => void;
        /**
         * Callback function on Edit User
         */
        protected __onChangeUser(): () => void;
        /**
         * Callback function on domain selection changed
         **/
        protected __onDomainSelectionChanged(): () => void;
        /**
         * Update resources from the parent control
         */
        refreshParentControlResources(): void;
        /**
         * Get all font sizes from the parent control and set them to the elements.
         */
        protected __updateFontSizes(): void;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups {
    /**
     * The Popup window to add a new User.
     */
    class AddUserPopup extends Popup {
        /**
         * Creates a new AddUserPopup.
         * @param element The HTML element that hosts the popup.
         * @param parentControl The control owning the popup.
         */
        constructor(element: HTMLElement, parentControl: TcHmi.Controls.Beckhoff.TcHmiUserManagement);
        /**content password*/
        protected __elementPassword: HTMLElement;
        /**content groups*/
        protected __elementGroups: HTMLElement;
        /**content groups html element*/
        protected __elementContentGroups: HTMLElement;
        /**locale content html element */
        protected __elementLocale: HTMLElement;
        /**time zone content html element */
        /**dropdown eventhandler for group element scroll*/
        protected readonly __evtHandlerGroupScroll: (this: void, e: MouseEvent) => void;
        /**save button */
        protected __saveButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**cancel button */
        protected __closeButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**advanced toggle switch*/
        protected __advancedSwitch: TcHmi.Controls.Beckhoff.TcHmiToggleSwitch | undefined;
        /**username textbox */
        protected __userNameInput: TcHmi.Controls.Beckhoff.TcHmiInput | undefined;
        /**password textbox */
        protected __newPasswordInput: TcHmi.Controls.Beckhoff.TcHmiPasswordInput | undefined;
        /**password textbox 2 */
        protected __newPasswordInput_2: TcHmi.Controls.Beckhoff.TcHmiPasswordInput | undefined;
        /**localization combobox */
        protected __localCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        /**radio button client localization*/
        protected __radioButtonLocaleClient: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**radio button project locale */
        protected __radioButtonLocaleProject: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**radio button combobox selected localization */
        protected __radioButtonLocale: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**time zone combobox */
        protected __timeZoneCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        /**radio button client timezone*/
        protected __radioButtonTimeZoneClient: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**radio button project timezone */
        protected __radioButtonTimeZoneProjekt: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**radio button combobox selected timezone */
        protected __radioButtonTimeZone: TcHmi.Controls.Beckhoff.TcHmiRadioButton | undefined;
        /**List of all existing user groups*/
        protected __groupList: string[];
        /**List of group checkboxes*/
        protected __groupCheckboxes: Map<string, TcHmi.Controls.Beckhoff.TcHmiCheckbox>;
        /** save the group changes done to the new user */
        protected __groupConfigurations: string[];
        /**Group checkbox event destroyers */
        protected __groupCheckboxEventDestroyer: DestroyFunction[];
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Destroys the popup and all its controls.
         */
        destroy(): void;
        /**
         * Callback function to show Usermanagement buttons depending on the symbol Access of the User
         */
        protected __showControlsBasedOnApiAccess(): void;
        /**
         * create Username Input
         */
        protected __createUserNameInput(): void;
        /**
         * create NewPassword Input controls
         */
        protected __createNewPasswordInput(): void;
        /**
         * create user group selection
         */
        protected __createUserGroupSelection(): void;
        /**
         * create a single user group selection checkboxes
         * @param name The name of the created Checkbox
         */
        protected __createGroupCheckbox(name: string): void;
        /**
         * GroupCheckbox callback function
         * @param groupName group name
         */
        protected __onGroupCheckbox(checkbox: TcHmi.Controls.Beckhoff.TcHmiCheckbox, groupName: string): () => void;
        /**
         * create localization Selection radion buttons
         */
        protected __createLocalizationSelection(): void;
        /**
         * create localization Selection radion buttons
         */
        protected __createTimeZoneSelection(): void;
        /**
         * Check selected locale RadioButton
         */
        protected __checkLocaleRadioButtons(): string | undefined;
        /**
         * Check selected timeZone RadioButton
         */
        protected __checkTimeZoneRadioButtons(): string;
        /**
         * Callback for a scroll on the groups element
         */
        protected __onGroupScroll(): (e: MouseEvent) => void;
        /**
         * Set group element scroll data
         */
        protected __setGroupScrollData(): void;
        /**
         * Enable and disable localization-/timezoneCombobox
         * @param isLocale Selection between locale and time zone
         */
        protected __onRadioStateChanged(isLocale: boolean): () => void;
        /**
         * Callback function for the advanced toggle switch
         */
        protected __onAdvanced(): () => void;
        /**
         * Callback function on Savebutton up
         */
        protected __onSaveUp(): () => void;
        /**
         * Resets the controls used in this popup
         */
        protected __resetControls(): void;
        /**
         * Callback function on Cancelbutton up
         */
        protected __onCloseUp(): () => void;
        /**
         * Get all font sizes from the parent control and set them to the elements.
         */
        protected __updateFontSizes(): void;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups {
    /**
     * A popup for deleting users.
     */
    class DeleteUserPopup extends Popup {
        /**
         * Creates a new ChangeGroupsPopup.
         * @param element The HTML element that hosts the popup.
         * @param parentControl The control owning the popup.
         */
        constructor(element: HTMLElement, parentControl: TcHmi.Controls.Beckhoff.TcHmiUserManagement);
        /**confirm button*/
        protected __confirmButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**cancel button*/
        protected __closeButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**advanced toggle switch*/
        protected __advancedSwitch: TcHmi.Controls.Beckhoff.TcHmiToggleSwitch | undefined;
        /**user combobox*/
        protected __userCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        /**name of the selected user*/
        protected __selectedUserName: string | null | undefined;
        protected __deleteConfirmationPrompt: Helpers.TextAndButtonsPrompt<boolean> | null;
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Destroys the popup and all its controls.
         */
        destroy(): void;
        /**
         * create user selection combobox
         */
        protected __createUserSelectionCombobox(): void;
        /**
         * Update selectable Users in the UserCombobox
         */
        protected __updateComboboxData(): void;
        /**
         * Callback function on usercombobox selections changed. Update Checkbox selection for the selected user.
         */
        protected __onUserCombobox(): () => void;
        /**
         * enable the popup controls due to the current state
         */
        protected __updatePopupControls(): void;
        /**
         * Callback function on Savebutton cancel
         * @param username The name of the user which properties will be changed
         */
        private __deleteUser;
        /**
         * Callback function on Savebutton cancel
         */
        protected __onConfirm(): () => void;
        /**
         * Callback function for the advanced toggle switch
         */
        protected __onAdvanced(): () => void;
        /**
         * Callback function on Savebutton cancel
         */
        protected __onCancel(): () => void;
        /**
         * Get all font sizes from the parent control and set them to the elements.
         */
        protected __updateFontSizes(): void;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups {
    /**
     * A popup for changing a users groups.
     */
    class ChangeUserPopup extends Popup {
        /**
         * Creates a new ChangeUsersPopup.
         * @param element The HTML element that hosts the popup.
         * @param parentControl The control owning the popup.
         */
        constructor(element: HTMLElement, parentControl: TcHmi.Controls.Beckhoff.TcHmiUserManagement, parentPopup: TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups.ManageUserPopup);
        /** the parent popup*/
        protected __parentPopup: TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups.ManageUserPopup;
        /**group display content html element*/
        protected __elementContentGroups: HTMLElement;
        /**content 2 html element*/
        protected __elementContent_2: HTMLElement;
        /**dropdown eventhandler for group element scroll*/
        protected readonly __evtHandlerGroupScroll: (this: void, e: MouseEvent) => void;
        /**confirm button*/
        protected __confirmButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**cancel button*/
        protected __closeButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /**advanced toggle switch*/
        protected __advancedSwitch: TcHmi.Controls.Beckhoff.TcHmiToggleSwitch | undefined;
        /**user combobox*/
        protected __userCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        protected __groupList: string[] | null;
        /** list of group checkboxes*/
        protected __groupCheckboxes: Map<string, TcHmi.Controls.Beckhoff.TcHmiCheckbox>;
        /**List of all users*/
        protected __userList: Dictionary<TcHmi.Server.UserManagement.IUserDetails>;
        /**user details of the selected user*/
        protected __selectedUserDetails: TcHmi.Server.UserManagement.IUserDetails | undefined;
        /**name of the selected user*/
        protected __selectedUserName: string | null | undefined;
        /** save the changes done for each user <user, groups the user is in> */
        protected __groupConfigurations: Map<string, string[]>;
        /**Group checkbox event destroyers */
        protected __groupCheckboxEventDestroyer: DestroyFunction[];
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Destroys the popup and all its controls.
         */
        destroy(): void;
        /**
         * create user selection combobox
         */
        protected __createUserSelectionCombobox(): void;
        /**
         * Update selectable Users in the UserCombobox
         */
        protected __updateComboboxData(): void;
        /**
         * Callback function on usercombobox selections changed. Update Checkbox selection for the selected user.
         */
        protected __onUserCombobox(): () => void;
        /**
         * enable the popup controls due to the current state
         */
        protected __updatePopupControls(): void;
        /**
         * create user group selection
         */
        protected __createUserGroupSelection(): void;
        /**
         * create a single user group selection checkboxes
         * @param name Name of the created radion button
         */
        protected __createGroupCheckbox(name: string): void;
        /**
         * GroupCheckbox callback function
         * @param groupName group name
         */
        protected __onGroupCheckbox(checkbox: TcHmi.Controls.Beckhoff.TcHmiCheckbox, groupName: string): () => void;
        /**
         * Adds and removes usergroups of a User
         * @param username The name of the user which properties will be changed
         * @param groupsToAdd Array of groups which will be added to the user
         * @param groupsToRemove Array of groups which will be remove from the user
         */
        protected __updateUser(username: string, groupsToAdd: string[], groupsToRemove: string[]): void;
        /**
         * Callback function on Savebutton cancel
         */
        protected __onConfirm(): () => void;
        /**
         * Callback function for the advanced toggle switch
         */
        protected __onAdvanced(): () => void;
        /**
         * Callback for a scroll on the groups element
         */
        protected __onGroupScroll(): (e: MouseEvent) => void;
        /**
         * Set group element scroll data
         */
        protected __setGroupScrollData(): void;
        /**
         * Callback function on Savebutton cancel
         */
        protected __onCancel(): () => void;
        /**
         * Get all font sizes from the parent control and set them to the elements.
         */
        protected __updateFontSizes(): void;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiUserManagementPopups {
    /**
     * A popup for deleting users.
     */
    class SwitchUserPopup extends Popup {
        /**
         * Creates a new ChangeGroupsPopup.
         * @param element The HTML element that hosts the popup.
         * @param parentControl The control owning the popup.
         */
        constructor(element: HTMLElement, parentControl: TcHmi.Controls.Beckhoff.TcHmiUserManagement);
        /** Domain selection headline */
        protected __domainHeadline: HTMLElement;
        /** User selection headline */
        protected __usernameHeadline: HTMLElement;
        /**content password*/
        protected __elementUsername: HTMLElement;
        /**content password*/
        protected __elementPassword: HTMLElement;
        /** confirm button */
        protected __confirmButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /** cancel button */
        protected __closeButton: TcHmi.Controls.Beckhoff.TcHmiButton | undefined;
        /** advanced toggle switch */
        protected __advancedSwitch: TcHmi.Controls.Beckhoff.TcHmiToggleSwitch | undefined;
        /** user combobox */
        protected __userCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        /** username input */
        protected __usernameInput: TcHmi.Controls.Beckhoff.TcHmiInput | undefined;
        /** password input */
        protected __passwordInput: TcHmi.Controls.Beckhoff.TcHmiPasswordInput | undefined;
        /** domain combobox */
        protected __domainCombobox: TcHmi.Controls.Beckhoff.TcHmiCombobox | undefined;
        /** name of the selected user */
        protected __selectedUserName: string | null | undefined;
        /** defines a control to choose the user to be logged in */
        protected __userSelectType: 'Combobox' | 'Input';
        /**
         * Shows the popup.
         */
        show(): void;
        /**
         * Destroys the popup and all its controls.
         */
        destroy(): void;
        /**
         * Get and handle the domains
         **/
        protected __updateDomains(): void;
        /**
         * Create the domain combobox if it doesn't exist already.
         */
        protected __createDomainCombobox(): void;
        /**
         * Updates the user selection
         */
        protected __updateUserSelection(): void;
        /**
         * create user selection combobox
         */
        protected __createUserSelectionCombobox(): void;
        /**
         * create username input if user could not be listed and the combobox could not be filled
         */
        protected __createUsernameInput(): void;
        /**
         * Show Combobox to select a user
         */
        protected __showSelectionCombobox(): void;
        /**
         * Show input control to enter a user
         */
        protected __showSelectionInput(): void;
        /**
         * Update selectable Users in the UserCombobox
         */
        protected __updateComboboxData(): void;
        /**
         * create password input field
         */
        protected __createPasswordInput(): void;
        /**
         * Callback function on usercombobox selections changed. Update Checkbox selection for the selected user.
         */
        protected __onUserCombobox(): () => void;
        /**
         * enable the popup controls due to the current state
         */
        protected __updatePopupControls(): void;
        /**
         * Callback function on Savebutton
         */
        protected __onConfirm(): () => void;
        /**
         * Callback function for the advanced toggle switch
         */
        protected __onAdvanced(): () => void;
        /**
         * Callback function on Savebutton cancel
         */
        protected __onCancel(): () => void;
        /**
         * Callback function on domain selection changed
         **/
        protected __onDomainSelectionChanged(): () => void;
        /**
         * Get all font sizes from the parent control and set them to the elements.
         */
        protected __updateFontSizes(): void;
    }
}
//# sourceMappingURL=TcHmiUserManagement.d.ts.map