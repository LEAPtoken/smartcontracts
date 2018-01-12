pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './PresaleLEAP.sol';

contract Presale is Ownable {
    using SafeMath for uint256;

    PresaleLEAP public token;

    uint256 public weiRaised;

    uint256 public startTime = 1515888000;
    uint256 public endTime = 1516752000;
    uint256 public rate = 2971;
    uint256 public cap = 15300 ether;

    address public wallet1 = 0xF869E31a013a7Fd78EEcc67383812DEA9184957e;
    address public wallet2 = 0x8BDa06b0Df609B02f59a3D4794ac42403de574aA;

    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    function Presale(address _token) {
        token = PresaleLEAP(_token);
    }

    function () external payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable
    {
        require(beneficiary != address(0));
        require(validPurchase());

        uint256 weiAmount = msg.value;

        uint256 tokens = weiAmount.mul(rate) +
                        stageBonus(weiAmount, weiRaised) +
                        whaleBonus(weiAmount);

        weiRaised = weiRaised.add(weiAmount);

        token.mint(beneficiary, tokens);

        TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

        forwardFunds();
    }

    function stageBonus(uint256 _weiAmount, uint256 _weiRaised)
        public constant returns (uint256)
    {
        uint256 weiStep = 850e18;
        uint256 bonusStepBasePoints = 250;
        uint256 bonusBasePoints = 5000;

        while(_weiRaised >= weiStep) {
            _weiRaised -= weiStep;
            bonusBasePoints -= bonusStepBasePoints;
        }

        uint256 stageBonusAmount = _weiAmount.mul(rate).mul(bonusBasePoints).div(10000);

        return stageBonusAmount;
    }

    function whaleBonus(uint256 _weiAmount)
        public constant returns (uint256)
    {
        uint256 bonusPercent;
        uint256 whaleBonusAmount;

        if(_weiAmount >= 500e18) {
            bonusPercent = 75;
        } else if(_weiAmount >= 250e18) {
            bonusPercent = 50;
        } else if(_weiAmount >= 100e18) {
            bonusPercent = 30;
        } else if(_weiAmount >= 50e18) {
            bonusPercent = 20;
        } else if(_weiAmount >= 25e18) {
            bonusPercent = 10;
        } else if(_weiAmount >= 10e18) {
            bonusPercent = 5;
        }

        whaleBonusAmount = _weiAmount.mul(bonusPercent).div(100);

        return whaleBonusAmount;
    }

    function forwardFunds() internal
    {
        uint256 half = msg.value.div(2);
        wallet1.transfer(half);
        wallet2.transfer(msg.value.sub(half));
    }

    function validPurchase() internal constant returns (bool)
    {
        bool withinPeriod = now >= startTime && now <= endTime;
        bool nonZeroPurchase = msg.value != 0;
        bool withinCap = weiRaised.add(msg.value) <= cap;

        return withinPeriod && nonZeroPurchase && withinCap;
    }

    function hasEnded() public constant returns (bool)
    {
        return now > endTime || weiRaised >= cap;
    }
}