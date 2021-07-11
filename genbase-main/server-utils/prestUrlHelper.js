const prestUrlHelper = ({
  baseUrl = '',
  tableName,
  joinStat,
  selectStat,
  orderStat,
}) => {
  let url = baseUrl
  let queryArr = []

  if (tableName) {
    url += `${tableName}`
  }

  if (joinStat) {
    queryArr.push(`_join=${joinStat}`)
  }

  if (selectStat) {
    queryArr.push(`_select=${selectStat}`)
  }

  if (orderStat) {
    queryArr.push(`_order=${orderStat}`)
  }

  if (queryArr.length > 0) {
    const queryStat = queryArr.join('&')
    url = url + '?' + queryStat
  }

  return url
}

export default prestUrlHelper
