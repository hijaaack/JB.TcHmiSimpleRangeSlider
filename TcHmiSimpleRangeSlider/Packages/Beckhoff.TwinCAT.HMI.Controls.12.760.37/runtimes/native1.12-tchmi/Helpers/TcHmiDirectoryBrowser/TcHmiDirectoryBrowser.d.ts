declare module TcHmi.Controls.Helpers {
    abstract class Display {
        protected __element: HTMLElement;
        protected __parentControl: TcHmi.Controls.System.TcHmiControl;
        protected __suspended: boolean;
        protected __directory: DirectoryBrowser.Directory<unknown, unknown> | null;
        protected __directoryEventDestroyers: DestroyFunction[];
        /**
         * Creates a new Display.
         * @param __element The element that hosts the Display in the DOM.
         */
        constructor(__element: HTMLElement, __parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Removes all event listeners. Should be called when the owning control is detached or destroyed.
         * @param clear Set to true to remove all child elements from the element.
         */
        suspend(clear: boolean): void;
        /**
         * Re-adds event listeners that were previously removed by suspend. Should be called when owning control is reattached.
         * The display is initialised in a suspended state, so resume can be called from the constructor to add event listeners.
         */
        resume(): void;
        /**
         * Sets a new directory.
         */
        setDirectory(directory: DirectoryBrowser.Directory<unknown, unknown> | null): void;
        /**
         * Processes the directory.
         */
        protected abstract __processDirectory(): void;
    }
}
declare module TcHmi.Controls.Helpers {
    abstract class DragAndDropDisplay extends Display {
        protected __dragAndDropAllowed: boolean;
        protected __draggedElement: HTMLElement | null;
        protected __dropElement: HTMLElement | null;
        protected readonly __onDragAndDropManager: CallbackManager<(draggedItems: string[], droppedOnto: {
            name: string;
            isParent: boolean;
        }) => void>;
        readonly onDragAndDrop: Readonly<{
            add: (callback: (draggedItems: string[], droppedOnto: {
                name: string;
                isParent: boolean;
            }) => void) => DestroyFunction;
            remove: (callback: (draggedItems: string[], droppedOnto: {
                name: string;
                isParent: boolean;
            }) => void) => void;
        }>;
        /**
         * Creates a new DragAndDropDisplay.
         * @param __element The element that hosts the DragAndDropDisplay in the DOM.
         */
        constructor(element: HTMLElement, parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Event handler for the dragstart event of __element.
         * @param event The event
         */
        protected __onDragStart: (event: DragEvent) => void;
        /**
         * Event handler for the dragover event of __element.
         * @param event The event
         */
        protected __onDragOver: (event: DragEvent) => void;
        /**
         * Event handler for the drop event of __element.
         * @param event The event
         */
        protected __onDrop: (event: DragEvent) => void;
        /**
         * Event handler for the dragend event of __element.
         * @param event The event
         */
        protected __onDragEnd: (event: DragEvent) => void;
        /**
         * Removes all event listeners. Should be called when the owning control is detached or destroyed.
         * @param clear Set to true to remove all child elements from the path element.
         */
        suspend(clear?: boolean): void;
        /**
         * Re-adds event listeners that were previously removed by suspend. Should be called when owning control is reattached.
         */
        resume(): void;
        /**
         * Sets dragAndDropAllowed to control whether items can be dragged and dropped.
         * @param valueNew The new value for dragAndDropAllowed.
         */
        setDragAndDropAllowed(valueNew: boolean): void;
        /**
         * Gets the current value of dragAndDropAllowed.
         */
        getDragAndDropAllowed(): boolean;
        /**
         * Processes the current value of __dragAndDropAllowed
         */
        protected __processDragAndDropAllowed(): void;
        /**
         * Adds event handlers for drag and drop events.
         */
        protected __addDragAndDropHandlers(): void;
        /**
         * Removes event handlers for drag and drop events.
         */
        protected __removeDragAndDropHandlers(): void;
    }
}
declare module TcHmi.Controls.Helpers {
    class PathDisplay extends Display {
        protected __scrollContainer: HTMLDivElement;
        protected __itemListElement: HTMLUListElement;
        protected __mouseDragScrolling: boolean;
        /**
         * Creates a new PathDisplay.
         * @param element The element that hosts the PathDisplay in the DOM.
         */
        constructor(element: HTMLDivElement, parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Event handler for the click event of __itemListElement.
         * @param event The event.
         */
        protected __onClick: (event: MouseEvent) => void;
        /**
         * Event handler for the mousedown event of __element.
         * @param event The event.
         */
        protected __onMouseDown: (event: MouseEvent) => void;
        /**
         * Event handler for the mouseup event of document.
         * @param event The event.
         */
        protected __onMouseUp: (event: MouseEvent) => void;
        /**
         * Event handler for the mousemove event of document.
         * @param event The event.
         */
        protected __onMouseMove: (event: MouseEvent) => void;
        /**
         * Removes all event listeners. Should be called when the owning control is detached or destroyed.
         * @param clear Set to true to remove all child elements from the path element.
         */
        suspend(clear?: boolean): void;
        /**
         * Re-adds event listeners that were previously removed by suspend. Should be called when owning control is reattached.
         */
        resume(): void;
        /**
         * Processes the directory.
         */
        protected __processDirectory(): void;
        /**
         * Updates the path display.
         */
        protected __updatePath(path: DirectoryBrowser.Item<unknown, unknown>[] | null | undefined): void;
        /**
         * Creates a new list element, or updates an existing one, to represent the given pathItem.
         * @param item The item to represent.
         * @param element Can be set to reuse an existing element.
         */
        protected __createOrUpdateListElement(item: DirectoryBrowser.Item<unknown, unknown>, element?: HTMLLIElement): HTMLLIElement;
    }
}
declare module TcHmi.Controls.Helpers {
    class ListBrowsingDisplay extends Display {
        protected __showingParent: boolean;
        protected __lastPointerDown: {
            type: string;
            timestamp: number;
            doubleClickOnNextUp: boolean;
            ignoreNextUp: boolean;
            target: EventTarget | null;
            timeoutID: number;
            coords: {
                x: number;
                y: number;
            };
        };
        protected __pointerMultiselect: boolean;
        protected __formatMetadata: ((item: DirectoryBrowser.Item<unknown, unknown>) => string) | null;
        /**
         * Creates a new ListBrowsingDisplay.
         * @param element The element that hosts the ListBrowsingDisplay in the DOM.
         * @param parentControl The control that owns the ListBrowsingDisplay.
         */
        constructor(element: HTMLUListElement, parentControl: TcHmi.Controls.System.TcHmiControl);
        /**
         * Event handler for the pointerdown event of document.
         * @param event The event.
         */
        protected __onPointerDown: (event: PointerEvent) => void;
        /**
         * Event handler for the pointerup event of the list element.
         * @param event The event.
         */
        protected __onPointerUp: (event: PointerEvent) => void;
        /**
         * Event handler for the pointermove event of document.
         * @param event The event.
         */
        protected __onPointerMove: (event: PointerEvent) => void;
        /**
         * Event handler for the scroll event of the document and the list element.
         */
        protected __onScroll: () => void;
        /**
         * Event handler for the contextmenu event of the list element.
         * @param event The event.
         */
        protected __onContextMenu: (event: Event) => void;
        /**
         * Checks if the event should be acted upon and if yes, returns the target, item name and whether the target represents the parent item.
         * @param event The event to check.
         */
        protected __preprocessPointerEvent(event: PointerEvent): false | ListBrowsingDisplay.ListItemEvent;
        /**
         * Selects an item.
         * @param event The event containing information about the item to select. Use null to clear the selection.
         */
        protected __select(event: ListBrowsingDisplay.ListItemEvent | null): Promise<void>;
        /**
         * Navigates to a child or parent item.
         * @param event The event containing information about the item that should be navigated to.
         */
        protected __navigate(event: ListBrowsingDisplay.ListItemEvent): void;
        /**
         * Removes all event listeners. Should be called when the owning control is detached or destroyed.
         * @param clear Set to true to remove all child elements from the path element.
         */
        suspend(clear?: boolean): void;
        /**
         * Re-adds event listeners that were previously removed by suspend. Should be called when owning control is reattached.
         */
        resume(): void;
        /**
         * Show metadata about each item.
         * @param metadataFormatter A function that receives an item an returns a string that should be displayed as the metadata
         */
        showMetadata<TFile, TFolder>(metadataFormatter: (item: DirectoryBrowser.Item<TFile, TFolder>) => string): void;
        /**
         * Hides the metadata.
         */
        hideMetadata(): void;
        /**
         * Processes the directory.
         */
        protected __processDirectory(): void;
        /**
         * Updates the currentItem.
         */
        protected __updateCurrentItem(currentItem: DirectoryBrowser.Item<unknown, unknown> | null | undefined): void;
        /**
         * Creates a new list element, or updates an existing one, to represent the given pathItem.
         * @param item The item to represent.
         * @param status Signals whether the pathItem is the parent of the displayed view, or the current item.
         * @param element Can be set to reuse an existing element.
         */
        protected __createOrUpdateListElement(item: DirectoryBrowser.Item<unknown, unknown>, status?: ListBrowsingDisplay.ListItemStatus, element?: HTMLLIElement): HTMLLIElement;
        /**
         * Updates the selected item
         * @param selectedItemName The name of the selected item.
         */
        protected __updateSelection(): void;
    }
    module ListBrowsingDisplay {
        enum ListItemStatus {
            Default = 0,
            Selected = 1,
            Current = 2,
            Parent = 3
        }
        interface ListItemEvent {
            target: HTMLLIElement;
            item: {
                isParent: false;
                name: string;
            } | {
                isParent: true;
            };
            multiselect: boolean;
        }
    }
}
declare module TcHmi.Controls.Helpers {
    class DirectoryBrowser<TFile, TFolder> {
        protected __displays: Set<Display>;
        protected __directory: DirectoryBrowser.Directory<TFile, TFolder> | null;
        protected __suspended: boolean;
        protected __directoryUpdatesSuspension: {
            suspended: boolean;
            cachedUpdate: DirectoryBrowser.Root<TFile, TFolder> | null | undefined;
        };
        protected __fakeFile: {
            path: string[];
            payload: TFile;
            metadata?: Dictionary<any>;
            remove: () => DirectoryBrowser.Root<TFile, TFolder> | null;
        } | null;
        protected __pathToSet: {
            path: string[];
            callback: (result: boolean | PromiseLike<boolean>) => void;
        } | null;
        protected __itemsToSelect: {
            itemName: string;
            callback: (result: boolean | PromiseLike<boolean>) => void;
        }[];
        protected __navigationToFilesAllowedCache: boolean;
        private __multiSelectAllowedCache;
        protected __onBeforePathChangeManager: AsyncCallbackManager<(newCurrentItem: DirectoryBrowser.Item<TFile, TFolder> | null, newPath: string[] | null, cancelable: boolean) => boolean>;
        /** Event handlers that are called before the path is changed. If the cancelable parameter is true, returning false from one of the handlers will cancel the path change. */
        onBeforePathChange: Readonly<{
            add: (callback: (newCurrentItem: DirectoryBrowser.Item<TFile, TFolder> | null, newPath: string[] | null, cancelable: boolean) => Promise<boolean>) => DestroyFunction;
            remove: (callback: (newCurrentItem: DirectoryBrowser.Item<TFile, TFolder> | null, newPath: string[] | null, cancelable: boolean) => Promise<boolean>) => void;
        }>;
        protected __onBeforeSelectionChangeManager: AsyncCallbackManager<(newSelectedItems: DirectoryBrowser.DescendantItem<TFile, TFolder>[] | null, cancelable: boolean) => boolean>;
        /** Event handlers that are called before the selection is changed. If the cancelable parameter is true, returning false from one of the handlers will cancel the selection change. */
        onBeforeSelectionChange: Readonly<{
            add: (callback: (newSelectedItems: DirectoryBrowser.DescendantItem<TFile, TFolder>[] | null, cancelable: boolean) => Promise<boolean>) => DestroyFunction;
            remove: (callback: (newSelectedItems: DirectoryBrowser.DescendantItem<TFile, TFolder>[] | null, cancelable: boolean) => Promise<boolean>) => void;
        }>;
        protected __onSelectionChangeManager: CallbackManager<(selectedItems: DirectoryBrowser.DescendantItem<TFile, TFolder>[] | null) => void>;
        /** Event handlers that are called after the selection has changed. */
        onSelectionChange: Readonly<{
            add: (callback: (selectedItems: DirectoryBrowser.DescendantItem<TFile, TFolder>[] | null) => void) => DestroyFunction;
            remove: (callback: (selectedItems: DirectoryBrowser.DescendantItem<TFile, TFolder>[] | null) => void) => void;
        }>;
        protected __onSelectedItemUpdateManager: CallbackManager<(selectedItem: DirectoryBrowser.DescendantItem<TFile, TFolder>) => void>;
        /** Event handlers that are called when one of the selected items is updated. This happens when the payload or metadata of the item changes. */
        onSelectedItemUpdate: Readonly<{
            add: (callback: (selectedItem: DirectoryBrowser.DescendantItem<TFile, TFolder>) => void) => DestroyFunction;
            remove: (callback: (selectedItem: DirectoryBrowser.DescendantItem<TFile, TFolder>) => void) => void;
        }>;
        protected __onPathChangeManager: CallbackManager<(currentItem: DirectoryBrowser.Item<TFile, TFolder> | null, path: string[] | null) => void>;
        /** Event handlers that are called after the path has changed. */
        onPathChange: Readonly<{
            add: (callback: (currentItem: DirectoryBrowser.Item<TFile, TFolder> | null, path: string[] | null) => void) => DestroyFunction;
            remove: (callback: (currentItem: DirectoryBrowser.Item<TFile, TFolder> | null, path: string[] | null) => void) => void;
        }>;
        protected __onCurrentItemUpdateManager: CallbackManager<(currentItem: DirectoryBrowser.Item<TFile, TFolder>) => void>;
        /** Event handlers that are called when the current item is updated. This happens when the payload or metadata of the item changes. */
        onCurrentItemUpdate: Readonly<{
            add: (callback: (currentItem: DirectoryBrowser.Item<TFile, TFolder>) => void) => DestroyFunction;
            remove: (callback: (currentItem: DirectoryBrowser.Item<TFile, TFolder>) => void) => void;
        }>;
        /**
         * Creates a new DirectoryBrowser.
         * @param __pathDisplay The component that is responsible for displaying the current path.
         * @param __browsingDisplay The component that is responsible for letting the user actually browse the directory.
         * @param __parentControl The control that uses this directory browser.
         */
        constructor(displays?: Iterable<Display>);
        /**
         * Adds a display.
         * @param display The display to add.
         */
        addDisplay(display: Display): void;
        /**
         * Removes a display. It will automatically be suspended if it was registered on this DirectoryBrowser.
         * @param display The display to remove.
         */
        removeDisplay(display: Display): void;
        /**
         * Removes all event listeners. Should be called when the owning control is detached or destroyed.
         * @param clear Set to true to remove all child elements from the path and browsing elements.
         */
        suspend(clear?: boolean): void;
        /**
         * Re-adds event listeners that were previously removed by suspend. Should be called when owning control is reattached.
         */
        resume(): void;
        /**
         * Suspends directory updates. Updates that come in after this method was called will be cached and not applied to the DOM until resumeDirectoryUpdates is called.
         */
        suspendDirectoryUpdates(): void;
        /**
         * Resumes directory updates. If an update was chached during the suspension it will be applied now.
         */
        resumeDirectoryUpdates(): void;
        /**
         * Gets the item the path points to. Returns null if the directory browser has no items.
         */
        getCurrentItem(): DirectoryBrowser.Item<TFile, TFolder> | null;
        /**
         * Gets the current folder. If the current item is a file, the parent folder of the current item is returned, otherwise the current item itself.
         * Returns null if the directory browser has no items.
         */
        getCurrentFolder(): DirectoryBrowser.FolderLikeItem<TFile, TFolder> | null;
        /**
         * Gets the current path as an array of strings. Returns null if the directory browser has no items.
         */
        getPath(): string[] | null;
        /**
         * Gets the path of the current folder. If the current item is a file, the path of the parent folder is returned, otherwise the path of the current item itself.
         * Returns null if the directory browser has no items.
         */
        getFolderPath(): string[] | null;
        /**
         * Gets the selected item.
         */
        getSelectedItems(): DirectoryBrowser.DescendantItem<TFile, TFolder>[] | null;
        /**
         * Tries to set the path. Returns false if the path was invalid or the action was canceled.
         * If the DirectoryBrowser does not yet have a directory, the path will be set as soon as a directory is set.
         * @param value The new path.
         */
        setPath(value: string[]): Promise<boolean>;
        /**
         * Tries to select an item. If the current folder does not have an item with the given name, false is returned.
         * If the DirectoryBrowser does not yet have a directory, the item will be selected as soon as a directory is set.
         * @param name The name of the item to select
         */
        selectItem(name: string, expandSelection: boolean): Promise<boolean>;
        /**
         * Deselects a selected item. Returns false if no item with the given name was selected or the action was canceled.
         * @param name The name of the item to deselect.
         */
        deselectItem(name: string): Promise<boolean>;
        /**
         * Clears the selected items. Returns false if the action was canceled.
         */
        clearSelection(): Promise<boolean>;
        /**
         * Adds a fake file to the directory.
         * @param path The path and name of the file.
         * @param payload The content of the file.
         */
        fakeFile(path: string[], payload: TFile, metadata?: Dictionary<any>): void;
        /**
         * Removes the faked file from the directory.
         */
        clearFakedFile(): void;
        /**
         * Returns whether the directory contains a faked file.
         */
        hasFakedFile(): boolean;
        /**
         * Sets whether it should be allowed to navigate to files.
         * @param value Whether it should be allowed to navigate to files.
         */
        setNavigationToFilesAllowed(value: boolean): void;
        /**
         * Gets whether it should be allowed to navigate to files.
         */
        getNavigationToFilesAllowed(): boolean;
        /**
         * Sets whether it should be allowed to select multiple items.
         * @param value Whether it should be allowed to select multiple items.
         */
        setMultiSelectAllowed(value: boolean): void;
        /**
         * Gets whether it should be allowed to select multiple items.
         */
        getMultiSelectAllowed(): boolean;
        /**
         * Callback for the beforePathChange event of the data model. Triggers onBeforePathChange.
         */
        protected __onBeforePathChange: (newCurrentItem: DirectoryBrowser.Item<TFile, TFolder>, path: string[], cancelable: boolean) => Promise<boolean>;
        /**
         * Callback for the beforeSelectionChange event of the data model. Triggers onBeforeSelectionChange.
         */
        protected __onBeforeSelectionChange: (newSelectedItems: DirectoryBrowser.DescendantItem<TFile, TFolder>[], cancelable: boolean) => Promise<boolean>;
        /**
         * Callback for the selectionChange event of the data model. Triggers onSelectionChange.
         */
        protected __onSelectionChange: (newSelectedItems: DirectoryBrowser.DescendantItem<TFile, TFolder>[]) => void;
        /**
         * Callback for the selectedItemUpdate event of the data model. Triggers onSelectedItemUpdate.
         */
        protected __onSelectedItemUpdate: (selectedItem: DirectoryBrowser.DescendantItem<TFile, TFolder>) => void;
        /**
         * Callback for the pathChange event of the data model. Triggers onPathChange.
         */
        protected __onPathChange: (currentItem: DirectoryBrowser.Item<TFile, TFolder>, path: string[]) => void;
        /**
         * Callback for the currentItemChange event of the data model. Triggers onCurrentItemChange.
         */
        protected __onCurrentItemChange: (currentItem: DirectoryBrowser.Item<TFile, TFolder>) => void;
        /**
         * Sets the directory.
         * @param rootFolder The root folder object.
         * @param getChildren A function that takes a folder object and returns a map that contains the children of the folder and their names as keys.
         * @param isFile A function that determines if the given object is a file or folder.
         * @param getMetadata A function that returns metadata about the given file or folder.
         */
        setDirectory(rootFolder: TFolder | null, getChildren: (folder: TFolder) => Map<string, TFile | TFolder>, isFile: (candidate: TFile | TFolder) => boolean, getMetadata?: (item: TFile | TFolder) => Dictionary<any>): Promise<void>;
        /**
         * Updates the directory and the path and browsing elements.
         * @param directory The new directory.
         */
        protected __updateDirectory(directory: DirectoryBrowser.Root<TFile, TFolder> | null): Promise<void>;
        /**
         * Builds a directory tree from the root folder.
         * @param rootFolder The root folder object.
         * @param getChildren A function that takes a folder object and returns a map that contains the children of the folder and their names as keys.
         * @param isFile A function that determines if the given object is a file or folder.
         * @param getMetadata A function that returns metadata about the given file or folder.
         */
        protected buildDirectoryTree(rootFolder: TFolder, getChildren: (folder: TFolder) => Map<string, TFile | TFolder>, isFile: (candidate: TFile | TFolder) => candidate is TFile, getMetadata?: (item: TFile | TFolder) => Dictionary<any>): DirectoryBrowser.Root<TFile, TFolder>;
    }
    module DirectoryBrowser {
        enum ItemType {
            File = 0,
            Folder = 1,
            Root = 2
        }
        /**
         * The root of the directory tree. Fundamentally a folder but does not have a parent or a name.
         */
        interface Root<TFile, TFolder> {
            /**
             * Must be ItemType.Root to identify this object as the root folder
             */
            type: ItemType.Root;
            /**
             * The original folder object
             */
            payload: TFolder;
            /**
             * The children of this folder
             */
            children: Map<string, DescendantItem<TFile, TFolder>>;
            /**
             * Optional metadata
             */
            metadata?: Dictionary<any>;
        }
        /**
         * A folder in the directory tree. Can contain other folders and files as children and has a parent and a name.
         */
        interface Folder<TFile, TFolder> {
            /**
             * Must be ItemType.Folder to identify this object as a folder
             */
            type: ItemType.Folder;
            /**
             * The name of the folder
             */
            name: string;
            /**
             * The original folder object
             */
            payload: TFolder;
            /**
             * The parent of this folder
             */
            parent: FolderLikeItem<TFile, TFolder>;
            /**
             * The children of this folder
             */
            children: Map<string, DescendantItem<TFile, TFolder>>;
            /**
             * Optional metadata
             */
            metadata?: Dictionary<any>;
        }
        /**
         * A file in the directory tree. Has no children, but a parent and a name.
         */
        interface File<TFile, TFolder> {
            /**
             * Must be ItemType.File to identify this object as a file
             */
            type: ItemType.File;
            /**
             * The name of the file
             */
            name: string;
            /**
             * The original file object
             */
            payload: TFile;
            /**
             * The parent of this file
             */
            parent: FolderLikeItem<TFile, TFolder>;
            /**
             * Optional metadata
             */
            metadata?: Dictionary<any>;
        }
        type Item<TFile, TFolder> = Root<TFile, TFolder> | Folder<TFile, TFolder> | File<TFile, TFolder>;
        type FolderLikeItem<TFile, TFolder> = Root<TFile, TFolder> | Folder<TFile, TFolder>;
        type DescendantItem<TFile, TFolder> = Folder<TFile, TFolder> | File<TFile, TFolder>;
        /**
         * The data model for a directory and the current path and selected item.
         */
        class Directory<TFile, TFolder> {
            private __root;
            private __path;
            private __currentItem;
            private __selectedItemNames;
            private __navigationToFilesAllowed;
            private __multiSelectAllowed;
            private __onBeforePathChangeManager;
            /** Event handlers that are called before the path is changed. If the cancelable parameter is true, returning false from one of the handlers will cancel the path change. */
            onBeforePathChange: Readonly<{
                add: (callback: (newCurrentItem: Item<TFile, TFolder>, newPath: string[], cancelable: boolean) => Promise<boolean>) => DestroyFunction;
                remove: (callback: (newCurrentItem: Item<TFile, TFolder>, newPath: string[], cancelable: boolean) => Promise<boolean>) => void;
            }>;
            private __onBeforeSelectionChangeManager;
            /** Event handlers that are called before the selection is changed. If the cancelable parameter is true, returning false from one of the handlers will cancel the selection change. */
            onBeforeSelectionChange: Readonly<{
                add: (callback: (newSelectedItems: DescendantItem<TFile, TFolder>[], cancelable: boolean) => Promise<boolean>) => DestroyFunction;
                remove: (callback: (newSelectedItems: DescendantItem<TFile, TFolder>[], cancelable: boolean) => Promise<boolean>) => void;
            }>;
            private __onSelectionChangeManager;
            /** Event handlers that are called after the selection has changed. */
            onSelectionChange: Readonly<{
                add: (callback: (selectedItems: DescendantItem<TFile, TFolder>[]) => void) => DestroyFunction;
                remove: (callback: (selectedItems: DescendantItem<TFile, TFolder>[]) => void) => void;
            }>;
            private __onSelectedItemUpdateManager;
            /** Event handlers that are called when one of the selected items is updated. This happens when the payload or metadata of the item changes. */
            onSelectedItemUpdate: Readonly<{
                add: (callback: (selectedItem: DescendantItem<TFile, TFolder> | null) => void) => DestroyFunction;
                remove: (callback: (selectedItem: DescendantItem<TFile, TFolder> | null) => void) => void;
            }>;
            private __onPathChangeManager;
            /** Event handlers that are called after the path has changed. */
            onPathChange: Readonly<{
                add: (callback: (currentItem: Item<TFile, TFolder>, path: string[]) => void) => DestroyFunction;
                remove: (callback: (currentItem: Item<TFile, TFolder>, path: string[]) => void) => void;
            }>;
            private __onCurrentItemUpdateManager;
            /** Event handlers that are called when the current item is updated. This happens when the payload or metadata of the item changes. */
            onCurrentItemUpdate: Readonly<{
                add: (callback: (currentItem: Item<TFile, TFolder>) => void) => DestroyFunction;
                remove: (callback: (currentItem: Item<TFile, TFolder>) => void) => void;
            }>;
            private __onDirectoryUpdateManager;
            /** Event handlers that are called after the directory was updated. */
            onDirectoryUpdate: Readonly<{
                add: (callback: (root: Root<TFile, TFolder>) => void) => DestroyFunction;
                remove: (callback: (root: Root<TFile, TFolder>) => void) => void;
            }>;
            /**
             * Creates a new data model.
             * @param __root The root of the folder structure
             */
            constructor(__root: Root<TFile, TFolder>);
            /**
             * Gets the root of the folder structure
             */
            get root(): Root<TFile, TFolder>;
            /**
             * Sets a new root, validates the current path and updates the selection. Returns a false if the current path is no longer valid with the new root. In that case the path will be truncated to a valid value.
             * @param value The new root
             */
            setRootAndValidate(value: Root<TFile, TFolder>): Promise<boolean>;
            /**
             * Gets the current path.
             */
            get path(): string[];
            /**
             * Gets an array of Item objects describing the path.
             */
            get decoratedPath(): (Root<TFile, TFolder> | Folder<TFile, TFolder> | File<TFile, TFolder>)[];
            /**
             * Sets a new path, validates it and clears the selection. Returns false if the new path is invalid and could not be applied or if the action was canceled.
             * @param value The new path
             */
            setPathAndValidate(value: string[], cancelable?: boolean): Promise<boolean>;
            /**
             * Pushes a new name onto the path, validates it and clears the selection. Returns false if the path with the pushed name is invalid and could not be applied or if the action was canceled.
             * @param name The new name to push
             */
            pushPath(name: string, cancelable?: boolean): Promise<boolean>;
            /**
             * Pops the last name from the path. Returns the popped name or null if the path was already empty.
             */
            popPath(cancelable?: boolean): Promise<string | false | null>;
            /**
             * Gets current the folder or file. This is the item the path points to.
             */
            get currentItem(): Item<TFile, TFolder>;
            /**
             * Gets the current folder. If the current item is a file its parent is returned, otherwise the current item itself.
             */
            get currentFolder(): FolderLikeItem<TFile, TFolder>;
            /**
             * Gets the selected item names.
             */
            get selectedItemNames(): Set<string>;
            /**
             * Gets the selected items.
             */
            get selectedItems(): DescendantItem<TFile, TFolder>[];
            /**
             * Selects the child of the current item with the given name. Returns false if no child with the given name exists or the action was canceled.
             * @param name The name of the item  to select.
             * @param expandSelection Controls whether the newly selected element should be added to the already existing selection or replace it.
             * @param cancelable Controls whether this action should be cancelable by returning false in one of the beforeSelectionChange event handlers.
             */
            selectItem(name: string, expandSelection: boolean, cancelable?: boolean): Promise<boolean>;
            /**
             * Deselects the item with the given name. Returns false if the action was canceled.
             * @param name The name of the item to deselect.
             * @param cancelable Controls whether this action should be cancelable by returning false in one of the beforeSelectionChange event handlers.
             */
            deselectItem(name: string, cancelable?: boolean): Promise<boolean>;
            /**
             * Clears the selected elements. Returns false if the action was canceled.
             * @param cancelable Controls whether this action should be cancelable by returning false in one of the beforeSelectionChange event handlers.
             */
            clearSelection(cancelable?: boolean): Promise<boolean>;
            /**
             * Controls whether naviagtion to files is allowed.
             */
            set navigationToFilesAllowed(value: boolean);
            /**
             * Controls whether naviagtion to files is allowed.
             */
            get navigationToFilesAllowed(): boolean;
            /**
             * Controls whether multiselection is allowed.
             */
            set multiSelectAllowed(value: boolean);
            /**
             * Controls whether multiselection is allowed.
             */
            get multiSelectAllowed(): boolean;
            /**
             * Checks if the given root contains a file or folder reachable by the given path and returns an object indicating the validity of the path, containing a valid path and the item the (valid) path leads to.
             * @param root The root item.
             * @param path The path to validate.
             */
            private __validatePath;
            /**
             * Checks if the given items are equivalent. Two items are considered equivalent if they have the same type, name, payload and metadata.
             * Parent and children are ignored because we don't want to compare the whole tree.
             * @param a The first item to compare.
             * @param b The second item to compare.
             */
            private __itemsEquivalent;
        }
    }
}
//# sourceMappingURL=TcHmiDirectoryBrowser.d.ts.map