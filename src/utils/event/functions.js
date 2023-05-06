export const upcomingDate = (date) => {
	const currDate = new Date();
	const targetDate = new Date(date);

	return targetDate >= currDate;
};

export const startEventCount = (startDate) => {
	let start = new Date(startDate);
	let date = new Date();
	let diff = start.getTime() - date.getTime();
	// console.log("start", diff);
	if (diff < 0) {
		return 0;
	}
	return diff;
};
export const endEventCount = (endDate) => {
	let end = new Date(endDate);
	let date = new Date();
	let diff = end.getTime() - date.getTime();
	// console.log("end", diff);
	if (diff < 0) {
		return 0;
	}
	return diff;
};
