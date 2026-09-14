import React, { useEffect, useState } from "react";
import "../css/PortfolioManagement.css";

function PortfolioManagement() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "curtains",
    description: "",
    location: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ================================
  // GET PORTFOLIO
  // ================================

  async function fetchPortfolio() {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/portfolio");

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio");
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // ================================
  // FORM CHANGE
  // ================================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleImageChange(event) {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB.");
        event.target.value = "";
        return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
}

function getImageUrl(imageUrl) {

    if (!imageUrl) {
        return "";
    }

    // New uploaded images
    if (imageUrl.startsWith("/uploads/")) {
        return `http://localhost:3000${imageUrl}`;
    }

    // Existing images from React public folder
    if (imageUrl.startsWith("/images/")) {
        return imageUrl;
    }

    return imageUrl;
}

  // ================================
  // OPEN ADD FORM
  // ================================

  function handleAdd() {

    setEditingProject(null);

    setFormData({
        title: "",
        category: "curtains",
        description: "",
        location: ""
    });

    setSelectedImage(null);
    setImagePreview(null);

    setShowForm(true);
}

  // ================================
  // OPEN EDIT FORM
  // ================================

  function handleEdit(project) {

    setEditingProject(project);

    setFormData({
        title: project.title || "",
        category: project.category || "curtains",
        description: project.description || "",
        location: project.location || ""
    });

    // No new image selected initially
    setSelectedImage(null);
    setImagePreview(null);

    setShowForm(true);
}

  // ================================
  // SAVE PROJECT
  // ================================

  async function handleSubmit(event) {

    event.preventDefault();

    const token =
        localStorage.getItem("adminToken");

    if (!token) {
        alert("Admin login required.");
        return;
    }


    // =========================
    // VALIDATION
    // =========================

    if (!editingProject && !selectedImage) {

        alert("Please select a project image.");

        return;
    }


    try {

        const url = editingProject
            ? `http://localhost:3000/api/portfolio/${editingProject.id}`
            : "http://localhost:3000/api/portfolio";


        const method = editingProject
            ? "PUT"
            : "POST";


        // =========================
        // FORM DATA
        // =========================

        const data = new FormData();

        data.append(
            "title",
            formData.title
        );

        data.append(
            "category",
            formData.category
        );

        data.append(
            "description",
            formData.description
        );

        data.append(
            "location",
            formData.location
        );


        // Only send image if a new one was selected
        if (selectedImage) {

            data.append(
                "image",
                selectedImage
            );
        }


        // =========================
        // REQUEST
        // =========================

        const response = await fetch(
            url,
            {
                method: method,

                headers: {
                    Authorization:
                        `Bearer ${token}`
                },

                body: data
            }
        );


        const result =
            await response.json();


        if (!response.ok) {

            console.error(result);

            alert(
                result.message ||
                result.error ||
                "Failed to save project."
            );

            return;
        }


        // =========================
        // SUCCESS
        // =========================

        setShowForm(false);

        setEditingProject(null);

        setSelectedImage(null);

        setImagePreview(null);

        await fetchPortfolio();


    } catch (error) {

        console.error(
            "Error saving project:",
            error
        );

        alert(
            "Unable to save project."
        );
    }
}

  // ================================
  // DELETE PROJECT
  // ================================

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(
        `http://localhost:3000/api/portfolio/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete project");

        return;
      }

      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);

      alert("Unable to delete project.");
    }
  }

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="empty-admin-state">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  // ================================
  // UI
  // ================================

  return (
    <section className="portfolio-management">
      <div className="section-header">
        <div>
          <p className="dashboard-label">PROJECT SHOWCASE</p>

          <h2>Manage Portfolio</h2>
        </div>

        <button className="add-product-button" onClick={handleAdd}>
          + Add Project
        </button>
      </div>

      {/* PROJECT GRID */}

      {projects.length === 0 ? (
        <div className="empty-admin-state">
          <div className="empty-icon">◇</div>

          <h3>No Projects Yet</h3>

          <p>Add your first completed project to the portfolio.</p>
        </div>
      ) : (
        <div className="portfolio-admin-grid">
          {projects.map((project) => (
            <div className="portfolio-admin-card" key={project.id}>
              <div className="portfolio-image">
                <img src={getImageUrl(project.image_url)} alt={project.title} />
              </div>

              <div className="portfolio-content">
                <span>{project.category}</span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                {project.location && <small>📍 {project.location}</small>}

                <div className="portfolio-actions">
                  <button
                    className="edit-product-button"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-product-button"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================================
                ADD / EDIT MODAL
            ================================= */}

      {showForm && (
        <div className="product-modal-overlay">
          <div className="product-modal">
            <div className="product-modal-header">
              <div>
                <p className="dashboard-label">PROJECT SHOWCASE</p>

                <h2>{editingProject ? "Edit Project" : "Add Project"}</h2>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form className="product-form" onSubmit={handleSubmit}>
              <label>
                Project Title
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Elegant Living Room Curtains"
                  required
                />
              </label>

              <label>
                Category
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="curtains">Curtains</option>

                  <option value="curtain-installation">
                    Curtain Installation
                  </option>

                  <option value="blinds">Blinds</option>

                  <option value="blind-installation">
                    Blind Installation
                  </option>

                  <option value="sofa">Sofa</option>
                </select>
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the completed project..."
                />
              </label>

              <div className="image-upload-group">

    <label>
        Project Image
    </label>

    <div className="image-upload-box">

        <input
            type="file"
            id="project-image"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            required={!editingProject}
        />

        <label
            htmlFor="project-image"
            className="image-upload-label"
        >
            <span className="upload-icon">↑</span>

            <strong>
                {selectedImage
                    ? selectedImage.name
                    : "Choose Project Image"}
            </strong>

            <small>
                JPG, PNG or WebP · Max 5MB
            </small>
        </label>

    </div>

    {imagePreview && (
        <div className="portfolio-image-preview">

            <p>IMAGE PREVIEW</p>

            <img
                src={imagePreview}
                alt="Project preview"
            />

        </div>
    )}

    {!imagePreview &&
        editingProject?.image_url && (
            <div className="portfolio-image-preview">

                <p>CURRENT IMAGE</p>

                <img
                    src={getImageUrl(editingProject.image_url)}
                    alt={editingProject.title}
                />

            </div>
        )}

</div>

              <label>
                Location
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Bengaluru"
                />
              </label>

              <div className="product-form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-product-button">
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default PortfolioManagement;
