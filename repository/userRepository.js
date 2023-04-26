const UserModel = require("../models/User");
const BaseRepository = require("./repository");
const bcrypt = require('bcrypt');


class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }
    async findOneByEmail(email){
       const user =  await UserModel.findOne({email});
       return user;
    }
    async create(entity){
        this.register(entity);
     }

async register(entity){
        try {
            const {email, password} = entity;
            const userExists = await this.findOneByEmail(email);
            if(userExists){
                throw new Error("User already exists with this email");
            }
            const hashedPassword = bcrypt.hashSync(password,10);
            entity.password = hashedPassword;
            const user = UserModel(entity);
            await user.save();
            return user;
        } catch (err) {
            console.error(err);
        }
     }
}


module.exports = UserRepository;
