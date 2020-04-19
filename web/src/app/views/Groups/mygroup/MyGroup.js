import React, { useState } from 'react'
import './../styles/CreatingGroup.css'
import './../styles/MyGroup.css'
import MenuGroup from './MenuGroup';
function MyGroup(props) {
    const [addMember, setAddMember] = useState(false);
    const addMemberTo = () => {
        setAddMember(!addMember);
    }

    var show = addMember ?
    <input type="text" className="form-control add-mem" name="member" placeholder="Chọn thành viên"></input>
    : <div></div>;

    return (
        <div className="card card2 col-lg-7 col-sm-12 col-md-12 p-lg-5 p-sm-5 p-md-5 p-5">
            <div className="image-cover">
                <button type="button" name=""
                    className="btn btn-block btn-change"
                    disabled={!props.getGroup.isAdmin}>
                    <i className="fa fa-camera"></i>
                    Chỉnh sửa
                </button>
            </div>
            <h2>{props.getGroup.nameGroup}</h2>
            <small className="amount">14k thành viên</small>
            <div className="flex-container">
                <button type="button" name=""
                    className="btn btn-block btn-add"
                    disabled={!props.getGroup.isAdmin}
                    onClick={addMemberTo}
                    >
                    <i className="fa fa-plus"></i>
                    Mời
                </button>
                {show}
                <div className="me"></div>
                <div className="number-member">+34</div>
            </div>
            <MenuGroup
                setGroup = {props.setGroup}
                getGroup = {props.getGroup}
            />
        </div>
    )
}

export default MyGroup