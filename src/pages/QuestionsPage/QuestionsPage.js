import React from "react";
import { useLoaderData } from "react-router-dom";
import QuestionsHeader from "../../components/QuestionsHeader/QuestionsHeader";
import QuestionsBody from "../../components/QuestionsBody/QuestionsBody";

const QuestionPage = () => {
	const { data } = useLoaderData();
	return (
		<div className="w-[60%] mx-auto">
			<QuestionsHeader
				title={data?.title}
				coverImage={data?.coverImage}
				description={data?.description}
			/>
			<QuestionsBody questions={data?.questions} />
		</div>
	);
};

export default QuestionPage;
