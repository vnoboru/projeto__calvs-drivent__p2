import { notFoundError } from "@/errors";
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
  const ticketId = await ticketRepository.findManyTicket(result.id);
  if (!ticketId) {
    return notFoundError();
  }
  return ticketId;
}

const ticketService = { getAllTickets, getTicketId };

export default ticketService;
