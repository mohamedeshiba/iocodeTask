const PostModel = require("../models/Post");
const BaseRepository = require("./repository");

class PostRepository extends BaseRepository {
    constructor() {
        super(PostModel);
    }
    async findByAuthor(author) {
        const post = await this.model.findOne({ author });
        return post ? post.toObject() : null;
    }
}

module.exports = PostRepository;