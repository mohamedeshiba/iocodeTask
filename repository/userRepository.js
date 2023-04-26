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
    async create(entity){
        this.register(entity);
     }

async register(entity){
        try {
            const {password} = entity;
            const hashedPassword = bcrypt.hashSync(password,10);
            entity.password = hashedPassword;
            const user = UserModel(entity);
            await user.save();
            res.status(201).send("New user registered Successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Database error " + err);
        }
     }

    
}

module.exports = UserRepository;
