import React from "react";
import { upcomingDate } from "../../../utils/event/functions";
import ExpiredEvent from "../ExpiredEvent/ExpiredEvent";

const ExpiredEvents = ({ events }) => {
	return (
		<div className="px-2">
			<h1 className="mt-5">Expired Events</h1>
			<div className="grid grid-cols-5 gap-5">
				{events?.length > 0 &&
					events.map((event) => {
						return (
							!upcomingDate(event?.endEvent) && (
								<ExpiredEvent key={event?._id} event={event} />
							)
						);
					})}
			</div>
		</div>
	);
};

export default ExpiredEvents;
