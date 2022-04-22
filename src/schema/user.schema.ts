import { object, string, ref ,number } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    pin: string()
      .required("pin is required")
      .matches(/^[0-9]*$/, "pin can only contain numbers."),

    cardNumber: string()
      .required("cardNumber is required")
      .max(16, "card number  consists of 16 numbers.")
      .min(16, "card number  consists of 16 numbers.")
      .matches(/^[0-9]*$/, "cardNumber can only contain numbers."),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    pin: string()
      .required("pin is required")
      .max(4, "pin consists of four digits.")
      .min(4, "pin consists of four digits.")
      .matches(/^[0-9]*$/, "pin can only contain numbers."),
    
    cardNumber: string()
      .required("cardNumber is required")
      .matches(/^[0-9]*$/, "cardNumber can only contain numbers."),
  }),
});
