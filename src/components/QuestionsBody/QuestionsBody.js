import React from "react";
import DropDown from "../DropDown/DropDown";
import SingleChoice from "../SingleChoice/SingleChoice";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import ShortAnswer from "../ShortAnswer/ShortAnswer";
import FileUpload from "../FIleUpload/FileUpload";

const QuestionsBody = ({ questions }) => {
	console.log(
		"🚀 ~ file: QuestionsBody.js:4 ~ QuestionsBody ~ questions:",
		questions
	);
	return (
		<div className={`mb-5`}>
			{questions &&
				questions.map((question, index) => {
					if (question.type === "dropDown") {
						return (
							<DropDown key={index} question={question} index={index + 1} />
						);
					} else if (question.type === "singleChoice") {
						return (
							<SingleChoice question={question} key={index} index={index + 1} />
						);
					} else if (question.type === "multipleChoice") {
						return (
							<MultipleChoice
								question={question}
								key={index}
								index={index + 1}
							/>
						);
					} else if (question?.type === "shortAnswer") {
						return (
							<ShortAnswer question={question} key={index} index={index + 1} />
						);
					} else if (question?.type === "fileUpload") {
						return (
							<FileUpload question={question} key={index} index={index + 1} />
						);
					}
					return "";
				})}
		</div>
	);
};

export default QuestionsBody;
