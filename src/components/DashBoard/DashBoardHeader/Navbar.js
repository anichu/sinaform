import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isOpenH, setIsOpenH] = useState(false);

	const toggleNavbar = () => {
		setIsOpenH(!isOpenH);
	};

	return (
		<nav className="bg-gray-800">
			<div className="mx-auto px-4 py-2 max-w-7xl sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<span className="text-white font-semibold text-lg">
							Daily event
						</span>
					</div>
					<div className="hidden md:block">
						<div className="flex items-center ml-4">
							<Link
								to="/"
								className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>
								Home
							</Link>
							<Link
								to="/about"
								className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>
								About
							</Link>
							<Link
								to="/contact"
								className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>
								Contact
							</Link>
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
					<Link
						to="/"
						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
					>
						Home
					</Link>
					<Link
						to="/about"
						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
					>
						About
					</Link>
					<Link
						to="/contact"
						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
					>
						Contact
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
