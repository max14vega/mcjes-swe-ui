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
  updatePeople: async (person) => {
    try {
      const response = await client.put(`/people/${person.email}`, person);
      return response.data;
    } catch (error) {
      console.error("Error updating person:", error);
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
      console.error("Error fetching all manuscripts:", error);
      throw error;
    }
  },

  getManuscriptsByEmail: async (email) => {
    try {
      const response = await client.get(`/manuscripts/people/${encodeURIComponent(email)}`);
      return response.data.Message; // your API returns { Message: [...] }
    } catch (error) {
      console.error(`Error fetching manuscripts for ${email}:`, error);
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
      const response = await client.post("/manuscripts", manuscript);
      return response.data;
    } catch (error) {
      console.error("Error adding manuscript:", error);
      throw error;
    }
  },

  updateManuscript: async (id, manuscript) => {
    try {
      const response = await client.put(`/manuscripts/${id}`, manuscript);
      return response.data;
    } catch (error) {
      console.error(`Error updating manuscript with ID ${id}:`, error);
      throw error;
    }
  },

  updateManuscriptState: async (id, manuscript) => {
    try {
      const response = await client.put(`/manuscripts/action/${id}`, manuscript);
      return response.data;
    } catch (error) {
      console.error(`Error updating manuscript state for ID ${id}:`, error);
      throw error;
    }
  },

  withdrawManuscript: async (id) => {
    try {
      const response = await client.patch(`/manuscripts/${id}`, {
        action: "Withdrawn"
      });
      return response.data;
    } catch (error) {
      console.error(`Error withdrawing manuscript ${id}:`, error);
      throw error;
    }
  }
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

  updateText: async (text) => {
    try {
      const response = await client.put(`/texts/${text.key}`, text);
      return response.data;
    } catch (error) {
      console.error(`Error updating text with ID ${text.key}:`, error);
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
        const transformedRoles = Object.keys(response.data).map((roleCode) => ({
          role_code: roleCode,
          role: response.data[roleCode].role,
          is_masthead: response.data[roleCode].is_masthead,
        }));
        return transformedRoles;
      }
    } catch (error) {
      console.error("Error transforming roles:", error);
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


// Account REST Endpoints
export const AccountAPI = {
  register: async (userData) => {
    try {
      const response = await client.post("/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error);
      throw error;
    }
  },
  login: async (credentials) => {
    try {
      const response = await client.post("/login", credentials);
      const token = response.data.access_token;
      // store token locally for use in protected requests
      localStorage.setItem("access_token", token);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error);
      throw error;
    }
  },
};