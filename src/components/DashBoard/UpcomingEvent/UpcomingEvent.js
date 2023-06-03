import React, { useContext } from "react";
import CoverForm from "../CoverForm/CoverForm";
import { Link } from "react-router-dom";
import { endEventCount, startEventCount } from "../../../utils/event/functions";
import MilliToTime from "../../MilliToTime/MilliToTime";
import { AuthContext } from "../../../contexts/auth-context";
const UpcomingEvent = ({ event }) => {
	const startEvent = startEventCount(event?.startEvent);
	const endEvent = endEventCount(event?.endEvent);
	
	const { user } = useContext(AuthContext);
	let link;
	if (user?._id === event.user) {
		link = `/event/${event._id}`;
	} else {
		link = `/event/questions/${event._id}`;
	}

	// console.log(link);

	return (
		<Link
			to={link}
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
				<h3 className="mb-2 text-sm text-justify capitalize break-words">
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
