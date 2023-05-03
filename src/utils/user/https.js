import axios from "axios";

export const DEFAULT_URL = "http://localhost:5050/api/";

export const loginUser = async (userData) => {
	try {
		const data = await axios.post(DEFAULT_URL + "user/login/", userData);
		return {
			success: true,
			data: data?.data,
		};
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error?.message,
		};
	}
};
