import { Link } from "react-router-dom"
import DeleteUser from "./DeleteUser"
const UserItem = ({role,name,profile,email,id,subrole}) => {

  return (
    <div className="shadow-4xl  active:scale-[0.990] duration-200 rounded-lg xs:max-xsm:px-1 xs:xsm-sm:py-0 p-2" >
      <div className="min-w-[280px] h-28  break-words  xs:max-sm:max-w-[258px] xs:max-sm:min-w-[258px] sm:max-md:min-w-[380px] md:max-lg:min-w-[310px] md:max-lg:max-w-[310px]  lg:max-xl:min-w-[300px] lg:max-xl:max-w-[300px] lg:max-xl:min-h-32 lg:max-xl:max-h-32 xl:min-w-[300px] xl:max-w-[300px]
      xxl:min-w-[400px] xxl:min-h-32   relative  flex items-center space-x-4   xs:max-sm:space-x-2 xxl:gap-x-6 ">
        <div className="w-14">
              <img className="rounded-full border-2 border-indigo-500 " src={`http://localhost:5000/uploads/users-profile/${profile??"no-avator.png"}`} alt={`${name}`} />
        </div>
        <div className="flex flex-col space-y-2">
            <h1  className="xs:max-sm:text-[12px] md:max-lg:text-[13px]">Username : {name}</h1>
            <p className="xs:max-sm:text-[12px] md:max-lg:text-[13px] text-sm">Email:{email}</p>
            <div className="flex items-center space-x-3">

            <p className="xs:max-sm:text-[12px] md:max-lg:text-[13px] text-sm capitalize bg-indigo-500 px-1 rounded-sm text-white">{role}</p>
            {subrole?<p className="xs:max-sm:text-[12px] md:max-lg:text-[13px] text-sm capitalize bg-blue-500 px-1 rounded-sm text-white">{subrole}</p>:""}
            </div>
        </div>
   
    </div>
    <div className="flex justify-between items-center px-1">
            <Link to={`/admin/edit-user/${id}`} className="bg-blue-600 text-white px-2 rounded-sm xs:max-sm:text-sm">Edit User</Link>
            <DeleteUser id={id} Username={name} role={role} email={email}/>
        </div>
    </div>
  
  )
}

export default UserItem