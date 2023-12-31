 //SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Charity {
// ----------------------------------- Notes ----------------------------------- //
 /*
1. No validation on how to register as a participant to this contract --> explore how to integrate with Arash's indy solution or build the Validtor voting logic
2. Only accept native token (ie. ETH)
3. Not yet implement the transaction record feature
4. Fund distrubuted to beneficiaries equally
5. Have not implement the credit system
*/
// ----------------------------------- Events ----------------------------------- //

    event CharityOrgRegistered(address indexed charityAddress, string charityName, uint charityId);
    event DonorRegistered(address indexed donorAddress, string donorName, uint donorId);
    event CampaignCreated(address indexed campaignOwner, uint campaignId, string campaignName);
    event DonationMade(address indexed donor, uint campaignId, uint256 amount);
    event FundReleased(uint campaignId);
    event TransactionLogged(address indexed from, uint campaignId, uint256 amount);

// ----------------------------------- Data Structures ----------------------------------- //

    enum ReputationLevel {Micro, Small, Medium, Large, Major}

    // CharityOrg will have the ability to create and manage charity campaign
    // CharityOrg will also act as validator to vote on whether or not to allow a new org to join
    // how to motivate validator to vote???
    struct CharityOrg {
        address charityAddress;
        string charityName;
        string charityDesc;
        uint charityId;
        ReputationLevel reputationLevel; // higher reputation --> can create more robust campaign --> reputation level can only 
    }
    
    enum CampaignState {Fundraising, ExpiredRefund, Successful}

    struct Campaign { 
        address campaignOwner;
        uint campaignId;
        string campaignName;
        string campaignDesc;
        string dueDate;
        string acceptedPaymentMethod;
        uint adminFee;
        uint raisedAmount;
        CampaignState campaignState; // make sure to set a default value as Fundraising while adding campaign
        address payable[] beneficiaries;
    }

    struct Donor {
        address donorAddress;
        string donorName;
        uint donorId;
    }

    struct TransactionInfo {
        address from;
        uint campaignId;
        string currencyType;
        uint256 amountSent;
        uint timeStamp;
    }

// ----------------------------------- State Variablies ----------------------------------- //

    // a list of CharityOrg struct to keep track of registered charity organization
    CharityOrg[] charityOrgList;

    // a list of Donor struct to keep track of registered donor
    Donor[] donorList;

    // a list of Campaign struct to keep track of created campaign
    Campaign[] campaignList;

    TransactionInfo[] transactionHistory;
// ----------------------------------- Contract Constructor ----------------------------------- //

    // constructor to initialze validator
    constructor() {
        charityOrgList.push(
            CharityOrg(
            {
                charityAddress: address(0x0),
                charityName: "Redcross",
                charityDesc: "The American Red Cross is a humanitarian organization that provides emergency assistance, disaster relief, and education in the United States.",
                charityId: 1,
                reputationLevel: ReputationLevel.Major
            }
        )
        );

        charityOrgList.push(
            CharityOrg(
            {
                charityAddress: address(0x0),
                charityName: "UNICEF",
                charityDesc: "UNICEF is a United Nations agency dedicated to providing humanitarian and developmental assistance to children and mothers in developing countries.",
                charityId: 2,
                reputationLevel: ReputationLevel.Major
            }
        )
        );

        charityOrgList.push(
            CharityOrg(
            {
                charityAddress: address(0x0),
                charityName: "WWF",
                charityDesc: "The World Wide Fund for Nature, also known as the World Wildlife Fund, is one of the largest conservation organizations in the world",
                charityId: 3,
                reputationLevel: ReputationLevel.Major
            }
        )
        );
    }

// ----------------------------------- Functions ----------------------------------- //

    // right now, everyone can register as a CharityOrg, how can we validate legit organization???
    function registerAsCharityOrg(string memory _charityName, string memory _charityDesc ) public returns (CharityOrg[] memory)  {
        charityOrgList.push(
            CharityOrg(
                {
                    charityAddress: msg.sender,
                    charityName: _charityName,
                    charityDesc: _charityDesc,
                    charityId: charityOrgList.length, // using the length of the charityOrgList as the unique ID
                    reputationLevel: ReputationLevel.Micro
                }));
        emit CharityOrgRegistered(msg.sender, _charityName, charityOrgList.length);
        return charityOrgList;
    }

    // right now, everyone can register as a Donor, do we need validation logics for donor???
    function registerAsDonor(string memory _donorName) public returns (Donor[] memory) {
        donorList.push(
            Donor(
                {
                    donorAddress: msg.sender,
                    donorName: _donorName,
                    donorId: donorList.length
                }
            )
        );
        emit DonorRegistered(msg.sender, _donorName, donorList.length);
        return donorList;
            
    }
    
    // right now, no one can modify the campaign detail after first create. Can look in to how to amend campaign detail
    function createCampaign(string memory _campaignName, string memory _campaignDesc, string memory _dueDate, string memory _acceptedPaymentMethod, uint _adminFee, address payable[] memory _beneficiaries ) public isCharityOrg {
        campaignList.push(
            Campaign(
                {
                    campaignOwner: msg.sender,
                    campaignId: campaignList.length,
                    campaignName: _campaignName,
                    campaignDesc: _campaignDesc,
                    dueDate: _dueDate,
                    acceptedPaymentMethod: _acceptedPaymentMethod,
                    adminFee: _adminFee,
                    raisedAmount: 0,
                    campaignState: CampaignState.Fundraising,
                    beneficiaries: _beneficiaries
                }
            )
        );
        emit CampaignCreated(msg.sender, campaignList.length, _campaignName);

    }

    function getAllCampaign() public view returns (Campaign[] memory) {
        return campaignList;
    }

    function getCampaign(uint _campaignId) public isValidCampaign(_campaignId) view returns (Campaign memory retrievedCampaign) {
        for (uint i = 0; i < campaignList.length; i++ ) {
            if(campaignList[i].campaignId == _campaignId) {
                return campaignList[i];
            }
        }
    }

    function getCampaignByOwner(address _campaignOwner) public view returns (Campaign[] memory) {
        Campaign[] memory localCampaignList;
        uint count = 0;

        // check how many campaign of a campaign owner owns. Will assign this number to the local dynamic array
        for (uint i = 0; i < campaignList.length; i++ ) {
            if(campaignList[i].campaignOwner == _campaignOwner) {
                count++;
            }
        }

        localCampaignList = new Campaign[](count);
        count = 0;

        for (uint i = 0; i < campaignList.length; i++ ) {
            if(campaignList[i].campaignOwner == _campaignOwner) {
                localCampaignList[count] = campaignList[i];
                count++;
            }
        }

        return localCampaignList;
    }
    
    // need to look into what kind of currency donor is donating
    // need to add update transaction history logic
    // deposit ETH to this contract
    function donate(uint _campaignId) public payable isDonor isValidCampaign(_campaignId) {
        for (uint i = 0; i < campaignList.length; i++ ) {
            if(campaignList[i].campaignId == _campaignId) {
                campaignList[i].raisedAmount += msg.value;
                 transactionHistory.push(
                    TransactionInfo(
                    {
                        from : msg.sender,
                        campaignId : campaignList[i].campaignId,
                        currencyType : "USD",
                        amountSent :  msg.value,
                        timeStamp : block.timestamp
                    }
                    )
              );
              // ??????????
            emit DonationMade(msg.sender, _campaignId, msg.value);
            emit TransactionLogged(msg.sender, _campaignId, msg.value);
            }
        }

    }

    // release fund to beneficiaries equally
    // raised amount divided by the length of the beneficiaries list
    // function expected to be trigger by charity org manually. Look into ways to automate this process
   function releaseFund(uint _campaignId) public isValidCampaign(_campaignId) isCharityOrg {
        Campaign storage targetCampaign = campaignList[_campaignId];  // Used storage reference so modification can be directly be done on camp struct

        // ???? if new states are added we need to change this.
        require(targetCampaign.campaignState == CampaignState.Fundraising, "Campaign not active");

        address payable[] memory targetBeneficiaries = targetCampaign.beneficiaries;

        // avoid mony lost.
        uint fundAllocationAmount = targetCampaign.raisedAmount / targetBeneficiaries.length;
        uint remainder = targetCampaign.raisedAmount - (fundAllocationAmount * targetBeneficiaries.length); 

        for (uint i = 0; i < targetBeneficiaries.length; i++) {
            targetBeneficiaries[i].transfer(fundAllocationAmount);
        }

        if (remainder > 0) {
            // Decide how to handle the remainder.
            // One way could be transferring it to the first beneficiary or back to the charity org
            targetBeneficiaries[0].transfer(remainder);
        }

        targetCampaign.raisedAmount = 0;  // Ensure the raisedAmount is set to 0 after disbursing
        targetCampaign.campaignState = CampaignState.Successful;
        emit FundReleased(_campaignId);
    }

    // ----------------------------------- Helper Functions ----------------------------------- //

    function getAllTransactionHistory() public view returns (TransactionInfo[] memory) {
        return transactionHistory;
    }

    function getTransactionHistory(uint _campaignId) public view returns (TransactionInfo[] memory ) {
       TransactionInfo[] memory _transactions = new TransactionInfo[](transactionHistory.length + 1);
       uint _indext = 0;
        for (uint i = 0; i < transactionHistory.length; i++ ) {
            if(transactionHistory[i].campaignId == _campaignId) {

            _transactions[_indext] =transactionHistory[i];
             _indext = _indext + 1;
            }
        }
        return _transactions;
    }

    function getAllCharityOrg() public view returns (CharityOrg[] memory) {
        return charityOrgList;
    }

    function getCharityOrg(uint _charityId) public view returns (CharityOrg memory targetCharityOrg) {
        for (uint i = 0; i < charityOrgList.length; i++ ) {
            if(charityOrgList[i].charityId == _charityId) {
                return charityOrgList[i];
            }
        }
    }

    // ----------------------------------- Modifiers ----------------------------------- //

    function checkIsCharityOrg(address _functionCaller) public view returns (bool) {
        for (uint i = 0; i < charityOrgList.length; i++ ) {
            if(charityOrgList[i].charityAddress == _functionCaller) {
                return true;
            }
        }
        return false;
    }

    modifier isCharityOrg() {
        require(checkIsCharityOrg(msg.sender), "You need to be a authenticated charity in order to proceed with this action");
        _;
    }

    function checkIsDonor(address _functionCaller) public view returns (bool) {
        for (uint i = 0; i < donorList.length; i++ ) {
            if(donorList[i].donorAddress == _functionCaller) {
                return true;
            }
        }
        return false;
    }

    modifier isDonor() {
        require(checkIsDonor(msg.sender), "You need to register as a donor in order to proceed with this action");
        _;
    }

    function checkIsValidCampaign(uint _campaignId) public view returns (bool) {
        for (uint i = 0; i < campaignList.length; i++ ) {
            if(campaignList[i].campaignId == _campaignId) {
                return true;
            }
        }
        return false;
    }

    modifier isValidCampaign(uint _campaignId) {
        require(checkIsValidCampaign(_campaignId), "This is not a valid campaign ID");
        _;
    }
    
}
