export type User = { id: number; name: string };
export const users: User[] = [
{ id: 10, name: 'Cliente 1' },
{ id: 11, name: 'Cliente 2' },
{ id: 12, name: 'Cliente 3' },
];
export function userExists(userId: number) {
return users.some((u) => u.id === userId);
}