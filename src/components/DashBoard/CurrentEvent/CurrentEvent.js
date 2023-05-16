import React from "react";
import { Link } from "react-router-dom";
import CoverForm from "../CoverForm/CoverForm";
import { endEventCount } from "../../../utils/event/functions";
import MilliToTime from "../../MilliToTime/MilliToTime";

const CurrentEvent = ({ event }) => {
	const endEvent = endEventCount(event?.endEvent);
	return (
		<Link
			to={`event/${event._id}`}
			target="_blank"
			className="mt-5 border-2 border-gray-400 rounded-md cursor-pointer hover:border-purple-950"
		>
			<CoverForm
				coverImage={event?.coverImage}
				title={event?.title}
				description={event?.description}
				_id={event?._id}
			/>
			<div className="p-2 rounded-md">
				<h3 className="text-sm text-justify capitalize break-words">
					{event?.title}
				</h3>

				{endEvent > 0 && (
					<MilliToTime
						diff={endEvent}
						previousDate={event?.endEvent}
						level="END"
					/>
				)}
			</div>
		</Link>
	);
};

export default CurrentEvent;
