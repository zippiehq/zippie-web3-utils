/*
 * Copyright (C) 2017 Zippie Ltd.
 *
 * Commercial License Usage
 *
 * Licensees holding valid commercial Zipper licenses may use this file in
 * accordance with the terms contained in written agreement between you and
 * Zippie
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

const wallet_abi_v3 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'zippieCardNonces',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
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
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'usedNonces',
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
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'cardNonces',
        type: 'bytes32[]',
      },
    ],
    name: 'redeemBlankCheck',
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
    name: 'tokenId',
    type: 'uint256',
  },
  {
    name: 'cardNonces',
    type: 'bytes32[]',
  },
]

const redeemBlankCheck_signature_v3 = '0xf8010960'

module.exports = {
  wallet_abi_v3,
  redeemBlankCheck_abi_v3,
  redeemBlankCheck_signature_v3,
}
