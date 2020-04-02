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

const fifs_registrar_abi = [
  {
    inputs: [
      {
        name: 'ensAddr',
        type: 'address'
      },
      {
        name: 'node',
        type: 'bytes32'
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
        name: 'label',
        type: 'bytes32'
      },
      {
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'register',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

const ens_registry_abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'label',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'NewOwner',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'resolver',
        type: 'address'
      }
    ],
    name: 'NewResolver',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'ttl',
        type: 'uint64'
      }
    ],
    name: 'NewTTL',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'owner',
        type: 'address'
      },
      {
        name: 'resolver',
        type: 'address'
      },
      {
        name: 'ttl',
        type: 'uint64'
      }
    ],
    name: 'setRecord',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'label',
        type: 'bytes32'
      },
      {
        name: 'owner',
        type: 'address'
      },
      {
        name: 'resolver',
        type: 'address'
      },
      {
        name: 'ttl',
        type: 'uint64'
      }
    ],
    name: 'setSubnodeRecord',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'setOwner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'label',
        type: 'bytes32'
      },
      {
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'setSubnodeOwner',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'resolver',
        type: 'address'
      }
    ],
    name: 'setResolver',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'ttl',
        type: 'uint64'
      }
    ],
    name: 'setTTL',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'operator',
        type: 'address'
      },
      {
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'owner',
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
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'resolver',
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
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'ttl',
    outputs: [
      {
        name: '',
        type: 'uint64'
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
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'recordExists',
    outputs: [
      {
        name: '',
        type: 'bool'
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
        name: 'owner',
        type: 'address'
      },
      {
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]

const public_resolver_abi = [
  {
    constant: true,
    inputs: [
      {
        name: 'interfaceID',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'setDNSRecords',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'key',
        type: 'string'
      },
      {
        name: 'value',
        type: 'string'
      }
    ],
    name: 'setText',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'interfaceID',
        type: 'bytes4'
      }
    ],
    name: 'interfaceImplementer',
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
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'contentTypes',
        type: 'uint256'
      }
    ],
    name: 'ABI',
    outputs: [
      {
        name: '',
        type: 'uint256'
      },
      {
        name: '',
        type: 'bytes'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'x',
        type: 'bytes32'
      },
      {
        name: 'y',
        type: 'bytes32'
      }
    ],
    name: 'setPubkey',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'hash',
        type: 'bytes'
      }
    ],
    name: 'setContenthash',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'addr',
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
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'name',
        type: 'bytes32'
      }
    ],
    name: 'hasDNSRecords',
    outputs: [
      {
        name: '',
        type: 'bool'
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
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'key',
        type: 'string'
      }
    ],
    name: 'text',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'contentType',
        type: 'uint256'
      },
      {
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'setABI',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'name',
        type: 'string'
      }
    ],
    name: 'setName',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'coinType',
        type: 'uint256'
      },
      {
        name: 'a',
        type: 'bytes'
      }
    ],
    name: 'setAddr',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'name',
        type: 'bytes32'
      },
      {
        name: 'resource',
        type: 'uint16'
      }
    ],
    name: 'dnsRecord',
    outputs: [
      {
        name: '',
        type: 'bytes'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'clearDNSZone',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'contenthash',
    outputs: [
      {
        name: '',
        type: 'bytes'
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
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'pubkey',
    outputs: [
      {
        name: 'x',
        type: 'bytes32'
      },
      {
        name: 'y',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'a',
        type: 'address'
      }
    ],
    name: 'setAddr',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'interfaceID',
        type: 'bytes4'
      },
      {
        name: 'implementer',
        type: 'address'
      }
    ],
    name: 'setInterface',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'coinType',
        type: 'uint256'
      }
    ],
    name: 'addr',
    outputs: [
      {
        name: '',
        type: 'bytes'
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
        type: 'bytes32'
      },
      {
        name: '',
        type: 'address'
      },
      {
        name: '',
        type: 'address'
      }
    ],
    name: 'authorisations',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: '_ens',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        name: 'target',
        type: 'address'
      },
      {
        indexed: false,
        name: 'isAuthorised',
        type: 'bool'
      }
    ],
    name: 'AuthorisationChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'indexedKey',
        type: 'string'
      },
      {
        indexed: false,
        name: 'key',
        type: 'string'
      }
    ],
    name: 'TextChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'x',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'y',
        type: 'bytes32'
      }
    ],
    name: 'PubkeyChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'name',
        type: 'string'
      }
    ],
    name: 'NameChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'interfaceID',
        type: 'bytes4'
      },
      {
        indexed: false,
        name: 'implementer',
        type: 'address'
      }
    ],
    name: 'InterfaceChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'name',
        type: 'bytes'
      },
      {
        indexed: false,
        name: 'resource',
        type: 'uint16'
      },
      {
        indexed: false,
        name: 'record',
        type: 'bytes'
      }
    ],
    name: 'DNSRecordChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'name',
        type: 'bytes'
      },
      {
        indexed: false,
        name: 'resource',
        type: 'uint16'
      }
    ],
    name: 'DNSRecordDeleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      }
    ],
    name: 'DNSZoneCleared',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'hash',
        type: 'bytes'
      }
    ],
    name: 'ContenthashChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'a',
        type: 'address'
      }
    ],
    name: 'AddrChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'coinType',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'newAddress',
        type: 'bytes'
      }
    ],
    name: 'AddressChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'contentType',
        type: 'uint256'
      }
    ],
    name: 'ABIChanged',
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32'
      },
      {
        name: 'target',
        type: 'address'
      },
      {
        name: 'isAuthorised',
        type: 'bool'
      }
    ],
    name: 'setAuthorisation',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'data',
        type: 'bytes[]'
      }
    ],
    name: 'multicall',
    outputs: [
      {
        name: 'results',
        type: 'bytes[]'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

const reverse_registrar_abi = [
  {
    constant: true,
    inputs: [],
    name: 'ens',
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
    inputs: [],
    name: 'ADDR_REVERSE_NODE',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'defaultResolver',
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
        name: 'ensAddr',
        type: 'address'
      },
      {
        name: 'resolverAddr',
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
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'claim',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'owner',
        type: 'address'
      },
      {
        name: 'resolver',
        type: 'address'
      }
    ],
    name: 'claimWithResolver',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'name',
        type: 'string'
      }
    ],
    name: 'setName',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'addr',
        type: 'address'
      }
    ],
    name: 'node',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  }
]

module.exports = {
  fifs_registrar_abi,
  ens_registry_abi,
  public_resolver_abi,
  reverse_registrar_abi
}
