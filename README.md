# The LEAP Token (Powering eSports by blockchain and smart contracts)

- [White Paper](https://www.leap.gg/assets/docs/LEAP-WhitePaper.pdf)
- [One Pager](https://www.leap.gg/assets/docs/LEAP_1Pager.pdf)
- [Leap Official Website](https://leap.gg)

## Contracts

- [LEAP.sol](/contracts/LEAP.sol): The main token contract.
- [LeapTokensalePlaceholder.sol](/contracts/LeapTokensalePlaceholder.sol): This is a placeholder for the token owner in between different token-sale stages.
- **REMOVED** [TokenHolder.sol](/contracts/TokenHolder.sol): This contract acted as a placeholder for tokens bought by buyers, who didn't yet finalize their KYC and/or AML procedures. But in the intest of simplicity we have opted to issue the tokens immediately, but keep them frozen until the KYC and/or AML has been executed by the buyer.
Contract where tokens belonging to specific investor will be held before KYC/AML verification. This contract will release this tokens for specific beneficiary after KYC/AML verification. **If the buyer doesn't finalize the KYC, we reserve the right to refund the buyer and destroy the tokens.**
- [Tokensale.sol](/contracts/Tokensale.sol): The basic tokensale implementation.
- [LeapTokensale.sol](/contracts/LeapTokensale.sol): The contract for the main tokensale.
- [LeapPreTokensale.sol](/contracts/LeapPreTokensale.sol): The contract for the pre-tokensale.
- [LeapPrivatePreTokensale.sol](/contracts/SNT.sol): The contract for the private pre-tokensale.
- [BitcoinProxy.sol](/contracts/BitcoinProxy.sol): Proxy transferring bitcoin transactions from relay to tokensale.
- [BitcoinProxyNoGas.sol](/contracts/BitcoinProxyNoGas.sol): Proxy transferring bitcoin transactions from relay to tokensale.
    **To avoid burdening investors with bitcoin transaction hashes we will process your transaction and pay 
    for gas by ourselves. You are welcome to make bitcoin transaction to your personal unique wallet, 
    even if you haven't ETH on your ethereum wallet.** 
- [BTC.sol](/contracts/BTC.sol): The library for bitcoin transactions verification.
- [MultiSigWallet.sol](/contracts/MultiSigWallet.sol): The multisig contract for funding wallet.
- [BitcoinRelayFake.sol](/contracts/BitcoinRelayFake.sol): The contract for testing the bitcoin relay. BTCRelay network should be used in production instead.
- [TokensaleFake.sol](/contracts/TokensaleFake.sol): The contract for testing basic tokensale implementation. Should not be used in production.

