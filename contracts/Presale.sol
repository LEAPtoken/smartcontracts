pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './PresaleLEAP.sol';

contract Presale is Ownable {
    using SafeMath for uint256;

    PresaleLEAP public token;

    uint256 public weiRaised;

    uint[18] public stages = [850 ether, 1700 ether, 2550 ether, 2890 ether, 3230 ether, 3570 ether, 3910 ether, 4250 ether, 4590 ether, 4930 ether, 5270 ether, 5610 ether, 5950 ether, 6290 ether, 6630 ether, 6970 ether, 7310 ether, 7650 ether];
    uint[18] public bonuses = [5000, 4750, 4500, 4250, 4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 750];

    uint256 public cap = 7650 ether;
    uint256 public rate = 3000;
    uint256 public startTime = 1516039200;
    uint256 public endTime = 1516752000;

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
        uint256 bonusBasePoints = 0;

        for(uint i = 0; i < 18; i++) {
            if(_weiRaised < stages[i]) {
                bonusBasePoints = bonuses[i];
                break;
            }
        }

        uint256 stageBonusAmount = _weiAmount.mul(rate).mul(bonusBasePoints).div(10000);

        return stageBonusAmount;
    }

    function whaleBonus(uint256 _weiAmount)
        public constant returns (uint256)
    {
        uint256 bonusPercent;
        uint256 whaleBonusAmount;

        if(_weiAmount >= 500 ether) {
            bonusPercent = 75;
        } else if(_weiAmount >= 250 ether) {
            bonusPercent = 50;
        } else if(_weiAmount >= 100 ether) {
            bonusPercent = 30;
        } else if(_weiAmount >= 50 ether) {
            bonusPercent = 20;
        } else if(_weiAmount >= 25 ether) {
            bonusPercent = 10;
        } else if(_weiAmount >= 10 ether) {
            bonusPercent = 5;
        }

        whaleBonusAmount = _weiAmount.mul(rate).mul(bonusPercent).div(100);

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