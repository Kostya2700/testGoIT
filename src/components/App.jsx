import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Tweets from "./Sweets";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweets" element={<Tweets />} />
      </Routes>
    </>
  );
}

export default App;
