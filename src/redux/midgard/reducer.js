import actions from './actions';
import {
  getAssetSymbolFromPayload,
  getBNBPoolAddress,
  getPoolAddress,
  getPriceIndex,
} from './utils';
import { getBasePriceAsset } from '../../helpers/webStorageHelper';

const basePriceAsset = getBasePriceAsset() || 'RUNE';

const initState = {
  transaction: {},
  stats: {},
  assets: {},
  assetArray: [],
  pools: [],
  poolAddressData: {},
  bnbPoolAddress: {},
  poolAddress: '',
  poolData: {},
  stakers: [],
  stakerData: {},
  stakerPoolData: {},
  runePrice: 0,
  basePriceAsset, // set base price asset as a RUNE
  priceIndex: {
    RUNE: 1,
  },
  error: null,
  poolLoading: false,
  stakerPoolDataLoading: false,
};

export default function apiReducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.SET_BASE_PRICE_ASSET:
      return {
        ...state,
        basePriceAsset: payload,
        priceIndex: getPriceIndex(state.assetArray, payload),
      };
    case actions.SET_PRICE_INDEX:
      return {
        ...state,
        priceIndex: payload,
      };
    case actions.GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: payload,
        error: null,
      };
    case actions.GET_TRANSACTION_FAILED:
      return {
        ...state,
        transaction: null,
        error: payload,
      };
    case actions.GET_STATS_SUCCESS:
      return {
        ...state,
        stats: payload,
        error: null,
      };
    case actions.GET_STATS_FAILED:
      return {
        ...state,
        stats: null,
        error: payload,
      };
    case actions.GET_RUNE_PRICE_REQUEST:
      return {
        ...state,
        runePrice: 0,
        error: null,
      };
    case actions.GET_ASSET_INFO_SUCCESS:
      return {
        ...state,
        assets: payload.assetDataIndex,
        assetArray: payload.assetResponse,
        error: null,
      };
    case actions.GET_ASSET_INFO_FAILED:
      return {
        ...state,
        assets: {},
        assetArray: [],
        error: payload,
      };
    case actions.GET_POOLS_REQUEST:
      return {
        ...state,
        poolLoading: true,
        error: null,
      };
    case actions.GET_POOLS_SUCCESS:
      return {
        ...state,
        pools: payload,
        poolLoading: false,
        error: null,
      };
    case actions.GET_POOLS_FAILED:
      return {
        ...state,
        poolLoading: false,
        error: payload,
      };
    case actions.GET_POOL_DATA_SUCCESS:
      if (getAssetSymbolFromPayload(payload)) {
        return {
          ...state,
          poolData: {
            ...state.poolData,
            [getAssetSymbolFromPayload(payload)]: payload,
          },
          error: null,
        };
      }
      return {
        ...state,
        error: null,
      };
    case actions.GET_POOL_DATA_FAILED:
      return {
        ...state,
        error: payload,
      };
    case actions.GET_STAKERS_SUCCESS:
      return {
        ...state,
        stakers: payload,
        error: null,
      };
    case actions.GET_STAKERS_FAILED:
      return {
        ...state,
        stakers: null,
        error: payload,
      };
    case actions.GET_STAKER_DATA_SUCCESS:
      return {
        ...state,
        stakerData: payload,
        error: null,
      };
    case actions.GET_STAKER_DATA_FAILED:
      return {
        ...state,
        stakerData: null,
        error: payload,
      };
    case actions.GET_STAKER_POOL_DATA_REQUEST:
      return {
        ...state,
        stakerPoolDataLoading: true,
      };
    case actions.GET_STAKER_POOL_DATA_SUCCESS:
      if (getAssetSymbolFromPayload(payload)) {
        return {
          ...state,
          stakerPoolData: {
            ...state.stakerPoolData,
            [getAssetSymbolFromPayload(payload)]: payload,
          },
          stakerPoolDataLoading: false,
          error: null,
        };
      }
      return {
        ...state,
        error: null,
      };
    case actions.GET_STAKER_POOL_DATA_FAILED:
      return {
        ...state,
        stakerPoolData: {},
        error: payload,
      };
    case actions.GET_POOL_ADDRESSES_SUCCESS:
      return {
        ...state,
        poolAddressData: payload,
        bnbPoolAddress: getBNBPoolAddress(payload),
        poolAddress: getPoolAddress(payload),
        error: null,
      };
    case actions.GET_POOL_ADDRESSES_FAILED:
      return {
        ...state,
        poolAddressData: {},
        bnbPoolAddress: {},
        poolAddress: null,
        error: payload,
      };
    default:
      return state;
  }
}
