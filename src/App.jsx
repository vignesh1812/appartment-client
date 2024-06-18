import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import Unauthorize from "./Pages/Unauthorize";
import  ErrorPage  from "./Pages/ErrorPage";
import AllTickets from "./Components/AllTickets";
import CreateTicket from "./Pages/CreateTicket";
import UserTickets from "./Pages/UserTickets";
import TicketDetail from "./Pages/TicketDetail";
import AdminDash from "./Pages/AdminDash";
import MainDash from "./Pages/MainDash";
// import useAuth from "./hooks/useAuth";
import AssignTickets from "./Pages/AssignedTickets";
import AllUsers from "./Pages/AllUsers";
import EditUser from "./Pages/EditUser";
import UserDetail from "./Pages/UserDetail";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route index path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resident" element={<ProtectedRoute roles={["resident"]} />}>
            <Route path="" element={<ErrorPage />} />
            <Route path="create-ticket" element={<CreateTicket />} />
            <Route path="tickets" element={<UserTickets />} />
            <Route path="ticket/:ticketId" element={<TicketDetail />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route
            path="/admin"
            element={<ProtectedRoute roles={["admin", "superadmin"]} />}
          >
            <Route path="" element={<ErrorPage />} />
            <Route path="dashboard" element={<AdminDash />} />
            <Route path="register" element={<Register />} />
            <Route path="create-ticket" element={<CreateTicket />} />
            <Route path="tickets" element={<AllTickets />} />
            <Route path="ticket/:ticketId" element={<TicketDetail />} />
            <Route path="allusers" element={<AllUsers/>}/>
            <Route path="user/:userId" element={<UserDetail/>}/>
            <Route path="edit-user/:userId" element={<EditUser/>}/>
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />

          </Route>

          <Route path="/owner" element={<ProtectedRoute roles={["owner"]} />}>
            <Route path="dashboard" element={<AdminDash />} />
            <Route path="tickets" element={<AllTickets />} />
            <Route path="ticket/:ticketId" element={<TicketDetail />} />
            <Route path="profile" element={<Profile />} />

          </Route>
     
          <Route
            path="/maintainence"
            element={<ProtectedRoute roles={["maintainence"]} />}
          >
            <Route path="dashboard" element={<MainDash />} />
            <Route path="tickets" element={<AssignTickets />} />
            <Route
              path={`ticket/:ticketId`}
              element={<TicketDetail />}
            />
            <Route path="profile" element={<Profile />} />

          </Route>
          <Route path="/unauthorized" element={<Unauthorize/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
