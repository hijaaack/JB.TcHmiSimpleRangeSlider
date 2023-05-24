declare module TcHmi.Functions.Beckhoff {
    /**
     * Decrement a binding value.
     * @param ctx Context object which provides context specific data and functions.
     * @param symbol
     * @param minValue
     * @param stepWidth
     */
    function Decrement(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, symbol: TcHmi.Symbol | null, minValue?: number | null, stepWidth?: number | null): void;
}
//# sourceMappingURL=Decrement.d.ts.map