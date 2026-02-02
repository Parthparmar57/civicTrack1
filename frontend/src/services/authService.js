import API from "../api/api";

// Register new user
export const registerUser = async (formData) => {
    try {
        const response = await API.post("/auth/register", formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Registration failed" };
    }
};

// Login user
export const loginUser = async (formData) => {
    try {
        const response = await API.post("/auth/login", formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Login failed" };
    }
};
