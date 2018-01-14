import Web3 from 'web3';

import React, { Component } from 'react';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Split from 'grommet/components/Split';
import Paragraph from 'grommet/components/Paragraph';
import Article from 'grommet/components/Article';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Spinner from 'grommet/components/icons/Spinning';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';

import InfoPresaleToken from './InfoPresaleToken';
import MintPresaleToken from './MintPresaleToken';
import BurnPresaleToken from './BurnPresaleToken';

import StageBonus from './StageBonus';

import Blockchain from './Blockchain';

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      tokenInfo: null,
      blockchain: null,
      web3: null
    };

    this._connectWeb3 = this._connectWeb3.bind(this);
    this._updateTokenInfo = this._updateTokenInfo.bind(this);

    this._mintTokens = this._mintTokens.bind(this);
    this._burnTokens = this._burnTokens.bind(this);
  }

  componentDidMount() {
    this._connectWeb3()
      .then(this._updateTokenInfo)
      .catch(this._onError);
  }

  _onError(reason) {
    console.error(reason);
  }

  _connectWeb3() {
    return new Promise((resolve, reject) => {
      window.addEventListener('load', () => {
        const web3 = window.web3 ?
          new Web3(window.web3.currentProvider)
          : new Web3(new Web3.providers.HttpProvider(this.props.proxy));

        Blockchain(web3).then((API) => {
          this.setState({
            web3: web3,
            blockchain: API
          });
          resolve();
        }).catch(reject);
      });
    });
  }

  _updateTokenInfo() {
    return this.state.blockchain.getTokenInfo().then(tokenInfo => {
      this.setState({ tokenInfo });
    });
  }

  _mintTokens(data) {
    return this.state.blockchain.mintTokens(data).then(this._updateTokenInfo);
  }

  _burnTokens(data) {
    return this.state.blockchain.burnTokens(data).then(this._updateTokenInfo);
  }

  render() {
    return (
      <App>
        {this.state.tokenInfo &&
        <Article margin={{horizontal: 'medium'}}>
          <Header><Title>LEAP Token</Title></Header>
          <Section>
            <Heading>Information: </Heading>
            <InfoPresaleToken {...this.state.tokenInfo} />
          </Section>
          <Section>
            <Heading>Actions: </Heading>
            <Tabs>
              <Tab title='Check stage bonus'>
                <StageBonus calculate={this.state.blockchain.getStageBonus} convertInput={this.state.web3.toWei} convertResult={this.state.web3.fromWei} />
              </Tab>
              <Tab title='Mint Presale Token'>
                <MintPresaleToken onSubmit={this._mintTokens} />
              </Tab>
              <Tab title='Burn Presale Token'>
                <BurnPresaleToken onSubmit={this._burnTokens} />
              </Tab>
            </Tabs>
          </Section>
          <Footer>Footer</Footer>
        </Article>
        }
        {!this.state.tokenInfo && <Spinner size='large' />}
      </App>
    );
  }
}
