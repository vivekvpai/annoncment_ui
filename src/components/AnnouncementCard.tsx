import { useAuth } from "../contexts/AuthContext";
import { ApiServices } from "../utilities/ApiServices";

const AnnouncementCard = ({ announcement, refresh }: any) => {
  const { userId } = useAuth();

  const handleDeleteAnnouncement = async (announcement_id: any) => {
    console.log(announcement_id);
    try {
      await ApiServices.deleteAnnouncement(announcement_id);

      refresh();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="announcement-list" key={announcement?.id}>
      <div className="announcement-card">
        <div className="announcement-header">
          <h3>{announcement?.announcement_title}</h3>
          <span className="category">{announcement?.category_name}</span>
        </div>

        <p>{announcement?.announcement_content}</p>
        <div className="announcement-meta">
          <span>Posted by: {announcement?.user_name}</span>
          <span>
            Posted on: {new Date(announcement?.timestamp).toLocaleDateString()}
          </span>
          {userId === announcement?.user_id?.toString() && (
            <div>
              <button
                className="btn-edit"
                style={{ marginRight: "10px" }}
                onClick={() =>
                  handleDeleteAnnouncement(announcement?.announcement_id)
                }
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() =>
                  handleDeleteAnnouncement(announcement?.announcement_id)
                }
              >
                Delete
              </button>
            </div>
          )}
          {/* <span>View {announcement.view_count}</span> */}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
