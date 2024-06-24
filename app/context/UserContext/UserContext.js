


import Loader from "@/components/UserComponent/Loader";
import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  async function fetchData() {
    try {
      setLoading(true);
      const res = await axios.get("/api/");
      setCurrentUser(res.data.currentUser)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <UserContext.Provider value={value}>
      {loading ? <Loader/> : children}{" "}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
