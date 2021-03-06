pragma solidity ^0.4.0;

import './Tokensale.sol';

contract TokensaleFake is Tokensale {
    function TokensaleFake(
        uint _startTime,
        address _token,
        address _placeholder,
        address _wallet) Tokensale(
        _startTime,
        _token,
        _placeholder,
        _wallet
    ) {
    }

    function hardcap() public constant returns (uint256) {
        return 10000e18;
    }
    function duration() public constant returns (uint256) {
        return 14 days;
    }
    function releaseDuration() public constant returns (uint256) {
        return 7 days;
    }

    function rate() public constant returns (uint256) {
        return 5000;
    }

    function forwardFunds(uint256 amount) internal {
        wallet.transfer(amount);
    }
}