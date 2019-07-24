import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';

import { ContentWrapper } from './Swap.style';
import Label from '../../components/uielements/label';
import Button from '../../components/uielements/button';

import {
  userAvatarIcon,
  orbGreenIcon,
  arrowGreenIcon,
  arrowYellowIcon,
} from '../../components/icons';

class Swap extends Component {
  render() {
    return (
      <ContentWrapper>
        <Row className="swap-content-pool-text">
          <Col span="8">
            <Label size="normal" weight="bold" color="normal">
              SWAP
            </Label>
            <Label size="small" color="dark">
              You can swap assets by sending them into pools containing BNB and
              BEP2 tokens.
            </Label>
            <Label size="small" color="dark">
              Swaps are calculated at prices relative to the ratio of assets in
              the pools
            </Label>
            <Label size="small" color="dark">
              You can swap both ways or swap and send to someone else.
            </Label>
          </Col>
        </Row>
        <Row>
          <Col span={15} className="rune-diagram-wrapper">
            <div className="rune-diagram-images">
              <img src={userAvatarIcon} alt="user-avatar" />
              <img src={arrowGreenIcon} alt="arrow-green" />
              <img src={orbGreenIcon} alt="orb-green" />
              <img src={arrowYellowIcon} alt="arrow-yellow" />
              <img src={userAvatarIcon} alt="user-avatar" />
            </div>
            <div className="rune-diagram-text">
              <Label size="big" weight="bold">
                RUNE:BNB
              </Label>
            </div>
          </Col>
          <Col span={7} offset={2}>
            <Label size="small" color="dark">
              Since anyone can stake alongside you, you own a share of the pool
              which adjusts if people join or leave.
            </Label>

            <Label size="small" color="dark">
              As a trades happen the asset balances will change, but your share
              won't.
            </Label>

            <Label size="small" color="dark">
              Asset values may also change whilst you stake.
              <br />
              You can withdraw your assets plus any earnings at any time.
            </Label>
          </Col>
        </Row>
        <Row className="bottom-nav-button">
          <Button color="primary" typevalue="outline">
            pools
            <Icon type="arrow-right" />
          </Button>
        </Row>
      </ContentWrapper>
    );
  }
}

export default Swap;
