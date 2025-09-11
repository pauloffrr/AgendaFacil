import { Response } from 'express';
export function ok(res: Response, data: any, status = 200) { return res.status(status).json(data); }
export function bad(res: Response, message = 'Requisição inválida', status = 400) { return res.status(status).json({ error: message }); }
export function notFound(res: Response, message = 'Não encontrado') { return res.status(404).json({ error: message }); }