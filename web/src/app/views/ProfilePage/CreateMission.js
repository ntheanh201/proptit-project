import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function CreateMission(props) {
    const [mission, setMission] = useState({
        id: null,
        content: '',
        deadline: null,
        completed: false
    })
    const [showAddMission, setShowAddMission] = useState(false);
    const notHandleSubmit = () => {
        setShowAddMission(false)
        setMission({
            id: null,
            content: '',
            deadline: null,
            completed: false
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        props.addNewMission(mission)
        setShowAddMission(false)
        setMission({
            id: null,
            content: '',
            deadline: null,
            completed: false
        })
    }
    return (
        <div>
            <h3 className="title-body">
                Nhiệm vụ
                {
                    showAddMission ?
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick = {handleSubmit}
                            >
                                <i className="fas fa-save"></i>
                                {" Lưu lại"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick = {notHandleSubmit}
                            >
                                <i className="fa fa-times-circle" aria-hidden="true"></i>
                                {" Hủy bỏ"}
                            </button>
                        </div> :
                        <button
                            type="button"
                            className="btn btn-block btn-add-mission"
                            onClick = {() => setShowAddMission(true)}
                        >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            {" Thêm nhiệm vụ"}
                        </button>
                }
            </h3>
            {
                showAddMission ?
                    <div className="add-mission">
                        <div className="form-group">
                            <label>Tên nhiệm vụ</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setMission({
                                        ...mission,
                                        content: event.target.value
                                    })
                                }}
                                placeholder="Bạn muốn làm gì vậy?"
                            />
                            <label className="deadline">Deadline</label>
                            <br />
                            <DatePicker
                                selected={mission.deadline}
                                onChange={(date) => {
                                    setMission({
                                        ...mission,
                                        deadline: date
                                    })
                                }}
                                placeholderText={"Chọn Deadline"}
                                showTimeSelect
                                dateFormat = "hh:mm dd/MM/yyyy"
                                className="form-control"
                                showYearDropdown
                            />
                        </div>
                    </div> :
                    null
            }
        </div>
    )
}
