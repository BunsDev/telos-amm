# Deploy Uniswap V2 to Telos EVM (or Standalone node)

This is a Hardhat setup to deploy the necessary contracts of Uniswap.

## Get Started

Clone repo:

```
git clone https://github.com/BunsDev/telos-amm/contracts
cd contracts
```

Install packages:

```
npm i
```

Modify the private keys as you wish in the `hardhat.config.js` file.

### Deploy Contracts (Standalone)

To deploy the contracts in a Standalone node you can run:

```
npx hardhat run --network dev scripts/deploy-uniswap.js
```

Contracts will be deployed if a Standalone node is running (default 9933 port is used).

**Note: the interface will only work if the contracts are deployed in a fresh instance. As contacts addressess are saved so that they match that order of deployment**

### Deploy the contracts (Telos EVM):

To deploy the contracts in Telos EVM you can run:

```
npx hardhat run --network moonbase scripts/deploy-uniswap.js
```

**Note: the interface works on Telos EVM with the contracts address baked in the SDK. To make sure that the interface works with your deployment you need to modify both the Interface and SDK repos**
