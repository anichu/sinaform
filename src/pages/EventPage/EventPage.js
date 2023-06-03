import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import EventHeader from "../../components/EventHeader/EventHeader";
import { FaPlus } from "react-icons/fa";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { EventContext } from "../../contexts/event-context";
import Questions from "../../components/Questions/Questions";
import { updateEvent } from "../../utils/event/https";
import { AuthContext } from "../../contexts/auth-context";

const EventPage = () => {
	const [inputType, setInputType] = useState("");
	const eventData = useLoaderData();
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const { setEvent, event, setEventSaveLoading, eventSaveLoading } =
		useContext(EventContext);

	useEffect(() => {
		if (eventData) {
			setEvent(eventData?.data);
		}
	}, [eventData, setEvent]);

	if (user?._id !== event?.user) {
		navigate("/");
	}

	const options = [
		{ value: "multipleChoice", label: "multiple choices" },
		{ value: "singleChoice", label: "Single Choice" },
		{ value: "dropDown", label: "Drop down" },
		{ value: "fileUpload", label: "File upload" },
		{ value: "shortAnswer", label: "short answer" },
	];

	const submitButton = async () => {
		const _id = uuidv4();

		if (!inputType) {
			return;
		}
		const createQuestion = {
			_id: _id,
			title: "",
			options: [],
			type: inputType,
			isRequired: false,
		};
		const questions = event.questions;
		questions.push(createQuestion);
		// setIsOpen(false);
		// console.log(createQuestion);
		let alteredEvent;
		setEvent((prev) => {
			alteredEvent = {
				...prev,
				questions: questions,
			};
			return alteredEvent;
		});
		setEventSaveLoading(true);
		await updateEvent(id, alteredEvent);
		setEventSaveLoading(false);
		window.scrollTo(0, document.body.scrollHeight + 100);
	};

	const selectChangeHandler = (event) => {
		const inputType = event.value;
		setInputType(inputType);
	};

	const saveButtonHandler = async () => {
		setEventSaveLoading(true);
		await updateEvent(id, event);
		setEventSaveLoading(false);
	};

	// console.log(event);

	return (
		<div>
			<div>
				<EventHeader
					title={event?.title}
					description={event?.description}
					coverImage={event?.coverImage}
				/>
				<Questions />

				<div className="lg:w-[70%]  md:w-[80%] w-[95%] flex justify-end mx-auto my-4 bg-gray-300 p-3 rounded-md shadow-md">
					{/* TODO::SAVE BUTTON  */}
					<button
						onClick={saveButtonHandler}
						className={`w-[18%] text-white rounded-md hover:bg-purple-800 ${
							eventSaveLoading ? "bg-purple-700" : "bg-purple-950"
						} bg-purple-950 h-10 mt-2`}
					>
						{eventSaveLoading ? "saving..." : "save"}
					</button>
					{/* TODO::SELECT INPUT */}
					<div className="mb-5 w-[80%] flex  ml-auto ">
						<div className="flex-1">
							<Select
								options={options}
								isSearchable={false}
								className="mt-2 border-r-0 rounded-none"
								autoFocus={true}
								onChange={selectChangeHandler}
								styles={{
									control: (baseStyles, state) => ({
										...baseStyles,
										borderColor: state.isFocused ? "blue" : "grey",
										borderTopRightRadius: 0,
										borderBottomRightRadius: 0,
										maxHeight: 200,
									}),
								}}
							/>
						</div>

						<button
							className="flex items-center h-10 px-4 py-2 mt-2 rounded-md rounded-l-none bg-purple-950"
							onClick={submitButton}
						>
							<FaPlus className="w-6 h-6 text-white" />
							<span className="ml-2 text-white shadow-md">add</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventPage;
