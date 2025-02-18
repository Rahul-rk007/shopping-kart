import React, { useState, useEffect } from "react";
import MyAccount from "../MyAccount";
import "./Address.css";
import Delete from "../../../assets/icon/delete.png"
import Edit from "../../../assets/icon/edit.png"

const Address = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    country: "",
    defaultAddress: false,
  });
  const [addresses, setAddresses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (addresses.length > 0) {
      setIsFirstVisit(false);
    }
  }, [addresses]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedAddresses = addresses.map((address, index) =>
        index === editIndex ? formData : address
      );
      setAddresses(updatedAddresses);
    } else {
      setAddresses([...addresses, formData]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      streetAddress: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
      country: "",
      defaultAddress: false,
    });
    setIsFormVisible(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(addresses[index]);
    setIsFormVisible(true);
  };

  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "IN", name: "India" },
  ];

  return (
    <MyAccount>
      <div className="adderss-page-container container mt-5">
        <h2 className="text-center">Shippin Address List</h2>

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
                  <form className="address-page-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="firstName">Full name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="phoneNumber">Phone number*</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="streetAddress">Address-1*</label>
                      <input
                        type="text"
                        className="form-control"
                        id="streetAddress"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="apt">Address2 (optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="apt"
                        name="apt"
                        value={formData.apt}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="city">City*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="zip">Zip code*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="state">State*</label>
                        <select
                          id="state"
                          className="form-control"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose...</option>
                          <option value="state1">State 1</option>
                          <option value="state2">State 2</option>
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="country">Country*</label>
                        <select
                          id="country"
                          className="form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a country...</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="defaultAddress"
                          name="defaultAddress"
                          checked={formData.defaultAddress}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultAddress"
                        >
                          Set as default address
                        </label>
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
        <div className="address-page-list-section">
          {addresses.length === 0 ? (
            <div className="alert alert-info" role="alert">
              There are no addresses available. Please add a new address.
            </div>
          ) : (
            <ul className="list-group">
              {addresses.map((address, index) => (
                <li
                  key={index}
                  className="address-page-list-group-item d-flex justify-content-between align-items-center mb-2"
                >
                  <div>
                    <strong>
                      {address.firstName} {address.lastName}
                    </strong>
                    <br />
                    {address.streetAddress} {address.apt && `, ${address.apt}`}
                    <br />
                    {address.city}, {address.state} {address.zip}
                    <br />
                    {address.phoneNumber}
                    <br />
                    {address.country}
                  </div>
                  <div>
                    <button
                      className="btn-sm address-list-icon"
                      onClick={() => handleEdit(index)}
                    >
                      <img src={Edit} />
                    </button>
                    <button
                      className="btn-sm ml-2 address-list-icon"
                      onClick={() => handleDelete(index)}
                    >
                      <img src={Delete} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MyAccount>
  );
};

export default Address;
