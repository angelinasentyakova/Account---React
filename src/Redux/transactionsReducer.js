import { transactionsAPI } from "../Api/Api";

const SET_TRANSACTIONS_DATA = "transactions/SET-TRANSACTIONS-DATA";
const SET_CURRENT_BALANCE = "transactions/SET-CURRENT-BALANCE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  currentBalance: null,
  transactionsData: [],
  isFetching: false,
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BALANCE:
      return {
        ...state,
        currentBalance: action.balance,
      };
    case SET_TRANSACTIONS_DATA:
      return {
        ...state,
        transactionsData: [...action.transactions],
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export const setTransactionsDataActionCreator = (transactions) => {
  return {
    type: SET_TRANSACTIONS_DATA,
    transactions,
  };
};

export const setCurrentBalanceActionCreator = (balance) => {
  return {
    type: SET_CURRENT_BALANCE,
    balance,
  };
};

export const toggleIsFetchingActionCreator = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

export const getTransactionsDataThunkCreator = () => async (dispatch) => {
  try {
    dispatch(toggleIsFetchingActionCreator(true));
    let data = await transactionsAPI.getTransactionsData();
    dispatch(toggleIsFetchingActionCreator(false));
    dispatch(setTransactionsDataActionCreator(data.transactions));
    dispatch(setCurrentBalanceActionCreator(data.currentBalance[0]));
  } catch (error) {
    alert(error.message);
  }
};

export default transactionsReducer;
