import React, { useState } from "react";
import "./SignupPage.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const Signup = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Perform signup logic with formData
		console.log("Signup form data:", formData);
		// Reset form data
		setFormData({
			username: "",
			email: "",
			password: "",
		});
	};

	return (
		<div className="signup-container mt-20 ">
			<form className="signup-form w-1/2 bg-gray-400" onSubmit={handleSubmit}>
				<h1 className="text-center text-2xl ">Sign up</h1>
				<label className="text-left block">Username:</label>
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
				/>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<button className="bg-blue-800 button" type="submit">
					Sign up
				</button>
				<div className="signin-link mt-5 ">
					<span className="mr-2">Already have an account?</span>
					<Link to="/login" className="text-blue-800 hover:underline">
						Sign In
					</Link>{" "}
					{/* Link to Sign In page */}
				</div>
			</form>
		</div>
	);
};

export default Signup;
