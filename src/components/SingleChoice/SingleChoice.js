import React, { useState } from "react";
import "./SingleChoice.css";
const SingleChoice = ({ question, index, setResponses, responses }) => {
	const [selectedAnswer, setSelectedAnswer] = useState("");

	const handleChange = (event) => {
		setResponses(() => {
			return {
				...responses,
				[question?._id]: event.target.value,
			};
		});
	};

	const clearTextHandler = () => {
		setResponses((prev) => {
			return {
				...prev,
				[question?._id]: "",
			};
		});
	};
	console.log(responses);
	return (
		<div className="border-2 bg-gray-300 border-gray-400 rounded-md shadow-md p-5 mt-5">
			{question && (
				<>
					<h1 className="text-xl mt-4 mb-2 font-semibold capitalize">
						{index}. {question.title}{" "}
						{question?.isRequired && <span className="text-red-500">*</span>}
					</h1>
					<hr />
				</>
			)}

			{question &&
				question.options.map((option, index) => {
					return (
						<div key={index} className="flex items-center my-2 ml-5">
							<label className="radio-container">
								{option.name}
								<input
									type="radio"
									name={question._id}
									value={option.name}
									checked={responses[question._id] === option.name}
									onChange={handleChange}
									className="mr-2  checked:bg-blue-800 ring-offset-0"
								/>
								<span className="radio-checkmark"></span>
							</label>
						</div>
					);
				})}
			{responses[question._id] && (
				<div className="text-right  ">
					<span
						onClick={clearTextHandler}
						className="cursor-pointer font-semibold  text-purple-950  px-4 py-2"
					>
						Clear response
					</span>
				</div>
			)}
		</div>
	);
};

export default SingleChoice;
