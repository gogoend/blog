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

    async _transaction (
        mode,
        callback
    ) {
        const transaction = this.db.transaction(this.objectStoreName, mode)
        const objectStore = transaction.objectStore(this.objectStoreName)
        const request = await callback({
            transaction,
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
                // TODO: 使用嵌套事务重构
                return new Promise((resolve, reject) => {
                    const request = objectStore.get(key)
                    request.onsuccess = () => {
                        const updatePayload = {
                            ref: request.result
                        }
                        mutatorFn(updatePayload)
                        resolve(objectStore.put(updatePayload.ref, key))
                    }
                    request.onerror = reject
                })
            }
        )
    }
}