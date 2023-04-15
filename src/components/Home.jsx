import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="appDiv">
        <NavLink to="/tweets">tweets</NavLink>
      </div>
    </>
  );
};
export default Home;
