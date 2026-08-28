import { createContext, useState } from "react";

export let CommentContext = createContext();

export function CommentContextProvider(props) {
const [isMe, setIsMe] = useState(false);
//   const setToken = (token) => {
//     localStorage.setItem("userToken", token);
//     setuserToken(token);
//   };
  return (
    // <UserData.Provider value={{ userToken, setuserToken, setToken }}>
    <CommentContext.Provider value={{ isMe, setIsMe }}>
      {props.children}
    </CommentContext.Provider>
  );
}
