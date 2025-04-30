import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Properties = z.infer<typeof PropertiesSchema>;
export const PropertiesSchema = z.object({
	id: z.number(),
	address: z.string(),
	image_url: z.string(),
	user_id: z.string(),
	lat: z.number(),
	lng: z.number(),
	price: z.number()
});

export const CreatePropertiesSchema = z.object({
	address: z.string(),
	image_url: z.string(),
	lat: z.number(),
	lng: z.number(),
	price: z.number()
});

export const UploadAssetSchema = z.object({
	file: z.instanceof(File),
})

export const PropertiesArraySchema = z.array(PropertiesSchema).openapi({
	description: "Array of Properties"
});

// Input Validation for 'GET properties/:id' endpoint
export const GetPropertiesSchema = z.object({
	id: z.string()
});
