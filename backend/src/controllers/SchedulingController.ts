import { Request, Response } from "express";
import Scheduling from "../models/SchedulingModel";

export const createScheduling = async (req: Request, res: Response) => {
  try {
    const { customerId, professionalId, profession, date, startTime } = req.body;

    const endTime = calculateEndTime(startTime, 2);

    const scheduling = await Scheduling.create({
      customerId,
      professionalId,
      profession,
      date,
      startTime,
      endTime,
      status: "CONFIRMED"
    });

    res.status(201).json(scheduling);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: "Erro ao criar agendamento" });
  }
};

export const getScheduling = async (req: Request, res: Response) => {
  try {
    const appointments = await Scheduling.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar appointments" });
  }
};

export const updateScheduling = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const scheduling = await Scheduling.findByPk(id);
    if (!scheduling) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    await scheduling.update(data);
    res.json(scheduling);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar agendamento" });
  }
};

export const deleteScheduling = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const scheduling = await Scheduling.findByPk(id);
    if (!scheduling) return res.status(404).json({ error: "Agendamento não encontrado" });

    await scheduling.destroy();
    res.json({ message: "Agendamento deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar agendamento" });
  }
};

// Função auxiliar: calcular hora fim adicionando X horas
function calculateEndTime(startTime: string, durationHours: number): string {
  const [hour, minutes] = startTime.split(":").map(Number);

  const date = new Date();

  date.setHours(hour, minutes);
  date.setHours(date.getHours() + durationHours);
  
  return date.toTimeString().substring(0, 5);
}