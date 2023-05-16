import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../../contexts/event-context";
import { FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Option from "../Option/Option";
import { updateEvent } from "../../utils/event/https";
import RequiredButton from "../RequiredButton/RequiredButton";

const Question = ({
	question,
	index,
	deleteHandler,
	titles,
	setTitles,
	requires,
	setRequires,
}) => {
	const optionCheck = ["fileUpload", "shortAnswer"];
	const [names, setNames] = useState({});
	const { event, setEvent, setEventSaveLoading } = useContext(EventContext);
	// TODO::SET TITLE FROM DATA BASE
	useEffect(() => {
		setTitles((prev) => {
			return {
				...prev,
				[question?._id]: question?.title,
			};
		});
	}, [question, setTitles]);

	// TODO::SET REQUIRES FROM DATA BASE

	useEffect(() => {
		setRequires((prev) => {
			return {
				...prev,
				[question?._id]: question?.isRequired,
			};
		});
	}, [setRequires, question]);

	const changeHandler = (event) => {
		setTitles((prev) => {
			return {
				...prev,
				[question?._id]: event.target.value,
			};
		});
	};
	// TODO::SAVE THE QUESTION TO DB
	const onBlurHandler = async () => {
		const _id = question?._id;
		const { questions } = event;
		//console.log(title);
		const idx = questions.findIndex((q) => q._id === _id);
		//console.log(idx);
		if (idx > -1) {
			let question = questions[idx];
			question = {
				...question,
				title: titles[question?._id],
			};

			questions[idx] = question;
		}
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
		// console.log("🚀 ~ file: Question.js:44 ~ onBlurHandler ~ event:", me);
		setEventSaveLoading(false);
	};

	const optionHandler = async (_id) => {
		const { questions } = event;
		const createOption = {
			_id: uuidv4(),
			name: "",
		};
		const idx = questions.findIndex((q) => q._id === _id);
		if (idx < 0) {
			return;
		}
		const question = questions[idx];
		question.options.push(createOption);
		questions[idx] = question;
		let alteredEvent;
		setEvent((prev) => {
			alteredEvent = {
				...prev,
				questions: questions,
			};
			return alteredEvent;
		});

		setEventSaveLoading(true);
		const me = await updateEvent(event?._id, alteredEvent);
		console.log("🚀 ~ file: Question.js:44 ~ onBlurHandler ~ event:", me);
		setEventSaveLoading(false);
	};

	const deleteOptionHandler = async (_id, questionId) => {
		const questions = event.questions;

		if (!questionId) {
			return;
		}

		const idx1 = questions.findIndex((question) => question._id === questionId);

		if (idx1 < 0) {
			return;
		}
		const options = questions[idx1].options;

		const filteredOption = options.filter((option) => option._id !== _id);
		questions[idx1].options = filteredOption;

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
		console.log("sina-update-event", me);
		setEventSaveLoading(false);
	};

	const requiredButtonHandler = async (_id) => {
		let alteredRequires = {};
		const isRequired =
			requires[_id] === undefined
				? true
				: requires[_id] === true
				? false
				: true;
		setRequires((prev) => {
			alteredRequires = {
				...prev,
				[_id]: isRequired,
			};
			console.log(
				"🚀 ~ file: Question.js:145 ~ setRequires ~ alteredRequires:",
				alteredRequires
			);
			return alteredRequires;
		});

		console.log({ isRequired });
		const { questions } = event;
		const idx = questions.findIndex((q) => q._id === _id);

		if (idx > -1) {
			let question = questions[idx];
			question = {
				...question,
				isRequired: isRequired,
			};
			questions[idx] = question;
		}

		let alteredEvent = {
			...event,
			questions: questions,
		};
		setEvent((prev) => {
			alteredEvent = {
				...prev,
				questions: questions,
			};
			return alteredEvent;
		});

		if (!event?._id || Object.keys(alteredEvent).length === 0) {
			return;
		}

		setEventSaveLoading(true);
		console.log({ alteredEvent });
		const me = await updateEvent(event?._id, alteredEvent);
		console.log(
			"🚀 ~ file: Question.js:44 ~ onBlurHandler ~ event:",
			me?.data.questions
		);
		setEventSaveLoading(false);
	};

	return (
		<div
			id={question._id}
			className="w-[70%] relative border-2 border-gray-300 bg-gray-300 py-5 px-5 my-3 hover:border-blue-900 shadow-md rounded-md mx-auto"
		>
			<p className="capitalize border-b-2 border-dotted w-[150px]">
				{question?.type}
			</p>
			<div className="flex items-center">
				<span className="mr-2 text-xl">{index}.</span>

				<textarea
					type="text"
					value={titles[question?._id]}
					onChange={changeHandler}
					onBlur={onBlurHandler}
					className="border-0 text-[16px] border-b-2 indent-0 px-0 focus:ring-0 text-black bg-gray-300 outline-none  w-full hover:outline-none outline-0 focus:outline-none"
					placeholder="Write title"
					rows={1}
				></textarea>
			</div>

			{question?.options.length > 0 &&
				question.options.map((option, index) => (
					<div key={index} className="flex items-center w-full mt-2 ml-5">
						<Option
							deleteOptionHandler={deleteOptionHandler}
							item={option}
							questionId={question?._id}
							index={index}
							names={names}
							setNames={setNames}
						/>
					</div>
				))}

			<div
				className={`flex  mt-1 ${
					!optionCheck.includes(question?.type)
						? "items-center justify-between"
						: "justify-end "
				} `}
			>
				{!optionCheck.includes(question?.type) && (
					<button
						onClick={() => optionHandler(question._id)}
						className="px-4 py-1 mt-3 ml-5 text-white bg-purple-900 rounded-md"
					>
						add option
					</button>
				)}
				<RequiredButton
					_id={question?._id}
					requiredButtonHandler={requiredButtonHandler}
					requires={requires}
				/>
			</div>

			{question?.options.length === 0 && question?.type === "shortAnswer" && (
				<p className="pb-2 mt-5 ml-5 border-b-2 border-gray-600 border-dotted">
					some text ....
				</p>
			)}

			{question?.options.length === 0 && question?.type === "fileUpload" && (
				<div className="w-full mt-4">
					<span className="border-2 bg-gray-400 px-4 py-2 border-gray-400 shadow-lg rounded-md">
						file Upload
					</span>
				</div>
			)}

			<div
				onClick={() => deleteHandler(question._id)}
				className="absolute cursor-pointer top-2 right-2"
			>
				<FaTrash className="text-red-700 hover:text-red-900" />
			</div>
		</div>
	);
};

export default Question;
