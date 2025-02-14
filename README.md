<div align="center">
  <br />
    <img src="https://github.com/user-attachments/assets/6460125e-9a48-4b65-8d26-a169c3cc9230" alt="Project Banner">
  <br />

  <h3 align="center">A Full-Stack Next.js Book Cafe App</h3>

</div>

## 🚀 Overview

This is a **full-stack book cafe application** built with **Next.js 15, TypeScript, and Tailwind CSS**. It allows users to browse, search, and interact with a collection of books while enjoying a seamless UI experience.

### 🌐 Live Demo

🔗 [Full-Stack Book Cafe App](https://full-stack-nextjs-book-cafe-app.vercel.app/)

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **ShadCN UI Library**
- **Zod (Schema Velida)**
- **Tailwind CSS** (for styling)
- **MongoDB**
- **Vercel** (for deployment)

## 🚀 Getting Started

### 1️⃣ Clone the Repository & Install Dependencies

```sh
git clone https://github.com/your-repo/full-stack-nextjs-book-cafe-app.git
cd full-stack-nextjs-book-cafe-app
npm install  # or yarn install
```

### 2️⃣ Create an `.env.local` File and Add the Following Values

```ini
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=''
IMAGEKIT_PRIVATE_KEY=''
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=''

NEXT_PUBLIC_API_ENDPOINT='http://localhost:3000'

AUTH_SECRET=''

MONGODB_URL=''

NEXTAUTH_URL='http://localhost:3000'
AUTH_TRUST_HOST='http://localhost:3000'
```

### 3️⃣ Run the Development Server

```sh
npm run dev  # or yarn dev
```

The app will be available at: **http://localhost:3000**

## 🔑 Key Features

- 📚 Browse and filter books
- 🔍 Advanced search functionality
- 📝 User authentication
- 📖 Book details
- 🖼️ Image handling via ImageKit
