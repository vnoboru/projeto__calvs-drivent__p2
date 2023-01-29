import { getAllTicketsTypes, getTickets, postTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getAllTicketsTypes);
ticketsRouter.get("/", getTickets);
ticketsRouter.post("/", postTicket);

export { ticketsRouter };
