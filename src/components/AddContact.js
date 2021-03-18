import React from "react";
import "./AddContact.css";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    pointingClassName: "hidden",
    pointingClassEmail: "hidden",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      //alert("ALl the fields are mandatory!");
      this.setState({ pointingClassName: this.state.name,pointingClassEmail: this.state.email });
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
    this.props.history.push("/");

  };

  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value,pointingClassName: e.target.value })}
            />
            <div className={this.state.pointingClassName === "" ? "ui pointing red basic label" : "hidden"}>Please enter a value</div>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value,pointingClassEmail: e.target.value })}
            />
            <div className={this.state.pointingClassEmail === "" ? "ui pointing red basic label" : "hidden"}>Please enter a value</div>
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
