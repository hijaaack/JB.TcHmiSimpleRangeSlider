declare let request: IDBOpenDBRequest | null;
declare let db: IDBDatabase | null;
declare let cacheInterval: number;
declare let cache: {
    timespan: number;
    type: string;
    message: string;
    optionalParameters: any[];
}[];
declare let cacheInProcess: boolean;
declare let maxEntries: number;
declare function onCacheTick(): void;
declare function processCache(): void;
declare function run(options: {
    maxEntries?: number;
    cacheInterval?: number;
}): void;
declare function add(entry: {
    timespan: number;
    type: string;
    message: string;
    optionalParameters: any[];
}): void;
//# sourceMappingURL=Log.IndexedDB.d.ts.map