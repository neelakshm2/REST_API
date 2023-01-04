//When a request comes in we're going to provide a schema in the middleware and then
//its going to validate the request body against that schema
//for eg: For creating a user we require an email and password
//and we're going to make sure that both of those fields are present and
//that they are strings and along with that we're going to make sure that
//the email is actually an email

import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validate;
