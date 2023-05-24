declare module TcHmi.Functions.Beckhoff {
    /**
     * Login server session. Reload on login is recommended for security reasons.
     * @param ctx Context object which provides context specific data and functions.
     * @param username
     * @param password
     * @param persistent
     * @param reload
     */
    function LoginEx(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, username: string | null, password: string | null, persistent?: boolean, reload?: boolean): void;
}
//# sourceMappingURL=LoginEx.d.ts.map