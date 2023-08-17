export default function convertToNumber(amountString: string) {
  if (typeof amountString !== "string") {
    return NaN // or you can return any other appropriate value indicating an error
  }

  // Remove all non-numeric characters using regular expression
  const numericString = amountString.replace(/[^\d.-]/g, "")

  // Convert the numeric string to a number
  const amountNumber = parseFloat(numericString)

  return amountNumber
}
