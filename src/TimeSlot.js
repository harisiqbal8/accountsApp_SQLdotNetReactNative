import React from "react";
import { variables } from "./Variables";
import { NavLink } from "react-router-dom";
export default class TimeSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeslots: [],
            modalTitle: "",
            TSCode: "",
            StartTime: "",
            EndTime: "",
            TSId: 0,
            DayId: 1
        }
    }
    addClick() {
        this.setState({
            modalTitle: 'Add Time Slot',
            TSId: 0,
            TSCode: "",
            StartTime: "",
            EndTime: "",
            DayId: 1
        });
    }
    refrestList() {
        fetch("https://localhost:44396/api/TimeSlot/GetAll")
            
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ timeslots: data });
            });
    }
    createClick() {
        fetch("https://localhost:44396/api/TimeSlot/Save", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                DayId: this.state.DayId,
                StartTime: this.state.StartTime,
                EndTime: this.state.EndTime,
            })
        })
            .then(res => res.json())
            .then(result => this.refrestList())
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.refrestList();
    }
    render() {

        const {
            timeslots,
            modalTitle,
            TSId,
            TSCode,
            StartTime,
            EndTime
        } = this.state;

        return (
            <>
                <div>
                    <button type='button'
                        className='btn btn-primary m-2 float-end'
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.addClick()}>
                        Add TimeSlot
                    </button>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Time Slot Id</th>
                                <th>Time Slot Code</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                timeslots.map(ts => {
                                    return (
                                        <>
                                            <tr key={ts.tsId}>
                                                <td>{ts.tsId}</td>
                                                <td>{ts.TSCode}</td>
                                                <td>{ts.startTime}</td>
                                                <td>{ts.endTime}</td>
                                            </tr>
                                        </>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                    <div className="modal fade" id="exampleModal" tabIndex="-
1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialogcentered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modaltitle">{modalTitle}</h5>
                                    <button type="button" className="btnclose" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <span className="input-grouptext">Day</span>
                                        <select className="formcontrol" onChange={(e) => { this.setState({ DayId: e.target.value }) }}>
                                            <option value={1}>Monday</option>
                                            <option value={2}>Tuesday</option>
                                            <option value={3}>Wednesday</option>
                                            <option value={4}>Thursday</option>
                                            <option value={5}>Friday</option>
                                            <option value={6}>Saturday</option>
                                            <option value={7}>Sunday</option>
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-grouptext">Start Time</span>
                                        <input type="time" className="formcontrol" value={StartTime} onChange={(event) => { this.setState({ StartTime: event.target.value }) }} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-grouptext">End Time</span>
                                        <input type="time" className="formcontrol" value={EndTime} onChange={(event) => { this.setState({ EndTime: event.target.value }) }} />
                                    </div>
                                    {TSId == 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.createClick()}
                                        >Create</button>
                                        : null}
                                    {TSId != 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.updateClick()}
                                        >Update</button>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}