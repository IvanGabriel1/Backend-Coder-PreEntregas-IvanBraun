import { BookingModel } from "../../models/booking.model.js";

export class BookingsMongoDao { 
    async getAll() {
        return BookingModel.find().lean();
    }

 async getById(id, { populate = false } = {}) {
    const query = BookingModel.findById(id);

    if (populate) {
        query.populate("services.service");
    }

    return query.lean();
}

    async create(data) {
        return BookingModel.create(data);
    }

    async update(id, data) {
        return BookingModel.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true});
    }

};

