import axios from "axios";

export const DEFAULT_URL = "https://sina-for.vercel.app/api/";

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

export const registerUser = async (registerData) => {
	try {
		const data = await axios.post(DEFAULT_URL + "user/signup/", registerData);
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
