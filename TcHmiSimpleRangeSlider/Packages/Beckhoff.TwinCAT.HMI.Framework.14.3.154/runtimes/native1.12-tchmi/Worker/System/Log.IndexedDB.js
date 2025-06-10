"use strict";
let request = null;
let db = null;
let cacheInterval = 1000;
let cache = [];
let cacheInProcess = false;
let maxEntries = 5000;
function onCacheTick() {
    processCache();
}
function processCache() {
    if (!db) {
        return;
    }
    if (cacheInProcess) {
        return;
    }
    cacheInProcess = true;
    let ta = null;
    try {
        ta = db.transaction(['data'], 'readwrite');
    }
    catch (e) {
        cacheInProcess = false;
        self.postMessage({
            event: 'error',
            args: {
                message: '[Source=Framework, Module=WebWorker.Log.IndexedDB.js] Persistent logging failed because of unexpected exception:\n',
                args: [e],
            },
        });
    }
    if (!ta) {
        return;
    }
    let os = null;
    try {
        os = ta.objectStore('data');
    }
    catch (e) {
        cacheInProcess = false;
        self.postMessage({
            event: 'error',
            args: {
                message: '[Source=Framework, Module=WebWorker.Log.IndexedDB.js] Persistent logging failed because of unexpected exception:\n',
                args: [e],
            },
        });
    }
    if (!os) {
        return;
    }
    let count = null;
    try {
        count = os.count();
    }
    catch (e) {
        self.postMessage({
            event: 'error',
            args: {
                message: '[Source=Framework, Module=WebWorker.Log.IndexedDB.js] Persistent logging failed because of unexpected exception:\n',
                args: [e],
            },
        });
        cacheInProcess = false;
    }
    if (!count) {
        return;
    }
    count.onsuccess = (e) => {
        // Copy cache locally to allow parallel usage of member variable
        let cc = cache;
        cache = [];
        let count = e.target.result;
        if (count + cc.length > maxEntries) {
            let cdel = count + cc.length - maxEntries;
            if (cdel > count) {
                // Cache is already bigger than max entries...
                // Delete all entries in db
                cdel = count;
                // Delete oldest entries from cache until cache size equals max entries
                while (cc.length > maxEntries) {
                    cc.shift();
                }
            }
            let cdone = 0;
            let cursor = null;
            try {
                cursor = os.openCursor();
            }
            catch (e) {
                cacheInProcess = false;
                self.postMessage({
                    event: 'error',
                    args: {
                        message: '[Source=Framework, Module=WebWorker.Log.IndexedDB.js] Persistent logging failed because of unexpected exception:\n',
                        args: [e],
                    },
                });
            }
            if (!cursor) {
                return;
            }
            cursor.onerror = (e) => {
                cacheInProcess = false;
                self.postMessage({
                    event: 'error',
                    args: {
                        message: '[Source=Framework, Module=WebWorker.Log.IndexedDB.js] Persistent logging failed because of unexpected exception:\n',
                        args: [e],
                    },
                });
            };
            cursor.onsuccess = (e) => {
                let cursor = e.target.result;
                if (!cursor) {
                    return;
                }
                if (cdone < cdel) {
                    cdone++;
                    cursor.delete();
                    cursor.continue();
                    return;
                }
                if (cc) {
                    while (cc.length > 0) {
                        os.add(cc.shift());
                    }
                }
                cacheInProcess = false;
            };
        }
        else {
            if (cc) {
                while (cc.length > 0) {
                    os.add(cc.shift());
                }
            }
            cacheInProcess = false;
        }
    };
}
function run(options) {
    maxEntries = options.maxEntries ?? 20000;
    cacheInterval = options.cacheInterval ?? 1000;
    if (indexedDB) {
        try {
            request = indexedDB.open('TcHmi.Log');
        }
        catch (e) {
            self.postMessage({
                event: 'error',
                args: {
                    message: '[Source=Framework, Module=WebWorker.Log.IndexedDB.js] Persistent logging failed because of unexpected exception while opening database:\n',
                    args: [e],
                },
            });
        }
        if (request) {
            request.onerror = (e) => {
                self.postMessage({
                    event: 'error',
                    args: {
                        message: '[Source=Framework, Module=WebWorker.Log.IndexedDB.js] Persistent logging failed because of request.onerror:\n',
                        args: [e],
                    },
                });
            };
            request.onsuccess = () => {
                if (!request) {
                    return;
                }
                db = request.result;
                setInterval(onCacheTick, cacheInterval);
            };
            request.onupgradeneeded = (e) => {
                // Create objectsore if no has existed before or db has an older version.
                // Create objectstore in this case. There is no need for a version upgrade till now.
                db = e.target.result;
                try {
                    db.createObjectStore('data', { keyPath: 'id', autoIncrement: true });
                    setInterval(onCacheTick, cacheInterval);
                }
                catch (e) {
                    self.postMessage({
                        event: 'error',
                        args: {
                            message: '[Source=Framework, Module=WebWorker.Log.IndexedDB.js] Persistent logging failed because of unexpected exception in request.onupgradeneeded event handler:\n',
                            args: [e],
                        },
                    });
                }
            };
        }
    }
}
function add(entry) {
    cache.push(entry);
}
self.addEventListener('message', function (messageEvent) {
    const message = messageEvent.data;
    if (!message) {
        return;
    }
    switch (message.command) {
        case 'run':
            {
                run(message.options);
            }
            break;
        case 'add':
            {
                add(message.entry);
            }
            break;
        case 'force':
            {
                processCache();
            }
            break;
    }
});
//# sourceMappingURL=Log.IndexedDB.js.map