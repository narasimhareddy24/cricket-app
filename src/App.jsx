import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from "@mantine/core";
import Home from './pages/Home';
import PlayersDetails from "./pages/PlayersDetails.jsx";
import Details from "./components/Details";
import MatchList from "./pages/Matchlist.jsx";
import Scorecard from "./pages/scorecard.jsx";


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
              <Link to="/">Home</Link> | <Link to="/matchlist">MatchList</Link> | <Link to="/scorecard"> Scorecard</Link> |
            </h2>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matchlist" element={<MatchList />} />
            <Route path="/playerDetails/:teamName" element={<PlayersDetails />} />
            <Route path="/details" element={<Details />} />
            <Route path="/scorecard" element={<Scorecard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;









