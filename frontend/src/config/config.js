// Application Configuration

const config = {
    // Environment
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    
    // API URLs
    api: {
        baseURL: import.meta.env.PROD 
            ? (import.meta.env.VITE_API_BASE_URL || "https://civictrack1-1.onrender.com/api")
            : (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"),
    },
    
    // Application URLs
    app: {
        url: import.meta.env.VITE_APP_URL || "https://civic-track1.vercel.app",
        localUrl: import.meta.env.VITE_LOCAL_URL || "http://localhost:5173",
    },
    
    // Backend URLs
    backend: {
        production: "https://civictrack1-1.onrender.com",
        development: "http://localhost:3000",
        api: {
            production: "https://civictrack1-1.onrender.com/api",
            development: "http://localhost:3000/api",
        }
    },
    
    // Application Info
    appName: "CivicTrack",
    appDescription: "Community Engagement Platform",
    version: "1.0.0",
    
    // Social/Contact Links
    links: {
        github: "https://github.com/Parthparmar57/civicTrack1",
        demo: "https://civic-track1.vercel.app",
        adminDemo: "https://civic-track1.vercel.app/admin/login",
        backendDemo: "https://civictrack1-1.onrender.com",
    },
    
    // Default Admin Credentials (for documentation/testing)
    defaultAdmin: {
        email: "admin@civictrack.com",
        password: "admin123",
    },
};

export default config;