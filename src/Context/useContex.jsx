import { createContext,
   useEffect,
    useState } from "react";
export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const api=import.meta.env.VITE_REACT_APP_BACKEND_URL
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  useEffect(()=>{
    sessionStorage.setItem('user',JSON.stringify(user))
  },[user])

  return (
    <UserContext.Provider value={{user, setUser,api}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider