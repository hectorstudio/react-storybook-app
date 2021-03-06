import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';
import PropTypes from 'prop-types';

import { ContentWrapper } from './Trade.style';
import Centered from '../../../../components/utility/centered';
import Label from '../../../../components/uielements/label';
import Button from '../../../../components/uielements/button';
import TooltipIcon from '../../../../components/uielements/tooltipIcon';
import CoinInput from '../../../../components/uielements/coins/coinInput';
import InputForm from '../../../../components/uielements/inputForm';

import {
  orbGreenIcon,
  arrowYellowIcon,
  arrowGreenIcon,
  marketIcon,
} from '../../../../components/icons';

import { formatNumber, formatCurrency } from '../../../../helpers/formatHelper';
import { data, getVx, getPy, getGain, getYValue, getY, getDelta } from './data';
import Slider from '../../../../components/uielements/slider';

const { X, Y, Px, xm } = data;

class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: 0,
    };
  }

  handleChangeValue = name => value => {
    this.setState({
      [name]: value,
    });
  };

  renderFlow = view => {
    const { xValue } = this.state;
    const yValue = getY(xValue);
    const Vx = formatCurrency(getVx(xValue));
    const Vy = Vx;
    const Py = formatCurrency(getPy(xValue));

    return (
      <div className="trade-flow-wrapper">
        <Centered>
          <Label size="large" color="normal" weight="bold">
            RUNE
          </Label>
          <Label size="large" color="normal" weight="bold">
            :
          </Label>
          <Label size="large" color="normal" weight="bold">
            BEP2
          </Label>
        </Centered>
        <Label
          className="header-label"
          size="normal"
          color="normal"
          weight="bold"
        >
          POOL
        </Label>
        <div className="trade-flow-diagram">
          <img src={arrowGreenIcon} alt="arrow-green" />
          <img src={orbGreenIcon} alt="orb-green" />
          <img src={arrowYellowIcon} alt="arrow-yello" />
        </div>
        <Centered>
          <Label size="large" color="normal" weight="bold">
            {view === 'tradingintro' && formatNumber(X)}
            {view === 'tradingplay' && formatNumber(X + xValue)}
          </Label>
          <Label size="large" color="normal" weight="bold">
            :
          </Label>
          <Label size="large" color="normal" weight="bold">
            {view === 'tradingintro' && formatNumber(Y)}
            {view === 'tradingplay' && formatNumber(Y - yValue)}
          </Label>
        </Centered>
        <Centered>
          <Label size="large" color="normal">
            {Vx}
          </Label>
          <Label size="large" color="normal" />
          <Label size="large" color="normal">
            {Vy}
          </Label>
        </Centered>
        <Centered>
          <Label size="large" color="normal">
            {formatCurrency(Px)}
          </Label>
          <Label size="large" color="normal" />
          <Label size="large" color="normal">
            {view === 'tradingintro' && formatCurrency(Px)}
            {view === 'tradingplay' && Py}
          </Label>
        </Centered>
        <Centered>
          <Label size="normal" color="normal">
            RUNE Price
            <br />
            (external)
          </Label>
          <Label size="normal" color="normal" />
          <Label size="normal" color="normal">
            BEP2 Price
            <br />
            (pool)
          </Label>
        </Centered>
      </div>
    );
  };

  renderButtons = () => {
    const { view } = this.props;

    let URL = '';
    if (view === 'tradingintro') {
      URL = '/tutorial/pool/earningplay';
    }
    if (view === 'tradingplay') {
      URL = '/tutorial/trade/tradingintro';
    }

    return (
      <Row className="bottom-nav-button">
        <Link to={URL}>
          <Button color="primary" typevalue="ghost">
            back
          </Button>
        </Link>
        {view === 'tradingplay' && (
          <Link to="/tutorial">
            <Button color="primary" typevalue="outline">
              Finish
              <Icon type="arrow-right" />
            </Button>
          </Link>
        )}
      </Row>
    );
  };

  renderIntro = () => {
    return (
      <div className="trade-play-wrapper">
        <div className="trade-diagram">
          {this.renderFlow('tradingintro')}
          <div className="market-diagram-wrapper">
            <div className="trade-flow-diagram">
              <img src={marketIcon} alt="market" />
            </div>
            <div className="center-text with-tooltip">
              <Label size="large" color="normal" weight="bold">
                MARKET
              </Label>
              <TooltipIcon
                text="The market is any other exchange, like Binance DEX."
                placement="rightTop"
              />
            </div>
            <div className="center-text">
              <Label size="large" color="normal">
                Delta: 20%
              </Label>
            </div>
            <div className="center-text">
              <Label size="large" color="normal">
                {formatCurrency(xm)}
              </Label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderPlay = () => {
    const { xValue } = this.state;
    const yValue = getY(xValue).toFixed(2);
    const yTotal = formatCurrency(getYValue(xValue));
    const gain = formatCurrency(getGain(xValue));
    const delta = `${getDelta(xValue)}%`;

    return (
      <div className="trade-play-wrapper">
        <div className="token-wrapper">
          <CoinInput
            title="Select token to trade:"
            asset="rune"
            amount={xValue}
            onChange={this.handleChangeValue('xValue')}
            price={Px}
            step={1000}
          />
          <Slider
            min={0}
            max={100000}
            step={10}
            value={xValue}
            onChange={this.handleChangeValue('xValue')}
          />
          <TooltipIcon
            text="Adjust your trade to meet your expectations of price."
            placement="rightTop"
          />
        </div>
        <div className="trade-diagram">
          {this.renderFlow('tradingplay')}
          <div className="market-diagram-wrapper">
            <div className="trade-flow-diagram">
              <img src={marketIcon} alt="market" />
            </div>
            <div className="center-text with-tooltip">
              <Label size="large" color="normal" weight="bold">
                MARKET
              </Label>
              <TooltipIcon
                text="The market is any other exchange, like Binance DEX."
                placement="rightTop"
              />
            </div>
            <div className="center-text">
              <Label size="large" color="normal">
                Delta: {delta}
              </Label>
            </div>
            <div className="center-text">
              <Label size="large" color="normal">
                {formatCurrency(xm)}
              </Label>
            </div>
          </div>
        </div>
        <div className="token-wrapper">
          <InputForm
            title="PAYOUT:"
            type="bep2"
            value={yValue}
            onChange={this.handleChangeValue('yValue')}
            reverse
          />
          <Label className="payout-price-label" color="gray">
            {yTotal} (USD)
          </Label>
          <Label size="big" weight="bold">
            GAIN: {gain}
          </Label>
          <TooltipIcon
            text="The gain is dependent on the size of your trade and slip."
            placement="rightTop"
          />
        </div>
      </div>
    );
  };

  render() {
    const { view } = this.props;

    return (
      <ContentWrapper className="tutorial-swap-wrapper">
        <Row>
          <Col span="4" className="intro-text">
            <Label size="normal" weight="bold" color="normal">
              TRADING
            </Label>
            <Label size="small" color="dark">
              Pool prices are always calculated based on the ratio of assets in
              the pool.
            </Label>
            <Label size="small" color="dark">
              Assets are always priced against the BNB in the pool.
            </Label>
            <Label size="small" color="dark">
              Pool prices change when people swap assets, or when the wider
              market price moves.
            </Label>
            {view === 'tradingintro' && (
              <Link to="/tutorial/trade/tradingplay">
                <Button className="try-btn" typevalue="outline">
                  try
                </Button>
              </Link>
            )}
            {view === 'tradingplay' && (
              <>
                <Label size="small" color="dark">
                  If the <strong>POOL PRICE</strong> is different to{' '}
                  <strong>MARKET PRICE</strong> - this is your opportunity to
                  trade.
                </Label>
                <Label size="small" color="dark">
                  You can buy cheap assets at a <strong>DISCOUNT</strong> or
                  sell them at a <strong>PREMIUM</strong> to the market.
                </Label>
                <Label size="small" color="dark">
                  The first to trade wins the opportunity.
                </Label>
              </>
            )}
          </Col>
          <Col span="20" className="tutorial-content">
            <Row className="tutorial-flow">
              {view === 'tradingintro' && this.renderIntro()}
              {view === 'tradingplay' && this.renderPlay()}
            </Row>
            {this.renderButtons()}
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

Trade.propTypes = {
  view: PropTypes.string,
  history: PropTypes.object,
};

Trade.defaultProps = {
  view: 'intro',
};

export default withRouter(Trade);
