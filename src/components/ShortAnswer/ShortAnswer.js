import React from "react";

const ShortAnswer = ({ question, index }) => {
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
				/>
			</div>
		</div>
	);
};

export default ShortAnswer;
