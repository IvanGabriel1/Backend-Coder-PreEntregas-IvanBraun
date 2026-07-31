import fs from "node:fs/promises";
import { serviceManager } from "./index.js";

class BookingManager {

    constructor(filePath) {
        this.filePath = filePath;
    }

    async readBookings() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
              return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async writeBookings(bookings) {
        await fs.writeFile(this.filePath,
            JSON.stringify(bookings, null, 2)
        );
    }

    validateBooking(bookingData) {
        const {clientName, clientEmail, date, time, status, services} = bookingData;

        if(!clientName) {
            throw new Error("El nombre del cliente es obligatorio");
        }

         if(!clientEmail) {
            throw new Error("El correo electronico del cliente es obligatorio");
        }

         if(date === undefined) {
            throw new Error("La fecha de la reserva es obligatoria");
        }

        if (date.trim().length === 0) {
            throw new Error("La fecha es obligatoria");
        }

         if(time === undefined) {
            throw new Error("La hora del turno es obligatorio");
        }

         if(status === undefined) {
            throw new Error("El status no puede ser undefined");
        }

        if (typeof clientName !== "string") {
            throw new Error("El nombre debe ser un string");
        }

        if (typeof clientEmail !== "string") {
            throw new Error("El correo debe ser un string");
        }

        if (!clientEmail.includes("@")) {
            throw new Error("Correo electrónico inválido");
        }

        if (typeof status !== "string") {
             throw new Error("El campo status debe ser de tipo string");
        }

        if (status.trim().length === 0) {
             throw new Error("El estado es obligatorio");
        }

        if (typeof date !== "string") {
             throw new Error("La fecha debe ser un string");
        }

        if (typeof time !== "string") {
             throw new Error("La hora debe ser un string");
        }

        if (!Array.isArray(services)) {
             throw new Error("El campo services debe ser un array");
        }

        if (clientName.trim().length < 2) {
            throw new Error("El nombre del cliente debe tener como minimo 2 digitos");
        }
        
        if (clientEmail.trim().length < 6) {
            throw new Error("El correo electronico del cliente debe tener como minimo 6 digitos");

        }

    }

    async createBooking(bookingData) {

        const { clientName, clientEmail, date, time, status } = bookingData;

        const bookings = await this.readBookings();
        const maxId = bookings.length 
        ? Math.max(...bookings.map(booking => booking.id))
        : 0;

        const newId = maxId + 1;

        const newBooking = {
             id: newId,
             clientName,
             clientEmail,
             date,
             time,
             status,
             services: []
        };

        this.validateBooking(newBooking);

        bookings.push(newBooking);

        await this.writeBookings(bookings);

        return newBooking;
    }

    async getBookingById(id) {
        const bookings = await this.readBookings();

        const booking = bookings.find(booking => booking.id === Number(id));

        if (!booking) return null;

        return booking;
    }

    async addServiceToBooking(bookingId, serviceId) {

        const bookings = await this.readBookings();

        const booking = bookings.find(
          booking => booking.id === Number(bookingId));

        if (!booking) {
          throw new Error("Reserva no encontrada");
        }
          
        const service = await serviceManager.getServiceById(serviceId);

        if (!service) {
            throw new Error("Servicio no encontrado");
        }

        const bookingService = booking.services.find(
            service => service.service === Number(serviceId));
        
        if (!bookingService) {
            booking.services.push({
                service: Number(serviceId),
                quantity: 1,
            })
        } else {
            bookingService.quantity++;
        }

        await this.writeBookings(bookings);

        return booking;
    }
}

export default BookingManager;