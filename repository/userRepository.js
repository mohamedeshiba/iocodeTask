const UserModel = require("../models/User");
const BaseRepository = require("./repository");

class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }
    async findByEmail(email) {
        const user = await this.model.findOne({ email });
        return user ? user.toObject() : null;
    }
}

module.exports = UserRepository;
