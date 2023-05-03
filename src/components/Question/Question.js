import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../../contexts/event-context";
import { FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { HiXMark } from "react-icons/hi2";
import Option from "../Option/Option";
import { updateEvent } from "../../utils/event/https";

const Question = ({ question, index, deleteHandler, titles, setTitles }) => {
	const optionCheck = ["fileUpload", "shortAnswer"];
	const [title, setTitleData] = useState(question?.title);
	const [names, setNames] = useState({});
	const [deleteOptionId, setDeleteOptionId] = useState("");
	const { event, setEvent, setEventSaveLoading } = useContext(EventContext);

	useEffect(() => {
		console.log("titles", question.title);
		setTitles((prev) => {
			return {
				...prev,
				[question?._id]: question?.title,
			};
		});
	}, [question, setTitles]);
	//	console.log("sina-option-delete", question?.options);

	const changeHandler = (event) => {
		// setTitleData(event.target.value);
		setTitles((prev) => {
			return {
				...prev,
				[question?._id]: event.target.value,
			};
		});
	};

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
		console.log("🚀 ~ file: Question.js:44 ~ onBlurHandler ~ event:", me);
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

		setDeleteOptionId(_id);

		if (!event?._id) {
			return;
		}
		setEventSaveLoading(true);
		const me = await updateEvent(event?._id, alteredEvent);
		console.log("sina-update-event", me);
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
				<span className="text-xl mr-2">{index}.</span>

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
					<div key={index} className="w-full mt-2 flex items-center  ml-5">
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

			{!optionCheck.includes(question?.type) && (
				<button
					onClick={() => optionHandler(question._id)}
					className="bg-purple-900 px-4 ml-5 py-1 mt-3 text-white rounded-md"
				>
					add option
				</button>
			)}

			{question?.options.length === 0 && question?.type === "shortAnswer" && (
				<p className="mt-5 pb-2 ml-5 border-b-2 border-dotted border-gray-600">
					some text ....
				</p>
			)}

			<div
				onClick={() => deleteHandler(question._id)}
				className="absolute top-2 cursor-pointer  right-2"
			>
				<FaTrash className="text-red-700  hover:text-red-900" />
			</div>
		</div>
	);
};

export default Question;
