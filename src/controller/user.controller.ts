import { Request, Response } from "express";
import { get, omit } from "lodash";
import { createUser, findUser } from "../service/user.service";
import { UserDocument } from "../model/user.model";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "pin"));
  } catch (e:any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  const userId = get(req, "params.userId");
    console.log(userId);
  const user = await findUser({ userId });

  if (!user) {
    return res.sendStatus(404);
  }

  // return res.send(omit(user.toJSON(), "pin"));
}

//consultation de solde
export async function getUserBalanceHandler(req: Request, res: Response) {
  const userId = get(req, "params.userId");

  const user = await findUser({ _id:userId });

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}

//withdrawal money
export async function getUserWithdrawalHandler(req: Request, res: Response) {
  const userId = get(req, "params.userId");
  const amount = get(req, "body.amount");

  const user = await  findUser({ _id:userId }) as UserDocument;
  console.log(user);

  if (!user) {
    return res.sendStatus(404);

  }

    user.balance = user.balance - amount;
    await user.save();

  return res.send(user);
}



