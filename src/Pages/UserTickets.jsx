import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import TicketItem from "../Components/TicketItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import ticketlogo from '../../public/assets/tickets.png'
import { Link } from "react-router-dom";
const UserTickets = () => {
  const { api, user } = useAuth();
  const userId = user?.id;
  const [CurrentPage, SetCurrentPage] = useState(1);
  const token = user?.token;
  const [Tickets, SetTickets] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTickets = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(`${api}/tickets/${userId}/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        SetTickets(response?.data);
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
        console.log(error);
      }
      setisLoading(false);
    };
    fetchTickets();
  }, [api, token, userId, navigate]);

  if (isLoading) {
    return <Loader />;
  }
  const recordsPerPage = 8;
  const LastIndex = CurrentPage * recordsPerPage;
  const FirstIndex = LastIndex - recordsPerPage;
  const PagePosts = Tickets.slice(FirstIndex, LastIndex);
  const PageNumbers = [];
  for (let i = 1; i <= Math.ceil(Tickets.length / recordsPerPage); i++) {
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
      {Tickets.length > 0 ? (
        <div className="flex items-center justify-center">
          <h1 className="text-2xl text-center font-semibold capitalize xs:max-sm:text-xl">
            Your Tickets
          </h1>
        </div>
      ) : (
        <></>
      )}

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
          <div className="w-[100vw] sm:w-[calc(100vw-56px)]   h-full grid place-items-center xs:max-sm:text-lg space-y-3">
            <h1 className="text-xl font-semibold">
              You Don{"'"}t Created Any Tickets Yet
            </h1>
            <p>
              if You Have Any Issues in your House, <br />{" "}
              <span className="font-normal">
                <Link
                  to={`/${user.role}/create-ticket`}
                  className="  px-2 bg-indigo-500 text-white rounded-sm"
                >
                  Create Ticket
                </Link>
              </span>{" "}
              to Solve Your Issue
            </p>
            <div></div>
          </div>
        )}
      </div>
      <div className={`pagination overflow-x-auto ${Tickets.length < 0 ? "hidden" : " my-6"}`}>
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

export default UserTickets;
