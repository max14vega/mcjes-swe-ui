import axios from "axios";
import client from "./Client";

// People REST Endpoints
export const PeopleAPI = {
	// GET all people
	getPeople: async () => {
		try {
			const response = await client.get("/people");
			return response.data;
		} catch (error) {
			console.error("Error fetching people:", error);
			throw error;
		}
	},

	// DELETE a person by ID
	deletePeople: async (id) => {
		try {
			const response = await client.delete(`/people/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting person with ID ${id}:`, error);
			throw error;
		}
	},
};
