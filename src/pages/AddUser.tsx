import { useState } from "react";
import { ApiServices } from "../services/apiServices";

const AddUser = ({ setShowAddUserModal }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    ApiServices.addUser({
      user_name: name,
      user_email: email,
      password: password,
    })
      .then(() => {
        alert("User added successfully");
        setShowAddUserModal(false);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("Error adding user");
        setShowAddUserModal(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add User</h2>
          <button
            className="btn-close"
            onClick={() => setShowAddUserModal(false)}
          >
            Close
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
