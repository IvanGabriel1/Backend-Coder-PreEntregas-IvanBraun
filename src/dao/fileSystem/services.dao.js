
import fs from "node:fs/promises";
import crypto from "node:crypto";

export class ServiceDao {
       constructor(filePath) {
            this.filePath = filePath;
        }
    
         async readServices() {
           try {
             return JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
           } catch (error) {
               return [];
           } 
         }

       async writeServices(services) {
        try {
            await fs.writeFile(
            this.filePath,
            JSON.stringify(services, null, 2));
        } catch (error) {
            throw new Error("Error al escribir en el archivo de servicios");
        }
       }

        async create(data) {
         const services = await this.readServices();

        const maxId = services.length
        ? Math.max(...services.map(service => service.id))
        : 0;
    
        const newId = maxId + 1;
    
        const newService = {
          id: newId,
          ...data
        };

         services.push(newService);

         await this.writeServices(services);

         return newService;
         }

        async getAll() {
            return this.readServices();
        }
    

        async getById(id) {
            const services = await this.readServices();
            return services.find(service => service.id === Number(id));
        }

        async delete(id) {

        const services = await this.readServices();

        const deleteService = services.find(service => service.id === Number(id));

        const updatedServices = services.filter(
         service => service.id !== Number(id)
        );

         await this.writeServices(updatedServices);

         return deleteService;
        }


         async update(id, data) {

        const services = await this.readServices();

        const index = services.findIndex(
            service => service.id === Number(id)
         );

       if (index === -1) {
         return null;
      }

         services[index] = {
              ...services[index],
             ...data,
               id: Number(id)
           };

     await this.writeServices(services);

    return services[index];
        }
         

}