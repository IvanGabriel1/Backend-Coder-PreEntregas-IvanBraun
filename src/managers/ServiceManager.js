import fs from "node:fs/promises";

class ServiceManager {
    
     constructor(filePath) {
        this.filePath = filePath;
    }

    async readServices() {
      try {
        const data = await fs.readFile(this.filePath, 'utf-8');
          return JSON.parse(data);
      } catch (error) {
          return [];
      } 
    }

    async writeServices(services) {
       await fs.writeFile(this.filePath,
        JSON.stringify(services, null, 2)
    );
   }

    validateService(serviceData, services, id = null) {
        
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

            const exists = services.find(
            service => service.name === name && service.id !== Number(id)
         );

        if (exists) {
            throw new Error("Ya existe un servicio con ese nombre");
        }
    }

   async getServices(category, available) {
        let services = await this.readServices();

        if(category) {
            services = services.filter(
                service => service.category.toLocaleLowerCase() === category.toLocaleLowerCase()
            );
        }

        if (available) {
            services = services.filter(
                service => service.available === (available === "true")
            );
        }

        return services;
    }

  async getServiceById(id) {
    const services = await this.readServices();

    const service = services.find( service => service.id === Number(id));

    if (!service) { return null };

    return service;
    };

   async addService(service) {

       if (!service || typeof service !== "object" || Array.isArray(service)) {
           throw new Error("Debe enviar un objeto válido");
       }

    
    if (service.id !== undefined) {
        throw new Error("No debe enviar el id del servicio");
    }
    
    const services = await this.readServices();

    const maxId = services.length
    ? Math.max(...services.map(service => service.id))
    : 0;
    
    const newId = maxId + 1;
    
    const newService = {
        id: newId,
        ...service
    };
    
        this.validateService(newService, services);

        services.push(newService);

        await this.writeServices(services);

        return  newService;
    }

   async updateService(id, updatedService) {

    const services = await this.readServices();

        if (!updatedService || typeof updatedService !== "object" || Array.isArray(updatedService)) {
           throw new Error("Debe enviar un objeto válido");
        }
        
        const serviceIndex = services.findIndex(service => service.id === Number(id)); 
        
        if (serviceIndex === -1) {
            throw new Error(`Servicio con id ${id} no encontrado`);
        }
    
        const serviceToUpdate = {
            ...services[serviceIndex],
            ...updatedService,
            id: Number(id),
        }

        this.validateService(serviceToUpdate, services, id); 

        services[serviceIndex] = serviceToUpdate;

        await this.writeServices(services);

        return services[serviceIndex];

    }

   async deleteService(id) { 
        const services = await this.readServices();

        const serviceIndex = services.findIndex(service => service.id === Number(id));

        if (serviceIndex === -1) {
            throw new Error(`Servicio con id ${id} no encontrado`);
        }

        const [deletedService] = services.splice(serviceIndex, 1);

        await this.writeServices(services)

        return deletedService;
    }
}

export default ServiceManager;