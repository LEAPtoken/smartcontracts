pragma solidity ^0.4.11;

import './Tokensale.sol';

contract LeapPreTokensale is Tokensale {
    address secondWallet;

    function LeapPreTokensale(
        uint256 _startTime,
        address _token,
        address _placeholder,
        address _wallet, address _secondWallet
    ) Tokensale(
        _startTime,
        _token,
        _placeholder,
        _wallet
    ) {

        secondWallet = _secondWallet;
    }

    function hardcap() public constant returns (uint256) {
        return 136609955e18;
    }

    function duration() public constant returns (uint256) {
        return 20 days;
    }

    function rate() public constant returns (uint256) {
        return 4500;
    }

    function forwardFunds(uint256 amount) internal {
        uint256 halfOfPayment = amount.div(2);

        wallet.transfer(halfOfPayment);
        secondWallet.transfer(amount - halfOfPayment);
    }

}
