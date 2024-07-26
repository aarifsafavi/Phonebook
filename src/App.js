import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import ContactList from "./pages/ContactList/index.js";
import AddContact from "./pages/AddContact/index.js";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/contacts")
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  const addContact = (name, phone) => {
    axios
      .post("http://localhost:7000/contacts", { name, phone })
      .then((response) => setContacts([...contacts, response.data]))
      .catch((error) => console.error("Error adding contact:", error));
  };

  const updateContact = (index, name, phone) => {
    const contactId = contacts[index].id;
    axios
      .put(`http://localhost:7000/contacts/${contactId}`, { name, phone })
      .then((response) => {
        const updatedContacts = contacts.map((contact) =>
          contact.id === contactId ? response.data : contact
        );
        setContacts(updatedContacts);
        console.log("Contact updated:", response.data);
      })
      .catch((error) => console.error("Error updating contact:", error));
  };

  const deleteContact = (index) => {
    const contactId = contacts[index].id;
    axios
      .delete(`http://localhost:7000/contacts/${contactId}`)
      .then(() => {
        setContacts(contacts.filter((contact) => contact.id !== contactId));
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={contacts}
                updateContact={updateContact}
                deleteContact={deleteContact}
              />
            }
          />
          <Route
            path="/add-contact"
            element={<AddContact addContact={addContact} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
