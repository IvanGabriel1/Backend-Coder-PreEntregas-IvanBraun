import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
 {
 clientName: {
 type: String,
 required: true,
 trim: true
 },
 clientEmail: {
 type: String,
 required: true,
 trim: true
 },
 date: {
 type: Date, 
 required: true,
 trim: true
 },
 time: {
 type: String,
 required: true,
 trim: true
 },
 status: {
 type: String,
 required: true,
 trim: true
 }, 
 services: [
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'service'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }
 ]
 },
 {
 timestamps: true,
 versionKey: false
 }
 );
 
export const BookingModel = mongoose.model('bookings', bookingSchema);
