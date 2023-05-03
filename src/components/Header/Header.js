import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ _id }) => {
	const handleCopyLink = () => {
		navigator.clipboard.writeText(
			`http://localhost:3000/event/questions/${_id}`
		);
		toast.success("Link Copied to Share");
	};

	return (
		<div className="bg-purple-950 top-0 shadow-md flex justify-between fixed w-full z-40 border-purple-950 border-2  rounded-sm">
			<div></div>
			<ul className="flex justify-center ">
				<li className="mx-5 text-[16px] cursor-pointer border-0 border-b-2 border-transparent   h-full block hover:border-purple-600 hover:text-purple-300 py-2  text-white">
					<a href="#" className="">
						Questions
					</a>
				</li>
				<li className="mx-5 text-[16px] cursor-pointer border-0 border-b-2 border-transparent   h-full block hover:border-purple-600 hover:text-purple-300 py-2  text-white">
					<a href="#">Response</a>
				</li>
			</ul>
			<div className="flex items-center mx-10">
				<Link
					target="_blank"
					to={`/event/questions/${_id}`}
					className="cursor-pointer w-8 text-white hover:text-purple-300 mr-3"
					title="Preview"
				>
					<FaEye />
				</Link>
				<span
					target="_blank"
					to={`/event/questions/${_id}`}
					className="cursor-pointer w-8 text-white hover:text-purple-300"
					title="Share"
					onClick={handleCopyLink}
				>
					<FaShare />
				</span>
			</div>
		</div>
	);
};

export default Header;
