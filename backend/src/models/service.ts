export interface Service {
id: number;
companyId: number;
title: string;
description?: string | null;
priceCents: number;
durationMinutes: number;
active: boolean;
createdAt: Date;
updatedAt: Date;
}