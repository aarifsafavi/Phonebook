import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./index.module.scss";

const AddContact = ({ addContact }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      addContact(name, phone);
      setName("");
      setPhone("");
      navigate("/");
    }
  };

  return (
    <div className={s.addContactContainer}>
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <Link to="/">
            <button type="button" className={s.cancelButton}>
              Cancel
            </button>
          </Link>
          <button type="submit" className={s.submitButton}>
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
