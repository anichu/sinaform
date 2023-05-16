import { createContext, useContext, useState } from "react";
import { AuthContext } from "./auth-context";
import { useQuery } from "@tanstack/react-query";
import { allEvents, allEventsByUser } from "../utils/event/https";

export const EventContext = createContext({
	event: null,
	events: [],
	eventSaveLoading: false,
	setEvent: () => {},
	setEventSaveLoading: () => {},
});

const EventProvider = ({ children }) => {
	const { user } = useContext(AuthContext);
	const [event, setEvent] = useState(null);
	const [eventSaveLoading, setEventSaveLoading] = useState(false);

	const { data: events = [] } = useQuery({
		queryKey: ["events", user?._id],
		queryFn: async () => {
			if (!user) {
				const data = await allEvents();

				if (data.data) {
					return data.data;
				} else {
					return [];
				}
			} else {
				const data = await allEventsByUser(user?._id);

				if (data.data) {
					return data.data;
				} else {
					return [];
				}
			}
		},
	});

	const value = {
		event: event,
		setEvent: setEvent,
		events: events,
		eventSaveLoading: eventSaveLoading,
		setEventSaveLoading: setEventSaveLoading,
	};
	return (
		<EventContext.Provider value={value}>{children}</EventContext.Provider>
	);
};

export default EventProvider;
