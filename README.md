# ⚡ Drop - File Hosting Platform 🌐

Welcome to **Drop** — a lightweight and blazing-fast web app for uploading and sharing files like PDFs and images with instant, shareable links. No sign-up needed to start uploading, and registered users enjoy full file history and profile management. 🚀

## 🔑 Key Features

* 📤 **Instant File Upload**: Upload PDFs and images with a single click—no sign-in required!
* 🔗 **Shareable URLs**: Get a public link instantly after uploading.
* 🧑‍💻 **Guest Uploads**: Upload files anonymously with limited functionality.
* 🔐 **Authenticated Accounts**: Sign in via Google or email/password for:

  * Access to upload history
  * File management (delete uploads)
  * Profile customization
  * Account deletion (removes all uploads automatically)

## 🧾 Supported File Types

* **Documents**: PDF
* **Images**: JPG, PNG, WEBP, GIF, BMP,SVG, HEIC

## 🚀 Installation

Follow these steps to get **Drop** up and running on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Gazi2050/Drop.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and go to:**
   `http://localhost:3000` 🎉

## 🗄️ SQL Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE files (
  id UUID PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
