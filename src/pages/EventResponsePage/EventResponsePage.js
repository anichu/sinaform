import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { EventContext } from "../../contexts/event-context";
import SingleChoiceResponse from "../../components/EventResponse/SingleChoiceResponse/SingleChoiceResponse";

const ResponseHeader = ({ event }) => {
	console.log(event);
	return (
		<div>
			<div className="border-2 bg-gray-300 border-gray-300 rounded-md p-4">
				<div className="flex justify-between items-center">
					<h3 className="text-2xl">
						<span>Responses</span>
						<span className="ml-2">{event?.responses?.length}</span>
					</h3>
					<div>
						<p className="cursor-pointer">View In Sheets</p>
					</div>
				</div>
			</div>

			<div>
				<div>
					{event?.questions.map((question) => {
						if (question?.type === "singleChoice") {
							return (
								<SingleChoiceResponse
									responses={event?.responses}
									title={question.title}
									questionId={question._id}
								/>
							);
						}
						return null;
					})}
				</div>
			</div>
		</div>
	);
};

const EventResponsePage = () => {
	const eventData = useLoaderData();
	const { setEvent, event } = useContext(EventContext);
	console.log(event);
	useEffect(() => {
		if (eventData) {
			setEvent(eventData?.data);
		}
	}, [eventData, setEvent]);

	return (
		<div className="mt-20 lg:w-[60%]  md:w-[70%] w-[85%] mx-auto">
			<ResponseHeader event={event} />
		</div>
	);
};

export default EventResponsePage;
