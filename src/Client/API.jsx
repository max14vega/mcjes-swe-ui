import { client } from "./Client";

// People REST Endpoints
export const PeopleAPI = {
  getPeople: async () => {
    try {
      const response = await client.get("/people");
      return response.data;
    } catch (error) {
      console.error("Error fetching people:", error);
      throw error;
    }
  },
  deletePeople: async (id) => {
    try {
      const response = await client.delete(`/people/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting person with ID ${id}:`, error);
      throw error;
    }
  },
  addPeople: async (person) => {
    try {
      const response = await client.post("/people/create", person);
      return response.data;
    } catch (error) {
      console.error("Error adding person:", error);
      throw error;
    }
  },
};

// Manuscripts REST Endpoints
export const ManuscriptsAPI = {
  getManuscripts: async () => {
    try {
      const response = await client.get("/manuscripts");
      return response.data;
    } catch (error) {
      console.error("Error fetching manuscripts:", error);
      throw error;
    }
  },
  deleteManuscript: async (id) => {
    try {
      const response = await client.delete(`/manuscripts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting manuscript with ID ${id}:`, error);
      throw error;
    }
  },
  addManuscript: async (manuscript) => {
    try {
      const response = await client.post("/manuscripts/create", manuscript);
      return response.data;
    } catch (error) {
      console.error("Error adding manuscript:", error);
      throw error;
    }
  },
};

// Texts REST Endpoints
export const TextsAPI = {
  getTexts: async () => {
    try {
      const response = await client.get("/texts");
      return response.data;
    } catch (error) {
      console.error("Error fetching texts:", error);
      throw error;
    }
  },
  deleteText: async (id) => {
    try {
      const response = await client.delete(`/texts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting text with ID ${id}:`, error);
      throw error;
    }
  },
  addText: async (text) => {
    try {
      const response = await client.post("/texts/create", text);
      return response.data;
    } catch (error) {
      console.error("Error adding text:", error);
      throw error;
    }
  },
};

