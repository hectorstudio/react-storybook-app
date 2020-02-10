<<<<<<< HEAD
=======

>>>>>>> origin/master
/**
 * Tx types
 */
export enum TxTypes {
  STAKE = 'stake',
  SWAP = 'swap',
  WITHDRAW = 'withdraw',
  CREATE = 'create',
  TRADE = 'trade',
}

<<<<<<< HEAD
export type TxStatus = {
=======
export interface TxStatus {
>>>>>>> origin/master
  /**
   * Type of tx's - optional
   */
  readonly type?: TxTypes;
  /**
   *  Modal state
   * true -> `opened` modal
   * `false` -> `closed` modal
   */
  readonly modal: boolean;
  /**
   *  Current step value. It can be something between 0 - `MAX_VALUE` to show a progress of requests
   */
  readonly value: number;
  /**
   *  Start time of first request - undefined by default
   */
  readonly startTime?: number;
  /**
   * Status of `TxTimer` component (it could be any other component, too)
   * `true` -> `TxTimer` component is counting
   * `false` -> <TxTimer /> component is not counting
   */
  readonly status: boolean;
  /**
   * Transaction hash - optional
   */
  readonly hash?: string;
<<<<<<< HEAD
};
=======
}
>>>>>>> origin/master

/**
 * State of reducer
 */
<<<<<<< HEAD
export type State = {
  readonly txStatus: TxStatus;
};
=======
export interface State {
  readonly txStatus: TxStatus;
}
>>>>>>> origin/master
