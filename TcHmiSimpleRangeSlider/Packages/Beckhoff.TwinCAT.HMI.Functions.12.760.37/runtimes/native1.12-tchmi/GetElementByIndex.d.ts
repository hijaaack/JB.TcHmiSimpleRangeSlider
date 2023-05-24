declare module TcHmi.Functions.Beckhoff {
    /**
     * Return the value at the array index position.
     * @param ctx Context object which provides context specific data and functions.
     * @param arraySymbol
     * @param arrayIndex
     */
    function GetElementByIndex(ctx: SelectableRequired<TcHmi.FunctionExpressionContext, 'success' | 'error'>, arraySymbol: TcHmi.Symbol | null, arrayIndex: number | null): void;
}
//# sourceMappingURL=GetElementByIndex.d.ts.map