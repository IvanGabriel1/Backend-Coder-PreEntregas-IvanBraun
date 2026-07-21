import http from 'http';
import config from './config/env.config.js';
import ServiceManager from "./managers/ServiceManager.js";

export const app = {
    name: 'PreEntrega_1',
    version: '1.0.0',
    status: 'initial setup',
}

const serviceManager = new ServiceManager();

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
});

server.listen(config.port, () => {
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
});
