/*
 * Copyright (c) 2018-2019 Zippie Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

module.exports = {
    token: require('./token'),
    token_erc721: require('./token_erc721'),
    tokens: {kovan: require('./tokens/kovan_tokens'), goerli: require('./tokens/goerli_tokens')},
    token_abi: require('./contracts/erc20ContractAbi'),
    multisig: require('./multisig'),
    wallet_v1: require('./wallet_v1'),
    wallet_v1_abi: require('./contracts/zippieWalletContractAbi_v1'),
    wallet_v2: require('./wallet_v2'),
    wallet_v2_abi: require('./contracts/zippieWalletContractAbi_v2'),
    wallet_v2_erc721: require('./wallet_v2_erc721'),
    wallet_v2_abi_erc721: require('./contracts/zippieWalletErc721ContractAbi_v2'),
    reward_token_erc20_abi: require('./contracts/zippieRewardTokenERC20Abi'),
    reward_token_erc20_factory_abi: require('./contracts/zippieRewardTokenERC20FactoryAbi'),
    utils: require('./utility')
  }