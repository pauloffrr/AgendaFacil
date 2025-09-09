import { Service } from '../models/service';


let _seq = 1;
const services: Service[] = [];


export const ServiceRepo = {
list(filter?: Partial<Pick<Service, 'companyId' | 'active'>>) {
if (!filter) return services;
return services.filter(s => {
if (filter.companyId != null && s.companyId !== filter.companyId) return false;
if (filter.active != null && s.active !== filter.active) return false;
return true;
});
},


get(id: number) {
return services.find(s => s.id === id) || null;
},


create(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) {
const now = new Date();
const obj: Service = { id: _seq++, createdAt: now, updatedAt: now, ...data };
services.push(obj);
return obj;
},


update(id: number, patch: Partial<Omit<Service, 'id' | 'createdAt'>>) {
const s = services.find(s => s.id === id);
if (!s) return null;
Object.assign(s, patch, { updatedAt: new Date() });
return s;
},


remove(id: number) {
const idx = services.findIndex(s => s.id === id);
if (idx === -1) return false;
services.splice(idx, 1);
return true;
}
};