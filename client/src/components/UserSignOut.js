import React from "react";
import { useNavigate } from "react-router-dom";

export default ({context}) => {
    const navigate = useNavigate();

    context.actions.signOut();
    navigate('/')
}