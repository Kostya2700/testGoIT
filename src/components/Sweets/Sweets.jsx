import { useDispatch, useSelector } from "react-redux";
import { getStateUser, getIsLoading } from "../../redux/selectors";
import { fetchUser } from "../../redux/operation";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Sweets.module.css";
import ReactPaginate from "react-paginate";
import { GridLoader } from "react-spinners";
import { FILTER_OPTIONS } from "../../utilites/filter";

const Tweets = () => {
  const arrContacts = useSelector(getStateUser);
  const usersSpinner = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const [followCounts, setFollowCounts] = useState(
    JSON.parse(localStorage.getItem("followCounts")) || {}
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const contactsPerPage = 8;
  const pagesVisited = pageNumber * contactsPerPage;

  const followCount = (idUser) => {
    const newFollowCounts = { ...followCounts };
    const followCountForUser = newFollowCounts[idUser] || 0;
    const isFollowing = followCountForUser % 2 === 1;
    newFollowCounts[idUser] = isFollowing
      ? followCountForUser - 1
      : followCountForUser + 1;
    setFollowCounts(newFollowCounts);
    localStorage.setItem("followCounts", JSON.stringify(newFollowCounts));
  };
  const filteredContacts = arrContacts.filter(({ id }) => {
    const followCountForUser = followCounts[id] || 0;
    switch (filter) {
      case "follow":
        return followCountForUser % 2 === 0;
      case "following":
        return followCountForUser % 2 === 1;
      default:
        return true;
    }
  });
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPageNumber(0);
  };
  const displayContacts = filteredContacts
    .slice(pagesVisited, pagesVisited + contactsPerPage)
    .map(({ id, avatar, tweets, followers, user }) => {
      const followCountForUser = followCounts[id] || 0;
      const isFollowing = followCountForUser % 2 === 1;
      const followerss = followers + followCountForUser;
      return (
        <li key={id} className={css.item}>
          <img src={avatar} alt="user" className={css.item_img} />
          <p className={css.item_name}>{user}</p>
          <span className={css.item_tweets}>{tweets} TWEETS </span>
          <span className={css.item_followers}>
            {followerss.toLocaleString("en-US")} FOLLOWERS
          </span>
          <button
            className={`${css.btn_item} ${
              isFollowing ? css.btn_following : ""
            }`}
            onClick={() => followCount(id)}
          >
            {isFollowing ? "FOLLOWING" : "FOLLOW"}
          </button>
        </li>
      );
    });

  const pageCount = Math.ceil(arrContacts.length / contactsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <NavLink to="/" className={css.flip}>
        Back to home
      </NavLink>
      <div className={css.filters}>
        <label htmlFor="filter"></label>
        <select
          className={css.filters_select}
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        >
          {FILTER_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={css.container_spinner}>
        {usersSpinner && <GridLoader color="#36d7b7" />}
      </div>
      <ul className={css.list}>{displayContacts}</ul>
      {
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={css.pagination}
          previousLinkClassName={css.pagination__link}
          nextLinkClassName={css.pagination__link}
          disabledClassName={css.pagination__link__disabled}
          activeClassName={css.pagination__link__active}
          pageClassName={css.pagination__page}
        />
      }
    </>
  );
};

export default Tweets;
