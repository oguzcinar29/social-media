import { createContext, useEffect, useState } from "react";

export const SocialContext = createContext();

function DataContext({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("https://social-media-q3gh.onrender.com/api/auth/get-current-user")
      .then((response) => response.json())
      .then((data) => setUser(data));

    fetch("https://social-media-q3gh.onrender.com/api/auth/get-all-users")
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  console.log(user);

  const [dissmissArr, setDissMissArr] = useState();

  const AllValues = {
    user,
    setUser,
    dissmissArr,
    setDissMissArr,
    posts,
    setPosts,
    allUsers,
    setAllUsers,
  };
  return (
    <SocialContext.Provider value={AllValues}>
      {children}
    </SocialContext.Provider>
  );
}

export default DataContext;
