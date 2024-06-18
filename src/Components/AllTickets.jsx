import TicketItem from "./TicketItem";
import Loader from "../Components/Loader";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import ticketlogo from "../../public/assets/tickets.png";
import Datepicker from "react-tailwindcss-datepicker";

const AllTickets = () => {
  const { api, user } = useAuth();
  const navigate = useNavigate();
  const token = user?.token;
  const [status, setStatus] = useState("all");
  const [Tickets, SetTickets] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [CurrentPage, SetCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTickets = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(`${api}/tickets/`, {
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
            text: `Your  session has Expired, Please Login Again`,
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
  }, [api, token, navigate]);
  useEffect(() => {
    const fetchStatusTickets = async () => {
      setisLoading(true);
      const StatusCode = ["open", "closed", "inprogress"];
      if (StatusCode.includes(status)) {
        try {
          const statusData = await axios.get(
            `${api}/tickets/status/${status}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          SetTickets(statusData.data);
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
      } else {
        try {
          const responseStatus = await axios.get(`${api}/tickets/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          SetTickets(responseStatus?.data);
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
      }
      setisLoading(false);
    };
    fetchStatusTickets();
  }, [status, api, token, navigate]);
  const handleDateChange = async (newValue) => {
    try {
      await axios
        .post(`${api}/tickets/datebased/ticket`, {
          startDate: newValue.startDate,
          endDate: newValue.endDate,
          status: status,
        })
        .then((data) => {
          SetTickets(data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      if ("Unauthorized - Token has expired" === error.response.data.message) {
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
  };

  if (isLoading) {
    return <Loader />;
  }
  const recordsPerPage = 12;
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
    <div className="grid place-content-center pb-12">
      <div className="flex items-center  justify-center text-3xl gap-2 text-center font-semibold uppercase xs:max-sm:text-lg ">
        <h1>{status}</h1>
        <h1 className="">Tickets</h1>
      </div>
      {/* min-w-[258px] break-words cursor-pointer xs:max-sm:max-w-[258px] xs:max-sm:min-w-[258px] sm:max-w-[258px] xl:min-w-[320px] */}
      <div className=" mt-10 flex gap-6  items-center justify-evenly  xs:max-xl:flex-col  xs:max-md:gap-y-8 md:max-xl:gap-y-4 ">
        <div className="min-w-[280px] flex  flex-col justify-center items-center ">
          <select
            id="filter"
            value={status}
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all" selected>
              All Tickets
            </option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="inprogress">Inprogress</option>
          </select>
        </div>
        <div className="w-fit border-2 border-indigo-500 rounded-sm  ">
          <Datepicker
            onChange={handleDateChange}
            inputClassName="w-[280px] outline-none  p-1 rounded-md focus:ring-0"
            primaryColor={"violet"}
            showShortcuts={true}
            popoverDirection="down"
            showFooter={true}
            placeholder="Select Date From to Date"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            name=""
            id=""
            value={search}
            placeholder="Enter Ticket No"
            className="w-[280px] outline-none px-2 py-1 border-2 border-indigo-500 rounded-sm"
          />
        </div>
      </div>
  <div className="grid place-content-center">

      <div
        className=" 
      mt-12  grid  xs:max-sm:grid-cols-1 gap-y-6 sm:max-lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 sm:gap-x-6
        "
      >
        {PagePosts.filter((item) => {
          return item.ticketNo.toLowerCase().includes(search);
        }).length > 0 ? (
          PagePosts.filter((item) => {
            return item.ticketNo.toLowerCase().includes(search);
          }).map(
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
                search={search}
                id={_id}
              />
            )
          )
        ) : (
          <div className="w-[100vw] sm:w-[calc(100vw-56px)]  h-full grid place-items-center">
            <h1 className="capitalize md-text-lg xl:text-xl">
              {status === "all"
                ? "Tickets Not Found"
                : `${status} Tickets Not Found`}
            </h1>
          </div>
        )}
      </div>
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

export default AllTickets;
