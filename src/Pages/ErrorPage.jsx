import { FaCaretLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
 const ErrorPage = () => {
  const navigate=useNavigate()
  const goBack = () => navigate(-1);


  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col space-y-4" ><h1 className="text-xl capitalize font-semibold">Error 404 - Page Not Found</h1>
    <div className="flex items-center justify-center">

    <button onClick={()=>goBack()} className="bg-indigo-500 p-1 text-white px-2 rounded-[6px] flex items-center"><FaCaretLeft/>GO Back!</button>
    </div>
    </div>
  )
}
export default ErrorPage