import React from "react";

const StudentsList = (props) => {
  // const data = props.location.state || {}
  console.log(props)
  return (
    <main class="class-list">
      <section class="class-codes">
        <div class="codes-teacher"></div>
        <div class="code-class"></div>
      </section>
      <h3>Attendance for teacher {data.email}</h3>
      <section class="class-search">
        <input class="search" type="text" placeholder="Type a student name" />
        <p class="class-status">12 students missing</p>
      </section>
      <section class="class-list-container">
        <div class="student-card">
          <img
            src="https://picsum.photos/600"
            alt="pp"
            class="student-picture"
          />
          <p class="student-name">Jonathan Arias Rua</p>
          <p class="student-code">200137471</p>
          <p class="student-logtime">log time: 9:31:18</p>
          <button class="delete-attendance">x</button>
        </div>
        <div class="student-card">
          <img
            src="https://picsum.photos/100"
            alt="pp"
            class="student-picture"
          />
          <p class="student-name">Jonathan Arias Rua</p>
          <p class="student-code">200137471</p>
          <p class="student-logtime">log time: 9:31:18</p>
          <button class="delete-attendance">x</button>
        </div>
        <div class="student-card">
          <img
            src="https://picsum.photos/210"
            alt="pp"
            class="student-picture"
          />
          <p class="student-name">Jonathan Arias Rua</p>
          <p class="student-code">200137471</p>
          <p class="student-logtime">log time: 9:31:18</p>
          <button class="delete-attendance">x</button>
        </div>
        <div class="student-card">
          <img
            src="https://picsum.photos/200"
            alt="pp"
            class="student-picture"
          />
          <p class="student-name">Jonathan Arias Rua</p>
          <p class="student-code">200137471</p>
          <p class="student-logtime">log time: 9:31:18</p>
          <button class="delete-attendance">x</button>
        </div>
        <div class="student-card">
          <img
            src="https://picsum.photos/400"
            alt="pp"
            class="student-picture"
          />
          <p class="student-name">Jonathan Arias Rua</p>
          <p class="student-code">200137471</p>
          <p class="student-logtime">log time: 9:31:18</p>
          <button class="delete-attendance">x</button>
        </div>
        <div class="student-card">
          <img
            src="https://picsum.photos/300"
            alt="pp"
            class="student-picture"
          />
          <p class="student-name">Jonathan Arias Rua</p>
          <p class="student-code">200137471</p>
          <p class="student-logtime">log time: 9:31:18</p>
          <button class="delete-attendance">x</button>
        </div>
        <div class="student-card">
          <img
            src="https://picsum.photos/250"
            alt="pp"
            class="student-picture"
          />
          <p class="student-name">Jonathan Arias Rua</p>
          <p class="student-code">200137471</p>
          <p class="student-logtime">log time: 9:31:18</p>
          <button class="delete-attendance">x</button>
        </div>
      </section>
    </main>
  );
};

export default StudentsList;
