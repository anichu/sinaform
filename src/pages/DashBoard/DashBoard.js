import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CustomModal from "../../components/CustomModal/CustomModal";
import DashBoardHeader from "../../components/DashBoard/DashBoardHeader/DashBoardHeader";
import { AuthContext } from "../../contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import { allEvents } from "../../utils/event/https";
import UpcomingEvents from "../../components/DashBoard/UpcomingEvents/UpcomingEvents";
import ExpiredEvent from "../../components/DashBoard/ExpiredEvent/ExpiredEvent";

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
		<>
			<DashBoardHeader />
			<UpcomingEvents events={events} dashboard />
			<ExpiredEvent />
		</>
	);
};

export default DashBoard;
