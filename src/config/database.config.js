//Este archivo será responsable de conectarse a MongoDB usando Mongoose.
import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectDB = async () => {
    try {
     await mongoose.connect(config.mongoUri);
     console.log("Conexion a mongoDB exitosa");
    } catch (error) {
     console.error("Error al conectar con mongoDB: ", error.message);
     process.exit(1);
    }
};