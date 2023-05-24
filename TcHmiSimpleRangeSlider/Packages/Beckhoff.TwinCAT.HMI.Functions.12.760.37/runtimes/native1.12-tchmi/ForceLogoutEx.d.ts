declare module TcHmi.Functions.Beckhoff {
    /**
     * Logout a different user or all from a TcHmiServer
     * @param ctx Context object which provides context specific data and functions.
     * @param username
     */
    function ForceLogoutEx(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, username: string | null | undefined): boolean;
}
//# sourceMappingURL=ForceLogoutEx.d.ts.map