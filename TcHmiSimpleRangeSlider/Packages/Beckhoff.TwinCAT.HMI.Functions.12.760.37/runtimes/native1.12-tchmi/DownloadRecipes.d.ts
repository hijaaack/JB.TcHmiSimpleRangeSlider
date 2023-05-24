declare module TcHmi.Functions.Beckhoff {
    /**
     * Downloads a recipe. Downloads all recipes when recipeName is the empty string.
     * This needs to be triggered by a user interaction (not on load or symbol change).
     * @param ctx An object holding functions for success and error.
     * @param filter Reference (path + '::' + name) of the recipe. If this is the empty string this downloads all recipes.
     */
    function DownloadRecipes(ctx: SelectableRequired<TcHmi.Context<void>, 'success' | 'error'>, filter: string[] | null, referencedRecipeTypes?: boolean): void;
}
//# sourceMappingURL=DownloadRecipes.d.ts.map