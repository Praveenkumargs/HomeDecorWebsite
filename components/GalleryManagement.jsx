import React, { useEffect, useState } from "react";
import "../css/GalleryManagement.css";

function GalleryManagement() {

    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("curtains");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const token = localStorage.getItem("adminToken");


    // =========================
    // FETCH IMAGES
    // =========================

    async function fetchImages() {

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/api/gallery"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch gallery");
            }

            const data = await response.json();

            setImages(data);

        } catch (error) {

            console.error(
                "Error fetching gallery:",
                error
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {
        fetchImages();
    }, []);


    // =========================
    // SELECT IMAGE
    // =========================

    function handleFileChange(event) {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        setSelectedFile(file);

        const imagePreview =
            URL.createObjectURL(file);

        setPreview(imagePreview);
    }


    // =========================
    // UPLOAD IMAGE
    // =========================

    async function handleUpload(event) {

        event.preventDefault();

        if (!selectedFile) {

            alert("Please select an image.");

            return;
        }

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append("category", category);
            formData.append("image", selectedFile);
            


            const response = await fetch(
                "http://localhost:3000/api/gallery/upload",
                {
                    method: "POST",

                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                    body: formData
                }
            );


            const data = await response.json();


            if (response.status === 401) {

                alert("Your admin session has expired.");

                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin");

                window.location.href = "/admin";

                return;
            }


            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to upload image."
                );

                return;
            }


            alert("Image uploaded successfully!");


            // Reset
            setSelectedFile(null);
            setPreview(null);

            document
                .getElementById("gallery-file-input")
                .value = "";


            fetchImages();

        } catch (error) {

            console.error(
                "Error uploading image:",
                error
            );

            alert("Unable to upload image.");

        } finally {

            setUploading(false);

        }
    }


    // =========================
    // DELETE IMAGE
    // =========================

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmed) {
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:3000/api/gallery/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const data = await response.json();


            if (response.status === 401) {

                alert("Your admin session has expired.");

                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin");

                window.location.href = "/admin";

                return;
            }


            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to delete image."
                );

                return;
            }


            setImages(prevImages =>
                prevImages.filter(
                    image => image.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Error deleting image:",
                error
            );

            alert("Unable to delete image.");

        }
    }


    // =========================
    // IMAGE URL
    // =========================

    function getImageUrl(imageUrl) {

        return `http://localhost:3000${imageUrl}`;

    }


    return (

        <section className="gallery-management">

            {/* =========================
                HEADER
            ========================= */}

            <div className="gallery-header">

                <div>

                    <p className="dashboard-label">
                        WEBSITE IMAGES
                    </p>

                    <h2>
                        Gallery
                    </h2>

                    <p className="gallery-description">
                        Upload the best curtain and blind
                        images to showcase on your website.
                    </p>

                </div>

            </div>


            {/* =========================
                UPLOAD AREA
            ========================= */}

            <div className="gallery-upload-card">

                <div className="gallery-upload-title">

                    <div>

                        <h3>
                            Upload New Image
                        </h3>

                        <p>
                            Choose an image and select where
                            it should appear on the website.
                        </p>

                    </div>

                </div>


                <form onSubmit={handleUpload}>

                    <div className="gallery-upload-grid">


                        {/* CATEGORY */}

                        <div className="gallery-form-group">

                            <label>
                                Gallery Category
                            </label>

                            <select
                                value={category}
                                onChange={(event) =>
                                    setCategory(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="curtains">
                                    Curtains
                                </option>

                                <option value="blinds">
                                    Blinds
                                </option>

                            </select>

                        </div>


                        {/* FILE */}

                        <div className="gallery-form-group">

                            <label>
                                Choose Image
                            </label>

                            <input
                                id="gallery-file-input"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleFileChange}
                            />

                            <small>
                                JPG, PNG or WebP · Max 5MB
                            </small>

                        </div>

                    </div>


                    {/* PREVIEW */}

                    {preview && (

                        <div className="gallery-preview">

                            <p>
                                IMAGE PREVIEW
                            </p>

                            <div className="gallery-preview-image">

                                <img
                                    src={preview}
                                    alt="Preview"
                                />

                            </div>

                        </div>

                    )}


                    {/* BUTTON */}

                    <div className="gallery-upload-actions">

                        <button
                            type="submit"
                            className="gallery-upload-button"
                            disabled={uploading}
                        >

                            {uploading
                                ? "Uploading..."
                                : "Upload Image"
                            }

                        </button>

                    </div>

                </form>

            </div>


            {/* =========================
                GALLERY
            ========================= */}

            <div className="gallery-list-section">

                <div className="gallery-list-header">

                    <div>

                        <p className="dashboard-label">
                            CURRENT IMAGES
                        </p>

                        <h3>
                            Website Gallery
                        </h3>

                    </div>

                    <span className="gallery-count">
                        {images.length} Images
                    </span>

                </div>


                {loading ? (

                    <div className="gallery-empty-state">
                        <p>
                            Loading gallery...
                        </p>
                    </div>

                ) : images.length === 0 ? (

                    <div className="gallery-empty-state">

                        <div className="gallery-empty-icon">
                            ◇
                        </div>

                        <h3>
                            No Gallery Images
                        </h3>

                        <p>
                            Upload your first curtain or blind
                            image above.
                        </p>

                    </div>

                ) : (

                    <div className="gallery-grid">

                        {images.map(image => (

                            <article
                                className="gallery-card"
                                key={image.id}
                            >

                                <div className="gallery-card-image">

                                    <img
                                        src={getImageUrl(
                                            image.image_url
                                        )}
                                        alt={
                                            image.category ===
                                            "curtains"
                                                ? "Curtain"
                                                : "Blind"
                                        }
                                    />

                                    <button
                                        className="gallery-delete-button"
                                        onClick={() =>
                                            handleDelete(
                                                image.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>


                                <div className="gallery-card-content">

                                    <span>
                                        {image.category ===
                                        "curtains"
                                            ? "CURTAINS"
                                            : "BLINDS"
                                        }
                                    </span>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}

export default GalleryManagement;