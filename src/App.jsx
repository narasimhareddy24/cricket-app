import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from "@mantine/core";
import Home from './pages/Home';
import PlayersDetails from "./pages/PlayersDetails.jsx";
import Details from "./components/Details";
import MatchList from "./pages/Matchlist.jsx";
import Scorecard from "./pages/scorecard.jsx";
import Rankings from "./pages/Rankings.jsx";
import "./App.css";
import React from "react";
const theme = createTheme({
  colorScheme: 'light',
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <div>

          <nav>
            <h2>
              <Link to="/">Home</Link> |
              <Link to="/matchlist">CRICBUZZ</Link>
              {/* <Link to="/scorecard"> Scorecard</Link> */}
              <Link to="/rankings">Rankings</Link>
            </h2>
          </nav>


          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/matchlist" element={<MatchList />} />
              <Route path="/playerDetails/:teamName" element={<PlayersDetails />} />
              <Route path="/details" element={<Details />} />
              <Route path="/scorecard" element={<Scorecard />} />
              <Route path="/scorecard/:matchId" element={<Scorecard />} />
              <Route path="/rankings" element={<Rankings />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
