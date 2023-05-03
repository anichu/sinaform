import { createContext, useEffect, useReducer, useState } from "react";
import { getUserFromCookie } from "../utils/user/functions";

export const AuthContext = createContext({
	user: null,
	setUser: (user) => {},
	userLoading: true,
	setUserLoading: () => {},
});

const userReducer = (state, action) => {
	switch (action.type) {
		case "SET_USER":
			return action.payload;
		default:
			return state;
	}
};

const AuthProvider = ({ children }) => {
	const [user, dispatch] = useReducer(userReducer, null);
	const [userLoading, setUserLoading] = useState(true);

	useEffect(() => {
		async function init() {
			const userData = JSON.parse(getUserFromCookie());
			console.log(userData);
			setUser(userData);
		}
		init();
	}, []);

	function setUser(user) {
		dispatch({
			type: "SET_USER",
			payload: user,
		});
		setUserLoading(false);
	}

	const value = {
		user,
		setUser: setUser,
		userLoading,
		setUserLoading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
