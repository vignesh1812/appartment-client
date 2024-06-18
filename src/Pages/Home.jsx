import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  return (
    <div className="hidden">
      <Sidebar />
      <div
        className="hidden"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
