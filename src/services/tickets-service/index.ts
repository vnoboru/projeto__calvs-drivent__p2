import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getAllTickets() {
  const result = await ticketRepository.findMany();

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function getTicketId(userId: number) {
  const result = await ticketRepository.findManyId(userId);
  if (!result) {
    return notFoundError();
  }
  const enrollment = await enrollmentRepository.findUserId(userId);
  if (!enrollment) {
    return notFoundError();
  }
  return result;
}

async function postOneTicket(id: number, userId: number) {
  const result = await enrollmentRepository.findUserId(userId);

  if (!result) {
    return notFoundError();
  }

  const newTicket = await ticketRepository.postNewTicket(result.id, id);

  return newTicket;
}

const ticketService = { getAllTickets, getTicketId, postOneTicket };

export default ticketService;
