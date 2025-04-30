import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "@/common/models/serviceResponse";
type SchemaWithParts = {
	body?: ZodSchema;
	query?: ZodSchema;
	params?: ZodSchema;
	file?: ZodSchema;
};
export const validateRequest = (schemas: SchemaWithParts) => async (req: Request, res: Response, next: NextFunction) => {
	console.log("params:", req.params);
	console.log("schema:", schemas.params);
	try {
		if (schemas.body) {
			await schemas.body.parseAsync(req.body);
		}
		if (schemas.query) {
			await schemas.query.parseAsync(req.query);
		}
		if (schemas.params) {
			await schemas.params.parseAsync(req.params);
		}
		if (schemas.params) {
			await schemas.params.parseAsync(req.file);
		}
		next();
	} catch (err) {
		const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
		const statusCode = StatusCodes.BAD_REQUEST;
		const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	}
};
