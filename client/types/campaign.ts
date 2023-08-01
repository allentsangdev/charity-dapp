// export interface Campaign {
//   CampaignDesc: string
//   CampaignName: string
//   CurrentRaisedAmt: number
//   DonateHistory: object
//   ExpireOn: string | number
//   FundReceiver: string
//   ID: string
//   TargetAmt: string | number
// }

// Define the interface for the Campaign object
export interface Campaign {
  campaignName: string
  campaignDesc: string
  dueDate: string
  targetAmount: number
}
