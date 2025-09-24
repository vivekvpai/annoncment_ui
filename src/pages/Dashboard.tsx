import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ApiServices } from "../utilities/ApiServices";
import ModalAddAnnouncement from "../components/ModalAddAnnouncement";
import AnnouncementCard from "../components/AnnouncementCard";

const Dashboard: React.FC = () => {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcements = await ApiServices.getAllAnnouncements();
        console.log(announcements.data);
        setAnnouncements(announcements.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddAnnouncement = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleAnnouncementAdded = useCallback(() => {
    alert("Add Announcement");
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const announcements = await ApiServices.getAllAnnouncements();
      setAnnouncements(announcements.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome to Announcement System</h1>
          {userId && <p className="user-id">User ID: {userId}</p>}
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </header>
      <main>
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h2> Announcements</h2>

            <button onClick={handleAddAnnouncement} className="btn btn-primary">
              Add Announcement
            </button>
          </div>

          {announcements.length > 0 ? (
            announcements.map((announcement: any) => (
              <AnnouncementCard
                announcement={announcement}
                refresh={() => {
                  fetchAnnouncements();
                  console.log("Announcement deleted");
                }}
              />
            ))
          ) : (
            <div className="announcement-list">
              <div className="announcement-card">No announcements found</div>
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <ModalAddAnnouncement
          onClose={handleCloseModal}
          onAnnouncementAdded={handleAnnouncementAdded}
          announcementFromParent={undefined}
        />
      )}
    </div>
  );
};

export default Dashboard;
