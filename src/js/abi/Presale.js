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
  "unlinked_binary": "0x6060604052635a5b5af4600355635a5c4554600455610b7d60055569033d6a2749203490000060065573f869e31a013a7fd78eecc67383812dea9184957e600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550738bda06b0df609b02f59a3d4794ac42403de574aa600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034156100dd57600080fd5b604051602080610cb6833981016040528080519060200190919050505b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505b610b278061018f6000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630b8d0a28146100e05780631792ef1d146101355780631a026c961461016c5780632c4e722e146101c15780633197cbb6146101ea578063355274ea146102135780634042b66f1461023c5780635f51fb0e1461026557806378e97925146102a55780638da5cb5b146102ce578063ec8ac4d814610323578063ecb70fb714610351578063f2fde38b1461037e578063fc0c546a146103b7575b6100de5b6100db3361040c565b5b565b005b34156100eb57600080fd5b6100f361060e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561014057600080fd5b6101566004808035906020019091905050610634565b6040518082815260200191505060405180910390f35b341561017757600080fd5b61017f610722565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101cc57600080fd5b6101d4610748565b6040518082815260200191505060405180910390f35b34156101f557600080fd5b6101fd61074e565b6040518082815260200191505060405180910390f35b341561021e57600080fd5b610226610754565b6040518082815260200191505060405180910390f35b341561024757600080fd5b61024f61075a565b6040518082815260200191505060405180910390f35b341561027057600080fd5b61028f6004808035906020019091908035906020019091905050610760565b6040518082815260200191505060405180910390f35b34156102b057600080fd5b6102b86107e1565b6040518082815260200191505060405180910390f35b34156102d957600080fd5b6102e16107e7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61034f600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061040c565b005b341561035c57600080fd5b61036461080c565b604051808215151515815260200191505060405180910390f35b341561038957600080fd5b6103b5600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610828565b005b34156103c257600080fd5b6103ca6108ff565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600080600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561044b57600080fd5b610453610925565b151561045e57600080fd5b34915061046a82610634565b61047683600254610760565b61048b6005548561098090919063ffffffff16565b010190506104a4826002546109b490919063ffffffff16565b600281905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1984836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b151561057757600080fd5b6102c65a03f1151561058857600080fd5b50505060405180519050508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f623b3804fa71d67900d064613da8f94b9617215ee90799290593e1745087ad188484604051808381526020018281526020019250505060405180910390a36106086109d3565b5b505050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000681b1ae4d6e2ef5000008410151561065457604b91506106db565b680d8d726b7177a800008410151561066f57603291506106da565b68056bc75e2d631000008410151561068a57601e91506106d9565b6802b5e3af16b1880000841015156106a557601491506106d8565b68015af1d78b58c40000841015156106c057600a91506106d7565b678ac7230489e80000841015156106d657600591505b5b5b5b5b5b6107156064610707846106f96005548961098090919063ffffffff16565b61098090919063ffffffff16565b610ac590919063ffffffff16565b90508092505b5050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b60045481565b60065481565b60025481565b6000806000806000682e141ea081ca080000935060fa925061138891505b8386101515610796578386039550828203915061077e565b6107d16127106107c3846107b56005548c61098090919063ffffffff16565b61098090919063ffffffff16565b610ac590919063ffffffff16565b90508094505b5050505092915050565b60035481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600454421180610822575060065460025410155b90505b90565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561088357600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156108fa57806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600080600354421015801561093f57506004544211155b925060003414159150600654610960346002546109b490919063ffffffff16565b1115905082801561096e5750815b80156109775750805b93505b50505090565b600080828402905060008414806109a1575082848281151561099e57fe5b04145b15156109a957fe5b8091505b5092915050565b60008082840190508381101515156109c857fe5b8091505b5092915050565b60006109e9600234610ac590919063ffffffff16565b9050600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610a4d57600080fd5b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc610a9c8334610ae190919063ffffffff16565b9081150290604051600060405180830381858888f193505050501515610ac157600080fd5b5b50565b6000808284811515610ad357fe5b0490508091505b5092915050565b6000828211151515610aef57fe5b81830390505b929150505600a165627a7a7230582048655a605ac8a131ad26b3ce0bcbb82dd31cafd2cbaeac7ddaf579cedd4ebacf0029",
  "networks": {
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
      "address": "0xcd498ef942c417c39ccaef7219cfd67be5c37c96",
      "updated_at": 1515936353481
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1515936353481
}