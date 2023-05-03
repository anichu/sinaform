import React from "react";
import QuestionsBody from "../../QuestionsBody/QuestionsBody";
import { upcomingDate } from "../../../utils/event/functions";
import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";

const UpcomingEvents = ({ events }) => {
	return (
		<div className="px-2">
			<h1 className="mt-5">Upcoming Events</h1>
			<div className="grid grid-cols-5 gap-5">
				{events?.length > 0 &&
					events.map((event) => {
						return (
							upcomingDate(event?.endEvent) && (
								<UpcomingEvent key={event?._id} event={event} />
							)
						);
					})}
			</div>
		</div>
	);
};

export default UpcomingEvents;
