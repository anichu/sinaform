import React from "react";

const DropDown = ({ question, index, responses, setResponses }) => {
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
		<div className="p-5 mt-5 bg-gray-300 border-2 border-gray-400 rounded-md shadow-md">
			{question && (
				<>
					<h1 className="mt-4 mb-2 text-xl font-semibold capitalize">
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
				className="mt-6 mb-4 ml-5 capitalize rounded-md"
				onChange={changeInputHandler}
				required={question?.isRequired ? true : false}
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
				<div className="mt-5 text-right ">
					<span
						onClick={clearInputTextHandler}
						className="px-4 py-2 font-semibold cursor-pointer text-purple-950"
					>
						Clear response
					</span>
				</div>
			)}
		</div>
	);
};

export default DropDown;
