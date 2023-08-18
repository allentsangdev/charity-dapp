import { ethers } from "ethers"

import { abi } from "./Charity.json"

const contractAddress = "0x05359377e2ADD600bfAcF944f6C9b4Aa99F68bB7"

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

    return txReceipt
  } catch (error: any) {
    return error.message
  }
}

// donate
// pass in window.ethereum to eth
async function donate(eth: any, _campaignId: number, _etherValue: string) {
  try {
    const charityContractInstance = await connectNode(eth)
    const txReceipt = await charityContractInstance.donate(_campaignId, {
      value: ethers.utils.parseEther(_etherValue),
    })

    return txReceipt
  } catch (error: any) {
    return error.message
  }
}

// release fund from campaing
// pass in window.ethereum to eth
async function releaseFund(eth: any, _campaignId: number) {
  try {
    const charityContractInstance = await connectNode(eth)
    const txReceipt = await charityContractInstance.releaseFund(_campaignId)

    return txReceipt
  } catch (error: any) {
    return error.message
  }
}

async function getTransaction(eth: any, _campaignId: number) {
  try {
    const charityContractInstance = await connectNode(eth)
    const txReceipt = await charityContractInstance.getTransactionHistory(
      _campaignId
    )
    return txReceipt
  } catch (error: any) {
    return error.message
  }
}

export {
  registerAsCharityOrg,
  registerAsDonor,
  createCampaign,
  donate,
  releaseFund,
  getTransaction,
}
