import React, { useEffect, useState } from "react";
import { ApiServices } from "../utilities/ApiServices";
import "./ModalAddAnnouncement.css";
import { useAuth } from "../contexts/AuthContext";

interface AnnouncementFormData {
  announcement_title: string;
  announcement_content: string;
  category_id: string;
  user_id: any;
}

interface ModalAddAnnouncementProps {
  announcementFromParent: any;
  onClose: () => void;
  onAnnouncementAdded?: () => void;
}

const ModalAddAnnouncement = ({
  announcementFromParent,
  onClose,
  onAnnouncementAdded,
}: ModalAddAnnouncementProps) => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState<AnnouncementFormData>({
    announcement_title: "",
    announcement_content: "",
    category_id: "",
    user_id: userId,
  });
  const [announcementId, setAnnouncementId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.announcement_title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.announcement_content.trim()) {
      setError("Content is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Announcement data:", formData);

      await ApiServices.insertAnnouncement(formData);

      onClose();
      if (onAnnouncementAdded) {
        onAnnouncementAdded();
      }
    } catch (err) {
      console.error("Error adding announcement:", err);
      setError("Failed to add announcement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await ApiServices.getAnnaoncmentCategory();
      setCategories(categories.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await ApiServices.updateAnnouncement(announcementId, formData);
      
      if (onAnnouncementAdded) {
        onAnnouncementAdded();
      }
      onClose();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  useEffect(() => {
    if (announcementFromParent) {
      console.log("Announcement data:", announcementFromParent);
      setFormData({
        announcement_title: announcementFromParent.announcement_title,
        announcement_content: announcementFromParent.announcement_content,
        category_id: announcementFromParent.category_id,
        user_id: announcementFromParent.user_id,
      });
      setAnnouncementId(announcementFromParent.announcement_id);
    } else {
      setFormData({
        announcement_title: "",
        announcement_content: "",
        category_id: "",
        user_id: userId,
      });
      setAnnouncementId(null);
    }

    fetchCategories();
  }, [announcementFromParent]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          {announcementId ? (
            <h2>Edit Announcement</h2>
          ) : (
            <h2>Add New Announcement</h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="btn-close"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="announcement-form">
          <div className="form-group">
            <label htmlFor="announcement_title">Title</label>
            <input
              type="text"
              id="announcement_title"
              name="announcement_title"
              value={formData.announcement_title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter announcement title"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="announcement_content">Content</label>
            <textarea
              id="announcement_content"
              name="announcement_content"
              value={formData.announcement_content}
              onChange={handleChange}
              className="form-control"
              rows={5}
              placeholder="Enter announcement content"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category_id">Category</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            >
              <option value="">Select a category</option>
              {categories.map((category: any) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            {announcementId ? (
              <button
                type="button"
                onClick={handleEdit}
                className="btn btn-primary"
                disabled={loading}
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Adding..." : "Add Announcement"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddAnnouncement;
