import services from "../data/services.json" with { type: "json" };

class ServiceManager {

    constructor() {
        this.services = services;
    }

    getServices() {
        return this.services;
    }

    getElementById(id) {
        const service = this.services.find(service => service.id === id);
        if ( !service) {
            throw new Error("Servicio no encontrado");
        }
        
        return service;
    }

    addService(service) {

        const maxId = Math.max(...this.services.map(service => service.id));
        const newId = maxId + 1;

        const newService = {
            id: newId,
            ...service
        };


       if (
        !newService.name ||
        !newService.description ||
        newService.price === undefined ||
        !newService.category ||
        newService.duration === undefined ||
        newService.available === undefined)
              {
            throw new Error("Todos los campos son obligatorios");
            }

        this.services.push(newService);
        return newService;
    }

    updateService(id, updatedService) {

            if (
        !updatedService.name ||
        !updatedService.description ||
        updatedService.price === undefined ||
        !updatedService.category ||
        updatedService.duration === undefined ||
        updatedService.available === undefined)
              {
            throw new Error("Todos los campos son obligatorios");
            }

        const serviceIndex = this.services.findIndex(service => service.id === id); 

        const service = this.services[serviceIndex];

        if (serviceIndex === -1) {
            throw new Error(`Servicio con id ${id} no encontrado`);
        }

        this.services[serviceIndex] = {
            ...service,
            ...updatedService,
            id: service.id
        };

        return this.services[serviceIndex];

    }

    deleteService(id) { 
        const serviceIndex = this.services.findIndex(service => service.id === id);
        if (serviceIndex === -1) {
            throw new Error(`Servicio con id ${id} no encontrado`);
        }

        return this.services.splice(serviceIndex, 1)[0];
    }
}

export default ServiceManager;