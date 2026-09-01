export class BookingService {

    constructor(repository, serviceService) {
    this.repository = repository;
    this.serviceService = serviceService;
    }

 
    async createBooking(data) {
    const {clientName, clientEmail, date, time, status, services} = data;

    return this.repository.create({clientName, clientEmail, date, time, status, services});
    }

async getBookingById(id) {
    const booking = await this.repository.getById(id, { populate: true });

    if (!booking) {
        const error = new Error("Reserva no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return booking;
}

    async addServiceToBooking(bookingId, serviceId) {

        const booking = await this.repository.getById(bookingId);

        if (!booking) {
           const error = new Error("Reserva no encontrada");
           error.statusCode = 404;
           throw error; 
        }

        const service = await this.serviceService.getServiceById(serviceId);

          if (!service) {
           const error = new Error("Servicio no encontrado");
           error.statusCode = 404;
           throw error; 
        }

        if (!booking.services) {
            booking.services = [];
        }

        const serviceExists = booking.services.find(
            item => item.service.toString() === serviceId
        );

        if (serviceExists) {
            serviceExists.quantity += 1;
        } else {
            booking.services.push({
                service: serviceId,
                quantity: 1
            });
        }

        return this.repository.update(
           bookingId,
           { services: booking.services }
        );
    }

    async getAllBookings() {
          const bookings = await this.repository.getAll();
        if (!bookings || bookings.length === 0) {
           const error = new Error("No se encontro reservas");
           error.statusCode = 404;
           throw error; 
        }
       
        return bookings;
    }
}
