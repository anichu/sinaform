import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSingleEvent } from "../../utils/event/https";
import { useLocation, useParams } from "react-router-dom";
import QuestionsHeader from "../QuestionsHeader/QuestionsHeader";

const Responded = () => {
	const { id } = useParams();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const q = searchParams.get("q");
	// console.log(location);
	// console.log(searchParams.get("q"));
	const { isLoading, data } = useQuery({
		queryKey: ["event", id],
		queryFn: async () => {
			const response = await getSingleEvent(id);
			return response.data || null;
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="lg:w-[60%] md:w-[80%] w-[95%] mx-auto mt-10">
			<QuestionsHeader
				title={data?.title}
				coverImage={data?.coverImage}
				description={data?.description}
				responded
			/>
			<div className="p-5 bg-green-300 border-2 border-t-8 border-purple-900 rounded-md">
				<p className="text-xl font-semibold text-center text-green-950">
					{q
						? "Your response is recorded"
						: "You already responded to this event."}
				</p>
			</div>
		</div>
	);
};

export default Responded;
