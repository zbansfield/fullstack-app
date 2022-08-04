import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default ({context}) => {
    const navigate = useNavigate();

    useEffect(() => {
        context.actions.signOut();
        navigate('/')
    }, []);
}