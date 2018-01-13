import contract from 'truffle-contract';

import PresaleToken from './abi/PresaleLEAP';
import Presale from './abi/Presale';

let account = null;
let token = null;
let presale = null;

const API = {
  getTokenInfo() {
    const getPresaleData = presale.deployed().then(instance => {
      return Promise.all([
        instance.hasEnded.call(),
        instance.startTime.call(),
        instance.endTime.call(),
        instance.rate.call(),
        instance.cap.call(),
        instance.wallet1.call(),
        instance.wallet2.call(),
        instance.weiRaised.call()
      ]);
    });
    const getTokenData = token.deployed().then(instance => {
      return Promise.all([
        instance.totalSupply.call(),
        instance.mintingFinished.call(),
        instance.mintAgents.call(account)
      ]);
    });

    return Promise.all([getPresaleData, getTokenData]).then(([presaleData, tokenData]) => {
      return {
        hasEnded: presaleData[0],
        startTime: presaleData[1].toNumber(),
        endTime: presaleData[2].toNumber(),
        rate: presaleData[3].toNumber(),
        cap: presaleData[4].toNumber(),
        wallet1: presaleData[5],
        wallet2: presaleData[6],
        weiRaised: presaleData[7].toNumber(),
        totalSupply: tokenData[0].toNumber(),
        mintingFinished: tokenData[1],
        isMintAgent: tokenData[2]
      };
    });
  },

  mintTokens({ address, amount }) {
    return token.deployed().then(instance => {
      return instance.mint(address, amount, { from: account, gas: 300000 });
    });
  },

  burnTokens({ address, amount }) {
    return token.deployed().then(instance => {
      return instance.burn(address, amount, { from: account, gas: 300000 });
    });
  }
};

export default function init(web3) {
  return new Promise((resolve, reject) => {
    account = web3.eth.accounts[0];

    token = contract(PresaleToken);
    token.setProvider(web3.currentProvider);

    presale = contract(Presale);
    presale.setProvider(web3.currentProvider);

    const checkToken = token.deployed();
    const checkPresale = presale.deployed();

    Promise.all([checkToken, checkPresale]).then(() => {
      resolve(API);
    }).catch((reason) => {
      reject('[Invalid network]: ' + reason);
    });
  });
}