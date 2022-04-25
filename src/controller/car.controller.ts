import { Request, Response } from "express";
import { get } from "lodash";
import {
  createCar,
  findCar,
  findAndUpdate,
  deleteCar,
} from "../service/car.service";
import { CarDocument } from "../model/car.model";
import { UserDocument } from "../model/user.model";
import { findUser } from "../service/user.service";

export async function createCarHandler(req: Request, res: Response) {

  const body = req.body;
  const car = await createCar({ ...body });

  return res.send(car);

}





export async function updateCarHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const carId = get(req, "params.carId");
  const update = req.body;

  const car = await findCar({ carId });

  if (!car) {
    return res.sendStatus(404);
  }

 

  const updatedCar = await findAndUpdate({ carId }, update, { new: true });

  return res.send(updatedCar);
}
export async function getInvoiceHandler(req: Request, res: Response) {
  const carID = get(req, "params.carId");
  const post = await findCar({ carID });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function deleteCarHandler(req: Request, res: Response) {
  const carId = get(req, "params.carId");

  const car = await findCar({ carId });

  if (!car) {
    return res.sendStatus(404);
  }



  await deleteCar({ carId });

  return res.sendStatus(200);
}

//pay facture
export async function payCarHandler(req: Request, res: Response) {
    const carId = get(req, "params.invoiceId");
    const userId = get(req, "params.userId");

  const car = await findCar({ carId }) ;

  if (!car) {
    return res.sendStatus(404);
  }

 
  const user   = await findUser({ userId }) as UserDocument;
  if(user){
  user.balance = user.balance - car.invoice_amount;
  await user.save();
}
  await findAndUpdate({ carId }, { invoice_status: "payed" }, { new: true });

  return res.sendStatus(200);
}


