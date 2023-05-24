declare module TcHmi.Functions.Beckhoff {
    /**
     * Inserts the value at the array index position.
     * @param ctx Context object which provides context specific data and functions.
     * @param arraySymbol
     * @param arrayIndex
     * @param value
     */
    function SetElementByIndex(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, arraySymbol: TcHmi.Symbol<any[]> | null, arrayIndex: number | null, value: any): void;
}
//# sourceMappingURL=SetElementByIndex.d.ts.map