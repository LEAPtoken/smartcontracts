pragma solidity ^0.4.11;

import './LeapPrivatePreTokensale.sol';

// Just for testing purpose
// We have only 100 ETH on truffle accounts and wanna to reach the hardcap

contract LeapPrivatePreTokensaleFake is LeapPrivatePreTokensale {
    uint divider = 10000;

    function LeapPrivatePreTokensaleFake (
        uint256 _startTime,
        address _token,
        address _placeholder,
        address _wallet, address _secondWallet
    ) LeapPrivatePreTokensale (
        _startTime,
        _token,
        _placeholder,
        _wallet, _secondWallet) {
    }

    function hardcap() public constant returns (uint256) {
        return super.hardcap() / divider;
    }
}
