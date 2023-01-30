import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketService.getAllTickets();

    return res.status(httpStatus.OK).send(result);
  } catch {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const result = await ticketService.getTicketId(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function postTicket(req: AuthenticatedRequest, res: Response) {
  const id: number = req.body.ticketTypeId;

  try {
    const result = await ticketService.postOneTicket(id, req.userId);

    res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (err.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export { getAllTicketsTypes, getTickets, postTicket };
