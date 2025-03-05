# pixel-together

Welcome to **pixel-together (beta)** – the free, open, online canvas where everyone can take part! This website was our final project for our web development course at the **DCI (Digital Career Institute).**

## 🌟 The Project: A Permanent r/place Experience

Inspired by **r/place**, the annual Reddit event that brings millions of people together to create a massive pixel art canvas, **pixel-together** offers a **permanently accessible platform** for collaborative artwork.

### 🎨 Community Artwork
- **Many artists, one big picture** – Everyone can participate and bring their ideas to life.
- **Collaborative Creativity** – A shared space where pixel by pixel, a unique art piece emerges.

## 🚀 What Makes pixel-together Different?

- **Permanent Canvas** – Unlike r/place, our platform is continuously available.
- **User-Friendly** – Simple and intuitive for everyone.
- **Moderation Tools** – Admin features to prevent abuse.
- **Additional Features** – Many planned enhancements (see below).

## 👥 Our Team

- [**Mirko**]([https://github.com/alicegithub](https://github.com/mirkobrink2412)) – Frontend Developer
- [**Timo**]([https://github.com/bobgithub](https://github.com/TimoB2403)) – Frontend & Backend Developer
- [**Michael**]([https://github.com/charliegithub](https://github.com/Michael-Mew2)) – Projectmanager, Frontend & Backend Developer

## 🔧 How it Works

1. **Sign Up** – Create an account and start drawing your pixel art.
2. **Choose a Color** – Pick the perfect color for your artwork.
3. **Select a Grid Spot** – Choose where to place your pixel.
4. **Place Your Pixel** – Contribute to the evolving masterpiece.

## 🛠 Work in Progress

- **Admin Dashboard** – Monitor users, apply time-outs, or ban accounts.
- **Password Reset** – “Forgot Password” functionality.
- **Privacy Policy & Terms of Service** – Legal compliance.
- **Initial Design Concepts** – First visual drafts of the platform.

## 📈 Planned Features

- **Statistics** – Pixel distribution, user activity, and history.
- **Support & Global Chat** – Community communication and help.
- **Graphical Overlays** – Special effects for large projects.
- **Premium Membership** – Exclusive features and benefits.

## ⚡ Challenges Faced

- **New Technologies** – Learning WebSocket, Mantine, and other tools.
- **Task Distribution** – Ensuring fair workload sharing.
- **Communication** – Keeping the team aligned.
- **Problem Solving** – Quickly addressing technical and design issues.

## 🚀 Tech Stack

- **Frontend:** React, Mantine, Zustand, Konva
- **Backend:** Express, Socket.io, Node Mailer, AJV, Express-Rate-Limit, CORS
- **Database:** MongoDB

## 📥 Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/pixel-together.git
   cd pixel-together
   ```

2. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Start the backend server (new terminal, starting from main project folder):
   ```sh
   cd backend
   npm install
   npm start
   ```

## 🔧 Configuration

Some environment variables need to be set up before running the project. Create a `.env` file in the root directory of the frontend as well as the backend with the following variables:

### .env for the Frontend:
```
VITE_API_NODE_ENV=(depending where you want the backend to be hosted on either 'development' (for a local host of the backend) or 'production' (for an global host, but you need to host the backend yourself since we don't provide a public global host)
VITE_API_DEV_URL=http://localhost:(backend)
VITE_API_BASE_URL=https://pixel-togetherbe_hosted-backend.com
```

### .env for the backend
```
MONGO_URL=mongodb+srv://your_data_base
PORT=Number_for_the_backend
DATABASE=pixel-together
FRONTEND_URL=https://pixel-together.hosted-frontend.com
FRONTEND_DEV_URL=http://localhost:(frontend)
NODE_ENV=(depending where you want the backend to be hosted on either 'development' (for a local host of the backend) or 'production' (for an global host, but you need to host the backend yourself since we don't provide a public global host)
SESSION_KEY=strng
JWT_SECRET=string
JWT_EXPIRES_IN=(number with an 'h' for hour exmpl: '1h')
COOKIE_EXPIRES_IN=number
EMAIL_SERVICE=email-provider
EMAIL_HOST=smtp.email-provider
EMAIL_PORT=number
EMAIL_USER=emalil@adress.com
EMAIL_PASS=email_password
RESET_PASSWORD=reset_password
MAX_PIXEL_REQUESTS=number
MAX_PIXEL_REQUESTS_ADMIN=number
REQUEST_MULTIPLIER=Number
PIXEL_RATE_LIMIT_MINUTES=Number
CANVAS_GRID_SIZE=Number
```

## 📜 License

This project is licensed under the **MIT License**

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch (`feature-branch`)
3. Commit your changes.
4. Push to the branch and open a Pull Request.

## 📬 Contact

If you have any questions, feel free to reach out:
- Email: noreply.pixeltogether@gmail.com
- GitHub Issues: [Issues](https://github.com/Michael-Mew2/pixel-together/issues)

---
Enjoy **pixel-together** and happy drawing! 🎨✨

