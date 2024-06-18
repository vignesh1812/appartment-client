import {  useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import registerLoader from '../../public/brand.svg';
import useAuth from "../hooks/useAuth";
const Register = () => {
  // const[showSubrole,setShowSubrole]=useState("")
  const navigate=useNavigate()
  const[role,setroles]=useState([])
      const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
        role: "",
        subrole: "",
      });
  const{api}=useAuth()
  // console.log(api);
  const [error, setError] = useState();
  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${api}/user/register`,
        userData
      );
      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: `${response.data}`,
          icon: "success",
        }).then(() => {       
            navigate("/admin/allusers");
        })
    }
      const newUser = await response.data;
      // console.log(newUser);
      if (!newUser) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Went Wrong.Please try again",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        
      }
    } catch (err) {
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
    <div className="">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 duration-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            className="mx-auto h-10 w-auto"
            src={registerLoader}
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            User Registration
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" onSubmit={registerUser}>
          {error && <p className="bg-red-500 text-white px-3 text-sm text-left  py-2 rounded-md">{error}</p>}
            <div>
              <label
                htmlFor="user"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Username
              </label>
              <div className="mt-2">
                <input
                  id="user"
                  name="username"
                  type="text"
                  value={userData.username}
                  required
                  autoFocus
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={changeInputHandler}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  autoComplete="on"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={changeInputHandler}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Create Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  autoComplete="true"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={changeInputHandler}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                {/* <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  value={userData.password2}
                  autoComplete="true"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={changeInputHandler}
                />
              </div>
            </div>

            <div>
              <select
                id="role"
                name="role"
                value={userData.role}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-600 outline-none"
                defaultValue="none"
                onChange={changeInputHandler}
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
            <div
              className={userData.role == "maintainence" ? "block" : "hidden"}
            >
              <select
                name="subrole"
                value={userData.subrole}
                defaultValue="none"
                id="subrole"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-600 outline-none"
                onChange={changeInputHandler}
              >
                <option selected defaultValue={null}>
                  Select Sub Role
                </option>
                {
                  role.length>0?<>{
                    role.map(({role,_id})=>{
                      return  <option key={_id}  value={role}>
                      {role}
                    </option>
                    })
                  }</>:<> <option value={"noCategory"}>
                 No Category
                </option></>
              }
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
