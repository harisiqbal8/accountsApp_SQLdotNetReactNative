import React, { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
export default function AddTodos() {
    var params = useParams();
    var navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
           navigate("/Todos") 
        }, 3000);
    }, [])
    return (
        <>
            <p>Form</p>
        </>
    )
}