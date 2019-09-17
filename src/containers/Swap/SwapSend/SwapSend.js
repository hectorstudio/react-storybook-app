import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Form } from 'antd';
import { crypto } from '@binance-chain/javascript-sdk';
import copy from 'copy-to-clipboard';

import Binance from '../../../clients/binance';

import Button from '../../../components/uielements/button';
import Drag from '../../../components/uielements/drag';
import CoinCard from '../../../components/uielements/coins/coinCard';
import CoinList from '../../../components/uielements/coins/coinList';
import Label from '../../../components/uielements/label';
import Input from '../../../components/uielements/input/input';
import CoinData from '../../../components/uielements/coins/coinData';
import Status from '../../../components/uielements/status';
import TxTimer from '../../../components/uielements/txTimer';
import Modal from '../../../components/uielements/modal';

import {
  ContentWrapper,
  SwapModalContent,
  SwapModal,
  SwapAssetCard,
  ArrowContainer,
  ArrowImage,
  PrivateModal,
} from './SwapSend.style';
import { blackArrowIcon } from '../../../components/icons';
import { getCalcResult, confirmSwap } from '../utils';

import appActions from '../../../redux/app/actions';
import chainActions from '../../../redux/chainservice/actions';
import statechainActions from '../../../redux/statechain/actions';

const {
  setTxTimerType,
  setTxTimerModal,
  setTxTimerStatus,
  setTxTimerValue,
  resetTxStatus,
} = appActions;

const { getTokens } = chainActions;
const { getPools } = statechainActions;

class SwapSend extends Component {
  static propTypes = {
    info: PropTypes.string,
    view: PropTypes.string.isRequired,
    history: PropTypes.object,
    txStatus: PropTypes.object.isRequired,
    chainData: PropTypes.object.isRequired,
    assetData: PropTypes.array.isRequired,
    pools: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    setTxTimerType: PropTypes.func.isRequired,
    setTxTimerModal: PropTypes.func.isRequired,
    setTxTimerStatus: PropTypes.func.isRequired,
    setTxTimerValue: PropTypes.func.isRequired,
    resetTxStatus: PropTypes.func.isRequired,
    getTokens: PropTypes.func.isRequired,
    getPools: PropTypes.func.isRequired,
  };

  static defaultProps = {
    info: '',
  };

  state = {
    address: '',
    invalidAddress: false,
    dragReset: true,
    xValue: 0,
    openPrivateModal: false,
    password: '',
    invalidPassword: false,
    openWalletAlert: false,
  };

  addressRef = React.createRef();

  componentDidMount() {
    const { getTokens, getPools } = this.props;

    getTokens();
    getPools();
  }

  isValidRecipient = () => {
    const { address } = this.state;

    return Binance.isValidAddress(address);
  };

  handleChange = key => e => {
    this.setState({
      [key]: e.target.value,
      invalidAddress: false,
      invalidPassword: false,
    });
  };

  handleChangeValue = value => {
    const { xValue } = this.state;
    const newValue = isNaN(value) ? xValue : Number(value);

    this.setState({
      xValue: newValue,
    });
  };

  handleChangeSource = asset => {
    const { view } = this.props;
    const { target } = this.getSwapData();
    const source = asset.split('-')[0].toLowerCase();

    if (source === target) {
      return;
    }

    const URL = `/swap/${view}/${source}-${target}`;

    this.props.history.push(URL);
  };

  handleConfirmPassword = async () => {
    const {
      user: { keystore, wallet },
    } = this.props;
    const { password } = this.state;

    try {
      const privateKey = crypto.getPrivateKeyFromKeyStore(keystore, password);
      const address = crypto.getAddressFromPrivateKey(
        privateKey,
        Binance.getPrefix(),
      );
      if (wallet === address) {
        await Binance.setPrivateKey(privateKey);
        await this.handleConfirmSwap();
        this.handleStartTimer();
      }

      this.setState({
        openPrivateModal: false,
      });
    } catch (error) {
      this.setState({
        password: '',
        invalidPassword: true,
      });
      console.log(error); // eslint-disable-line no-console
    }
  };

  handleOpenPrivateModal = () => {
    this.setState({
      openPrivateModal: true,
    });
  };

  handleClosePrivateModal = () => {
    this.setState({
      openPrivateModal: false,
      dragReset: true,
    });
  };

  handleDrag = () => {
    this.setState({
      dragReset: false,
    });
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

  handleEndDrag = () => {
    const {
      view,
      user: { keystore, wallet },
    } = this.props;

    if (!wallet) {
      this.setState({
        openWalletAlert: true,
      });
      return;
    }

    if (view === 'send' && !this.isValidRecipient()) {
      this.setState({
        invalidAddress: true,
        dragReset: true,
      });
      return;
    }

    if (keystore) {
      this.handleOpenPrivateModal();
    } else if (wallet) {
      this.handleStartTimer();
    } else {
      this.setState({
        invalidAddress: true,
        dragReset: true,
      });
    }
  };

  handleStartTimer = () => {
    const { setTxTimerModal, setTxTimerType, setTxTimerStatus } = this.props;

    setTxTimerType('swap');
    setTxTimerModal(true);
    setTxTimerStatus(true);
  };

  handleCloseModal = () => {
    const {
      txStatus: { status },
      setTxTimerModal,
      resetTxStatus,
    } = this.props;

    if (!status) resetTxStatus();
    else setTxTimerModal(false);
  };

  handleGotoDetail = () => {
    const { info } = this.props;
    const URL = `/swap/detail/${info}`;

    this.props.history.push(URL);
  };

  handleGotoSend = () => {
    const { info } = this.props;
    const URL = `/swap/send/${info}`;

    this.props.history.push(URL);
  };

  handleSelectTraget = assetsData => targetIndex => {
    const { view } = this.props;
    const { source } = this.getSwapData();
    const target = assetsData[targetIndex].asset.split('-')[0].toLowerCase();

    if (source === target) {
      return;
    }

    const URL = `/swap/${view}/${source}-${target}`;

    this.props.history.push(URL);
  };

  validatePair = (sourceInfo, targetInfo) => {
    if (!targetInfo.length) {
      this.props.history.push('/swap');
    }

    const { source, target } = this.getSwapData();

    let sourceValid = false;
    let targetValid = false;
    const targetData = targetInfo.filter(data => {
      const compare = data.asset.split('-')[0].toLowerCase() !== target;
      if (!compare) {
        targetValid = true;
      }

      return compare;
    });

    const sourceData = sourceInfo.filter(data => {
      const compare = data.asset.split('-')[0].toLowerCase() !== source;
      if (!compare) {
        sourceValid = true;
      }

      return compare;
    });

    if (!sourceValid || !targetValid) {
      this.props.history.push('/swap');
    }

    return {
      sourceData,
      targetData,
    };
  };

  getSwapData = () => {
    const { info } = this.props;

    if (info) {
      const source = info.split('-')[0];
      const target = info.split('-')[1];

      return {
        source,
        target,
      };
    }
    return {};
  };

  handleChangeTxValue = value => {
    const { setTxTimerValue } = this.props;

    setTxTimerValue(value);
  };

  handleEndTxTimer = () => {
    const {
      setTxTimerStatus,
      txStatus: { status },
    } = this.props;

    setTxTimerStatus(false);
    this.setState({
      dragReset: true,
    });
  };

  handleConfirmSwap = async () => {
    const {
      user: { wallet },
    } = this.props;
    const { xValue, address } = this.state;
    const { source, target } = this.getSwapData();

    try {
      const { result } = await confirmSwap(
        Binance,
        wallet,
        source,
        target,
        this.data,
        xValue,
        address,
      );
      this.hash = result[0].hash;
    } catch (error) {
      console.log(error);
    }
  };

  handleSelectAmount = source => amount => {
    const { assetData } = this.props;

    const sourceAsset = assetData.find(data => {
      const { asset } = data;
      const tokenName = asset.split('-')[0];
      if (tokenName.toLowerCase() === source) {
        return true;
      }
      return false;
    });

    const totalAmount = sourceAsset.assetValue || 0;
    const xValue = (totalAmount * amount) / 100;
    this.setState({
      xValue,
    });
  };

  renderSwapModalContent = (swapData, info) => {
    const {
      txStatus: { status, value },
    } = this.props;
    const { xValue } = this.state;
    const { source, target } = swapData;
    const { Px, slip, outputAmount, outputPrice } = info;
    const priceFrom = Number(Px * xValue);
    const priceTo = Number(outputAmount * outputPrice);
    const slipAmount = slip.toFixed(2);

    const transactionLabels = [
      'sending transaction',
      'processing transaction',
      'signing transaction',
      'finishing transaction',
      'complete',
    ];

    const completed = value !== null && !status;
    const swapText = !completed ? 'YOU ARE SWAPPING' : 'YOU SWAPPED';
    const receiveText = !completed ? 'YOU SHOULD RECEIVE' : 'YOU RECEIVED';
    const expectation = !completed
      ? 'EXPECTED FEES & SLIP'
      : 'FINAL FEES & SLIP';

    const testnetTxExlorer = 'https://testnet-explorer.binance.org/tx/';
    const hashString = this.hash
      ? this.hash.substr(0, 5) +
        '...' +
        this.hash.substr(this.hash.length - 6, 5)
      : '';
    const txURL = testnetTxExlorer + this.hash;
    const txString = testnetTxExlorer + hashString;

    return (
      <SwapModalContent>
        <Row className="swapmodal-content">
          <div className="left-container">
            <Label weight="bold">{swapText}</Label>
            <CoinData asset={source} assetValue={xValue} price={priceFrom} />
          </div>
          <div className="center-container">
            <TxTimer
              reset={status}
              value={value}
              onChange={this.handleChangeTxValue}
              onEnd={this.handleEndTxTimer}
            />
          </div>
          <div className="right-container">
            <Label weight="bold">{receiveText}</Label>
            <CoinData
              asset={target}
              assetValue={outputAmount}
              price={priceTo}
            />
            <Label weight="bold">{expectation}</Label>
            <div className="expected-status">
              <div className="status-item">
                <Status title="FEES" value="1 RUNE" />
                <Label className="price-label" size="normal" color="gray">
                  $USD 0.04
                </Label>
              </div>
              <div className="status-item">
                <Status title="SLIP" value={`${slipAmount}%`} />
              </div>
            </div>
          </div>
        </Row>
        <Row className="swap-info-wrapper">
          {this.hash && (
            <div className="hash-address">
              <div className="copy-btn-wrapper">
                <Icon type="copy" onClick={() => copy(txURL)} />
              </div>
              <Label>{txString}</Label>
            </div>
          )}
          {value !== 0 && (
            <Label className="tx-label" weight="bold">
              {transactionLabels[value - 1]}
            </Label>
          )}
          {completed && (
            <Label className="tx-label" weight="bold">
              complete
            </Label>
          )}
        </Row>
      </SwapModalContent>
    );
  };

  render() {
    const {
      view,
      txStatus,
      chainData: { tokenInfo },
      pools,
      assetData,
    } = this.props;
    const {
      dragReset,
      address,
      invalidAddress,
      invalidPassword,
      xValue,
      openPrivateModal,
      openWalletAlert,
      password,
    } = this.state;

    const swapData = this.getSwapData();

    if (!swapData || !Object.keys(tokenInfo).length) {
      return '';
    }

    const { source, target } = swapData;

    const tokensData = Object.keys(tokenInfo).map(tokenName => {
      const { symbol, price } = tokenInfo[tokenName];

      return {
        asset: symbol,
        price,
      };
    });

    const { sourceData, targetData } = this.validatePair(assetData, tokensData);

    console.log(targetData);
    const targetIndex = targetData.findIndex(
      value => value.asset.toLowerCase() === target,
    );

    const dragTitle =
      view === 'detail' ? 'Drag to swap' : 'Drag to swap and send';

    const openSwapModal = txStatus.type === 'swap' ? txStatus.modal : false;
    const coinCloseIconType = txStatus.status ? 'fullscreen-exit' : 'close';

    // calculation
    const runePrice = 0.04; // TODO: mock price = 0.04
    this.data = getCalcResult(source, target, pools, xValue, runePrice);
    const { Px, slip, outputAmount, outputPrice } = this.data;

    return (
      <ContentWrapper className="swap-detail-wrapper">
        <Row>
          <Col className="swap-detail-panel" lg={16} span={24}>
            <div className="swap-type-selector">
              <Button
                onClick={this.handleGotoDetail}
                sizevalue="big"
                typevalue="ghost"
                focused={view === 'detail'}
              >
                swap
              </Button>
              <Button
                onClick={this.handleGotoSend}
                sizevalue="big"
                typevalue="ghost"
                focused={view === 'send'}
              >
                swap & send
              </Button>
            </div>
            {view === 'send' && (
              <Form className="recipient-form">
                <Label weight="bold">Recipient Address:</Label>
                <Form.Item className={invalidAddress ? 'has-error' : ''}>
                  <Input
                    placeholder="bnbeh456..."
                    sizevalue="normal"
                    value={address}
                    onChange={this.handleChange('address')}
                    ref={this.addressRef}
                  />
                  {invalidAddress && (
                    <div className="ant-form-explain">
                      Recipient address is invalid!
                    </div>
                  )}
                </Form.Item>
              </Form>
            )}
            <SwapAssetCard>
              <CoinCard
                title="You are swapping"
                asset={source}
                assetData={sourceData}
                amount={xValue}
                price={Px}
                onChange={this.handleChangeValue}
                onChangeAsset={this.handleChangeSource}
                onSelect={this.handleSelectAmount(source)}
                withSelection
              />

              <ArrowContainer>
                <ArrowImage src={blackArrowIcon} alt="blackarrow-icon" />
              </ArrowContainer>

              <CoinCard
                title="You will receive"
                asset={target}
                amount={outputAmount}
                price={outputPrice}
                slip={slip}
                disabled
              />
            </SwapAssetCard>
            <div className="drag-confirm-wrapper">
              <Drag
                title={dragTitle}
                source={source}
                target={target}
                reset={dragReset}
                onConfirm={this.handleEndDrag}
                onDrag={this.handleDrag}
              />
            </div>
          </Col>
          <Col className="swap-token-panel" lg={8} span={24}>
            <Label className="select-token-label">
              Select token to receive
            </Label>
            <Input
              className="token-search-input"
              placeholder="Search Token ..."
              suffix={<Icon type="search" />}
            />
            <CoinList
              data={targetData}
              value={targetIndex}
              onSelect={this.handleSelectTraget(targetData)}
            />
          </Col>
        </Row>
        <SwapModal
          title="SWAP CONFIRMATION"
          closeIcon={
            <Icon type={coinCloseIconType} style={{ color: '#33CCFF' }} />
          }
          visible={openSwapModal}
          footer={null}
          onCancel={this.handleCloseModal}
        >
          {this.renderSwapModalContent(swapData, this.data)}
        </SwapModal>
        <PrivateModal
          title="PASSWORD CONFIRMATION"
          visible={openPrivateModal}
          onOk={this.handleConfirmPassword}
          onCancel={this.handleClosePrivateModal}
        >
          <Form.Item className={invalidPassword ? 'has-error' : ''}>
            <Input
              type="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Input password"
            />
            {invalidPassword && (
              <div className="ant-form-explain">Password is wrong!</div>
            )}
          </Form.Item>
        </PrivateModal>
        <Modal
          title="PLEASE ADD WALLET"
          visible={openWalletAlert}
          onOk={this.handleConnectWallet}
          onCancel={this.hideWalletAlert}
          okText="Add Wallet"
        >
          You should add wallet to swap token!
        </Modal>
      </ContentWrapper>
    );
  }
}

export default compose(
  connect(
    state => ({
      user: state.Wallet.user,
      txStatus: state.App.txStatus,
      chainData: state.ChainService,
      pools: state.Statechain.pools,
      assetData: state.Wallet.assetData,
    }),
    {
      getTokens,
      getPools,
      setTxTimerType,
      setTxTimerModal,
      setTxTimerStatus,
      setTxTimerValue,
      resetTxStatus,
    },
  ),
  withRouter,
)(SwapSend);
