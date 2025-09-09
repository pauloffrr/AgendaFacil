import { Request, Response } from 'express';
import { ServiceRepo } from '../repositores/service.repo';
import { serviceCreateSchema, serviceUpdateSchema } from '../validators/service.schema';
import { ok, bad, notFound } from '../utils/http';
import { companyExists } from '../mocks/companies';


export const ServicesController = {
list(req: Request, res: Response) {
const { companyId, active } = req.query;
const filter: any = {};
if (companyId != null) filter.companyId = Number(companyId);
if (active != null) filter.active = String(active) === 'true';
return ok(res, ServiceRepo.list(Object.keys(filter).length ? filter : undefined));
},


get(req: Request, res: Response) {
const id = Number(req.params.id);
const found = ServiceRepo.get(id);
if (!found) return notFound(res, 'Serviço não encontrado');
return ok(res, found);
},


create(req: Request, res: Response) {
try {
const data = serviceCreateSchema.parse(req.body);
if (!companyExists(data.companyId)) return bad(res, 'Empresa não existe');
const created = ServiceRepo.create({
companyId: data.companyId,
title: data.title,
description: data.description ?? null,
priceCents: data.priceCents,
durationMinutes: data.durationMinutes,
active: data.active ?? true,
});
return ok(res, created, 201);
} catch (err: any) {
return bad(res, err?.message || 'Dados inválidos');
}
},


update(req: Request, res: Response) {
try {
const id = Number(req.params.id);
const patch = serviceUpdateSchema.parse(req.body);
if (patch.companyId != null && !companyExists(patch.companyId)) return bad(res, 'Empresa não existe');
const updated = ServiceRepo.update(id, patch as any);
if (!updated) return notFound(res, 'Serviço não encontrado');
return ok(res, updated);
} catch (err: any) {
return bad(res, err?.message || 'Dados inválidos');
}
},


remove(req: Request, res: Response) {
const id = Number(req.params.id);
const okRemove = ServiceRepo.remove(id);
if (!okRemove) return notFound(res, 'Serviço não encontrado');
return res.status(204).send();
}
};