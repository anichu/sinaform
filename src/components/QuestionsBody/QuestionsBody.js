import React from "react";
import DropDown from "../DropDown/DropDown";
import SingleChoice from "../SingleChoice/SingleChoice";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import ShortAnswer from "../ShortAnswer/ShortAnswer";
import FileUpload from "../FIleUpload/FileUpload";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { createResponse, updateEvent } from "../../utils/event/https";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const QuestionsBody = ({ questions, dashboard, data }) => {
	const [responses, setResponses] = useState([]);
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const submitHandler = async (e) => {
		e.preventDefault();

		if (!user) {
			toast.error("Please login to response the event");
			navigate("/login");
		}

		console.log(responses);
		const insertResponse = {
			user: user?._id,
			responses: responses,
			createdAt: new Date(),
		};

		const updatedData = await createResponse(data?._id, insertResponse);
		console.log(
			"🚀 ~ file: Question.js:44 ~ onBlurHandler ~ event:",
			updatedData
		);
		navigate(`/event/responded/${data?._id}?q=response`);
	};

	const clearFormHandler = () => {
		setResponses([]);
	};

	return (
		<form className="" onSubmit={submitHandler}>
			{questions &&
				questions.map((question, index) => {
					if (question.type === "dropDown") {
						return (
							<DropDown
								key={index}
								setResponses={setResponses}
								responses={responses}
								question={question}
								index={index + 1}
							/>
						);
					} else if (question.type === "singleChoice") {
						return (
							<SingleChoice
								setResponses={setResponses}
								responses={responses}
								question={question}
								key={index}
								index={index + 1}
							/>
						);
					} else if (question.type === "multipleChoice") {
						return (
							<MultipleChoice
								question={question}
								key={index}
								index={index + 1}
								dashboard={dashboard}
								setResponses={setResponses}
								responses={responses}
							/>
						);
					} else if (question?.type === "shortAnswer") {
						return (
							<ShortAnswer
								question={question}
								setResponses={setResponses}
								responses={responses}
								key={index}
								index={index + 1}
							/>
						);
					} else if (question?.type === "fileUpload") {
						return (
							<FileUpload
								setResponses={setResponses}
								responses={responses}
								question={question}
								key={index}
								index={index + 1}
							/>
						);
					}
					return "";
				})}

			<div className="flex items-center justify-between mt-5">
				<button className="px-5 py-1 text-white transition-all duration-300 border-2 rounded-md shadow-md bg-purple-950 hover:bg-purple-900 border-purple-950 hover:border-purple-900">
					Submit
				</button>
				<p
					onClick={clearFormHandler}
					className="font-semibold cursor-pointer text-purple-950"
				>
					Clear form
				</p>
			</div>
		</form>
	);
};

export default QuestionsBody;
