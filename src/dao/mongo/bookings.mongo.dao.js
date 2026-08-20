import { BookingModel } from "../../models/booking.model.js";

export class BookingsMongoDao { 
    async getAll() {
        return BookingModel.find().lean();
    }

    async getById(id) {
        return BookingModel.findById(id);
    }

    async create(data) {
        return BookingModel.create(data);
    }

    async update(id, data) {
        return BookingModel.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true});
    }

};