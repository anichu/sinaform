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
		<div className="p-5 mt-5 bg-gray-300 border-2 border-gray-400 rounded-md shadow-md">
			{question && (
				<>
					<h3 className="mt-4 mb-2 text-xl font-semibold capitalize">
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
					required={question?.isRequired ? true : false}
				/>
				<div className="flex items-center">
					<span
						className="h-10 px-5 py-2 text-blue-800 bg-gray-500 rounded-md shadow-md cursor-pointer"
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
