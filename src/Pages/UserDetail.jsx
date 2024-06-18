import { useParams } from "react-router-dom"
const UserDetail = () => {
  const {userId}=useParams();
  return (
    <div>UserDetail {userId}</div>
  )
}

export default UserDetail