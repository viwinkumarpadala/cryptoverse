import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
	Container,
	createTheme,
	TableCell,
	LinearProgress,
	ThemeProvider,
	Typography,
	TextField,
	TableBody,
	TableRow,
	TableHead,
	TableContainer,
	Table,
	Paper,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
	// This function wll give you the string with commas.
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
	// The entire Coins Table component.
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	// importing currency and symbol from CryptoState.
	const { currency, symbol } = CryptoState();

	const useStyles = makeStyles({
		row: {
			backgroundColor: "#16171a",
			cursor: "pointer",
			"&:hover": {
				backgroundColor: "#131111",
			},
			fontFamily: "Montserrat",
		},
		pagination: {
			"& .MuiPaginationItem-root": {
				color: "gold",
			},
		},
	});

	const classes = useStyles();

	// useNavigate is the alternative and also the new version for useHistory.
	const history = useNavigate();

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});

	const fetchCoins = async () => {
		// a Function to fetch coins.
		setLoading(true);

		// Making an API CALL.
		const { data } = await axios.get(CoinList(currency));
		console.log(data);

		setCoins(data);
		setLoading(false);
	};

	// As soon as the currency changes,
	// fetch the new coins.
	useEffect(() => {
		fetchCoins();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency]);

	// Returns the coins which are containing the sumbol or the name.
	const handleSearch = () => {
		return coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().includes(search)
		);
	};

	return (
		// ThemeProvider takes in the Theme.
		<ThemeProvider theme={darkTheme}>
			<Container style={{ textAlign: "center" }}>
				<Typography
					variant="h4"
					style={{ margin: 18, fontFamily: "Montserrat" }}>
					Cryptocurrency Prices by Market Cap
				</Typography>
				<TextField
					label="Search For a Crypto Currency.."
					variant="outlined"
					style={{ marginBottom: 20, width: "100%" }}
					// This will keep the search field.
					onChange={(e) => setSearch(e.target.value)}
				/>

				<TableContainer component={Paper}>
					{/* If loading, loading screen or else Table. */}
					{loading ? (
						<LinearProgress style={{ backgroundColor: "gold" }} />
					) : (
						<Table aria-label="simple table">
							<TableHead style={{ backgroundColor: "#EEBC1D" }}>
								<TableRow>
									{[
										"Coin",
										"Price",
										"24h Change",
										"Market Cap",
									].map((head) => (
										<TableCell
											style={{
												color: "black",
												fontWeight: "700",
												fontFamily: "Montserrat",
											}}
											key={head}
											align={
												head === "Coin" ? "" : "right"
											}>
											{head}
										</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody>
								{/* Whatever the search returns, we map it with the row. */}
								{handleSearch()
									.slice(
										(page - 1) * 10,
										(page - 1) * 10 + 10
									)
									.map((row) => {
										const profit =
											row.price_change_percentage_24h > 0;
										return (
											// <Link to={`/coins/${row.id}`}>
											<TableRow
												// When clicked the row, I need to see the button Details
												onClick = {() => {
													history(`/coins/${row.id}`);
												}}

												className={classes.row}
												key={row.name}>
												<TableCell
													// 1
													component="th"
													scope="row"
													style={{
														display: "flex",
														gap: 15,
													}}>
													<img
														src={row?.image}
														alt={row.name}
														height="50"
														style={{
															marginBottom: 10,
														}}
													/>
													<div
														style={{
															display: "flex",
															flexDirection:
																"column",
														}}>
														<span
															style={{
																textTransform:
																	"uppercase",
																fontSize: 22,
															}}>
															{row.symbol}
														</span>
														<span
															style={{
																color: "darkgrey",
															}}>
															{row.name}
														</span>
													</div>
												</TableCell>

												{/* Current price of the coin */}
												<TableCell align="right">
													{symbol}{" "}
													{numberWithCommas(
														row.current_price.toFixed(
															2
														)
													)}
												</TableCell>

												{/* Market Change */}
												<TableCell
													align="right"
													style={{
														color:
															profit > 0
																? "rgb(14, 203, 129)"
																: "red",
														fontWeight: 500,
													}}>
													{profit && "+"}
													{row.price_change_percentage_24h.toFixed(
														2
													)}
													%
												</TableCell>

												{/* Market Cap */}
												<TableCell align="right">
													{symbol}{" "}
													{numberWithCommas(
														row.market_cap
															.toString()
															.slice(0, -6)
													)}
												</TableCell>
											</TableRow>
											// </Link>
										);
									})}
							</TableBody>
						</Table>
					)}
				</TableContainer>

				{/* Comes from @material-ui/lab */}
				<Pagination
					count={(handleSearch()?.length / 10).toFixed(0)}
					style={{
						padding: 20,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
					classes={{ ul: classes.pagination }}
					onChange={(_, value) => {
						setPage(value);
						window.scroll(0, 450);
					}}
				/>
			</Container>
		</ThemeProvider>
	);
}
