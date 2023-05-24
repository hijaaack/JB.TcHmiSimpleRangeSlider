declare module TcHmi.Functions.Beckhoff {
    /**
     * Uploads one or more recipe files (each containing one or all recipes or recipe types of a server).
     * @param ctx An object holding functions for success and error.
     * @param recipeReference Name of the recipe (could be prefixed with a path if separated with:: )
     */
    function UploadRecipeFiles(ctx: SelectableRequired<TcHmi.Context<void>, 'success' | 'error'>): void;
}
//# sourceMappingURL=UploadRecipeFiles.d.ts.map