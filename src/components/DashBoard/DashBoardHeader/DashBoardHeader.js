import React, { useState } from "react";
import CustomModal from "../../CustomModal/CustomModal";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashBoardHeader = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};
	return (
		<div className="bg-purple-900 flex w-full px-10 py-2 justify-between items-center">
			<div className=" bg-white rounded-md" onClick={handleOpen}>
				<button
					className={`flex items-center px-3 rounded-md transition-all duration-700 hover:bg-purple-950 py-2  ${
						isOpen ? "bg-purple-950" : "bg-purple-700"
					}`}
				>
					<FaPlus className="w-4 h-4 mr-2 text-white" />
					<span className="text-white text-sm capitalize hover:underline">
						create event
					</span>
				</button>
			</div>
			<ul className="flex">
				<li className="mr-5 cursor-pointer bg-purple-700 px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 text-white">
					<Link to="/login">Login</Link>
				</li>
				<li className="mr-5 bg-purple-700 cursor-pointer px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 text-white">
					<Link to="/signup">Register</Link>
				</li>
			</ul>
			<CustomModal isOpen={isOpen} handleClose={handleClose} />
		</div>
	);
};

export default DashBoardHeader;
