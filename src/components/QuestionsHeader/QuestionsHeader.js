import React from "react";

const QuestionsHeader = ({ title, coverImage, description, responded }) => {
	return (
		<header className="my-2">
			{coverImage && (
				<div className="h-[200px] shadow-md ">
					<img
						src={coverImage}
						className="object-fill w-full h-full rounded-md"
						alt={title}
					/>
				</div>
			)}

			<div className="p-2 my-2 bg-gray-300 border-2 border-t-8 rounded-md border-purple-950">
				<h1 className="mb-2 text-2xl capitalize">{title}</h1>
				<hr />
				<p className="text-[16px] mt-2">{description}</p>
			</div>
			<div>
				{!responded && (
					<p className="font-semibold text-red-700">
						* Indicates required question
					</p>
				)}
			</div>
		</header>
	);
};

export default QuestionsHeader;
