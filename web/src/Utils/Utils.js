function convertObjectValuesToUpper(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // throw new Error('Input must be an object.');
    return {}
  }

  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim().toUpperCase()
    }
  }

  return obj
}

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th' // for 11th to 20th
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

function formatDateByDay(date) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayOfWeek = daysOfWeek[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]

  return `${dayOfWeek} ${day}${getOrdinalSuffix(day)} ${month}`
}

export { convertObjectValuesToUpper, formatDateByDay }
