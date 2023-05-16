import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./contexts/auth-context";
import { Toaster } from "react-hot-toast";
import EventProvider from "./contexts/event-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<EventProvider>
					<RouterProvider router={router} />
					<Toaster />
				</EventProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
