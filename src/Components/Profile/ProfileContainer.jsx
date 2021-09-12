import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserPageThunkCreator,  updateStatusThunkCreator,   getStatusThunkCreator } from "../../Redux/profileReducer";
import "./Profile.css";
import { compose } from "redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.authorisedUserId;
    this.props.getUserPageThunk(userId);
    this.props.getStatusThunk(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  render() {
    return (
      <Profile
        {...this.props}
        profileData={this.props.profileData}
        status={this.props.status}
        updateStatusThunk={this.props.updateStatusThunk}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profileData: state.profile.profileData,
  authorisedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
  status: state.profile.status,
});

export default compose(
  connect(mapStateToProps, {
    getUserPageThunk: getUserPageThunkCreator,
    updateStatusThunk: updateStatusThunkCreator,
    getStatusThunk: getStatusThunkCreator,
  }),
  withAuthRedirect
)(ProfileContainer);
