import moment from "moment";
import useAuth from "../hooks/useAuth";
const CommentItem = ({ id, userRole, content, date, subRole }) => {
  const { user } = useAuth();
  return (
    <div
      key={id}
      className={`rounded-sm flex flex-col ${
        user?.role === userRole ? " items-end" : "item-start"
      } my-5 `}
    >
      <div
        className={`max-w-[258px] xs:max-sm:max-w-[232px] p-3 flex flex-col justify-center  border-gray-100    ${
          user?.role === userRole ? " bg-gray-100 items-end rounded-l-3xl rounded-b-3xl shadow-4xl " : "shadow-4xl rounded-b-3xl rounded-r-3xl bg-indigo-100 items-start"
        }`}
      >
        <small className="font-normal">
          Commented:
          {user?.role === userRole
            ?  <span className="font-semibold">you</span>
            : userRole === "maintainence"
            ? <span className="font-semibold">{subRole}</span>
            : <span className="font-semibold">{userRole}</span>}
        </small>
        <p className="" dangerouslySetInnerHTML={{ __html: content }}></p>{" "}
        <p>
          <span className="text-[12px] bg-indigo-500 px-2 text-white rounded-md">
            {moment(date).fromNow()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
