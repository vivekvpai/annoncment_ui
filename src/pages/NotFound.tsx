import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')} className="btn btn-primary">
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
