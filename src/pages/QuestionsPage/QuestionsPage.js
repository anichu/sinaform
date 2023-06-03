import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionsHeader from "../../components/QuestionsHeader/QuestionsHeader";
import QuestionsBody from "../../components/QuestionsBody/QuestionsBody";
import { useQuery } from "@tanstack/react-query";
import { getSingleEvent } from "../../utils/event/https";
import { AuthContext } from "../../contexts/auth-context";

const QuestionPage = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const { isLoading, data } = useQuery({
		queryKey: ["event", id],
		queryFn: async () => {
			const response = await getSingleEvent(id);
			return response.data || null;
		},
	});
	// console.log("🚀 ~ file: QuestionsPage.js:20 ~ QuestionPage ~ data:", data);

	useEffect(() => {
		if (user && data) {
			const idx = data.responses.findIndex(
				(response) => response.user === user._id
			);
			// console.log(idx);
			if (idx > -1) {
				navigate(`/event/responded/${id}`);
			}
		}
	}, [user, data, navigate, id]);

	if (isLoading) {
		return <div>Loading....</div>;
	}

	return (
		<div className="lg:w-[60%] md:w-[80%] w-[95%] mb-10 mx-auto">
			<QuestionsHeader
				title={data?.title}
				coverImage={data?.coverImage}
				description={data?.description}
			/>
			<QuestionsBody data={data} questions={data?.questions} />
		</div>
	);
};

export default QuestionPage;
