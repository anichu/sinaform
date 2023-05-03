import Cookies from "js-cookie";
export const setUserToCookie = (user) => {
	Cookies.set("event-user", JSON.stringify(user), { expires: 30, path: "/" });
};

export const getUserFromCookie = () => {
	return Cookies.get("event-user");
};

export const removeUserFromCookies = () => {
	Cookies.remove("event-user");
};
