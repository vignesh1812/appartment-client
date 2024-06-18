import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import TicketItem from "../Components/TicketItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// import ticketlogo from "../../public/assets/tickets.png";
const AssignTickets = () => {
  const { api, user } = useAuth();
  const token = user?.token;
  const navigate = useNavigate();
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [CurrentPage, SetCurrentPage] = useState(1);
  // console.log(api);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchTickets = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(`${api}/tickets/assigned`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(response);
        setAssignedTickets(response?.data);
      } catch (error) {
        if (
          "Unauthorized - Token has expired" === error.response.data.message
        ) {
          Swal.fire({
            title: "warning",
            text: `Your has session Expired, Please Login Again`,
            icon: "warning",
          }).then(() => {
            navigate("/login");
          });
        }
        console.log(error.response.data);
      }
      setisLoading(false);
    };
    fetchTickets();
  }, [api, token, navigate]);
  if (isLoading) {
    return <Loader />;
  }
  const recordsPerPage = 16;
  const LastIndex = CurrentPage * recordsPerPage;
  const FirstIndex = LastIndex - recordsPerPage;
  const PagePosts = assignedTickets.slice(FirstIndex, LastIndex);
  const PageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(assignedTickets.length / recordsPerPage);
    i++
  ) {
    PageNumbers.push(i);
  }
  const PrevPage = () => {
    if (CurrentPage !== 1) {
      SetCurrentPage(CurrentPage - 1);
    }
  };
  const NextPage = () => {
    if (CurrentPage !== PageNumbers.length) {
      SetCurrentPage(CurrentPage + 1);
    }
  };
  const ChangeCurrentPage = (id) => {
    SetCurrentPage(id);
  };

  return (
    <div className="grid place-content-center">
      {assignedTickets.length > 0 ? (
        <div className="flex items-center justify-center">
          {/* <img src={ticketlogo} alt="tickets" /> */}
          <h1 className="text-3xl text-center font-semibold uppercase">
            Tickets
          </h1>
        </div>
      ) : (
        <></>
      )}
  <div className="grid place-content-center">

      <div className="mt-12 grid xs:max-sm:grid-cols-1 gap-y-6 sm:max-lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 sm:gap-x-6">
        {PagePosts.length > 0 ? (
          PagePosts.map(
            (
              {
                title,
                ticketNo,
                description,
                category,
                status,
                createdAt,
                _id,
              },
              i
            ) => (
              <TicketItem
                date={createdAt}
                category={category}
                description={description}
                status={status}
                ticketno={ticketNo}
                title={title}
                key={_id}
                i={i}
                id={_id}
              />
            )
          )
        ) : (
          <div className="w-[100vw] sm:w-[calc(100vw-56px)]  h-full grid place-items-center text-sm sm:text-lg">
            <h1 className="font-semibold capitalize">
              {" "}
              Tickets Not Assigned Yet for You
            </h1>
          </div>
        )}
      </div>
  </div>
      <div className={`pagination overflow-x-auto ${assignedTickets.length < 0 ? "hidden" : " my-6"}`}>
        <ul className="flex items-center justify-center">
          {PageNumbers.length>1 ? (
            <li className="shadow-4xl text-white hover:bg-indigo-700   mr-3 cursor-pointer duration-150  p-1 px-5  bg-indigo-600 rounded-2xl xs:max-sm:px-3 xs:max-sm:text-sm">
            <span onClick={PrevPage}>Prev</span>
          </li>
          ) : (
            <></>
          )}
          {PageNumbers.map((number, i) => (
            <li
              key={i}
              onClick={() => ChangeCurrentPage(number)}
              className={`${
                CurrentPage === number
                  ? " bg-indigo-500 text-white   xs:max-sm:px-4 "
                  : " xs:max-sm:px-2 "
              }  mx-1  cursor-pointer duration-150 px-2 text-sm rounded-xl`}
            >
              <span>{number}</span>
            </li>
          ))}
          {PageNumbers.length>1? (
            <li className="shadow-4xl text-white  ml-3 cursor-pointer duration-150  p-1 px-5  bg-indigo-600 rounded-2xl hover:bg-indigo-700 xs:max-sm:px-3 xs:max-sm:text-sm">
              <span onClick={NextPage}>Next</span>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AssignTickets;
