import { ServiceModel } from "../../models/services.model.js";

export class ServicesMongoDao { 

    async getAll({
    filter = {},
    page = 1,
    limit = 10,
    sortBy,
    order
} = {}) {

    const skip = (page - 1) * limit;

    let query = ServiceModel.find(filter);

    if (sortBy) {
        query = query.sort({
            [sortBy]: order === "desc" ? -1 : 1
        });
    }

    const services = await query
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await ServiceModel.countDocuments(filter);

    const totalPages = Math.ceil(total / limit);

    return {
        services,
        total,
        page,
        limit,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages
    };
}

    async getById(id) {
        return ServiceModel.findById(id);
    }

    async create(data) {
        return ServiceModel.create(data);
    }

    async update(id, data) {
        return ServiceModel.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true});
    }

    async delete(id) {
        return ServiceModel.findByIdAndDelete(id);
    }
};