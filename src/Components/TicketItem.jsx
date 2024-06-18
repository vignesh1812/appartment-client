import moment from "moment";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
const TicketItem = ({
  i,
  ticketno,
  status,
  category,
  title,
  // description,
  date,
  search,
  id,
}) => {
  const timeAgo = moment(date).fromNow();
  const{user}=useAuth()
  const role=user?.role
  const highlightMatchingText = (text, highlight) => {
    if (!highlight) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="bg-yellow-500 font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };
  // const ShortDesc =
  //   description.length > 45
  //     ? description.substring(0, 45) + "..."
  //     : description;
  const shorTitle = title.length > 30 ? title.substring(0, 30) + "..." : title;
  return (
    <Link to={`/${role=="superadmin"?"admin":role}/ticket/${id}`}>
    <div
      key={i}
      className={`shadow-4xl   active:scale-[0.9] duration-500 h-[100px] xs:w-[280px] xl:w-[260px] xxl:w-[256px]  break-words cursor-pointer rounded-md relative ${
        status === "open"
          ? "border-l-green-700"
          : status === "closed"
          ? "border-l-red-500"
          : "border-l-yellow-500"
      } border-l-[5px] bg-gray-100 px-1.5 `}
    >
      <h1 className="font-semibold">#{highlightMatchingText(ticketno, search)}</h1>
      <h1 className="text-sm font-normal capitalize py-2 xs:max-sm:text-[12px]">{shorTitle}</h1>
      <small
        className={`${
          status === "open"
            ? "bg-green-700"
            : status === "closed"
            ? "bg-red-600"
            : "bg-yellow-500"
        } text-white w-fit px-2 font-light rounded-[2px] absolute right-2 top-1`}
      >
        {status}
      </small>
      <small className="font-light absolute  left-1 bottom-2 px-2  w-fit text-black capitalize ">
        {timeAgo}
      </small>
      <h1 className="text-sm absolute right-2 bottom-2 bg-indigo-500 px-3 rounded-[2px] text-white">
        {category}
      </h1>
    </div>
    </Link>
    
  );
};

export default TicketItem;
