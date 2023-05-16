import React, { useMemo } from "react";
import { upcomingDate } from "../../../utils/event/functions";
import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";
import { useState } from "react";

const UpcomingEvents = ({ events }) => {
	const [upcomingPage, setUpcomingPage] = useState(1);
	const upcomingEvents = useMemo(() => {
		if (!events) return [];
		return events.filter((event) =>
			upcomingDate(event?.startEvent, event?.endEvent)
		);
	}, [events]);

	return (
		<div className="px-2">
			{upcomingEvents.length > 0 && (
				<h1 className="mt-5 font-medium">Upcoming Events</h1>
			)}

			<div className="grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2">
				{upcomingEvents?.length > 0 &&
					upcomingEvents.slice(0, upcomingPage * 8).map((event) => {
						return <UpcomingEvent key={event?._id} event={event} />;
					})}
				{/* {7 * upcomingPage <= upcomingEvents.length && (
					<div className="flex items-end">
						<p
							onClick={() => setUpcomingPage((prev) => prev + 1)}
							className="text-xl font-bold text-purple-900 cursor-pointer hover:underline"
						>
							See more...
						</p>
					</div>
				)} */}
			</div>
			<div className="flex justify-center my-4">
				{Array.from(
					{ length: Math.floor(upcomingEvents.length / 8) },
					(_, index) => index
				).map((item) => (
					<p
						onClick={() => setUpcomingPage(item + 1)}
						className={`mx-2 text-xl text-center cursor-pointer hover:underline hover:text-purple-800 ${
							upcomingPage === item + 1 && "text-purple-900 underline"
						} `}
					>
						{item + 1}
					</p>
				))}
			</div>
		</div>
	);
};

export default UpcomingEvents;
