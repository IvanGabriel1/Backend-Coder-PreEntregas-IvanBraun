import { z } from "zod";

export const createServiceSchema = z.object({
    name: z.string().min(2, "El nombre es obligatorio"),

    description: z.string().min(5, "La descripcion es obligatoria"),

    duration: z.number().positive("La duracion debe ser mayor a cero"),

    price: z.number().min(0, "El precio no puede ser negativo"),

    category: z.string().min(2, "La categoria es obligatoria"),

    available: z.boolean().optional()
});

export const updateServiceSchema = createServiceSchema.partial();