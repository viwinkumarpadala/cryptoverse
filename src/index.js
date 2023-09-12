import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CryptoContext from "./CryptoContext";
import 'react-alice-carousel/lib/alice-carousel.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<CryptoContext>
				<App />
			</CryptoContext>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
