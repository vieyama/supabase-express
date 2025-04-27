import type { RequestHandler, Response } from "express";
import { propertiesService } from "./propertiesService";
import { asyncHandler } from "@/common/utils/asyncHandler";
import { PropertiesCustomRequest } from "@/common/types/properties";

class PropertiesController {
	public getProperties: RequestHandler = asyncHandler(async (req: PropertiesCustomRequest, res: Response) => {
		const serviceResponse = await propertiesService.findAll(req);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	});

	public createProperties: RequestHandler = asyncHandler(async (req: PropertiesCustomRequest, res: Response) => {
		const serviceResponse = await propertiesService.create(req);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	});

	public deleteProperties: RequestHandler = asyncHandler(async (req: PropertiesCustomRequest, res: Response) => {
		const serviceResponse = await propertiesService.delete(req);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	});

	public updateProperties: RequestHandler = asyncHandler(async (req: PropertiesCustomRequest, res: Response) => {
		const serviceResponse = await propertiesService.update(req);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	});

	public uploadAsset: RequestHandler = asyncHandler(async (req: PropertiesCustomRequest, res: Response) => {
		const serviceResponse = await propertiesService.upload(req);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	});
}

export const propertiesController = new PropertiesController();
