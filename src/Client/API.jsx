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
  deletePeople: async (_email) => {
    try {
      const response = await client.delete(`/people/${_email}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting person with email ${_email}:`, error);
      throw error;
    }
  },
  addPeople: async (person) => {
    try {
      const response = await client.post("/people", person);
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

// Roles REST Endpoints
export const RolesAPI = {
  getRoles: async () => {
    try {
      const response = await client.get("/roles");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },
  getRolesConversion: async () => {
    try {
      const response = await client.get("/roles");
      if (response && typeof response === "object") {
        // Convert the object into an array of roles with the correct order: role_code, role, is_masthead
        const transformedRoles = Object.keys(response.data).map((roleCode) => ({
          role_code: roleCode, // role code (e.g., 'AU')
          role: response.data[roleCode].role, // role name (e.g., 'Author')
          is_masthead: response.data[roleCode].is_masthead, // is_masthead flag
        }));
        return transformedRoles;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  deleteRole: async (id) => {
    try {
      const response = await client.delete(`/role/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error);
      throw error;
    }
  },
  addRole: async (role) => {
    try {
      const response = await client.post("/role/create", role);
      return response.data;
    } catch (error) {
      console.error("Error adding role:", error);
      throw error;
    }
  },
};
