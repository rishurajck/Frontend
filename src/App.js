import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserManagement from "./component/dashboard/UserManagement.js";
import Onboarding from "./component/dashboard/Onboarding.js";
import CostExplorer from "./component/dashboard/CostExplorer.js";
import AwsService from "./component/dashboard/AwsService.js";
import ProtectedRoute from "./config/ProtectedRoute.js";
import CreateUser from "./pages/CreateUser.js";
import Unauthorized from "./pages/Unauthorized.js";
import EditUser from "./pages/EditUser.js";
import AccountSubmit from "./pages/AccountSubmit.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "read_only", "customer"]}>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route
            index
            path="usermanagement"
            element={
              <ProtectedRoute allowedRoles={["admin", "read_only"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="usermanagement/createuser"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="usermanagement/edituser/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="onboarding/accountOnboarding"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AccountSubmit />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="costexplorer"
            element={
              <ProtectedRoute allowedRoles={["admin", "read_only", "customer"]}>
                <CostExplorer />
              </ProtectedRoute>
            }
          />
          <Route
            path="awsservice"
            element={
              <ProtectedRoute allowedRoles={["admin", "read_only", "customer"]}>
                <AwsService />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
