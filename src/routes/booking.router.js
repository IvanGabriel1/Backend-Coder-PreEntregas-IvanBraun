import { Router } from "express";
import { getBookingById, createBooking, addServiceToBooking, getAllBookings } from '../controllers/bookings.controller.js';

const router = Router();

router.get('/:bid', getBookingById);

router.get('/', getAllBookings);

router.post('/', createBooking);

router.post('/:bid/services/:sid', addServiceToBooking);

export default router;