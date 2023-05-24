declare module TcHmi.Functions.Beckhoff {
    /**
     * Increment a binding value.
     * @param ctx Context object which provides context specific data and functions.
     * @param symbol
     * @param maxValue
     * @param stepWidth
     */
    function Increment(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, symbol: TcHmi.Symbol<number> | null, maxValue?: number | null, stepWidth?: number | null): void;
}
//# sourceMappingURL=Increment.d.ts.map