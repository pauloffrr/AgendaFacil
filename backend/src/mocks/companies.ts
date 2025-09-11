export type Company = { id: number; name: string };
export const companies: Company[] = [
{ id: 1, name: 'Empresa A' },
{ id: 2, name: 'Empresa B' },
{ id: 3, name: 'Empresa C' },
];
export function companyExists(companyId: number) {
return companies.some((c) => c.id === companyId);
}