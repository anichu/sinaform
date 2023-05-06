import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useContext } from "react";
import { EventContext } from "../contexts/event-context";

const EventLayout = () => {
	const { event } = useContext(EventContext);
	return (
		<div>
			<Header _id={event?._id} />
			<Outlet />
		</div>
	);
};

export default EventLayout;
