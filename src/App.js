import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./components/NotFound/NotFound";
import AddStudent from "./components/AddStudent/AddStudent";
import AddClass from "./components/AddClass/AddClass";
import GenerateChallan from "./components/GenerateChallan/GenerateChallan";
import DisplayChallan from "./components/DisplayChallan/DisplayChallan";
import NoDataFound from "./pages/NoDataFound/NoDataFound";
import UpdateStatus from "./components/UpdateStatus/UpdateStatus";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add-student" element={<AddStudent />} />
          <Route path="/dashboard/add-class" element={<AddClass />} />
          <Route
            path="/dashboard/generate-challan"
            element={<GenerateChallan />}
          />
          <Route
            path="/dashboard/display-challan"
            element={<DisplayChallan />}
          />
          <Route path="/dashboard/update-status" element={<UpdateStatus />} />
          <Route path="/no-data-found" element={<NoDataFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
