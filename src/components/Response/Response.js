import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../../utils/event/https";
import QuestionsHeader from "../QuestionsHeader/QuestionsHeader";

const Response = () => {
	const { id } = useParams();
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
		<div className="w-[60%] mx-auto mt-10">
			<QuestionsHeader
				title={data?.title}
				coverImage={data?.coverImage}
				description={data?.description}
				responded
			/>
			<div className="p-5 bg-green-300 border-2 border-t-8 border-purple-900 rounded-md">
				<p className="text-xl font-semibold text-center text-green-950">
					Your response has been recorded.
				</p>
			</div>
		</div>
	);
};

export default Response;
