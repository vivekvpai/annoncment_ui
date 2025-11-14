import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiServices } from "../services/apiServices";

const UpdateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>({
    user_email: "",
    user_name: "",
    user_id: "",
  });

  const [id, setId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const userId: any = params.get("id"); // This will be "2"

    setId(userId);
    getUserById(userId);
  }, []);

  const getUserById = (userId: any) => {
    ApiServices.getUserById(userId)
      .then((response: any) => {
        console.log(response.data);
        setUser({
          user_email: response.data.user_email,
          user_name: response.data.user_name,
          user_id: response.data.user_id,
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const updateUser = () => {
    ApiServices.updateUserPassword(user)
      .then(() => {
        alert("User updated successfully");
        navigate("/dashboard");
      })
      .catch((error: any) => {
        alert("User updated failed");
      });
  };

  return (
    <div>
      <h2>Update User</h2>

      <h5>{user.user_id}</h5>
      <h5>{user.user_email}</h5>
      <h5>{user.user_name}</h5>

      <form style={{ marginTop: "20px" }}>
        <label htmlFor="name">User Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.user_name}
          onChange={(e) => setUser({ ...user, user_name: e.target.value })}
        />
        <br />

        <label htmlFor="name">User Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.user_name}
          onChange={(e) => setUser({ ...user, user_name: e.target.value })}
        />
      </form>

      <button
        type="submit"
        onClick={() => updateUser()}
        className="btn btn-primary"
        style={{ marginTop: "20px" }}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateUser;
