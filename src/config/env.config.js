import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: Number(process.env.PORT) || 8080,
    appName: process.env.APP_NAME || "Sistema Backend de Turnos y Reservas",
    appEnv: process.env.NODE_ENV || "development",
    mongoUri: process.env.MONGO_URI
};

if(!config.port) {
    console.error('Falta definir el puerto en las variables de entorno.')
    process.exit(1);   
}

if (!config.mongoUri) {
 throw new Error('Falta configurar MONGO_URI en las variables de entorno');
 }

// export default config;