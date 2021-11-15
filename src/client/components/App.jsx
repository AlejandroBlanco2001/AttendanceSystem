import React from "react";
import Start from "../pages/Start";
import Login from "../pages/Login";
import StudentsList from "../pages/StudentsList";
import CoursesList from "../pages/CoursesList";
import Navbar from "./Navbar";
import CourseAttendance from "../pages/CourseAttendance";
import ChangePassword from "../pages/ChangePassword";
import Context from "./Context";
import UserProfile from "../pages/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route exact path="courseslist" element={<CoursesList />} />
          <Route path="login" element={<Login />} />
          <Route path="studentslist" element={<StudentsList />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="set_password" element={<ChangePassword />} />
          <Route path="courseattendance" element={<CourseAttendance />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
