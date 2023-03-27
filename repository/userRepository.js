const UserModel = require("../models/User");
const BaseRepository = require("./repository");

class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }
}

module.exports = UserRepository;
