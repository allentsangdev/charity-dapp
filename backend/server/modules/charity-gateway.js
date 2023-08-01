const Charity = require('../../src/artifacts/contracts/charity.sol/Charity.json')
const contractAddress = process.env.CONTRACT_ADDRESS

async function registerAsCharityOrg(provider, _charityName, _charityDesc) {

    //const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Charity.abi, signer)
    const transaction = await contract.registerAsCharityOrg(_charityName, _charityDesc)


}