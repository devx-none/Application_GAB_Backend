import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface InvoiceDocument extends mongoose.Document {
  user: UserDocument["_id"];
  serial: string | null;
  idPayment: number | null;
  category: string;
  society: string;
  invoice_amount: number;
  invoice_status: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

const InvoiceSchema = new mongoose.Schema(
  {

    factureId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serial :{type: String, required: false, default:""},
    idPayment: {type: String,required: false,unique: false,default: 0},
    category: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    society: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    invoice_amount: { type: Number, required: true, unique: false, default: 0 },
    invoice_status: { type: String, required: true, unique: false, default: "" },
  },
  { timestamps: true }
);

const Invoice = mongoose.model<InvoiceDocument>("Invoice", InvoiceSchema);

export default Invoice;
