import React, { useContext, useState } from "react";
import CustomModal from "../../CustomModal/CustomModal";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";
import { DatePicker } from "antd";
import { removeUserFromCookies } from "../../../utils/user/functions";
import moment from "moment";
import { EventContext } from "../../../contexts/event-context";
import { toast } from "react-hot-toast";
import { getEventsByTitle } from "../../../utils/event/https";
import Navbar from "./Navbar";

const DashBoardHeader = () => {
	const { RangePicker } = DatePicker;
	const [isOpen, setIsOpen] = useState(false);
	const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("name");
	const [selectedTime, setSelectedTime] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [fetchEventsLoading, setFetchEventsLoading] = useState(false);
	const { user, setUser } = useContext(AuthContext);
	const { setTitle, setSearchDateRange, setEvents } = useContext(EventContext);
	const navigate = useNavigate();
	const [isOpenH, setIsOpenH] = useState(false);

	const toggleNavbar = () => {
		setIsOpenH(!isOpenH);
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleProfileDropDownButtonClick = () => {
		setIsProfileDropDownOpen((prev) => !prev);
	};

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

	const onChange = (value, dateString) => {
		// console.log("Selected Time: ", value);
		// console.log("Formatted Selected Time: ", dateString);
		setSelectedTime(dateString);
	};
	const onOk = (value) => {
		// console.log("onOk: ", value);
	};

	const searchHandler = async () => {
		const startTime = moment().format(selectedTime[0]);
		const endTime = moment().format(selectedTime[1]);
		if (selectedOption === "name") {
			navigate(`/search?q=${inputValue}`);
		} else {
			if (selectedTime.length === 2) {
				navigate(`/search?startDate=${startTime}&endDate=${endTime}`);
			} else {
				toast.error("search with date range");
			}
		}
	};

	if (fetchEventsLoading) {
		return <div>loading....</div>;
	}

	return (
		<>
			<nav className="bg-gray-800 py-2">
				<div className="mx-auto px-4 py-2 max-w-7xl sm:px-6 lg:px-8">
					<div className="flex justify-between items-center">
						<div className="flex w-[200px] items-center">
							<span className="text-white font-semibold text-lg">
								Daily event
							</span>
						</div>
						<div className="hidden w-full md:block">
							<div className="flex w-full items-center ml-4">
								<div className="flex justify-center flex-row w-full mx-10 items-center">
									{selectedOption === "name" ? (
										<input
											className="px-4 py-2 outline-none  mb-0 ring-0 border-0 focus:ring-0"
											type="search"
											value={inputValue}
											onChange={handleInputChange}
											placeholder="Search"
											style={{
												borderTopLeftRadius: 5,
												borderBottomLeftRadius: 5,
											}}
										/>
									) : (
										<RangePicker
											showTime={{
												format: "HH:mm",
											}}
											className="w-full"
											format="YYYY-MM-DD HH:mm"
											onChange={onChange}
											onOk={onOk}
										/>
									)}
									<select
										className="ring-0 focus:ring-0 outline-none border-0"
										value={selectedOption}
										onChange={handleSelectChange}
									>
										<option className="" value="name">
											Name
										</option>
										<option value="date">Date</option>
									</select>
									<button
										onClick={searchHandler}
										className="bg-purple-700 rounded-tr-md rounded-br-md hover:bg-purple-950 transition-all duration-300 ease-in-out  font-bold text-white py-2 px-2"
									>
										Search
									</button>
								</div>

								{user && user?._id && (
									<div
										className={` w-[200px] mr-10 flex cursor-pointer items-center px-3 rounded-md transition-all duration-700 hover:bg-purple-950 py-3  ${
											isOpen ? "bg-purple-950" : "bg-purple-700"
										}`}
										onClick={handleOpen}
									>
										<FaPlus className="w-4 h-4 mr-2 text-white" />
										<span className="text-sm text-white capitalize">
											create event
										</span>
									</div>
								)}

								{!user && !user?._id ? (
									<>
										<Link
											className="text-gray-300 hover:bg-gray-700 mx-10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
											to="/login"
										>
											Login
										</Link>

										<Link
											className="text-gray-300 hover:bg-gray-700 mr-10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
											to="/signup"
										>
											Register
										</Link>
									</>
								) : (
									<>
										<div className="relative inline-block text-left">
											<p
												onClick={handleProfileDropDownButtonClick}
												className="flex items-center justify-center w-12 h-12 text-xl text-white transition-all duration-300 bg-purple-700 border-2 border-transparent rounded-full cursor-pointer hover:border-white "
											>
												{user?.username.split(" ")[0].substring(0, 3)}
											</p>
											{isProfileDropDownOpen && (
												<div className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<div className="py-1">
														<Link
															to="/profile"
															className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
														>
															Profile
														</Link>
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
							</div>
						</div>
						<div className="-mr-2 flex md:hidden">
							<button
								onClick={toggleNavbar}
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded={isOpenH}
							>
								<span className="sr-only">Open main menu</span>
								{/* Icon when menu is closed. */}
								{/* Menu open: "hidden", Menu closed: "block" */}
								<svg
									className={`${isOpenH ? "hidden" : "block"} h-6 w-6`}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
								{/* Icon when menu is open. */}
								{/* Menu open: "block", Menu closed: "hidden" */}
								<svg
									className={`${isOpenH ? "block" : "hidden"} h-6 w-6`}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				<div
					className={`${isOpenH ? "block" : "hidden"} md:hidden`}
					id="mobile-menu"
				>
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<br />
						<div className="flex justify-center flex-row w-full  items-center">
							{selectedOption === "name" ? (
								<input
									className="px-4 py-2 outline-none  mb-0 ring-0 border-0 focus:ring-0"
									type="search"
									value={inputValue}
									onChange={handleInputChange}
									placeholder="Search"
									style={{
										borderTopLeftRadius: 5,
										borderBottomLeftRadius: 5,
									}}
								/>
							) : (
								<RangePicker
									showTime={{
										format: "HH:mm",
									}}
									className="w-full"
									format="YYYY-MM-DD HH:mm"
									onChange={onChange}
									onOk={onOk}
								/>
							)}
							<select
								className="ring-0 focus:ring-0 outline-none border-0"
								value={selectedOption}
								onChange={handleSelectChange}
							>
								<option className="" value="name">
									Name
								</option>
								<option value="date">Date</option>
							</select>
							<button
								onClick={searchHandler}
								className="bg-purple-700 rounded-tr-md rounded-br-md hover:bg-purple-950 transition-all duration-300 ease-in-out  font-bold text-white py-2 px-2"
							>
								Search
							</button>
						</div>
						{user && user?._id && (
							<>
								<br />
								<div
									className={`flex cursor-pointer  items-center mb-5 px-3 rounded-md transition-all duration-700 hover:bg-purple-950 py-3  ${
										isOpen ? "bg-purple-950" : "bg-purple-700"
									}`}
									onClick={handleOpen}
								>
									<FaPlus className="w-4 h-4 mr-2 text-white" />
									<span className="text-sm text-white capitalize">
										create event
									</span>
								</div>
							</>
						)}

						{!user && !user?._id ? (
							<>
								<br />
								<div className="  cursor-pointer bg-purple-700 px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 text-white">
									<Link className="block" to="/login">
										Login
									</Link>
								</div>
								<br />
								<div className=" bg-purple-700 cursor-pointer px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 text-white">
									<Link className="block" to="/signup">
										Register
									</Link>
								</div>
							</>
						) : (
							<>
								<br />
								<div className="cursor-pointer bg-purple-700 px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 text-white">
									<Link className="block" to="/profile">
										Profile
									</Link>
								</div>
								<br />
								<div
									onClick={logoutHandler}
									className="  cursor-pointer bg-purple-700 px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 text-white "
								>
									Logout
								</div>
							</>
						)}
					</div>
				</div>
			</nav>

			{/* <div className="flex items-center mx-auto justify-between w-full px-10 py-4 bg-purple-900">
				<ul className="flex items-center w-full  mx-auto justify-between">
					<li>
						<Link
							to="/"
							className="mr-5  text-xl font-bold text-white bg-purple-700 cursor-pointer px-6 transition-all duration-700 py-2 text-[16px] hover:underline rounded-md hover:bg-purple-950 "
						>
							Event
						</Link>
					</li>

					<li className="flex flex-row w-1/2 mx-10  items-center">
						{selectedOption === "name" ? (
							<input
								className="px-4 py-2 outline-none  mb-0 ring-0 border-0 focus:ring-0"
								type="search"
								value={inputValue}
								onChange={handleInputChange}
								placeholder="Search"
								style={{
									borderTopLeftRadius: 5,
									borderBottomLeftRadius: 5,
								}}
							/>
						) : (
							<RangePicker
								showTime={{
									format: "HH:mm",
								}}
								className="w-full"
								format="YYYY-MM-DD HH:mm"
								onChange={onChange}
								onOk={onOk}
							/>
						)}
						<select
							className="ring-0 focus:ring-0 outline-none border-0"
							value={selectedOption}
							onChange={handleSelectChange}
						>
							<option className="" value="name">
								Name
							</option>
							<option value="date">Date</option>
						</select>
						<button
							onClick={searchHandler}
							className="bg-purple-700 rounded-tr-md rounded-br-md hover:bg-purple-950 transition-all duration-300 ease-in-out  font-bold text-white py-2 px-2"
						>
							Search
						</button>
					</li>

					{user && user?._id && (
						<li
							className={`flex cursor-pointer items-center px-3 rounded-md transition-all duration-700 hover:bg-purple-950 py-3  ${
								isOpen ? "bg-purple-950" : "bg-purple-700"
							}`}
							onClick={handleOpen}
						>
							<FaPlus className="w-4 h-4 mr-2 text-white" />
							<span className="text-sm text-white capitalize">
								create event
							</span>
						</li>
					)}

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
									className="flex items-center justify-center w-12 h-12 text-xl text-white transition-all duration-300 bg-purple-700 border-2 border-transparent rounded-full cursor-pointer hover:border-white "
								>
									{user?.username.split(" ")[0].substring(0, 3)}
								</p>
								{isProfileDropDownOpen && (
									<div className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											<Link
												to="/profile"
												className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
											>
												Profile
											</Link>
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

			</div> */}
			<CustomModal isOpen={isOpen} handleClose={handleClose} />
		</>
	);
};

export default DashBoardHeader;
