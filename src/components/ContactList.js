import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import PieChart from "./PieChart";

const ContactList = (props) => {
  //console.log(props, 'props123');

  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });
  return (
    
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>

      <PieChart
        width={400}
        height={200}
        fillType="range"
        fill={["#e600e5", "#800080"]}
        data={[
          props.gender.male,
          props.gender.female,
        ]}
        labels={[
          'Male' ,
          'Female' ,
        ]}
        handleOnClick={null}
        onClickFilter={null}
      />


      {props.contacts && props.contacts.length > 0 ? (<div className="ui celled list items">{renderContactList}</div>) : "No data"}
      {props.loading ? (
        <div>
          <div className="ui placeholder">
            <div className="image header">
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="paragraph">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <div class="ui active centered inline loader"></div>
        </div>
        ) : ""}
    </div>
  );
};

export default ContactList;
