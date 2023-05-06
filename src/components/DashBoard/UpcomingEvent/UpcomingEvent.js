import React from "react";
import CoverForm from "../CoverForm/CoverForm";
import { Link } from "react-router-dom";
import Time from "../../Time/Time";
import { endEventCount, startEventCount } from "../../../utils/event/functions";
import MilliToTime from "../../MilliToTime/MilliToTime";
const UpcomingEvent = ({ event }) => {
	const startEvent = startEventCount(event?.startEvent);
	const endEvent = endEventCount(event?.endEvent);
	// console.log({ startEvent });
	// console.log({ endEvent });

	return (
		<Link
			to={`event/${event._id}`}
			target="_blank"
			className="mt-5 border-2 border-gray-400 rounded-md cursor-pointer hover:border-purple-950"
		>
			<CoverForm
				coverImage={event?.coverImage}
				title={event?.title}
				_id={event?._id}
				description={event?.description}
			/>
			<div className="p-2 rounded-md">
				<h3 className="mb-2 text-xl text-justify capitalize break-words">
					{event?.title}
				</h3>
				{startEvent > 0 ? (
					<MilliToTime
						diff={startEvent}
						previousDate={event?.startEvent}
						level="START"
					/>
				) : (
					endEvent > 0 && (
						<MilliToTime
							diff={endEvent}
							previousDate={event?.endEvent}
							level="END"
						/>
					)
				)}
			</div>
		</Link>
	);
};

export default UpcomingEvent;
