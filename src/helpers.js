export function Capitalize(string) {
  if (string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase()
  }
  return ('')
}

export function GetOrdinal(percentile) {
  let ordinalInd = 'th'
  if (percentile % 10 === 1) {
    ordinalInd = 'st'
  } else if (percentile % 10 === 2) {
    ordinalInd = 'nd'
  } else if (percentile % 10 === 3) {
    ordinalInd = 'rd'
  }
  return ordinalInd
}