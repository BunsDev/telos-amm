# Classic DEX Example forked from Sushiswap / Uniswap V2 and integrated with SoulSwap technology.

Created for the Telos EVM for the Telos Foundation Hackathon in April, 2022.

## Moonbase Standalone Addresses

If you use the [following repository](https://github.com/albertov19/uniswap-contracts-moonbeam): your contracts should have the following addresses:

```
      "WETH": "0xC2Bf5F29a4384b1aB0C063e1c666f02121B6084a",
      "factory": "0x5c4242beB94dE30b922f57241f1D02f36e906915",
      "router": "0x42e2EE7Ba8975c473157634Ac2AF4098190fc741",
      "multicall": "0xF8cef78E923919054037a1D03662bBD884fF4edf",
      "init_code_hash": "0x8d5156b1fa4d5924675d6ab8e615754414be695a9ef14a573cdc8069a5ce90ec",
      "tok1": "0xe573BCA813c741229ffB2488F7856C6cAa841041",
      "tok2": "0xBb0CC0fb3e0c06725c67167501f850B4900D6DB5"
```

## Telos EVM Addresses

To make the interface work with your Telos EVM deployment, you need to modify the `./src/telos_address.json`. Also make sure that you modify the addresses in the SDK repo.

On Telos EVM, these are the following addresses:

```
      "WETH": "0x1c94B4e46D35c27Ed241c8e9E2c91a7FB443CEdc",
      "Factory": "0x3584446E08A4433f3b57d0D53A4338A282fB570D",
      "Router": "0x56a82ED340bB2CFa87777b1C42adE7F687A2196a",
      "multicall": "0xE3701304F4d224B738Dc7a22f216884B815aef12",
      "init_code_hash": "0x8d5156b1fa4d5924675d6ab8e615754414be695a9ef14a573cdc8069a5ce90ec",
      "tok1": "0x825458b871FC6582d94c6d2BCe887897DFD9EDA2",
      "tok2": "0xF8f525327D199F340D60d4b3ee847B5d49a28E3C"
```

## Build

Install packages:

```
npm i
```

Run:

```
npm start
```
