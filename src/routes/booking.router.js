import { Router } from "express";

import {
    getBookingById,
    createBooking,
    addServiceToBooking,
    getAllBookings,
     updateBooking,
    deleteBooking
} from '../controllers/bookings.controller.js';

import {
    createBookingSchema,
    addServiceToBookingSchema
} from "../validations/booking.validations.js";

import { validate } from "../middlewares/validate.js";

const router = Router();

router.get('/:bid', getBookingById);

router.get('/', getAllBookings);

router.put('/:bid', updateBooking);

router.delete('/:bid', deleteBooking);

router.post(
    '/',
    validate(createBookingSchema),
    createBooking
);

router.post(
    '/:bid/services/:sid',
    validate(addServiceToBookingSchema, "params"),
    addServiceToBooking
);

export default router;