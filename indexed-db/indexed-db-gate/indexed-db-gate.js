class IndexedDBGate {
    constructor(dbName, objectStoreName) {
        this.dbName = dbName;
        this.objectStoreName = objectStoreName;
        this.init();
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(void 0);
                console.log('数据库开启成功');
            };
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.objectStoreName)) {
                    db.createObjectStore(this.objectStoreName);
                }
                console.log('数据库需要升级', this.db);
            };
            request.onerror = ev => {
                reject(ev);
                console.log(ev, '数据库开启失败');
            };
        });
    }

    _activeTransition = null
    async _transaction (
        mode,
        callback
    ) {
        if (
            this._activeTransition && this._activeTransition.mode === 'readonly'
            && 
            mode === 'readwrite'
        ) {
            this._activeTransition.abort()
            throw new Error(
                '[indexed-db-gate] 事务权限有误 - 当前事务为只读权限，但请求的操作需要读写权限'
            )
        }
        if (
            !this._activeTransition
        ) {
            this._activeTransition = this.db.transaction(this.objectStoreName, mode)
            ;[
                'abort',
                'error',
                'complete'
            ].forEach(key => {
                this._activeTransition.addEventListener(
                    key,
                    () => {
                        this._activeTransition = null
                    }
                )
            })
        }
        const objectStore = this._activeTransition.objectStore(this.objectStoreName)
        const request = await callback({
            objectStore
        })

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        })
    }

    setItem(key, value) {
        return this._transaction(
            'readwrite',
            ({ objectStore }) => {
                return objectStore.put(value, key)
            }
        )
    }

    getItem(key) {
        return this._transaction(
            'readonly',
            ({ objectStore }) => {
                return objectStore.get(key)
            }
        )
    }

    removeItem(key) {
        return this._transaction(
            'readwrite',
            ({ objectStore }) => {
                return objectStore.delete(key)
            }
        )
    }

    clear() {
        return this._transaction(
            'readwrite',
            ({ objectStore }) => {
                return objectStore.clear()
            }
        )
    }

    getItemList() {
        return this._transaction(
            'readwrite',
            ({ objectStore }) => {
                return objectStore.getAll()
            }
        )
    }

    updateItem(key, mutatorFn) {
        return this._transaction(
            'readwrite',
            ({ objectStore }) => {
                return this.getItem(key).then((result) => {
                    const updatePayload = {
                        ref: result
                    }
                    mutatorFn(updatePayload)
                    return objectStore.put(updatePayload.ref, key)
                })
            }
        )
    }
}