import { createContext, useState } from "react";

export let UserData = createContext();

export function UserDataProvider(props) {
    const [userToken, setuserToken] = useState(localStorage.getItem("userToken"));

    const setToken = (token)=> {
      localStorage.setItem("userToken", token);
      setuserToken(token);
      
    }
  return (
    // <UserData.Provider value={{ userToken, setuserToken, setToken }}>
    <UserData.Provider value={{ userToken, setToken }}>
      {props.children}
    </UserData.Provider>
  );
}
