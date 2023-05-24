declare module TcHmi.Functions.Beckhoff {
    /**
     * Sets the application locale. The function waits for loading of the language files.
     * @param ctx Context object which provides context specific data and functions.
     * @param locale
     */
    function SetLocaleEx(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, locale: string): void;
}
//# sourceMappingURL=SetLocaleEx.d.ts.map