import React, { useContext, useState } from "react";
import CustomModal from "../../CustomModal/CustomModal";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";
import { removeUserFromCookies } from "../../../utils/user/functions";

const DashBoardHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);

	const handleProfileDropDownButtonClick = () => {
		setIsProfileDropDownOpen((prev) => !prev);
	};
	const { user, setUser } = useContext(AuthContext);

	console.log(user);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const logoutHandler = () => {
		setUser(null);
		removeUserFromCookies();
	};
	return (
		<div className="flex items-center justify-between w-full px-10 py-2 bg-purple-900">
			<div className="flex items-center">
				<Link
					to="/"
					className="px-3 mr-20 text-xl font-bold text-white rounded-md "
				>
					Event
				</Link>

				{user && user?._id && (
					<div className="bg-white rounded-md " onClick={handleOpen}>
						<button
							className={`flex items-center px-3 rounded-md transition-all duration-700 hover:bg-purple-950 py-2  ${
								isOpen ? "bg-purple-950" : "bg-purple-700"
							}`}
						>
							<FaPlus className="w-4 h-4 mr-2 text-white" />
							<span className="text-sm text-white capitalize hover:underline">
								create event
							</span>
						</button>
					</div>
				)}
			</div>
			<ul className="flex">
				{!user && !user?._id ? (
					<>
						<li className="mr-5 cursor-pointer bg-purple-700 px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 text-white">
							<Link to="/login">Login</Link>
						</li>
						<li className="mr-5 bg-purple-700 cursor-pointer px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 text-white">
							<Link to="/signup">Register</Link>
						</li>
					</>
				) : (
					<>
						<div className="relative inline-block text-left">
							<p
								onClick={handleProfileDropDownButtonClick}
								className="flex items-center justify-center w-10 h-10 text-xl text-white transition-all duration-300 bg-purple-700 border-2 border-transparent rounded-full cursor-pointer hover:border-white "
							>
								{user?.username.split(" ")[0].substring(0, 3)}
							</p>
							{isProfileDropDownOpen && (
								<div className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="py-1">
										<a
											href="#"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
										>
											Settings
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
										>
											Help
										</a>
									</div>
									<div className="py-1">
										<span
											onClick={logoutHandler}
											className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
										>
											Logout
										</span>
									</div>
								</div>
							)}
						</div>
					</>
				)}
			</ul>
			<CustomModal isOpen={isOpen} handleClose={handleClose} />
		</div>
	);
};

export default DashBoardHeader;
