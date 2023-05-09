export const getYearInfo = (config = {}) => {
  const { income, saveRatio, invertRatio, year, init } = config

  let newTotal = 0 // 新资金的总数

  const initTotal = init ? init * Math.pow(1 + invertRatio, year) : 0

  for (let i = 1; i <= year; i++) {
    newTotal += income * saveRatio * Math.pow(1 + invertRatio, year)
  }

  const invertNum = (newTotal + initTotal) * invertRatio
  return {
    year,
    newTotal,
    initTotal,
    invertNum,
  }
}

export const getInfoList = (config = {}) => {
  const list = []
  for (let year = 1; year <= 65; year++) {
    const yearInfo = getYearInfo({
      ...config,
      year,
    })
    list.push(yearInfo)
  }

  return list
}
