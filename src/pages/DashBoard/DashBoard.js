import React, { useContext } from "react";
import DashBoardHeader from "../../components/DashBoard/DashBoardHeader/DashBoardHeader";
import UpcomingEvents from "../../components/DashBoard/UpcomingEvents/UpcomingEvents";
import ExpiredEvents from "../../components/DashBoard/ExpiredEvents/ExpiredEvents";
import CurrentEvents from "../../components/DashBoard/CurrentEvents/CurrentEvents";
import { EventContext } from "../../contexts/event-context";

const DashBoard = () => {
	const { events } = useContext(EventContext);

	return (
		<div className="pb-10">
			<DashBoardHeader />
			{events && events.length > 0 && (
				<CurrentEvents events={events} dashboard />
			)}
			{events && events.length > 0 && (
				<UpcomingEvents events={events} dashboard />
			)}
			{events && events.length > 0 && (
				<ExpiredEvents events={events} dashboard />
			)}
		</div>
	);
};

export default DashBoard;
