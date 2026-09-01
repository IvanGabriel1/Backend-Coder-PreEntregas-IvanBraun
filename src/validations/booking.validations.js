import { z } from "zod";

const objectIdSchema = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "El ID debe ser un ObjectId válido"
);

export const createBookingSchema = z.object({
    clientName: z.string().min(2, "El nombre del cliente es obligatorio"),

    clientEmail: z.string().email("El email no es válido"),

    date: z.coerce.date({
        message: "La fecha no es válida"
    }),

    time: z.string().min(1, "La hora es obligatoria"),

    status: z.string().min(1, "El estado es obligatorio"),

    services: z.array(
        z.object({
            service: objectIdSchema,
            quantity: z.number().positive(
                "La cantidad debe ser mayor a cero"
            )
        })
    ).optional()
});

export const addServiceToBookingSchema = z.object({
    bid: objectIdSchema,
    sid: objectIdSchema
});