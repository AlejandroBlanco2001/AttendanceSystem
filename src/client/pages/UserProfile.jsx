import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { myContext } from "../components/Context";
const UserProfile = () => {
  const trimDateOfBirth = (dob) => {
    let dobmod = dob.substring(0, dob.indexOf("T"));
    return dobmod;
  };

  const { user } = useContext(myContext);
  const userdate = new Date(trimDateOfBirth(user.birthdate));
  console.log(user);
  return (
    <>
      <Navbar />
      <h2 className="my-account-tittle">MY ACCOUNT</h2>
      <main className="user-profile">
        <section className="user-info">
          <div className="user-name">
            <p>First name</p>
            <p>
              {user.name1 +
                " " +
                (user.name2 ? user.name2 : " ") +
                " " +
                user.lastName1 +
                " " +
                (user.lastName2 ? user.lastName2 : " ")}
            </p>
          </div>
          <div className="user-email">
            <p>Student unique code</p>
            <p>{user.id}</p>
          </div>
          <div className="user-gender">
            <p>Gender</p>
            <p>{user.gender == "M" ? "Masculine" : "Feminine"}</p>
          </div>
          <div className="user-dob">
            <p>Date of birth</p>
            <p>
              {userdate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="user-role">
            <p>Rol</p>
            <p>{user.id}</p>
          </div>
        </section>
        <section className="user-info user-career-info">
          <div className="career-info">
            <p>Current program</p>
            <p>Systems Engineering</p>
          </div>
        </section>
        <button className="button primary-button profile-button">
          SIGN OUT
        </button>
      </main>
    </>
  );
};

export default UserProfile;
