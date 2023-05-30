import React, { useContext, useRef, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import "./customModal.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/auth-context";
import { createEvent } from "../../utils/event/https";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");
const CustomModal = ({ isOpen, handleClose }) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const customStyles = {
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0.5)",
		},
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			// width: "60%",
			bottom: "auto",
			transform: "translate(-50%, -50%)",
			border: "none",
			borderRadius: "0.5rem",
			backgroundColor: "#fff",
			boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
			maxHeight: "90vh",
			padding: "0",
			position: "relative",
			overflow: "visible",
		},
	};

	const [formData, setFormData] = useState({
		endTime: "",
		startTime: "",
		title: "",
		description: "",
	});

	const [file, setFile] = useState("");
	const [fileUploadLoading, setFileUploadLoading] = useState(false);

	const fileInputRef = useRef(null);

	const handleInputChange = async (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		const url = `https://api.imgbb.com/1/upload?key=64deb29335f3fa3ae256436ac8b59168`;
		try {
			setFileUploadLoading(true);
			const { data: imgData } = await axios.post(url, formData);
			console.log(imgData);
			if (!imgData?.success) {
				toast.error("File doesn't uploaded");
				return;
			}
			setFile(imgData?.data?.url);
			setFileUploadLoading(false);
		} catch (error) {
			console.log(error);
			setFileUploadLoading(false);
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};
	const submitHandler = async (event) => {
		event.preventDefault();

		if (
			!formData.title ||
			!formData.description ||
			!formData.endTime ||
			!formData.startTime
		) {
			toast.error("Please fill the empty input");
			return;
		}

		const createEventData = {
			user: user?._id,
			title: formData?.title,
			description: formData?.description,
			coverImage: file,
			endEvent: formData.endTime,
			startEvent: formData.startTime,
		};
		const eventData = await createEvent(createEventData);
		if (eventData?.success) {
			toast.success("event created");
			navigate(`/event/${eventData?.data?._id}`);
		}
		console.log("event", eventData);
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};
	return (
		<motion.div
			className="modal"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<Modal
				isOpen={isOpen}
				onRequestClose={handleClose}
				contentLabel="create event"
				style={customStyles}
				className="lg:w-[70%]  md:w-[80%] w-[95%]"
			>
				<div className=" rounded-lg bg-[#130f40] w-full p-5 ">
					<h2 className="text-3xl text-center mb-5 text-white  font-semibold">
						Create Event
					</h2>

					<span
						className="absolute -top-3 -right-3 cursor-pointer rounded-full bg-red-700"
						onClick={handleClose}
					>
						<FiX className="w-10 h-10 text-white font-semibold" />
					</span>
					<form className="flex flex-col">
						<div className="w-full">
							<input
								className="bg-gray-100  mb-4 py-2 px-3 w-full rounded-md shadow-sm"
								type="text"
								placeholder="title"
								value={formData?.title}
								name="title"
								onChange={handleChange}
								required
							/>
						</div>
						<div className="w-full">
							<textarea
								name="description"
								id=""
								className="bg-gray-100 py-2 px-3 w-full rounded-md shadow-sm"
								placeholder="description"
								rows="5"
								value={formData?.description}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex justify-between items-center">
							<div className="w-1/2">
								<label
									className="text-lg block text-white py-3 font-semibold"
									htmlFor="datetime-picker"
								>
									start date and time:
								</label>
								<input
									id="datetime-picker"
									type="datetime-local"
									className="w-[95%]  rounded-md hover:border-gray-800"
									value={formData?.startTime}
									onChange={handleChange}
									name="startTime"
								/>
							</div>
							<div className="w-1/2 ">
								<label
									className="text-lg block text-white py-3 font-semibold"
									htmlFor="datetime-picker"
								>
									end date and time:
								</label>
								<input
									id="datetime-picker"
									type="datetime-local"
									value={formData?.endTime}
									onChange={handleChange}
									name="endTime"
									className="w-full  rounded-md  hover:border-gray-800"
								/>
							</div>
						</div>
						<div className="">
							<p className="text-lg py-3 font-semibold text-white">
								Cover Image:{" "}
							</p>
							<input
								type="file"
								ref={fileInputRef}
								style={{ display: "none" }}
								onChange={handleInputChange}
							/>
							<div className="flex cursor-pointer items-center">
								<span
									className="bg-white shadow-md h-10  text-blue-800 px-5 py-2 rounded-md"
									onClick={handleButtonClick}
								>
									{fileUploadLoading ? "Loading..." : "	Add File"}
								</span>
								{file && (
									<img
										src={file}
										alt=""
										className="w-40 h-20 ml-10 rounded-md"
									/>
								)}
							</div>
						</div>

						<div className="text-center">
							<button
								type="submit"
								onClick={submitHandler}
								disabled={fileUploadLoading}
								className="bg-white shadow-md hover:bg-gray-200 text-blue-800 px-5 py-2 rounded-md mt-3"
							>
								create event
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</motion.div>
	);
};

export default CustomModal;
