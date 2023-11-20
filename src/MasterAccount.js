import React from "react";
import { variables } from "./Variables";
import { NavLink } from "react-router-dom";
export default class MasterAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        }
    }
    GetAll = () => {
        fetch("https://localhost:44381/MasterAC/GetAllMasterAC")
            .then(response => response.json())
             .then(result => {
                   result.sort((a, b) => {
                      return b.id - a.id
                  })
                this.setState({ data: result })
            
            })
            .finally(() => { this.setState({ loading: false }) })
    }
    DeleteMasterAC = (id) => {
        fetch("https://localhost:44381/MasterAC/DeleteMasterAc/" + id)
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
                            <NavLink className='btn btn-primary m-2 float-end' to="/MasterAccount/AddMasterAC">
                                Add Master Account
                            </NavLink>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ minWidth: '70px' }}>Id</th>
                                        <th style={{ minWidth: '70px' }}>MastrAccount</th>
                                        <th style={{ minWidth: '100px' }}>FixedAccount</th>
                                        <th style={{ minWidth: '100px' }}>Fid</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.MastrAccount}</td>
                                                <td>{item.FixedAccount}</td>
                                                <td>{item.Status}</td>
                                                <td>{item.Fid}</td>
                                                <td>
                                                    <NavLink className="btn btn-sm btn-primary"
                                                        to={{ pathname: "/MasterAccount/AddMasterAC/" + item.id }}
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