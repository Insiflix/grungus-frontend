import React from "react";
import ReactDOM from "react-dom/client";
import AppWithSockets from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppWithSockets />
	</React.StrictMode>
);
