import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
// import closeLoader from "../../public/assets/closeLoader.gif";
import closeLoader2 from "../../public/assets/closeLoader2.gif";
import { useState } from "react";

const CloseTicket = ({ ticketId, closed }) => {
  const [isLoading, SetisLoading] = useState(false);
  const navigate = useNavigate();
  const { api, user } = useAuth();
  const token = user?.token;
  const closeTicket = async (e) => {
    e.preventDefault();
    const confirmResult = await Swal.fire({
      title: `Are you sure ?`,
      text: `To Close This  Ticket`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Close it!",
    });
    if (confirmResult.isConfirmed) {
      SetisLoading(true);
      try {
        const closeTicketResponse = await axios.patch(
          `${api}/tickets/${ticketId}/status`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(closeTicketResponse);
        if (closeTicketResponse.status === 200) {
          SetisLoading(false);
          Swal.fire({
            title: "Ticket Closed",
            text: `${closeTicketResponse.data}`,
            icon: "success",
          }).then(() => {
            navigate(0);
          });
        }
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
        SetisLoading(false);
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
        });
        console.log(error.response.data.message);
      }
    }
  };
  return (
    <div className="mb-12">
      <form onSubmit={closeTicket} >
        {closed === "closed" ? (
          <button
            disabled
            className="bg-red-500 py-1 w-full text-white text-center rounded-[3px] hover:shadow-md my-2"
          >
            Ticket Closed
          </button>
        ) : (
          <button className="flex items-center justify-center bg-red-500 py-1 w-full text-white text-center rounded-[3px] hover:shadow-md my-2">
            {isLoading
              ? <span className="flex items-center justify-center">Ticket Closing..<img className="ml-2 w-[20px]" src={closeLoader2} alt="loader" /></span>
              : "Close the Ticket"}
          </button>
        )}
      </form>
    </div>
  );
};

export default CloseTicket;
