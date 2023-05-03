import axios from "axios";
import { DEFAULT_URL } from "../user/https";

export const createEvent = async (eventData) => {
	try {
		const data = await axios.post(DEFAULT_URL + "event/", eventData);
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

export const getSingleEvent = async (id) => {
	try {
		const data = await axios.get(DEFAULT_URL + `event/${id}/`);
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

export const updateEvent = async (id, event) => {
	try {
		const data = await axios.put(DEFAULT_URL + `event/${id}/`, event);
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

export const getQuestions = async (id) => {
	try {
		const data = await axios.get(DEFAULT_URL + `event/questions/${id}/`);
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

export const allEvents = async (userId) => {
	try {
		const data = await axios.get(DEFAULT_URL + `event/all/${userId}`);
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