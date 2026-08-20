import express from 'express';
import { engine } from 'express-handlebars';
import servicesRouter from './routes/services.router.js';
import bookingRouter from './routes/booking.router.js';
import viewsRouter from './routes/views.router.js';

export const app = express();

app.use(express.json());
app.use(express.static("./src/public"));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use('/views', viewsRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success - Server iniciado",
        message: "API de servicios y reservas"
    });
});

app.use("/api/services", servicesRouter);

app.use("/api/bookings", bookingRouter);


