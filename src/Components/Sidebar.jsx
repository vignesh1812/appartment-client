import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import logo from '../../public/assets/logo.png'
import controller from '../../public/assets/control.png'

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const Menus = [
    {
      title: "Dashboard",
      role: ["admin", "superadmin", "owner", "maintainence"],
      path: "/dashboard",
      src: "dashboard",
    },
    {
      title: "Tickets",
      role: ["admin", "superadmin", "resident", "owner", "maintainence"],
      path: "/tickets",
      src: "tickets",
    },
    {
      title: "Create Ticket",
      role: ["admin", "superadmin", "resident"],
      path: "/create-ticket",
      src: "createticket",
    },
    {
      title: "All users",
      role: ["admin", "superadmin"],
      path: "/allusers",
      src: "allusers",
      gap: true,
    },
    {
      title: "Register user",
      role: ["admin", "superadmin"],
      path: "/register",
      src: "register",
    },
      {
        title: "Add Maintainer roles",
        role: ["admin", "superadmin"],
           path:'/settings',
           src: "settings",
     },
    // {
    //    title: "Assigned Tickets",
    //       role: ["maintainence"],
    //       path:'/tickets',
    //       src: "tickets",
    // },

    {
      title: "profile",
      role: ["admin", "superadmin", "resident", "maintainence", "owner"],
      path: "/profile",
      src: "profile",
      gap: true,
    },
  ];
  const sidemenu = Menus.filter(({ role }) => role.includes(user.role));
  return (
    <div
      className={` ${
        open ? "w-72 xs:max-sm:left-0" : `w-14 p-2 `
      }
      h-full  pt-4 fixed  top-0 left-0 z-50 bg-gray-900 duration-300  xs:max-sm:-left-14`}
    >
      <img
        src={controller}
        className={`absolute cursor-pointer  top-[45px]  border-dark-purple
       border-2 rounded-full z-[11] w-7 ${
          !open? "xs:max-sm:-right-7 -right-4 rotate-180 ":"-right-4 "
        } rounded-full active:border-[2px] active:border-indigo-500 `}
        onClick={() => setOpen(!open)}
      />
      <div className={` flex gap-x-4 items-center `}>
        <img
          src={logo}
          className={`cursor-pointer ml-[10px] "
        `}
          onClick={() => setOpen(!open)}
        />
        <h1
          className={`cursor-pointer text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
          onClick={() => setOpen(!open)}
        >
          Appartment
        </h1>
      </div>
      <ul className="pt-6">
        {sidemenu.map((Menu, index) => (
          <NavLink to={`/${user.role=="superadmin"?"admin":user.role}${Menu.path}`} key={index}>
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer  text-gray-300 text-sm items-center gap-x-4
          ${
            Menu.gap ? "mt-6" : "mt-2"
          } hover:bg-lime-50 hover:bg-opacity-15 duration-100 `}
              onClick={() => setOpen(false)}
            >
              <img src={`../../public/assets/${Menu.src}.png`} />
              <span
                 data-te-toggle="tooltip"
                 data-te-placement="right"
                 data-te-ripple-init
                 data-te-ripple-color="light"
                 title="Tooltip on right"
                className={`${
                  !open && "hidden"
                } whitespace-pre origin-left duration-200`}
              >
                {Menu.title}
              </span>
              

            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
