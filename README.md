# InfinityHire – Job Portal Platform

InfinityHire is a full-stack **MERN** job portal that connects recruiters and job seekers with a smooth, modern hiring experience.  
Recruiters can post and manage jobs, while applicants can search, filter, and apply — all in real time.

---

## Features

- **Recruiter Dashboard** – Post, edit, toggle visibility, and track jobs.
- **Dual Authentication**  
  - Clerk for user login/registration  
  - JWT-based login for recruiters with token persistence
- **Global State Management** – React Context API for sessions, filters, and dashboard state.
- **Advanced Job Search** – Filter by title, location, and category.
- **Real-Time Monitoring** – Sentry integration for full-stack error tracking and debugging.
- **Responsive UI** – Built with Tailwind CSS for seamless experience on all devices.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Context API  
- **Backend:** Node.js, Express.js, RESTful APIs  
- **Database:** MongoDB, Mongoose  
- **Authentication:** Clerk, JWT  
- **Monitoring:** Sentry  

---

## Folder Structure

```plaintext
InfinityHire/
│
├── server/           # Express.js server, APIs, and JWT auth
├── client/           # React.js UI with Tailwind CSS
├── README.md
└── ...
```

---

## Installation

1. **Clone the repository**
   ```bash
   git clone link
   ```

2. **Install dependencies** for both server and client
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. **Start the development servers** (two terminals)
   ```bash
   # Terminal 1
   cd server && npm run dev

   # Terminal 2
   cd client && npm run server
   ```

---

## Environment Variables

Create a `.env` file inside the **server** and **client** folders with the necessary keys of Cloudinary, Clerk, Sentry and MongoDB URI

---

## Live Demo 
Here is your link - https://job-portal-client-henna.vercel.app
