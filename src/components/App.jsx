import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import Tweets from "./Sweets/Sweets";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/tweets" element={<Tweets />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;
