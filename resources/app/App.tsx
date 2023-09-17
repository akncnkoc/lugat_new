import Router from "./Router.tsx";
import ToastNotifications from "@/components/ToastNotifications";
import {BrowserRouter} from "react-router-dom";

function App() {
	return (
		<div className="block relative">
			<BrowserRouter>
				<Router/>
			</BrowserRouter>
			<ToastNotifications/>
		</div>
	);
}

export default App;
