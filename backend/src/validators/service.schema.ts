import { z } from 'zod';


export const serviceCreateSchema = z.object({
companyId: z.number().int().positive(),
title: z.string().min(2),
description: z.string().optional().nullable(),
priceCents: z.number().int().nonnegative(),
durationMinutes: z.number().int().positive(),
active: z.boolean().optional().default(true)
});


export const serviceUpdateSchema = serviceCreateSchema.partial();


export type ServiceCreateDTO = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdateDTO = z.infer<typeof serviceUpdateSchema>;