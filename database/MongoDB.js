const mongoose = require("mongoose");
const DatabaseHandler = require("./DatabaseHandler");

class MongoDBHandler extends DatabaseHandler {
    constructor(uri) {
        super();
        this.uri = uri;
    }

    async connect() {
        await mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}
module.exports = MongoDBHandler;
