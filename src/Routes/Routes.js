import { createBrowserRouter } from "react-router-dom";
import DashBoard from "../pages/DashBoard/DashBoard";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import MainLayout from "../layout/MainLayout";
import PrivateRoute from "./PrivateRoute";
import EventPage from "../pages/EventPage/EventPage";
import { getSingleEvent } from "../utils/event/https";
import QuestionsPage from "../pages/QuestionsPage/QuestionsPage";
import EventLayout from "../layout/EventLayout";
import EventResponsePage from "../pages/EventResponsePage/EventResponsePage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: (
					<PrivateRoute>
						<DashBoard />
					</PrivateRoute>
				),
			},
			{
				path: "/event/questions/:id",
				element: <QuestionsPage />,
				loader: async ({ params }) => getSingleEvent(params.id),
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
	{
		path: "/event",
		element: <EventLayout />,
		children: [
			{
				path: "/event/:id",
				element: <EventPage />,
				loader: async ({ params }) => getSingleEvent(params.id),
			},
			{
				path: "/event/response/:id",
				element: <EventResponsePage />,
				loader: async ({ params }) => getSingleEvent(params.id),
			},
		],
	},
]);
