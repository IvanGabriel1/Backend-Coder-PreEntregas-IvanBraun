import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
 {
 name: {
 type: String,
 required: true,
 trim: true
 },
 description: {
 type: String,
 required: true,
 trim: true
 },
 duration: {
 type: Number,
 required: true,
 min: 1
 },
 price: {
 type: Number,
 required: true,
 min: 0
 },
 category: {
 type: String,
 required: true,
 lowercase: true,
 trim: true
 },
 available: {
 type: Boolean,
 default: true
 }
 },
 {
 timestamps: true,
 versionKey: false
 }
 );
 
export const ServiceModel = mongoose.model('service', serviceSchema);