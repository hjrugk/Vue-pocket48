export function periodHandler(period) {
  let backup = period.toString()
  let length = backup.split('').length
  if (length === 4) {
    let team = ''
    switch (backup[1]) {
      case '0':
        team = 'SNH'
        break
      case '1':
        team = 'BEJ'
        break
      case '2':
        team = 'GNZ'
        break
      case '3':
        team = 'SHY'
        break
      case '4':
        team = 'CKG'
        break
    }
    let number = backup[2] + backup[3]
    number = number.replace('0', '')
    return [team, number]
  } else {
    return ['staff', '官方']
  }
}