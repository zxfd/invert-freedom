export const getYearInfo = (config = {}) => {
  const { income, saveRatio, invertRatio, year, init } = config

  let newTotal = 0 // 新资金的总数

  const initTotal = Math.floor(
    init ? init * Math.pow(1 + invertRatio, year) : 0
  )

  for (let i = 1; i <= year; i++) {
    newTotal += Math.floor(income * saveRatio * Math.pow(1 + invertRatio, year))
  }

  const total = newTotal + initTotal

  const invertNum = Math.floor(total * invertRatio)
  const spendNum = Math.floor(income * (1 - saveRatio))

  const isMoreThanSpend = invertNum >= spendNum

  const isMoreThanIncome = invertNum >= income

  const isMoreThanIncomeAndSpend = invertNum >= income + spendNum
  return {
    year,
    total,
    spendNum,
    newTotal,
    initTotal,
    invertNum,
    isMoreThanSpend,
    isMoreThanIncome,
    isMoreThanIncomeAndSpend,
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

const isMoreThan = (config = {}, key) => {
  const list = getInfoList(config)

  const index = list.findIndex((item) => item[key])
  const needList = list.splice(0, index + 1)
  const year = needList.length
  const ok = year <= 65
  return {
    ok,
    year,
    needList,
  }
}

export const yearMoreThanSpend = (config = {}) => {
  return isMoreThan(config, "isMoreThanSpend")
}

export const yearMoreThanIncome = (config = {}) => {
  return isMoreThan(config, "isMoreThanIncome")
}

export const yearMoreThanIncomeAndSpend = (config = {}) => {
  return isMoreThan(config, "isMoreThanIncomeAndSpend")
}
