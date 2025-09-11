import { Request, Response } from 'express';
import { appointmentCreateSchema, appointmentUpdateSchema } from '../validators/appointment.schema';
import { ok, bad, notFound } from '../utils/http';
import { ServiceRepo } from '../repositores/service.repo';
import { userExists } from '../mocks/users';
import { AppointmentRepo } from '../repositores/appointment.repo';

export const AppointmentsController = {
  list(req: Request, res: Response) {
    const { userId, companyId, serviceId, status } = req.query;
    const filter: any = {};
    if (userId != null) filter.userId = Number(userId);
    if (companyId != null) filter.companyId = Number(companyId);
    if (serviceId != null) filter.serviceId = Number(serviceId);
    if (status != null) filter.status = String(status);

    const list = AppointmentRepo.list(Object.keys(filter).length ? filter : undefined);
    return ok(res, list);
  },

  get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const found = AppointmentRepo.get(id);
    if (!found) return notFound(res, 'Agendamento não encontrado');
    return ok(res, found);
  },

  create(req: Request, res: Response) {
    try {
      const data = appointmentCreateSchema.parse(req.body);

      // validações de existência
      const svc = ServiceRepo.get(data.serviceId);
      if (!svc) return bad(res, 'Serviço não existe');
      if (svc.companyId !== data.companyId) return bad(res, 'Serviço não pertence à empresa informada');
      if (!userExists(data.userId)) return bad(res, 'Usuário (cliente) não existe');

      // validação de horário
      if (data.startTime >= data.endTime) return bad(res, 'startTime deve ser antes de endTime');

      const created = AppointmentRepo.create({
        serviceId: data.serviceId,
        companyId: data.companyId,
        userId: data.userId,
        startTime: data.startTime,
        endTime: data.endTime,
        notes: data.notes ?? null,
      });
      if (data.status) created.status = data.status;

      return ok(res, created, 201);
    } catch (err: any) {
      return bad(res, err?.message || 'Dados inválidos');
    }
  },

  update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const patch = appointmentUpdateSchema.parse(req.body);

      if (patch.serviceId != null) {
        const svc = ServiceRepo.get(patch.serviceId);
        if (!svc) return bad(res, 'Serviço não existe');
        if (patch.companyId != null && svc.companyId !== patch.companyId)
          return bad(res, 'Serviço não pertence à empresa informada');
      }
      if (patch.userId != null && !userExists(patch.userId))
        return bad(res, 'Usuário (cliente) não existe');

      if (patch.startTime && patch.endTime && patch.startTime >= patch.endTime)
        return bad(res, 'startTime deve ser antes de endTime');

      const updated = AppointmentRepo.update(id, patch as any);
      if (!updated) return notFound(res, 'Agendamento não encontrado');
      return ok(res, updated);
    } catch (err: any) {
      return bad(res, err?.message || 'Dados inválidos');
    }
  },

  remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const okRemove = AppointmentRepo.remove(id);
    if (!okRemove) return notFound(res, 'Agendamento não encontrado');
    return res.status(204).send();
  },
};
