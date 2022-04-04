import { USDC_ADDRESS, WETH9_ADDRESS, WNATIVE_ADDRESS } from './addresses'

import { ChainId } from '../enums'
import { Token } from '../entities/Token'
import { TokenMap } from '../types/TokenMap'

export const USDC: TokenMap = {
  [ChainId.ETHEREUM]: new Token(1, USDC_ADDRESS[ChainId.ETHEREUM], 6, 'USDC', 'USD Coin'),
  [ChainId.TELOS]: new Token(40, USDC_ADDRESS[ChainId.TELOS], 6, 'USDC', 'USD Coin'),
  [ChainId.FANTOM]: new Token(250, USDC_ADDRESS[ChainId.FANTOM], 6, 'USDC', 'USD Coin'),
}

export const USD: TokenMap = {
  ...USDC,
}

export const WETH9: TokenMap = {
  [ChainId.ETHEREUM]: new Token(1, WETH9_ADDRESS[ChainId.ETHEREUM], 18, 'WETH', 'Wrapped Ether'),
  [ChainId.TELOS]: new Token(40, WETH9_ADDRESS[ChainId.TELOS], 18, 'WETH', 'Wrapped Ether'),
  // [ChainId.BSC]: new Token(ChainId.BSC, WETH9_ADDRESS[ChainId.BSC], 18, 'WETH', 'Wrapped Ether'),
  [ChainId.FANTOM]: new Token(250, WETH9_ADDRESS[ChainId.FANTOM], 18, 'WETH', 'Wrapped Ether')
}

export const WNATIVE: TokenMap = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  // [ChainId.BSC]: new Token(ChainId.BSC, WNATIVE_ADDRESS[ChainId.BSC], 18, 'WBNB', 'Wrapped BNB'),
  [ChainId.TELOS]: new Token(40, WNATIVE_ADDRESS[ChainId.TELOS], 18, 'WTLOS', 'Wrapped Telos'),
  [ChainId.FANTOM]: new Token(250, WNATIVE_ADDRESS[ChainId.FANTOM], 18, 'WFTM', 'Wrapped Fantom'),
  // [ChainId.FANTOM_TESTNET]: new Token(ChainId.FANTOM_TESTNET, WNATIVE_ADDRESS[ChainId.FANTOM_TESTNET], 18, 'WFTM', 'Wrapped Fantom'),
}
