import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./contexts/auth-context";
import { Toaster } from "react-hot-toast";
import EventProvider from "./contexts/event-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
	return (
		<AuthProvider>
			<EventProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
				<Toaster />
			</EventProvider>
		</AuthProvider>
	);
}

export default App;
