import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getAllTickets() {
  const result = await ticketRepository.findMany();
  return result;
}

async function getTicketId(userId: number) {
  const ticket = await ticketRepository.findManyId(userId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  return ticket;
}

async function postOneTicket(id: number, userId: number) {
  const result = await enrollmentRepository.findUserId(userId);
  if (!result) {
    throw notFoundError();
  }

  if (!id || !userId) {
    throw { name: "BadRequestError" };
  }

  const newTicket = await ticketRepository.postNewTicket(result.id, id);
  return newTicket;
}

const ticketService = { getAllTickets, getTicketId, postOneTicket };

export default ticketService;
