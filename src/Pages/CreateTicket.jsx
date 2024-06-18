import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useState,useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import loader from '../../public/assets/loader.gif'

const CreateTicket = () => {
  const[isLoading,SetisLoading]=useState(false)
  const[role,setroles]=useState([])
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState("");
  const { user, api } = useAuth();
  const token = user?.token;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changeInputHandler = (e) => {
    setTicketData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const createNewTicket = async (e) => {
    SetisLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", ticketData.title);
    formData.append("category", ticketData.category);
    formData.append("description", ticketData.description);
    formData.append("file", file);
    console.log(formData);

    try {
      const response = await axios.post(
        `${api}/tickets/create-ticket`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setTicketData({
        title: "",
        description: "",
        category: "",
      });
      console.log(response);
      if (response.status === 200) {
        SetisLoading(false)
        Swal.fire({
          title: "Thank you!",
          text: `${response.data}`,
          icon: "success",
        }).then(() => {
          navigate(`/${user.role=="superadmin"?"admin":user.role}/tickets`);
        });
        return;
      }
    } catch (err) {
      SetisLoading(false)
      if("Unauthorized - Token has expired"===err.response.data.message){
        Swal.fire({
          title: "warning",
          text: `Your has session Expired, Please Login Again`,
          icon: "warning",
        }).then(() => {       
            navigate("/login");
        })
      }
      setError(err.response.data.message);
    }
  };
  useEffect(() => {
    const fetcRoles = async () => {
      try {
        const response = await axios.get(`${api}/user/maintainence/get`);
        setroles(response.data);
      } catch (error) {
        Swal.fire({
          title: "error",
          text: `${error.response.data.message}`,
          icon: "warning",
        });
      }
    };
    fetcRoles();
  }, [api]);
  return (
    <div className="flex min-h-full  flex-1 justify-start flex-col px-6 py-12 lg:px-8 ">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-semibold">Create Ticket</h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" onSubmit={createNewTicket}>
          {error && (
            <p className="bg-red-500 text-white px-3 text-sm text-left  py-2 rounded-md">
              {error}
            </p>
          )}
          <div className="">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Issue Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={ticketData.title}
                autoComplete="title"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  outline-none"
                onChange={changeInputHandler}
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Describe Your Issue
            </label>
            <div className="mt-2">
              <textarea
                name="description"
                value={ticketData.description}
                id="description"
                className="block resize-none h-40 w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  outline-none"
                onChange={changeInputHandler}
              ></textarea>
            </div>
          </div>
          <div className="">
            <label
              htmlFor="file_input"
              className="block w-full px-2 py-2 text-center text-sm bg-indigo-600  text-white  font-medium rounded-md"
            >
              Upload Issue Image
            </label>
            <div className="mt-2">
              {window.innerWidth > 640 ? (
                <>
                  <input
                    className="hidden w-full px-2 rounded-md border-0 py-1.5 bg-indigo-500 text-gray-900 shadow-sm ring-1 ring-inset 
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  outline-none"
                    aria-describedby="file_input_help"
                    name="file"
                    id="file_input"
                    type="file"
                    accept=".png, .jpg, .jpeg, .pdf,.txt,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    {file ? file.name : "PNG,JPG,JPEG"}
                  </p>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    id="file_input"
                    className="hidden w-full px-2 rounded-md border-0 py-1.5 bg-indigo-500 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  outline-none"
                    capture="environment"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <p
                    className="mt-1 text-sm  text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    {file ? file.name : ""}
                  </p>
                </>
              )}
            </div>
          </div>
          <div>
            <select
              name="category"
              id="category"
              value={ticketData.category}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-600 outline-none"
              onChange={changeInputHandler}
            >
              <option selected value="nocategory">
                Select Issue Category
              </option>
              {
                  role.length>0?<>{
                    role.map(({role,_id})=>{
                      return  <option key={_id}  value={role}>
                      {role}
                    </option>
                    })
                  }</>:<> <option value={"noCategory"}>
                 No maintaners
                </option></>
              }
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full items-center justify-center duration-200 rounded-md bg-indigo-600 px-3 py-1.5 text-lg  leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading?<span className="flex items-center justify-center">Ticket Creating.. <img className="ml-2 w-[20px]" src={loader} alt="loader" /></span>:"Create Ticket"}
            </button>
          </div>
        </form>
      </div>
      {/* <ToastContainer/> */}
    </div>
  );
};

export default CreateTicket;
