import { createContext, useState } from "react";

export const EventContext = createContext({
	event: null,
	eventSaveLoading: false,
	setEvent: () => {},
	setEventSaveLoading: () => {},
});

const EventProvider = ({ children }) => {
	const [event, setEvent] = useState(null);
	const [eventSaveLoading, setEventSaveLoading] = useState(false);

	const value = {
		event: event,
		setEvent: setEvent,
		eventSaveLoading: eventSaveLoading,
		setEventSaveLoading: setEventSaveLoading,
	};
	return (
		<EventContext.Provider value={value}>{children}</EventContext.Provider>
	);
};

export default EventProvider;
