import { BookingRepository } from "../repositories/bookings.repository.js";

//Service: contiene la lógica de negocio, realiza las validaciones y coordina las operaciones antes de utilizar el Repository.
export class BookingService {

    constructor(repository, serviceService) {
    this.repository = repository;
    this.serviceService = serviceService;
}

    async  validateBooking(bookingData) {
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
    
    async createBooking(data) {
          if( 
        !data ||
        typeof data !== 'object' ||
        Array.isArray(data)  
       ) {
         throw new Error('Debe enviar un objeto valido');
       }

    await this.validateBooking(data);

    return this.repository.create(data);
    }

    async getBookingById(id) {
        const booking = await this.repository.getById(id);
        if (!booking) {
            throw new Error("Reserva no encontrada");
        }
        return booking;
    }

    async addServiceToBooking(bookingId, serviceId) {


        const booking = await this.repository.getById(bookingId);



        if (!booking) {
            throw new Error("Reserva no encontrada");
        }




        const service = await this.serviceService.getServiceById(serviceId);



        if (!service) {
            throw new Error("Servicio no encontrado");
        }




        if (!booking.services) {
            booking.services = [];
        }




        const serviceExists = booking.services.find(
            service =>
                service.service === Number(serviceId)
        );



        if (serviceExists) {

            serviceExists.quantity += 1;

        } else {


            booking.services.push({

                service: Number(serviceId),
                quantity: 1

            });

        }




        return this.repository.update(
            bookingId,
            booking
        );

    }

}
