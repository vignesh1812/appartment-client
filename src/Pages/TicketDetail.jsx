import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import useAuth from "../hooks/useAuth";
import { FaCaretRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import moment from "moment";
import AssignTo from "../Components/AssignTo";
import CloseTicket from "../Components/CloseTicket";
import CreateComment from "../Components/CreateComment";
// import CommentBox from "../Components/commentBox";
import CommentSection from "../Components/CommentSection";
const TicketDetail = () => {
  const navigate=useNavigate()
  const { ticketId } = useParams();
  const { api, user } = useAuth();
  const StatusCode = ["inprogress", "closed"];
  const [TicketDetail, SetTicketDetail] = useState("");
  const [isLoading, SetisLoading] = useState(false);
  useEffect(() => {
    SetisLoading(true);
    const FetchTicketDetail = async () => {
      try {
        const Data = await axios.get(`${api}/tickets/detail/${ticketId}`);
        SetTicketDetail(Data.data);
      } catch (error) {
        console.log(error);
        if("Unauthorized - Token has expired"===error.response.data.message){
          Swal.fire({
            title: "warning",
            text: `Your has session Expired, Please Login Again`,
            icon: "warning",
          }).then(() => {       
              navigate("/login");
          })
        }
      }
      SetisLoading(false);
    };
    FetchTicketDetail();
  }, [api, ticketId]);
  const imageDate = moment(TicketDetail?.createdAt).format("YYYY-MM-DD");

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full grid place-content-center mx-auto">
      <div className="w-full  lg:max-w-[700px] flex justify-center items-center flex-col space-y-5  ">
        <h1 className="text-center text-3xl xs:max-sm:text-xl font-semibold">
          Ticket Detail
        </h1>
        <div className="min-w-[258px] sm:min-w-[500px] xs:max-xsm:shadow-none xs:max-xsm:rounded-none  md:min-w-[700px]  rounded-md shadow-3xl p-3 space-y-3 ">
          <div className="flex items-center justify-between xs:max-sm:items-center xs:max-sm:flex-col xs:max-sm:text-sm xs:max-sm:space-y-3">
            <div className="flex flex-col">
              <h1>
                Ticket No : <span>{TicketDetail.ticketNo}</span>
              </h1>
              <h3>
                Date :{" "}
                <span>{moment(TicketDetail.createdAt).format("LL")}</span>
              </h3>
            </div>
            <div className="flex flex-col  items-center xs:max-sm:items-start">
              <h1>
                Ticket Status:{" "}
                <span
                  className={`inline-block px-3 rounded-sm  text-white font-semibold ${
                    TicketDetail.status === "open"
                      ? "bg-emerald-500"
                      : TicketDetail.status === "closed"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {TicketDetail.status}
                </span>
              </h1>
              {TicketDetail.status === "closed" ? (
                <h1>
                  Closed Date : {""}
                  <span> {moment(TicketDetail.updatedAt).format("LL")}</span>
                </h1>
              ) : TicketDetail.status === "inprogress" ? (
                <h1>
                  Assigned Date : {""}
                  <span> {moment(TicketDetail.updatedAt).format("LL")}</span>
                </h1>
              ) : (
                <h1>Not Assigned Yet</h1>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold border-b-2 border-indigo-500 w-fit xs:max-sm:text-center ">
              Issue Category :{" "}
              <span className="uppercase">{TicketDetail.category}</span>{" "}
            </h1>
          </div>
          <div className="flex flex-col items-start shadow-4xl p-1 rounded-[3px]">
            <h1 className="md:text-lg font-semibold">Description : </h1>
            <p className="xs:max-sm:text-sm">{TicketDetail.description}</p>
          </div>
          {TicketDetail.image ? (
            <div>
              <img
                src={`http://localhost:5000/uploads/${imageDate}/${TicketDetail.image}`}
                alt={`image of ${TicketDetail.ticketNo}`}
              />
            </div>
          ) : (
            <></>
          )}
        <div>
          {
            <p
              className={`${
                TicketDetail.status === "inprogress" ? "block" : "hidden"
              } text-center`}
            >
              This Ticket is Assigned to{" "}
              <span className="text-wrap bg-indigo-500 text-white xs:max-sm:text-sm rounded-sm px-2">
                {user?.role === "maintainence"
                  ? "You"
                  : TicketDetail.assignedMember
                  ? TicketDetail.assignedMember
                  : ""}
              </span>{" "}
              {user?.role === "maintainence"?"":"Maintainer"}
            </p>
          }
        </div>
      <div>
        {user.role === "admin" ? (
          <AssignTo
            status={TicketDetail.status}
            ticketId={TicketDetail._id}
            category={TicketDetail.category}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        {user.role === "admin" ? (
          <CloseTicket
            ticketId={TicketDetail._id}
            closed={TicketDetail.status}
          />
        ) : (
          <></>
        )}
      </div>
        </div>
      </div>
      {StatusCode.includes(TicketDetail.status) ? (
        <>
          <div >
            <CreateComment ticketId={TicketDetail._id} />
          </div>
          <div className="flex flex-col items-center mt-6">
          <h1 className="bg-indigo-500 text-white p-1 px-2 w-fit rounded-[3px] flex items-center"><span className="rotate-90"><FaCaretRight/></span>Comments For This Tickets <span className="rotate-90"><FaCaretRight/></span></h1>
            <CommentSection ticketId={TicketDetail._id} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TicketDetail;
