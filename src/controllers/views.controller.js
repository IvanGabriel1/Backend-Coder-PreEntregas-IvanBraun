import { serviceService, bookingService } from "../config/index.js";

export const getServicesView = async (req, res) => {

    const result = await serviceService.getServices();

    res.render("services", {
        services: result.payload
    });

};

export const getBookingsView = async (req, res) => {
        const bookings = await bookingService.getAllBookings();
        res.render("bookings", { bookings });
};