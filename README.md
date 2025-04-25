# 🛒 Full-Stack Ecommerce App with Stripe Payment Integration

A modern full-stack ecommerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js), including advanced features like secure Stripe payments, dynamic cart system, order management, and a responsive UI.

![App Showcase](https://your-image-link.com/preview.gif) <!-- Replace with demo GIF or image -->

---

## 🚀 Live Demo

Frontend: https://flipkart-clone-9anj.onrender.com


Backend API:https://flipkart-clone-ajp0.onrender.com

---

## 🧰 Tech Stack

## 🖥️ Tech Stack
**Frontend:**

![reactjs](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;
![react-router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)&nbsp;
![tailwindcss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)&nbsp;
![mui](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)&nbsp;
![chart-js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)&nbsp;

**Backend:**

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![jwt](	https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;


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

