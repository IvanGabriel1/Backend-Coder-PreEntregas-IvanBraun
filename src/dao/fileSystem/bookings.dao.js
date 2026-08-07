import fs from "node:fs/promises";

export class BookingDao {

    constructor(filePath) {
        this.filePath = filePath;
    }

    async readBookings() {
        try {
            return JSON.parse(await fs.readFile(this.filePath, "utf-8"));
        } catch (error) {
            return [];
        }
    }

    async writeBookings(bookings) {
        try {
            await fs.writeFile(
                this.filePath,
                JSON.stringify(bookings, null, 2)
            );
        } catch (error) {
            throw new Error("Error al escribir en el archivo de reservas");
        }
    }

    async getAll() {
        return this.readBookings();
    }

    async getById(id) {

        const bookings = await this.readBookings();

        return bookings.find(
            booking => booking.id === Number(id)
        );
    }


    async create(data) {

        const bookings = await this.readBookings();

        const maxId = bookings.length
            ? Math.max(...bookings.map(booking => booking.id))
            : 0;

        const newBooking = {
            id: maxId + 1,
            ...data
        };

        bookings.push(newBooking);

        await this.writeBookings(bookings);

        return newBooking;
    }


    async update(id, data) {

        const bookings = await this.readBookings();

        const bookingIndex = bookings.findIndex(
            booking => booking.id === Number(id)
        );

        if (bookingIndex === -1) {
            return null;
        }


        bookings[bookingIndex] = data;


        await this.writeBookings(bookings);

        return bookings[bookingIndex];
    }

}