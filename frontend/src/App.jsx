import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Admin Structural Components
import AdminProtectedRoute from './routes/AdminProtectedRoute';
import AdminLayout from './admin/AdminLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import ReportIssue from './pages/ReportIssue';
import Profile from './pages/Profile';
import IssueDetail from './pages/IssueDetail';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminTasks from './admin/AdminTasks';
import AdminIssues from './admin/AdminIssues';
import AdminIssueDetail from './admin/AdminIssueDetail';
import AdminLogin from './admin/AdminLogin';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Main Application Layout */}
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Citizen Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="report" element={<ReportIssue />} />
            <Route path="profile" element={<Profile />} />
            <Route path="issues/:id" element={<IssueDetail />} />
          </Route>
        </Route>

        {/* Admin Panel Layout - Separate from main app layout */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="issues" element={<AdminIssues />} />
            <Route path="issues/:id" element={<AdminIssueDetail />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
