import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { myContext } from "../components/Context";
const UserProfile = () => {
  const { user } = useContext(myContext);
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
                user.name2 +
                " " +
                user.lastName1 +
                " " +
                user.lastName2}
            </p>
          </div>
          <div className="user-email">
            <p>Email</p>
            <p>jony@uninorte.edu.co</p>
          </div>
          <div className="user-dob">
            <p>Date of birth</p>
            <p>{user.birthdate}</p>
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
