import { useEffect, useState } from 'react';
import { ApiServices } from '../services/apiServices';
import UserTable from '../components/UserTable';

const Dashboard = () => {

  const [users, setUsers] = useState<any>({});

  const getUsersList = async () => {
    try {
      const users = await ApiServices.getAllusers();
      setUsers(users);
      // console.log(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <p>Total Users: {users.count}</p>

      {users.data && <UserTable users={users.data} />}
    </div>
  );
};

export default Dashboard;
