import { Properties } from "./propertiesModel";

export const properties: Properties[] = [
	{
		id: 1,
		price: 1000,
		address: "123 Broadway",
		image_url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		lat: 40.758896,
		lng: -73.985130,
		user_id: "491880b5-54eb-40d7-9103-60c4d5dcc471"
	},
	{
		id: 2,
		price: 2000,
		address: "456 8th Avenue",
		image_url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		lat: 40.753826,
		lng: -73.993584,
		user_id: "491880b5-54eb-40d7-9103-60c4d5dcc471"
	},
	{
		id: 3,
		price: 3000,
		address: "789 7th Avenue",
		image_url: "https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		lat: 40.762197,
		lng: -73.981881,
		user_id: "491880b5-54eb-40d7-9103-60c4d5dcc471"
	},
	{
		id: 4,
		price: 4000,
		address: "321 Park Avenue",
		image_url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		lat: 40.751087,
		lng: -73.977694,
		user_id: "491880b5-54eb-40d7-9103-60c4d5dcc471"
	},
	{
		id: 5,
		price: 5000,
		address: "555 Fifth Avenue",
		image_url: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		lat: 40.756662,
		lng: -73.976946,
		user_id: "491880b5-54eb-40d7-9103-60c4d5dcc471"
	},
	{
		id: 6,
		price: 6000,
		address: "888 Lexington Avenue",
		image_url: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		lat: 40.764568,
		lng: -73.966441,
		user_id: "491880b5-54eb-40d7-9103-60c4d5dcc471"
	},
];

export class PropertiesRepository {
	async findAllAsync(): Promise<Properties[]> {
		return properties;
	}

	async findByIdAsync(id: number): Promise<Properties | null> {
		return properties.find((property) => property.id === id) || null;
	}
}
