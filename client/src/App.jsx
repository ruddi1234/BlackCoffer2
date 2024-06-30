import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import IntensityVsLikelihood from "./pages/IntensityVsLikelihood";
import RelevenceVsyear from "./pages/RelevenceVsyear";
import CountryVsTopic from "./pages/CountryVsTopic";
import RegionVsRelevance from "./pages/RegionVsRelevance";
import SiderBar2 from "./components/SiderBar2";
import TopicFilter from "./filters/topicFilter";
import RegionFilter from "./filters/regionFilter";
import SectorFilter from "./filters/sectorFilter";
import CountryFilter from "./filters/countryFilter";
import FullScreenDialog from "./components/DialogBox";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <SideBar />
        <SiderBar2 />
        <FullScreenDialog />
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

          {/* // filter routes */}
          <Route path="/topicfilter" element={<TopicFilter />} />
          <Route path="/regionfilter" element={<RegionFilter />} />
          <Route path="/countryfilter" element={<CountryFilter />} />
          <Route path="/sectorfilter" element={<SectorFilter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
