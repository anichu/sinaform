import axios from "axios";
import { DEFAULT_URL } from "../user/https";
import moment from "moment";

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

export const allEvents = async () => {
	try {
		const data = await axios.get(DEFAULT_URL + `event/`);
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

export const allEventsByUser = async (_id) => {
	try {
		const data = await axios.get(DEFAULT_URL + `event/all/${_id}`);
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

// TODO:: GET ALL EVENTS BY IT'S TITLE

export const getEventsByTitle = async (title) => {
	try {
		const data = await axios.get(DEFAULT_URL + `event/search/${title}`);
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

export const getEventsByCreatedDate = async (startTime, endTime) => {
	try {
		const data = await axios.get(
			DEFAULT_URL + `event/search/${startTime}/${endTime}`
		);
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

export const createResponse = async (id, response) => {
	try {
		const data = await axios.put(
			DEFAULT_URL + `event/response/${id}`,
			response
		);
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
