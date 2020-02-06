import { TransferEventData, TxHash } from '../types/binance';

/**
 * Get `hash` from transfer event sent by Binance chain
 * @see https://docs.binance.org/api-reference/dex-api/ws-streams.html#3-transfer
*/
export const getHashFromTransfer = (transfer?: {data: Pick<TransferEventData, 'H'>}): TxHash | undefined => transfer?.data?.H;

/**
 * Get `hash` from memo
*/
export const getTxHashFromMemo = (transfer?: {data: Pick<TransferEventData, 'M'>}) => transfer?.data?.M.split(':')[1];
