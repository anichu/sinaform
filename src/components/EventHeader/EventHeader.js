import React from "react";
import "./EventHeader.css";

const CoverImage = ({ image }) => {
	return (
		<div className="lg:w-[70%]  md:w-[80%] w-[95%] h-[200px] mx-auto my-5 shadow-md rounded-md">
			{image ? (
				<img
					src={image}
					alt=""
					className="w-full h-full object-cover rounded-md shadow-md"
				/>
			) : (
				<div className="w-full h-full object-cover rounded-md bg-[#130f40] border-t-[20px] border-purple-950 shadow-md"></div>
			)}
		</div>
	);
};

const Title = ({ title, description }) => {
	return (
		<div className="lg:w-[70%]  md:w-[80%] w-[95%] event-header bg-gray-300 min-h-[200px] border-t-[30px] border-t-[#582A29] mx-auto border-transparent shadow-md visible rounded-md ">
			<h1 className="text-left capitalize ml-[35px] text-3xl mt-2 font-semibold ">
				{title}
			</h1>
			<hr className="mt-2" />
			<p className="text-left ml-[35px] text-[16px] mt-2">{description}</p>
		</div>
	);
};
const EventHeader = ({ title, coverImage, description }) => {
	return (
		<div className="mt-16 ">
			{coverImage && <CoverImage image={coverImage} />}

			<Title title={title} description={description} />
		</div>
	);
};

export default EventHeader;
