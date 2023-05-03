import React from "react";

const QuestionsHeader = ({ title, coverImage, description }) => {
	return (
		<header className="my-2">
			{coverImage && (
				<div className="h-[200px] shadow-md ">
					<img
						src={coverImage}
						className="w-full h-full object-fill rounded-md"
						alt={title}
					/>
				</div>
			)}

			<div className="rounded-md border-2 border-t-8 bg-gray-300 border-purple-950 my-2 p-2">
				<h1 className="text-2xl mb-2 capitalize">{title}</h1>
				<hr />
				<p className="text-[16px] mt-2">{description}</p>
			</div>
		</header>
	);
};

export default QuestionsHeader;
