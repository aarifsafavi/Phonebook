import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./index.module.scss";

const ContactList = ({ contacts, updateContact, deleteContact }) => {
  const [editContact, seteditContact] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const handleEditClick = (index) => {
    console.log("Edit clicked for index:", index);
    seteditContact(index);
    setEditedName(contacts[index].name);
    setEditedPhone(contacts[index].phone);
  };

  const handleSaveClick = () => {
    updateContact(editContact, editedName, editedPhone);
    seteditContact(null);
  };

  const handleCancelClick = () => {
    console.log("Cancel clicked");
    seteditContact(null);
    setEditedName("");
    setEditedPhone("");
  };

  return (
    <div className={s.sctList}>
      <div className={s.header}>
        <h1 className={s.title}>PhoneBook</h1>
        <Link to="/add-contact">
          <button className={s.addButton}>Add Contact</button>
        </Link>
      </div>
      <div className={s.table}>
        <div className={s.nameList}>Name</div>
        <div className={s.numberList}>Number</div>
      </div>
      {contacts.map((x, i) => (
        <div key={x.id} className={s.contactItem}>
          {editContact === i ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className={s.input}
              />
              <input
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className={s.input}
              />
              <div className={s.buttonGroup}>
                <button onClick={handleSaveClick} className={s.saveButton}>
                  Save
                </button>
                <button onClick={handleCancelClick} className={s.cancelButton}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={s.contactName}>{x.name}</div>
              <div className={s.contactNumber}>
                {x.phone}
                <div className={s.buttonGroup}>
                  <button
                    className={s.editButton}
                    onClick={() => handleEditClick(i)}
                  >
                    Edit
                  </button>
                  <button
                    className={s.deleteButton}
                    onClick={() => deleteContact(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
