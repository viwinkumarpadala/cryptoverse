import React from "react";
import {
	AppBar,
	Container,
	createTheme,
	makeStyles,
	MenuItem,
	Select,
	ThemeProvider,
	Toolbar,
	Typography,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
	const useStyles = makeStyles({
		title: {
			color: "gold",
			flex: 1,
			fontFamily: "Montserrat",
			fontWeight: "bold",
			cursor: "pointer",
		},
	});

	const classes = useStyles();

	const history = useNavigate();

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});

	const { currency, setCurrency } = CryptoState();
	console.log(currency);

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color="transparent" position="static">
				<Container>
					<Toolbar>
						<Typography
							onClick={() => history.push("/")}
							className={classes.title}
							variant="h6">
							CryptoVerse
						</Typography>

						<Select
							variant="outlined"
							style={{
								width: 100,
								height: 40,
								marginRight: 15,
							}}
							value={currency}
							onChange={(event) => {
								setCurrency(event.target.value);
							}}>
							<MenuItem value={"USD"}>USD</MenuItem>
							<MenuItem value={"INR"}>INR</MenuItem>
						</Select>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};

export default Header;
