import thousandSeparator from "./thousandSep"

export const formatCharityData = (charityData: any, isLoading: boolean) => {
  if (!isLoading)
    return charityData?.map((data: any) => {
      const [
        address,
        id,
        name,
        desc,
        dueDate,
        paymentType,
        adminFee,
        raisedAmount,
      ] = data

      const weiToAvaRate = 1e-18 // 1 Wei = 0.000000000000000001 AVAX
      const avaToUsdRate = 12 // 1 AVAX = 10 USD

      // Given value in Wei
      const valueInWei = BigInt(raisedAmount.hex)

      // Step 1: Convert from Wei to AVAX
      const valueInAva = Number(valueInWei) * weiToAvaRate

      // Step 2: Convert from AVAX to USD
      const valueInUsd = valueInAva * avaToUsdRate

      return {
        name: name,
        id: parseInt(id.hex, 16),
        desc: desc,
        dueDate: dueDate,
        adminFee: `${thousandSeparator(Number(adminFee.hex))} %`,
        raisedAmount: `$ ${thousandSeparator(valueInUsd.toFixed(2))}`,
      }
    })
}
