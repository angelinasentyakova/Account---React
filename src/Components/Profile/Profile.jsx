import React from "react";
import Preloader from "../../Common/Preloader/Preloader";
import "./Profile.css";
import ProfileStatus from "./ProfileStatus";

const Profile = (props) => {
  if (!props.profileData) {
    return <Preloader />;
  }
  return (
    <div className="profile-info-wrapper">
      <div className="profile-info">
        <div className="profile-img-wrapper">
          <img
            className="profile-img"
            src={props.profileData.photos.small}
          ></img>
        </div>
        <div className="profile-info-info">
          <div>
            <b>Имя: </b> {props.profileData.fullName}
          </div>
          <div>
            {" "}
            <b>Обо мне: </b>{" "}
            {props.profileData.aboutMe ? props.profileData.aboutMe : "No data"}
          </div>
          <div>
            <ProfileStatus
              status={props.status}
              updateStatusThunk={props.updateStatusThunk}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
