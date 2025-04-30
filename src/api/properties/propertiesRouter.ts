import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { propertiesController } from "./propertiesController";
import { PropertiesSchema, GetPropertiesSchema, UploadAssetSchema, CreatePropertiesSchema } from "./propertiesModel";
import { authMiddleware } from "@/common/middleware/authMiddleware";
import { asyncHandler } from "@/common/utils/asyncHandler";
import upload from "@/common/utils/fileUpload";

export const propertiesRegistry = new OpenAPIRegistry();
export const propertiesRouter: Router = express.Router();

extendZodWithOpenApi(z);

propertiesRouter.use(asyncHandler(authMiddleware))
propertiesRegistry.register("Properties", PropertiesSchema);

propertiesRegistry.registerPath({
	method: "get",
	path: "/properties",
	tags: ["Properties", "Read"],
	responses: createApiResponse(z.array(PropertiesSchema), "Success"),
});
propertiesRouter.get("/", propertiesController.getProperties);

propertiesRegistry.registerPath({
	method: "post",
	path: "/properties",
	tags: ["Properties", "Create"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: z.array(PropertiesSchema)
				}
			}
		}
	},
	responses: createApiResponse(z.array(PropertiesSchema), "Success"),
});
propertiesRouter.post("/", validateRequest({ body: CreatePropertiesSchema }), propertiesController.createProperties);

propertiesRegistry.registerPath({
	method: "delete",
	path: "/properties/{id}",
	tags: ["Properties", "Delete"],
	request: { params: GetPropertiesSchema },
	responses: createApiResponse(PropertiesSchema, "Success"),
});
propertiesRouter.delete("/:id", propertiesController.deleteProperties);

propertiesRegistry.registerPath({
	method: "put",
	path: "/properties/{id}",
	tags: ["Properties", "Update"],
	request: { params: GetPropertiesSchema },
	responses: createApiResponse(PropertiesSchema, "Success"),
});
propertiesRouter.put("/:id", propertiesController.updateProperties);

propertiesRegistry.registerPath({
	method: "post",
	path: "/properties/upload",
	tags: ["Properties", "Upload"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: UploadAssetSchema
				}
			}
		}
	},
	responses: createApiResponse(z.array(PropertiesSchema), "Success"),
});
propertiesRouter.post("/upload", upload.single('file'), validateRequest({ file: UploadAssetSchema }), propertiesController.uploadAsset);