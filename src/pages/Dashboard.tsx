import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ApiServices } from "../utilities/ApiServices";
import ModalAddAnnouncement from "../components/ModalAddAnnouncement";

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
    // Refresh announcements after adding a new one
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

  const handleDeleteAnnouncement = async (announcement_id: any) => {
    console.log(announcement_id);
    try {
      await ApiServices.deleteAnnouncement(announcement_id);

      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
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
              <div className="announcement-list" key={announcement.id}>
                <div className="announcement-card">
                  <div className="announcement-header">
                    <h3>{announcement.announcement_title}</h3>
                    <span className="category">
                      {announcement.category_name}
                    </span>
                  </div>

                  <p>{announcement.announcement_content}</p>
                  <div className="announcement-meta">
                    <span>Posted by: {announcement.user_name}</span>
                    <span>
                      Posted on:{" "}
                      {new Date(announcement.timestamp).toLocaleDateString()}
                    </span>
                    {userId === announcement.user_id.toString() && (
                      <button
                        className=" btn-delete"
                        onClick={() =>
                          handleDeleteAnnouncement(announcement.announcement_id)
                        }
                      >
                        Delete
                      </button>
                    )}
                    {/* <span>View {announcement.view_count}</span> */}
                  </div>
                </div>
              </div>
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
        />
      )}
    </div>
  );
};

export default Dashboard;
