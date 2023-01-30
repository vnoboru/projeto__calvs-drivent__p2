import { AuthenticatedRequest } from "@/middlewares";
import { Payment } from "@/protocols";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus, { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from "http-status";

async function postPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body as Payment;
  const userId = req.userId;
  try {
    const payment = await paymentService.createPayment(body, userId);

    res.status(httpStatus.OK).send(payment);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    if (err.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    res.sendStatus(500);
  }
}

async function getPayment(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const ticketId = req.query.ticketId;

  try {
    const payment = await paymentService.getPayment(userId, Number(ticketId));

    res.status(httpStatus.OK).send(payment);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(NOT_FOUND);
    }

    if (err.name === "UnauthorizedError") {
      return res.sendStatus(UNAUTHORIZED);
    }

    if (err.name === "BadRequestError") {
      return res.sendStatus(BAD_REQUEST);
    }

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export { postPayment, getPayment };
