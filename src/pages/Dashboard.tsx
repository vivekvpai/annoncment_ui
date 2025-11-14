import { useEffect, useState } from "react";
import { ApiServices } from "../services/apiServices";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";

const Dashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any>({});

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const getUsersList = async () => {
    try {
      const users = await ApiServices.getAllusers();
      setUsers(users);
      // console.log(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);


  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <p>Total Users: {users.count}</p>

      <button
        type="submit"
        onClick={() => setShowAddUserModal(true)}
        className="btn btn-primary"
        style={{ marginTop: "20px" }}
      >
        Add User
      </button>

      {users.data && <UserTable users={users.data} deleteUsersList={getUsersList} />}

      {showAddUserModal && (
        <AddUser
          setShowAddUserModal={() => {
            setShowAddUserModal(false);
            getUsersList();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
