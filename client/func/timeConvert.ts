const timeConvert = (timestamp: string) => {
  const date = new Date(parseInt(timestamp)) // Convert the timestamp to an integer
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? "pm" : "am"
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12
  const formattedMinutes = minutes.toString().padStart(2, "0")

  const formattedDate = `${month} ${getOrdinalSuffix(
    day
  )} ${year} - ${formattedHours}:${formattedMinutes} ${ampm}`
  return formattedDate
}

const getOrdinalSuffix = (day: number): string => {
  const suffixes = ["th", "st", "nd", "rd"]
  const relevantDigits = day % 100

  // Special case for 11, 12, and 13 since they are exceptions to the normal rule
  if (relevantDigits >= 11 && relevantDigits <= 13) {
    return `${day}th`
  }

  const suffix =
    suffixes[(relevantDigits - 20) % 10] ||
    suffixes[relevantDigits] ||
    suffixes[0]
  return `${day}${suffix}`
}

export default timeConvert
