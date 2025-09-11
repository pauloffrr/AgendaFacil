// ──────────────────────────────────────────────
// src/repositories/service.repo.ts (mock em memória + 3 seeds)
// ──────────────────────────────────────────────
import { Service } from '../models/service';

let _seqService = 4; // já temos 3 seeds
const now = new Date();

const _services: Service[] = [
  {
    id: 1,
    companyId: 1,
    title: 'Instalação de Ar-Condicionado',
    description: 'Split até 12k BTUs',
    priceCents: 25000,
    durationMinutes: 90,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    companyId: 1,
    title: 'Manutenção Preventiva',
    description: 'Verificação geral e limpeza',
    priceCents: 15000,
    durationMinutes: 60,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    companyId: 2,
    title: 'Instalação Elétrica Residencial',
    description: 'Até 5 pontos',
    priceCents: 32000,
    durationMinutes: 120,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const ServiceRepo = {
  list(filter?: Partial<Pick<Service, 'companyId' | 'active'>>) {
    if (!filter) return _services;
    return _services.filter((s) => {
      if (filter.companyId != null && s.companyId !== filter.companyId) return false;
      if (filter.active != null && s.active !== filter.active) return false;
      return true;
    });
  },
  get(id: number) {
    return _services.find((s) => s.id === id) || null;
  },
  create(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) {
    const obj: Service = { id: _seqService++, createdAt: new Date(), updatedAt: new Date(), ...data };
    _services.push(obj);
    return obj;
  },
  update(id: number, patch: Partial<Omit<Service, 'id' | 'createdAt'>>) {
    const s = _services.find((x) => x.id === id);
    if (!s) return null;
    Object.assign(s, patch, { updatedAt: new Date() });
    return s;
  },
  remove(id: number) {
    const i = _services.findIndex((x) => x.id === id);
    if (i === -1) return false;
    _services.splice(i, 1);
    return true;
  },
};