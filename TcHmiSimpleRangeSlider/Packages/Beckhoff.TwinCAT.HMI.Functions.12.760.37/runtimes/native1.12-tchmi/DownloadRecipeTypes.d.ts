declare module TcHmi.Functions.Beckhoff {
    /**
     * Downloads all recipes of a server.
     * This needs to be triggered by a user interaction (not on load or symbol change).
     * @param ctx An object holding functions for success and error.
     */
    function DownloadRecipeTypes(ctx: SelectableRequired<TcHmi.Context<void>, 'success' | 'error'>, filter: string[] | null, referencedRecipeTypes?: boolean): void;
}
//# sourceMappingURL=DownloadRecipeTypes.d.ts.map