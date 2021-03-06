import { Maybe } from '../../types/bepswap';
import { AssetDetail, Asset, PoolDetail, StakersAssetData, ThorchainEndpoints, ThorchainEndpoint } from '../../types/generated/midgard';

export type AssetData = {
  asset: AssetDetail;
  dateCreated: number;
  logo: string;
  name: string;
  priceRune: number;
};

export type AssetDataIndex = {
  [asset: string]: AssetData;
};

export type PoolDataMap = {
  [symbol: string]: PoolDetail
};

export type GetStakerPoolDataPayload = {
  asset: string;
  address: string;
};

export type StakerPoolData = {
  [symbol: string]: StakersAssetData;
};

export type PriceDataIndex = {
  [symbol: string]: number;
};

export type State = {
  assets: AssetDataIndex;
  assetArray: AssetDetail[];
  pools: Asset[];
  poolAddressData: Maybe<ThorchainEndpoints>;
  bnbPoolAddress: Maybe<ThorchainEndpoint>;
  poolAddress: Maybe<string>;
  poolData: PoolDataMap;
  stakerPoolData: StakerPoolData;
  runePrice: number;
  basePriceAsset: string; // set base price asset as a RUNE
  priceIndex: PriceDataIndex;
  error: Maybe<Error>;
  poolLoading: boolean;
  stakerPoolDataLoading: boolean;
};
