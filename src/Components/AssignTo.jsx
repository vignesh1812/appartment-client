import axios from "axios";
import { FaCaretRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import assignLoader from "../../public/assets/assignLoader.gif";
const AssignTo = ({ status, category, ticketId }) => {
  const { api, user } = useAuth();
  const [isLoading, setisLoading] = useState(false);
  const token = user?.token;
  const [Maintainers, SetMaintainers] = useState([]);
  const [AssignTo, SetAssignTo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      const FetchCategoryUsers = async () => {
        try {
          const resCategory = await axios.get(`${api}/user/role/${category}`);
          // console.log(resCategory.data);
          if (resCategory.status === 201) {
            Swal.fire({
              title: "Un-availabel",
              text: `${resCategory.data.message}`,
              icon: "error",
            }).then(() => {
              setisLoading(false);
            });
          } else if (resCategory.status === 200) {
            SetMaintainers(resCategory.data);
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
            text: `${error.response.data.message}`,
            icon: "error",
          }).then(() => {
            setisLoading(false);
          });
          console.log(error.response.data.message);
        }
      };
      FetchCategoryUsers();
    }
  }, [api,category]);

  const AssignTicket = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const AssignResponse = await axios.patch(
        `${api}/tickets/${ticketId}`,
        { assign: AssignTo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // console.log(AssignResponse);
      if (AssignResponse.status === 200) {
        setisLoading(false);
        Swal.fire({
          title: "Ticket Assigned Sucesssfully",
          text: `${AssignResponse.data}`,
          icon: "success",
        }).then(() => {
          navigate(0);
        });
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
        text: `${error.response.data.message}`,
        icon: "error",
      });
      setisLoading(false);

      console.log(error.response.data.message);
    }
  };
  const statusCode = ["inprogress", "closed"];
  return (
    <div className={`${statusCode.includes(status) ? "hidden" : "block"}`}>
      <div>
        <form
          className="flex flex-wrap items-center  text-white justify-between xs:max-md:flex-col xs:max-md:space-y-3"
          onSubmit={AssignTicket}
        >
          <h1 className="rounded-[3px] bg-indigo-500 p-1 px-2">Assign Ticket To</h1>
          <h1 className="rounded-full  bg-indigo-500 p-1 xs:max-sm:rotate-90"><FaCaretRight/></h1>
          <select
            className="bg-indigo-500 p-1 rounded-[3px] outline-none text-center"
            name="Assign"
            id="Assign"
            onChange={(e) => {
              SetAssignTo(e.target.value);
            }}
            value={AssignTo}
          >
            <option value='select maintainer'>click to Select Maintainer</option>
            {Maintainers.length > 0 ? (
              Maintainers.map(({ username, _id }, i) => {
                return (
                  <option
                  className="bg-gray-100 text-gray-950 rounded-[3px]"
                  key={i}
                  value={_id}
                  >
                    {username}
                  </option>
                );
              })
              ) : (
                <option value={null}>No {category} Maintaners</option>
                )}
          </select>
                <h1 className="rounded-full  bg-indigo-500 p-1 xs:max-sm:rotate-90"><FaCaretRight/></h1>
          <button
            className="block rounded-[3px]  outline-none bg-yellow-500 p-1 px-2 duration-200 "
            type="submit"
          >
            {isLoading ? (
              <span className="flex items-center justify-center duration-200">
                Assigning{" "}
                <img src={assignLoader} className="ml-2 w-[20px]" alt="" />
              </span>
            ) : (
              "Assign"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTo;
