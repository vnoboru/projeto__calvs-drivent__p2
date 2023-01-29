import { prisma } from "@/config";

function findMany() {
  return prisma.ticketType.findMany();
}

function findManyId(userId: number) {
  return prisma.ticket.findFirst({ where: { Enrollment: { userId } } });
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

const ticketRepository = {
  findMany,
  findManyId,
  findManyTicket,
};

export default ticketRepository;
