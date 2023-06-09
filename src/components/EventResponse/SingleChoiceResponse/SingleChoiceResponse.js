import { calcLength } from "framer-motion";
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const SingleChoiceResponse = ({ title, questionId, responses }) => {
	// console.log(responses);
	// const data01 = [
	// 	{
	// 		name: "Group A",
	// 		value: 400,
	// 	},
	// 	{
	// 		name: "Group B",
	// 		value: 300,
	// 	},
	// 	{
	// 		name: "Group C",
	// 		value: 300,
	// 	},
	// 	{
	// 		name: "Group D",
	// 		value: 200,
	// 	},
	// 	{
	// 		name: "Group E",
	// 		value: 278,
	// 	},
	// 	{
	// 		name: "Group F",
	// 		value: 189,
	// 	},
	// ];
	// const data02 = [
	// 	{
	// 		name: "Group A",
	// 		value: 2400,
	// 	},
	// 	{
	// 		name: "Group B",
	// 		value: 4567,
	// 	},
	// 	{
	// 		name: "Group C",
	// 		value: 1398,
	// 	},
	// 	{
	// 		name: "Group D",
	// 		value: 9800,
	// 	},
	// 	{
	// 		name: "Group E",
	// 		value: 3908,
	// 	},
	// 	{
	// 		name: "Group F",
	// 		value: 4800,
	// 	},
	// ];

	const data01 = [
		{
			name: "female",
			value: 40.3,
		},
		{
			name: "female",
			value: 20.3,
		},
		{
			name: "female",
			value: 200,
		},
	];
	return (
		<div>
			<h3 className="font-semibold text-xl">{title}</h3>

			{responses?.map((response, index) => {
				if (response?.responses === undefined) {
					return null;
				}

				return (
					<div key={index}>
						<p>{response?.responses[questionId]}</p>
					</div>
				);
			})}
		</div>
	);
};

export default SingleChoiceResponse;
