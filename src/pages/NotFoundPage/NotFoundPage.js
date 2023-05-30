import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
			<h1 className="text-6xl font-bold text-white mb-8">404</h1>
			<p className="text-2xl text-white mb-12">
				Oops! The page you're looking for could not be found.
			</p>
			<Link
				to="/"
				className="bg-white text-purple-500 font-bold py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300"
			>
				Go to Homepage
			</Link>
		</div>
	);
};

export default NotFoundPage;
