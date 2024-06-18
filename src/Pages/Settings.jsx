import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
const Settings = () => {
    const[data,setData]=useState()
  const [roles, setRoles] = useState([]);
  const { api } = useAuth();

  useEffect(() => {
    const fetcRoles = async () => {
      try {
        const response = await axios.get(`${api}/user/maintainence/get`);
        setRoles(response.data);
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
  const createRole=async(e) => {
    e.preventDefault()
      try {
        const response = await axios.post(`${api}/user/maintainence/add`,{role:data});
        if(response.status===200){
            Swal.fire({
                title: "",
                text: `${response.data}`,
                icon: "success",
              }).then(()=>{window.location.reload()})
        }
      } catch (error) {
        Swal.fire({
          title: "",
          text: `${error.response.data.message}`,
          icon: "warning",
        });
      }
    };

    const deleteRole=async(id)=>{
        const confirmResult = await Swal.fire({
            text:`Are you sure to Delete This role`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          });
          if (confirmResult.isConfirmed) {

              try {
                const deleteResponse=await axios.delete(`${api}/user/maintainence/${id}/delete`)
                if(deleteResponse.status===200){
                  Swal.fire({
                      title: "",
                      text: `${deleteResponse.data}`,
                      icon: "success",
                    }).then(()=>{window.location.reload()})
                 
              }
                }
      
               catch (error) {
                  Swal.fire({
                      title: "error",
                      text: `${error.response.data.message}`,
                      icon: "warning",
                    });
              }
          }
    }

  return (
    <div className="grid place-content-center ">
      <div className="min-h-[400px] xs:max-sm:min-w-[310px] xs:max-sm:max-w-[310px] sm:min-w-[500px]  flex flex-col items-center justify-start p-5   rounded-md space-y-5 ">
        <h1 className="bg-indigo-500 rounded-2xl text-white px-3 ">Add Maintainers Role</h1>
        <form className="" onSubmit={(e)=>createRole(e)}>
        <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Add New Role
              </label>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  id="role"
                  name="role"
                  type="text"
                  value={data}
                  required
                  placeholder="Enter New Role"
                  className="block w-full px-2 rounded-sm border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  onChange={(e)=>{setData(e.target.value)}}
                />
                
        <button type="submit" className="px-2 py-0.5 bg-indigo-500 rounded-sm text-white  ">Add</button>
              </div>
            </div>
        </form>
        {roles.length > 0 ? (
          <>
            <ul className="p-2 w-10/12 space-y-2 max-h-[300px] overflow-y-auto">
              {roles.map(({ _id, role }) => {
                return <li key={_id} className="  bg-indigo-50 px-4 p-2 flex items-center justify-between space-x-6 ">
                    <span>{role}</span>
                    <button
                     onClick={()=>{deleteRole(_id)}}
                     className="bg-red-500 text-white px-2 rounded-2xl xs:max-sm:text-sm">Delete</button>
                    </li>;

              })}
            </ul>
          </>
        ) : (
          <>
          <h1>No Roles Created Yet</h1></>
        )}
      </div>
    </div>
  );
};

export default Settings;
