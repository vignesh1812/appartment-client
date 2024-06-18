import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Header = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-900  text-white h-[58px] mb-6   flex items-center justify-between px-2 xs:max-sm:w-full sm:px-5 sm:w-[calc(100%-56px)] z-[10] fixed top-0 ">
      <div className="flex items-center">
        <h1 className="xs:max-sm:text-xs">Appartment Maintainence</h1>
      </div>
      <div className="">
        <Link className="flex items-center space-x-3" to={`/${user?.role=="superadmin"?"admin":user.role}/profile`}>
          <div className="relative">
            <img
              className="relative rounded-full border-2 border-white  h-[40px]"
              src={`${import.meta.env.VITE_REACT_APP_PROFILE_URL}/${
                user.profile ?? "no-avator.png"
              }`}
              alt={user.username}
            />
            <p className=" absolute bottom-1 bg-green-600 rounded-full border-[1.5px] border-white h-[9px] w-[8px]">
              &nbsp;
            </p>
          </div>
        <h1 className="xs:max-sm:text-sm sm:text-sm">{user.username}</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
