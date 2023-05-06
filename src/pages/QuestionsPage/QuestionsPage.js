import React from "react";
import { useLoaderData } from "react-router-dom";
import QuestionsHeader from "../../components/QuestionsHeader/QuestionsHeader";
import QuestionsBody from "../../components/QuestionsBody/QuestionsBody";

const QuestionPage = () => {
	const { data } = useLoaderData();
	return (
		<div className="w-[60%] mb-10 mx-auto">
			<QuestionsHeader
				title={data?.title}
				coverImage={data?.coverImage}
				description={data?.description}
			/>
			<QuestionsBody questions={data?.questions} />
			<div className="mt-5 flex items-center justify-between">
				<button className="bg-purple-950 hover:bg-purple-900 transition-all duration-300 px-5 border-2 border-purple-950 hover:border-purple-900 shadow-md py-1 text-white rounded-md">
					Submit
				</button>
				<p className="text-purple-950 font-semibold cursor-pointer">
					Clear form
				</p>
			</div>
		</div>
	);
};

export default QuestionPage;
