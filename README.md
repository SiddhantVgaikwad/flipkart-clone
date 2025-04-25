# 🛒 Full-Stack Ecommerce App with Stripe Payment Integration

A modern full-stack ecommerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js), including advanced features like secure Stripe payments, dynamic cart system, order management, and a responsive UI.

![App Showcase](https://your-image-link.com/preview.gif) <!-- Replace with demo GIF or image -->

---

## 🚀 Live Demo

Frontend: https://flipkart-clone-9anj.onrender.com


Backend API:https://flipkart-clone-ajp0.onrender.com

---

## 🧰 Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS, Material UI, Stripe
- **Backend**: Node.js, Express.js, MongoDB, Stripe SDK
- **Authentication**: JWT, Cookies
- **Deployment**: Vercel (Frontend), Render (Backend), Cloudinary (Image Hosting)

---

## ✨ Features

### 🏍️ Ecommerce Functionality

- Add to Cart, Quantity Management
- Checkout with Shipping Info
- Real-Time Order Summary
- Stripe Payment Gateway (Card, UPI, Net Banking - India ready)

### 🔐 Authentication & User

- Signup / Login with JWT
- Protected Routes for Orders
- User Profile & Shipping Address

### 📦 Orders & Payments

- Create Orders after Payment Success
- Order Confirmation Page
- View Past Orders
- Stripe Integration with Indian Regulation Compliance (Name + Address for Export)

### 🎨 UI/UX

- Modern Responsive Design
- Interactive Forms and Stepper UI
- Toast Alerts (Notistack)
- Clean Animations & Transitions

---

## 🥪 Screenshots

| Feature | Screenshot |
|--------|------------|
| Homepage | ![Home](https://your-image-link.com/home.png) |
| Cart Page | ![Cart](https://your-image-link.com/cart.png) |
| Payment Page | ![Payment](https://your-image-link.com/payment.png) |
| Order Confirmation | ![Order](https://your-image-link.com/order.png) |

---

## 🧰 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

Create `.env` files for both frontend and backend.

#### 🔒 Backend `.env`

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=https://yourfrontend.vercel.app
```

#### 💻 Frontend `.env`

```env
REACT_APP_BACKEND_URL=https://yourbackend.onrender.com
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 🔀 Run Locally

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm start
```

---

## 🌍 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com)
- **Backend**: Hosted on [Render](https://render.com)
- **Image Storage**: [Cloudinary](https://cloudinary.com)
- **Payments**: [Stripe](https://stripe.com)

---

## 🧐 Learnings & Challenges

- Stripe checkout integration with India export compliance (customer name & address)
- Solving CORS issues across domains
- Handling proxy limitations in deployment
- Managing Stripe version mismatches and React integration

---

## 🙌 Contributing

Contributions are welcome! Feel free to fork this repo and open a PR.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👋 Let's Connect

- Portfolio: [yourportfolio.com](https://yourportfolio.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [yourlinkedin](https://linkedin.com/in/yourlinkedin)

---

