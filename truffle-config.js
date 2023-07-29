const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = `0x${process.env.PRIVATE_KEY}`
const avalancheNodeUrl = process.env.QUICKNODE_URL
const avalancheNetworkId = 43114;

module.exports = {
  networks: {
    avalanche: {
      provider: () => new HDWalletProvider({
        privateKeys: privateKey,
        providerOrUrl: avalancheNodeUrl,
      }),
      network_id: avalancheNetworkId,
      gas: 3000000,
      gasPrice: 225000000000,
    }
  }
}