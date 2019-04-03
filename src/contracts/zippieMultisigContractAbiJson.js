/*
 * Copyright (C) 2018 Zippie Ltd
 *
 * Commercial License Usage
 *
 * Licensees holding valid commercial Zipper licenses may use this file in
 * accordance with the terms contained in written agreement between you and
 * Zippie Ltd.
 *
 * GNU Affero General Public License Usage
 *
 * Alternatively, the JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU Affero General Public
 * License (GNU AGPL) as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.  The code
 * is distributed WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for
 * more details.
 *
 * As additional permission under GNU AGPL version 3 section 7, you may
 * distribute non-source (e.g., minimized or compacted) forms of that code
 * without the copy of the GNU GPL normally required by section 4, provided
 * you include this license notice and a URL through which recipients can
 * access the Corresponding Source.
 *
 * As a special exception to the AGPL, any HTML file which merely makes
 * function calls to this code, and for that purpose includes it by reference
 * shall be deemed a separate work for copyright law purposes.  In addition,
 * the copyright holders of this code give you permission to combine this
 * code with free software libraries that are released under the GNU LGPL.
 * You may copy and distribute such a system following the terms of the GNU
 * AGPL for this code and the LGPL for the libraries.  If you modify this
 * code, you may extend this exception to your version of the code, but you
 * are not obligated to do so.  If you do not wish to do so, delete this
 * exception statement from your version.
 *
 * This license applies to this entire compilation.
 */
const MULTISIG_CONTRACT = '0xfbE77612c66799aABb31B4Cc7Ad3bC061afBEd8b'


function getZippieMultisigContractAbiJson() {
  return [
    {
      constant: false,
      inputs: [
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
      ],
      name: 'redeemBlankCheck',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
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
      ],
      name: 'redeemCheck',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
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
      ],
      name: 'setLimit',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          name: 'zippieCardNonces',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      name: 'accountLimits',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'address',
        },
        {
          name: '',
          type: 'address',
        },
      ],
      name: 'usedNonces',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ]
}

function getZippieMultisigContractFunctionInputAbiJson(functionName) {
  switch (functionName) {
    case 'redeemCheck':
      return [
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
    case 'redeemBlankCheck':
      return [
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
    case 'setLimit':
      return [
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
    default:
      return
  }
}

function getZippieMultisigContractFunctionSignature(functionName) {
  switch (functionName) {
    case 'redeemCheck':
      return '0x6edaf980'
    case 'redeemBlankCheck':
      return '0xf8010960'
    case 'setLimit':
      return '0x285f7658'
    default:
      return
  }
}

module.exports = {getZippieMultisigContractAbiJson, 
  getZippieMultisigContractFunctionInputAbiJson, 
  getZippieMultisigContractFunctionSignature,
  MULTISIG_CONTRACT}