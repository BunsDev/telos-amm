// import { Currency, CurrencyAmount, Pair, Token, Trade } from 'moonbeamswap'
// import flatMap from 'lodash.flatmap'
import { useMemo } from 'react'
import { CUSTOM_BASES } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { wrappedCurrency } from '../utils/wrappedCurrency'

import { useActiveWeb3React } from './index'
import { Currency, CurrencyAmount, Pair, Token, Trade } from 'moonbeamswap'

function useAllCommonPairs(currencyA?: Currency, currencyB?: Currency): Pair[] {
  const { chainId } = useActiveWeb3React()

  const bases =  ['0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E']
  const WTLOS_TOKEN = new Token(40, '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E', 18, 'WTLOS' )
  
  const [tokenA, tokenB] = chainId
    ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, 40)]
    : [undefined, undefined]

  const basePairs = [bases]

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, WTLOS_TOKEN]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, WTLOS_TOKEN]),
            // each base against all bases
            ...basePairs
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            .filter(([tokenA, tokenB]) => {
              if (!chainId) return true
              const customBases = CUSTOM_BASES[0]
              if (!customBases) return true

              // const customBasesA: undefined
              // const customBasesB: undefined
              // if (!customBasesA && !customBasesB) return true

              // if (customBasesA && !customBasesA.find(base => tokenB.equals(base))) return false
              // if (customBasesB && !customBasesB.find(base => tokenA.equals(base))) return false

              return true
            })
        : [],
    [tokenA, tokenB, bases, basePairs, WTLOS_TOKEN, chainId]
  )

  const allPairs = usePairs(allPairCombinations)

  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      Object.values(
        allPairs
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.EXISTS && result[1]))
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
            return memo
          }, {})
      ),
    [allPairs]
  )
}

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export function useTradeExactIn(currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyAmountIn?.currency, currencyOut)
  return useMemo(() => {
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      return (
        Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 2, maxNumResults: 1 })[0] ?? null
      )
    }
    return null
  }, [allowedPairs, currencyAmountIn, currencyOut])
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(currencyIn?: Currency, currencyAmountOut?: CurrencyAmount): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut?.currency)

  return useMemo(() => {
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      return (
        Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 2, maxNumResults: 1 })[0] ??
        null
      )
    }
    return null
  }, [allowedPairs, currencyIn, currencyAmountOut])
}
