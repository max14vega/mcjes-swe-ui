import axios from "axios";

export const client = axios.create({
	baseURL: BACKEND_URL,
});

//makes our instance of axios
