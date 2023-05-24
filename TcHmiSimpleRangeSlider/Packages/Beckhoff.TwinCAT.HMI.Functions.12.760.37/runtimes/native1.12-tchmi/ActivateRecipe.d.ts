declare module TcHmi.Functions.Beckhoff {
    /**
     * Activates a recipe (writes all values)
     * @param ctx Context object which provides context specific data and functions.
     * @param recipeReference Name of the recipe (could be prefixed with a path if separated with:: )
     */
    function ActivateRecipe(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, recipeReference: string | null): void;
}
//# sourceMappingURL=ActivateRecipe.d.ts.map