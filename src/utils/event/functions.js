export const upcomingDate = (date) => {
	const currDate = new Date();
	const targetDate = new Date(date);

	return targetDate >= currDate;
};
