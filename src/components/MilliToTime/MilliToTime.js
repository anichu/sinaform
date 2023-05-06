import React from "react";

const MilliToTime = ({ diff, previousDate, level }) => {
	const presentDate = new Date();
	console.log(diff);
	const seconds = () => {
		return parseInt(diff / 1000);
	};

	const minutes = () => {
		return parseInt(diff / 60000);
	};

	const hours = () => {
		return parseInt(diff / 3600000);
	};

	const days = () => {
		return parseInt(diff / (24 * 3600 * 1000));
	};

	const weeks = () => {
		return parseInt(diff / (24 * 3600 * 1000 * 7));
	};

	const months = () => {
		const presy = presentDate.getFullYear();
		const prevy = previousDate.getFullYear();
		const presm = presentDate.getMonth();
		const prevm = previousDate.getMonth();
		return parseInt(prevm + 12 * prevy - (presm + 12 * presy));
	};

	const years = () => {
		return previousDate.getFullYear() - presentDate.getFullYear();
	};
	var timeLaps = seconds();
	var dateOutput = "";
	if (timeLaps < 60) {
		dateOutput = timeLaps + " seconds";
	} else {
		timeLaps = minutes();
		if (timeLaps < 60) {
			dateOutput = timeLaps + " minutes";
		} else {
			timeLaps = hours();
			if (timeLaps < 24) {
				dateOutput = timeLaps + " hours";
			} else {
				timeLaps = days();

				if (timeLaps < 7) {
					dateOutput = timeLaps + " days";
				} else {
					timeLaps = weeks();

					if (timeLaps < 4) {
						dateOutput = timeLaps + " weeks";
					} else {
						timeLaps = months();
						if (timeLaps < 12) {
							dateOutput = timeLaps + " months";
						} else {
							timeLaps = years();
						}
					}
				}
			}
		}
	}

	console.log(dateOutput);
	return (
		<p className="font-bold text-sm text-black">
			{dateOutput} left to <span className="text-purple-950"> {level} </span>
		</p>
	);
};

export default MilliToTime;
