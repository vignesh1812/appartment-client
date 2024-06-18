import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
const UserProfile = () => {
  const navigate = useNavigate();
  const { api, user } = useAuth();
  const [isAvatorTouched, setIsAvatorTouched] = useState(false);
  const [avator, setAvator] = useState("");
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [Role, setRole] = useState("");
  const [subRole, setSubRole] = useState("");
  // const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmnewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const token = user?.token;
  const { userId } = useParams();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${api}/user/${userId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      // console.log(response);
      const { email, username, profile, role, subrole } = response.data;
      Setname(username);
      Setemail(email);
      setAvator(profile);
      setRole(role);
      setSubRole(subrole);
    };
    getUser();
  }, [api,token,userId]);

  const changeProfilePicture = async () => {
    setIsAvatorTouched(false);
    const TicketData = new FormData();
    TicketData.append("userId", userId);
    TicketData.append("profile", avator);

    try {
      const response = await axios.post(
        `${api}/user/avator/change-profile`,
        TicketData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if(response.status===200){
        Swal.fire({
          title:"Profile Updated",
          icon:"success",
          confirmButtonText: "ok"
        })
      }
      setAvator(response?.data.profile);

    } catch (error) {
      console.log(error.response.data.message);
      if("Unauthorized - Token has expired"===error.response.data.message){
        Swal.fire({
          title: "warning",
          text: `Your has session Expired, Please Login Again`,
          icon: "warning",
        }).then(() => {       
            navigate("/login");
        })
      }
      Swal.fire({
        title:"info",
        text:`${error.response.data.message}`,
        icon:"info",
        confirmButtonText: "ok"
      })
      // console.log(TicketData);
    }
  };
  const HandleUpdateDetials = async (e) => {
    e.preventDefault();
    try {
      const userdata = new FormData();
      userdata.append("username", name);
      userdata.append("email", email);
      userdata.append("role", Role);
      userdata.append("subrole", subRole);
      // userdata.append("currentPassword", currentPassword);
      userdata.append("confirmNewPassword", ConfirmnewPassword);
      userdata.append("newPassword", newPassword);
      userdata;

      const response = await axios.patch(
        `${api}/user/edit-user/${userId}`,
        userdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Thank you",
          text: "Changes Updated Successfully ",
          icon: "success",
        }).then(() => {
          navigate("/admin/allusers");
        });
      }else{
        Swal.fire({
          title: "Error!",
          text: "Something Went Wrong!. Please try again.",
          icon: "error",
        }).then(()=>{
          navigate('/admin/allusers')
        })
      }
2
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
      setError(error.response.data.message);
    }
  };
  return (
    <section className="profile">
      <div className="w-10/12 m-auto xs:max-md:w-11/12 grid place-items-center text-center">
        <div className="w-32 aspect-square relative mt-4">
          <div className="-z-[1000] h-full rounded-[50%] flex items-center justify-center border-[0.7rem] border-solid border-slate-200 overflow-hidden">
            <img
              src={`http://localhost:5000/uploads/users-profile/${
                avator ?? "no-avator.png"
              }`}
              alt=""
            />
          </div>
          {/* Form to update The Avator */}
          <form className="h-4">
            <input
              type="file"
              className="hidden"
              name="avator"
              accept="png,jpg,jpeg"
              onChange={(e) => setAvator(e.target.files[0])}
              id="avator"
            />
            <label
              htmlFor="avator"
              className="absolute right-5 bottom-6  text-2xl "
              onClick={() => setIsAvatorTouched(true)}
            >
              <FaEdit />
            </label>
          </form>
          {isAvatorTouched && (
            <button
              className="bg-gray-900 text-white  absolute right-4 bottom-5 w-8 h-8 grid place-items-center rounded-full
            } "
              onClick={changeProfilePicture}
            >
              <FaCheck />
            </button>
          )}
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2 text-left" onSubmit={HandleUpdateDetials}>
            {error && (
              <p className="bg-red-500 text-white px-3 text-sm text-left  py-2 rounded-md">
                {error}
              </p>
            )}
            <div>
              <div className="mt-2 text-left">
              <label
                htmlFor="user"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
                <input
                  id="user"
                  value={name}
                  name="username"
                  placeholder="Enter Your Userame"
                  type="text"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={(e) => Setname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Enter Your Email"
                  autoComplete="on"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={(e) => Setemail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter New Password <span className="text-indigo-600">(if required)</span>
              </label>
                <input
                  id="password"
                  name="password"
                  placeholder="Enter New Password"
                  type="password"
                  autoComplete="true"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                {/* <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div> */}
              </div>
              <label
                htmlFor="password2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm New Password              </label>
              <div className="mt-2">
                <input
                  id="password2"
                  placeholder="Confirm New Password"
                  name="password2"
                  type="password"
                  autoComplete="true"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
            <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-600 outline-none"
                value={Role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected defaultValue={null}>
                  Select user Role
                </option>
                <option value="resident">Resident</option>
                <option value="maintainence">Maintainence</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div className={Role === "maintainence" ? "block" : "hidden"}>
            <label
                htmlFor="subrole"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subrole
              </label>
              <select
                name="subrole"
                id="subrole"
                value={subRole}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-600 outline-none"
                onChange={(e) => setSubRole(e.target.value)}
              >
                <option>Select Sub Role</option>
                <option value="plumber">Plumber</option>
                <option value="electrical">Electrical</option>
                <option value="hvac">HVAC</option>
                <option value="technician">Technician</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
