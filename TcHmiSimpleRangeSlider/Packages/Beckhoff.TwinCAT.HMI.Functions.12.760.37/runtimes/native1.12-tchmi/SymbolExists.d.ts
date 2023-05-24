declare module TcHmi.Functions.Beckhoff {
    /**
     * Checks if a specific symbol exists
     * @param ctx Context object which provides context specific data and functions.
     * @param symbol
     */
    function SymbolExists(ctx: SelectableRequired<TcHmi.Context<boolean>, 'success' | 'error'>, symbol: TcHmi.Symbol | null): void;
}
//# sourceMappingURL=SymbolExists.d.ts.map