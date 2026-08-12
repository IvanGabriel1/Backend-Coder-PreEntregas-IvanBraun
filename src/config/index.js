import { ServiceRepository } from "../repositories/services.repository.js";
import { ServicesService } from "../services/services.service.js";

import { BookingRepository } from "../repositories/bookings.repository.js";
import { BookingService } from "../services/bookings.service.js";

import { ServicesMongoDao } from "../dao/mongo/services.mongo.dao.js";
import { BookingsMongoDao} from "../dao/mongo/bookings.mongo.dao.js";

const bookingDao = new BookingsMongoDao();
const bookingRepository = new BookingRepository(bookingDao);

const serviceDao = new ServicesMongoDao();
const serviceRepository = new ServiceRepository(serviceDao);

export const serviceService = new ServicesService(serviceRepository, bookingRepository);
export const bookingService = new BookingService(bookingRepository, serviceService);

