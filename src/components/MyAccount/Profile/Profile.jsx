import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import MyAccount from "../MyAccount";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    phoneNo: "123-456-7890",
    emailId: "john.doe@example.com",
    birthDate: "1990-01-01",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Here you can add logic to save the updated details
    setIsEditing(false);
  };
  return (
    <MyAccount>
      <div>
        <div className="container mt-5">
          <div className="card">
            <div className="card-header">
              <h5>User Profile</h5>
            </div>
            <div className="card-body">
              {isEditing ? (
                <form>
                  <div className="profile-card-body">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={userDetails.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone No</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNo"
                        value={userDetails.phoneNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email ID</label>
                      <input
                        type="email"
                        className="form-control"
                        name="emailId"
                        value={userDetails.emailId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Birthdate</label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthDate"
                        value={userDetails.birthDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        className="form-control"
                        name="gender"
                        value={userDetails.gender}
                        onChange={handleChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      className="profile-save-btn btn-primary"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <form>
                    <div className="profile-card-body">
                      <div className="form-group">
                        <label>First Name</label>
                        <div className="profile-user-details">
                          <span>{userDetails.firstName}</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <div className="profile-user-details">
                          <span>{userDetails.lastName}</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Phone No</label>
                        <div className="profile-user-details">
                          <span>{userDetails.phoneNo}</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Email ID</label>
                        <div className="profile-user-details">
                          <span>{userDetails.emailId}</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Birthdate</label>
                        <div className="profile-user-details">
                          <span>{userDetails.birthDate}</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <div className="profile-user-details">
                          <span>{userDetails.gender}</span>
                        </div>
                      </div>
                    </div>
                  </form>
                  <button
                    className="profile-edit-btn btn-primary"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MyAccount>
  );
};

export default Profile;
