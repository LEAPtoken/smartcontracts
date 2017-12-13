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
        return 137257059e18;
    }

    function duration() public constant returns (uint256) {
        return 7 days;
    }

    function rate() public constant returns (uint256) {
        if(leapRaised < 100000e18) {
            return 5250;
        } else {
            return 4750;
        }
    }

    function forwardFunds(uint256 amount) internal {
        uint256 halfOfPayment = amount.div(2);

        wallet.transfer(halfOfPayment);
        secondWallet.transfer(amount - halfOfPayment);
    }

}
