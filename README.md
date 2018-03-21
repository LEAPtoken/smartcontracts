
# The LEAP Presale Token (Powering eSports by blockchain and smart contracts)

- [White Paper](https://www.leap.gg/assets/docs/LEAP-WhitePaper.pdf)
- [One Pager](https://www.leap.gg/assets/docs/LEAP_1Pager.pdf)
- [Leap Official Website](https://leap.gg)

## Contracts
- [PresaleLEAP.sol](/contracts/PresaleLEAP.sol): Token contract for presale

PresaleLEAP is **ERC20 Token** distributed during LEAP Presale. For investors participated in private presale we provide migration after KYC confirmation.

Token owner can create and remove addresses that allowed to mint and burn tokens until minting would be finished:

    function setMintAgent(address _address, bool _state)
        onlyOwner canMint public

Any of mint agents can mint tokens directly until minting finished:

    function mint(address _to, uint256 _amount)
        public onlyMintAgent canMint returns (bool)
        
Any of mint agents can burn tokens directly until minting finished:

    function burn(address _from, uint256 _amount)
        public onlyMintAgent canMint returns (bool)
        
- [Presale.sol](/contracts/Presale.sol): Presale contract

Presale contract receive payments from investors, distribute payments equally between two wallets and issue tokens for investor instantly.