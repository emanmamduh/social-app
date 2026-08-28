import { createContext } from "react";
// import { userInfo } from "./AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  function getUserInfo() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const { data } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
    select: (res) => res?.data.data.user,
  });
  console.log(data);

  return (
    <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
  );
}
