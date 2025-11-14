import { useNavigate } from "react-router-dom";
import { ApiServices } from "../services/apiServices";

const UserTable = ({ users, deleteUsersList }: any) => {
  const navigate = useNavigate();

  const deleteUser = (user_email: string) => {
    ApiServices.deleteUser(user_email)
      .then(() => {
        alert("User deleted successfully");
        navigate("/dashboard");
        deleteUsersList(true);
      })
      .catch((error: any) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      });
  };

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.user_name}</td>
              <td>{user.user_email}</td>
              <td>
                <button
                  onClick={() => navigate(`/updateUser?id=${user.user_id}`)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.user_email)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
