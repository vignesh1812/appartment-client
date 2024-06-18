// import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
// import Loader from "../Components/Loader";
import useAuth from "../hooks/useAuth";
const DeleteUser = ({ id,email,Username,role }) => {
  const { api, user } = useAuth();
  const token = user?.token;
  const navigate = useNavigate();
  // const [IsLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const handleDelete = async () => {
    const confirmResult = await Swal.fire({
      title: `Are you sure To Delete?`,
      text:`${role} || ${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.delete(`${api}/user/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(response);
        if (response.status === 201) {
          Swal.fire({
            title: "Deleted!",
            text: `${role} ${Username} has been Deleted Sucessfully`,
            icon: "success",
          }).then(() => {
            if (location.pathname === `/admin/allusers`) {
              navigate(0);
            } else {
              navigate("/");
            }
          });
        } else {
          // Handle error case
          Swal.fire({
            title: "Error!",
            text: "Oops.Failed to delete the ${Username}.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error during deletion:", error);
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
          text: "An unexpected error occurred. Please try again.",
          icon: "error",
        });
      }
    }
  };
  // const removeUser = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.delete(`${api}/user/delete-user/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true,
  //     });
  //     console.log(response);
  //     if (response.status === 201) {
  //       if (location.pathname === `/admin/allusers`) {
  //         navigate(0);
  //       } else {
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
    // if("Unauthorized - Token has expired"===error.response.data.message){
    //   Swal.fire({
    //     title: "warning",
    //     text: `Your has session Expired, Please Login Again`,
    //     icon: "warning",
    //   }).then(() => {       
    //       navigate("/login");
    //   })
    // }
  //     console.log(error.message);

  //     console.log("Couldn't delete The post");
  //   }
  //   setIsLoading(false);
  // };
  // if (IsLoading) {
  //   return <Loader />;
  // }
  return (
    <div>
      <Link
        className="bg-red-500 text-white px-2 rounded-[2px] xs:max-sm:text-sm"
        onClick={handleDelete}
      >
        Delete User
      </Link>
    </div>
  );
};

export default DeleteUser;
