import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketService.getAllTickets();
    return res.status(httpStatus.OK).send(result);
  } catch {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const result = await ticketService.getTicketId(userId);
    res.status(httpStatus.OK).send(result);
  } catch {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export { getAllTicketsTypes, getTickets };
