import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { variables } from "./Variables";
export default function Todos() {
    var [loading, setloading] = useState(true)
    var [data, setdata] = useState([])
    

    function GetAll() {
        fetch(variables.API_URL + "/todos")
            .then(response => response.json())
            .then(result => {
                result.sort((a, b) => {
                    return b.id - a.id
                })
                setdata(result)
            })
            .finally(() => { setloading(false) })
    }
    const DeletePost = (id) => {
        fetch(variables.API_URL + "/todos/" + id)
            .then(response => response.json())
            .then(result => {
                setdata(data.filter(x => x.id != id))
            })
            .catch(error => { console.log(error) })
    }
    useEffect(() => {
        GetAll()
    },[])

    return (
        <>
            {
                loading ?
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    :
                    <div>
                        <NavLink className='btn btn-primary m-2 float-end' to="/Todos/AddTodos">
                            Add Todos
                        </NavLink>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ minWidth: '70px' }}>Id</th>
                                    <th style={{ minWidth: '70px' }}>User Id</th>
                                    <th style={{ minWidth: '100px' }}>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.userId}</td>
                                            <td>{item.title}</td>
                                            <td>
                                                <NavLink className="btn btn-sm btn-primary"
                                                    to={{ pathname: "/Todos/AddTodos/" + item.id }}
                                                >
                                                    Edit
                                                </NavLink>
                                                <button onClick={() => DeletePost(item.id)} className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}
