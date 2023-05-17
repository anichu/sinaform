import React from "react";
import "./MultipleChoice.css";

const MultipleChoice = ({
	question,
	index,
	dashboard,
	responses,
	setResponses,
}) => {
	const handleOptionChange = (event) => {
		const value = event.target.value;

		if (
			responses[question._id] !== undefined &&
			responses[question._id]?.includes(value)
		) {
			setResponses((prev) => {
				return {
					...prev,
					[question._id]: responses[question._id].filter(
						(option) => option !== value
					),
				};
			});
		} else {
			setResponses((prev) => {
				return {
					...prev,
					[question._id]:
						responses[question._id] !== undefined
							? [...responses[question._id], value]
							: [value],
				};
			});
		}
	};

	const clearInputHandler = () => {
		setResponses((prev) => {
			return {
				...prev,
				[question._id]: [],
			};
		});
	};
	return (
		<div
			className={`border-2 bg-gray-300 border-gray-400 rounded-md shadow-md p-5 mt-5`}
		>
			{question && (
				<>
					<h1
						className={`${
							!dashboard ? "text-xl" : "text-[10px]"
						} mt-4 mb-2 font-semibold capitalize`}
					>
						{index}. {question.title}
						{question?.isRequired && <span className="text-red-500">*</span>}
					</h1>
					<hr />
				</>
			)}

			{question &&
				question.options.map((option, index) => {
					return (
						<div key={index} className="flex items-center my-2 ml-5 ">
							<label className="checkbox-container">
								{option.name}
								<input
									type="checkbox"
									value={option._id}
									checked={
										responses[question._id]?.length > 0 &&
										responses[question._id]?.includes(option._id)
									}
									required={
										question?.isRequired &&
										responses[question._id]?.length === 0
									}
									onChange={handleOptionChange}
									className="required:text-red-300"
								/>
								<span className="checkmark"></span>
							</label>
						</div>
					);
				})}

			{responses[question._id]?.length > 0 && (
				<div className="mt-5 text-right ">
					<span
						onClick={clearInputHandler}
						className="px-4 py-2 font-medium cursor-pointer text-purple-950"
					>
						Clear response
					</span>
				</div>
			)}
		</div>
	);
};

export default MultipleChoice;
