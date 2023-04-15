import { useDispatch, useSelector } from "react-redux";
import { getStateUser } from "../redux/selectors";
import { fetchUser } from "../redux/operation";
import { useEffect } from "react";

const Tweets = () => {
  const arrContacts = useSelector(getStateUser);
  console.log("arrContacts:", arrContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <>
      <ul>
        {arrContacts?.map(({ id, avatar, tweets, followers, user }) => (
          <li key={id} className="css.item">
            <img src={avatar} alt="<текст>" />
            <p>{user}</p>
            <span>Tweets : {tweets}</span>
            <span>FOLLOWERS : {followers}</span>
            <button className="{css.btn_item}">FOLLOW</button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Tweets;
