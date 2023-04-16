import { useDispatch, useSelector } from "react-redux";
import { getStateUser } from "../../redux/selectors";
import { fetchUser } from "../../redux/operation";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Sweets.module.css";

const Tweets = () => {
  const arrContacts = useSelector(getStateUser);
  const dispatch = useDispatch();
  const [isFollow, setFollowings] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const followCount = (idUser) => {
    const filterUser = arrContacts.filter = ({id}) => console.log(id)
    console.log("filterUser:", filterUser)
    setFollowings(true);
  };

  return (
    <>
      <NavLink to="/">Back</NavLink>
      <ul className={css.list}>
        {arrContacts?.map(({ id, avatar, tweets, followers, user }) => (
          <li key={id} className={css.item}>
            <img src={avatar} alt="user" className={css.item_img} />
            <p className={css.item_name}>{user}</p>
            <span className={css.item_tweets}>{tweets} TWEETS </span>
            <span className={css.item_followers}>
              {followers.toLocaleString("en-US")} FOLLOWERS
            </span>
            <button className={css.btn_item} onClick={(id) => followCount(id)}>
              {isFollow ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Tweets;
