import React, { useState } from "react";
import "./SingleChoice.css";
const SingleChoice = ({ question, index }) => {
	const [selectedAnswer, setSelectedAnswer] = useState("");

	function handleChange(event) {
		setSelectedAnswer(event.target.value);
	}
	return (
		<div className="border-2 bg-gray-300 border-gray-400 rounded-md shadow-md p-5 mt-5">
			{question && (
				<>
					<h1 className="text-xl mt-4 mb-2 font-semibold capitalize">
						{index}. {question.title}
					</h1>
					<hr />
				</>
			)}

			{question &&
				question.options.map((option, index) => {
					return (
						<div key={index} className="flex items-center my-2 ml-5">
							<label class="radio-container">
								{option.name}
								<input
									type="radio"
									name="fruit"
									value={option.name}
									checked={selectedAnswer === option.name}
									onChange={handleChange}
									className="mr-2  checked:bg-blue-800 ring-offset-0"
								/>
								<span class="radio-checkmark"></span>
							</label>
						</div>
					);
				})}
			{selectedAnswer && (
				<div className="text-right  ">
					<span
						onClick={() => setSelectedAnswer("")}
						className="cursor-pointer bg-gray-600 px-4 py-2"
					>
						clear response
					</span>
				</div>
			)}
		</div>
	);
};

export default SingleChoice;
