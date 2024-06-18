import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { setUser, user } = useAuth();
  const logout=()=>{
    Swal.fire({
      title: "Are you sure To Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "You have been Logged Out",
          icon: "success"
        }).then(()=>setUser(null))
      }
    });
  }
  return (
    <div className="h-full flex text-black items-start justify-center     overflow-x-hidden ">
      <div className="shadow-4xl flex flex-col items-center justify-evenly p-5  h-[350px] rounded-md bg-indigo-100 min-w-[250px] xs:max-sm:min-w-[258px] xs:max-sm:max-w-[258px] sm:min-w-[400px]">
        <div className="w-28">
        <div className=" rounded-[50%] flex items-center justify-center border-[0.3rem] border-solid border-white overflow-hidden ">
          <img className="rounded-full"
            src={`${import.meta.env.VITE_REACT_APP_PROFILE_URL}/${
              user.profile ?? "no-avator.png"
            }`}
            alt={user.username}
          />
        </div>
        </div>
        <h1 className="text-sm capitalize bg-indigo-500 px-1 rounded-sm text-white">{user.role}{user.subrole.length>0&&<span>-{user.subrole}</span>}</h1>
        <h1>Name :{" "}{user.username}</h1>
        <h1>{user.emailid}</h1>
        <button className="bg-white active:scale-[0.920] hover:shadow-4xl duration-200 text-gray-900 font-semibold p-1 px-2 rounded-[3px]"
          onClick={() => {
            logout()
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
