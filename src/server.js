import { app } from "./app.js";
import { config } from "./config/env.config.js";
import { connectDB } from "./config/database.config.js";

const startServer = async () => {
    try {

        await connectDB();
        
        app.listen(config.port, () => {
            console.log(`Servidor escuchando en el puerto ${config.port}`);
        });
    } catch(error) {
        console.error("Error al levantar el servidor")
    }
};

startServer();