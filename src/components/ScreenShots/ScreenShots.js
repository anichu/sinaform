import React, { createRef } from "react";
import QuestionsHeader from "../QuestionsHeader/QuestionsHeader";
import QuestionsBody from "../QuestionsBody/QuestionsBody";
import { useScreenshot } from "use-react-screenshot";

const ScreenShots = () => {
	const ref = createRef(null);
	const [image, takeScreenshot] = useScreenshot();
	const getImage = () => takeScreenshot(ref.current);
	return (
		<div ref={ref}>
			<QuestionsHeader />
			<QuestionsBody />
		</div>
	);
};

export default ScreenShots;
