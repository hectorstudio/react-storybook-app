import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';
import PropTypes from 'prop-types';

import { ContentWrapper } from './Stake.style';
import Centered from '../../../../components/utility/centered';
import Label from '../../../../components/uielements/label';
import Button from '../../../../components/uielements/button';
import TooltipIcon from '../../../../components/uielements/tooltipIcon';
import CoinInput from '../../../../components/uielements/coins/coinInput';

import { orbGreenIcon, arrowGreenIcon } from '../../../../components/icons';

import { formatNumber, formatCurrency } from '../../../../helpers/formatHelper';
import { data, getVr, getSS, getVss } from './data';

const { R, T, Pr, Pt } = data;

class Stake extends Component {
  static propTypes = {
    view: PropTypes.string,
    history: PropTypes.object,
  };

  static defaultProps = {
    view: 'intro',
  };

  state = {
    rValue: 0,
    tValue: 0,
  };

  handleChangeValue = name => value => {
    this.setState({
      [name]: value,
    });
  };

  renderFlow = view => {
    const { rValue, tValue } = this.state;
    const Vr = formatCurrency(getVr(rValue));
    const Vt = Vr;
    const ss = `${Math.round(getSS(rValue, tValue))}%`;
    const Vss = formatCurrency(getVss(rValue, tValue));

    return (
      <div className="stake-flow-wrapper">
        <Centered>
          <Label size="large" color="normal" weight="bold">
            RUNE
          </Label>
          <Label size="large" color="normal" weight="bold">
            :
          </Label>
          <Label size="large" color="normal" weight="bold">
            BOLT
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
        <div className="stake-flow-diagram">
          <div className="arrow-image">
            <img src={arrowGreenIcon} alt="arrow-green" />
          </div>
          <img src={orbGreenIcon} alt="arrow-green" />
          <div className="arrow-image contains-tooltip">
            <img
              className="reverse-image"
              src={arrowGreenIcon}
              alt="arrow-yello"
            />
            {view === 'stakingintro' && (
              <TooltipIcon
                text="You stake on both sides of the pool."
                placement="rightTop"
              />
            )}
          </div>
        </div>
        <Centered>
          <Label size="large" color="normal" weight="bold">
            {view === 'stakingintro' && formatNumber(R)}
            {view === 'stakingplay' && formatNumber(R + rValue)}
          </Label>
          <Label size="large" color="normal" weight="bold">
            :
          </Label>
          <Label size="large" color="normal" weight="bold">
            {view === 'stakingintro' && formatNumber(T)}
            {view === 'stakingplay' && formatNumber(T + tValue)}
          </Label>
        </Centered>
        <Centered>
          <Label size="large" color="normal">
            {Vr}
          </Label>
          <Label size="large" color="normal" />
          <Label size="large" color="normal">
            {Vt}
          </Label>
        </Centered>
        <div className="center-text">
          <Label size="large" color="normal" weight="bold">
            {ss}
          </Label>
        </div>
        <div className="center-text description-label">
          <Label size="big" color="normal">
            YOUR POOL SHARE
          </Label>
        </div>
        <Centered>
          <Label />
          <Label size="large" color="normal" weight="bold">
            {Vss}
          </Label>
          <Label className="contains-tooltip">
            <span />
            {view === 'stakingintro' && (
              <TooltipIcon
                text="You own a share of the pool."
                placement="rightTop"
              />
            )}
          </Label>
        </Centered>
        <div className="center-text description-label">
          <Label size="big" color="normal">
            YOUR ASSET SHARE
          </Label>
        </div>
      </div>
    );
  };

  renderButtons = () => {
    const { view } = this.props;

    let URL = '';
    if (view === 'stakingintro') {
      URL = '/tutorial/swap/doubleplay';
    }
    if (view === 'stakingplay') {
      URL = '/tutorial/pool/stakingintro';
    }

    return (
      <Row className="bottom-nav-button">
        <Link to={URL}>
          <Button color="primary" typevalue="ghost">
            back
          </Button>
        </Link>
        {view === 'stakingplay' && (
          <Link to="/tutorial/pool/earningintro">
            <Button color="primary" typevalue="outline">
              Earning
              <Icon type="arrow-right" />
            </Button>
          </Link>
        )}
      </Row>
    );
  };

  renderIntro = () => {
    return (
      <div className="stake-intro-wrapper">
        {this.renderFlow('stakingintro')}
      </div>
    );
  };

  renderPlay = () => {
    const { rValue, tValue } = this.state;

    return (
      <div className="stake-play-wrapper">
        <div className="token-stake-wrapper">
          <CoinInput
            title="Token to stake:"
            asset="rune"
            amount={rValue}
            onChange={this.handleChangeValue('rValue')}
            price={Pr}
            step={100000}
          />
        </div>
        {this.renderFlow('stakingplay')}
        <div className="token-stake-wrapper">
          <CoinInput
            title="Token to stake:"
            asset="bolt"
            amount={tValue}
            onChange={this.handleChangeValue('tValue')}
            price={Pt}
            step={200000}
            reverse
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
              STAKE
            </Label>
            <Label size="small" color="dark">
              You can stake your assets in any of the pools.
            </Label>
            <Label size="small" color="dark">
              Each trade on the pool earns a commission which you can later
              claim.
            </Label>
            <Label size="small" color="dark">
              Choose pools with low liquidity and high volume for maximum
              earnings.
            </Label>
            {view === 'stakingintro' && (
              <Link to="/tutorial/pool/stakingplay">
                <Button className="try-btn" typevalue="outline">
                  try
                </Button>
              </Link>
            )}
            {view === 'stakingplay' && (
              <>
                <Label size="small" color="dark">
                  Since anyone can <strong>stake</strong> alongside you, you own
                  a share of the pool which adjusts if people join or leave.
                </Label>
                <Label size="small" color="dark">
                  As trades happen the asset balances will change, but your
                  share won’t.
                </Label>
                <Label size="small" color="dark">
                  Asset values may also change whilst you stake. You can
                  withdraw your assets plus any earnings at any time.
                </Label>
              </>
            )}
          </Col>
          <Col span="20" className="tutorial-content">
            <Row className="tutorial-flow">
              {view === 'stakingintro' && this.renderIntro()}
              {view === 'stakingplay' && this.renderPlay()}
            </Row>
            {this.renderButtons()}
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

export default withRouter(Stake);
