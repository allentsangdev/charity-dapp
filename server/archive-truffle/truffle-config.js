const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = `0x${process.env.PRIVATE_KEY}`
const avalancheNodeUrl = process.env.QUICKNODE_URL
const avalancheNetworkId = 43113;

//const provider = new Web3.providers.HttpProvider(avalancheNodeUrl);

module.exports = {
  networks: {
    avalanche: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: [''], 
          providerOrUrl: '',
        })
      },
      network_id: avalancheNetworkId,
      gas: 3000000,
      gasPrice: 225000000000,
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
}