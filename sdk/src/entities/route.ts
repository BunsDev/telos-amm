import { ChainId } from '../constants'
import invariant from 'tiny-invariant'

import { Currency, TLOS } from './currency'
import { Token } from './token'
import { Pair } from './pair'
import { Price } from './fractions/price'

const WTLOS_TOKEN = new Token(40, '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E', 18, 'WTLOS')
export class Route {
  public readonly pairs: Pair[]
  public readonly path: Token[]
  public readonly input: Currency
  public readonly output: Currency
  public readonly midPrice: Price

  public constructor(pairs: Pair[], input: Currency, output?: Currency) {
    invariant(pairs.length > 0, 'PAIRS')
    invariant(
      pairs.every(pair => pair.chainId === pairs[0].chainId),
      'CHAIN_IDS'
    )
    invariant(
      (input instanceof Token && pairs[0].involvesToken(input)) ||
        (input === TLOS && pairs[0].involvesToken(WTLOS_TOKEN)),
      'INPUT'
    )
    invariant(
      typeof output === 'undefined' ||
        (output instanceof Token && pairs[pairs.length - 1].involvesToken(output)) ||
        (output === TLOS && pairs[pairs.length - 1].involvesToken(WTLOS_TOKEN)),
      'OUTPUT'
    )

    const path: Token[] = [input instanceof Token ? input : WTLOS_TOKEN]
    for (const [i, pair] of pairs.entries()) {
      const currentInput = path[i]
      invariant(currentInput.equals(pair.token0) || currentInput.equals(pair.token1), 'PATH')
      const output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0
      path.push(output)
    }

    this.pairs = pairs
    this.path = path
    this.midPrice = Price.fromRoute(this)
    this.input = input
    this.output = output ?? path[path.length - 1]
  }

  public get chainId(): ChainId {
    return this.pairs[0].chainId
  }
}
