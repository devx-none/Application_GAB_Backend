import { object, string } from "yup";

const payload = {
  body: object({
   
      
  }),
};

const params = {
  params: object({
    invoiceId: string().required("invoiceId is required"),
  }),
};

export const createInvoiceSchema = object({
  ...payload,
});

export const updateInvoiceSchema = object({
  ...params,
  ...payload,
});

export const deleteInvoiceSchema = object({
  ...params,
});
