import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Loader from "../Components/Loader";
import UserItem from "../Components/UserItem";
// import Userlogo from "../../public/assets/allusers.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const { api } = useAuth();
  const navigate = useNavigate();
  const [allUser, setAllUsers] = useState([]);
  const [CurrentPage, SetCurrentPage] = useState(1);
  const [userRole, setUserRole] = useState("all");
  const [UserSearch, SetUserSearch] = useState("");
  const [isLoading, SetisLoading] = useState(false);

  useEffect(() => {
    SetisLoading(true);
    const fetchAllusers = async () => {
      try {
        const ResponseData = await axios.get(`${api}/user`);
        setAllUsers(ResponseData.data);
        SetisLoading(false);
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
    fetchAllusers();
  }, [api,navigate]);
  useEffect(() => {
    const fetchStatusTickets = async () => {
      SetisLoading(true);
      const RoleCodes = ["resident", "admin", "owner", "maintainence"];
      if (RoleCodes.includes(userRole)) {
        try {
          const RoleData = await axios.get(`${api}/user/users/${userRole}`);
          if (RoleData.status === 201) {
            Swal.fire({
              title: "Oops..!",
              text: `${RoleData.data}`,
              icon: "error",
            }).then(() => {
              navigate(0);
            });
          } else if (RoleData.status === 200) {
            setAllUsers(RoleData?.data);
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
          Swal.fire({
            title: "Error!",
            text: `${error.data.message}`,
            icon: "error",
          });
          console.log(error);
        }
      } else {
        try {
          const responseRoles = await axios.get(`${api}/user`);
          setAllUsers(responseRoles?.data);
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
          Swal.fire({
            title: "Error!",
            text: `${error.data.message}`,
            icon: "error",
          }).then(() => {
            navigate("/admin/allusers");
          });
          console.log(error);
        }
      }
      SetisLoading(false);
    };
    fetchStatusTickets();
  }, [userRole,api,navigate]);
  if (isLoading) {
    return <Loader />;
  }
  const recordsPerPage = 8;
  const LastIndex = CurrentPage * recordsPerPage;
  const FirstIndex = LastIndex - recordsPerPage;
  const PagePosts = allUser.slice(FirstIndex, LastIndex);
  const PageNumbers = [];
  for (let i = 1; i <= Math.ceil(allUser.length / recordsPerPage); i++) {
    PageNumbers.push(i);
  }
  const PrevPage=()=>{
    if(CurrentPage!==1){
        SetCurrentPage(CurrentPage-1)
    }
  }
  const NextPage=()=>{
    if(CurrentPage!==PageNumbers.length){
        SetCurrentPage(CurrentPage+1)
    }
  }
  const ChangeCurrentPage=(id)=>{
    SetCurrentPage(id)
  }
  return (
    <div className="pb-10 grid place-content-center">
      {PagePosts.length > 0 ? (
        <div className="flex items-center justify-center text-3xl gap-4 text-center font-semibold uppercase xs:max-sm:text-lg">
          <h1 >{userRole==="all"?"All users":userRole==='maintainence'?"Maintainers":userRole+"s" }</h1>
          {/* <h1 className=" ">
            USERS
          </h1> */}
        </div>
      ) : (
        <></>
      )}
      <div className="grid place-content-center space-y-4 my-4">
        <div className="lg:flex items-center xs:max-lg:space-y-5 lg:space-x-7">

        <div>
          <select
            id="filter"
            value={userRole}
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 xs:max-sm:max-w-[258px] xs:max-sm:min-w-[258px] sm:max-md:min-w-[380px] md:max-lg:min-w-[310px] md:max-lg:max-w-[310px]  lg:max-xl:min-w-[320px] lg:max-xl:max-w-[320px]  xl:min-w-[320px] xl:max-w-[320px] "
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="all" selected>
              All Users
            </option>
            <option value="resident">Residents</option>
            <option value="admin">Admins</option>
            <option value="owner">Owners</option>
            <option value="maintainence">Maintainers</option>
          </select>
        </div>
        <div>
          <input
            type="search"
            onChange={(e) => SetUserSearch(e.target.value)}
            name=""
            id=""
            value={UserSearch}
            placeholder="Enter Email"
            className="xs:max-sm:max-w-[258px] xs:max-sm:min-w-[258px] sm:max-md:min-w-[380px] md:max-lg:min-w-[310px] md:max-lg:max-w-[310px]  lg:max-xl:min-w-[320px] lg:max-xl:max-w-[320px] xl:min-w-[320px] xl:max-w-[320px] outline-none px-2 py-1 border-2 border-indigo-500 rounded-sm "
          />
        </div>
        </div>
      </div>

      <div className="grid xs:max-md:grid-cols-1 gap-y-6 md:max-xl:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 sm:gap-x-6">
        {PagePosts.filter((user) => {
          return user.email.toLowerCase().includes(UserSearch);
        }).length > 0 ? (
          PagePosts
            .filter((user) => {
              return user.email.toLowerCase().includes(UserSearch);
            })
            .map(({ role, username, profile, _id, email, subrole }) => (
              <UserItem
                key={_id}
                role={role}
                name={username}
                profile={profile}
                id={_id}
                email={email}
                subrole={subrole}
              />
            ))
        ) : (
          <div className="w-[100vw] sm:w-[calc(100vw-56px)]  h-full grid place-items-center xs:max-sm:text-lg">
            <h1 className="font-semibold uppercase">No Users Found</h1>
          </div>
        )}
      </div>
      <div className={`pagination overflow-x-auto ${allUser.length < 0 ? "hidden" : " my-6"}`}>
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

export default AllUsers;
