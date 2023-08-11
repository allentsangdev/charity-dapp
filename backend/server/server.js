const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()
const PORT = process.env.port || 4000

// ether client related imports
require('dotenv').config();
const ethers = require('ethers')
const QUICKNODE_URL = process.env.QUICKNODE_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY; // To update this to let user provide private key
const contractAddress = process.env.CONTRACT_ADDRESS;
const {abi} = require('../src/artifacts/contracts/charity.sol/Charity.json')

// initiate connection to avalanche client
// this will return back a read only contract instance
const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_URL);
const readOnlyCharityContractInstance = new ethers.Contract(contractAddress, abi, provider);
//const signer = new ethers.Wallet(PRIVATE_KEY, provider);
//const charityContractInstance = new ethers.Contract(contractAddress, abi, signer);

// Middlewares
app.use(cors())
app.use(express.json())

/* ----- Define Routes ----- */

// Landing Route
router.get("/", (req,res) => {
    res.send("<h1>Server On!!!</h1>")
})

/* ----- Read Only Routes ----- */

// GET Request: get all campaign
// Returns back a list of campaign object
router.get('/get-all-campaign', async (req,res) => {
    try {       
        const txReceipt = await readOnlyCharityContractInstance.getAllCampaign()
        res.status(200).json(txReceipt)
    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// GET Request: get campaign by campaign id
// Returns back a campaign object
router.get('/get-campaign/:campaignId', async (req,res) => {
    try {       
        const campaignId = req.params.campaignId
        const txReceipt = await readOnlyCharityContractInstance.getCampaign(campaignId)
        res.status(200).json(txReceipt)
    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// POST Request: get a charity organization
router.post('/get-charity-org', async (req,res) => {
    try {
        const { _charityId } = req.body
        const txReceipt = await readOnlyCharityContractInstance.getCharityOrg(_charityId)
        res.status(200).json(txReceipt)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// GET Request: get all charity org
// Returns back a list of charityOrg object
router.get('/get-all-charityOrg', async (req,res) => {
    try {       
        const txReceipt = await readOnlyCharityContractInstance.getAllCharityOrg()
        res.status(200).json(txReceipt)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

/* ----- Transaction Routes ----- */
/*
// POST Request: register as charity organization
router.post('/register-as-charity-org', async (req,res) => {
    try {
        const { _charityName , _charityDesc } = req.body
        const txReceipt = await charityContractInstance.registerAsCharityOrg(_charityName, _charityDesc)
        res.status(200).json(txReceipt)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// POST Request: register as donor
router.post('/register-as-donor', async (req,res) => {
    try {
        const { _donorName } = req.body
        const txReceipt = await charityContractInstance.registerAsDonor(_donorName)
        res.status(200).json(txReceipt)
    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// POST Request: create campaign
router.post('/create-campaign', async (req,res) => {
    try {
        const { _campaignName, _campaignDesc, _dueDate, _acceptedPaymentMethod, _adminFee, _beneficiaries } = req.body
        const txReceipt = await charityContractInstance.createCampaign(_campaignName, _campaignDesc, _dueDate, _acceptedPaymentMethod, _adminFee, _beneficiaries)
        res.status(200).json(txReceipt)
    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// POST Request: donate
// @dev how to handle payable functions
// https://stackoverflow.com/questions/68198724/how-would-i-send-an-eth-value-to-specific-smart-contract-function-that-is-payabl
router.post('/donate', async (req,res) => {
    try {
        const { _campaignId, _etherValue } = req.body
        const options = {value: ethers.utils.parseEther(_etherValue)}
        const txReceipt = await charityContractInstance.donate(_campaignId, options)
        res.status(200).json(txReceipt)
    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// POST Request: release fund
router.post('/release-fund', async (req,res) => {
    try {
        const { _campaignId } = req.body
        const txReceipt = await charityContractInstance.releaseFund(_campaignId)
        res.status(200).json(txReceipt)
    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

*/


// GET Request: get all TransactionHistory
// Returns back a list of Transaction object
router.post('/get-transaction-history', async (req, res) => {
    try {
        const { _campaignId } = req.body;

        // Input validation
        if (!_campaignId || typeof _campaignId !== 'number') {
            return res.status(400).send('Invalid campaign ID.');
        }

        const txReceipt = await charityContractInstance.getTransactionHistory(_campaignId);

        // If using web3.js, the actual return data might be inside txReceipt.events... or txReceipt.returnValues... depending on the version and setup.
        res.status(200).json(txReceipt);
    } catch (error) {
        console.error("Error fetching transaction history for CampaignId '",_campaignId,"' :", error.message);
        res.status(500).send("An error occurred while fetching transaction history.");
    }
});


// POST Request: get a charity organization
router.post('/get-transaction-history', async (req,res) => {
    try {
        const { _campaignId } = req.body
        const txReceipt = await charityContractInstance.getTransactionHistory(_campaignId)
        res.status(200).json(txReceipt)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

app.use('/', router)

app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
    console.log("Contract deployed to:", process.env.CONTRACT_ADDRESS)
    //console.log(process.env.CONTRACT_ADDRESS, process.env.QUICKNODE_URL, process.env.PRIVATE_KEY, abi)
})