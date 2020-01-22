import { TxTypes, TxStatus } from './types';

export interface SetTxTimerType {
  type: typeof SET_TX_TIMER_TYPE;
  payload: TxTypes;
}

export interface SetTxTimerModal {
  type: typeof SET_TX_TIMER_MODAL;
  payload: boolean;
}

export interface SetTxTimerValue {
  type: typeof SET_TX_TIMER_VALUE;
  payload: number;
}

export interface SetTxTimerStatus {
  type: typeof SET_TX_TIMER_STATUS;
  payload: boolean;
}

export interface CountTxTimerValue {
  type: typeof COUNT_TX_TIMER_VALUE;
  payload: number;
}

export interface SetTxTimerStartTime {
  type: typeof SET_TX_TIMER_START_TIME;
  payload: number;
}

export interface ResetTxStatus {
  type: typeof RESET_TX_STATUS;
  payload?: TxStatus;
}

export type AppActionsTypes =
  | SetTxTimerType
  | SetTxTimerModal
  | SetTxTimerStatus
  | SetTxTimerValue
  | CountTxTimerValue
  | SetTxTimerStartTime
  | ResetTxStatus;

export const SET_TX_TIMER_TYPE = 'SET_TX_TIMER_TYPE';
export const SET_TX_TIMER_MODAL = 'SET_TX_TIMER_MODAL';
export const SET_TX_TIMER_STATUS = 'SET_TX_TIMER_STATUS';
export const SET_TX_TIMER_VALUE = 'SET_TX_TIMER_VALUE';
export const COUNT_TX_TIMER_VALUE = 'COUNT_TX_TIMER_VALUE';
export const SET_TX_TIMER_START_TIME = 'SET_TX_TIMER_START_TIME';
export const RESET_TX_STATUS = 'RESET_TX_STATUS';

export const setTxTimerType = (payload: TxTypes): SetTxTimerType => ({
  type: SET_TX_TIMER_TYPE,
  payload,
});

export const setTxTimerModal = (payload: boolean): SetTxTimerModal => ({
  type: SET_TX_TIMER_MODAL,
  payload,
});

export const setTxTimerStatus = (payload: boolean): SetTxTimerStatus => ({
  type: SET_TX_TIMER_STATUS,
  payload,
});

export const setTxTimerValue = (payload: number): SetTxTimerValue => ({
  type: SET_TX_TIMER_VALUE,
  payload,
});

export const countTxTimerValue = (payload: number): CountTxTimerValue => ({
  type: COUNT_TX_TIMER_VALUE,
  payload,
});

export const setTxTimerStartTime = (payload: number): SetTxTimerStartTime => ({
  type: SET_TX_TIMER_START_TIME,
  payload,
});

export const resetTxStatus = (payload?: TxStatus): ResetTxStatus => ({
  type: RESET_TX_STATUS,
  payload,
});
