declare module TcHmi.Functions.Beckhoff {
    /**
     * Reads the current values which are referenced from a base recipe and write it into the same recipe.
     * @param ctx Context object which provides context specific data and functions.
     * @param recipeReference
     */
    function TeachRecipe(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, recipeReference: string | null): void;
}
//# sourceMappingURL=TeachRecipe.d.ts.map