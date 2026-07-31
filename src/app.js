import express from 'express';
import config from './config/env.config.js';
import servicesRouter from './routes/services.router.js';
import bookingRouter from './routes/booking.router.js';

export const app = express();

app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).json({
        status: "success - Server iniciado",
        message: "API de servicios y reservas"
    });
});

app.use("/api/services", servicesRouter);

app.use("/api/bookings", bookingRouter);

app.listen(config.port, () => {
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
});
