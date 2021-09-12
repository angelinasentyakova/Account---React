import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../Api/Api";

const SET_USER_DATA = "SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
      case GET_CAPTCHA_URL_SUCCESS:
        return {
          ...state,
          captchaUrl: action.captchaUrl,
        };
    default:
      return state;
  }
};

export const setAuthUserDataActionCreator = (data) => {
  debugger;
  return {
    type: SET_USER_DATA,
    data: data,
  };
};

export const getCaptchaUrlSuccessActionCreator = (captchaUrl) => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: captchaUrl,
  };
};

export const getAuthUserDataThunkCreator = () => async (dispatch) => {
  let response = await authAPI.getMyAuthData();
  if (response.resultCode === 0) {
    dispatch(setAuthUserDataActionCreator({ ...response.data, isAuth: true }))
  };
  
};

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
      dispatch(getAuthUserDataThunkCreator());
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaUrlThunkCreator());
      }
      let message =
        response.messages.length > 0
          ? response.messages[0]
          : "Email or password is incorrect";
      dispatch(stopSubmit("login", { _error: message }));
    }
};
  

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {
  let response = await securityAPI.getCaptha();
  const captchaUrl = response.url;
  dispatch(getCaptchaUrlSuccessActionCreator(captchaUrl));
};

export const logOutThunkCreator = () => async (dispatch) => {
  let response = await authAPI.logOut();
  if (response.resultCode === 0)
    dispatch(
      setAuthUserDataActionCreator({
        id: null,
        email: null,
        login: null,
        isAuth: false,
      })
    );
};

export default authReducer;