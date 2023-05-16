import React, { useState } from "react";

const DropDown = ({ question, index, responses, setResponses }) => {
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const changeInputHandler = (event) => {
		setResponses((prev) => {
			return {
				...prev,
				[question._id]: event.target.value,
			};
		});
	};

	const clearInputTextHandler = () => {
		setResponses((prev) => {
			return {
				...prev,
				[question._id]: "",
			};
		});
	};

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
			<select
				style={{
					width: `calc(100% - 20px)`,
				}}
				value={responses[question._id]}
				className="mb-4 mt-6 ml-5 capitalize rounded-md"
				onChange={changeInputHandler}
			>
				<option value="">Select ... </option>
				{question &&
					question.options.map((option) => {
						return (
							<option
								key={option._id}
								value={option.name}
								className="capitalize"
							>
								{option.name}
							</option>
						);
					})}
			</select>

			{responses[question._id] && (
				<div className="text-right mt-5 ">
					<span
						onClick={clearInputTextHandler}
						className="cursor-pointer font-semibold   text-purple-950 px-4 py-2"
					>
						Clear response
					</span>
				</div>
			)}
		</div>
	);
};

export default DropDown;
