export const getInvertNum = (
  config = { income, saveRatio, invertRatio, year, init }
) => {
  const { income, saveRatio, invertRatio, year, init } = config

  let newTotal = 0 // 新资金的总数

  const initTotal = init ? init * Math.pow(1 + invertRatio, year) : 0

  for (let i = 1; i <= year; i++) {
    newTotal += income * saveRatio * Math.pow(1 + invertRatio, year)
  }

  const invertNum = (newTotal + initTotal) * invertRatio
  return invertNum
}

export const isMoreThanSpend = (
  config = { income, saveRatio, invertRatio, year, init }
) => {
  const { income, saveRatio } = config

  const spendNum = income * (1 - saveRatio)

  return getInvertNum(config) >= spendNum
}

export const needYear = (
  config = { income, saveRatio, invertRatio, init },
  isMoreThan = () => {}
) => {
  let left = 1
  let right = 65

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (
      isMoreThan({
        ...config,
        year: mid,
      })
    ) {
      // 中间的大了，向左二分
      right = mid
    } else {
      // 中间的小了，向右二分
      left = mid + 1
    }
  }

  return left
}

console.log(
  "按照你当前的收入，收益覆盖开销还需要的年数是：",
  needYear(
    {
      income: 204000,
      saveRatio: 0.7,
      invertRatio: 0.08,
      init: 0,
    },
    isMoreThanSpend
  )
)

export const isMoreThanIncome = (
  config = { income, saveRatio, invertRatio, year, init }
) => {
  const { income } = config

  return getInvertNum(config) >= income
}

console.log(
  "按照你当前的收入，收益覆盖收入还需要的年数是：",
  needYear(
    {
      income: 204000,
      saveRatio: 0.7,
      invertRatio: 0.08,
      init: 0,
    },
    isMoreThanIncome
  )
)
