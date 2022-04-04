import { ChainId, Currency, CurrencyAmount, Token, TokenAmount } from 'moonbeamswap'
import { TLOS } from '../constants/native/TLOS'
import { WTLOS_TOKEN } from '../constants/addresses'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === TLOS ? WTLOS_TOKEN : currency instanceof Token ? currency : undefined
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WTLOS_TOKEN)) return TLOS
  return token
}
