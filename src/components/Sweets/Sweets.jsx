import { useDispatch, useSelector } from "react-redux";
import { getStateUser } from "../../redux/selectors";
import { fetchUser } from "../../redux/operation";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Sweets.module.css";
import ReactPaginate from "react-paginate";

const Tweets = () => {
  const arrContacts = useSelector(getStateUser);
  const dispatch = useDispatch();
  const [isFollow, setFollowings] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const contactsPerPage = 8;
  const pagesVisited = pageNumber * contactsPerPage;

  const followCount = (idUser) => {
    const filterUser = arrContacts.filter(({ id }) => id === idUser);
    filterUser.map(({ followers }) => followers + 1);
    console.log("filterUser:", filterUser);

    setFollowings(!isFollow);
  };

  const displayContacts = arrContacts
    .slice(pagesVisited, pagesVisited + contactsPerPage)
    .map(({ id, avatar, tweets, followers, user }) => (
      <li key={id} className={css.item}>
        <img src={avatar} alt="user" className={css.item_img} />
        <p className={css.item_name}>{user}</p>
        <span className={css.item_tweets}>{tweets} TWEETS </span>
        <span className={css.item_followers}>
          {followers.toLocaleString("en-US")} FOLLOWERS
        </span>
        <button className={css.btn_item} onClick={() => followCount(id)}>
          {isFollow ? "Following" : "Follow"}
        </button>
      </li>
    ));

  const pageCount = Math.ceil(arrContacts.length / contactsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <NavLink to="/">Back to home</NavLink>
      <ul className={css.list}>{displayContacts}</ul>
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
    </>
  );
};

export default Tweets;
