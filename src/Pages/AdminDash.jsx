import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Dashboard from "../Components/Dashboard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const AdminDash = () => {
  const { api } = useAuth();
  const [Dashdata, SetDashData] = useState({});
  const navigate=useNavigate()
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`${api}/tickets/ticket-counts`);
        SetDashData(response.data);
      } catch (error) {
        if("Unauthorized - Token has expired"===error.response.data.message){
          Swal.fire({
            title: "warning",
            text: `Your has session Expired, Please Login Again`,
            icon: "warning",
          }).then(() => {       
              navigate("/login");
          })
        }
        console.error(error);
      }
    };

    fetchCounts();
  }, [api]);
  return (
    <div className="grid place-content-center space-y-2 ">
      <h1 className="font-semibold text-2xl text-center xs:max-sm:text-lg">DASHBOARD OF APPARTMENT MAINTAINENCE</h1>
      <div className=" mx-auto p-1  text-white  grid  
      grid-cols-4 gap-6 sm:max-xl:grid-cols-2 xs:max-sm:flex xs:max-sm:flex-col  
      ">
        
          <div className="px-3 bg-green-700 rounded-[8px] h-[150px] w-min-[200px]   flex flex-col items-center justify-center xs:max-sm:min-w-[258px] xs:max-sm:max-w-[256px] sm:min-w-[200px] sm:max-w-[200px]  md:min-w-[258px] md:max-w-[258px] xl:min-w-[200px] xxl:min-w-[320px]">
            <h1 className="font-medium text-lg">Open Tickets</h1>
            <h1 className="font-semibold">{Dashdata.open}</h1>
          </div>
          <div className="px-3 bg-red-700 rounded-[8px] h-[150px] w-min-[200px]   flex flex-col items-center justify-center xs:max-sm:min-w-[258px] xs:max-sm:max-w-[258px] sm:min-w-[200px] sm:max-w-[200px]  md:min-w-[258px] md:max-w-[258px] xl:min-w-[260px] xxl:min-w-[320px]">
            <h1 className="font-medium text-lg">Closed Tickets</h1>
            <h1 className="font-semibold">{Dashdata.closed}</h1>
          </div>
          <div className=" px-3 bg-yellow-500 rounded-[8px] h-[150px] w-min-[200px]   flex flex-col items-center justify-center xs:max-sm:min-w-[258px] xs:max-sm:max-w-[258px] sm:min-w-[200px] sm:max-w-[200px]  md:min-w-[258px] md:max-w-[258px] xl:min-w-[200px] xxl:min-w-[320px]">
            <h1 className="font-medium text-lg">InProgress Tickets</h1>
            <h1 className="font-semibold">{Dashdata.inProgress}</h1>
          </div>
        <div className="px-3 bg-blue-600 rounded-[8px] h-[150px] w-min-[200px]   flex flex-col items-center justify-center xs:max-sm:min-w-[258px] xs:max-sm:max-w-[258px] sm:min-w-[200px] sm:max-w-[200px]  md:min-w-[258px] md:max-w-[258px] xl:min-w-[200px] xxl:min-w-[320px]">
          <h1 className="font-semibold text-xl">Total Tickets</h1>
          <h1 className="font-semibold">{Dashdata.open + Dashdata.closed+Dashdata.inProgress }</h1>
        </div>
      </div>
      
        <Dashboard
          openTic={Dashdata.open}
          progressTic={Dashdata.inProgress}
          closeTic={Dashdata.closed}
        />
      
    </div>
  );
};

export default AdminDash;
