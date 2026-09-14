import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import PortfolioManagement from "../components/PortfolioManagement";
import GalleryManagement from "../components/GalleryManagement";

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");

  const [stats, setStats] = useState({
    products: 0,
    portfolio: 0,
    enquiries: 0,
    reviews: 0,
  });

  const [reviews, setReviews] = useState([]);

  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showReviewForm, setShowReviewForm] = useState(false);

  const [editingReview, setEditingReview] = useState(null);

  const [reviewForm, setReviewForm] = useState({
    customer_name: "",
    rating: 5,
    review: "",
    location: "",
  });

  // =========================
  // GET TOKEN
  // =========================

  const token = localStorage.getItem("adminToken");

  // =========================
  // FETCH DASHBOARD STATS
  // =========================

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    fetchStats();
  }, [navigate, token]);

  async function fetchStats() {
    try {
      const response = await fetch("http://localhost:3000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  // =========================
  // FETCH REVIEWS
  // =========================

  async function fetchReviews() {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/reviews");

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();

      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }

  function getAdminToken() {
    return localStorage.getItem("adminToken");
  }

  // =========================
  // FETCH ENQUIRIES
  // =========================

  async function fetchEnquiries() {
    setLoading(true);

    const token = getAdminToken();

    console.log("Admin token exists:", !!token);

    if (!token) {
      console.error("No admin token found.");
      setLoading(false);
      navigate("/admin");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/enquiries", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Enquiries API status:", response.status);

      if (response.status === 401) {
        console.error("Admin token is invalid or expired.");

        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/admin");

        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const data = await response.json();

      console.log("Enquiries received:", data);

      setEnquiries(data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // SIDEBAR SECTION
  // =========================

  function handleSectionChange(section) {
    setActiveSection(section);

    if (section === "reviews") {
      fetchReviews();
    }

    if (section === "enquiries") {
      fetchEnquiries();
    }
  }

  // =========================
  // FORM INPUT
  // =========================

  function handleReviewChange(event) {
    const { name, value } = event.target;

    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // =========================
  // ADD / EDIT REVIEW
  // =========================

  async function handleReviewSubmit(event) {
    event.preventDefault();

    try {
      const url = editingReview
        ? `http://localhost:3000/api/reviews/${editingReview.id}`
        : "http://localhost:3000/api/reviews";

      const method = editingReview ? "PUT" : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          customer_name: reviewForm.customer_name,

          rating: Number(reviewForm.rating),

          review: reviewForm.review,

          location: reviewForm.location,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        alert(data.message || "Something went wrong");

        return;
      }

      alert(
        editingReview
          ? "Review updated successfully!"
          : "Review added successfully!",
      );

      // Reset form

      setReviewForm({
        customer_name: "",
        rating: 5,
        review: "",
        location: "",
      });

      setEditingReview(null);

      setShowReviewForm(false);

      fetchReviews();

      fetchStats();
    } catch (error) {
      console.error("Error saving review:", error);

      alert("Unable to save review.");
    }
  }

  // =========================
  // EDIT REVIEW
  // =========================

  function handleEditReview(review) {
    setEditingReview(review);

    setReviewForm({
      customer_name: review.customer_name,
      rating: review.rating,
      review: review.review,
      location: review.location || "",
    });

    setShowReviewForm(true);
  }

  // =========================
  // DELETE REVIEW
  // =========================

  async function handleDeleteReview(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/reviews/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        alert(data.message || "Failed to delete review");

        return;
      }

      fetchReviews();

      fetchStats();
    } catch (error) {
      console.error("Error deleting review:", error);

      alert("Unable to delete review.");
    }
  }
  async function handleDeleteEnquiry(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/enquiries/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        alert(data.message || "Failed to delete enquiry");

        return;
      }

      setEnquiries((prev) => prev.filter((enquiry) => enquiry.id !== id));

      fetchStats();
    } catch (error) {
      console.error("Error deleting enquiry:", error);

      alert("Unable to delete enquiry.");
    }
  }

  // =========================
  // RESET REVIEW FORM
  // =========================

  function resetReviewForm() {
    setReviewForm({
      customer_name: "",
      rating: 5,
      review: "",
      location: "",
    });

    setEditingReview(null);

    setShowReviewForm(false);
  }

  // =========================
  // LOGOUT
  // =========================

  function logout() {
    localStorage.removeItem("adminToken");

    localStorage.removeItem("admin");

    navigate("/admin");
  }

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  return (
    <div className="admin-dashboard">
      {/* =========================
                SIDEBAR
            ========================= */}

      <aside className="admin-sidebar">
        <div className="admin-brand">
          <p>LUCKY HOME DECOR</p>

          <span>ADMIN PANEL</span>
        </div>

        <nav className="admin-nav">
          <button
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => handleSectionChange("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={activeSection === "portfolio" ? "active" : ""}
            onClick={() => handleSectionChange("portfolio")}
          >
            <span>▣</span>
            Portfolio
          </button>

          <button
            className={activeSection === "gallery" ? "active" : ""}
            onClick={() => handleSectionChange("gallery")}
          >
            <span>▧</span>
            Gallery
          </button>

          <button
            className={activeSection === "enquiries" ? "active" : ""}
            onClick={() => handleSectionChange("enquiries")}
          >
            <span>✉</span>
            Enquiries
          </button>

          <button
            className={activeSection === "reviews" ? "active" : ""}
            onClick={() => handleSectionChange("reviews")}
          >
            <span>★</span>
            Reviews
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="website-button" onClick={() => navigate("/")}>
            ← View Website
          </button>

          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      {/* =========================
                MAIN
            ========================= */}

      <main className="admin-main">
        {/* TOP BAR */}
        <header className="admin-topbar">
          <div>
            <p className="dashboard-label">ADMINISTRATION</p>

            <h1>
              {activeSection === "dashboard" && "Dashboard"}

              {activeSection === "portfolio" && "Portfolio"}

              {activeSection === "gallery" && "Gallery"}

              {activeSection === "enquiries" && "Enquiries"}

              {activeSection === "reviews" && "Reviews"}
            </h1>
          </div>

          <div className="admin-user">
            <div className="admin-avatar">
              {admin.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{admin.username || "Admin"}</strong>

              <span>Administrator</span>
            </div>
          </div>
        </header>
        {/* =========================
                    DASHBOARD
                ========================= */}
        {activeSection === "dashboard" && (
          <>
            <section className="stats-grid">
              {/* PRODUCTS */}
              <div className="stat-card">
                <div className="stat-icon">▣</div>

                <div>
                  <p>TOTAL PRODUCTS</p>
                  <h2>{stats.products}</h2>
                </div>
              </div>

              {/* PORTFOLIO */}
              <div className="stat-card">
                <div className="stat-icon">◇</div>

                <div>
                  <p>TOTAL PORTFOLIO</p>
                  <h2>{stats.portfolio}</h2>
                </div>
              </div>

              {/* ENQUIRIES */}
              <div className="stat-card">
                <div className="stat-icon">✉</div>

                <div>
                  <p>TOTAL ENQUIRIES</p>
                  <h2>{stats.enquiries}</h2>
                </div>
              </div>

              {/* REVIEWS */}
              <div className="stat-card">
                <div className="stat-icon">★</div>

                <div>
                  <p>TOTAL REVIEWS</p>
                  <h2>{stats.reviews}</h2>
                </div>
              </div>
            </section>

            <section className="dashboard-welcome">
              <div>
                <p className="dashboard-label">LUCKY HOME DECOR</p>

                <h2>
                  Welcome to your
                  <br />
                  <span>Admin Dashboard.</span>
                </h2>

                <p>
                  Manage your products, portfolio, customer enquiries and
                  reviews from one place.
                </p>
              </div>

              <div className="welcome-decoration">✦</div>
            </section>
          </>
        )}
        {/* =========================
                    PORTFOLIO
                ========================= */}
        {activeSection === "portfolio" && <PortfolioManagement />}

        {/* =========================
                    GALLERY
            ========================= */}

        {activeSection === "gallery" && <GalleryManagement />}

        {/* =========================
                    ENQUIRIES
                ========================= */}
        {activeSection === "enquiries" && (
          <section className="admin-section">
            <div className="section-header">
              <div>
                <p className="dashboard-label">CUSTOMER CONTACT</p>
                <h2>Customer Enquiries</h2>
              </div>
              <div className="enquiry-count">{enquiries.length} Enquiries</div>
            </div>
            {/* Loading */}
            {loading && (
              <div className="empty-admin-state">
                <p>Loading enquiries...</p>
              </div>
            )}
            {/* No enquiries */}
            {!loading && enquiries.length === 0 && (
              <div className="empty-admin-state">
                <div className="empty-icon">✉</div>
                <h3>No Enquiries Yet</h3>
                <p>Customer quote requests will appear here.</p>
              </div>
            )}
            {/* Enquiry List */}
            {!loading && enquiries.length > 0 && (
              <div className="enquiries-list">
                {enquiries.map((enquiry) => (
                  <div className="enquiry-card" key={enquiry.id}>
                    {/* Customer */}
                    <div className="enquiry-header">
                      <div>
                        <h3>{enquiry.name}</h3>
                        <span>{enquiry.service || "General Enquiry"}</span>
                      </div>

                      <div className="enquiry-date">
                        {new Date(enquiry.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </div>

                    {/* Contact */}

                    <div className="enquiry-contact">
                      <a href={`tel:${enquiry.phone}`}>📞 {enquiry.phone}</a>

                      {enquiry.email && (
                        <a href={`mailto:${enquiry.email}`}>
                          ✉ {enquiry.email}
                        </a>
                      )}
                    </div>

                    {/* Message */}

                    {enquiry.message && (
                      <div className="enquiry-message">
                        <p>{enquiry.message}</p>
                      </div>
                    )}

                    {/* Delete */}

                    <div className="enquiry-actions">
                      <button
                        className="delete-review-button"
                        onClick={() => handleDeleteEnquiry(enquiry.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
        {/* =========================
                    REVIEWS
                ========================= */}
        {activeSection === "reviews" && (
          <section className="admin-section">
            {/* HEADER */}

            <div className="section-header">
              <div>
                <p className="dashboard-label">CUSTOMER FEEDBACK</p>

                <h2>Manage Reviews</h2>
              </div>

              <button
                className="add-button"
                onClick={() => {
                  setEditingReview(null);
                  setReviewForm({
                    customer_name: "",
                    rating: 5,
                    review: "",
                    location: "",
                  });
                  setShowReviewForm(true);
                }}
              >
                + Add Review
              </button>
            </div>

            {/* ADD / EDIT FORM */}

            {showReviewForm && (
              <div className="review-form-card">
                <div className="form-title">
                  <h3>{editingReview ? "Edit Review" : "Add New Review"}</h3>

                  <button onClick={resetReviewForm} className="close-form">
                    ×
                  </button>
                </div>

                <form onSubmit={handleReviewSubmit}>
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Customer Name</label>

                      <input
                        type="text"
                        name="customer_name"
                        value={reviewForm.customer_name}
                        onChange={handleReviewChange}
                        required
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Location</label>

                      <input
                        type="text"
                        name="location"
                        value={reviewForm.location}
                        onChange={handleReviewChange}
                        placeholder="Bengaluru"
                        required
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Rating</label>

                      <select
                        name="rating"
                        value={reviewForm.rating}
                        onChange={handleReviewChange}
                      >
                        <option value="5">5 Stars</option>

                        <option value="4">4 Stars</option>

                        <option value="3">3 Stars</option>

                        <option value="2">2 Stars</option>

                        <option value="1">1 Star</option>
                      </select>
                    </div>

                    <div className="admin-form-group full-width">
                      <label>Review</label>

                      <textarea
                        name="review"
                        value={reviewForm.review}
                        onChange={handleReviewChange}
                        rows="5"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={resetReviewForm}
                    >
                      Cancel
                    </button>

                    <button type="submit" className="save-button">
                      {editingReview ? "Update Review" : "Save Review"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* REVIEWS */}

            {loading ? (
              <div className="empty-admin-state">
                <p>Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="empty-admin-state">
                <h3>No Reviews</h3>

                <p>Add your first customer review.</p>
              </div>
            ) : (
              <div className="admin-reviews-list">
                {reviews.map((review) => (
                  <div className="admin-review-card" key={review.id}>
                    <div className="admin-review-top">
                      <div>
                        <h3>{review.customer_name}</h3>

                        <span>{review.location}</span>
                      </div>

                      <div className="admin-review-stars">
                        {"★".repeat(review.rating)}
                      </div>
                    </div>

                    <p className="admin-review-text">"{review.review}"</p>

                    <div className="admin-review-actions">
                      <button
                        className="edit-review-button"
                        onClick={() => handleEditReview(review)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-review-button"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
