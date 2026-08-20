import { createServer } from "node:http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { config } from "./config/env.config.js";
import { connectDB } from "./config/database.config.js";
import { serviceService } from "./config/index.js";

const startServer = async () => {
    try {

        await connectDB();

        const httpServer = createServer(app);

        const io = new Server(httpServer);

        io.on("connection", (socket) => {
            console.log("Cliente conectado");

            socket.on("change-availability", async (service) => {
                try {

                    const updatedService = await serviceService.update(
                        service._id,
                        service
                    );

                    io.emit("service-updated", updatedService);

                } catch (error) {
                    console.error("Error al actualizar disponibilidad:", error);
                }
            });

            socket.on("disconnect", () => {
                console.log("Cliente desconectado");
            });
        });

        httpServer.listen(config.port, () => {
            console.log(`Servidor escuchando en el puerto ${config.port}`);
        });

    } catch (error) {
        console.error("Error al levantar el servidor", error);
    }
    };

startServer();