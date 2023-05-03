import React, { useContext } from "react";
import DashBoardHeader from "../../components/DashBoard/DashBoardHeader/DashBoardHeader";
import { AuthContext } from "../../contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import { allEvents } from "../../utils/event/https";
import UpcomingEvents from "../../components/DashBoard/UpcomingEvents/UpcomingEvents";
import ExpiredEvent from "../../components/DashBoard/ExpiredEvent/ExpiredEvent";
import ExpiredEvents from "../../components/DashBoard/ExpiredEvents/ExpiredEvents";

const DashBoard = () => {
	const { user } = useContext(AuthContext);

	const { data: events = [] } = useQuery({
		queryKey: ["events", "all", user?._id],
		queryFn: async () => {
			const data = await allEvents(user?._id);
			console.log(data);
			if (data.data) {
				return data.data;
			} else {
				return [];
			}
		},
	});

	return (
		<div className="pb-10">
			<DashBoardHeader />
			{events && events.length > 0 && (
				<UpcomingEvents events={events} dashboard />
			)}
			{events && events.length > 0 && (
				<ExpiredEvents events={events} dashboard />
			)}
		</div>
	);
};

export default DashBoard;
