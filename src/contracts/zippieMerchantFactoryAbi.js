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

const merchant_factory_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'merchantRegistry',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ensRegistry',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ensRegistrar',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ensResolver',
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
        indexed: false,
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'merchantId',
        type: 'address',
      },
    ],
    name: 'MerchantOwnerDeployed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'merchantId',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'contentHash',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'ensLabel',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'ensNode',
        type: 'bytes32',
      },
    ],
    name: 'deployMerchantOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

//const deployToken_signature = '0xa83ccecc'

module.exports = {
  merchant_factory_abi,
}
