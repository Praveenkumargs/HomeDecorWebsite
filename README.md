# HomeDecorWebsite

A full-stack home decor web application where users can explore home decor products, view product details, and manage product images using cloud storage. The project uses a deployed frontend, backend API, PostgreSQL database, and Cloudinary for image storage.

## Project Overview

HomeDecorWebsite is designed as a modern home decor platform with a clean user interface and backend support for managing product data and images. The frontend is deployed on **Vercel**, the backend is deployed on **Render**, images are stored using **Cloudinary**, and application data is stored in a **PostgreSQL** database.

## Features

- Modern home decor website interface
- Responsive frontend design
- Product listing and product display sections
- Image upload and storage using Cloudinary
- Backend API for handling application data
- PostgreSQL database integration
- Frontend deployment using Vercel
- Backend deployment using Render
- Organized full-stack project structure
- Suitable for portfolio and learning full-stack web development

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript
- React.js
- Vercel for deployment

### Backend

- Node.js
- Express.js
- Render for deployment

### Database

- PostgreSQL

### Cloud Storage

- Cloudinary for storing uploaded product or website images

### Version Control

- Git
- GitHub

## Deployment

### Frontend

The frontend is deployed using **Vercel**.

Add your frontend live URL here:

```text
[Frontend Live URL: Add your Vercel deployment link](https://home-decor-website-8jefy0q2p-vnps.vercel.app/)
```

### Backend

The backend server is deployed using **Render**.

Add your backend API URL here:

```text
https://lucky-home-decor-api.onrender.com/
```

### Database

The project uses **PostgreSQL** as the database for storing application data such as products, categories, users, or other website-related records.

### Image Storage

The project uses **Cloudinary** to store uploaded images. This helps keep image files separate from the application server and makes image delivery faster and easier to manage.

## Environment Variables

Create a `.env` file in the backend directory and add the required environment variables.

```env
PORT=5000
DATABASE_URL=your_postgresql_database_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Do not upload your `.env` file to GitHub. Add it to `.gitignore` to keep your credentials safe.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Praveenkumargs/HomeDecorWebsite.git
```

### 2. Move Into the Project Folder

```bash
cd HomeDecorWebsite
```

### 3. Install Dependencies

If your project has separate frontend and backend folders, install dependencies in both folders.

```bash
npm install
```

If your project uses separate folders:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend folder and add your PostgreSQL and Cloudinary credentials.

### 5. Run the Development Server

For frontend:

```bash
npm run dev
```

For backend:

```bash
npm start
```

or, if using nodemon:

```bash
npm run server
```

## Suggested Project Structure

```text
HomeDecorWebsite/
│
├── frontend/
│   ├── index.html
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── package.json
│
├── README.md
└── .gitignore
```

> Your actual folder structure may be different. Update this section based on your repository files if needed.

## API and Backend

The backend handles requests from the frontend and connects with PostgreSQL and Cloudinary.

Common backend responsibilities may include:

- Connecting to the PostgreSQL database
- Handling product-related API routes
- Uploading images to Cloudinary
- Returning stored product and image data to the frontend
- Managing server-side logic

## Cloudinary Usage

Cloudinary is used to upload and store images. Instead of storing images directly in the project folder or database, the image is uploaded to Cloudinary and the image URL can be saved in PostgreSQL.

Typical flow:

1. User or admin uploads an image.
2. Backend sends the image to Cloudinary.
3. Cloudinary returns a secure image URL.
4. The image URL is saved in PostgreSQL.
5. Frontend displays the image using the stored URL.

## PostgreSQL Usage

PostgreSQL is used to store structured application data. This can include:

- Product details
- Image URLs
- Categories
- User information
- Contact form data
- Admin-managed content

## Screenshots

<img width="1440" height="783" alt="Screenshot 2026-09-17 at 4 31 49 PM" src="https://github.com/user-attachments/assets/0f45c17a-463e-4550-977c-e2a33213140b" />
<img width="1440" height="768" alt="Screenshot 2026-09-17 at 4 40 01 PM" src="https://github.com/user-attachments/assets/26c698f6-fd56-4257-86f8-c9b2ba5aa13f" />
<img width="1440" height="782" alt="Screenshot 2026-09-17 at 4 40 13 PM" src="https://github.com/user-attachments/assets/6495fd3f-4b89-4316-b3de-dbbfd244a09d" />



```markdown
[Home Page]
[Products Page]
[Why Choose Us Page]
```

## Future Enhancements

- Product search and filtering
- Add to cart functionality
- Wishlist feature
- Online payment integration
- Order management system
- Improved UI animations
- Better image optimization

## Repository

GitHub Repository: [HomeDecorWebsite](https://github.com/Praveenkumargs/HomeDecorWebsite)

## Author

**Praveen Kumar G S**

GitHub: [@Praveenkumargs](https://github.com/Praveenkumargs)

## License

This project is for educational and portfolio purposes. You can modify and improve it based on your requirements.
