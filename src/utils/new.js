export const getDetailList = (config = {}) => {
  let { income, saveRatio, invertRatio: _invertRatio, init } = config
  const invertRatio = Number(_invertRatio)
  const list = []
  let newTotal = 0
  for (let year = 1; year <= 65; year++) {
    if (year > 1 && list[list.length - 1].isMoreThanSpend) {
      saveRatio = 1
    }
    const saveNumEachYear = income * saveRatio
    newTotal += Math.floor(
      saveNumEachYear * Math.pow(1 + Number(invertRatio), year)
    )
    const initTotal = Math.floor(
      init ? init * Math.pow(1 + invertRatio, year) : 0
    )
    const total = newTotal + initTotal

    const invertNum = Math.floor(total * invertRatio)

    const spendNum = Math.floor(income * (1 - saveRatio))

    const isMoreThanSpend = invertNum >= spendNum
    const isMoreThanIncome = invertNum >= income
    const isMoreThanIncomeAndSpend = invertNum >= income + spendNum
    const info = {
      year,
      total,
      newTotal,
      initTotal,
      invertNum,
      saveNumEachYear,
      spendNum,
      isMoreThanSpend,
      isMoreThanIncome,
      isMoreThanIncomeAndSpend,
    }

    list.push(info)
  }

  return list
}
