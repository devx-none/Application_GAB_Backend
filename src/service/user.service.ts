import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error:any) {
    throw new Error(error);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query);
}

export async function validatePassword({
  cardNumber,
  pin,
}: {
  cardNumber: UserDocument["cardNumber"];
  pin: string;
}) {
  const user = await User.findOne({ cardNumber });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(pin);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "pin");
}
