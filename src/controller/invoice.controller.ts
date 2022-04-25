import { Request, Response } from "express";
import { get } from "lodash";
import {
  createInvoice,
  findInvoice,
  findAndUpdate,
  deleteInvoice,
} from "../service/invoice.service";
import { findUser } from "../service/user.service";
import { InvoiceDocument } from "../model/invoice.model";
import { UserDocument } from "../model/user.model";

export async function createInvoiceHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  console.log(userId);
  const body = req.body;
  const invoice = await createInvoice({ ...body , userId });

  return res.send(invoice);

}





export async function updateInvoiceHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const invoiceId = get(req, "params.postId");
  const update = req.body;

  const invoice = await findInvoice({ invoiceId });

  if (!invoice) {
    return res.sendStatus(404);
  }

  if (String(invoice.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedInvoice = await findAndUpdate({ invoiceId }, update, { new: true });

  return res.send(updatedInvoice);
}
export async function getInvoiceHandler(req: Request, res: Response) {
  const invoiceId = get(req, "params.invoiceId");
  const invoice = await findInvoice({ invoiceId });

  if (!invoice) {
    return res.sendStatus(404);
  }

  return res.send(invoice);
}

export async function deleteInvoiceHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const invoiceId = get(req, "params.invoiceId");

  const post = await findInvoice({ invoiceId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteInvoice({ invoiceId });

  return res.sendStatus(200);
}

//pay facture
export async function payInvoiceHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const invoiceId = get(req, "params.invoiceId");

  const invoice = await findInvoice({ invoiceId }) ;

  if (!invoice) {
    return res.sendStatus(404);
  }

  if (String(invoice.user) !== String(userId)) {
    return res.sendStatus(401);
  }
  const user   = await findUser({ _id: invoice.user }) as UserDocument;
  if(user){
  user.balance = user.balance - invoice.invoice_amount;
  await user.save();
}
  await findAndUpdate({ invoiceId }, { invoice_status: "payed" }, { new: true });

  return res.sendStatus(200);
}


