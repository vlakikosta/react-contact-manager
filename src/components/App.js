import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function countGender(contacts){
    let gender = [];
    gender.male = 0;
    gender.female = 0;

    contacts.map((contact) => {
      (contact.gender == 'male') ? gender.male++ : gender.female++;
    });
    return gender;
}

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    setLoading(true);
    const response = await api.get("/contacts.json").catch(error => {alert(error)});
    //console.log(response.data,'response456');
    let data = response.data;
    let contacts = [];
    let gender = [];

    Object.keys(data).map((contact) =>{
      //console.log(data[contact],'contact123');
      const newContct = {
        id: contact,
        email: data[contact].email,
        name: data[contact].name,
        gender: data[contact].gender ? data[contact].gender : 'male',
      }
      contacts.push(newContct);
      //(newContct.gender == 'male') ? gender.male++ : gender.female++;
    });
    gender = countGender(contacts);
    setGender(gender);
    setLoading(false);
    return contacts;
    //return response.data;
  };



  const addContactHandler = async (contact) => {
    //console.log(contact);
    const request = {
      ...contact,
    };

    const response = await api.post("/contacts.json", request);
    //console.log(request,'addcontact');
    //const allContacts = await retrieveContacts();

    (request.gender == 'male') ? gender.male++ : gender.female++;
    //console.log(request, 'requestContact45');
    setContacts([...contacts, request]);
    setGender(gender);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}.json`, contact);
    //console.log(response,'response123');
    const { id, email, name, respGender } = response.data;
    let resultContact = contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      });
    let gender = [];
    // gender.male = 0;
    // gender.female = 0;
    // resultContact.map((contact) => {
    //   (contact.gender == 'male') ? gender.male++ : gender.female++;
    // });
    gender = countGender(resultContact);
    setContacts(resultContact);
    setGender(gender);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}.json`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    let gender = [];
    // gender.male = 0;
    // gender.female = 0;
    // newContactList.map((contact) => {
    //   (contact.gender == 'male') ? gender.male++ : gender.female++;
    // });
    gender = countGender(newContactList);
    setContacts(newContactList);
    setGender(gender);
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();

      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                gender={gender}
                loading={loading}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
