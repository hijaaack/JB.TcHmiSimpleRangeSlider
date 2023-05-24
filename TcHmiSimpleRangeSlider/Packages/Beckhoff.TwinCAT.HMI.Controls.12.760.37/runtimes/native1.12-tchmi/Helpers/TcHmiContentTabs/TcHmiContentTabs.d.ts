declare module TcHmi.Controls.Helpers {
    /**
     * How to use
     * HTML example
    <tchmi-content-tabs>
        <tchmi-tab-links>
            <tchmi-tab-link active ref="Tab2">Header 2</tchmi-tab-link>
            <tchmi-tab-link ref="Tab1">Header 1</tchmi-tab-link>
        </tchmi-tab-links>
        <tchmi-tab-contents>
            <tchmi-tab-content name="Tab1">Content 1</tchmi-tab-content>
            <tchmi-tab-content active name="Tab2">Content 2</tchmi-tab-content>
            <tchmi-tab-content name="Unused"></tchmi-tab-content>
        </tchmi-tab-contents>
    </tchmi-content-tabs>
     **/
    class ContentTabs extends HTMLElement {
        constructor();
        connectedCallback(): void;
        disconnectedCallback(): void;
        /**
         * Add ContentTab.
         * @param name Name of ContentTab to add.
         * @param link HTMLElement to click on to open the content of the tab.
         * @param content HTMLElement which is shown when tab is active.
         */
        addContentTab(name: string, link: HTMLElement, content: HTMLElement): void;
        /**
         * Arrange displayed tabs and the tab link overflow element.
         */
        arrangeTabLinks(): void;
        /**
         * Remove ContentTab.
         * @param name Name of ContentTab to remove.
         */
        removeContentTab(name: string): void;
        /**
         * Opens a tab by its name.
         * @param nameOfTabToOpen Name of tab which should be opened. If no tab name is specified, the active tab is selected. If this is also not known, the first tab is opened.
         */
        openTab(nameOfTabToOpen?: string): void;
        /**
         * Show dropdown element in top most layer
         */
        private __openDropdown;
        /**
         * Resize the dropdown element
         */
        private __resizeDropdown;
        /**
         * Get tab by name.
         * @param tabName name of tab which should be returned.
         **/
        getTab(tabName: string): ContentTabs.Tab | undefined;
        /**
         * Returns name of active tab.
         */
        get activeTab(): string | undefined;
        /**
         * Enable a tab. Tab is enabled by default.
         * @param tabName name of tab which should be enabled.
         **/
        enableTab(tabName: string): void;
        /**
         * Disable a tab. Tab is enabled by default.
         * @param tabName name of tab which should be disabled.
         **/
        disableTab(tabName: string): void;
        /**
         * Add the attribute 'use-max-content' to the TabContentsWrapper
         * to prevent the size of the container from jumping back and forth
         * => content container always assumes the size of the largest content
         */
        useMaxContent(): void;
        /**
         * Remove the attribute 'use-max-content' from the TabContentsWrapper
         * that prevent the size of the container from jumping back and forth
         * => this means that the content container only ever has the size of the visible content
         **/
        doNotUseMaxContent(): void;
        /**
         * Add callback, which is fired on tab change.
         * @param cb: (tabName: string) => void Function which is fired on tab change. Parameter contains the name of the new tab.
         */
        addTabChangeCallback(cb: (newTabName: string) => void): void;
        /**
         * Remove callback, which is fired on tab change.
         * @param cb: (tabName: string) => void Function which is fired on tab change. Parameter contains the name of the new tab.
         */
        removeTabChangeCallback(cb: (newTabName: string) => void): void;
        /**
         * Set the alignment of the tabs.
         * @param tabAlignment the new alignment of the tabs.
         */
        setTabAlignment(tabAlignment: ContentTabs.TabAlignment): void;
        private __getTabLinksWrapper;
        private __getTabContentsWrapper;
        private __appendTabLinksOverflowElement;
        private __removeTabLinksOverflowElement;
        private __updateLinksAndContents;
        /**
         * Add openTab event on all tchmi-tab-link.
         */
        private __addEvents;
        /**
         * Remove openTab event on all tchmi-tab-link.
         */
        private __removeEvents;
        /**
         * Finds the first active tab, marks all other tabs as inactive and
         * synchronizes the active attribute between link and content.
         */
        private __findActiveTab;
        /**
         * Map of all valid Tabs including content and link
         * Key is the name of the tab
         */
        private __tabs;
        private __activeTab?;
        private __resizeObserver;
        /**
         * The element that contains the tab links that are hidden due to less space.
         */
        private __tabLinksOverflowElement;
        /**
         * The element that contains the tab links that are hidden due to less space.
         */
        private __tabLinkDropdown;
        private __tabAlignment;
        /**
         * Contains all functions which are fired on tab change.
         */
        private __tabChangeCallbacks;
    }
    module ContentTabs {
        interface Tab {
            link: HTMLElement;
            content: HTMLElement;
            openTabHandler: () => void;
            disabled: boolean;
            dropdown: boolean;
        }
        type TabAlignment = 'Top' | 'Right' | 'Bottom' | 'Left';
    }
}
//# sourceMappingURL=TcHmiContentTabs.d.ts.map