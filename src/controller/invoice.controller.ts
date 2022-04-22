import { Request, Response } from "express";
import { get } from "lodash";
import {
  createInvoice,
  findInvoice,
  findAndUpdate,
  deleteInvoice,
} from "../service/invoice.service";

export async function createInvoiceHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  console.log(userId);
  const body = req.body;
  const invoice = await createInvoice({ ...body , userId });

  return res.send(invoice);

}

//buy invoice 



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
  const postId = get(req, "params.postId");
  const post = await findInvoice({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function deleteInvoiceHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");

  const post = await findInvoice({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteInvoice({ postId });

  return res.sendStatus(200);
}


