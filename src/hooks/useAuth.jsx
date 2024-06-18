import { useContext } from "react";
import { UserContext } from "../Context/useContex";

const useAuth = () => {
    return useContext(UserContext);
}

export default useAuth;