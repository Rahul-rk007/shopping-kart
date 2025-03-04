import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MyAccount from "../MyAccount";
import "./Profile.css";
import { userProfile, editUserProfile } from "../../../api/userApi";

// Define the validation schema using Zod
const schema = z.object({
  firstName: z.string().nonempty("First Name is required."),
  lastName: z.string().nonempty("Last Name is required."),
  birthdate: z.coerce.date().min(new Date(0), "Birthdate is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
});

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // State to hold user details
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await userProfile();
        setUserDetails(userData); // Set user details in state
        console.log(userDetails?.birthdate);

        // Set the form values with the fetched user data
        setValue("firstName", userData.firstName);
        setValue("lastName", userData.lastName);
        setValue("mobileNumber", userData.mobileNumber);
        setValue("email", userData.email);
        setValue(
          "birthdate",
          userData.birthdate ? new Date(userData.birthdate) : null
        );
        setValue("gender", userData.gender);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await editUserProfile(data);
      setIsEditing(false);
      // Optionally, you can refetch the user profile here
      const updatedUserData = await userProfile(); // Refetch updated user data
      setUserDetails(updatedUserData); // Update state with new user data
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  const formatDateToDDMMYYYY = (date) => {
    // If date is a string, convert it to a Date object
    if (typeof date === "string") {
      date = new Date(date);
    }

    // Now check if it's a valid Date object
    if (date instanceof Date && !isNaN(date)) {
      const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
      const year = date.getFullYear(); // Get full year
      return `${day}/${month}/${year}`; // Return formatted date
    }
    return "N/A"; // Fallback if date is not valid
  };

  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  const maxDate = tenYearsAgo.toISOString().slice(0, 10); // Format as YYYY-MM-DD

  return (
    <MyAccount>
      <div>
        <div className="profile-card-header">
          <h2>User Profile</h2>
        </div>
        <div className="profile-container mt-5">
          <div className="profile-card">
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="profile-card-body">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <span className="error">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <span className="error">{errors.lastName.message}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Phone No</label>
                      <div className="profile-user-details">
                        <span>{userDetails?.mobileNumber}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email ID</label>
                      <div className="profile-user-details">
                        <span>{userDetails?.email}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Birthdate</label>
                      <input
                        type="date"
                        className="form-control"
                        {...register("birthdate")}
                        max={maxDate}
                      />
                      {errors.birthdate && (
                        <span className="error">
                          {errors.birthdate.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <select className="form-control" {...register("gender")}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <span className="error">{errors.gender.message}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="profile-save-btn btn-primary btn-red"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="profile-card-body">
                    <div className="form-group">
                      <label>First Name</label>
                      <div className="profile-user-details">
                        <span>{userDetails?.firstName}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <div className="profile-user-details">
                        <span>{userDetails?.lastName}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Phone No</label>
                      <div className="profile-user-details">
                        <span>{userDetails?.mobileNumber}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email ID</label>
                      <div className="profile-user-details">
                        <span>{userDetails?.email}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Birthdate</label>

                      <div className="profile-user-details">
                        <span>
                          {formatDateToDDMMYYYY(userDetails?.birthdate)}
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <div className="profile-user-details">
                        <span>
                          {userDetails?.gender ? userDetails?.gender : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="profile-edit-btn btn-primary btn-red"
                    onClick={() => setIsEditing(true)}
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
