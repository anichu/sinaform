import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/user/https";
import { AuthContext } from "../../contexts/auth-context";
import "./LoginPage.css";
import { toast } from "react-hot-toast";
import { setUserToCookie } from "../../utils/user/functions";

const Login = () => {
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		//TODO:: Perform login logic with formData

		const data = await loginUser({
			email: formData?.email,
			password: formData?.password,
		});

		if (!data?.success) {
			toast.error(data?.message);
		}
		if (data?.data) {
			setUser(data.data);
			setUserToCookie(data.data);
			toast.success("User login 🚀");
			navigate(from, { replace: true });
		}

		//TODO:: Reset form data
		setFormData({
			email: "",
			password: "",
		});
	};

	return (
		<div className="signup-container mt-20">
			<form
				className="signup-form sm:w-1/2 w-[90%] bg-gray-400"
				onSubmit={handleSubmit}
			>
				<h1 className="text-center text-2xl ">Login</h1>
				<label>
					Email:
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit" className="bg-blue-800 button">
					Login
				</button>
				<div className="mt-3">
					<span className="mr-2">Don't have an account? </span>
					<Link className="text-blue-800 hover:underline" to="/signup">
						Sign Up
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
