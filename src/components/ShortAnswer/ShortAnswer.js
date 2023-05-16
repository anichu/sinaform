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
				/>

				{responses[question?._id]?.length > 0 && (
					<div className="text-right mt-5 ">
						<span
							onClick={clearTextHandler}
							className="cursor-pointer font-medium text-purple-950  px-4 py-2"
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
