# 📺 Video Streaming Website(YouTube Clone) – React Frontend

A modern, responsive **YouTube-like video streaming frontend** built using **React**, **Bootstrap 5**, **React Router**, and the **YouTube Data API v3**. It provides a dynamic user experience featuring video playback, category navigation, search, and dark/light theming.

---

## 🚀 Features

- 🏠 **Homepage Feed** – Displays trending videos with thumbnail, title, channel, views, and time.
- 📂 **Category Sidebar** – Navigate by categories like Music, Sports, Tech, etc.
- 🎥 **Video Playback Page** – Full video player with title, description, channel info, like/dislike, and comments.
- 🔍 **Search Functionality** – Search bar and results with dynamic routing.
- 🎞️ **Recommended Section** – Related videos shown beside the video player.
- 🌓 **Dark / Light Mode** – Global theme toggle with context API and persistence.
- 🧭 **Responsive UI** – Fully mobile-friendly with sidebar toggle and adjusted navbar layout.
- 🔃 **Skeleton Loaders** – For smooth loading experience.
- 📱 **Mobile Navbar Logic** – Collapsible sidebar, adaptive navbar icons.
- 🔧 **Bootstrap Icons** – Clean, scalable icon usage throughout the app.

---

## 🧱 Built With

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Moment.js](https://momentjs.com/)
- [YouTube Data API v3](https://developers.google.com/youtube/v3)

---

## 📂 Folder Structure

src/
├── Assets/ # Logo and Profile
├── Components/ # Reusable components like Navbar, Feed, PlayVideo, Recommended, RecommendedSkeleton, Sidebar, SkeletonLoader, ThemeToggle
├── Context/ # ThemeContext for dark/light mode
├── Pages/ # Home, Video, SearchResults, CategoryPage
├── data.js # API key import from .env
├── App.jsx
├── index.css # Custom and dark mode styles
└── main.jsx

---

## 🧪 Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/Mamatha-TS/youtube-clone.git
cd youtube-clone
2. Install dependencies
bash
Copy
Edit
npm install
3. Set your API key
Create a .env file in the root directory:
VITE_YOUTUBE_API_KEY=your_api_key_here
4. Start the development server
bash
Copy
Edit
npm run dev
🌐 Deployment
Deployed via Vercel

🟢 Live Site: https://mamathats-youtube-clone.vercel.app/

🙌 Contributions
Feel free to fork, star ⭐, or submit a pull request. Improvements and suggestions are welcome!


