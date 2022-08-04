import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default ({context}) => {
    const navigate = useNavigate();

    // Calls signOut() function from Context and navigates back to home '/' route
    useEffect(() => {
        context.actions.signOut();
        navigate('/')
    }, []);
}