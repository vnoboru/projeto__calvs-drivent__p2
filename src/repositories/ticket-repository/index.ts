import { prisma } from "@/config";

function findMany() {
  return prisma.ticketType.findMany();
}

function findManyId(userId: number) {
  return prisma.ticket.findFirst({ where: { Enrollment: { userId } }, include: { TicketType: true } });
}

function findManyTicket(id: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: id,
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

const ticketRepository = {
  findMany,
  findManyId,
  findManyTicket,
  postNewTicket,
};

export default ticketRepository;
