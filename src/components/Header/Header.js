import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaShare } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Header = ({ _id }) => {
	const handleCopyLink = () => {
		navigator.clipboard.writeText(
			`http://localhost:3000/event/questions/${_id}`
		);
		toast.success("Link Copied to Share");
	};

	return (
		<div className="fixed top-0 z-40 flex justify-between w-full border-2 rounded-sm shadow-md bg-purple-950 border-purple-950">
			<div></div>
			<ul className="flex justify-center ">
				<li className="mx-5 text-[16px] cursor-pointer border-0 border-b-2 border-transparent   h-full block hover:border-purple-600 hover:text-purple-300 py-2  text-white">
					<NavLink
						className={({ isActive, isPending }) =>
							isActive
								? "text-purple-300 border-purple-600 border-b-2 hover:border-purple-950 py-2"
								: ""
						}
						to={`/event/${_id}`}
					>
						Questions
					</NavLink>
				</li>
				<li className="mx-5 text-[16px] cursor-pointer border-0 border-b-2 border-transparent   h-full block hover:border-purple-600 hover:text-purple-300 py-2  text-white">
					<NavLink
						className={({ isActive, isPending }) =>
							isActive
								? "text-purple-300 border-purple-600 border-b-2 hover:border-purple-950 py-2"
								: ""
						}
						to={`/event/response/${_id}`}
					>
						Response
					</NavLink>
				</li>
			</ul>
			<div className="flex items-center mx-10">
				<NavLink
					target="_blank"
					to={`/event/questions/${_id}`}
					className="w-8 mr-3 text-white cursor-pointer hover:text-purple-300"
					title="Preview"
				>
					<FaEye />
				</NavLink>
				<span
					target="_blank"
					to={`/event/questions/${_id}`}
					className="w-8 text-white cursor-pointer hover:text-purple-300"
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
