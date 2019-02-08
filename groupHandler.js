module.exports = function (membersList) {
  const snh = membersList.filter(item => (item.team<1010 && item.team>1000))
  const bej = membersList.filter(item => (item.team<1110 && item.team>1100))
  const gnz = membersList.filter(item => (item.team<1210 && item.team>1200))
  const shy = membersList.filter(item => (item.team<1310 && item.team>1300))
  const ckg = membersList.filter(item => (item.team<1410 && item.team>1400))
  const idft = membersList.filter(item => (item.team<1510 && item.team>1500))
  const oversea = membersList.filter(item => (item.team>1600))
  const other = membersList.filter(item => (item.team===0))
  const legend = membersList.filter(item => (item.team===999))
  return {'1000':snh,'1100':bej,'1200':gnz,'1300':shy,'1400':ckg,'1500':idft,'1600':oversea,'0':other,'998':legend}
}