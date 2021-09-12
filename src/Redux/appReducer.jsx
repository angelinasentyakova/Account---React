import { getAuthUserDataThunkCreator } from "./authReducer";

const SET_INITIALIZED = 'SET-INITIALIZED';

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      }        
    default:
      return state;
  }
}

export const inititalizedSuccesActionCreator = () => {
  return {
    type: SET_INITIALIZED,
  }
}

export const inititalizeThunkCreator = () => (dispatch) => {
  let promise = dispatch(getAuthUserDataThunkCreator());
  promise.then(() => {
    dispatch(inititalizedSuccesActionCreator());
  })
  
}

export default appReducer;
