import { useState } from "react";

const ShortAnswer = ({ question, index, setResponses, responses }) => {
	const changeTextHandler = (event) => {
		setResponses((prev) => {
			return {
				...prev,
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

	const onBlurTextHandler = (event) => {};
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
			<div
				style={{
					width: `calc(100% - 20px)`,
				}}
				className="mt-4 ml-5 capitalize rounded-md"
			>
				<textarea
					rows={4}
					className="w-full rounded-md"
					placeholder="Write...."
					value={responses[question?._id]}
					onChange={changeTextHandler}
					onBlur={onBlurTextHandler}
					required={question?.isRequired ? true : false}
				/>

				{responses[question?._id]?.length > 0 && (
					<div className="mt-5 text-right ">
						<span
							onClick={clearTextHandler}
							className="px-4 py-2 font-medium cursor-pointer text-purple-950"
						>
							Clear response
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShortAnswer;
