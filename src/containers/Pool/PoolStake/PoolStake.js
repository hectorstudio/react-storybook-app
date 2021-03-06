/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Row, Col, Icon, notification } from 'antd';
=======
import { Row, Col, Icon, Form, notification } from 'antd';
>>>>>>> origin/master
import { crypto } from '@binance-chain/javascript-sdk';
import { get as _get } from 'lodash';

import Binance from '../../../clients/binance';
import { withBinanceTransferWS } from '../../../HOC/websocket/WSBinance';

import Label from '../../../components/uielements/label';
import Status from '../../../components/uielements/status';
import CoinCard from '../../../components/uielements/coins/coinCard';
import CoinData from '../../../components/uielements/coins/coinData';
import Slider from '../../../components/uielements/slider';
import TxTimer from '../../../components/uielements/txTimer';
import Drag from '../../../components/uielements/drag';
import Modal from '../../../components/uielements/modal';
<<<<<<< HEAD
import Button from '../../../components/uielements/button';
import WalletButton from '../../../components/uielements/walletButton';
import PrivateModal from '../../../components/modals/privateModal';
=======
import Input from '../../../components/uielements/input';
import Button from '../../../components/uielements/button';
import WalletButton from '../../../components/uielements/walletButton';
>>>>>>> origin/master

import {
  setTxTimerModal,
  setTxTimerStatus,
  countTxTimerValue,
  resetTxStatus,
  setTxTimerValue,
  setTxHash,
} from '../../../redux/app/actions';
<<<<<<< HEAD
import * as midgardActions from '../../../redux/midgard/actions';
import * as walletActions from '../../../redux/wallet/actions';
=======
import midgardActions from '../../../redux/midgard/actions';
import walletactions from '../../../redux/wallet/actions';
>>>>>>> origin/master

import {
  ContentWrapper,
  Tabs,
  ConfirmModal,
  ConfirmModalContent,
<<<<<<< HEAD
=======
  PrivateModal,
>>>>>>> origin/master
} from './PoolStake.style';
import {
  getPoolData,
  getCalcResult,
  confirmStake,
  confirmWithdraw,
  withdrawResult,
} from '../utils';
import {
  getUserFormat,
  getTickerFormat,
  getFixedNumber,
  emptyString,
} from '../../../helpers/stringHelper';
import { TESTNET_TX_BASE_URL } from '../../../helpers/apiHelper';
import TokenInfo from '../../../components/uielements/tokens/tokenInfo';
import StepBar from '../../../components/uielements/stepBar';
import { MAX_VALUE } from '../../../redux/app/const';
import { getHashFromTransfer } from '../../../helpers/binance';
import { delay } from '../../../helpers/asyncHelper';

const { TabPane } = Tabs;

<<<<<<< HEAD
=======
const { getPools, getPoolAddress, getStakerPoolData } = midgardActions;
const { refreshStake } = walletactions;

>>>>>>> origin/master
class PoolStake extends Component {
  hash = null;

  constructor(props) {
    super(props);
    this.state = {
      advancedMode: false,
      dragReset: true,
      openWalletAlert: false,
      openPrivateModal: false,
      password: emptyString,
      invalidPassword: false,
      validatingPassword: false,
      runeAmount: 0,
      tokenAmount: 0,
      balance: 100,
      fR: 1,
      fT: 1,
      runeTotal: 0,
      tokenTotal: 0,
      runePercent: 0,
      tokenPercent: 0,
      txResult: false,
    };
  }

  componentDidMount() {
    const { getPoolAddress, getPools } = this.props;

    getPoolAddress();
    getPools();
    this.getStakerInfo();
  }

  componentDidUpdate(prevProps) {
    const {
      wsTransfers,
<<<<<<< HEAD
      user,
      txStatus: { type, hash },
      refreshStake,
    } = this.props;
    const { txResult } = this.state;
    const length = wsTransfers.length;
    const wallet = user ? user.wallet : null;
=======
      user: { wallet },
      txStatus: { type, hash },
    } = this.props;
    const { txResult } = this.state;
    const length = wsTransfers.length;
>>>>>>> origin/master

    if (
      length !== prevProps.wsTransfers.length &&
      length > 0 &&
      hash !== undefined &&
      !txResult
    ) {
      const lastTx = wsTransfers[length - 1];
      const transferHash = getHashFromTransfer(lastTx);

<<<<<<< HEAD
      if (wallet) {
        // Currently we do a different handling for `stake` + `withdraw`
        // See https://thorchain.slack.com/archives/CL5B4M4BC/p1579816500171200
        if (type === 'stake' /* TxTypes.STAKE */) {
          if (transferHash === hash) {
            // Just refresh stakes after update
            refreshStake(wallet);
          }
        }

        if (type === 'withdraw' /* TxTypes.WITHDRAW */) {
          const txResult = withdrawResult({
            tx: lastTx,
            hash,
          });

          if (txResult) {
            this.setState({
              txResult: true,
            });
            // refresh stakes after update
            refreshStake(wallet);
          }
=======
      // Currently we do a different handling for `stake` + `withdraw`
      // See https://thorchain.slack.com/archives/CL5B4M4BC/p1579816500171200
      if (type === 'stake' /* TxTypes.STAKE */) {
        if (transferHash === hash) {
          // Just refresh stakes after update
          refreshStake(wallet);
        }
      }

      if (type === 'withdraw' /* TxTypes.WITHDRAW */) {
        const txResult = withdrawResult({
          tx: lastTx,
          hash,
        });

        if (txResult) {
          this.setState({
            txResult: true,
          });
          // refresh stakes after update
          refreshStake(wallet);
>>>>>>> origin/master
        }
      }
    }
  }

  componentWillUnmount() {
    const { resetTxStatus } = this.props;
    resetTxStatus();
  }

  getStakerInfo = () => {
<<<<<<< HEAD
    const { getStakerPoolData, symbol, user } = this.props;
    if (user) {
      getStakerPoolData({ asset: symbol, address: user.wallet });
=======
    const {
      getStakerPoolData,
      symbol,
      user: { wallet },
    } = this.props;

    if (wallet) {
      getStakerPoolData({ asset: symbol, address: wallet });
>>>>>>> origin/master
    }
  };

  isLoading = () => {
    const { poolLoading, stakerPoolDataLoading } = this.props;

    return poolLoading && stakerPoolDataLoading;
  };

<<<<<<< HEAD
  handleChangePassword = password => {
    this.setState({
      password,
=======
  handleChangePassword = e => {
    this.setState({
      password: e.target.value,
>>>>>>> origin/master
      invalidPassword: false,
    });
  };

  handleChangeTokenAmount = tokenName => amount => {
    const { assetData, symbol } = this.props;
    const { fR, fT } = this.state;

    let newValue;
    const source = getTickerFormat(tokenName);

    const sourceAsset = assetData.find(data => {
      const { asset } = data;
      const tokenName = getTickerFormat(asset);
      if (tokenName === source) {
        return true;
      }
      return false;
    });

    const targetToken = assetData.find(data => {
      const { asset } = data;
      if (asset.toLowerCase() === symbol.toLowerCase()) {
        return true;
      }
      return false;
    });

    if (!sourceAsset || !targetToken) {
      return;
    }

    const balance = tokenName === 'rune' ? fR : fT;

    const totalAmount = !sourceAsset ? 0 : sourceAsset.assetValue * balance;
    const totalTokenAmount = targetToken.assetValue * balance || 0;

    if (tokenName === 'rune') {
      newValue = amount;
      const { ratio } = this.getData();
      const tokenValue = newValue * ratio;
      const tokenAmount =
        tokenValue <= totalTokenAmount ? tokenValue : totalTokenAmount;

      if (totalAmount < newValue) {
        this.setState({
          runeAmount: totalAmount,
          tokenAmount,
          runePercent: 100,
        });
      } else {
        this.setState({
          runeAmount: newValue,
          tokenAmount,
        });
      }
    } else {
      newValue = amount;

      if (totalAmount < newValue) {
        this.setState({
          tokenAmount: totalAmount,
          tokenPercent: 100,
        });
      } else {
        this.setState({
          tokenAmount: newValue,
        });
      }
    }
  };

  handleChangePercent = token => amount => {
    const { assetData, symbol } = this.props;
    const { fR, fT } = this.state;

    const selectedToken = assetData.find(data => {
      const { asset } = data;
      const tokenName = getTickerFormat(asset);
      if (tokenName === token.toLowerCase()) {
        return true;
      }
      return false;
    });

    const targetToken = assetData.find(data => {
      const { asset } = data;
      if (asset.toLowerCase() === symbol.toLowerCase()) {
        return true;
      }
      return false;
    });

    if (!selectedToken || !targetToken) {
      return;
    }

    const balance = token === 'rune' ? fR : fT;
    const totalAmount = selectedToken.assetValue || 0;
    const totalTokenAmount = targetToken.assetValue || 0;
    const value = ((totalAmount * amount) / 100) * balance;

    if (token === 'rune') {
      const { ratio } = this.getData();
      const tokenValue = value * ratio;
      const tokenAmount =
        tokenValue <= totalTokenAmount ? tokenValue : totalTokenAmount;

      this.setState({
        runeAmount: value,
        tokenAmount,
        runePercent: amount,
        runeTotal: totalAmount,
      });
    } else {
      this.setState({
        tokenAmount: value,
        tokenPercent: amount,
        tokenTotal: totalAmount,
      });
    }
  };

  handleChangeBalance = balance => {
    const { runePercent, tokenPercent, runeTotal, tokenTotal } = this.state;
    const fR = balance <= 100 ? 1 : (200 - balance) / 100;
    const fT = balance >= 100 ? 1 : balance / 100;

    if (runePercent > 0) {
      const runeAmount = ((runeTotal * runePercent) / 100) * fR;
      this.setState({
        runeAmount,
      });
    }
    if (tokenPercent > 0) {
      const tokenAmount = ((tokenTotal * tokenPercent) / 100) * fT;
      this.setState({
        tokenAmount,
      });
    }
    this.setState({
      balance,
      fR,
      fT,
    });
  };

  handleDrag = () => {
    this.setState({
      dragReset: false,
    });
  };

  getData = () => {
    const { symbol, poolData, poolAddress } = this.props;
    const { runeAmount, tokenAmount, runePrice } = this.state;

    return getCalcResult(
      symbol,
      poolData,
      poolAddress,
      runeAmount,
      runePrice,
      tokenAmount,
    );
  };

  handleConfirmStake = async () => {
<<<<<<< HEAD
    const { user, setTxHash } = this.props;
    const { runeAmount, tokenAmount } = this.state;

    if (user) {
      const { wallet } = user;
      this.handleStartTimer('stake');

      this.setState({
        txResult: false,
      });

      const data = this.getData();

      try {
        const { result } = await confirmStake(
          Binance,
          wallet,
          runeAmount,
          tokenAmount,
          data,
        );

        setTxHash(result[0].hash);

        this.stakeData = {
          fromAddr: wallet,
          toAddr: data.poolAddress,
          toToken: data.symbolTo,
          runeAmount,
          tokenAmount,
        };
      } catch (error) {
        notification.error({
          message: 'Swap Invalid',
          description: 'Swap information is not valid.',
        });
        this.setState({
          dragReset: true,
        });
        console.error(error); // eslint-disable-line no-console
      }
=======
    const {
      user: { wallet },
      setTxHash,
    } = this.props;
    const { runeAmount, tokenAmount } = this.state;

    this.handleStartTimer('stake');

    this.setState({
      txResult: false,
    });

    const data = this.getData();

    try {
      const { result } = await confirmStake(
        Binance,
        wallet,
        runeAmount,
        tokenAmount,
        data,
      );

      setTxHash(result[0].hash);

      this.stakeData = {
        fromAddr: wallet,
        toAddr: data.poolAddress,
        toToken: data.symbolTo,
        runeAmount,
        tokenAmount,
      };
    } catch (error) {
      notification.error({
        message: 'Swap Invalid',
        description: 'Swap information is not valid.',
      });
      this.setState({
        dragReset: true,
      });
      console.error(error); // eslint-disable-line no-console
>>>>>>> origin/master
    }
  };

  handleSwitchAdvancedMode = () => {
    this.setState(prevState => ({
      advancedMode: !prevState.advancedMode,
    }));
  };

  handleStake = () => {
<<<<<<< HEAD
    const { user } = this.props;
    const { runeAmount, tokenAmount } = this.state;
    const wallet = user ? user.wallet : null;
    const keystore = user ? user.keystore : null;
=======
    const {
      user: { keystore, wallet },
    } = this.props;
    const { runeAmount, tokenAmount } = this.state;
>>>>>>> origin/master

    if (!wallet) {
      this.setState({
        openWalletAlert: true,
      });
      return;
    }

    if (Number(runeAmount) <= 0 && Number(tokenAmount) <= 0) {
      notification.error({
        message: 'Stake Invalid',
        description: 'You need to enter an amount to stake.',
      });
      this.setState({
        dragReset: true,
      });
      return;
    }

    if (keystore) {
      this.type = 'stake';
      this.handleOpenPrivateModal();
    } else if (wallet) {
      this.handleConfirmStake();
    }
  };

  handleConnectWallet = () => {
    this.setState({
      openWalletAlert: false,
    });

    this.props.history.push('/connect');
  };

  hideWalletAlert = () => {
    this.setState({
      openWalletAlert: false,
      dragReset: true,
    });
  };

  handleStartTimer = type => {
    const { resetTxStatus } = this.props;
    resetTxStatus({
      type,
      modal: true,
      status: true,
      startTime: Date.now(),
    });
  };

  handleConfirmPassword = async e => {
    e.preventDefault();

<<<<<<< HEAD
    const { user } = this.props;
    const { password } = this.state;

    if (user) {
      const { keystore, wallet } = user;

      this.setState({ validatingPassword: true });
      // Short delay to render latest state changes of `validatingPassword`
      await delay(2000);

      try {
        const privateKey = crypto.getPrivateKeyFromKeyStore(keystore, password);
        Binance.setPrivateKey(privateKey);
        const address = crypto.getAddressFromPrivateKey(
          privateKey,
          Binance.getPrefix(),
        );
        if (wallet && wallet === address) {
          if (this.type === 'stake') {
            this.handleConfirmStake();
          } else if (this.type === 'withdraw') {
            this.handleConfirmWithdraw();
          }
        }

        this.setState({
          validatingPassword: false,
          openPrivateModal: false,
        });
      } catch (error) {
        this.setState({
          validatingPassword: false,
          invalidPassword: true,
        });
        console.error(error); // eslint-disable-line no-console
      }
=======
    const {
      user: { keystore, wallet },
    } = this.props;
    const { password } = this.state;

    this.setState({ validatingPassword: true });
    // Short delay to render latest state changes of `validatingPassword`
    await delay(2000);

    try {
      const privateKey = crypto.getPrivateKeyFromKeyStore(keystore, password);
      Binance.setPrivateKey(privateKey);
      const address = crypto.getAddressFromPrivateKey(
        privateKey,
        Binance.getPrefix(),
      );
      if (wallet === address) {
        if (this.type === 'stake') {
          this.handleConfirmStake();
        } else if (this.type === 'withdraw') {
          this.handleConfirmWithdraw();
        }
      }

      this.setState({
        validatingPassword: false,
        openPrivateModal: false,
      });
    } catch (error) {
      this.setState({
        validatingPassword: false,
        invalidPassword: true,
      });
      console.error(error); // eslint-disable-line no-console
>>>>>>> origin/master
    }
  };

  handleOpenPrivateModal = () => {
    this.setState({
      openPrivateModal: true,
      password: emptyString,
      invalidPassword: false,
    });
  };

  handleCancelPrivateModal = () => {
    this.setState({
      openPrivateModal: false,
      dragReset: true,
    });
  };

  handleCloseModal = () => {
    const { setTxTimerModal } = this.props;

    setTxTimerModal(false);
  };

  handleSelectTraget = asset => {
    const URL = `/pool/${asset}`;

    this.props.history.push(URL);
  };

  handleWithdraw = () => {
<<<<<<< HEAD
    const { user } = this.props;
    const wallet = user ? user.wallet : null;
    const keystore = user ? user.keystore : null;
=======
    const {
      user: { keystore, wallet },
    } = this.props;
>>>>>>> origin/master

    if (!wallet) {
      this.setState({
        openWalletAlert: true,
      });
      return;
    }

    if (keystore) {
      this.type = 'withdraw';
      this.handleOpenPrivateModal();
    } else if (wallet) {
      this.handleConfirmWithdraw();
    }
  };

  handleConfirmWithdraw = async () => {
<<<<<<< HEAD
    const { symbol, poolAddress, user, setTxHash } = this.props;
    const { widthdrawPercentage } = this.state;
    const withdrawRate = (widthdrawPercentage || 50) / 100;

    if (user) {
      const { wallet } = user;

      this.handleStartTimer('withdraw');

      this.setState({
        txResult: false,
      });

      try {
        const percentage = withdrawRate * 100;
        const { result } = await confirmWithdraw(
          Binance,
          wallet,
          poolAddress,
          symbol,
          percentage,
        );

        setTxHash(result[0].hash);
      } catch (error) {
        notification.error({
          message: 'Withdraw Invalid',
          description: 'Withdraw information is not valid.',
        });
        this.setState({
          dragReset: true,
        });
        console.error(error); // eslint-disable-line no-console
      }
=======
    const {
      symbol,
      poolAddress,
      user: { wallet },
      setTxHash,
    } = this.props;
    const { widthdrawPercentage } = this.state;
    const withdrawRate = (widthdrawPercentage || 50) / 100;

    this.handleStartTimer('withdraw');

    this.setState({
      txResult: false,
    });

    try {
      const percentage = withdrawRate * 100;
      const { result } = await confirmWithdraw(
        Binance,
        wallet,
        poolAddress,
        symbol,
        percentage,
      );

      setTxHash(result[0].hash);
    } catch (error) {
      notification.error({
        message: 'Withdraw Invalid',
        description: 'Withdraw information is not valid.',
      });
      this.setState({
        dragReset: true,
      });
      console.error(error); // eslint-disable-line no-console
>>>>>>> origin/master
    }
  };

  handleChangeTxValue = () => {
    const {
      countTxTimerValue,
      setTxTimerValue,
      txStatus: { value, type, hash },
    } = this.props;
    const { txResult } = this.state;

    // Count handling depends on `type`
    if (type === 'withdraw') {
      // If tx has been confirmed finally,
      // then we jump to last `valueIndex` ...
      if (txResult && value < MAX_VALUE) {
        setTxTimerValue(MAX_VALUE);
      }
      // In other cases (no `txResult`) we don't jump to last `indexValue`...
      if (!txResult) {
        // ..., but we are still counting
        if (value < 75) {
          // Add a quarter
          countTxTimerValue(25);
        } else if (value >= 75 && value < 95) {
          // With last quarter we just count a little bit to signalize still a progress
          countTxTimerValue(1);
        }
      }
    }

    if (type === 'stake') {
      // If tx has been sent successfully,
      // we jump to last `valueIndex` ...
      if (hash && value < MAX_VALUE) {
        setTxTimerValue(MAX_VALUE);
      }
      // In other cases (no `hash`) we don't jump to last `indexValue`...
      if (!hash) {
        // ..., but we are still counting
        if (value < 75) {
          // Add a quarter
          countTxTimerValue(25);
        } else if (value >= 75 && value < 95) {
          // With last quarter we just count a little bit to signalize still a progress
          countTxTimerValue(1);
        }
      }
    }
  };

  handleEndTxTimer = () => {
    const { setTxTimerStatus } = this.props;
    setTxTimerStatus(false);
    this.setState({
      dragReset: true,
    });
    // get staker info again after finished
    this.getStakerInfo();
  };

  renderStakeModalContent = completed => {
    const {
      txStatus: { status, value, startTime, hash },
      symbol,
      priceIndex,
      basePriceAsset,
    } = this.props;
    const { runeAmount, tokenAmount } = this.state;

    const source = 'rune';
    const target = getTickerFormat(symbol);

    const Pr = priceIndex.RUNE;
    const tokenPrice = _get(priceIndex, target.toUpperCase(), 0);
    const txURL = TESTNET_TX_BASE_URL + hash;

    return (
      <ConfirmModalContent>
        <Row className="modal-content">
          <div className="timer-container">
            <TxTimer
              status={status}
              value={value}
              maxValue={MAX_VALUE}
              startTime={startTime}
              onChange={this.handleChangeTxValue}
              onEnd={this.handleEndTxTimer}
            />
          </div>
          <div className="coin-data-wrapper">
            <StepBar size={50} />
            <div className="coin-data-container">
              <CoinData
                data-test="stakeconfirm-coin-data-source"
                asset={source}
                assetValue={runeAmount}
                price={Pr * runeAmount}
                priceUnit={basePriceAsset}
              />
              <CoinData
                data-test="stakeconfirm-coin-data-target"
                asset={target}
                assetValue={tokenAmount}
                price={tokenPrice * tokenAmount}
                priceUnit={basePriceAsset}
              />
            </div>
          </div>
        </Row>
        <Row className="modal-info-wrapper">
          {completed && (
            <div className="hash-address">
              <div className="copy-btn-wrapper">
                <Link to="/pools">
                  <Button className="view-btn" color="success">
                    FINISH
                  </Button>
                </Link>
                <a href={txURL} target="_blank" rel="noopener noreferrer">
                  VIEW TRANSACTION
                </a>
              </div>
            </div>
          )}
        </Row>
      </ConfirmModalContent>
    );
  };

  renderWithdrawModalContent = (txSent, completed) => {
    const {
      txStatus: { status, value, startTime, hash },
      symbol,
      priceIndex,
      basePriceAsset,
    } = this.props;

    const source = 'rune';
    const target = getTickerFormat(symbol);

    const runePrice = priceIndex.RUNE;
    const tokenPrice = _get(priceIndex, target.toUpperCase(), 0);
    const txURL = TESTNET_TX_BASE_URL + hash;
    const { runeValue, tokenValue } = this.withdrawData;

    return (
      <ConfirmModalContent>
        <Row className="modal-content">
          <div className="timer-container">
            <TxTimer
              status={status}
              value={value}
              maxValue={MAX_VALUE}
              startTime={startTime}
              onChange={this.handleChangeTxValue}
              onEnd={this.handleEndTxTimer}
            />
          </div>
          <div className="coin-data-wrapper">
            <StepBar size={50} />
            <div className="coin-data-container">
              <CoinData
                asset={source}
                assetValue={runeValue}
                price={runePrice * runeValue}
                priceUnit={basePriceAsset}
              />
              <CoinData
                asset={target}
                assetValue={tokenValue}
                price={tokenPrice * tokenValue}
                priceUnit={basePriceAsset}
              />
            </div>
          </div>
        </Row>
        <Row className="modal-info-wrapper">
          {txSent && (
            <div className="hash-address">
              <div className="copy-btn-wrapper">
                {completed && (
                  <Link to="/pools">
                    <Button className="view-btn" color="success">
                      FINISH
                    </Button>
                  </Link>
                )}
                <a href={txURL} target="_blank" rel="noopener noreferrer">
                  VIEW TRANSACTION
                </a>
              </div>
            </div>
          )}
        </Row>
      </ConfirmModalContent>
    );
  };

  renderStakeInfo = poolStats => {
    const { symbol, basePriceAsset } = this.props;
    const source = 'rune';
    const target = getTickerFormat(symbol);
    const loading = this.isLoading();

    const {
      depth,
      volume24,
      volumeAT,
      totalSwaps,
      totalStakers,
      roiAT,
      liqFee,
    } = poolStats;

    const attrs = [
      {
        key: 'depth',
        title: 'Depth',
        value: `${basePriceAsset} ${getUserFormat(depth).toLocaleString()}`,
      },
      {
        key: 'vol24',
        title: '24hr Volume',
        value: `${basePriceAsset} ${getUserFormat(volume24)}`,
      },
      {
        key: 'volAT',
        title: 'All Time Volume',
        value: `${basePriceAsset} ${getUserFormat(volumeAT)}`,
      },
      { key: 'swap', title: 'Total Swaps', value: totalSwaps },
      { key: 'stakers', title: 'Total Stakers', value: totalStakers },
      {
        key: 'roi',
        title: 'All Time RoI',
        value: `${getUserFormat(roiAT)}% pa`,
      },
    ];

    return attrs.map(info => {
      const { title, value, key } = info;

      return (
        <Col className="token-info-card" key={key} xs={12} sm={8} md={6} lg={4}>
          <TokenInfo
            asset={source}
            target={target}
            value={value}
            label={title}
<<<<<<< HEAD
            trend={getFixedNumber(getUserFormat(liqFee))}
=======
            trend={getFixedNumber(liqFee)}
>>>>>>> origin/master
            loading={loading}
          />
        </Col>
      );
    });
  };

  renderShareDetail = (poolStats, calcResult, stakeData) => {
    const { symbol, priceIndex, basePriceAsset, assets } = this.props;
    const {
      runeAmount,
      tokenAmount,
      runePercent,
      tokenPercent,
      balance,
      widthdrawPercentage,
      dragReset,
      advancedMode,
    } = this.state;

    const source = 'rune';
    const target = getTickerFormat(symbol);

    const runePrice = priceIndex.RUNE;
    const tokenPrice = _get(priceIndex, target.toUpperCase(), 0);

    const tokensData = Object.keys(assets).map(tokenName => {
      const tokenData = assets[tokenName];
      const symbol = _get(tokenData, 'asset.symbol', null);
      const price = _get(tokenData, 'priceRune', 0);

      return {
        asset: symbol,
        price,
      };
    });

    const stakeInfo = (stakeData && stakeData[symbol]) || {
      stakeUnits: 0,
      runeStaked: 0,
      assetStaked: 0,
    };

    const { depth } = poolStats;
    const {
      R,
      T,
      poolUnits,
      poolPrice,
      newPrice,
      newDepth,
      share,
    } = calcResult;

    const poolAttrs = [
      {
        key: 'price',
        title: 'Pool Price',
        value: `${basePriceAsset} ${poolPrice}`,
      },
      {
        key: 'depth',
        title: 'Pool Depth',
        value: `${basePriceAsset} ${getUserFormat(depth * runePrice)}`,
      },
    ];

    const newPoolAttrs = [
      {
        key: 'price',
        title: 'New Price',
        value: `${basePriceAsset} ${newPrice}`,
      },
      {
        key: 'depth',
        title: 'New Depth',
        value: `${basePriceAsset} ${getUserFormat(newDepth)}`,
      },
      { key: 'share', title: 'Your Share', value: `${share}%` },
    ];

    // withdraw values
    const withdrawRate = (widthdrawPercentage || 50) / 100;
    const { stakeUnits } = stakeInfo;
    const runeValue = getUserFormat(
      ((withdrawRate * stakeUnits) / poolUnits) * R,
    );
    const tokenValue = getUserFormat(
      ((withdrawRate * stakeUnits) / poolUnits) * T,
    );
    this.withdrawData = {
      runeValue,
      tokenValue,
      tokenPrice,
      percentage: widthdrawPercentage,
    };

    const disableWithdraw = stakeUnits === 0;

    return (
      <div className="share-detail-wrapper">
        <Button
          className="advanced-mode-btn"
          typevalue="outline"
          focused={advancedMode}
          onClick={this.handleSwitchAdvancedMode}
        >
          advanced
        </Button>
        <Tabs withBorder>
          <TabPane tab="add" key="add">
            <Row>
              <Col span={24} lg={12}>
                <Label className="label-description" size="normal">
                  Select the maximum deposit to stake.
                </Label>
                <Label className="label-no-padding" size="normal">
                  Note: Pools always have RUNE as the base asset.
                </Label>
              </Col>
            </Row>
            <div className="stake-card-wrapper">
              <div className="coin-card-wrapper">
                <CoinCard
                  inputProps={{ 'data-test': 'stake-coin-input-rune' }}
                  data-test="coin-card-stake-coin-rune"
                  asset={source}
                  amount={runeAmount}
                  price={runePrice}
                  priceIndex={priceIndex}
                  unit={basePriceAsset}
                  onChange={this.handleChangeTokenAmount('rune')}
                />
                <Slider
                  value={runePercent}
                  onChange={this.handleChangePercent('rune')}
                  withLabel
                />
              </div>
              <div className="coin-card-wrapper">
                <CoinCard
                  inputProps={{
                    'data-test': 'stake-coin-input-target',
                  }}
                  data-test="coin-card-stake-coin-target"
                  asset={target}
                  assetData={tokensData}
                  amount={tokenAmount}
                  price={tokenPrice}
                  priceIndex={priceIndex}
                  unit={basePriceAsset}
                  onChangeAsset={this.handleSelectTraget}
                  onChange={this.handleChangeTokenAmount(target)}
                  withSearch
                />
                {advancedMode && (
                  <Slider
                    value={tokenPercent}
                    onChange={this.handleChangePercent(target)}
                    withLabel
                  />
                )}
              </div>
            </div>
            {advancedMode && (
              <>
                <Label className="label-title" size="normal" weight="bold">
                  ADJUST BALANCE
                </Label>
                <Label size="normal">
                  Fine tune balances to ensure you stake on both sides with the
                  correct amount.
                </Label>
                <Slider
                  onChange={this.handleChangeBalance}
                  value={balance}
                  min={0}
                  max={200}
                  tooltipVisible={false}
                />
              </>
            )}
            <div className="stake-share-info-wrapper">
              {advancedMode && (
                <div className="pool-status-wrapper">
                  {poolAttrs.map(info => {
                    return <Status className="share-info-status" {...info} />;
                  })}
                </div>
              )}
              <div className="share-status-wrapper">
                {advancedMode && (
                  <div className="info-status-wrapper">
                    {newPoolAttrs.map(info => {
                      return <Status className="share-info-status" {...info} />;
                    })}
                  </div>
                )}
                <Drag
                  title="Drag to stake"
                  source="blue"
                  target="confirm"
                  reset={dragReset}
                  onConfirm={this.handleStake}
                  onDrag={this.handleDrag}
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Withdraw" key="withdraw" disabled={disableWithdraw}>
            <Label className="label-title" size="normal" weight="bold">
              ADJUST WITHDRAWAL
            </Label>
            <Label size="normal">
              Choose from 0 to 100% of how much to withdraw.
            </Label>
            <div className="withdraw-percent-view">
              <Label size="large" color="gray" weight="bold">
                0%
              </Label>
              <Label size="large" color="gray" weight="bold">
                50%
              </Label>
              <Label size="large" color="gray" weight="bold">
                100%
              </Label>
            </div>
            <Slider
              onChange={e => {
                this.setState({ widthdrawPercentage: e });
              }}
              defaultValue={50}
              max={100}
              min={1}
            />
            <div className="stake-withdraw-info-wrapper">
              <Label className="label-title" size="normal" weight="bold">
                YOU SHOULD RECEIVE
              </Label>
              <div className="withdraw-status-wrapper">
                <div className="withdraw-asset-wrapper">
                  <CoinData
                    asset={source}
                    assetValue={runeValue}
                    price={runeValue * runePrice}
                    priceUnit={basePriceAsset}
                  />
                  <CoinData
                    asset={target}
                    assetValue={tokenValue}
                    price={tokenValue * tokenPrice}
                    priceUnit={basePriceAsset}
                  />
                </div>
              </div>
              <div className="drag-container">
                <Drag
                  title="Drag to withdraw"
                  source="blue"
                  target="confirm"
                  reset={dragReset}
                  onConfirm={this.handleWithdraw}
                  onDrag={this.handleDrag}
                />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  };

<<<<<<< HEAD
  renderYourShare = (calcResult, stakeData) => {
    const { symbol, user, priceIndex, basePriceAsset } = this.props;

    const wallet = user ? user.wallet : null;
    const hasWallet = wallet !== null;

    const stakeInfo = (stakeData && stakeData[symbol]) || {
      stakeUnits: 0,
=======
  renderYourShare = (poolStats, calcResult, stakeData) => {
    const {
      symbol,
      user: { wallet },
      priceIndex,
      basePriceAsset,
    } = this.props;

    const stakeInfo = (stakeData && stakeData[symbol]) || {
      stakeUnits: -1,
>>>>>>> origin/master
      runeEarned: 0,
      assetEarned: 0,
    };

    const { poolUnits, R, T } = calcResult;
    const source = 'rune';
    const target = getTickerFormat(symbol);

    const runePrice = priceIndex.RUNE;
    const tokenPrice = _get(priceIndex, target.toUpperCase(), 0);

    const { stakeUnits } = stakeInfo;
    const loading = this.isLoading() || poolUnits === undefined;

    const poolShare = ((stakeUnits / Number(poolUnits)) * 100).toFixed(2);
    const runeShare = getUserFormat((R * stakeUnits) / poolUnits);
    const tokensShare = getUserFormat((T * stakeUnits) / poolUnits);
    const runeEarned = getUserFormat(stakeInfo.runeEarned);
    const assetEarned = getUserFormat(stakeInfo.assetEarned);
<<<<<<< HEAD
    const connected = hasWallet;
=======
    const connected = !!wallet;
>>>>>>> origin/master

    return (
      <>
        <div className="your-share-wrapper">
<<<<<<< HEAD
          {!hasWallet && (
=======
          {!wallet && (
>>>>>>> origin/master
            <Label className="label-title" size="normal">
              YOUR SHARE
            </Label>
          )}
<<<<<<< HEAD
          {!hasWallet && (
=======
          {!wallet && (
>>>>>>> origin/master
            <div className="share-placeholder-wrapper">
              <div className="placeholder-icon">
                <Icon type="switcher" />
              </div>
              <Label className="placeholder-label">
                Please connect your wallet.
              </Label>
              <Link to="/connect">
                <WalletButton connected={connected} value={wallet} />
              </Link>
            </div>
          )}
<<<<<<< HEAD
          {hasWallet && stakeUnits === 0 && (
=======
          {wallet && stakeUnits === 0 && (
>>>>>>> origin/master
            <div className="share-placeholder-wrapper">
              <div className="placeholder-icon">
                <Icon type="inbox" />
              </div>
              <Label className="placeholder-label">
                You don't have any shares in this pool.
              </Label>
            </div>
          )}
<<<<<<< HEAD
          {((hasWallet && stakeUnits > 0) || loading) && (
=======
          {((wallet && stakeUnits > 0) || loading) && (
>>>>>>> origin/master
            <>
              <Label className="share-info-title" size="normal">
                Your total share of the pool
              </Label>
              <div className="your-share-info-wrapper">
                <div className="share-info-row">
                  <div className="your-share-info">
                    <Status
                      title={String(source).toUpperCase()}
                      value={runeShare}
                      loading={loading}
                    />
                    <Label
                      className="your-share-price-label"
                      size="normal"
                      color="gray"
                      loading={loading}
                    >
                      {basePriceAsset} {(runeShare * runePrice).toFixed(2)}
                    </Label>
                  </div>
                  <div className="your-share-info">
                    <Status
                      title={String(target).toUpperCase()}
                      value={tokensShare}
                      loading={loading}
                    />
                    <Label
                      className="your-share-price-label"
                      size="normal"
<<<<<<< HEAD
                      color="gray"
=======
                      color="grey"
>>>>>>> origin/master
                      loading={loading}
                    >
                      {basePriceAsset} {(tokensShare * tokenPrice).toFixed(2)}
                    </Label>
                  </div>
                </div>
                <div className="share-info-row">
                  <div className="your-share-info pool-share-info">
                    <Status
                      title="Pool Share"
                      value={`${poolShare}%`}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
<<<<<<< HEAD
              {!hasWallet && (
=======
              {!wallet && (
>>>>>>> origin/master
                <Label
                  className="label-title earning-label"
                  size="normal"
                  weight="bold"
                >
                  EARNINGS
                </Label>
              )}
            </>
          )}
        </div>
<<<<<<< HEAD
        {((hasWallet && stakeUnits > 0) || loading) && (
=======
        {((wallet && stakeUnits > 0) || loading) && (
>>>>>>> origin/master
          <div className="your-share-wrapper">
            <Label className="share-info-title" size="normal">
              Your total earnings from the pool
            </Label>
            <div className="your-share-info-wrapper">
              <div className="share-info-row">
                <div className="your-share-info">
                  <Status
                    title={String(source).toUpperCase()}
                    value={runeEarned}
                    loading={loading}
                  />
                  <Label
                    className="your-share-price-label"
                    size="normal"
                    color="gray"
                    loading={loading}
                  >
                    {basePriceAsset} {(runeEarned * runePrice).toFixed(2)}
                  </Label>
                </div>
                <div className="your-share-info">
                  <Status
                    title={String(target).toUpperCase()}
                    value={assetEarned}
                    loading={loading}
                  />
                  <Label
                    className="your-share-price-label"
                    size="normal"
                    color="gray"
                    loading={loading}
                  >
                    {basePriceAsset} {(assetEarned * tokenPrice).toFixed(2)}
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  render() {
    const {
      priceIndex,
      basePriceAsset,
      poolData,
      poolAddress,
      stakerPoolData,
      txStatus,
<<<<<<< HEAD
      user,
=======
      user: { wallet },
>>>>>>> origin/master
    } = this.props;
    const {
      runeAmount,
      tokenAmount,
      openPrivateModal,
      openWalletAlert,
      password,
      invalidPassword,
      txResult,
      validatingPassword,
    } = this.state;

<<<<<<< HEAD
    const wallet = user ? user.wallet : null;
    const hasWallet = wallet !== null;

=======
>>>>>>> origin/master
    let { symbol } = this.props;
    symbol = symbol.toUpperCase();
    const runePrice = priceIndex.RUNE;
    const poolInfo = poolData[symbol] || {};

    const poolStats = getPoolData('rune', poolInfo, priceIndex, basePriceAsset);

    const calcResult = getCalcResult(
      symbol,
      poolData,
      poolAddress,
      runeAmount,
      runePrice,
      tokenAmount,
    );

    const openStakeModal = txStatus.type === 'stake' ? txStatus.modal : false;
    const openWithdrawModal =
      txStatus.type === 'withdraw' ? txStatus.modal : false;
    const coinCloseIconType = txStatus.status ? 'fullscreen-exit' : 'close';

<<<<<<< HEAD
    const yourShareSpan = hasWallet ? 8 : 24;
=======
    const yourShareSpan = wallet ? 8 : 24;
>>>>>>> origin/master

    // stake confirmation modal

    const txSent = txStatus.hash !== undefined;

    // TODO(veado): Completed depending on `txStatus.type`, too (no txResult for `stake` atm)
    const completed =
      txStatus.type === 'stake'
        ? txSent && !txStatus.status
        : txResult && !txStatus.status;
    const stakeTitle = !completed ? 'YOU ARE STAKING' : 'YOU STAKED';

    // withdraw confirmation modal

    const withdrawText = !completed ? 'YOU ARE WITHDRAWING' : 'YOU WITHDRAWN';

    return (
      <ContentWrapper className="pool-stake-wrapper" transparent>
        <Row className="stake-info-view">{this.renderStakeInfo(poolStats)}</Row>
        <Row className="share-view">
          <Col className="your-share-view" span={24} lg={yourShareSpan}>
<<<<<<< HEAD
            {this.renderYourShare(calcResult, stakerPoolData)}
          </Col>
          {hasWallet && (
=======
            {this.renderYourShare(poolStats, calcResult, stakerPoolData)}
          </Col>
          {wallet && (
>>>>>>> origin/master
            <Col className="share-detail-view" span={24} lg={16}>
              {this.renderShareDetail(poolStats, calcResult, stakerPoolData)}
            </Col>
          )}
        </Row>
<<<<<<< HEAD
        {hasWallet && (
=======
        {wallet && (
>>>>>>> origin/master
          <>
            <ConfirmModal
              title={withdrawText}
              closeIcon={
                <Icon type={coinCloseIconType} style={{ color: '#33CCFF' }} />
              }
              visible={openWithdrawModal}
              footer={null}
              onCancel={this.handleCloseModal}
            >
              {this.renderWithdrawModalContent(txSent, completed)}
            </ConfirmModal>
            <ConfirmModal
              title={stakeTitle}
              closeIcon={
                <Icon type={coinCloseIconType} style={{ color: '#33CCFF' }} />
              }
              visible={openStakeModal}
              footer={null}
              onCancel={this.handleCloseModal}
            >
              {this.renderStakeModalContent(completed)}
            </ConfirmModal>
<<<<<<< HEAD
            <PrivateModal
              visible={openPrivateModal}
              validatingPassword={validatingPassword}
              invalidPassword={invalidPassword}
              password={password}
              onChangePassword={this.handleChangePassword}
              onOk={this.handleConfirmPassword}
              onCancel={this.handleCancelPrivateModal}
            />
=======

            <PrivateModal
              title="PASSWORD CONFIRMATION"
              visible={openPrivateModal}
              onOk={
                !validatingPassword ? this.handleConfirmPassword : undefined
              }
              onCancel={this.handleCancelPrivateModal}
              maskClosable={false}
              closable={false}
              okText="CONFIRM"
              cancelText="CANCEL"
            >
              <Form onSubmit={this.handleConfirmPassword} autoComplete="off">
                <Form.Item
                  className={invalidPassword ? 'has-error' : emptyString}
                  extra={validatingPassword ? 'Validating password ...' : ''}
                >
                  <Input
                    data-test="password-confirmation-input"
                    type="password"
                    typevalue="ghost"
                    sizevalue="big"
                    value={password}
                    onChange={this.handleChangePassword}
                    prefix={<Icon type="lock" />}
                    autoComplete="off"
                  />
                  {invalidPassword && (
                    <div className="ant-form-explain">Password is wrong!</div>
                  )}
                </Form.Item>
              </Form>
            </PrivateModal>
>>>>>>> origin/master
            <Modal
              title="PLEASE ADD WALLET"
              visible={openWalletAlert}
              onOk={this.handleConnectWallet}
              onCancel={this.hideWalletAlert}
              okText="ADD WALLET"
            >
              Please add a wallet to stake.
            </Modal>
          </>
        )}
      </ContentWrapper>
    );
  }
}

PoolStake.propTypes = {
  symbol: PropTypes.string.isRequired,
  txStatus: PropTypes.object.isRequired,
  assetData: PropTypes.array.isRequired,
  pools: PropTypes.array.isRequired,
<<<<<<< HEAD
  poolAddress: PropTypes.string,
=======
  poolAddress: PropTypes.string.isRequired,
>>>>>>> origin/master
  poolData: PropTypes.object.isRequired,
  basePriceAsset: PropTypes.string.isRequired,
  priceIndex: PropTypes.object.isRequired,
  stakerPoolData: PropTypes.object.isRequired,
  assets: PropTypes.object.isRequired,
<<<<<<< HEAD
  user: PropTypes.object, // Maybe<User>
=======
  user: PropTypes.object.isRequired,
>>>>>>> origin/master
  wsTransfers: PropTypes.array.isRequired,
  setTxTimerModal: PropTypes.func.isRequired,
  setTxTimerStatus: PropTypes.func.isRequired,
  countTxTimerValue: PropTypes.func.isRequired,
  setTxTimerValue: PropTypes.func.isRequired,
  setTxHash: PropTypes.func.isRequired,
  resetTxStatus: PropTypes.func.isRequired,
  history: PropTypes.object,
  info: PropTypes.object,
  getStakerPoolData: PropTypes.func.isRequired,
  getPools: PropTypes.func.isRequired,
  getPoolAddress: PropTypes.func.isRequired,
  refreshStake: PropTypes.func.isRequired,
  poolLoading: PropTypes.bool.isRequired,
  stakerPoolDataLoading: PropTypes.bool.isRequired,
};

export default compose(
  connect(
    state => ({
      txStatus: state.App.txStatus,
      user: state.Wallet.user,
      assetData: state.Wallet.assetData,
      pools: state.Midgard.pools,
      poolAddress: state.Midgard.poolAddress,
      poolData: state.Midgard.poolData,
      assets: state.Midgard.assets,
      stakerPoolData: state.Midgard.stakerPoolData,
      priceIndex: state.Midgard.priceIndex,
      basePriceAsset: state.Midgard.basePriceAsset,
      poolLoading: state.Midgard.poolLoading,
      stakerPoolDataLoading: state.Midgard.stakerPoolDataLoading,
    }),
    {
<<<<<<< HEAD
      getPools: midgardActions.getPools,
      getPoolAddress: midgardActions.getPoolAddress,
      getStakerPoolData: midgardActions.getStakerPoolData,
=======
      getPools,
      getPoolAddress,
      getStakerPoolData,
>>>>>>> origin/master
      setTxTimerModal,
      setTxTimerStatus,
      countTxTimerValue,
      setTxTimerValue,
      setTxHash,
      resetTxStatus,
<<<<<<< HEAD
      refreshStake: walletActions.refreshStake,
=======
      refreshStake,
>>>>>>> origin/master
    },
  ),
  withRouter,
  withBinanceTransferWS,
)(PoolStake);
