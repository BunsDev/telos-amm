import { Currency, Token } from 'moonbeamswap'
import { TLOS } from '../constants/native/TLOS'

export function currencyId(currency: Currency): string {
  if (currency === TLOS) return 'TLOS'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
