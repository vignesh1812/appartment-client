import { FaCaretLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import unauthorize from "../../public/assets/unauthorize.png";
const Unauthorize = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col space-y-4">
      {/* <h1 className="text-xl  font-semibold">
       Don{"'"}t Think Smart
      </h1> */}
      <div className="flex w-10/12  shadow-4xl rounded-md">
        <div className="bg-indigo-500 w-1/3 h-[150px] rounded-l-md flex items-center justify-center">
          <img className="xs:max-sm:w-10" src={unauthorize} alt="unauthorized" />
        </div>
        <div className="w-full flex flex-col text-xl  font-semibold items-center justify-center xs:max-sm:text-sm">
          <h3>Unauthorized</h3>
          <h1 className="text-center">You Don{"'"}t Have Access</h1>
        </div>
      </div>
      <button onClick={()=>goBack()} className="hover:shadow-4xl duration-200 bg-indigo-500 p-1 text-white px-2 rounded-[6px] flex items-center xs:max-sm:text-sm"><FaCaretLeft/>Please,Go Back</button>
    </div>
  );
};

export default Unauthorize;
