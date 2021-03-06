<<<<<<< HEAD
import { Reducer } from 'redux';
=======
>>>>>>> origin/master
import {
  AppActionsTypes,
  SET_TX_TIMER_TYPE,
  SET_TX_TIMER_MODAL,
  SET_TX_TIMER_STATUS,
  SET_TX_TIMER_VALUE,
  COUNT_TX_TIMER_VALUE,
  SET_TX_TIMER_START_TIME,
  RESET_TX_STATUS,
  SET_TX_HASH,
} from './actions';
import { MIN_VALUE, MAX_VALUE } from './const';
import { State } from './types';

const valueInRange = (v: number) => v >= MIN_VALUE && v <= MAX_VALUE;

const initState: State = {
  txStatus: {
    modal: false,
    value: 0,
    status: false,
  },
};

<<<<<<< HEAD
const reducer: Reducer<State, AppActionsTypes> = (
  state = initState,
  action,
) => {
=======
const appReducer = (state = initState, action: AppActionsTypes): State => {
>>>>>>> origin/master
  switch (action.type) {
    case SET_TX_TIMER_TYPE:
      return {
        ...state,
        txStatus: {
          ...state.txStatus,
          type: action.payload,
        },
      };
    case SET_TX_TIMER_MODAL:
      return {
        ...state,
        txStatus: {
          ...state.txStatus,
          modal: action.payload,
        },
      };
    case SET_TX_TIMER_STATUS:
      return {
        ...state,
        txStatus: {
          ...state.txStatus,
          status: action.payload,
        },
      };
    // Sets a new `value`
    // It makes sure `value` will be still in "range"
    case SET_TX_TIMER_VALUE: {
      const { payload } = action;
      const value = valueInRange(payload) ? payload : state.txStatus.value;
      return {
        ...state,
        txStatus: {
          ...state.txStatus,
          value,
        },
      };
    }
    // Counts `value` by a given number
    // It makes sure `value` will be still in "range"
    case COUNT_TX_TIMER_VALUE: {
      const { payload } = action;
      const currentValue = state.txStatus.value;
      const nextValue = currentValue + payload;
      const value = valueInRange(nextValue) ? nextValue : currentValue;

      return {
        ...state,
        txStatus: {
          ...state.txStatus,
          value,
        },
      };
    }
    case SET_TX_TIMER_START_TIME:
      return {
        ...state,
        txStatus: {
          ...state.txStatus,
          startTime: action.payload,
        },
      };
    case SET_TX_HASH:
      return {
        ...state,
        txStatus: {
          ...state.txStatus,
          hash: action.payload,
        },
      };
    case RESET_TX_STATUS: {
      const { payload } = action;
      const txStatus = payload
        ? { ...initState.txStatus, ...payload }
        : { ...initState.txStatus };
      return {
        ...state,
        txStatus,
      };
    }
    default:
      return state;
  }
};

<<<<<<< HEAD
export default reducer;
=======
export default appReducer;
>>>>>>> origin/master
