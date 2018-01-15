export default {
  "contract_name": "Presale",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "wallet2",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_weiAmount",
          "type": "uint256"
        }
      ],
      "name": "whaleBonus",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "wallet1",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "rate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "endTime",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "cap",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "weiRaised",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_weiAmount",
          "type": "uint256"
        },
        {
          "name": "_weiRaised",
          "type": "uint256"
        }
      ],
      "name": "stageBonus",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "startTime",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "stages",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "bonuses",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "beneficiary",
          "type": "address"
        }
      ],
      "name": "buyTokens",
      "outputs": [],
      "payable": true,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "hasEnded",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "constructor"
    },
    {
      "payable": true,
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "purchaser",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TokenPurchase",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x606060405261024060405190810160405280682e141ea081ca08000069ffffffffffffffffffff168152602001685c283d41039410000069ffffffffffffffffffff168152602001688a3c5be1855e18000069ffffffffffffffffffff168152602001689caace881faee8000069ffffffffffffffffffff16815260200168af19412eb9ffb8000069ffffffffffffffffffff16815260200168c187b3d5545088000069ffffffffffffffffffff16815260200168d3f6267beea158000069ffffffffffffffffffff16815260200168e664992288f228000069ffffffffffffffffffff16815260200168f8d30bc92342f8000069ffffffffffffffffffff16815260200169010b417e6fbd93c8000069ffffffffffffffffffff16815260200169011daff11657e498000069ffffffffffffffffffff1681526020016901301e63bcf23568000069ffffffffffffffffffff1681526020016901428cd6638c8638000069ffffffffffffffffffff168152602001690154fb490a26d708000069ffffffffffffffffffff16815260200169016769bbb0c127d8000069ffffffffffffffffffff168152602001690179d82e575b78a8000069ffffffffffffffffffff16815260200169018c46a0fdf5c978000069ffffffffffffffffffff16815260200169019eb513a4901a48000069ffffffffffffffffffff16815250600390601261020e929190610484565b506102406040519081016040528061138861ffff16815260200161128e61ffff16815260200161119461ffff16815260200161109a61ffff168152602001610fa061ffff168152602001610ea661ffff168152602001610dac61ffff168152602001610cb261ffff168152602001610bb861ffff168152602001610abe61ffff1681526020016109c461ffff1681526020016108ca61ffff1681526020016107d061ffff1681526020016106d661ffff1681526020016105dc61ffff1681526020016104e261ffff1681526020016103e861ffff1681526020016102ee61ffff1681525060159060126103029291906104d2565b5069019eb513a4901a480000602755610bb8602855635a5cec20602955635ab69220602a5573f869e31a013a7fd78eecc67383812dea9184957e602b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550738bda06b0df609b02f59a3d4794ac42403de574aa602c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034156103dc57600080fd5b60405160208062001175833981016040528080519060200190919050505b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5061053d565b82601281019282156104c1579160200282015b828111156104c0578251829069ffffffffffffffffffff16905591602001919060010190610497565b5b5090506104ce9190610518565b5090565b8260128101928215610507579160200282015b82811115610506578251829061ffff169055916020019190600101906104e5565b5b5090506105149190610518565b5090565b61053a91905b8082111561053657600081600090555060010161051e565b5090565b90565b610c28806200054d6000396000f300606060405236156100e4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630b8d0a28146100f65780631792ef1d1461014b5780631a026c96146101825780632c4e722e146101d75780633197cbb614610200578063355274ea146102295780634042b66f146102525780635f51fb0e1461027b57806378e97925146102bb578063845ddcb2146102e45780638da5cb5b1461031b578063ab37564114610370578063ec8ac4d8146103a7578063ecb70fb7146103d5578063f2fde38b14610402578063fc0c546a1461043b575b6100f45b6100f133610490565b5b565b005b341561010157600080fd5b6101096106b2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561015657600080fd5b61016c60048080359060200190919050506106d8565b6040518082815260200191505060405180910390f35b341561018d57600080fd5b6101956107c6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101e257600080fd5b6101ea6107ec565b6040518082815260200191505060405180910390f35b341561020b57600080fd5b6102136107f2565b6040518082815260200191505060405180910390f35b341561023457600080fd5b61023c6107f8565b6040518082815260200191505060405180910390f35b341561025d57600080fd5b6102656107fe565b6040518082815260200191505060405180910390f35b341561028657600080fd5b6102a56004808035906020019091908035906020019091905050610804565b6040518082815260200191505060405180910390f35b34156102c657600080fd5b6102ce6108ac565b6040518082815260200191505060405180910390f35b34156102ef57600080fd5b61030560048080359060200190919050506108b2565b6040518082815260200191505060405180910390f35b341561032657600080fd5b61032e6108cd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561037b57600080fd5b61039160048080359060200190919050506108f2565b6040518082815260200191505060405180910390f35b6103d3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610490565b005b34156103e057600080fd5b6103e861090d565b604051808215151515815260200191505060405180910390f35b341561040d57600080fd5b610439600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610929565b005b341561044657600080fd5b61044e610a00565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600080600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156104cf57600080fd5b6104d7610a26565b15156104e257600080fd5b3491506105316104f1836106d8565b61052361050085600254610804565b61051560285487610a8190919063ffffffff16565b610ab590919063ffffffff16565b610ab590919063ffffffff16565b905061054882600254610ab590919063ffffffff16565b600281905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1984836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b151561061b57600080fd5b6102c65a03f1151561062c57600080fd5b50505060405180519050508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f623b3804fa71d67900d064613da8f94b9617215ee90799290593e1745087ad188484604051808381526020018281526020019250505060405180910390a36106ac610ad4565b5b505050565b602c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000681b1ae4d6e2ef500000841015156106f857604b915061077f565b680d8d726b7177a8000084101515610713576032915061077e565b68056bc75e2d631000008410151561072e57601e915061077d565b6802b5e3af16b188000084101515610749576014915061077c565b68015af1d78b58c400008410151561076457600a915061077b565b678ac7230489e800008410151561077a57600591505b5b5b5b5b5b6107b960646107ab8461079d60285489610a8190919063ffffffff16565b610a8190919063ffffffff16565b610bc690919063ffffffff16565b90508092505b5050919050565b602b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60285481565b602a5481565b60275481565b60025481565b60008060008060009250600091505b60128210156108625760038260128110151561082b57fe5b0160005b50548510156108545760158260128110151561084757fe5b0160005b50549250610862565b5b8180600101925050610813565b61089d61271061088f856108816028548b610a8190919063ffffffff16565b610a8190919063ffffffff16565b610bc690919063ffffffff16565b90508093505b50505092915050565b60295481565b6003816012811015156108c157fe5b0160005b915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60158160128110151561090157fe5b0160005b915090505481565b6000602a54421180610923575060275460025410155b90505b90565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561098457600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156109fb57806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806029544210158015610a405750602a544211155b925060003414159150602754610a6134600254610ab590919063ffffffff16565b11159050828015610a6f5750815b8015610a785750805b93505b50505090565b60008082840290506000841480610aa25750828482811515610a9f57fe5b04145b1515610aaa57fe5b8091505b5092915050565b6000808284019050838110151515610ac957fe5b8091505b5092915050565b6000610aea600234610bc690919063ffffffff16565b9050602b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610b4e57600080fd5b602c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc610b9d8334610be290919063ffffffff16565b9081150290604051600060405180830381858888f193505050501515610bc257600080fd5b5b50565b6000808284811515610bd457fe5b0490508091505b5092915050565b6000828211151515610bf057fe5b81830390505b929150505600a165627a7a72305820587173a8f15d20e7eb50b38d7d986460fad51255775dea3b6fb5b9709ed7d65f0029",
  "networks": {
    "1": {
      "events": {},
      "links": {},
      "address": "0x485c6cb6479815cfaab110debe687a51836edab5",
      "updated_at": 1516042899982
    },
    "3": {
      "events": {
        "0x623b3804fa71d67900d064613da8f94b9617215ee90799290593e1745087ad18": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "purchaser",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "beneficiary",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "TokenPurchase",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x4aa87a7805f43d474187a0da526fa46ee19a5915",
      "updated_at": 1516043278917
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1516043278917
}