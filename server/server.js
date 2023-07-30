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
const { _fetchData } = require('ethers/lib/utils')

// initiate connection to avalanche client
const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const charityContractInstance = new ethers.Contract(contractAddress, abi, signer);

// Middlewares
app.use(cors())
app.use(express.json())

/* ----- Define Routes ----- */

// Landing Route
router.get("/", (req,res) => {
    res.send("<h1>Server On!!!</h1>")
})

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



// POST Request: get a charity organization
router.post('/get-charity-org', async (req,res) => {
    try {
        const { _charityId } = req.body
        const txReceipt = await charityContractInstance.getCharityOrg(_charityId)
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
        const txReceipt = await charityContractInstance.getAllCharityOrg()
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