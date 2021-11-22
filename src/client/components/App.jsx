import React from "react";
import Context from "./Context";
import Start from "../pages/Start";
import Login from "../pages/Login";
import StudentsList from "../pages/StudentsList";
import CoursesList from "../pages/CoursesList";
import AdminPanel from "../pages/AdminPanel";
import Navbar from "./Navbar";
import CourseAttendance from "../pages/CourseAttendance";
import ChangePassword from "../pages/ChangePassword";
import UserProfile from "../pages/UserProfile";
import User from "../pages/consults/Users";
import Person from "../pages/consults/Persons";
import Subject from "../pages/consults/Subjects";
import Deparment from "../pages/consults/Deparments";
import Courses from "../pages/consults/Courses";
import Space from "../pages/consults/Spaces";
import Schedule from "../pages/consults/Schedules";
import Classroom from "../pages/consults/Classrooms";
import Class from "../pages/consults/Classes";
import Enrollment from "../pages/consults/Enrollments";
import Period from "../pages/consults/Periods";
import Contract from "../pages/consults/Contracts";
import Syllabus from "../pages/consults/Syllabuses";
import Program from "../pages/consults/Programs";
import PeriodCourse from "../pages/consults/PeriodCourses";
import EnrollmentCourse from "../pages/consults/EnrollmentCourses";
import StudentClass from "../pages/consults/StudentClasses";
import SyllabusSubject from "../pages/consults/SyllabusSubjects";





import { BrowserRouter, Routes, Route } from "react-router-dom";
import Classes from "../pages/consults/Classes";
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
          <Route path="adminpanel" element={<AdminPanel />}/>
          <Route exact path="/users" element={<User />}/>
          <Route exact path="/persons" element={<Person />}/>
          <Route exact path="/subjects" element={<Subject />}/>
          <Route exact path="/deparments" element={<Deparment />}/>
          <Route exact path="/courses" element={<Courses />}/>
          <Route exact path="/spaces" element={<Space />}/>
          <Route exact path="/schedules" element={<Schedule />}/>
          <Route exact path="/classrooms" element={<Classroom />}/>
          <Route exact path="/classes" element={<Class />}/>
          <Route exact path="/enrollments" element={<Enrollment />}/>
          <Route exact path="/periods" element={<Period />}/>
          <Route exact path="/contracts" element={<Contract />}/>
          <Route exact path="/syllabuses" element={<Syllabus />}/>
          <Route exact path="/programs" element={<Program />}/>
          <Route exact path="/periodCourses" element={<PeriodCourse />}/>
          <Route exact path="/enrollmentCourses" element={<EnrollmentCourse />}/>
          <Route exact path="/studentClasses" element={<StudentClass />}/>
          <Route exact path="/syllabusSubjects" element={<SyllabusSubject />}/>
          
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
