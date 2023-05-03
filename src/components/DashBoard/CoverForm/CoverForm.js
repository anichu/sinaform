import "./CoverForm.css";
const CoverForm = ({ coverImage, title, description }) => {
	return (
		<div className="p-5 bg-gray-400 rounded-t-md h-[150px] ">
			{coverImage ? (
				<div>
					<img src={coverImage} className="w-full h-10 rounded-md" alt="" />
				</div>
			) : (
				<div className="w-full h-10 rounded-md bg-purple-500"></div>
			)}

			<div className="bg-gray-600 border-t-8 cover-form-header pl-4 border-t-purple-950 rounded-md px-2 py-1 mt-1">
				<h6 className="text-[10px] capitalize">{title}</h6>
				<p className="text-[8px] break-words text-justify">
					{`${description.substring(0, 100)} ${
						description.length > 100 && " ...."
					}`}
				</p>
			</div>
		</div>
	);
};

export default CoverForm;
