pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/PausableToken.sol';

contract LeapToken is MintableToken, PausableToken {
    string public constant name = "LEAP";
    string public constant symbol = "LEAP";
    uint8 public constant decimals = 18;

    mapping (address => bool) public mintAgents;

    function mint(address _to, uint256 _amount)
        public onlyMintAgent canMint returns (bool)
    {
        return super.mint(_to, _amount);
    }

    function setMintAgent(address _address, bool _state)
        onlyOwner canMint public
    {
        mintAgents[_address] = _state;
        MintingAgentChanged(_address, _state);
    }

    modifier onlyMintAgent() {
        require(mintAgents[msg.sender] == true);
        _;
    }

    event MintingAgentChanged(address _address, bool _state);
}