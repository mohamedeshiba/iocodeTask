
class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(entity) {
        const newEntity = new this.model(entity);
        await newEntity.save();
        return newEntity.toObject();
    }

    async read(id) {
        const entity = await this.model.findById(id);
        return entity ? entity.toObject() : null;
    }

    async update(id, entity) {
        await this.model.findByIdAndUpdate(id, entity);
    }

    async delete(id) {
        await this.model.findByIdAndDelete(id);
    }
    async findAll(){
        const entity = await this.model.find({});
        return entity;
    }
}

module.exports = BaseRepository;