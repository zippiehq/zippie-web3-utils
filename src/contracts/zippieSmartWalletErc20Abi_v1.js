const zippie_smart_wallet_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'zippieMerchantRegistry',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'senderMerchant',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'senderOrderId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipientMerchant',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'recipientOrderId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TransferB2B',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'senderMerchant',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'senderOrderId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TransferB2C',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipientMerchant',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'recipientOrderId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TransferC2B',
    type: 'event',
  },
  {
    inputs: [],
    name: 'TRANSFER_B2B',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'TRANSFER_B2C',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'getAccountAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'senderMerchant',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'senderOrderId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'recipientMerchant',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'recipientOrderId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferB2B',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'senderMerchant',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'senderOrderId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferB2C',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'address[]',
            name: 'signers',
            type: 'address[]',
          },
          {
            internalType: 'uint8[]',
            name: 'm',
            type: 'uint8[]',
          },
          {
            internalType: 'uint8[]',
            name: 'v',
            type: 'uint8[]',
          },
          {
            internalType: 'bytes32[]',
            name: 'r',
            type: 'bytes32[]',
          },
          {
            internalType: 'bytes32[]',
            name: 's',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'cardNonces',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct ZippieSmartWalletERC20.BlankCheck',
        name: 'payment',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'recipientMerchant',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'recipientOrderId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'redeemBlankCheckToMerchant',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

module.exports = {
  zippie_smart_wallet_abi,
}
