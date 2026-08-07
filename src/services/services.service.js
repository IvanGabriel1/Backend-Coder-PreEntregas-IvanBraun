import {ServiceRepository} from "../repositories/services.repository.js";
import {BookingRepository} from "../repositories/bookings.repository.js";

//Service: contiene la lógica de negocio, realiza las validaciones y coordina las operaciones antes de utilizar el Repository.
export class ServicesService {
    constructor(repository, bookingRepository) {
        this.repository = repository;
        this.bookingRepository = bookingRepository;
    }

    async validateService(serviceData, id = null) {
        
        const { name, description, price, category, duration, available } = serviceData;

        if (!name) {
            throw new Error("El nombre del servicio es obligatorio");
        }

        if (!description) {
            throw new Error("La descripción del servicio es obligatoria");
        }

        if (price === undefined) {  
            throw new Error("El precio del servicio es obligatorio");
        }

        if(category === undefined) {
            throw new Error("La categoría del servicio es obligatoria");
        }

        if( duration === undefined) {
            throw new Error("La duración del servicio es obligatoria");
        }

        if(available === undefined) {
            throw new Error("La disponibilidad del servicio es obligatoria");
        }

        if (typeof name !== "string" || typeof description !== "string" || typeof category !== "string") {
            throw new Error("Los campos name, description y category deben ser de tipo string");
        }

        if (typeof price !== "number" || typeof duration !== "number") {
            throw new Error("Los campos price y duration deben ser de tipo number");
        }

        if (typeof available !== "boolean") {
            throw new Error("El campo available debe ser de tipo boolean");
        }

        if (price <= 0) {
            throw new Error("El precio del servicio debe ser mayor a 0");
        }

        if (name.trim().length > 75 || name.trim().length < 3) {
            throw new Error("El nombre del servicio debe tener entre 3 y 75 caracteres");
        }

         if (description.trim().length > 150 || description.trim().length < 10) {
            throw new Error("La descripción del servicio debe tener entre 10 y 150 caracteres");
        }

         if (category.trim().length > 50 || category.trim().length < 1) {
            throw new Error("La categoría del servicio debe tener entre 1 y 50 caracteres");
        }

        if (duration < 10 || duration > 180) {
            throw new Error("La duración del servicio debe estar entre 10 y 180 minutos");
        }

        if (!Number.isFinite(price)) {
             throw new Error("El precio debe ser un número válido");
         }

        const services = await this.repository.getAll();

        const exists = services.find(service => service.name.toLowerCase() === name.toLowerCase() && service.id !== Number(id) );

        if (exists) {
            throw new Error("Ya existe un servicio con ese nombre");
        }
    }

    async createService(data) {
    const {name, duration, price, category, available} = data;

     await this.validateService(data);

     return this.repository.create({ name, duration, price, category, available });
    }

    async getServiceById(id) {
        const service = await this.repository.getById(id);
        if (!service) {
            throw new Error("Servicio no encontrado");
        }
        return service;
    }
    
   async deleteService(id) {

    const service = await this.repository.getById(id);

    if (!service) {
        throw new Error("Servicio no encontrado");
    }
    
    
    const bookings = await this.bookingRepository.getAll(id);

    const bookingUsingService = bookings.find(booking =>
        booking.status !== "cancelada" &&
        booking.services.some(
            s => s.service === Number(id)
        )
    );


    if (bookingUsingService) {
        throw new Error(
            "No se puede eliminar el servicio porque está asociado a una reserva activa"
        );
    }


    return this.repository.delete(id);
   }

    async getServices(category, available) {

    let services = await this.repository.getAll();

    if (!services || services.length === 0) {
        throw new Error("No hay servicios disponibles");
    }

    if (category) {
        services = services.filter(
            service =>
                service.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (available !== undefined) {
        services = services.filter(
            service =>
                service.available === (available === "true")
        );
    }

    return services;
   }

    async updateService(id, data) { 

        const service = await this.repository.getById(id);

        if (!service) {
            throw new Error(`Servicio con id ${id} no encontrado`);
        }

        const serviceToUpdate = {
            ...service,
            ...data,
            id: Number(id)
        };

        await this.validateService(serviceToUpdate);

        return this.repository.update(id, serviceToUpdate);

    }
}