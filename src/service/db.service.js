import httpErrors from 'http-errors'

export class DBQuery {
    constructor(model) {
        this.model = model
    }

    #defaultUpdateOptions = {
        new: true,
        runValidators: true
    }

    #handleNotFound(data) {
        if (!data) {
            throw httpErrors(404, `${this.model.modelName} not found`)
        }
        return data
    }

    async getAll() {
        return await this.model.find({})
    }

    async getById(id, select) {
        const doc = select ? await this.model.findById(id).select(select) : await this.model.findById(id)
        return this.#handleNotFound(doc)
    }

    async create(data) {
        return await this.model.create(data)
    }

    async update(id, data) {
        const doc = await this.model.findByIdAndUpdate(id, data, this.#defaultUpdateOptions)
        return this.#handleNotFound(doc)
    }

    async delete(id) {
        const doc = await this.model.findByIdAndDelete(id)
        return this.#handleNotFound(doc)
    }

    //   this.model.find(query, null, options).select(select).skip(skip).limit(Number(limit)),
    async find(query, limit = 12, page = 1, select, options = {}) {
        const skip = (page - 1) * limit
        const [result, count] = await Promise.all([
            this.model.find(query, null, options).select(select).populate(options.populate).sort(options.sort).skip(skip).limit(Number(limit)),
            this.model.countDocuments(query)
        ])

        return {
            pages: Math.ceil(count / limit),
            total: count,
            data: result
        }
    }

    async simpleFind(query, select, options = {}, isLean) {
        if (isLean) {
            return await this.model.find(query, null, options).select(select).populate(options.populate).sort(options.sort).lean()
        } else {
            return await this.model.find(query, null, options).select(select).populate(options.populate).sort(options.sort)
        }
    }

    async findOne(query, select) {
        const doc = select ? await this.model.findOne(query).select(select) : await this.model.findOne(query)
        return doc
    }

    async findDuplicate(query, message) {
        const doc = await this.model.findOne(query)
        if (doc) {
            throw httpErrors(409, `${message} already exists.`)
        }
        return null
    }

    async deleteMany(query) {
        return await this.model.deleteMany(query)
    }

    async updateMany(query, data) {
        return await this.model.updateMany(query, data)
    }

    async aggregate(pipeline) {
        return await this.model.aggregate(pipeline)
    }

    async countDocuments(query) {
        return await this.model.countDocuments(query)
    }

    async findOneAndUpsert(query, data) {
        return await this.model.findOneAndUpdate(query, data, { ...this.#defaultUpdateOptions, upsert: true })
    }

    async findOneAndUpdate(query, update, options) {
        const data = await this.model.findOneAndUpdate(query, update, options)

        if (data) {
            return true
        }
        throw httpErrors(404, `${this.model.modelName} not found`)
    }

    async findOneAndDelete(query) {
        let data = await this.model.findOneAndDelete(query)

        if (data) {
            return true
        }
        throw httpErrors(404, `${this.model.modelName} not found`)
    }

    async findByIdAndUpdate(id, data, options) {
        return await this.model.findByIdAndUpdate(id, data, options)
    }

    async findByIdAndDelete(id) {
        return await this.model.findByIdAndDelete(id)
    }

    async findById(id, select) {
        let data = select ? await this.model.findById(id).select(select) : await this.model.findById(id)
        if (data) {
            return data
        }
        throw httpErrors(404, `${this.model.modelName} not found`)
    }

    async replaceOne(query, data) {
        return await this.model.replaceOne(query, data)
    }

    async findOneAndUpdateMany(query, update) {
        return await this.model.findOneAndUpdateMany(query, update)
    }

    async findOneAndDeleteMany(query) {
        return await this.model.findOneAndDeleteMany(query)
    }

    async findOneAndUpdateOne(query, update) {
        return await this.model.findOneAndUpdateOne(query, update)
    }

    async findOneAndReplace(query, replacement) {
        return await this.model.findOneAndReplace(query, replacement)
    }

    async findOneAndDeleteOne(query) {
        return await this.model.findOneAndDeleteOne(query)
    }

    async findOneAndCreate(query, data) {
        return await this.model.findOneAndUpdate(query, data, {
            upsert: true,
            new: true
        })
    }

    async findOneAndUpdateAndCreate(query, update) {
        return await this.model.findOneAndUpdate(query, update, {
            upsert: true,
            new: true
        })
    }

    async findOneAndReplaceAndCreate(query, replacement, data) {
        return await this.model.findOneAndReplace(query, replacement, data, {
            upsert: true,
            new: true
        })
    }

    async findOneAndDeleteAndCreate(query, data) {
        return await this.model.findOneAndDelete(query, data, {
            upsert: true,
            new: true
        })
    }

    async findOneAndUpdateAndDelete(query, update) {
        return await this.model.findOneAndUpdate(query, update, {
            upsert: true,
            new: true,
            runValidators: true
        })
    }

    async findOneAndUpdateAndReplace(query, replacement, update) {
        return await this.model.findOneAndUpdate(query, replacement, update, {
            upsert: true,
            new: true
        })
    }
}

