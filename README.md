# Calibre E-Commerce Platform

A modern, full-stack e-commerce platform with AI-powered product search capabilities, built with React, Node.js, and PostgreSQL. This project features a customer-facing frontend, an admin dashboard, and a robust backend API with integrated payment processing.

## 🚀 Features

### Core E-Commerce Features
- **User Authentication & Authorization** - Secure JWT-based authentication with password reset functionality via email
- **Product Management** - Full CRUD operations for products with multiple image uploads via Cloudinary
- **Shopping Cart** - Persistent cart with real-time updates and quantity management
- **Order Management** - Complete order lifecycle from placement to fulfillment with status tracking
- **Payment Integration** - Stripe payment gateway with webhook support for secure transaction processing
- **Product Reviews & Ratings** - User reviews with rating system (only verified purchasers can review)
- **Advanced Filtering** - Filter products by category, price range, availability, and ratings
- **Pagination** - Efficient product listing with pagination support (10 products per page)
- **Stock Management** - Real-time stock updates upon successful payment completion
- **Shipping Information** - Complete shipping address management for orders

### 🤖 AI-Powered Search Feature (Unique Feature)

The platform includes an innovative **AI Product Search** powered by Google's Gemini 2.0 Flash model:

- **Natural Language Search** - Users can describe what they're looking for in natural language (e.g., "wireless headphone for gaming with good bass", "find sports item for men", "find table for home")
- **Two-Stage Intelligent Filtering Process**:
  1. **SQL-Based Pre-filtering**: 
     - Extracts meaningful keywords from user prompt
     - Filters out stop words (the, is, a, an, etc.)
     - Performs initial database query using ILIKE pattern matching
     - Limits results to top 200 products for efficiency
  2. **AI-Powered Refinement**: 
     - Uses Gemini AI to intelligently analyze filtered products
     - Understands context, product descriptions, and user intent
     - Returns the most relevant product recommendations based on semantic understanding
- **Smart Keyword Extraction** - Automatically processes natural language queries and removes irrelevant words
- **Contextual Recommendations** - AI understands product context, descriptions, categories, and user intent to provide accurate results
- **User-Friendly Interface** - Beautiful modal with example prompts and loading states

**How it works:**
1. User opens AI search modal and enters a natural language query
2. Backend extracts meaningful keywords, removes stop words, and performs initial SQL filtering
3. Filtered products (up to 200) are sent to Gemini AI along with the user's original prompt
4. AI analyzes product data and user intent to return the most relevant recommendations
5. Results are displayed to the user in real-time with smooth UI transitions

### 📊 Admin Dashboard Features
- **Analytics Dashboard** - Visual charts and statistics for sales, orders, and revenue
- **Product Management** - Create, update, and delete products with image management via Cloudinary
- **Order Management** - View all orders, update order status, and track fulfillment
- **User Management** - View and manage user accounts
- **Sales Reports** - Monthly sales charts, top-selling products, and revenue analytics
- **Real-time Statistics** - Live updates on orders, products, users, and revenue metrics
- **Data Visualization** - Interactive charts using Recharts for better insights

## 🎯 What Makes This E-Commerce Platform Unique?

1. **AI-Powered Product Discovery** - Unlike traditional keyword-based search, users can describe their needs naturally and get intelligent product recommendations powered by Google Gemini AI. This creates a more intuitive shopping experience.

2. **Hybrid Search Architecture** - Combines SQL efficiency with AI intelligence for optimal performance and accuracy. The two-stage filtering process ensures fast initial results while AI provides intelligent refinement.

3. **Three-Tier Architecture** - Separate frontend (customer), dashboard (admin), and backend applications for better scalability, maintainability, and security. Each application can be deployed independently.

4. **Secure Payment Processing** - Stripe webhook integration ensures reliable payment verification and automatic order processing. Stock is automatically updated upon successful payment confirmation.

5. **Purchase-Verified Reviews** - Only users who have purchased a product can leave reviews, ensuring authentic and verified feedback. This prevents fake reviews and maintains product credibility.

6. **Real-time Stock Management** - Automatic stock updates upon successful payment via webhooks, preventing overselling and maintaining accurate inventory.

7. **Modern Tech Stack** - Built with the latest versions of React 19, Express 5, and PostgreSQL, ensuring optimal performance and future-proof architecture.

8. **Comprehensive Admin Dashboard** - Rich analytics and visualization tools help administrators make data-driven decisions with charts showing sales trends, top products, and order statistics.

9. **Image Management** - Cloudinary integration for optimized image storage, CDN delivery, and automatic image transformations.

10. **Email Integration** - Automated email notifications for password reset and order confirmations using Nodemailer.

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with latest features
- **Redux Toolkit 2.8.2** - State management for complex application state
- **React Router DOM 7.7.0** - Client-side routing and navigation
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for rapid UI development
- **Vite 7.0.4** - Fast build tool and dev server
- **Axios 1.10.0** - HTTP client for API requests
- **React Toastify 11.0.5** - Toast notifications for user feedback
- **Lucide React 0.554.0** - Beautiful icon library
- **Stripe React 3.8.0** - Payment form components for secure checkout

### Dashboard
- **React 19.0.0** - UI framework
- **Redux Toolkit 2.6.1** - State management
- **Recharts 2.15.2** - Data visualization and charting library
- **Tailwind CSS 3.4.17** - Styling framework
- **Vite 6.2.0** - Build tool
- **React Router DOM 7.5.0** - Routing

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework for RESTful APIs
- **PostgreSQL** - Relational database with advanced querying
- **JSON Web Token (JWT) 9.0.2** - Authentication tokens
- **Bcrypt 6.0.0** - Password hashing and security
- **Cloudinary 2.7.0** - Image storage, CDN, and optimization
- **Stripe 19.1.0** - Payment processing and webhook handling
- **Nodemailer 7.0.9** - Email service for notifications
- **Google Gemini AI** - AI-powered product recommendations
- **Express FileUpload 1.5.2** - File upload handling
- **Cookie Parser 1.4.7** - Cookie management
- **CORS 2.8.5** - Cross-origin resource sharing
- **Dotenv 17.2.3** - Environment variable management

## 📁 Project Structure

```
CALIBRE_E_COMMERCE/
├── backend/
│   ├── config/
│   │   └── config.env              # Environment variables
│   ├── controllers/
│   │   ├── adminController.js      # Admin operations
│   │   ├── authController.js       # Authentication logic
│   │   ├── orderController.js      # Order management
│   │   └── productController.js    # Product operations (includes AI search)
│   ├── database/
│   │   └── db.js                   # PostgreSQL connection
│   ├── middlewares/
│   │   ├── authMiddleware.js       # JWT authentication
│   │   ├── catchAysncError.js      # Async error handling
│   │   └── errorMiddleware.js      # Global error handler
│   ├── models/
│   │   ├── userTable.js            # Users table schema
│   │   ├── productTable.js         # Products table schema
│   │   ├── productReviewsTable.js  # Reviews table schema
│   │   ├── ordersTable.js          # Orders table schema
│   │   ├── orderItemsTable.js      # Order items schema
│   │   ├── shippinginfoTable.js    # Shipping info schema
│   │   └── paymentsTable.js        # Payments table schema
│   ├── router/
│   │   ├── adminRoutes.js          # Admin API routes
│   │   ├── authRoutes.js           # Auth API routes
│   │   ├── orderRoutes.js          # Order API routes
│   │   └── productRoutes.js        # Product API routes
│   ├── upload/                      # Temporary file storage
│   ├── utils/
│   │   ├── getAIRecommendation.js  # AI search implementation (Gemini)
│   │   ├── generatePaymentIntent.js # Stripe payment intent
│   │   ├── createTables.js         # Database table creation
│   │   ├── genResetPasswordToken.js # Password reset token
│   │   ├── sendEmail.js            # Email service
│   │   ├── forgetPasswordTemplate.js # Email templates
│   │   └── helper.js               # Utility functions
│   ├── app.js                      # Express app configuration
│   ├── server.js                   # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home/
│   │   │   │   ├── CategoryGrid.jsx
│   │   │   │   ├── FeatureSection.jsx
│   │   │   │   ├── HeroSlider.jsx
│   │   │   │   ├── NewsletterSection.jsx
│   │   │   │   └── ProductSlider.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── CartSidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── LoginModal.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── ProfilePanel.jsx
│   │   │   │   ├── SearchOverlay.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── Products/
│   │   │   │   ├── AISearchModal.jsx  # AI search UI component
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── ReviewsContainer.jsx
│   │   │   └── PaymentForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── FAQ.jsx
│   │   │   └── NotFound.jsx
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── orderSlice.js
│   │   │   │   ├── popupSlice.js
│   │   │   │   └── productSlice.js  # Includes AI search state
│   │   │   └── store.js
│   │   ├── lib/
│   │   │   └── axios.js              # Axios instance with interceptors
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── dashboard/
    ├── src/
    │   ├── components/
    │   │   ├── dashboard-components/
    │   │   │   ├── MiniSummary.jsx
    │   │   │   ├── MonthlySalesChart.jsx
    │   │   │   ├── OrdersChart.jsx
    │   │   │   ├── Stats.jsx
    │   │   │   ├── TopProductsChart.jsx
    │   │   │   └── TopSellingProducts.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Header.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Products.jsx
    │   │   ├── Profile.jsx
    │   │   ├── SideBar.jsx
    │   │   └── Users.jsx
    │   ├── modals/
    │   │   ├── CreateProductModal.jsx
    │   │   ├── UpdateProductModal.jsx
    │   │   └── ViewProductModal.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   └── ResetPassword.jsx
    │   ├── store/
    │   │   ├── slices/
    │   │   │   ├── adminSlice.js
    │   │   │   ├── authSlice.js
    │   │   │   ├── extraSlice.js
    │   │   │   ├── orderSlice.js
    │   │   │   └── productsSlice.js
    │   │   └── store.js
    │   ├── lib/
    │   │   ├── axios.js
    │   │   └── helper.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User accounts, authentication, and profile information
- **products** - Product catalog with images (JSONB), ratings, stock, and metadata
- **reviews** - Product reviews and ratings (linked to users and products)
- **orders** - Order information with total price, tax, shipping, and status
- **order_items** - Individual items in orders with quantity and price
- **shipping_info** - Shipping addresses and contact information
- **payments** - Payment records, status, and Stripe payment intent IDs

All tables use UUID primary keys and include proper foreign key relationships with cascade deletion where appropriate.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (v12 or higher)
- Cloudinary account (for image storage)
- Stripe account (for payments)
- Google Gemini API key (for AI search)
- Email service account (Gmail or similar for Nodemailer)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CALIBRE_E_COMMERCE
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `config/config.env` file:
   ```env
   PORT=4000
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   CLOUDINARY_CLIENT_NAME=your_cloudinary_name
   CLOUDINARY_CLIENT_API=your_cloudinary_api_key
   CLOUDINARY_CLIENT_SECRET=your_cloudinary_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   GEMINI_API_KEY=your_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   DASHBOARD_URL=http://localhost:5174
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```
   
   Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run server
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Dashboard Setup**
   ```bash
   cd dashboard
   npm install
   npm run dev
   ```
   Dashboard will run on `http://localhost:5174`

### Environment Variables

Make sure to configure all required environment variables in the backend `config/config.env` file as shown above. The application will automatically create all necessary database tables on first startup.

### Stripe Webhook Setup

For payment processing to work correctly:
1. Set up a Stripe webhook endpoint pointing to `https://your-domain.com/api/v1/payment/webhook`
2. Configure the webhook to listen for `payment_intent.succeeded` events
3. Add the webhook secret to your `config.env` file

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current authenticated user
- `POST /api/v1/auth/forgot-password` - Request password reset email
- `PUT /api/v1/auth/reset-password/:resetToken` - Reset password with token

### Products
- `GET /api/v1/product` - Get all products (with filters: availability, price, category, ratings, search, page)
- `GET /api/v1/product/singleProduct/:id` - Get single product with reviews
- `POST /api/v1/product/ai-search` - AI-powered product search (requires userPrompt in body)
- `POST /api/v1/product` - Create product (admin only, requires images)
- `PUT /api/v1/product/:productId` - Update product (admin only)
- `DELETE /api/v1/product/:productId` - Delete product (admin only)
- `PUT /api/v1/product/post-new/review/:productId` - Post/update review (requires purchase)
- `DELETE /api/v1/product/delete/review/:productId` - Delete own review

### Orders
- `POST /api/v1/order/new` - Place new order (requires shipping info and orderedItems)
- `GET /api/v1/order/my-orders` - Get authenticated user's orders
- `GET /api/v1/order/:orderId` - Get single order details
- `GET /api/v1/order/all` - Get all orders (admin only)
- `PUT /api/v1/order/:orderId` - Update order status (admin only)
- `DELETE /api/v1/order/:orderId` - Delete order (admin only)

### Admin
- `GET /api/v1/admin/users` - Get all users (admin only)
- `GET /api/v1/admin/stats` - Get dashboard statistics (admin only)

### Payments
- `POST /api/v1/payment/webhook` - Stripe webhook endpoint (handles payment confirmation)

## 🎓 What I Learned

Building this comprehensive e-commerce platform provided invaluable learning experiences across multiple domains:

### Full-Stack Development
- **Three-Tier Architecture** - Learned to design and implement separate frontend, dashboard, and backend applications that communicate via REST APIs
- **API Design** - Created RESTful APIs with proper HTTP methods, status codes, and error handling
- **State Management** - Implemented Redux Toolkit for complex state management across multiple applications
- **Database Design** - Designed normalized PostgreSQL schema with proper relationships, foreign keys, and constraints

### Backend Development
- **Express.js** - Built scalable REST APIs with Express 5, middleware, and route organization
- **Database Queries** - Wrote complex SQL queries with joins, aggregations, JSON operations, and filtering
- **Authentication & Security** - Implemented JWT-based authentication, password hashing with bcrypt, and secure API endpoints
- **Error Handling** - Created comprehensive error middleware and custom error handlers
- **File Upload** - Implemented Cloudinary integration for image storage, optimization, and CDN delivery
- **Webhook Processing** - Built secure webhook endpoints for Stripe payment verification and real-time updates

### Frontend Development
- **Modern React** - Used React 19 with hooks, functional components, and best practices
- **Redux Toolkit** - Managed complex application state with async thunks and slices
- **Responsive Design** - Built mobile-first responsive UI with Tailwind CSS
- **User Experience** - Implemented loading states, modals, sidebars, and smooth transitions
- **Form Handling** - Created complex forms for checkout, product creation, and user authentication
- **Payment Integration** - Integrated Stripe Elements for secure payment processing

### AI & Machine Learning Integration
- **Natural Language Processing** - Processed user queries, extracted meaningful keywords, and filtered stop words
- **AI API Integration** - Worked with Google Gemini 2.0 Flash API for intelligent content generation
- **Hybrid Search Architecture** - Combined traditional SQL queries with AI-powered filtering for optimal performance
- **Prompt Engineering** - Designed effective prompts for AI to understand user intent and product context
- **JSON Parsing** - Handled AI responses, cleaned markdown formatting, and parsed JSON safely

### Payment Processing
- **Stripe Integration** - Implemented Stripe Payment Intents API for secure payment processing
- **Webhook Security** - Verified webhook signatures and handled payment events securely
- **Payment Flow** - Designed complete payment flow from order creation to confirmation
- **Error Handling** - Managed payment failures and retry logic

### DevOps & Best Practices
- **Environment Configuration** - Proper environment variable management with dotenv
- **Code Organization** - Modular architecture with separation of concerns (controllers, models, routes, utils)
- **Error Handling** - Comprehensive error middleware and user-friendly error messages
- **API Documentation** - Structured API endpoints with clear naming conventions
- **Version Control** - Organized project structure suitable for Git version control

### Data Visualization
- **Chart Libraries** - Used Recharts to create interactive charts and graphs
- **Analytics Dashboard** - Built comprehensive admin dashboard with sales, order, and product analytics
- **Real-time Statistics** - Implemented live updates for dashboard metrics

### Email Services
- **Nodemailer** - Integrated email service for password reset and notifications
- **Email Templates** - Created HTML email templates for better user experience

### Testing & Debugging
- **API Testing** - Tested all endpoints and error scenarios
- **State Management Debugging** - Debugged complex Redux state flows
- **Payment Testing** - Tested payment flows with Stripe test mode
- **AI Response Handling** - Handled edge cases in AI API responses

### Project Management
- **Feature Planning** - Planned and implemented complex features like AI search
- **Code Reusability** - Created reusable components and utility functions
- **Performance Optimization** - Optimized database queries and API responses
- **Security Best Practices** - Implemented authentication, authorization, and secure data handling

## 📸 Screenshots

<!-- soon -->
- Home Page with Hero Slider and Categories
- Product Listing Page with Filters
- AI Search Modal in Action
- Product Details with Reviews
- Shopping Cart
- Checkout & Payment Page
- Order History
- Admin Dashboard with Analytics
- Product Management Interface
- Order Management Panel

## 🔗 Links

### 1. GitHub Repository
[https://github.com/DevixRama/CALIBRE_E_COMMERCE](#)

### 2. Live Demo
[coming soon!](#)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available for all of you

## 👤 Author

Built with ❤️ by Raman kumar.

---

**Note**: Make sure to set up all environment variables and API keys before running the application. The AI search feature requires a valid Google Gemini API key. For production deployment, ensure all CORS origins, webhook URLs, and environment variables are properly configured.

