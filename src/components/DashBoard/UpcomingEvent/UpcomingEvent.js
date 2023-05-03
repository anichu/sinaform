import React from "react";
import CoverForm from "../CoverForm/CoverForm";
import { Link } from "react-router-dom";
const UpcomingEvent = ({ event }) => {
	return (
		<Link
			to={`event/${event._id}`}
			target="_blank"
			className="border-2 hover:border-purple-950 cursor-pointer mt-5 border-gray-400 rounded-md"
		>
			<CoverForm
				coverImage={event?.coverImage}
				title={event?.title}
				_id={event?._id}
				description={event?.description}
			/>
			<div className="rounded-md p-2">
				<h3 className="text-xl capitalize break-words text-justify">
					{event?.title}
				</h3>
			</div>
		</Link>
	);
};

export default UpcomingEvent;
