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
import Responded from "../components/Responded/Responded";
import Response from "../components/Response/Response";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <DashBoard />,
			},
			{
				path: "/event/questions/:id",
				element: (
					<PrivateRoute>
						<QuestionsPage />
					</PrivateRoute>
				),
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
			{
				path: "/search",
				element: <DashBoard />,
			},
			{
				path: "/profile",
				element: <ProfilePage />,
			},
		],
	},
	{
		path: "/event",
		element: <EventLayout />,
		children: [
			{
				path: "/event/:id",
				element: (
					<PrivateRoute>
						<EventPage />
					</PrivateRoute>
				),
				loader: async ({ params }) => getSingleEvent(params.id),
			},
			{
				path: "/event/response/:id",
				element: (
					<PrivateRoute>
						<EventResponsePage />
					</PrivateRoute>
				),
				loader: async ({ params }) => getSingleEvent(params.id),
			},
		],
	},
	{
		path: "/event/responded/recorded",
		element: <Response />,
	},
	{
		path: "/event/responded/:id",
		element: <Responded />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
