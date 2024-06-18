import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import commentLoader from '../../public/assets/loader.gif'
const CreateComment = ({ ticketId }) => {
  const[isLoading,setisLoading]=useState(false)
  const[error,setError]=useState()
  const [comment, setComment] = useState("");
  const navigate=useNavigate()
  const { api, user } = useAuth();
  const token = user?.token;
  const modules = {
    
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "dist",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const PostComment = async (e) => {
    e.preventDefault()
    setisLoading(true)
    try {
      const response = await axios.post(
        `${api}/tickets/${ticketId}/create-comments`,
        { content: comment },
        {
          headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 201) {
        setisLoading(false)
        navigate(0);
      }
      setComment('')
    } catch (error) {
      setisLoading(false)
      if("Unauthorized - Token has expired"===error.response.data.message){
        Swal.fire({
          title: "warning",
          text: `Your has session Expired, Please Login Again`,
          icon: "warning",
        }).then(() => {       
            navigate("/login");
        })
      }
      setError(error.response.data.message)
      console.error(error);
    }
  };

  return (
    <div className="px-2 xs:max-xsm:shadow-none xs:max-xsm:rounded-none shadow-4xl rounded-md mt-3 flex items-center justify-center py-3 ">
      <form className="flex items-start flex-col space-y-2">
        {/* <h1 className="px-2 bg-indigo-500 text-white rounded-sm">Create Comments</h1> */}
        {error && <p className="bg-red-500 text-white px-3 text-sm text-left  py-2 rounded-md">{error}</p>}

        <ReactQuill
          modules={modules}
          formats={formats}
          value={comment}
          onChange={setComment}
        />
        <button className="bg-indigo-500 flex items-center justify-center p-1 px-2 rounded-[3px] duration-200 text-white" type="submit" onClick={(e)=>{PostComment(e)}}>
        {isLoading
              ? <span className="flex items-center justify-center duration-200">Creating..<img className="ml-2 w-[20px]" src={commentLoader} alt="loader" /></span>
              : "Create Comment"}
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
