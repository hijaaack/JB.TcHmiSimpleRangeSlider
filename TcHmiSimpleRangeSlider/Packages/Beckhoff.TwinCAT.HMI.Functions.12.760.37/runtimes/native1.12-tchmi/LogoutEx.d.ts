declare module TcHmi.Functions.Beckhoff {
    /**
     * Logout server session. Will cause hmi to reload if reload parameter is not set to false.
     * @param ctx Context object which provides context specific data and functions.
     * @param reload
     */
    function LogoutEx(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, reload?: boolean): void;
}
//# sourceMappingURL=LogoutEx.d.ts.map