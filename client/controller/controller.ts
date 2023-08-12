import { ethers } from "ethers"

import { abi } from "./Charity.json"

const contractAddress = "0xAE1ca0Aac6470F7455Cf617b94e31f1494570FDE"

// pass in window.ethereum to this function
// returns back a contract instance
async function connectNode(eth: any) {
  const provider = new ethers.providers.Web3Provider(eth)
  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()
  // initialize contract instance
  const charityContractInstance = new ethers.Contract(
    contractAddress,
    abi,
    signer
  )
  return charityContractInstance
}

// register as charity organization
// pass in window.ethereum to eth
async function registerAsCharityOrg(
  eth: any,
  _charityName: any,
  _charityDesc: any
) {
  try {
    const charityContractInstance = await connectNode(eth)
    const txReceipt = await charityContractInstance.registerAsCharityOrg(
      _charityName,
      _charityDesc
    )
    console.log(txReceipt)
    return txReceipt
  } catch (error: any) {
    return error.message
  }
}

// register as donor
// pass in window.ethereum to eth
async function registerAsDonor(eth: any, _donorName: any) {
  try {
    const charityContractInstance = await connectNode(eth)
    const txReceipt = await charityContractInstance.registerAsDonor(_donorName)
    console.log(txReceipt)
    return txReceipt
  } catch (error: any) {
    return error.message
  }
}

// create campaign
// pass in window.ethereum to eth
async function createCampaign(
  eth: any,
  _campaignName: string,
  _campaignDesc: string,
  _dueDate: string,
  _acceptedPaymentMethod: string,
  _adminFee: number,
  _beneficiaries: any
) {
  try {
    const charityContractInstance = await connectNode(eth)
    const txReceipt = await charityContractInstance.createCampaign(
      _campaignName,
      _campaignDesc,
      _dueDate,
      _acceptedPaymentMethod,
      _adminFee,
      _beneficiaries
    )
    console.log(txReceipt)
    return txReceipt
  } catch (error: any) {
    return error.message
  }
}

// donate
// pass in window.ethereum to eth
async function donate(eth: any, _campaignId: number, _etherValue: number) {
  try {
    const charityContractInstance = await connectNode(eth)
    const txReceipt = await charityContractInstance.donate(
      _campaignId,
      _etherValue
    )
    console.log(txReceipt)
    return txReceipt
  } catch (error: any) {
    return error.message
  }
}

export { registerAsCharityOrg, registerAsDonor, createCampaign, donate }
