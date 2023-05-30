import React, { useState } from "react";
import "./SignupPage.css"; // Import the CSS file for styling
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/user/https";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { setUserToCookie } from "../../utils/user/functions";
import { toast } from "react-hot-toast";

const Signup = () => {
	const { setUser, setUserLoading } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		//TODO:: Perform signup logic with formData
		// console.log("Signup form data:", formData);
		const data = await registerUser(formData);
		if (data?.success) {
			setUser(data?.data);
			setUserToCookie(data.data);
			toast.success("User login 🚀");
			navigate(from, { replace: true });
		} else {
			toast.error(data?.message);
		}
		// console.log(data);
		// TODO::USER LOADING FALSE
		setUserLoading(false);
		//TODO:: Reset form data
		setFormData({
			username: "",
			email: "",
			password: "",
		});
	};

	return (
		<div className="mt-20 signup-container ">
			<form
				className="sm:w-1/2 w-[90%] bg-gray-400 signup-form"
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl text-center ">Sign up</h1>
				<label className="block text-left">Username:</label>
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
				<div className="mt-5 signin-link ">
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
