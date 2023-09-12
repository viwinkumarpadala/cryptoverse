import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import { makeStyles } from "@material-ui/core";

function App() {

  // Make styles is the hook from Material UI.
  // We use a function to give us the styles and then use it again to directly return an object

  const useStyles = makeStyles( () => (
    {
      App: {
        backgroundColor: '#14161a',
        color: 'white',
        minHeight: '100vh'
      }
    }
  ));

  const classes = useStyles();
  
	return (
		<div className={classes.App}>
			<Header></Header>
			<Routes>
				<Route path="/" element={<Homepage />} exact/>
				<Route path="/coins/:id" element={<CoinPage/>} />
			</Routes>
		</div>
	);
}

export default App;
