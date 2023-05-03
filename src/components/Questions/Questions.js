import React, { useState } from "react";
import Question from "../Question/Question";
import { useContext } from "react";
import { EventContext } from "../../contexts/event-context";
import { updateEvent } from "../../utils/event/https";

const Questions = () => {
	const { setEvent, event, setEventSaveLoading } = useContext(EventContext);
	const [titles, setTitles] = useState({});

	const deleteHandler = async (id) => {
		const questions = event.questions;
		const filteredQuestion = questions.filter(
			(question) => question._id !== id
		);
		let alteredEvent = {};
		setEvent((prev) => {
			alteredEvent = {
				...prev,
				questions: filteredQuestion,
			};
			return alteredEvent;
		});

		if (!event?._id) {
			return;
		}
		setEventSaveLoading(true);
		const me = await updateEvent(event?._id, alteredEvent);
		console.log("sina-update-event", me);
		setEventSaveLoading(false);
	};

	return (
		<div>
			{event?.questions &&
				event?.questions.map((question, index) => (
					<Question
						question={question}
						titles={titles}
						setTitles={setTitles}
						deleteHandler={deleteHandler}
						index={index + 1}
						key={index}
					/>
				))}
		</div>
	);
};

export default Questions;
