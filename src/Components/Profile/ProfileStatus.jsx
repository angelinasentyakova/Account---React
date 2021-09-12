import React, { useEffect, useState } from "react";
import "./Profile.css";

const ProfileStatus = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatusThunk(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div className="status">
      {editMode ? (
        <div className="status-wrapper">
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            className="status-input"
            value={status}
          ></input>
        </div>
      ) : (
        <div className="status-wrapper">
          <span onClick={activateEditMode} className="current-status">
            <b>Статус:</b> {status ? status : ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
