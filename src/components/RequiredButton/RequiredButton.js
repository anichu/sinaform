import React from "react";
import "./RequiredButton.css";

const RequiredButton = ({ requiredButtonHandler, _id, requires }) => {
	function handleClick() {
		requiredButtonHandler(_id);
	}

	// console.log(requires);

	return (
		<div className="flex mt-2" onClick={() => handleClick(_id)}>
			<p className="mr-1 font-medium text-center text-purple-950">Required</p>
			<div className="switch">
				<div className={`switch-toggle ${requires[_id] ? "on" : "off"}`}>
					{requires[_id] ? "" : ""}
				</div>
			</div>
		</div>
	);
};

export default RequiredButton;
