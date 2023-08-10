import { ethers } from "ethers"
import {abi} from "./Charity.json"
const contractAddress = "0xAE1ca0Aac6470F7455Cf617b94e31f1494570FDE"

// pass in window.ethereum to this function
async function connectNode (eth: any) {

    const provider = new ethers.providers.Web3Provider(eth)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    
    return signer

}

// register as charity organization
// pass in window.ethereum to this eth
async function registerAsCharityOrg (eth:any, _charityName:any, _charityDesc: any ) {
    try {
        const signer = await connectNode(eth)
        const charityContractInstance = new ethers.Contract(contractAddress, abi, signer);
        const txReceipt = await charityContractInstance.registerAsCharityOrg(_charityName, _charityDesc)
        console.log(txReceipt)
        return txReceipt
    } catch(error:any) {
        return error.message
    }
}

export {
    registerAsCharityOrg
}