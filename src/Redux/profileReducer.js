import { authAPI, profileAPI} from "../Api/Api";

const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  profileData: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profileData: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export const setUserProfileActionCreator = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile: profile,
  };
};

export const setStatusActionCreator = (status) => {
  return {
    type: SET_STATUS,
    status: status,
  };
};


export const getUserPageThunkCreator = (userId) => async (dispatch) => {
  let response = await authAPI.getMyProfileData(userId);
  dispatch(setUserProfileActionCreator(response));
};

export const getStatusThunkCreator = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
    dispatch(setStatusActionCreator(response));
};

export const updateStatusThunkCreator = (status) => async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
      dispatch(setStatusActionCreator(status));
    }
  } catch (error) {
    alert(error.message)
  }
};
  

export default profileReducer;
