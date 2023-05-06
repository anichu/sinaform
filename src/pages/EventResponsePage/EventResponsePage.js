import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { EventContext } from "../../contexts/event-context";

const EventResponsePage = () => {
	const eventData = useLoaderData();

	const { setEvent } = useContext(EventContext);
	useEffect(() => {
		if (eventData) {
			setEvent(eventData?.data);
		}
	}, [eventData, setEvent]);

	return <div></div>;
};

export default EventResponsePage;
