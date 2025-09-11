import { z } from 'zod';


export const appointmentCreateSchema = z.object({
serviceId: z.number().int().positive(),
companyId: z.number().int().positive(),
userId: z.number().int().positive(),
startTime: z.coerce.date(),
endTime: z.coerce.date(),
status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']).optional(),
notes: z.string().optional().nullable(),
});

export const appointmentUpdateSchema = appointmentCreateSchema.partial();