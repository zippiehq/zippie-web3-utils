const wallet_abi_v3 = [
  {
    constant: true,
    inputs: [
      {
        name: 'salt',
        type: 'bytes32'
      }
    ],
    name: 'getAccountAddress',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address'
      },
      {
        name: '',
        type: 'address'
      }
    ],
    name: 'usedNonces',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'zippieCardNonces',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'addresses',
        type: 'address[]'
      },
      {
        name: 'signers',
        type: 'address[]'
      },
      {
        name: 'm',
        type: 'uint8[]'
      },
      {
        name: 'v',
        type: 'uint8[]'
      },
      {
        name: 'r',
        type: 'bytes32[]'
      },
      {
        name: 's',
        type: 'bytes32[]'
      },
      {
        name: 'amount',
        type: 'uint256'
      },
      {
        name: 'cardNonces',
        type: 'bytes32[]'
      }
    ],
    name: 'redeemBlankCheck',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

const redeemBlankCheck_abi_v3 = [
  {
    name: 'addresses',
    type: 'address[]',
  },
  {
    name: 'signers',
    type: 'address[]',
  },
  {
    name: 'm',
    type: 'uint8[]',
  },
  {
    name: 'v',
    type: 'uint8[]',
  },
  {
    name: 'r',
    type: 'bytes32[]',
  },
  {
    name: 's',
    type: 'bytes32[]',
  },
  {
    name: 'amount',
    type: 'uint256',
  },
  {
    name: 'cardNonces',
    type: 'bytes32[]',
  },
]

const redeemBlankCheck_signature_v3 = '0x6edaf980'

module.exports = {
  wallet_abi_v3,
  redeemBlankCheck_abi_v3,
  redeemBlankCheck_signature_v3,
}
