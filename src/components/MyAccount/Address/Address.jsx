import React, { useState, useEffect } from "react";
import MyAccount from "../MyAccount";
import "./Address.css";
import Delete from "../../../assets/icon/delete.png";
import Edit from "../../../assets/icon/edit.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  addShippingAddress,
  countryList,
  deleteAddress,
  editAddress,
  getAllShippingAddresses,
  stateList,
} from "../../../api/shippingAddressApi";
import { toast } from "react-toastify";

// Validation schema using Zod
const schema = z.object({
  fullName: z.string().nonempty("Full Name is Required."),
  phoneNumber: z
    .string()
    .min(1, "Mobile Number is Required")
    .regex(/^\d{10}$/, "Mobile number must contain only digits"),
  address1: z.string().nonempty("Address is Required"),
  address2: z.string().optional(),
  country: z.string().nonempty("Country is Required"),
  state: z.string().nonempty("State is Required"),
  city: z.string().nonempty("City is Required"),
  zipCode: z.string().nonempty("Zip Code is Required"),
});

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [countries, setCountries] = useState([]); // Initialize as empty array
  const [states, setStates] = useState([]); // Initialize as empty array
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    // Fetch countries on component mount
    const fetchCountries = async () => {
      try {
        const response = await countryList(); // Ensure this returns a promise
        setCountries(response.data || []); // Set to empty array if response.data is undefined
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch all shipping addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAllShippingAddresses(); // Call the API to get all addresses
        setAddresses(response.data || []); // Set to empty array if response.data is undefined
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const fetchStates = async (countryId) => {
    try {
      const response = await stateList(countryId); // Call the API to get states for the selected country
      setStates(response.data || []); // Set to empty array if response.data is undefined
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const addressData = {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address1: data.address1,
        address2: data.address2,
        country: {
          _id: data.country,
          name: countries.find((country) => country._id === data.country)
            ?.countryName,
        },
        state: {
          _id: data.state,
          name: states.find((state) => state._id === data.state)?.stateName,
        },
        city: data.city,
        zipCode: data.zipCode,
      };

      console.log(addressData);

      if (editIndex !== null) {
        // Edit existing address
        await editAddress(addresses[editIndex]._id, addressData);
        // Re-fetch addresses after editing
        const updatedAddresses = await getAllShippingAddresses();
        setAddresses(updatedAddresses.data || []);
        toast.success("Shipping address updated successfully!")
      } else {
        // Add new address
        const response = await addShippingAddress(addressData);
        console.log(response);
        setAddresses((prevAddresses) => [...prevAddresses, response]);
        toast.success("Shipping address added successfully!")
      }
      reset();
      setIsFormVisible(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleEdit = (index) => {
    const addressToEdit = addresses[index];

    if (addressToEdit) {
      setEditIndex(index); // Set the edit index

      fetchStates(addressToEdit.country._id); // Fetch states for the selected country

      reset({
        fullName: addressToEdit.fullName,
        phoneNumber: addressToEdit.phoneNumber,
        address1: addressToEdit.address1,
        address2: addressToEdit.address2,
        country: addressToEdit.country._id, // Set the country ID
        state: addressToEdit.state._id, // Set the state ID
        city: addressToEdit.city,
        zipCode: addressToEdit.zipCode,
      });

      setIsFormVisible(true);
    } else {
      console.error("No address found for editing");
    }
  };

  const handleDelete = async (index) => {
    try {
      console.log(addresses[index]);

      await deleteAddress(addresses[index]._id);
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(updatedAddresses);
      toast.success("Shipping address deleted successfully!")
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const resetForm = () => {
    reset();
    setEditIndex(null);
  };

  return (
    <MyAccount>
      <div className="address-page-container container mt-5">
        <h2 className="text-center">Shipping Address List</h2>

        {/* Modal for adding/editing address */}
        {isFormVisible && (
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="address-page-modal-title text-center w-100">
                    {editIndex !== null ? "Edit Address" : "Add Your Address"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setIsFormVisible(false)}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body address-page-scrollable-modal-body">
                  <form
                    className="address-page-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="fullName">Full Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          {...register("fullName")}
                        />
                        {errors.fullName && (
                          <em className="form-error">
                            {errors.fullName.message}
                          </em>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="phoneNumber">Phone Number*</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phoneNumber"
                          {...register("phoneNumber")}
                        />
                        {errors.phoneNumber && (
                          <em className="form-error">
                            {errors.phoneNumber.message}
                          </em>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address1">Address-1*</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address1"
                        {...register("address1")}
                      />
                      {errors.address1 && (
                        <em className="form-error">
                          {errors.address1.message}
                        </em>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="address2">Address-2 (optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        {...register("address2")}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="country">Country*</label>
                        <select
                          id="country"
                          className="form-control"
                          {...register("country")}
                          onChange={(e) => {
                            const countryId = e.target.value;
                            setValue("country", countryId);
                            fetchStates(countryId); // Fetch states when country changes
                          }}
                        >
                          <option value="">Select a country...</option>
                          {countries.map((country) => (
                            <option key={country._id} value={country._id}>
                              {country.countryName}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <em className="form-error">
                            {errors.country.message}
                          </em>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="state">State*</label>
                        <select
                          id="state"
                          className="form-control"
                          {...register("state")}
                        >
                          <option value="">Choose...</option>
                          {states.map((state) => (
                            <option key={state._id} value={state._id}>
                              {state.stateName}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <em className="form-error">{errors.state.message}</em>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="city">City*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          {...register("city")}
                        />
                        {errors.city && (
                          <em className="form-error">{errors.city.message}</em>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="zipCode">Zip Code*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zipCode"
                          {...register("zipCode")}
                        />
                        {errors.zipCode && (
                          <em className="form-error">
                            {errors.zipCode.message}
                          </em>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-3 address-page-btn-primary btn-red"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-success address-page-newaddress-btn btn-red"
            onClick={() => {
              resetForm();
              setIsFormVisible(true);
            }}
          >
            New Address
          </button>
        </div>
        <div className="address-page-list-container">
        <div className="address-page-list-section">
          {addresses.length === 0 ? (
            <div className="alert alert-info" role="alert">
              There are no addresses available. Please add a new address.
            </div>
          ) : (
            <ul className="list-group">
              {addresses &&
                addresses.map((address, index) => (
                  <li
                    key={index} // Use a unique identifier for the key
                    className="address-page-list-group-item d-flex justify-content-between align-items-center mb-2"
                  >
                    <div>
                      <strong>{address.fullName}</strong>
                      <br />
                      {address.address1}{" "}
                      {address.address2 && `, ${address.address2}`}
                      <br />
                      {address.city}, {address.state.stateName}{" "}
                      {address.zipCode}, {address.country.countryName}
                      <br />
                      {address.phoneNumber}
                    </div>
                    <div>
                      <button
                        className="btn-sm address-list-icon"
                        onClick={() => handleEdit(index)} // Pass the unique id for editing
                      >
                        <img src={Edit} alt="Edit" />
                      </button>
                      <button
                        className="btn-sm ml-2 address-list-icon"
                        onClick={() => handleDelete(index)} // Pass the unique id for deleting
                      >
                        <img src={Delete} alt="Delete" />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      </div>
    </MyAccount>
  );
};

export default Address;
