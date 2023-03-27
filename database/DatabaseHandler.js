class DatabaseHandler {
    async connect() {
        throw new Error("connect method not implemented");
    }

    async disconnect() {
        throw new Error("disconnect method not implemented");
    }

    async getCollection(collectionName) {
        throw new Error("getCollection method not implemented");
    }
}
module.exports = DatabaseHandler;