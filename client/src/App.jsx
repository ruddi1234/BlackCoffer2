import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import IntensityVsLikelihood from "./pages/IntensityVsLikelihood";
import RelevenceVsyear from "./pages/RelevenceVsyear";
import CountryVsTopic from "./pages/CountryVsTopic";
import RegionVsRelevance from "./pages/RegionVsRelevance";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <SideBar />
        <Routes>
          <Route
            path="/intensity-vs-likelihood"
            element={<IntensityVsLikelihood />}
          ></Route>
          <Route
            path="/relevance-vs-year"
            element={<RelevenceVsyear />}
          ></Route>
          <Route path="/country-vs-topic" element={<CountryVsTopic />}></Route>
          <Route
            path="/region-vs-relevance"
            element={<RegionVsRelevance />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
