// Simple test script to verify login functionality
const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Testing backend login endpoint...');
        
        // Test data
        const loginData = {
            email: 'test@example.com',
            password: 'password123'
        };

        // Make request to backend
        const response = await axios.post('http://localhost:3000/api/auth/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Login endpoint is working!');
        console.log('Response:', response.data);
        
        // Test the /me endpoint with the token
        if (response.data.data && response.data.data.token) {
            const meResponse = await axios.get('http://localhost:3000/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${response.data.data.token}`
                }
            });
            console.log('✅ /me endpoint is working!');
            console.log('User data:', meResponse.data);
        }

    } catch (error) {
        if (error.response) {
            console.log('❌ Backend responded with error:', error.response.data);
        } else if (error.request) {
            console.log('❌ No response from backend. Is the server running on port 3000?');
        } else {
            console.log('❌ Error:', error.message);
        }
    }
};

testLogin();