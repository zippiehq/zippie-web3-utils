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

const namehash = require('eth-ens-namehash')
const contentHash = require('content-hash')
const ens_abi = require('./contracts/ensAbi')

async function setContenthash(web3, ensRegistryAddress, ownerAddress, ensName, contentCodec, contentValue) {
  const ensRegistry = new web3.eth.Contract(
    ens_abi.ens_registry_abi,
    ensRegistryAddress,
  )

  const resolverAddres = await ensRegistry.methods.resolver(namehash.hash(ensName)).call()

  const publicResolver = new web3.eth.Contract(
    ens_abi.public_resolver_abi,
    resolverAddres,
  )

  return new Promise(async (resolve, reject) => {
    publicResolver.methods
      .setContenthash(namehash.hash(ensName), '0x' + contentHash.encode(contentCodec, contentValue))
      .send({
        from: ownerAddress,
        gas: '300000', // XXX Calc gas
        gasPrice: '1000000000', // 1 gwei
      })
      .once('transactionHash', hash => {
        console.log(hash)
      })
      .once('receipt', function(receipt) {
        console.log(receipt)
        resolve(receipt)
      })
      .on('error', function(error) {
        console.log(error)
        reject(error)
      })
  })
}

module.exports = {
  setContenthash
}