import { get as _get } from 'lodash';

import {
  getStakeMemo,
  getCreateMemo,
  getWithdrawMemo,
} from '../../helpers/memoHelper';

import {
  getFixedNumber,
  getBaseNumberFormat,
  getTickerFormat,
  getUserFormat,
} from '../../helpers/stringHelper';
import { getTxHashFromMemo } from '../../helpers/binance';

export const getPoolData = (from, poolInfo, priceIndex, basePriceAsset) => {
  const asset = from;
  const target = _get(poolInfo, 'asset.ticker', '');
  const symbol = _get(poolInfo, 'asset.symbol', '');

  const runePrice = priceIndex.RUNE;
  const depth = Number(poolInfo.runeDepth) * runePrice;
  const volume24 = poolInfo.poolVolume24hr * runePrice;
  const volumeAT = poolInfo.poolVolume * runePrice;
  const transaction = Number(poolInfo.poolTxAverage * runePrice);

  const { poolROI: roiAT } = poolInfo;
  const liqFee = Number(poolInfo.poolFeeAverage);

  const totalSwaps = poolInfo.swappersCount;
  const totalStakers = poolInfo.stakersCount;

  const depthValue = `${basePriceAsset} ${getUserFormat(
    depth,
  ).toLocaleString()}`;
  const volume24Value = `${basePriceAsset} ${getUserFormat(volume24)}`;
  const transactionValue = `${basePriceAsset} ${getUserFormat(transaction)}`;
  const liqFeeValue = `${getUserFormat(liqFee)}%`;
  const roiAtValue = `${getUserFormat(roiAT)}% pa`;

  return {
    asset,
    target,
    depth,
    volume24,
    volumeAT,
    transaction,
    liqFee,
    roiAT,
    totalSwaps,
    totalStakers,
    values: {
      pool: {
        asset,
        target,
      },
      target,
      symbol,
      depth: depthValue,
      volume24: volume24Value,
      transaction: transactionValue,
      liqFee: liqFeeValue,
      roiAT: roiAtValue,
    },
    raw: {
      depth: getUserFormat(depth),
      volume24: getUserFormat(volume24),
      transaction: getUserFormat(transaction),
      liqFee: getUserFormat(liqFee),
      roiAT: getUserFormat(roiAT),
    },
  };
};

export const getCalcResult = (
  tokenName,
  pools,
  poolAddress,
  rValue,
  runePrice,
  tValue,
) => {
  let R = 10000;
  let T = 10;
  const Pr = runePrice;
  const result = {};

  // CHANGELOG:
  /*
    balance_rune => runeStakedTotal
    balance_token => assetStakedTotal
    pool_units => poolUnits
  */
  Object.keys(pools).forEach(key => {
    const poolData = pools[key];
    const {
      runeStakedTotal,
      assetStakedTotal,
      poolUnits,
      asset: { symbol },
    } = poolData;

    if (symbol.toLowerCase() === tokenName.toLowerCase()) {
      R = Number(runeStakedTotal);
      T = Number(assetStakedTotal);
      result.ratio = 1 / (R / T);
      result.poolAddress = poolAddress;
      result.symbolTo = symbol;
      result.poolUnits = poolUnits;
    }
  });

  const r = getBaseNumberFormat(rValue);
  const t = getBaseNumberFormat(tValue);

  const poolPrice = getFixedNumber((R / T) * runePrice);
  const newPrice = getFixedNumber((runePrice * (r + R)) / (t + T));
  const newDepth = getFixedNumber(runePrice * (1 + (r / R + t / T) / 2) * R);
  const share = getFixedNumber(((r / (r + R) + t / (t + T)) / 2) * 100);

  return {
    ...result,
    poolPrice,
    newPrice,
    newDepth,
    share,
    Pr,
    R,
    T,
  };
};

export const validateStake = (wallet, tokenAmount, data) => {
  const { poolAddress } = data;
  if (!wallet || !poolAddress || !tokenAmount) {
    return false;
  }
  return true;
};

export const confirmStake = (
  Binance,
  wallet,
  runeAmount,
  tokenAmount,
  data,
) => {
  return new Promise((resolve, reject) => {
    if (!validateStake(wallet, tokenAmount, data)) {
      return reject();
    }

    const { poolAddress, symbolTo } = data;

    if (runeAmount > 0 && tokenAmount > 0) {
      const memo = getStakeMemo(symbolTo);

      const outputs = [
        {
          to: poolAddress,
          coins: [
            {
              denom: 'RUNE-A1F',
              amount: runeAmount.toFixed(8),
            },
            {
              denom: symbolTo,
              amount: tokenAmount.toFixed(8),
            },
          ],
        },
      ];

      Binance.multiSend(wallet, outputs, memo)
        .then(response => resolve(response))
        .catch(error => reject(error));
    } else if (runeAmount <= 0 && tokenAmount) {
      const memo = getStakeMemo(symbolTo);

      Binance.transfer(wallet, poolAddress, tokenAmount, symbolTo, memo)
        .then(response => resolve(response))
        .catch(error => reject(error));
    } else if (tokenAmount <= 0 && runeAmount) {
      const memo = getStakeMemo('RUNE-A1F');

      Binance.transfer(wallet, poolAddress, runeAmount, 'RUNE-A1F', memo)
        .then(response => resolve(response))
        .catch(error => reject(error));
    }
  });
};

export const getCreatePoolTokens = (assetData, pools) => {
  return assetData.filter(data => {
    let unique = true;

    if (getTickerFormat(data.asset) === 'rune') {
      return false;
    }

    pools.forEach(pool => {
      if (pool.symbol === data.asset) {
        unique = false;
      }
    });

    return unique;
  });
};

export const getCreatePoolCalc = (
  tokenName,
  poolAddress,
  rValue,
  runePrice,
  tValue,
) => {
  const Pr = runePrice;

  if (!poolAddress) {
    return {
      poolPrice: 0,
      depth: 0,
      share: 100,
    };
  }

  const r = rValue && getBaseNumberFormat(rValue);
  const t = getBaseNumberFormat(tValue);

  const poolPrice = tValue && getFixedNumber((r / t) * runePrice);
  const depth = getFixedNumber(runePrice * r);
  const share = 100;
  const tokenSymbol = tokenName;

  return {
    poolAddress,
    tokenSymbol,
    poolPrice,
    depth,
    share,
    Pr,
  };
};

export const confirmCreatePool = (
  Binance,
  wallet,
  runeAmount,
  tokenAmount,
  data,
) => {
  return new Promise((resolve, reject) => {
    if (!validateStake(wallet, tokenAmount, data)) {
      return reject();
    }

    const { poolAddress, tokenSymbol } = data;

    const memo = getCreateMemo(tokenSymbol);

    const outputs = [
      {
        to: poolAddress,
        coins: [
          {
            denom: 'RUNE-A1F',
            amount: runeAmount.toFixed(8),
          },
          {
            denom: tokenSymbol,
            amount: tokenAmount.toFixed(8),
          },
        ],
      },
    ];

    Binance.multiSend(wallet, outputs, memo)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export const confirmWithdraw = (
  Binance,
  wallet,
  poolAddress,
  symbol,
  percent,
) => {
  return new Promise((resolve, reject) => {
    if (!wallet || !poolAddress) {
      return reject();
    }

    const memo = getWithdrawMemo(symbol, percent * 100);

    const amount = 0.00000001;
    Binance.transfer(wallet, poolAddress, amount, 'BNB', memo)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export const getTxType = memo => {
  let txType = 'unknown';

  if (memo) {
    const str = memo.toLowerCase();

    const memoTypes = [
      {
        type: 'stake',
        memos: ['stake', 'st', '+'],
      },
      {
        type: 'withdraw',
        memos: ['withdraw', 'wd', '-'],
      },
      {
        type: 'outbound',
        memos: ['outbound'],
      },
    ];

    memoTypes.forEach(memoData => {
      const { type, memos } = memoData;
      let matched = false;

      memos.forEach(memoText => {
        if (str.includes(`${memoText}:`)) {
          matched = true;
        }
      });

      if (matched) {
        txType = type;
      }
    });
  }

  return txType;
};

export const parseTransfer = tx => {
  const txHash = tx.data.H;
  const txMemo = tx.data.M;
  const txFrom = tx.data.f;
  const txInfo = tx.data.t[0];
  const txTo = txInfo.o;
  const txData = txInfo.c;

  return {
    txHash,
    txMemo,
    txFrom,
    txTo,
    txData,
  };
};

export const stakedResult = ({
  tx,
  fromAddr,
  toAddr,
  toToken,
  runeAmount,
  tokenAmount,
}) => {
  const txType = getTxType(tx?.data?.M);
  let success = false;
  const { txFrom, txTo, txData } = parseTransfer(tx);
  if (txType === 'stake') {
    success = true;
    if (txFrom === toAddr && txTo === fromAddr && txData.length === 2) {
      txData.forEach(data => {
        const tickerFormat = getTickerFormat(data.a);
        if (tickerFormat === 'rune') {
          // compare rune amount from previous stake tx
          if (Number(data.A) !== runeAmount) {
            success = false;
          }
        }
        // compare token symbol and amount from previous stake tx
        if (tickerFormat !== 'rune' && data.a !== toToken) {
          if (Number(data.A) !== tokenAmount) {
            success = false;
          }
        }
      });
    }
  }
  return success;
};

export const withdrawResult = ({ tx, hash }) => {
  const txType = getTxType(tx?.data?.M);
  const txHash = getTxHashFromMemo(tx);
  let success = false;
  if (txType === 'outbound' && hash === txHash) {
    success = true;
  }
  return success;
};
