import { NavLink } from "react-router-dom";
import css from "../Home/Home.module.css";

const Home = () => {
  return (
    <>
      <div className="appDiv">
        <NavLink to="/tweets" className={css.navLink}>
          TWEETS
        </NavLink>
        <h1 className={css.title}>
          This home page tweets <span className={css.text}>STAND</span>
        </h1>
        <p className={css.page}>
          Please click tweets and follow you friends{" "}
          <span className={css.text}>With Ukraine</span>
        </p>
      </div>
    </>
  );
};
export default Home;
