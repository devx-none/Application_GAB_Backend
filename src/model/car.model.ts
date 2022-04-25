import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface CarDocument extends mongoose.Document {
 
  matricule: string | null;
  year: number | null;
  horsPower: number;
  gaz: string;
  invoice_amount: number;
  invoice_status: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

const CarSchema = new mongoose.Schema(
  {

    matricule :{type: String, required: true},
    year: {type: Number,required: false,unique: false,default: 0},
    horsPower: {
      type: Number,
      required: true,
      unique: false,
      default: "",
    },
    gas: {
      type: String,
      required: true,
      unique: false,
        default: "",
      enum:["essence","diesel"]
    },
    invoice_amount: { type: Number, required: true, unique: false, default: 0 },
    invoice_status: { type: String, required: true, unique: false, default: "" },
  },
  { timestamps: true }
);

const Car = mongoose.model<CarDocument>("Car", CarSchema);

export default Car;
