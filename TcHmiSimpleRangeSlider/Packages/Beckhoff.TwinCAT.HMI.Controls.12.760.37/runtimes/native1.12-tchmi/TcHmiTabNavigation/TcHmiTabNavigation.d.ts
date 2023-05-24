declare module TcHmi.Controls.Beckhoff {
    class TcHmiTabNavigation extends TcHmi.Controls.System.TcHmiControl {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /** Reference to the root dom element of the current control template as HTMLElement. */
        protected __elementTemplateRoot: HTMLElement;
        /** Reference to the content tabs dom element of the control */
        protected __elementContentTabs: TcHmi.Controls.Helpers.ContentTabs;
        /** The List of tabs to be displayed in the control */
        protected __tabs: TcHmiTabNavigation.Tab[] | null | undefined;
        protected __oldTabs: TcHmiTabNavigation.Tab[] | null | undefined;
        /** Marks if there is completely new data for the tabs attribute */
        protected __newTabsData: boolean;
        /** Cache the file host attributes to be able to pass symbols to the file host */
        protected __fileHostAttributesCache: Map<string, string | Dictionary<any> | undefined>;
        /** The name of the active tab */
        protected __activeTabName: string | undefined;
        /** The alignment of the tab bar */
        protected __tabAlignment: Helpers.ContentTabs.TabAlignment | null | undefined;
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
         * Callback function which is fired on tab change
         **/
        protected __tabChangeCallback: (newTabName: string) => void;
        /**
         * Builds the file host instance based on TargetFile and TargetFileHostAttributes for a single tab
         * and appends it to the tabs contentElement.
         */
        protected __buildFileHost(tab: TcHmiTabNavigation.Tab): void;
        /** Append the target file host of a specific tab to its contentElement */
        protected __attachTargetFileHost(tab: TcHmiTabNavigation.Tab): void;
        /** Detach target file host */
        protected __detachTargetFileHost(tab: TcHmiTabNavigation.Tab): void;
        /**
         * Build the link element for a single tab.
         * @param tab
         */
        protected __buildLink(tab: TcHmiTabNavigation.Tab): void;
        /**
         * Build the icon element for a tab if the icon data is given.
         */
        protected __buildIcon(tab: TcHmiTabNavigation.Tab): void;
        /**
         * Remove tabs from the control and destroy the file host.
         * @param tabs
         */
        protected __removeTabs(tabs: TcHmiTabNavigation.Tab[] | null | undefined, destroy?: boolean): void;
        /**
         * Sets the content value and calls the associated process function (processTabs).
         * @param valueNew The new value for the tabs attribute.
         */
        setTabs(valueNew: TcHmiTabNavigation.Tab[] | null): void;
        /**
         * The watch callback for the tabs object resolver.
         */
        protected __onResolverForTabsWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<TcHmiTabNavigation.Tab[]>) => void;
        /**
         * Returns the current value of the tabs attribute.
         */
        getTabs(): TcHmiTabNavigation.Tab[] | null | undefined;
        /**
         * Processes the tabs.
         */
        protected __processTabs(): void;
        /**
         * Sets the TabAlignment attribute.
         * @param valueNew The new value for TabAlignment.
         */
        setTabAlignment(valueNew: Helpers.ContentTabs.TabAlignment | null): void;
        /**
         * Returns the current value of TabAlignment.
         */
        getTabAlignment(): Helpers.ContentTabs.TabAlignment | null | undefined;
        /**
         * Processes the current value of attribute TabAlignment.
         */
        protected __processTabAlignment(): void;
        /**
         * Processes the current border-radius attribute.
         */
        protected __processBorderRadius(): void;
    }
    module TcHmiTabNavigation {
        interface Tab {
            name: string;
            displayName: string;
            targetFile: TargetFile;
            targetFileHostPreload: boolean;
            targetFileHostPreAttach: boolean;
            targetFileHostKeepAlive: boolean;
            fileHost?: TcHmi.Controls.System.TcHmiRegion | TcHmi.Controls.System.TcHmiUserControlHost;
            linkElement?: HTMLElement;
            contentElement?: HTMLElement;
            horizontalAlignment?: TcHmi.HorizontalAlignment;
            verticalAlignment?: TcHmi.VerticalAlignment;
            icon?: TabIcon;
            iconElement?: HTMLElement;
        }
        interface TargetFile {
            path: string;
            attributes?: Dictionary<any>;
        }
        interface TabIcon {
            iconPath: string;
            iconWidth: number;
            iconWidthUnit: 'px' | '%';
            iconHeight: number;
            iconHeightUnit: 'px' | '%';
        }
    }
}
//# sourceMappingURL=TcHmiTabNavigation.d.ts.map