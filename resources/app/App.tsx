import Router from "./Router";
import ToastNotifications from "@/components/ToastNotifications";
import {BrowserRouter} from "react-router-dom";

function App() {
	return (
		<div className="relative flex-1 h-full flex flex-col">
			<BrowserRouter>
				<Router/>
			</BrowserRouter>
			<ToastNotifications/>
		</div>
	);
}

export default App;
