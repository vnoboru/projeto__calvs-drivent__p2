import { prisma } from "@/config";

function findMany() {
  return prisma.ticketType.findMany();
}

function findManyId(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: { userId },
    },
    include: {
      TicketType: true,
    },
  });
}

async function postNewTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: "RESERVED",
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketTypeAndEnrol(id: number) {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      TicketType: true,
      Enrollment: true,
    },
  });
}

export async function updateTicketStatus(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    },
  });
}

const ticketRepository = {
  findMany,
  findManyId,
  postNewTicket,
  findTicketTypeAndEnrol,
  updateTicketStatus,
};

export default ticketRepository;
