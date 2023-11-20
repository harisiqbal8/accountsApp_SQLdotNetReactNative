import React from "react";
import { variables } from "./Variables";
import { NavLink } from "react-router-dom";
export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        }
    }
    GetAll = () => {
        fetch(variables.API_URL + "/posts")
            .then(response => response.json())
            .then(result => {
                result.sort((a, b) => {
                    return b.id - a.id
                })
                this.setState({ data: result })
            })
            .finally(() => { this.setState({ loading: false }) })
    }
    DeletePost = (id) => {
        fetch(variables.API_URL + "/posts/" + id)
            .then(response => response.json())
            .then(result => {
                this.setState({ data: this.state.data.filter(x => x.id != id) })
            })
            .catch(error => { console.log(error) })
    }
    componentDidMount() {
        this.GetAll();
    }
    render() {
        return (
            <>
                {
                    this.state.loading ?
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div>
                            <NavLink className='btn btn-primary m-2 float-end' to="/Posts/AddPost">
                                Add Post
                            </NavLink>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ minWidth: '70px' }}>Id</th>
                                        <th style={{ minWidth: '70px' }}>User Id</th>
                                        <th style={{ minWidth: '100px' }}>Title</th>
                                        <th>Body</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.userId}</td>
                                                <td>{item.title}</td>
                                                <td>{item.body}</td>
                                                <td>
                                                    <NavLink className="btn btn-sm btn-primary"
                                                        to={{ pathname: "/Posts/AddPost/" + item.id }}
                                                    >
                                                        Edit
                                                    </NavLink>
                                                    <button onClick={() => this.DeletePost(item.id)} className="btn btn-sm btn-danger">Delete</button>
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
}