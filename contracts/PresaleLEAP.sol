pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/PausableToken.sol';

contract PresaleLEAP is MintableToken, PausableToken {
    string public constant name = "LEAP Presale";
    string public constant symbol = "LEAP";
    uint8 public constant decimals = 18;

    mapping (address => bool) public mintAgents;

    function mint(address _to, uint256 _amount)
        public onlyMintAgent canMint returns (bool)
    {
        totalSupply = totalSupply.add(_amount);
        balances[_to] = balances[_to].add(_amount);

        Mint(_to, _amount);
        Transfer(address(0), _to, _amount);

        return true;
    }

    function burn(address _from, uint256 _amount)
        public onlyMintAgent canMint returns (bool)
    {
        require(_amount <= balances[_from]);

        balances[_from] = balances[_from].sub(_amount);
        totalSupply = totalSupply.sub(_amount);
        Burn(_from, _amount);

        return true;
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
    event Burn(address _from, uint256 _amount);
}