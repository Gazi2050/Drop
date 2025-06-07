# ⚡ Drop — Fast & Simple File Hosting Platform 🌐

Welcome to **Drop**, a lightweight and lightning-fast web app designed for effortlessly uploading and sharing files like PDFs and images. Share instantly via public links—no sign-up required! For registered users, enjoy the added benefit of full file history and management. 🚀

## 🔑 Key Features

* 📤 **Instant Uploads**
  Upload PDFs and images with a single click — no sign-in necessary.

* 🔗 **Instant Shareable Links**
  Receive a public URL immediately after uploading your file.

* 👤 **Anonymous Guest Uploads**
  Upload files anonymously with basic access and limitations.

* 🔐 **User Accounts with Email/Password**
  Register or log in to access advanced features:

  * View your complete upload history
  * Manage files (delete or organize uploads)

## 🧾 Supported File Types

* **Documents:** PDF
* **Images:** JPG, PNG, WEBP, GIF, BMP, SVG, HEIC

## 🚀 Installation Guide

Get **Drop** running locally in just a few steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Gazi2050/Drop.git
   cd Drop
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   [http://localhost:3000](http://localhost:3000) 🎉

## 🗄️ Database Schema

Use the following SQL schema for setting up your database tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE files (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  fileName TEXT NOT NULL,
  fileType TEXT NOT NULL,
  fileSize BIGINT NOT NULL,
  fileUrl TEXT NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```
Feel free to contribute or open issues if you encounter any bugs or want to suggest features. Happy uploading! 🚀
