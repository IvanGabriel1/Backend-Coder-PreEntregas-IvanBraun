import http from 'http';
import config from './config/env.config.js';
import ServiceManager from "./managers/ServiceManager.js";

export const app = {
    name: 'PreEntrega_1',
    version: '1.0.0',
    status: 'initial setup',
}

const serviceManager = new ServiceManager();

 console.log("Todos los servicios:");
 console.log(serviceManager.getServices());

 console.log("Servicio con id 1:");
 console.log(serviceManager.getServiceById(1));

 const nuevoServicio = serviceManager.addService({
     name: "Masaje",
     description: "Masaje relajante",
     duration: 60,
     price: 25000,
     category: "Bienestar",
     available: true
 });

 console.log("Servicio agregado:");
 console.log(nuevoServicio);

 console.log("Lista actualizada:");
 console.log(serviceManager.getServices());

// Falta hacer la funcionalidad de agregar, actualizar y eliminar servicios a través de la API. Actualmente solo se puede obtener la lista de servicios.

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if(method === "GET" && url === "/api/services") {

        const services = serviceManager.getServices();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify({
            status: "success",
            payload: services
        }));
    }

   if(method === "GET" && url === "/") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify({
            status: "success - Server iniciado"
        }));
    }

     res.writeHead(404, {
        "Content-Type": "application/json"
    });

    return res.end(JSON.stringify({
        status: "error",
        message: "Ruta no encontrada"
    }));
});



server.listen(config.port, () => {
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
});
