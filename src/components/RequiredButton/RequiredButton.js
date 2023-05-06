import React from "react";
import "./RequiredButton.css";
import { useState } from "react";

const RequiredButton = () => {
	const [isOn, setIsOn] = useState(false);

	function handleClick() {
		setIsOn(!isOn);
	}

	return (
		<div className="flex mt-2" onClick={handleClick}>
			<p className="mr-1 text-purple-950 font-medium">Required</p>
			<div className="switch">
				<div className={`switch-toggle ${isOn ? "on" : "off"}`}>
					{isOn ? "" : ""}
				</div>
			</div>
		</div>
	);
};

export default RequiredButton;
