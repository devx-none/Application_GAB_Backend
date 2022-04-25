import { Express, Request, Response } from "express";
import {
  createInvoiceHandler,
  updateInvoiceHandler,
  getInvoiceHandler,
  deleteInvoiceHandler,
} from "./controller/invoice.controller";
import { createUserHandler, getUserBalanceHandler, getUserWithdrawalHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  deleteInvoiceSchema,
} from "./schema/invoice.schema";

import { createCarHandler } from "./controller/car.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  //Get balance user
  app.get("/api/users/:userId/balance",requiresUser, getUserBalanceHandler);

//withdrawal money
  app.post("/api/users/:userId/withdrawal", requiresUser, getUserWithdrawalHandler);
  
  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a invoice
  app.post(
    "/api/invoices",
    [requiresUser, validateRequest(createInvoiceSchema)],
    createInvoiceHandler
  );

  // Update a invoice
  app.put(
    "/api/invoices/:invoiceId",
    [requiresUser, validateRequest(updateInvoiceSchema)],
    updateInvoiceHandler
  );

  // Get a invoice
  app.get("/api/invoices/:invoicetId", getInvoiceHandler);

  // Delete a invoice
  app.delete(
    "/api/invoices/:invoiceId",
    [requiresUser, validateRequest(deleteInvoiceSchema)],
    deleteInvoiceHandler
  );

  //craete data cars
  app.post("/api/cars", createCarHandler);

  //pay vignette 
  


}
