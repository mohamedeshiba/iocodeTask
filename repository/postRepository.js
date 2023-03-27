const PostModel = require("../models/Post");
const BaseRepository = require("./repository");

class PostRepository extends BaseRepository {
    constructor() {
        super(PostModel);
    }
}

module.exports = PostRepository;