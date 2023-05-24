declare module TcHmi.Controls.Beckhoff {
    class TcHmiFileExplorer extends TcHmi.Controls.System.TcHmiControl {
        #private;
        /**
         * Constructor Creates a new control instance.
         * @param element The element that hosts the control.
         * @param pcElement Precompiled element.
         * @param attrs The control attributes.
         */
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        protected __elementTemplateRoot: HTMLElement;
        protected __elementDirectoryTree: HTMLUListElement;
        protected __elementPathBox: HTMLDivElement;
        protected __elementBrowsingBox: HTMLUListElement;
        protected __buttons: {
            createFolder: TcHmiButton;
            download: TcHmiButton;
            upload: TcHmiButton;
            rename: TcHmiButton;
            copy: TcHmiButton;
            cut: TcHmiButton;
            paste: TcHmiButton;
            delete: TcHmiButton;
        };
        protected __destroyersToCallOnDetach: DestroyFunction[];
        protected __localizationReader: Locale.LocalizationReader | undefined;
        protected __destroyLocalizationWatch: DestroyFunction | null;
        protected __directoryBrowser: Helpers.DirectoryBrowser<TcHmiFileExplorer.DirectoryNode, TcHmiFileExplorer.DirectoryNode>;
        protected __listBrowsingDisplay: Helpers.ListBrowsingDisplay;
        protected __directory: TcHmiFileExplorer.DirectoryNode;
        protected __clipboard: {
            action: 'cut' | 'copy';
            items: TcHmiFileExplorerComponents.Path[];
        } | null;
        protected __subscriptionId: number | null;
        protected __symbolAccessSubscriptionId: number | null;
        protected __symbolAccess: {
            Upload: TcHmiFileExplorer.SymbolAccess;
            Rename: TcHmiFileExplorer.SymbolAccess;
            Copy: TcHmiFileExplorer.SymbolAccess;
            Delete: TcHmiFileExplorer.SymbolAccess;
            'TcHmiSrv.Config': TcHmiFileExplorer.SymbolAccess;
        };
        protected __fileUploader: TcHmiFileExplorerComponents.FileUploader | null;
        protected __namePrompt: Helpers.InputPrompt | null;
        protected __confirmationPrompt: Helpers.TextAndButtonsPrompt<boolean> | null;
        protected __errorPrompt: Helpers.TextAndButtonsPrompt<void> | null;
        protected __root: TcHmiFileExplorerComponents.Path<string> | undefined;
        protected __path: TcHmiFileExplorerComponents.Path<string> | undefined;
        protected __serverInterval: number | null | undefined;
        protected __showNavigationPane: boolean | undefined;
        protected __navigationPanePosition: 'Left' | 'Right' | undefined;
        protected __menuBarPosition: 'Top' | 'Bottom' | undefined;
        protected __menuBarHeight: number | undefined;
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
         * Handler for the pathChanged event of the directory browser.
         * @param currentItem The new current item.
         * @param path The new path.
         */
        protected __onPathChanged: (currentItem: TcHmiFileExplorer.DirectoryItem | null, path: string[] | null) => void;
        /**
         * Handler for the selectionChanged event of the directory browser.
         * @param selectedItems The currently selected items.
         */
        protected __onSelectionChanged: (selectedItems: TcHmiFileExplorer.DescendantItem[] | null) => void;
        /**
         * Handler for the pressed event of the create folder button.
         */
        protected __onCreateFolderPressed: () => void;
        /**
         * Handler for the pressed event of the download button.
         */
        protected __onDownloadPressed: () => void;
        /**
         * Handler for the pressed event of the upload button.
         */
        protected __onUploadPressed: () => void;
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
         * Expands the given localization key to a full symbol expression.
         * @param key The key to expand.
         */
        protected __expandLocalizationSymbol(key: string): string;
        /**
         * Updates the isEnabled states of the menu bar buttons.
         */
        protected __updateButtonsEnabled(): void;
        /**
         * Forces the buttons operate rights to Deny if the user doesn't have the necessary symbol access.
         */
        protected __updateButtonAccess(): void;
        /**
         * Creates a new InputPrompt and sets the validationPatterns and localizations.
         */
        protected __createNamePrompt(): Helpers.InputPrompt;
        /**
         * Prompt the user for a name for the new folder and create this folder on the server.
         */
        protected __createFolder(path: TcHmiFileExplorerComponents.Path): Promise<void>;
        /**
         * Downloads the specified files. Folders are skipped.
         * @param path The path that contains the files to download.
         * @param items The files that should be downloaded.
         */
        protected __downloadFiles(path: TcHmiFileExplorerComponents.Path, items: TcHmiFileExplorer.DirectoryItem[]): void;
        /**
         * Shows a file selection window and uploads the selected files.
         */
        protected __upload(): Promise<void>;
        /**
         * Shows a file selection window and returns the selected files.
         */
        protected __selectFiles(): Promise<FileList | null>;
        /**
         * Uploads the given files to the specified path.
         * @param path The path to upload to.
         * @param files The files to upload.
         * @param existingNames The names of already existing files or folders in the target location.
         */
        protected __uploadFiles(path: TcHmiFileExplorerComponents.Path, files: FileList, existingNames: Set<string>): Promise<void>;
        /**
         * Shows an error popup with the specified header and content text.
         * @param headerText The header text.
         * @param contentText The content text.
         */
        protected __showErrorPopup(headerText: Localizable, contentText: Localizable): Promise<void>;
        /**
         * Shows a popup asking the user how to resolve conflicting file names.
         * @param conflictingNames The names that conflict.
         * @param existingNames The names that already exist in the folder.
         */
        protected __resolveFileNameConflicts(conflictingNames: Iterable<string>, existingNames: Iterable<string>): Promise<{
            isOk: true;
            /**
             * Handler for the pressed event of the paste button.
             */
            value: Map<string, string>;
        } | {
            readonly isOk: false;
        }>;
        /**
         * Renames the given file in the given path.
         * @param path The path where the file to be renamed can be found.
         * @param name The name of the file to rename.
         */
        protected __rename(path: TcHmiFileExplorerComponents.Path, name: string): Promise<void>;
        /**
         * Pastes the items in the clipboard to the given path.
         * @param targetPath The path to paste into.
         * @param existingNames The names of already existing files or folders in the target location.
         */
        protected __paste(targetPath: TcHmiFileExplorerComponents.Path, existingNames: Set<string>): Promise<void>;
        /**
         * Prompt the user to confirm if they really want to delete, then delete the given items from the server.
         * @param path The path where the items to be deleted can be found.
         * @param items The names of the items to delete.
         */
        protected __delete(path: TcHmiFileExplorerComponents.Path, items: TcHmiFileExplorer.DescendantItem[]): Promise<void>;
        protected __localizeListBrowsingDisplay(): void;
        /**
         * Sets the current value of attribute Root.
         * @param valueNew The new value.
         */
        setRoot(valueNew: string | null): void;
        /**
         * Returns the current value of attribute Root.
         */
        getRoot(): string | undefined;
        /**
         * Processes the current value of attribute Root.
         */
        protected __processRoot(): void;
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
         * Returns the current value of the readonly attribute FullPath.
         */
        getFullPath(): string;
        /**
         * Returns the current value of the readonly attribute SelectedItems.
         */
        getSelectedItems(): string[];
        /**
         * Sets the current value of attribute ServerInterval.
         * @param valueNew The new value.
         */
        setServerInterval(valueNew: number | null): void;
        /**
         * Returns the current value of attribute ServerInterval.
         */
        getServerInterval(): number | null | undefined;
        /**
         * Processes the current value of attribute ServerInterval.
         */
        protected __processServerInterval(): void;
        /**
         * Sets the current value of attribute MenuBarPosition.
         * @param valueNew The new value.
         */
        setMenuBarPosition(valueNew: 'Top' | 'Bottom' | null): void;
        /**
         * Returns the current value of attribute MenuBarPosition.
         */
        getMenuBarPosition(): "Top" | "Bottom" | undefined;
        /**
         * Sets the current value of attribute MenuBarHeight.
         * @param valueNew The new value.
         */
        setMenuBarHeight(valueNew: number | null): void;
        /**
         * Returns the current value of attribute MenuBarHeight.
         */
        getMenuBarHeight(): number | undefined;
        /**
         * Returns the current value of attribute MenuBarHeightUnit.
         */
        getMenuBarHeightUnit(): string;
        /**
         * Processes the current value of attributes MenuBarPosition, MenuBarHeight, ShowNavigationPane and NavigationPanePosition.
         */
        protected __processLayout(): void;
        /**
         * Unsubscribes and, if attached, resubscribes to ListFiles with updated writeValue.
         * @param unsubscribeOnly Set to true to only unsubscribe.
         */
        protected __updateSubscription(unsubscribeOnly?: boolean): Promise<void>;
        /**
         * Creates a callback function for the ListFiles response for the given path.
         * @param path The path to list files for.
         */
        protected __getListFilesHandler(path: TcHmiFileExplorerComponents.Path): (data: Server.IResultObject<string, TcHmiFileExplorer.ServerFileList>) => void;
        /**
         * Updates the given path of the directory.
         * @param fileList The current file list for the given path.
         * @param path The path.
         */
        protected __updateDirectory(fileList: TcHmiFileExplorer.ServerFileList, path: TcHmiFileExplorerComponents.Path): void;
        protected __updateSymbolAccessSubscription(unsubscribeOnly?: boolean): void;
    }
    module TcHmiFileExplorer {
        interface ServerFile {
            fileFlags: ('Directory' | 'ReadOnly' | 'UserAccessReadOnly' | 'VirtualDirectory')[];
            fileSize?: number;
            link?: string;
            modificationTime?: string;
        }
        interface ServerFileList {
            [name: string]: ServerFile;
        }
        interface DirectoryNode extends ServerFile {
            children?: Map<string, DirectoryNode>;
        }
        interface DeleteWriteValue {
            fileName: string;
            domain?: string;
        }
        interface CopyRenameWriteValue {
            old: string;
            new: string;
            domain?: string;
            configuration?: string;
        }
        enum SymbolAccess {
            None = 0,
            Read = 1,
            Write = 2,
            ReadWrite = 3
        }
        type DirectoryItem = Helpers.DirectoryBrowser.Item<DirectoryNode, DirectoryNode>;
        type FolderLikeItem = Helpers.DirectoryBrowser.FolderLikeItem<DirectoryNode, DirectoryNode>;
        type DescendantItem = Helpers.DirectoryBrowser.DescendantItem<DirectoryNode, DirectoryNode>;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiFileExplorerComponents {
    class Path<T extends string | string[] = string | string[]> {
        private readonly __original;
        private readonly __path;
        private readonly __rootParts;
        /**
         * Creates a new path object by validation the passed in path value.
         * @param path The original path value. If applicable, '..' will be resolved.
         * A path can either be a string, using '/' as the path separator, or an array, where each array item is a path item. It path is an array, its items must not contain '/'.
         * @param root Whether to treat the whole path as a root path, meaning its parents cannot be navigated to, or, if a number, how many path items belong to the root.
         */
        constructor(path: T, root?: boolean | number);
        /**
         * Returns the original value.
         */
        get original(): T;
        /**
         * Returns the length of the path array.
         */
        get length(): number;
        /**
         * Gets an individual part of the path.
         * @param index The index of the part to get.
         */
        get(index: number): string;
        /**
         * Returns the last part of the path, i. e. the name of the file or folder the path points to. Returns undefined if the path is empty.
         */
        getName(): string;
        /**
         * Returns the path in string representation.
         */
        toString(): string;
        /**
         * Returns the path in array representation.
         */
        toArray(): string[];
        /**
         * Combines this path with the given other path and returns the result as a new path.
         * @param path The path to combine this path with.
         */
        combine(path: Path | string | string[]): Path<string[]>;
    }
}
declare module TcHmi.Controls.Beckhoff.TcHmiFileExplorerComponents {
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
declare module TcHmi.Controls.Beckhoff.TcHmiFileExplorerComponents {
    class FileUploader {
        protected __domain?: string | undefined;
        protected static __queue: FileUploader.QueuedFile[];
        protected static __current: FileUploader.QueuedFile | null;
        protected static __working: boolean;
        protected static __chunkSize: null | number;
        protected static __subscribedToChunkSize: boolean;
        protected static __chunkSizeSubscriptionError: FileUploader.ProgressResultFail | null;
        protected __queueTimeoutId: number;
        /**
         * Create a new FileUploader instance.
         * @param __domain The optional domain to upload files to.
         */
        constructor(__domain?: string | undefined);
        /**
         * Queue a file for upload. Queued files will be managed in a single queue across all instances.
         * If there is already a file with the same path in the queue, the already queued file will be canceled.
         * The returned Promise will resolve when the file upload finishes, is canceled, or encounters an error.
         * @param path The path to upload to.
         * @param file The file to upload.
         * @param progressCallback The callback function that will be called with the upload progress or any errors.
         */
        queue(path: string, file: File, progressCallback?: FileUploader.ProgressCallback): Promise<FileUploader.ProgressResult>;
        /**
         * Cancel the upload of a queued file. Uploads can only be cancelled if they have not yet started.
         * @param path The path of the file that should be cancelled.
         */
        cancel(path: string): boolean;
        /**
         * Dequeue the first item read the file and prepare it for upload. If the chunkSize is not yet reached, further files will be dequeued and also uploaded.
         */
        protected static __workQueue(): Promise<void>;
        /**
         * Reads the file data as a base64 encoded string.
         * @param file The file to read.
         * @param offset: The offset from which to start reading. Leave empty to read the whole file.
         * @param limit: How many bytes to read. Leave empty to read to the end of the file.
         */
        protected static __readFileData(file: File, offset?: number, limit?: number): Promise<string>;
        /**
         * Upload the given chunks.
         * @param chunks The chunks to upload.
         */
        protected static __upload(chunks: Map<string, {
            file: FileUploader.QueuedFile;
            data: string;
            type: Exclude<FileUploader.ChunkType, FileUploader.ChunkType.Error>;
        }>): void;
        /**
         * Subscribe to the TcHmiSrv.Config::CHUNKSIZE symbol
         */
        protected static __subscribeChunkSize(): void;
    }
    module FileUploader {
        interface QueuedFile {
            file: File;
            path: string;
            domain?: string;
            offset: number;
            status: FileStatus;
            progressCallback: ProgressCallback;
        }
        type ProgressCallback = (result: ProgressResult) => void;
        interface ProgressResultSuccess extends IResultObject {
            error: Errors.NONE;
            uploadedBytes: number;
            totalBytes: number;
            status: FileStatus;
        }
        interface ProgressResultFail extends IResultObject {
            error: Exclude<Errors, Errors.NONE>;
        }
        type ProgressResult = ProgressResultSuccess | ProgressResultFail;
        enum FileStatus {
            Pending = 0,
            Uploading = 1,
            Finished = 2,
            Canceled = 3
        }
        interface Chunk {
            file: FileUploader.QueuedFile;
            data: string;
            type: Exclude<FileUploader.ChunkType, FileUploader.ChunkType.Error>;
        }
        interface UploadWriteValue {
            domain?: string;
            fileName: string;
            data?: string;
            isDirectory?: boolean;
            checkSum?: string;
            chunkType?: Exclude<ChunkType, ChunkType.Error>;
        }
        enum ChunkType {
            Disabled = 0,
            First = 1,
            Intermediate = 2,
            Last = 3,
            Error = 4
        }
    }
}
//# sourceMappingURL=TcHmiFileExplorer.d.ts.map