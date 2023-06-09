import React, { useContext, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { AuthContext } from "../../contexts/auth-context";
import Time from "../Time/Time";

const UserResponse = ({ response, index }) => {
	const { user } = useContext(AuthContext);
	const userDetails = useUser(response.user, user?.token);
	const [dropDown, setDropDown] = useState(false);
	const clickHandler = () => {
		setDropDown((prev) => !prev);
	};
	return (
		<div
			onClick={clickHandler}
			className=" cursor-pointer hover:bg-slate-600 text-white py-2 px-2 bg-slate-500 my-2 rounded-md "
		>
			<div className="items-center flex justify-between">
				<p>
					<span>{index}.</span> {userDetails ? userDetails?.user?.email : ""}
				</p>
				<p>{userDetails ? userDetails?.user?.username : ""}</p>
				<p className="text-white">
					<Time time={response?.createdAt} />
				</p>
			</div>
			{dropDown && <div>{userDetails ? userDetails?.user?.email : ""}</div>}
		</div>
	);
};

export default UserResponse;
