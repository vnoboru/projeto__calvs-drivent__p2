import { notFoundError, unauthorizedError } from "@/errors";
import { Payment } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function createPayment(body: Payment, userId: number) {
  const { ticketId, cardData } = body;

  if (!body.ticketId || !body.cardData) {
    throw { name: "BadRequestError" };
  }

  const ticket = await ticketRepository.findTicketTypeAndEnrol(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const cardLastDigits = cardData.number.toString().slice(-4);

  const newBody = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits,
  };
  const payment = await paymentRepository.createPayment(newBody);
  await ticketRepository.updateTicketStatus(ticketId);
  return payment;
}

async function getPayment(userId: number, ticketId: number) {
  if (!ticketId) {
    throw { name: "BadRequestError" };
  }

  const ticket = await ticketRepository.findTicketTypeAndEnrol(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  return await paymentRepository.findPayment(ticketId);
}

const paymentService = { createPayment, getPayment };

export default paymentService;
