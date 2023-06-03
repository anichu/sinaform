export const currentDate = (startDate, endDate) => {
	const currDate = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);
	return currDate >= start && currDate <= end;
};
export const upcomingDate = (startDate, endDate) => {
	const currDate = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);
	// console.log("sina-up", currDate >= start && currDate <= end);
	return end >= currDate && !currentDate(startDate, endDate);
};

export const expiredDate = (date) => {
	const currDate = new Date();
	const targetDate = new Date(date);
	// console.log(currDate > targetDate);
	return currDate > targetDate;
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
