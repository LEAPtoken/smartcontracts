import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';
import Label from 'grommet/components/Label';
import Value from 'grommet/components/Value';
export default class InfoPresaleToken extends Component {
  render() {
    return (
      <Box>
        <Paragraph margin='none'>Has ended: {this.props.hasEnded ? 'Yes' : 'No'}</Paragraph>
        <Paragraph margin='none'>Start time: {this.props.startTime}</Paragraph>
        <Paragraph margin='none'>End time: {this.props.endTime}</Paragraph>
        <Paragraph margin='none'>Rate: {this.props.rate}</Paragraph>
        <Paragraph margin='none'>Cap: {this.props.cap}</Paragraph>
        <Paragraph margin='none'>Wallet 1: {this.props.wallet1}</Paragraph>
        <Paragraph margin='none'>Wallet 2: {this.props.wallet2}</Paragraph>
        <Paragraph margin='none'>Wei Raised: {this.props.weiRaised}</Paragraph>
        <Paragraph margin='none'>Total Supply: {this.props.totalSupply}</Paragraph>
        <Paragraph margin='none'>Minting finished: {this.props.mintingFinished ? 'Yes' : 'No'}</Paragraph>
        <Paragraph margin='none'>You are mint agent: {this.props.isMintAgent ? 'Yes' : 'No'}</Paragraph>
      </Box>

    );
  }
}
