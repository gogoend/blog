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
    async setItem(key, value) {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName).put(value, key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }
    async getItem(key) {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName).get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }
    async removeItem(key) {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName).delete(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }
    async clear() {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName).clear();
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }
}