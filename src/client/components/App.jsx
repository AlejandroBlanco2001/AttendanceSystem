import React from "react";
import Start from "../pages/Start";
import Login from "../pages/Login";
import StudentsList from "../pages/StudentsList";
import CoursesList from "../pages/CoursesList";
import ChangePassword from "../pages/ChangePassword";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route path="login" element={<Login />} />
        <Route path="studentslist" element={<StudentsList />} />
        <Route path="set_password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
