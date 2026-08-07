import path from "node:path";
import { fileURLToPath } from "node:url";

import { ServiceDao } from "../dao/fileSystem/services.dao.js";
import { ServiceRepository } from "../repositories/services.repository.js";
import { ServicesService } from "../services/services.service.js";
import { BookingDao } from "../dao/fileSystem/bookings.dao.js";
import { BookingRepository } from "../repositories/bookings.repository.js";
import { BookingService } from "../services/bookings.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(__dirname, "..", "data", "services.json");
const bookingsPath = path.join(__dirname, "..", "data", "bookings.json");

const bookingDao = new BookingDao(bookingsPath);
const bookingRepository = new BookingRepository(bookingDao);

const serviceDao = new ServiceDao(servicesPath);
const serviceRepository = new ServiceRepository(serviceDao);

export const serviceService = new ServicesService(serviceRepository, bookingRepository);
export const bookingService = new BookingService(bookingRepository, serviceService);