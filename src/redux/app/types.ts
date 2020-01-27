
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

export interface TxStatus {
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
}

/**
 * State of reducer
 */
export interface State {
  readonly txStatus: TxStatus;
}
