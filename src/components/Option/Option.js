import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../../contexts/event-context";
import { HiXMark } from "react-icons/hi2";
import { FaCircle } from "react-icons/fa";
import { updateEvent } from "../../utils/event/https";

const Option = ({
	item,
	index,
	questionId,
	deleteOptionHandler,
	setNames,
	names,
}) => {
	const { setEvent, event, setEventSaveLoading } = useContext(EventContext);

	useEffect(() => {
		setNames((prev) => {
			return {
				...prev,
				[item._id]: item.name,
			};
		});
	}, [item, setNames]);
	const changeHandler = (event) => {
		// setName(event.target.value);
		setNames((prev) => {
			return {
				...prev,
				[item._id]: event.target.value,
			};
		});
	};
	const onBlurHandler = async () => {
		const _id = item?._id;
		const questions = event.questions;
		const idx1 = questions.findIndex((question) => question._id === questionId);

		if (idx1 < 0) {
			return;
		}

		const options = event?.questions[idx1].options;
		const idx2 = options.findIndex((option) => option._id === _id);
		let option = options[idx2];
		option = {
			...option,
			name: names[item._id],
		};
		options[idx2] = option;
		questions[idx1].options = options;

		let alteredEvent = {};

		setEvent((prev) => {
			alteredEvent = {
				...prev,
				questions: questions,
			};
			return alteredEvent;
		});

		if (!event?._id) {
			return;
		}
		setEventSaveLoading(true);
		const me = await updateEvent(event?._id, alteredEvent);
		console.log("🚀 ~ file: Question.js:44 ~ onBlurHandler ~ event:", me);
		setEventSaveLoading(false);
	};

	return (
		<>
			<div
				className="flex items-center"
				style={{
					width: `calc(100% - 24px)`,
				}}
			>
				<FaCircle
					className={`w-4 h-4 mr-2  ${
						names[item?._id] ? "text-purple-950" : "text-gray-600"
					}`}
				/>
				<textarea
					type="text"
					value={names[item._id]}
					onChange={changeHandler}
					onBlur={onBlurHandler}
					className="border-0 text-[16px] bg-gray-300 border-b-2 indent-0 px-0 focus:ring-0 text-black  outline-none  w-full hover:outline-none outline-0 focus:outline-none"
					placeholder={`Option${index + 1}`}
					rows={1}
				></textarea>
			</div>
			<HiXMark
				className="w-6 h-6 mx-2 cursor-pointer"
				onClick={() => deleteOptionHandler(item?._id, questionId)}
			/>
		</>
	);
};

export default Option;
