import React, { useState } from "react";

const DropDown = ({ question, index }) => {
	const [selectedAnswer, setSelectedAnswer] = useState("");

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
			<select
				style={{
					width: `calc(100% - 20px)`,
				}}
				value={selectedAnswer}
				className="mb-4 mt-6 ml-5 capitalize rounded-md"
				onChange={(event) => setSelectedAnswer(event.target.value)}
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

			{selectedAnswer && (
				<div className="text-right mt-5 ">
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

export default DropDown;
