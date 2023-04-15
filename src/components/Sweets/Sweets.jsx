import { useDispatch, useSelector } from "react-redux";
import { getStateUser } from "../../redux/selectors";
import { fetchUser } from "../../redux/operation";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Sweets.module.css";

const Tweets = () => {
  const arrContacts = useSelector(getStateUser);
  const dispatch = useDispatch();
  // const [users, setUsers] = useState([]);
  const [isFollow, setFollowings] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  // const followCount = async (id) => {
  //   setFollowings((prevFollowings) => {
  //     const index = prevFollowings.indexOf(id);

  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) => {
  //         if (user.id === id) {
  //           user.isFollow = !user.isFollow;
  //           user.followers = user.isFollow
  //             ? user.followers + 1
  //             : user.followers - 1;
  //         }
  //         return user;
  //       })
  //     );

  //     if (index === -1 || prevFollowings.lenght === 0) {
  //       return [...prevFollowings, id];
  //     } else {
  //       prevFollowings.splice(index, 1);
  //       return [...prevFollowings];
  //     }
  //   });
  // };
  const followCount = (id) => {
    setFollowings(!true);
  };

  return (
    <>
      <NavLink to="/">Back</NavLink>
      <ul className={css.list}>
        {arrContacts?.map(({ id, avatar, tweets, followers, user }) => (
          <li key={id} className={css.item}>
            <img src={avatar} alt="<текст>" className={css.item_img} />
            <p className={css.item_name}>{user}</p>
            <span className={css.item_tweets}>
              {tweets.toLocaleString()} TWEETS{" "}
            </span>
            <span className={css.item_followers}>
              {followers.toLocaleString()} FOLLOWERS
            </span>
            <button className={css.btn_item} onClick={() => followCount(id)}>
              {isFollow ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Tweets;
