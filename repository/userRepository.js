const UserModel = require("../models/User");
const BaseRepository = require("./repository");

class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }
    async findOneByEmail(email){
       const user =  await UserModel.findOne({email});
       return user;
    }
}

module.exports = UserRepository;
