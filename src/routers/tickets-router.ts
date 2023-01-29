import { getAllTicketsTypes, getTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getAllTicketsTypes);
ticketsRouter.get("/", getTickets);
/* ticketsRouter.post("/", postTickets); */

export { ticketsRouter };
