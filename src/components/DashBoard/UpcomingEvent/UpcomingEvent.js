import React from "react";

const UpcomingEvent = ({ event }) => {
	return (
		<div className="bg-red-900 h-[300px]">
			<h4>{event?.title}</h4>
		</div>
	);
};

export default UpcomingEvent;
