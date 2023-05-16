import React from "react";
import CurrentEvent from "../CurrentEvent/CurrentEvent";
import { currentDate } from "../../../utils/event/functions";
import { useMemo } from "react";
import { useState } from "react";

const CurrentEvents = ({ events }) => {
	const [currPage, setCurrPage] = useState(1);
	const currentEvents = useMemo(() => {
		return events.filter((event) =>
			currentDate(event?.startEvent, event?.endEvent)
		);
	}, [events]);
	return (
		<div className="px-2">
			{currentEvents.length > 0 && (
				<h1 className="mt-5 font-medium">Current events</h1>
			)}

			<div className="grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2">
				{currentEvents?.length > 0 &&
					currentEvents.slice(0, 8).map((event) => {
						return <CurrentEvent key={event?._id} event={event} />;
					})}
			</div>
			<div className="flex justify-center my-4">
				{Array.from(
					{ length: Math.floor(currentEvents.length / 8) },
					(_, index) => index
				).map((item) => (
					<p
						onClick={() => setCurrPage(item + 1)}
						className={`mx-2 text-xl text-center cursor-pointer hover:underline hover:text-purple-800 ${
							currPage === item + 1 && "text-purple-900 underline"
						} `}
					>
						{item + 1}
					</p>
				))}
			</div>
		</div>
	);
};

export default CurrentEvents;
