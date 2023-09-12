import React, { createContext, useContext, useEffect, useState } from "react";

// We are creating a new context here but without any defined default values
const Crypto = createContext();

const CryptoContext = ({ children }) => {

	const [currency, setCurrency] = useState("INR");
	const [symbol, setSymbol] = useState("₹");

	// whenever currency changes, this will run
	useEffect(() => {
		if (currency === "INR") setSymbol("₹");
		else if (currency === "USD") setSymbol("$");
	}, [currency]);

	return (
		<Crypto.Provider value={{ currency, setCurrency, symbol }}>
			{/* This will be rendered whenever the value prop changes
			Here in the case, it is currency, setCurrency, symbol*/}
			{children}
		</Crypto.Provider>
	);
};

export default CryptoContext;

export const CryptoState = () => {
	// useContext returns the state object.
	// What does it contain? 
	return useContext(Crypto);
};
