import React, { useState } from "react";
import "./MultipleChoice.css";

const MultipleChoice = ({ question, index }) => {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleOptionChange = (event) => {
		const value = event.target.value;

		if (selectedOptions.includes(value)) {
			setSelectedOptions(selectedOptions.filter((option) => option !== value));
		} else {
			setSelectedOptions([...selectedOptions, value]);
		}

		console.log(selectedOptions);
	};
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
							<label className="checkbox-container">
								{option.name}
								<input
									type="checkbox"
									value={option._id}
									checked={selectedOptions.includes(option._id)}
									onChange={handleOptionChange}
								/>
								<span className="checkmark"></span>
							</label>
						</div>
					);
				})}

			{selectedOptions.length > 0 && (
				<div className="text-right mt-5 ">
					<span
						onClick={() => setSelectedOptions([])}
						className="cursor-pointer bg-gray-600 px-4 py-2"
					>
						clear response
					</span>
				</div>
			)}
		</div>
	);
};

export default MultipleChoice;
