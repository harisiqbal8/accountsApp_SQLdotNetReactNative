import React from "react";
import { variables } from "./Variables";
import { Navigate, useParams } from "react-router-dom";

const withrouter = (WrappedComponet) => {
    return (props) => {
        const routeParams = useParams();
        return <WrappedComponet params={routeParams} />
    }
}


class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            title: "",
            body: "",
            userid: "",
            id: 0,
            navigate: false
        }
    }
    id = this.props.params.id
    GetUser = () => {
        fetch(variables.API_URL + "/users")
            .then(response => response.json())
            .then(result => this.setState({ users: result }))
    }
    GetDataById = (Id) => {
        fetch(variables.API_URL + "/posts/" + Id)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.setState({ title: result.title, body: result.body, id: result.id, userid: result.userId })
            })
    }
    componentDidMount() {
        this.GetUser()
        if (this.id) {
            this.GetDataById(this.id)
        }
    }
    changetitle = (e) => {
        this.setState({ title: e.target.value })
    }
    changebody = (e) => {
        this.setState({ body: e.target.value })
    }
    changeuser = (e) => {
        this.setState({ userid: e.target.value })
    }
    submitFormForUpdate = (e) => {
        e.preventDefault();
        fetch(variables.API_URL + "/posts/" + this.state.id, {
            method: "Put",
            body: JSON.stringify({
                body: this.state.body,
                title: this.state.title,
                userId: this.state.userid
            })

        })
            .then(response => response.json())
            .then(result => {
                this.setState({ navigate: true })
            }
            )
            .catch(error => { console.log(error) })
    }
    submitForm = (e) => {
        e.preventDefault()
        fetch(variables.API_URL + "/posts", {
            method: "Post",
            body: JSON.stringify({
                body: this.state.body,
                title: this.state.title,
                userId: this.state.userid
            })

        })
            .then(response => response.json())
            .then(result => {
                this.setState({ navigate: true })
            }
            )
            .catch(error => { console.log(error) })
    }
    render() {
        return (
            <form method="post" onSubmit={!this.id ? this.submitForm : this.submitFormForUpdate}>
                <div className="row">
                    <div className="form-group mb-3">
                        <label htmlFor="title">Title</label>
                        <input id="title" className="form-control" required value={this.state.title} onChange={this.changetitle} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="body">Body</label>
                        <input id="body" className="form-control" required value={this.state.body} onChange={this.changebody} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="title">User Name</label>
                        <select className="form-control" value={this.state.userid} onChange={this.changeuser}>
                            <option value={0}>--Select User</option>
                            {
                                this.state.users.map(item => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group mb-3">

                        <button className="btn btn-primary" type="submit"> {this.id ? "Update" : "Create"}</button>


                    </div>
                    {
                        this.state.navigate ?
                            <Navigate to="/Posts" />
                            : <></>
                    }
                </div>
            </form>
        )
    }


}
export default withrouter(AddPost);