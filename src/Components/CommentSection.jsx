import axios from "axios";
// import ScrollToBottom from "react-scroll-to-bottom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import CommentItem from "./CommentItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CommentSection = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const navigate=useNavigate()
  const { api } = useAuth();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(
          `${api}/tickets/${ticketId}/comments`
        );
        setComments(commentsResponse.data);
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
        console.log(error);
      }
    };
    fetchComments();
  }, [api, ticketId,navigate]);
  return (
    <div className="mt-4 p-1 rounded-md shadow-sm max-h-[400px] min-w-[258px] max-w-[700px] overflow-y-auto space-y-4 xs:max-sm:min-w-[258px] xs:max-sm:max-w-[258px]  md:min-w-[700px]   ">
      {comments.length > 0 ? (
        // <ScrollToBottom className="">
          <div>
             
            {comments.map(({subRole, content, _id, userRole,createdAt }) => (
              <CommentItem subRole={subRole} key={_id} date={createdAt} content={content} userRole={userRole} />
            ))} 
          </div>
        // </ScrollToBottom>
      ) : (
        <div className="w-full flex items-center justify-center">
          NO Commets Post Yet
        </div>
      )}
    </div>
  );
};

export default CommentSection;
