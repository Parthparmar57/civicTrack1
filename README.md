# 🏛️ CivicTrack - Community Engagement Platform

CivicTrack is a modern, full-stack web application designed to empower citizens to report civic issues, track their progress, and engage with local authorities. Built with React.js frontend and Node.js backend, featuring a responsive design and comprehensive admin panel.

![CivicTrack Banner](frontend/public/civic%20landing.jpeg)

## ✨ Features

### 🎯 **Core Functionality**
- **Issue Reporting**: Citizens can report civic issues with photos and detailed descriptions
- **Real-time Tracking**: Track the status of reported issues from submission to resolution
- **Anonymous Reporting**: Option to report issues anonymously for privacy
- **Admin Dashboard**: Comprehensive admin panel for managing users, tasks, and issues
- **User Authentication**: Secure login/register system with JWT tokens
- **Role-based Access**: Different access levels for users and administrators

### 🎨 **Modern UI/UX**
- **Responsive Design**: Fully mobile-responsive across all devices
- **Clean Interface**: Professional white theme with intuitive navigation
- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions
- **Admin Mobile Navigation**: Bottom navigation bar for admin panel on mobile
- **Accessibility**: High contrast design with excellent readability

### 🔧 **Technical Features**
- **Image Upload**: Cloudinary integration for secure image storage
- **Real-time Updates**: Live status updates for reported issues
- **Search & Filter**: Advanced filtering options for issues and users
- **Data Validation**: Comprehensive input validation and sanitization
- **Security**: Rate limiting, XSS protection, and secure headers
- **Performance**: Optimized loading and smooth animations

## 🌐 Live Application

### 🚀 **Access CivicTrack Online**
**Main Application**: [https://civic-track1.vercel.app](https://civic-track1.vercel.app)
**Admin Panel**: [https://civic-track1.vercel.app/admin/login](https://civic-track1.vercel.app/admin/login)
**Backend API**: [https://civictrack1-1.onrender.com](https://civictrack1-1.onrender.com)

### 🔑 **Test Credentials**
**Admin Access**:
- Email: `admin@civictrack.com`
- Password: `admin123`

**User Registration**: Create your own account or use the admin panel to manage users

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

### 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Parthparmar57/civicTrack1.git
   cd civicTrack1
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Environment Setup

### 🔧 Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/civictrack?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
JWT_EXPIRES_IN=7d

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 📝 Environment Variables Explanation

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Backend server port | Yes | `3000` |
| `NODE_ENV` | Environment mode | Yes | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/civictrack` |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | `your-secret-key` |
| `JWT_EXPIRES_IN` | JWT token expiration time | Yes | `7d` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | `your-api-secret` |

### 🔑 Getting Required Services

#### MongoDB Setup
1. **Option 1: MongoDB Atlas (Recommended)**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account and cluster
   - Get your connection string
   - Replace `<username>`, `<password>`, and `<cluster-url>` in the connection string

2. **Option 2: Local MongoDB**
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/civictrack`

#### Cloudinary Setup
1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your Cloud Name, API Key, and API Secret from the dashboard
4. Add them to your `.env` file

## 🏃‍♂️ Running the Application

### 🖥️ Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### 🌐 Live Demo

The application is deployed and accessible at:
**🔗 [https://civic-track1.vercel.app](https://civic-track1.vercel.app)**

### 🚀 Production Mode

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend in Production**
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
civicTrack1/
├── backend/                    # Backend Node.js application
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── cloudinary.js  # Cloudinary setup
│   │   │   └── db.js          # Database connection
│   │   ├── controllers/       # Route controllers
│   │   │   ├── admin.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── task.controller.js
│   │   │   └── taskStatusLog.controller.js
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── admin.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── rateLimit.middleware.js
│   │   │   └── upload.middleware.js
│   │   ├── models/           # Database models
│   │   │   ├── User.model.js
│   │   │   ├── Task.model.js
│   │   │   ├── Issue.model.js
│   │   │   └── TaskStatusLog.model.js
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   ├── validation/       # Input validation schemas
│   │   ├── app.js           # Express app configuration
│   │   └── server.js        # Server entry point
│   ├── uploads/             # File upload directory
│   ├── .env                 # Environment variables
│   └── package.json         # Backend dependencies
├── frontend/                # Frontend React application
│   ├── public/             # Static assets
│   │   └── civic landing.jpeg
│   ├── src/
│   │   ├── admin/          # Admin panel components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── AdminTasks.jsx
│   │   │   ├── AdminIssues.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── IssueCard.jsx
│   │   ├── context/        # React context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/          # Custom hooks
│   │   │   └── useModal.js
│   │   ├── pages/          # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ReportIssue.jsx
│   │   ├── services/       # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── taskService.js
│   │   ├── styles/         # CSS files
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   └── tailwind.config.js  # Tailwind CSS configuration
├── start-backend.bat       # Windows batch file to start backend
├── start-frontend.bat      # Windows batch file to start frontend
└── README.md              # Project documentation
```

## 🔐 Authentication & Authorization

### Default Admin Credentials
For testing and initial setup, use these default admin credentials:

**🌐 Live Demo**: [https://civic-track1.vercel.app](https://civic-track1.vercel.app)

```
Email: admin@civictrack.com
Password: admin123
```

**Admin Panel Access**: [https://civic-track1.vercel.app/admin/login](https://civic-track1.vercel.app/admin/login)

> **⚠️ Important**: Change these default credentials immediately after first login in a production environment.

### User Roles
- **USER**: Regular citizens who can report issues and track their progress
- **ADMIN**: Administrators who can manage users, issues, and system settings

### Authentication Flow
1. Users register with email and password
2. JWT tokens are issued upon successful login
3. Tokens are stored in localStorage for session management
4. Protected routes require valid JWT tokens
5. Admin routes require ADMIN role verification

### Admin Panel Access
1. Navigate to [https://civic-track1.vercel.app/admin/login](https://civic-track1.vercel.app/admin/login) or use the admin login page
2. Use the default admin credentials above
3. Access the full admin dashboard with user and issue management capabilities

## 🛠️ API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Task/Issue Routes
- `GET /api/tasks` - Get all tasks/issues
- `POST /api/tasks` - Create new task/issue
- `GET /api/tasks/:id` - Get specific task/issue
- `PUT /api/tasks/:id` - Update task/issue
- `DELETE /api/tasks/:id` - Delete task/issue

### Admin Routes
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/tasks` - Get all tasks (admin view)
- `PATCH /api/admin/tasks/:id/status` - Update task status

## 🎨 Frontend Features

### 📱 Mobile Responsiveness
- **Breakpoint Strategy**: Mobile-first approach with progressive enhancement
- **Touch Optimization**: 44px minimum touch targets for all interactive elements
- **Admin Mobile Navigation**: Bottom navigation bar for admin panel on mobile devices
- **Responsive Typography**: Progressive text scaling from mobile to desktop
- **Flexible Layouts**: Adaptive grid systems and proper content stacking

### 🎯 Design System
- **Color Scheme**: Clean white theme with blue accent colors
- **Typography**: Inter font family with proper hierarchy
- **Icons**: Lucide React icons in consistent black color
- **Animations**: Framer Motion for smooth transitions and interactions
- **Components**: Reusable, accessible components throughout

### 🔧 State Management
- **React Context**: Global state management for authentication
- **Custom Hooks**: Reusable logic for modals, API calls, and form handling
- **Local Storage**: Persistent storage for user sessions and preferences

## 🔒 Security Features

### Backend Security
- **Helmet**: Security headers for protection against common vulnerabilities
- **CORS**: Cross-Origin Resource Sharing configuration
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive validation using express-validator and Zod
- **XSS Protection**: Cross-site scripting prevention
- **MongoDB Sanitization**: NoSQL injection prevention
- **JWT Security**: Secure token-based authentication

### Frontend Security
- **Input Sanitization**: Client-side input validation and sanitization
- **Secure Storage**: Proper handling of sensitive data in localStorage
- **HTTPS Ready**: Production-ready HTTPS configuration
- **Content Security**: Protection against XSS and injection attacks

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in your environment
2. Ensure all environment variables are properly configured
3. Use a process manager like PM2 for production
4. Set up reverse proxy with Nginx (recommended)
5. Configure SSL certificates for HTTPS

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Serve the `dist` folder using a static file server
3. Configure routing for single-page application
4. Set up CDN for optimal performance (optional)

### Recommended Hosting Platforms
- **Frontend**: ✅ **Currently deployed on Vercel** - [https://civic-track1.vercel.app](https://civic-track1.vercel.app)
- **Backend**: ✅ **Currently deployed on Render** - [https://civictrack1-1.onrender.com](https://civictrack1-1.onrender.com)
- **Database**: MongoDB Atlas (recommended)
- **Images**: Cloudinary (already integrated)

## 🧪 Testing

### Running Tests
```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] User registration and login at [https://civic-track1.vercel.app](https://civic-track1.vercel.app)
- [ ] Issue reporting with image upload
- [ ] Admin panel functionality at [https://civic-track1.vercel.app/admin/login](https://civic-track1.vercel.app/admin/login)
- [ ] Mobile responsiveness across devices
- [ ] Cross-browser compatibility
- [ ] API endpoint functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure mobile responsiveness for UI changes

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### 🌐 **Live Application Issues**
If you experience issues with the live application at [https://civic-track1.vercel.app](https://civic-track1.vercel.app):

1. **Clear Browser Cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)
2. **Check Network**: Ensure stable internet connection
3. **Try Different Browser**: Test in Chrome, Firefox, Safari, or Edge
4. **Mobile Issues**: Try both portrait and landscape orientations
5. **Admin Access**: Use direct link [https://civic-track1.vercel.app/admin/login](https://civic-track1.vercel.app/admin/login)
6. **Backend Status**: Check if backend is running at [https://civictrack1-1.onrender.com](https://civictrack1-1.onrender.com)

### Common Issues

#### Backend Issues
1. **MongoDB Connection Error**
   - Check your MongoDB URI in `.env`
   - Ensure MongoDB service is running
   - Verify network connectivity

2. **Cloudinary Upload Error**
   - Verify Cloudinary credentials in `.env`
   - Check file size limits
   - Ensure proper file formats

3. **JWT Token Error**
   - Check JWT_SECRET in `.env`
   - Verify token expiration settings
   - Clear localStorage and re-login

#### Frontend Issues
1. **API Connection Error**
   - Ensure backend server is running on correct port
   - Check CORS configuration
   - Verify API endpoint URLs

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript/ESLint errors
   - Verify all dependencies are installed

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Verify responsive breakpoints

### Getting Help
- Check the [Issues](https://github.com/Parthparmar57/civicTrack1/issues) page for known problems
- Create a new issue with detailed description and steps to reproduce
- Include error messages, screenshots, and system information

## 📞 Support

For support and questions:
- **GitHub Issues**: [Create an issue](https://github.com/Parthparmar57/civicTrack1/issues)
- **Email**: [Your email here]
- **Documentation**: Check this README and inline code comments

## 🙏 Acknowledgments

- **React.js** - Frontend framework
- **Node.js & Express** - Backend framework
- **MongoDB** - Database
- **Tailwind CSS** - Styling framework
- **Cloudinary** - Image storage and management
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

---

**Made with ❤️ for better civic engagement**