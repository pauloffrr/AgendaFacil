import { Appointment } from '../models/appointment';

let _seqAppt = 4; // 3 seeds criados abaixo

const _appts: Appointment[] = [
  {
    id: 1,
    serviceId: 1,
    companyId: 1,
    userId: 10,
    startTime: new Date('2025-09-10T13:00:00-03:00'),
    endTime: new Date('2025-09-10T14:30:00-03:00'),
    status: 'CONFIRMED',
    notes: 'Cliente prefere período da tarde',
  },
  {
    id: 2,
    serviceId: 2,
    companyId: 1,
    userId: 11,
    startTime: new Date('2025-09-11T09:00:00-03:00'),
    endTime: new Date('2025-09-11T10:00:00-03:00'),
    status: 'PENDING',
  },
  {
    id: 3,
    serviceId: 3,
    companyId: 2,
    userId: 12,
    startTime: new Date('2025-09-12T08:00:00-03:00'),
    endTime: new Date('2025-09-12T10:00:00-03:00'),
    status: 'PENDING',
  },
];

export const AppointmentRepo = {
  list(filter?: Partial<Pick<Appointment, 'userId' | 'companyId' | 'serviceId' | 'status'>>) {
    if (!filter) return _appts;
    return _appts.filter((a) => {
      if (filter.userId != null && a.userId !== filter.userId) return false;
      if (filter.companyId != null && a.companyId !== filter.companyId) return false;
      if (filter.serviceId != null && a.serviceId !== filter.serviceId) return false;
      if (filter.status != null && a.status !== filter.status) return false;
      return true;
    });
  },
  get(id: number) {
    return _appts.find((a) => a.id === id) || null;
  },
  create(data: Omit<Appointment, 'id' | 'status'>) {
    const obj: Appointment = { id: _seqAppt++, status: 'PENDING', ...data };
    _appts.push(obj);
    return obj;
  },
  update(id: number, patch: Partial<Appointment>) {
    const a = _appts.find((x) => x.id === id);
    if (!a) return null;
    Object.assign(a, patch);
    return a;
  },
  remove(id: number) {
    const i = _appts.findIndex((x) => x.id === id);
    if (i === -1) return false;
    _appts.splice(i, 1);
    return true;
  },
};