import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { user } = useContext(AuthContext);
	const location = useLocation();
	console.log(user);
	if (!user) {
		return <div>loading</div>;
	}
	if (user) {
		return children;
	}

	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
