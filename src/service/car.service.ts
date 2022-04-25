import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Car, { CarDocument } from "../model/car.model";

export function createCar(input: Array<CarDocument>) {
  return Car.create(input);
}

export function findCar(
  query: FilterQuery<CarDocument>,
  options: QueryOptions = { lean: true }
) {
  return Car.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<CarDocument>,
  update: UpdateQuery<CarDocument>,
  options: QueryOptions
) {
  return Car.findOneAndUpdate(query, update, options);
}

export function deleteCar(query: FilterQuery<CarDocument>) {
  return Car.deleteOne(query);
}
