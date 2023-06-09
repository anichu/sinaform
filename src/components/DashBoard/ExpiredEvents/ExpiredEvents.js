import React, { useMemo } from "react";
import { expiredDate } from "../../../utils/event/functions";
import ExpiredEvent from "../ExpiredEvent/ExpiredEvent";
import { useState } from "react";
import { useContext } from "react";
import { EventContext } from "../../../contexts/event-context";

const ExpiredEvents = ({ events }) => {
	const [expiredPage, setExpiredPage] = useState(1);
	const expiredEvents = useMemo(() => {
		if (!events) return [];
		return events.filter((event) => expiredDate(event?.endEvent));
	}, [events]);
	return (
		<div className="px-2">
			{expiredEvents.length > 0 && (
				<h1 className="mt-5 font-medium">Expired Events</h1>
			)}

			<div className="grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2">
				{expiredEvents?.length > 0 &&
					expiredEvents.slice(0, 8 * expiredPage).map((event, index) => {
						return (
							expiredDate(event?.endEvent) && (
								<ExpiredEvent key={index} s event={event} />
							)
						);
					})}
			</div>
			<div className="flex justify-center my-4">
				{Array.from(
					{ length: Math.round(expiredEvents.length / 8) },
					(_, index) => index
				).map((item, index) => (
					<p
						onClick={() => setExpiredPage(item + 1)}
						className={`mx-2 text-xl text-center cursor-pointer hover:underline hover:text-purple-800 ${
							expiredPage === item + 1 && "text-purple-900 underline"
						} `}
						key={index}
					>
						{item + 1}
					</p>
				))}
			</div>
		</div>
	);
};

export default ExpiredEvents;
