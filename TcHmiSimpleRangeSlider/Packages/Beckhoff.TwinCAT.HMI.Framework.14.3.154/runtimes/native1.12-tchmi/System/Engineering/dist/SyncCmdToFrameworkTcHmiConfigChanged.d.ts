import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import type { SyncCmdTcHmiConfigChanged } from './SyncCmd.js';
export declare class SyncCmdToFrameworkTcHmiConfigChanged extends SyncCmdToFramework {
    constructor(cmd: SyncCmdTcHmiConfigChanged);
    protected __cmd: SyncCmdTcHmiConfigChanged;
    private __refreshBaseConfig;
    private __loadViewPartial;
    private __loadViewPartialCallback;
    private __refreshViewPartials;
    private __refreshContentPartials;
    private __loadUserControlPartial;
    private __loadUserControlPartialCallback;
    private __refreshUserControlPartials;
    private __refreshSymbolsInternal;
    private __refreshSymbolsTimer;
    private __refreshSymbols;
    private __refreshPackages;
    private __refreshUserFunctions;
    /**
     * Add new JavaScript files to the document.head based on dependencyFiles in tchmiconfig.json.
     **/
    private __refreshDependencyFiles;
    private __refreshLanguageFallback;
    private __refreshLanguage;
    private __refreshSystemKeyboard;
    private __refreshIntervals;
    private __doReloadTcHmiConfig;
    private __doRefreshTcHmiConfig;
    private __doReloadUserControlConfig;
    private __doRefreshUserControlConfig;
    private __doReloadLocalizationFile;
    private __doRefreshLocalizationFile;
    private __doRefreshThemeFile;
    run(): void;
}
//# sourceMappingURL=SyncCmdToFrameworkTcHmiConfigChanged.d.ts.map