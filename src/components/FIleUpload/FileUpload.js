import React, { useRef } from "react";
//
const FileUpload = ({ question, index }) => {
	const fileInputRef = useRef(null);
	const handleInputChange = (event) => {
		console.log(event.target.files[0]);
	};
	const handleButtonClick = () => {
		fileInputRef.current.click();
	};
	return (
		<div className="border-2 bg-gray-300 border-gray-400 rounded-md shadow-md p-5 mt-5">
			{question && (
				<>
					<h3 className="text-xl mt-4 mb-2 font-semibold capitalize">
						{index}. {question.title}
						{question?.isRequired && <span className="text-red-500">*</span>}
					</h3>
					<hr />
				</>
			)}
			<div
				style={{
					width: `calc(100% - 20px)`,
				}}
				className="mt-4 ml-5 capitalize rounded-md"
			>
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					onChange={handleInputChange}
				/>
				<div className="flex items-center">
					<span
						className="shadow-md h-10 bg-gray-500 cursor-pointer  text-blue-800 px-5 py-2 rounded-md"
						onClick={handleButtonClick}
					>
						Add File
					</span>
				</div>
			</div>
		</div>
	);
};

export default FileUpload;
