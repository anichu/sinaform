import React from "react";
import DropDown from "../DropDown/DropDown";
import SingleChoice from "../SingleChoice/SingleChoice";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import ShortAnswer from "../ShortAnswer/ShortAnswer";
import FileUpload from "../FIleUpload/FileUpload";
import { useState } from "react";

const QuestionsBody = ({ questions, dashboard }) => {
	const [responses, setResponses] = useState([]);

	console.log(
		"🚀 ~ file: QuestionsBody.js:4 ~ QuestionsBody ~ questions:",
		questions
	);
	return (
		<div className="">
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
		</div>
	);
};

export default QuestionsBody;
