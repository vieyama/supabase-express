import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { supabase, supabaseWithToken } from "@/common/utils/supabase";
import { PropertiesCustomRequest } from "@/common/types/properties";
import { Properties } from "./propertiesModel";

export class PropertiesService {
	constructor() { }

	async findAll(req: PropertiesCustomRequest): Promise<ServiceResponse<Properties[] | null>> {
		const user = req.user;
		const { search } = req.query

		let query = supabaseWithToken(req)
			.from('properties')
			.select('*')
			.eq('user_id', user.id)

		if (search?.length) {
			query.ilike('address', `%${search}%`);
		}

		const { data, error } = await query

		if (!data || error) {
			return ServiceResponse.failure("No properties found", null, StatusCodes.NOT_FOUND);
		}

		return ServiceResponse.success<Properties[]>("Data Created", data);
	}

	async create(req: PropertiesCustomRequest): Promise<ServiceResponse<Properties[] | null>> {
		const user = req.user;

		const { data, error } = await supabaseWithToken(req)
			.from('properties')
			.insert([{ ...req.body, user_id: user?.id }])
			.select();

		if (!data || error) {
			const errorMessage = `Error creating data:, ${(error as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure("An error occurred while creating data.", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return ServiceResponse.success<Properties[]>("Data Created", data);
	}

	async delete(req: PropertiesCustomRequest): Promise<ServiceResponse<Properties[] | null>> {
		const user = req.user;
		const { id } = req.params;

		const { data, error } = await supabaseWithToken(req)
			.from('properties')
			.delete()
			.eq('id', id)
			.eq('user_id', user.id)
			.select()

		if (!data || error) {
			const errorMessage = `Error deleteing data with id ${id}:, ${(error as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure("An error occurred while deleteing data.", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return ServiceResponse.success<Properties[]>("Data Deleted", data);
	}

	async update(req: PropertiesCustomRequest): Promise<ServiceResponse<Properties[] | null>> {
		const user = req.user;
		const { id } = req.params;

		const { data, error } = await supabaseWithToken(req)
			.from('properties')
			.update(req.body)
			.eq('id', id)
			.eq('user_id', user.id)
			.select()

		if (!data || error) {
			const errorMessage = `Error updating data with id ${id}:, ${(error as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure("An error occurred while updating data.", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return ServiceResponse.success<Properties[]>("Data Updated", data);
	}

	async upload(req: PropertiesCustomRequest): Promise<ServiceResponse<{ url: string } | null>> {
		const user = req.user;

		const bucketName = 'properties-images';
		const fileName = `${user.id}/${Date.now()}-${req.file?.originalname}`;

		const { data, error } = await supabaseWithToken(req)
			.storage
			.from(bucketName)
			.upload(fileName, req.file?.buffer!, {
				cacheControl: '3600',
				upsert: false,
			});

		if (!data || error) {
			const errorMessage = `Error uploading data:, ${(error as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure("An error occurred while uploading data.", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
		const fileUrl = supabase.storage.from(bucketName).getPublicUrl(fileName).data.publicUrl;

		return ServiceResponse.success<{ url: string }>("Data Uploaded", { url: fileUrl });
	}
}

export const propertiesService = new PropertiesService();
