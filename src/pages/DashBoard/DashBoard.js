import React, { useContext, useEffect } from "react";
import DashBoardHeader from "../../components/DashBoard/DashBoardHeader/DashBoardHeader";
import UpcomingEvents from "../../components/DashBoard/UpcomingEvents/UpcomingEvents";
import ExpiredEvents from "../../components/DashBoard/ExpiredEvents/ExpiredEvents";
import CurrentEvents from "../../components/DashBoard/CurrentEvents/CurrentEvents";
import { EventContext } from "../../contexts/event-context";
import { useSearchParams } from "react-router-dom";
import {
	getEventsByCreatedDate,
	getEventsByTitle,
} from "../../utils/event/https";

const DashBoard = () => {
	const { events, setEvents, eventsData } = useContext(EventContext);
	const [searchParams] = useSearchParams();
	const q = searchParams.get("q");
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");
	console.log(q, startDate, endDate);
	useEffect(() => {
		const fetchEvents = async () => {
			if (q) {
				const data = await getEventsByTitle(q || "");
				console.log(data);
				console.log(data?.data.length);
				setEvents(data.data);
			} else if (startDate && endDate) {
				const data = await getEventsByCreatedDate(startDate, endDate);
				console.log(data);
				console.log(data?.data.length);
				setEvents(data.data);
			} else {
				setEvents(eventsData);
			}
		};
		fetchEvents();
	}, [q, setEvents, startDate, endDate, eventsData]);

	return (
		<div className="pb-10">
			<DashBoardHeader />
			{events?.length === 0 && (
				<div>
					<h4 className="text-center mx-auto font-semibold text-red-900 bg-red-300 md:w-1/2 w-full px-5 rounded-md mt-10  text-xl">
						There are no events. for this query
					</h4>
				</div>
			)}
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
