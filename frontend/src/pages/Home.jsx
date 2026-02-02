import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to landing page since that's our main home page
        navigate('/', { replace: true });
    }, [navigate]);

    return null;
};

export default Home;
