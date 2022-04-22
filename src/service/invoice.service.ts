import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Invoice, { InvoiceDocument } from "../model/invoice.model";

export function createInvoice(input: Array<InvoiceDocument>) {
  return Invoice.create(input);
}

export function findInvoice(
  query: FilterQuery<InvoiceDocument>,
  options: QueryOptions = { lean: true }
) {
  return Invoice.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<InvoiceDocument>,
  update: UpdateQuery<InvoiceDocument>,
  options: QueryOptions
) {
  return Invoice.findOneAndUpdate(query, update, options);
}

export function deleteInvoice(query: FilterQuery<InvoiceDocument>) {
  return Invoice.deleteOne(query);
}
